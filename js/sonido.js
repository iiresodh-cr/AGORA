/* ============================================================
   ÁGORA · Sonido
   ------------------------------------------------------------
   Sound is never on until someone asks for it. No autoplay, no
   permission prompt, no modal on arrival — the visitor decides,
   and the decision is remembered.

   The control is two words and a rule. It reads as a caption in
   the margin of the page, not as a media player.

   The file is streamed through a GainNode so the music arrives
   and leaves on a ramp; cutting a track dead is the one thing
   that always sounds like a website.
   ============================================================ */

const KEY = 'agora:sonido';
const FADE_IN = 2.4;
const FADE_OUT = 1.1;

export function initSonido(src = 'assets/audio/ambiente.mp3') {
  const btn = document.getElementById('sonido');
  if (!btn) return null;

  let el = null, ctx = null, gain = null, node = null;
  let on = false, ready = false;

  const label = btn.querySelector('[data-sonido-estado]');
  const paint = () => {
    btn.setAttribute('aria-pressed', String(on));
    btn.classList.toggle('is-on', on);
    if (label) label.textContent = on ? 'ON' : 'OFF';
  };

  /* Ask the host whether the piece exists before offering the control.
     A button that fails on the first click is worse than no button. */
  fetch(src, { method: 'HEAD' })
    .then(r => { if (r.ok) { btn.hidden = false; ready = true; restore(); } })
    .catch(() => {});

  function build() {
    if (el) return;
    el = new Audio(src);
    el.loop = true;
    el.crossOrigin = 'anonymous';
    el.preload = 'auto';
    const AC = window.AudioContext || window.webkitAudioContext;
    if (AC) {
      ctx = new AC();
      node = ctx.createMediaElementSource(el);
      gain = ctx.createGain();
      gain.gain.value = 0.0001;
      node.connect(gain).connect(ctx.destination);
    } else {
      el.volume = 0;                       // ramped by hand below
    }
  }

  function ramp(to, secs) {
    if (gain && ctx) {
      const t = ctx.currentTime;
      gain.gain.cancelScheduledValues(t);
      gain.gain.setValueAtTime(Math.max(0.0001, gain.gain.value), t);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, to), t + secs);
    } else if (el) {
      const from = el.volume, t0 = performance.now();
      const tick = () => {
        const k = Math.min(1, (performance.now() - t0) / (secs * 1000));
        el.volume = from + (to - from) * k;
        if (k < 1) requestAnimationFrame(tick);
      };
      tick();
    }
  }

  async function play() {
    build();
    if (ctx?.state === 'suspended') await ctx.resume();
    try { await el.play(); } catch { on = false; paint(); return; }
    on = true; paint();
    ramp(0.55, FADE_IN);
    localStorage.setItem(KEY, '1');
  }

  function stop() {
    on = false; paint();
    localStorage.setItem(KEY, '0');
    if (!el) return;
    ramp(0.0001, FADE_OUT);
    setTimeout(() => { if (!on) el.pause(); }, FADE_OUT * 1000 + 60);
  }

  /* A remembered "on" still needs a gesture: browsers require one, and
     so does good manners. The first click anywhere resumes it. */
  function restore() {
    if (localStorage.getItem(KEY) !== '1') { paint(); return; }
    const once = () => {
      document.removeEventListener('pointerdown', once);
      document.removeEventListener('keydown', once);
      play();
    };
    document.addEventListener('pointerdown', once, { once: true });
    document.addEventListener('keydown', once, { once: true });
    paint();
  }

  btn.addEventListener('click', () => { if (!ready) return; on ? stop() : play(); });

  // Nothing plays into an empty room.
  document.addEventListener('visibilitychange', () => {
    if (!on || !el) return;
    if (document.hidden) { ramp(0.0001, 0.4); setTimeout(() => { if (document.hidden) el.pause(); }, 460); }
    else { el.play().catch(() => {}); ramp(0.55, 1.2); }
  });

  paint();
  return { get on() { return on; }, stop };
}
