/* ============================================================
   ÁGORA · La Red
   ------------------------------------------------------------
   People, communities and ideas as ink on paper — not a graph,
   not a dashboard, not a constellation of lights.

   THE RULE THAT MAKES IT ÁGORA'S: nothing connects on its own.
   Every node reads the wetness of the pigment buffer at its own
   position on screen, in the vertex shader, at zero CPU cost. A
   node the brush has not touched is a speck in the paper. A node
   the brush has passed over wakes, grows, finds its neighbours —
   and the line between two nodes carries each end's own wake, so
   a link GROWS out of the wet end toward the dry one.

   Which is the whole argument of the place, stated as a
   mechanic: las transformaciones no aparecen solas.

   The field also keeps the four movements of Ágora's method —
   CONECTAR, APRENDER, ACTUAR, CONECTAR — driven by the scroll
   through the section where the page explains them.
   ============================================================ */

import { program, uniforms, perspective, mul, tilt } from './glx.js';

export const FOV = 0.95;
const TAN_HALF = Math.tan(FOV / 2);

/* Ágora's own accents. Four causes and the cream of the unassigned. */
const PALETTE = [
  [0.141, 0.220, 0.847],   // azul     · Democracia Viva
  [1.000, 0.294, 0.169],   // coral    · Niñez y adolescencia
  [0.059, 0.639, 0.420],   // verde    · Territorios del Futuro
  [1.000, 0.760, 0.180],   // amarillo · Economías que Conectan
  [0.180, 0.170, 0.140]    // tinta    · las voces todavía sin causa
];

const COMMON = `
  /* The field wraps so the walk never runs out of network — but it
     wraps BY COMMUNITY, using the anchor every member shares. Wrapping
     each node on its own tore links in half: one end jumped 1600 units
     down the tunnel and the link became a straight ray across the whole
     screen. That reads as a diagram of a network, which is the one
     thing this must never look like. */
  vec3 place(vec3 raw, float anchor, float camZ) {
    vec3 p = raw;
    p.z = raw.z + camZ - 1600.0 * floor((anchor + camZ + 1700.0) / 1600.0);
    return p;
  }
  float wetAt(sampler2D wet, vec4 clip) {
    if (clip.w <= 0.0) return 0.0;
    vec2 uv = clip.xy / clip.w * 0.5 + 0.5;
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return 0.0;
    return textureLod(wet, uv, 0.0).a;
  }`;

const VS_NODE = `#version 300 es
precision highp float;
in vec3 aPos; in vec3 aCol; in float aSize; in float aAnchor;
uniform mat4 uProj; uniform sampler2D uWet;
uniform float uCamZ, uPhase, uDensity, uDpr, uWetGain, uAccentMix;
uniform vec3 uAccent;
out vec3 vCol; out float vA; out float vWake;
${COMMON}
void main() {
  vec3 p = place(aPos, aAnchor, uCamZ);
  // ACTUAR pushes the field out from its axis, then it comes back in.
  float surge = smoothstep(0.45, 0.75, uPhase) * (1.0 - smoothstep(0.85, 1.0, uPhase));
  p.xy *= 1.0 + surge * 0.16;

  vec4 clip = uProj * vec4(p, 1.0);
  gl_Position = clip;

  float depth = clamp(1.0 - (-p.z - 150.0) / 1900.0, 0.0, 1.0);
  float wake = clamp(wetAt(uWet, clip) * uWetGain, 0.0, 1.0);
  vWake = wake;

  float sz = aSize * (0.85 + wake * 2.9) * sqrt(depth) * 44.0 * uDpr * 40.0 / max(clip.w, 0.001);
  gl_PointSize = max(sz, 1.25 * uDpr);
  // At rest a node is a fleck in the paper; the brush is what wakes it.
  vA = depth * (0.055 + uDensity * 0.045 + wake * 0.78);
  // A community takes on the colour of the cause the hand is standing on.
  vCol = mix(aCol, uAccent, wake * uAccentMix);
}`;

