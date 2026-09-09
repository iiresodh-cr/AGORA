/* ============================================================
   ÁGORA · El Campo
   ------------------------------------------------------------
   One canvas, one WebGL2 context, one animation frame. It owns
   the hand (the pointer), the paint (pigmento) and the weave
   (red), and it is the only place where they meet.

   The brush is not a cursor decoration. It has a load, a
   direction and a speed, and the page answers each of them:

     slow      concentrated pigment, round marks, deep colour
     fast      the mark stretches along the stroke and thins,
               and the loaded brush throws small spatters
     steady    the wash builds where you keep passing
     stopped   the water finishes spreading, the edge sets,
               and the mark fades over a few seconds

   Colour is not random. The pigment carries the colour of the
   cause under the pointer; away from the causes it drifts
   slowly through Ágora's four accents and they mix on contact.
   ============================================================ */

import { createPigmento } from './pigmento.js';
import { createRed } from './red.js';

const MAX_DPR = 1.75;
const MAX_STAMPS_FRAME = 22;

/* The four causes, as pigments. Absorbance is computed from these. */
const INKS = [
  [0.141, 0.220, 0.847],   // azul
  [1.000, 0.294, 0.169],   // coral
  [0.059, 0.639, 0.420],   // verde
  [1.000, 0.760, 0.180]    // amarillo
];

const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;

function cssRGB(str, fallback) {
  const m = String(str).trim();
  if (/^#[0-9a-f]{6}$/i.test(m)) {
    return [parseInt(m.slice(1, 3), 16) / 255, parseInt(m.slice(3, 5), 16) / 255, parseInt(m.slice(5, 7), 16) / 255];
  }
  const n = m.match(/rgba?\(([^)]+)\)/i);
  if (n) {
    const p = n[1].split(/[ ,\/]+/).map(Number);
    return [p[0] / 255, p[1] / 255, p[2] / 255];
  }
  return fallback;
}

