/* ============================================================
   ÁGORA · Pigmento
   ------------------------------------------------------------
   A watercolour that the visitor paints by moving.

   WHY THIS TECHNIQUE. Glowing particles are additive: light on
   top of light. Watercolour is the opposite — SUBTRACTIVE. A
   pigment does not add colour to paper, it removes wavelengths
   from the light coming back out of it. So this buffer stores
   ABSORBANCE, not colour, and the page is tinted with
   Beer–Lambert:  visible = paper · e^(−absorbance)
   Two pigments that overlap therefore mix the way real ink
   mixes on a wet page. Nothing here can ever glow.

   Three passes per frame, all on the GPU:
     1 · estampa   deposit along the path travelled (instanced)
     2 · sangrado  bleed, granulate, darken the rim, fade
     3 · papel     absorb into the paper and tint the page

   The buffer runs at half resolution. Watercolour has no hard
   edges, so the loss is invisible and the cost drops ~4×.
   ============================================================ */

import { program, uniforms, fullscreenTriangle, makeTarget, pickFormat, NOISE_GLSL } from './glx.js';

const MAX_STAMPS = 64;        // per frame; a pool, never allocated again
const STAMP_FLOATS = 10;

/* ---- 1 · estampa ------------------------------------------ */

const VS_STAMP = `#version 300 es
precision highp float;
layout(location=0) in vec2 aQuad;
layout(location=1) in vec2 aCenter;   // clip space
layout(location=2) in vec2 aRad;      // pixels, along / across the stroke
layout(location=3) in float aAng;
layout(location=4) in vec3 aAbs;      // absorbance = 1 - colour
layout(location=5) in float aStr;
layout(location=6) in float aSeed;
uniform vec2 uRes;
out vec2 vLocal; out vec3 vAbs; out float vStr; out float vSeed;
void main() {
  vec2 e = aQuad * aRad;
  vec2 r = vec2(cos(aAng), sin(aAng));
  vec2 px = vec2(e.x * r.x - e.y * r.y, e.x * r.y + e.y * r.x);
  gl_Position = vec4(aCenter + px / (uRes * 0.5), 0.0, 1.0);
  vLocal = aQuad; vAbs = aAbs; vStr = aStr; vSeed = aSeed;
}`;

const FS_STAMP = `#version 300 es
precision highp float;
in vec2 vLocal; in vec3 vAbs; in float vStr; in float vSeed;
out vec4 frag;
${NOISE_GLSL}
void main() {
  float r = length(vLocal);
  if (r > 1.0) discard;

  /* The silhouette is a noisy radius, not a circle: low lobes give the
     blot its shape, a finer octave gives it the small ramifications
     that a loaded brush leaves on rough paper. */
  vec2 d = vLocal / max(r, 1e-4);
  vec2 q = d * 2.1 + vSeed * 7.0;
  float lobes = fbm(q);
  float fine  = fbm(q * 5.3 + 11.7);
  float edge  = 0.46 + 0.34 * lobes + 0.20 * pow(fine, 2.6);

  float a = smoothstep(edge, edge * 0.08, r);

  /* Granulation: pigment settles unevenly in the tooth of the paper. */
  a *= 0.58 + 0.62 * fbm(vLocal * 6.1 + vSeed * 13.0);

  /* The rim holds more pigment than the middle — watercolour's
     signature. Without this it reads as airbrush, not as paint. */
  float rim = smoothstep(edge * 0.72, edge * 0.99, r) * (1.0 - smoothstep(edge * 0.99, edge * 1.04, r));
  a += rim * 0.62 * (0.5 + 0.9 * fbm(q * 3.0));

  a = max(a, 0.0) * vStr;
  frag = vec4(vAbs * a, a);
}`;

/* ---- 2 · sangrado ------------------------------------------ */

const VS_QUAD = `#version 300 es
precision highp float;
layout(location=0) in vec2 aQuad;
out vec2 vUv;
void main() { vUv = aQuad * 0.5 + 0.5; gl_Position = vec4(aQuad, 0.0, 1.0); }`;