const FS_NODE = `#version 300 es
precision highp float;
in vec3 vCol; in float vA; in float vWake;
out vec4 frag;
void main() {
  vec2 d = gl_PointCoord - 0.5;
  float r = length(d);
  if (r > 0.5) discard;
  // A dot of ink: dense core, a soft halo only once it is awake.
  float core = smoothstep(0.42, 0.10, r);
  float halo = smoothstep(0.5, 0.14, r) * 0.35 * vWake;
  float a = clamp((core + halo) * vA, 0.0, 1.0);
  frag = vec4(vCol, a);
}`;

const VS_EDGE = `#version 300 es
precision highp float;
in vec3 aPos; in vec3 aCol; in float aAnchor;
uniform mat4 uProj; uniform sampler2D uWet;
uniform float uCamZ, uPhase, uDensity, uWetGain, uAccentMix;
uniform vec3 uAccent;
out vec3 vCol; out float vA;
${COMMON}
void main() {
  vec3 p = place(aPos, aAnchor, uCamZ);
  float surge = smoothstep(0.45, 0.75, uPhase) * (1.0 - smoothstep(0.85, 1.0, uPhase));
  p.xy *= 1.0 + surge * 0.16;

  vec4 clip = uProj * vec4(p, 1.0);
  gl_Position = clip;

  float depth = clamp(1.0 - (-p.z - 150.0) / 1900.0, 0.0, 1.0);
  float wake = clamp(wetAt(uWet, clip) * uWetGain, 0.0, 1.0);
  // APRENDER is where links matter: they thicken in the middle of the cycle.
  float learn = smoothstep(0.10, 0.45, uPhase);
  // Almost nothing at rest. The line is the visitor's doing.
  vA = depth * (0.012 + uDensity * 0.018 + (0.34 + learn * 0.22) * wake);
  vCol = mix(aCol, uAccent, wake * uAccentMix);
}`;

const FS_EDGE = `#version 300 es
precision highp float;
in vec3 vCol; in float vA;
out vec4 frag;
void main() { frag = vec4(vCol, clamp(vA, 0.0, 1.0)); }`;