export function createCampo(canvas, opts = {}) {
  const gl = canvas.getContext('webgl2', {
    alpha: true, antialias: false, premultipliedAlpha: true,
    depth: false, stencil: false, powerPreference: 'high-performance'
  });
  if (!gl) return null;

  const pig = createPigmento(gl, { scale: opts.simScale ?? 0.62, cap: opts.simCap ?? 1400 });
  const red = createRed(gl, { count: opts.count ?? 780 });
  if (!pig || !red) return null;

  const paper = cssRGB(getComputedStyle(document.documentElement).getPropertyValue('--paper'), [0.941, 0.898, 0.792]);

  let cw = 1, ch = 1, dpr = 1, aspect = 1;
  let raf = 0, last = 0, active = true, running = false;

  /* ---- the hand ---------------------------------------------- */
  const hand = {
    x: 0, y: 0,          // where the pointer is now (css px)
    px: 0, py: 0,        // where the brush has painted up to
    has: false,          // has the visitor moved at all yet
    down: false,
    speed: 0,            // px per second, smoothed
    ndcX: 0, ndcY: 0,
    smX: 0, smY: 0,      // smoothed, for the parallax tilt
    idle: 0
  };

  /* Una zona donde el pincel se calla. En la sección de las Caravanas
     el trazo deja de dar pigmento y pasa a dar interferencia: si además
     siguiera pintando, serían dos cosas a la vez y ninguna se leería. */
  let zonaMuda = null;
  function enMudo() {
    if (!zonaMuda) return false;
    const r = zonaMuda.getBoundingClientRect();
    const c = canvas.getBoundingClientRect();
    const x = c.left + hand.x, y = c.top + hand.y;
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  }

  /* ---- the load on the brush --------------------------------- */
  const brush = {
    travel: 0,           // distance painted, drives the colour drift
    accent: null,        // colour of whatever the pointer is over
    accentMix: 0
  };

  const state = {
    scroll: 0, camZ: 0, density: 0.25,
    phase: 0, tPhase: 0,
    tiltX: 0, tiltY: 0,
    wetGain: opts.wetGain ?? 1.55,
    accent: [0.18, 0.17, 0.14], accentMix: 0,
    dpr: 1, wet: null
  };

  /* ---- geometry ---------------------------------------------- */

  function resize() {
    const r = canvas.getBoundingClientRect();
    cw = Math.max(1, Math.round(r.width));
    ch = Math.max(1, Math.round(r.height));
    dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1);
    canvas.width = Math.round(cw * dpr);
    canvas.height = Math.round(ch * dpr);
    aspect = cw / ch;
    state.dpr = dpr;
    red.resize(aspect);
    pig.resize(cw, ch, dpr);
  }

  /* ---- painting ---------------------------------------------- */

  /** Deposit one mark. Sizes arrive in CSS pixels and are converted
      into the pigment buffer's own space, so the look does not change
      when the buffer resolution does. */
  function mark(x, y, radCss, stretch, ang, ink, str) {
    const [W, H] = pig.size;
    const k = W / cw;
    const cx = (x / cw) * 2 - 1;
    const cy = 1 - (y / ch) * 2;
    const r = radCss * k;
    pig.stamp(cx, cy, r * stretch, r, ang,
      [1 - ink[0], 1 - ink[1], 1 - ink[2]], str, Math.random() * 10);
  }

  /** The colour currently on the brush: the cause under the pointer if
      there is one, otherwise a slow walk through the four accents that
      lets consecutive strokes overlap and mix. */
  function inkNow() {
    const t = brush.travel * 0.0011;
    const i = Math.floor(t) % INKS.length;
    const j = (i + 1) % INKS.length;
    const f = t - Math.floor(t);
    const base = [
      lerp(INKS[i][0], INKS[j][0], f),
      lerp(INKS[i][1], INKS[j][1], f),
      lerp(INKS[i][2], INKS[j][2], f)
    ];
    if (!brush.accent || brush.accentMix <= 0.01) return base;
    const m = brush.accentMix;
    return [
      lerp(base[0], brush.accent[0], m),
      lerp(base[1], brush.accent[1], m),
      lerp(base[2], brush.accent[2], m)
    ];
  }

  function paintPath(dt) {
    if (!hand.has) return;
    // Dentro de la zona muda se sigue el recorrido pero no se deposita:
    // así al salir el trazo continúa desde donde está la mano y no
    // pega un salto desde donde entró.
    if (enMudo()) { hand.px = hand.x; hand.py = hand.y; return; }
    let dx = hand.x - hand.px, dy = hand.y - hand.py;
    let dist = Math.hypot(dx, dy);

    // Speed drives everything below. Smoothed, so a single jittery
    // event cannot make the stroke jump between two behaviours.
    const inst = dt > 0 ? dist / dt : 0;
    hand.speed = lerp(hand.speed, inst, dist > 0.4 ? 0.35 : 0.12);

    if (dist < 0.6) { hand.idle += dt; return; }
    hand.idle = 0;

    const ux = dx / dist, uy = dy / dist;
    const v = clamp(hand.speed / 1500, 0, 1);

    // Faster hands lay marks further apart: the stroke gets longer and
    // lighter instead of flooding the pool with overlapping blots.
    let step = clamp(9 + v * 21, 9, 30);
    let n = Math.floor(dist / step);
    if (n > MAX_STAMPS_FRAME) { n = MAX_STAMPS_FRAME; step = dist / n; }
    if (n < 1) { return; }

    const ang = Math.atan2(uy, ux);
    const ink = inkNow();
    // A brush is never perfectly loaded: neighbouring marks pull a little
    // toward the next pigment, so a single stroke is never one flat hue.
    const near = INKS[(Math.floor(brush.travel * 0.0011) + 1) % INKS.length];

    for (let k = 1; k <= n; k++) {
      const x = hand.px + ux * step * k;
      const y = hand.py + uy * step * k;

      const rad = (15 + v * 17) * (0.86 + Math.random() * 0.30);
      const stretch = 1 + v * 1.7;
      const str = (0.58 - v * 0.30) * (0.82 + Math.random() * 0.36);
      const j = Math.random() * 0.22;
      mark(x, y, rad, stretch, ang,
           [lerp(ink[0], near[0], j), lerp(ink[1], near[1], j), lerp(ink[2], near[2], j)], str);

      // A loaded brush moved quickly throws pigment off its tip.
      if (v > 0.5 && Math.random() < 0.22 * v) {
        const side = Math.random() < 0.5 ? 1 : -1;
        const off = rad * (1.4 + Math.random() * 2.4) * side;
        mark(x - uy * off, y + ux * off,
             rad * (0.10 + Math.random() * 0.16), 1, ang, ink, 0.85);
      }
    }

    brush.travel += step * n;
    hand.px += ux * step * n;
    hand.py += uy * step * n;
  }

  /* ---- loop --------------------------------------------------- */

  function frame(now) {
    raf = requestAnimationFrame(frame);
    if (!last) last = now;
    let dt = (now - last) / 1000;
    last = now;
    if (dt > 0.05) dt = 0.05;               // a stalled tab must not lurch
    if (!active) return;

    // Everything eases toward its target; nothing snaps.
    state.camZ = lerp(state.camZ, state.scroll * 900, 1 - Math.pow(0.001, dt));
    /* The field does not only deepen as you descend — it deepens with
       what you have painted. Someone who crossed the page without
       touching it sees a thin network; someone who worked it sees a
       woven one. The page is built by being walked through. */
    const woven = Math.min(0.30, brush.travel / 26000);
    state.density = lerp(state.density, Math.min(1, 0.25 + state.scroll * 0.55 + woven), 1 - Math.pow(0.01, dt));
    state.phase = lerp(state.phase, state.tPhase, 1 - Math.pow(0.02, dt));

    hand.smX = lerp(hand.smX, hand.ndcX, 1 - Math.pow(0.004, dt));
    hand.smY = lerp(hand.smY, hand.ndcY, 1 - Math.pow(0.004, dt));
    state.tiltX = -hand.smY * 0.030;
    state.tiltY = hand.smX * 0.044;

    brush.accentMix = lerp(brush.accentMix, brush.accent ? 1 : 0, 1 - Math.pow(0.05, dt));
    if (brush.accent) state.accent = brush.accent;
    state.accentMix = brush.accentMix * 0.9;

    paintPath(dt);
    pig.step(dt);
    state.wet = pig.texture;

    red.update(dt, {
      active: hand.has && hand.idle < 1.2,
      ndcX: hand.ndcX, ndcY: hand.ndcY,
      speed: clamp(hand.speed / 1500, 0, 1)
    });

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    pig.paint(paper, canvas.width, canvas.height, opts.gain ?? 2.1, opts.maxCov ?? 0.46);
    red.draw(state);
  }

  /* ---- input --------------------------------------------------- */

  function onMove(e) {
    const r = canvas.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    if (!hand.has) { hand.px = x; hand.py = y; hand.has = true; }
    hand.x = x; hand.y = y;
    hand.ndcX = (x / cw) * 2 - 1;
    hand.ndcY = 1 - (y / ch) * 2;
  }

  function onLeave() { hand.idle = 99; hand.speed = 0; }

  /* The page tells the brush which cause it is standing on. Reading it
     on hover changes only — never per frame — keeps style reads out of
     the animation loop. */
  function onOver(e) {
    const el = e.target instanceof Element ? e.target.closest('[style*="--c"]') : null;
    if (!el) { brush.accent = null; return; }
    const c = getComputedStyle(el).getPropertyValue('--c');
    brush.accent = c ? cssRGB(c, null) : null;
  }

  const ro = new ResizeObserver(() => resize());

  function start() {
    if (running) return;
    running = true;
    resize();
    ro.observe(canvas);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerleave', onLeave, { passive: true });
    last = 0;
    raf = requestAnimationFrame(frame);
  }

  function destroy() {
    cancelAnimationFrame(raf);
    running = false;
    ro.disconnect();
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerdown', onMove);
    document.removeEventListener('pointerover', onOver);
    document.removeEventListener('pointerleave', onLeave);
    pig.destroy(); red.destroy();
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  }

  start();

  return {
    resize, destroy,
    setScroll(p) { state.scroll = clamp(p, 0, 1); },
    setCycle(t) { state.tPhase = clamp(t, 0, 1); },
    setActive(on) { active = !!on; if (on) last = 0; },
    setZonaMuda(el) { zonaMuda = el || null; },
    get phase() { return state.phase; },
    debug() {
      return {
        nodes: red.count, edges: red.edges, lit: red.lit(),
        sim: pig.size, float: pig.float,
        speed: Math.round(hand.speed), travel: Math.round(brush.travel),
        phase: +state.phase.toFixed(3), density: +state.density.toFixed(3),
        woven: +Math.min(0.30, brush.travel / 26000).toFixed(3),
        camZ: Math.round(state.camZ), dpr,
        accent: brush.accent ? brush.accent.map(v => Math.round(v * 255)) : null
      };
    }
  };
}