const FS_STEP = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uSrc;
uniform vec2 uTexel;
uniform float uTime, uBleed, uDiffuse, uEdge, uDecayC, uDecayW, uFloor;
out vec4 frag;
${NOISE_GLSL}
void main() {
  /* Water does not spread evenly: it follows the fibre. A slow noise
     field displaces the sample, so the blot creeps in one direction
     and stalls in another, exactly as a wet edge does. */
  vec2 w = vec2(fbm(vUv * 3.1 + uTime * 0.021),
                fbm(vUv * 3.1 + 41.7 - uTime * 0.017)) - 0.5;
  vec4 c = texture(uSrc, vUv + w * uTexel * uBleed);

  vec4 b = (texture(uSrc, vUv + vec2(uTexel.x, 0.0)) +
            texture(uSrc, vUv - vec2(uTexel.x, 0.0)) +
            texture(uSrc, vUv + vec2(0.0, uTexel.y)) +
            texture(uSrc, vUv - vec2(0.0, uTexel.y))) * 0.25;

  /* Paper dries. Spreading belongs to a wet mark only — without this
     gate the wash keeps blurring for as long as it is on screen and
     every stroke ends up the same featureless smudge. */
  float wet = smoothstep(0.03, 0.45, c.a);

  vec4 v = mix(c, b, uDiffuse * wet);
  v += (c - b) * uEdge * wet;           // pigment migrates to the rim

  v.rgb *= uDecayC;                     // the mark fades
  v.a   *= uDecayW;                     // the memory of it lasts longer
  /* An 8-bit buffer cannot decay below one quantisation step, so a
     ghost would stay forever. Subtract a floor as well as multiply. */
  v -= uFloor;
  frag = max(v, vec4(0.0));
}`;

/* ---- 3 · papel --------------------------------------------- */

const FS_PAPER = `#version 300 es
precision highp float;
in vec2 vUv;
uniform sampler2D uSrc;
uniform vec3 uPaper;
uniform vec2 uRes;
uniform float uAbsorb, uCov, uMaxCov;
out vec4 frag;
${NOISE_GLSL}
void main() {
  vec4 p = texture(uSrc, vUv);
  float cov = clamp(p.a * uCov, 0.0, uMaxCov);
  if (cov < 0.002) discard;

  /* Beer–Lambert: what the paper gives back after the pigment has
     taken its share. Overlaps mix subtractively, on their own. */
  vec3 t = exp(-p.rgb * uAbsorb);

  /* Paper fibre: absorption varies grain by grain, so the wash is
     never flat. Two octaves at screen scale, cheap and dry. */
  vec2 g = vUv * uRes * 0.5;
  float grain = fbm(g * 0.55) * 0.6 + fbm(g * 1.9) * 0.4;
  t = pow(clamp(t, 0.0, 1.0), vec3(0.80 + 0.42 * grain));

  vec3 col = uPaper * t;
  frag = vec4(col * cov, cov);          // premultiplied
}`;

export function createPigmento(gl, opts = {}) {
  const fmt = pickFormat(gl);
  const tri = fullscreenTriangle(gl);

  const pStamp = program(gl, VS_STAMP, FS_STAMP, 'estampa');
  const pStep  = program(gl, VS_QUAD, FS_STEP, 'sangrado');
  const pPaper = program(gl, VS_QUAD, FS_PAPER, 'papel');
  if (!pStamp || !pStep || !pPaper) return null;

  const uStamp = uniforms(gl, pStamp, ['uRes']);
  const uStep  = uniforms(gl, pStep, ['uSrc', 'uTexel', 'uTime', 'uBleed', 'uDiffuse', 'uEdge', 'uDecayC', 'uDecayW', 'uFloor']);
  const uPaper = uniforms(gl, pPaper, ['uSrc', 'uPaper', 'uRes', 'uAbsorb', 'uCov', 'uMaxCov']);

  /* Stamp geometry: one unit quad, everything else per instance. */
  const vaoStamp = gl.createVertexArray();
  const bufQuad = gl.createBuffer();
  const bufInst = gl.createBuffer();
  const inst = new Float32Array(MAX_STAMPS * STAMP_FLOATS);

  gl.bindVertexArray(vaoStamp);
  gl.bindBuffer(gl.ARRAY_BUFFER, bufQuad);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, bufInst);
  gl.bufferData(gl.ARRAY_BUFFER, inst.byteLength, gl.DYNAMIC_DRAW);
  const stride = STAMP_FLOATS * 4;
  [[1, 2, 0], [2, 2, 8], [3, 1, 16], [4, 3, 20], [5, 1, 32], [6, 1, 36]].forEach(([loc, n, off]) => {
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, n, gl.FLOAT, false, stride, off);
    gl.vertexAttribDivisor(loc, 1);
  });
  gl.bindVertexArray(null);

  let a = null, b = null, W = 1, H = 1, scale = opts.scale ?? 0.62, time = 0;
  let pending = 0;

  function resize(cssW, cssH, dpr) {
    const cap = opts.cap ?? 1400;
    let w = Math.max(2, Math.round(cssW * dpr * scale));
    let h = Math.max(2, Math.round(cssH * dpr * scale));
    const k = Math.min(1, cap / Math.max(w, h));
    w = Math.max(2, Math.round(w * k)); h = Math.max(2, Math.round(h * k));
    if (w === W && h === H) return;
    [a, b].forEach(t => { if (t) { gl.deleteTexture(t.tex); gl.deleteFramebuffer(t.fbo); } });
    W = w; H = h;
    a = makeTarget(gl, W, H, fmt);
    b = makeTarget(gl, W, H, fmt);
    [a, b].forEach(t => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, t.fbo);
      gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    });
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  /** Queue one deposit. cx/cy in clip space; radii in sim pixels. */
  function stamp(cx, cy, rx, ry, ang, abs, str, seed) {
    if (pending >= MAX_STAMPS) return;
    const o = pending * STAMP_FLOATS;
    inst[o] = cx; inst[o + 1] = cy;
    inst[o + 2] = rx; inst[o + 3] = ry;
    inst[o + 4] = ang;
    inst[o + 5] = abs[0]; inst[o + 6] = abs[1]; inst[o + 7] = abs[2];
    inst[o + 8] = str; inst[o + 9] = seed;
    pending++;
  }

  const simScaleX = () => W;   // stamps are sized in sim pixels
  const simScaleY = () => H;

  function step(dt) {
    if (!a || !b) return;
    time += dt;

    /* 2 · bleed + fade, a → b */
    gl.bindFramebuffer(gl.FRAMEBUFFER, b.fbo);
    gl.viewport(0, 0, W, H);
    gl.disable(gl.BLEND);
    gl.useProgram(pStep);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, a.tex);
    gl.uniform1i(uStep.uSrc, 0);
    gl.uniform2f(uStep.uTexel, 1 / W, 1 / H);
    gl.uniform1f(uStep.uTime, time);
    gl.uniform1f(uStep.uBleed, 1.15);
    gl.uniform1f(uStep.uDiffuse, Math.min(0.22, 1.05 * dt));
    gl.uniform1f(uStep.uEdge, Math.min(0.30, 1.9 * dt));
    /* half-lives, expressed in seconds so the look is frame-rate free */
    gl.uniform1f(uStep.uDecayC, Math.pow(0.5, dt / 3.2));
    gl.uniform1f(uStep.uDecayW, Math.pow(0.5, dt / 4.2));
    gl.uniform1f(uStep.uFloor, fmt.float ? 0.00035 : 0.0035);
    tri.draw();

    const t = a; a = b; b = t;

    /* 1 · deposits land on the freshly bled buffer */
    if (pending > 0) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, a.fbo);
      gl.viewport(0, 0, W, H);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE);          // pigment accumulates
      gl.useProgram(pStamp);
      gl.uniform2f(uStamp.uRes, W, H);
      gl.bindBuffer(gl.ARRAY_BUFFER, bufInst);
      gl.bufferSubData(gl.ARRAY_BUFFER, 0, inst, 0, pending * STAMP_FLOATS);
      gl.bindVertexArray(vaoStamp);
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, pending);
      gl.bindVertexArray(null);
      pending = 0;
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  /** 3 · tint the page. Draws into whatever framebuffer is bound. */
  function paint(paper, vw, vh, gain, maxCov) {
    if (!a) return;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);   // premultiplied over
    gl.useProgram(pPaper);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, a.tex);
    gl.uniform1i(uPaper.uSrc, 0);
    gl.uniform3f(uPaper.uPaper, paper[0], paper[1], paper[2]);
    gl.uniform2f(uPaper.uRes, vw, vh);
    gl.uniform1f(uPaper.uAbsorb, 2.35);
    gl.uniform1f(uPaper.uCov, gain);
    gl.uniform1f(uPaper.uMaxCov, maxCov);
    tri.draw();
  }

  function destroy() {
    [a, b].forEach(t => { if (t) { gl.deleteTexture(t.tex); gl.deleteFramebuffer(t.fbo); } });
    gl.deleteBuffer(bufQuad); gl.deleteBuffer(bufInst); gl.deleteBuffer(tri.buf);
    gl.deleteVertexArray(vaoStamp); gl.deleteVertexArray(tri.vao);
    gl.deleteProgram(pStamp); gl.deleteProgram(pStep); gl.deleteProgram(pPaper);
    a = b = null;
  }

  return {
    resize, stamp, step, paint, destroy,
    get texture() { return a?.tex ?? null; },
    get size() { return [W, H]; },
    get float() { return fmt.float; },
    get queued() { return pending; }
  };
}