export function createRed(gl, opts = {}) {
  const pNode = program(gl, VS_NODE, FS_NODE, 'nodos');
  const pEdge = program(gl, VS_EDGE, FS_EDGE, 'vínculos');
  if (!pNode || !pEdge) return null;

  const uN = uniforms(gl, pNode, ['uProj', 'uWet', 'uCamZ', 'uPhase', 'uDensity', 'uDpr', 'uWetGain', 'uAccent', 'uAccentMix']);
  const uE = uniforms(gl, pEdge, ['uProj', 'uWet', 'uCamZ', 'uPhase', 'uDensity', 'uWetGain', 'uAccent', 'uAccentMix']);

  const N = opts.count ?? 780;

  const pos    = new Float32Array(N * 3);
  const home   = new Float32Array(N * 3);
  const vel    = new Float32Array(N * 3);
  const col    = new Float32Array(N * 3);
  const size   = new Float32Array(N);
  const energy = new Float32Array(N);
  const seed   = new Float32Array(N);
  const anchor = new Float32Array(N);   // the community's own z
  const owner  = new Int32Array(N);     // which community a node belongs to

  /* Communities are placed in what the CAMERA sees, not in raw world
     units. A cluster 300 units away and one 1600 units away need very
     different widths to occupy the same part of the frame; placed by
     world coordinates the near ones fall off the edges and the middle
     of the screen ends up empty, so the brush reaches into nothing. */
  const CLUSTERS = 30;
  const REACH = 1.18;            // a little past the frame, so nothing pops in
  const WIDE = 1.35;             // reference aspect; margin covers the rest
  const cx = [], cy = [], cz = [], chh = [];
  for (let k = 0; k < CLUSTERS; k++) {
    const z = -260 - Math.random() * 1420;
    const hh = -z * TAN_HALF;
    cz.push(z); chh.push(hh);
    cx.push((Math.random() * 2 - 1) * REACH * hh * WIDE);
    cy.push((Math.random() * 2 - 1) * REACH * hh);
  }

  for (let i = 0; i < N; i++) {
    const k = (Math.random() * CLUSTERS) | 0;
    owner[i] = k; anchor[i] = cz[k];
    const sp = chh[k] * 0.15;                  // the community's own span
    const x = cx[k] + (Math.random() - 0.5) * sp * 2;
    const y = cy[k] + (Math.random() - 0.5) * sp * 1.8;
    const z = cz[k] - Math.random() * 150;
    pos[i * 3] = home[i * 3] = x;
    pos[i * 3 + 1] = home[i * 3 + 1] = y;
    pos[i * 3 + 2] = home[i * 3 + 2] = z;
    // Most of the field is plain ink; the causes colour a quarter of it.
    const c = Math.random() < 0.42 ? PALETTE[k % 4] : PALETTE[4];
    col[i * 3] = c[0]; col[i * 3 + 1] = c[1]; col[i * 3 + 2] = c[2];
    size[i] = 0.42 + Math.random() * 0.78;
    seed[i] = Math.random() * 6.283;
  }

  /* A fixed neighbour graph, built once: who is already near whom.
     Links stay INSIDE a community. What joins one community to another
     is not a line drawn by the machine — it is the visitor's own stroke
     passing over both. That is the argument, so it is also the rule. */
  const idx = [];
  for (let i = 0; i < N; i++) {
    let made = 0;
    for (let j = i + 1; j < N && made < 2; j++) {
      if (owner[j] === owner[i]) { idx.push(i, j); made++; }
    }
  }
  const edgeIdx = new Uint16Array(idx);

  const bufPos = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufPos);
  gl.bufferData(gl.ARRAY_BUFFER, pos, gl.DYNAMIC_DRAW);

  const bufCol = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufCol);
  gl.bufferData(gl.ARRAY_BUFFER, col, gl.STATIC_DRAW);

  const bufSize = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufSize);
  gl.bufferData(gl.ARRAY_BUFFER, size, gl.STATIC_DRAW);

  const bufAnchor = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufAnchor);
  gl.bufferData(gl.ARRAY_BUFFER, anchor, gl.STATIC_DRAW);

  const bufIdx = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufIdx);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, edgeIdx, gl.STATIC_DRAW);

  function bind(prog, withSize) {
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.bindBuffer(gl.ARRAY_BUFFER, bufPos);
    gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
    const aCol = gl.getAttribLocation(prog, 'aCol');
    gl.bindBuffer(gl.ARRAY_BUFFER, bufCol);
    gl.enableVertexAttribArray(aCol); gl.vertexAttribPointer(aCol, 3, gl.FLOAT, false, 0, 0);
    const aAnchor = gl.getAttribLocation(prog, 'aAnchor');
    gl.bindBuffer(gl.ARRAY_BUFFER, bufAnchor);
    gl.enableVertexAttribArray(aAnchor); gl.vertexAttribPointer(aAnchor, 1, gl.FLOAT, false, 0, 0);
    if (withSize) {
      const aSize = gl.getAttribLocation(prog, 'aSize');
      gl.bindBuffer(gl.ARRAY_BUFFER, bufSize);
      gl.enableVertexAttribArray(aSize); gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, 0, 0);
    } else {
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufIdx);
    }
    gl.bindVertexArray(null);
    return vao;
  }
  const vaoNode = bind(pNode, true);
  const vaoEdge = bind(pEdge, false);

  const proj = new Float32Array(16);
  const view = new Float32Array(16);
  const rot  = new Float32Array(16);
  let aspect = 1, t = 0;

  /* ---- Motion ------------------------------------------------ */

  /** The hand is a ray, not a point. Each node is drawn toward the
      place where that ray passes AT ITS OWN DEPTH — otherwise the
      gathering happens somewhere the cursor is not. */
  function update(dt, ptr) {
    t += dt;
    const reach = ptr.active ? 1 : 0;
    for (let i = 0; i < N; i++) {
      const i3 = i * 3;
      const s = seed[i];
      // A slow wobble: the field breathes even when nobody is looking.
      let tx = home[i3] + Math.sin(t * 0.19 + s) * 13.0;
      let ty = home[i3 + 1] + Math.cos(t * 0.16 + s * 1.7) * 11.0;
      const tz = home[i3 + 2];

      if (reach) {
        const depth = Math.max(120, -pos[i3 + 2]);
        const hh = depth * TAN_HALF;
        const rx = ptr.ndcX * hh * aspect;
        const ry = ptr.ndcY * hh;
        const R = hh * 0.40;
        const dx = rx - pos[i3], dy = ry - pos[i3 + 1];
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1e-4;
          const f = 1 - d / R;
          // A holding ring: they gather AROUND the hand, they do not
          // collapse into it. A crowd, not a drain.
          const ring = R * 0.24;
          const pull = f * f * (d - ring) * 0.34;
          tx += (dx / d) * pull; ty += (dy / d) * pull;
          energy[i] = Math.min(1, energy[i] + f * (0.09 + ptr.speed * 0.20));
        }
      }
      energy[i] *= 0.984;

      // Critically-damped-ish spring back to where the node belongs.
      const k = 3.0 + energy[i] * 5.0, damp = Math.exp(-4.2 * dt);
      vel[i3]     = (vel[i3] + (tx - pos[i3]) * k * dt) * damp;
      vel[i3 + 1] = (vel[i3 + 1] + (ty - pos[i3 + 1]) * k * dt) * damp;
      vel[i3 + 2] = (vel[i3 + 2] + (tz - pos[i3 + 2]) * k * dt) * damp;
      pos[i3]     += vel[i3] * dt;
      pos[i3 + 1] += vel[i3 + 1] * dt;
      pos[i3 + 2] += vel[i3 + 2] * dt;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, bufPos);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, pos);
  }

  function draw(state) {
    perspective(FOV, aspect, 60, 2600).forEach((v, i) => proj[i] = v);
    tilt(rot, state.tiltX, state.tiltY);
    mul(view, proj, rot);

    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, state.wet);

    gl.useProgram(pEdge);
    gl.uniformMatrix4fv(uE.uProj, false, view);
    gl.uniform1i(uE.uWet, 0);
    gl.uniform1f(uE.uCamZ, state.camZ);
    gl.uniform1f(uE.uPhase, state.phase);
    gl.uniform1f(uE.uDensity, state.density);
    gl.uniform1f(uE.uWetGain, state.wetGain);
    gl.uniform3f(uE.uAccent, state.accent[0], state.accent[1], state.accent[2]);
    gl.uniform1f(uE.uAccentMix, state.accentMix);
    gl.bindVertexArray(vaoEdge);
    gl.drawElements(gl.LINES, edgeIdx.length, gl.UNSIGNED_SHORT, 0);

    gl.useProgram(pNode);
    gl.uniformMatrix4fv(uN.uProj, false, view);
    gl.uniform1i(uN.uWet, 0);
    gl.uniform1f(uN.uCamZ, state.camZ);
    gl.uniform1f(uN.uPhase, state.phase);
    gl.uniform1f(uN.uDensity, state.density);
    gl.uniform1f(uN.uDpr, state.dpr);
    gl.uniform1f(uN.uWetGain, state.wetGain);
    gl.uniform3f(uN.uAccent, state.accent[0], state.accent[1], state.accent[2]);
    gl.uniform1f(uN.uAccentMix, state.accentMix);
    gl.bindVertexArray(vaoNode);
    gl.drawArrays(gl.POINTS, 0, N);
    gl.bindVertexArray(null);
  }

  function resize(a) { aspect = a; }

  function destroy() {
    [bufPos, bufCol, bufSize, bufAnchor, bufIdx].forEach(b => gl.deleteBuffer(b));
    [vaoNode, vaoEdge].forEach(v => gl.deleteVertexArray(v));
    gl.deleteProgram(pNode); gl.deleteProgram(pEdge);
  }

  return { update, draw, resize, destroy, count: N, edges: edgeIdx.length / 2,
           lit: (th = 0.25) => { let n = 0; for (let i = 0; i < N; i++) if (energy[i] > th) n++; return n; } };
}
