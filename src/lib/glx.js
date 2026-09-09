/* ============================================================
   ÁGORA · GL helpers
   The smallest possible layer over WebGL2: compile, link, a
   fullscreen triangle and a render target. Shared by the two
   systems that draw the field (pigmento, red) so both live in
   ONE context — the network has to read the pigment texture,
   and cross-context reads are impossible.
   ============================================================ */

export function compile(gl, type, src, label) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn(`[campo] ${label}:`, gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function program(gl, vsSrc, fsSrc, label = 'shader') {
  const vs = compile(gl, gl.VERTEX_SHADER, vsSrc, `${label} vs`);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fsSrc, `${label} fs`);
  if (!vs || !fs) return null;
  const p = gl.createProgram();
  gl.attachShader(p, vs); gl.attachShader(p, fs);
  gl.linkProgram(p);
  gl.deleteShader(vs); gl.deleteShader(fs);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.warn(`[campo] link ${label}:`, gl.getProgramInfoLog(p));
    gl.deleteProgram(p);
    return null;
  }
  return p;
}

/** Uniform locations by name, resolved once. */
export function uniforms(gl, prog, names) {
  const u = {};
  names.forEach(n => u[n] = gl.getUniformLocation(prog, n));
  return u;
}

/** One oversized triangle beats a quad: no diagonal seam, 1 fewer vertex. */
export function fullscreenTriangle(gl) {
  const vao = gl.createVertexArray();
  const buf = gl.createBuffer();
  gl.bindVertexArray(vao);
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.bindVertexArray(null);
  return { vao, buf, draw() { gl.bindVertexArray(vao); gl.drawArrays(gl.TRIANGLES, 0, 3); } };
}

/** A colour-renderable target. Falls back to 8-bit when float is absent. */
export function makeTarget(gl, w, h, fmt) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, fmt.internal, w, h, 0, gl.RGBA, fmt.type, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, null);
  if (!ok) { gl.deleteTexture(tex); gl.deleteFramebuffer(fbo); return null; }
  return { tex, fbo, w, h };
}

/** Best available precision for the pigment buffer. */
export function pickFormat(gl) {
  if (gl.getExtension('EXT_color_buffer_float')) {
    return { internal: gl.RGBA16F, type: gl.HALF_FLOAT, float: true };
  }
  if (gl.getExtension('EXT_color_buffer_half_float')) {
    return { internal: gl.RGBA16F, type: gl.HALF_FLOAT, float: true };
  }
  return { internal: gl.RGBA8, type: gl.UNSIGNED_BYTE, float: false };
}

export function perspective(fovy, aspect, near, far) {
  const f = 1 / Math.tan(fovy / 2), nf = 1 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, 2 * far * near * nf, 0
  ]);
}

/** m = a · b, both column-major mat4. */
export function mul(out, a, b) {
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 4; r++) {
      out[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] +
                       a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3];
    }
  }
  return out;
}

/** Small tilt around Y then X — the field leans toward the hand. */
export function tilt(out, ax, ay) {
  const cx = Math.cos(ax), sx = Math.sin(ax);
  const cy = Math.cos(ay), sy = Math.sin(ay);
  out[0] = cy;       out[1] = sy * sx;  out[2] = -sy * cx; out[3] = 0;
  out[4] = 0;        out[5] = cx;       out[6] = sx;       out[7] = 0;
  out[8] = sy;       out[9] = -cy * sx; out[10] = cy * cx; out[11] = 0;
  out[12] = 0;       out[13] = 0;       out[14] = 0;       out[15] = 1;
  return out;
}

/** Shared noise: one hash, value noise, fbm. Used by every shader here. */
export const NOISE_GLSL = `
float hash21(vec2 p){ p = fract(p * vec2(127.317, 311.702)); p += dot(p, p + 43.117); return fract(p.x * p.y); }
float vnoise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i), b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0)), d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p){
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { s += a * vnoise(p); p = p * 2.03 + 17.13; a *= 0.5; }
  return s;
}`;
