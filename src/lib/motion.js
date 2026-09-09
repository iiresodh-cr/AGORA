/* ============================================================
   ÁGORA · Motion
   One rAF loop drives every scroll-linked effect. Effects are
   registered as {el, fn} pairs and only run while their element
   is near the viewport, so cost stays flat as the page grows.
   Everything is transform/opacity only — no layout thrash.
   ============================================================ */

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp  = (a, b, t) => a + (b - a) * t;

/* ---------- Reveal on first intersection ---------- */

export function initReveal(root = document) {
  const items = root.querySelectorAll('[data-reveal], .line');
  if (reduce.matches) {
    items.forEach(el => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

  const vh = window.innerHeight;
  items.forEach(el => {
    // Anything already on screen at load is placed, not animated: the first
    // paint should be complete. Animating it would delay LCP and make the
    // headline depend on a transition that may never run.
    if (el.getBoundingClientRect().top < vh * 0.92) {
      el.classList.add('is-in', 'is-instant');
    } else {
      io.observe(el);
    }
  });
}

/* Stagger the masked lines of a heading so it types itself in. */
export function staggerLines(root = document) {
  root.querySelectorAll('.display').forEach(h => {
    h.querySelectorAll(':scope > .line').forEach((l, i) => {
      l.style.setProperty('--reveal-delay', `${i * 90}ms`);
    });
  });
}

/* ---------- Scroll engine ---------- */

const effects = [];
let ticking = false;
let lastY = window.scrollY;

/** Register a scroll-linked effect.
 *  fn receives progress 0→1 across the element's travel through the viewport. */
export function onScrollProgress(el, fn, opts = {}) {
  if (!el || reduce.matches) return;
  effects.push({ el, fn, start: opts.start ?? 'enter', pad: opts.pad ?? 0 });
}

function measure(e) {
  const r = e.el.getBoundingClientRect();
  const vh = window.innerHeight;
  // Progress from "element top hits viewport bottom" to "element bottom hits viewport top"
  const total = r.height + vh;
  const travelled = vh - r.top;
  return clamp(travelled / total);
}

function frame() {
  ticking = false;
  for (const e of effects) {
    const r = e.el.getBoundingClientRect();
    if (r.bottom < -400 || r.top > window.innerHeight + 400) continue;
    e.fn(measure(e), r);
  }
}

function request() {
  if (!ticking) { ticking = true; requestAnimationFrame(frame); }
}

export function startEngine() {
  if (reduce.matches) return;
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request, { passive: true });
  request();
}

/* ---------- Lazy background footage ----------
   Four autoplaying videos would decode continuously for the whole
   visit. Each one loads and plays only while its band is on screen. */

export function initLazyVideo() {
  const vids = document.querySelectorAll('[data-lazyvid]');
  if (!vids.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) {
        if (!v.dataset.loaded) { v.preload = 'auto'; v.load(); v.dataset.loaded = '1'; }
        if (!reduce.matches) v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, { rootMargin: '25% 0px 25% 0px' });

  vids.forEach(v => io.observe(v));
}

/* ---------- Parallax ---------- */

export function initParallax() {
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const depth = parseFloat(el.dataset.parallax) || 0.1;
    const inner = el.querySelector('video, img') || el;
    inner.style.willChange = 'transform';
    onScrollProgress(el, (p) => {
      const shift = (p - 0.5) * depth * 200;
      inner.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0) scale(1.06)`;
    });
  });
}

/* ---------- Nav: hide going down, show going up, invert over dark ---------- */

export function initNav(nav) {
  /* El umbral de la portada también es suelo oscuro, aunque no sea una
     banda: la barra tiene que invertirse encima de él igual que sobre
     las demás. */
  const darks = [...document.querySelectorAll('.band--dark, [data-oscuro]')];
  let hidden = false;

  const update = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-stuck', y > 12);

    if (y > 240 && y > lastY + 6 && !hidden) { nav.classList.add('is-hidden'); hidden = true; }
    else if ((y < lastY - 6 || y < 240) && hidden) { nav.classList.remove('is-hidden'); hidden = false; }
    lastY = y;

    // Invert when the bar sits over a dark band
    const probe = nav.offsetHeight * 0.6;
    const over = darks.some(d => {
      const r = d.getBoundingClientRect();
      return r.top <= probe && r.bottom >= probe;
    });
    nav.classList.toggle('is-over-dark', over);
  };

  window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  update();
}

/* ---------- Section spy for nav underline ---------- */

export function initSpy(links) {
  const map = new Map();
  links.forEach(a => {
    const id = a.getAttribute('href')?.replace('#', '');
    const sec = id && document.getElementById(id);
    if (sec) map.set(sec, a);
  });
  if (!map.size) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => a.classList.remove('is-current'));
      map.get(e.target)?.classList.add('is-current');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  map.forEach((_, sec) => io.observe(sec));
}

/* ---------- The cycle: ring draws, steps advance ---------- */

export function initCycle(rail, rueda, steps) {
  if (!rail || !steps.length) return;

  /* En pantallas angostas el carril de scrubbing se oculta por CSS y
     queda con altura cero — y un elemento de altura cero no produce
     progreso, así que la rueda se quedaría sin armar para siempre.
     Cuando eso pasa, el avance lo marca la propia sección. */
  const pista = rail.offsetHeight >= 40 ? rail : (rail.closest('.cycle') || rail);

  const pasos = rueda ? [...rueda.querySelectorAll('.rueda__paso')] : [];

  const marcar = (activo) => {
    steps.forEach((s, i) => s.classList.toggle('is-on', i <= activo));
    pasos.forEach((t, i) => t.classList.toggle('is-on', i === activo));
  };

  const svg = rueda ? rueda.querySelector('svg') : null;

  if (reduce.matches) {
    steps.forEach(s => s.classList.add('is-on'));
    if (svg) svg.style.setProperty('--p', '1');
    marcar(steps.length - 1);
    return;
  }

  onScrollProgress(pista, (p) => {
    // The sticky pane only holds while the rail's progress runs 0 → ~0.75
    // (rail height / (rail height + viewport)). Complete the turn inside
    // that window, or it unsticks while still unfinished.
    // El panel pegajoso sólo aguanta mientras el carril avanza 0 → ~0,75
    // (alto del carril / (alto + viewport)). Si la pista es la sección,
    // el recorrido es el entero.
    const t = pista === rail ? clamp((p - 0.04) / 0.62) : clamp(p);
    // Una sola cuenta gobierna las 121 piezas, el giro y el trazado.
    if (svg) svg.style.setProperty('--p', t.toFixed(4));
    marcar(Math.min(steps.length - 1, Math.floor(t * steps.length)));
  });
}

/* ---------- Horizontal travel for the projects rail ---------- */

export function initHorizontal(section, track) {
  if (!section || !track) return;
  if (reduce.matches || window.matchMedia('(max-width: 720px)').matches) return;

  onScrollProgress(section, (p) => {
    const over = Math.max(0, track.scrollWidth - window.innerWidth + 40);
    if (!over) return;
    // Only travel through the middle of the section's pass
    const t = clamp((p - 0.15) / 0.7);
    track.style.transform = `translate3d(${(-over * t).toFixed(1)}px, 0, 0)`;
  });
}

/* ---------- Magnetic pull on the primary call to action ---------- */

export function initMagnetic(els) {
  if (reduce.matches || !window.matchMedia('(hover: hover)').matches) return;
  els.forEach(el => {
    let raf = null, tx = 0, ty = 0, cx = 0, cy = 0;
    const run = () => {
      cx = lerp(cx, tx, 0.18); cy = lerp(cy, ty, 0.18);
      el.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      raf = (Math.abs(cx - tx) > 0.1 || Math.abs(cy - ty) > 0.1) ? requestAnimationFrame(run) : null;
    };
    el.addEventListener('pointermove', (ev) => {
      const r = el.getBoundingClientRect();
      tx = (ev.clientX - (r.left + r.width / 2)) * 0.22;
      ty = (ev.clientY - (r.top + r.height / 2)) * 0.32;
      if (!raf) raf = requestAnimationFrame(run);
    });
    el.addEventListener('pointerleave', () => {
      tx = 0; ty = 0;
      if (!raf) raf = requestAnimationFrame(run);
    });
  });
}

export { reduce };
