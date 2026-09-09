/* humo.js — el círculo exhala color.
   ─────────────────────────────────────────────────────────────
   En «El método · nuestra alma» la rueda es el centro de todo, y cada
   tanto suelta una nube de pigmento: nace en su borde o en su centro,
   se expande hacia afuera, deriva con un viento muy flojo y se
   deshace. No es confeti ni chispas ni una red de líneas —eso vive en
   la agenda y en el cierre, y es otra cosa—. Es humo.

   Las nubes se anclan a la rueda de verdad: se le pregunta al elemento
   dónde está y de qué tamaño es en el momento de nacer cada una, en
   vez de escribir coordenadas a mano. Así siguen saliendo del círculo
   aunque cambie el tamaño de la pantalla o la sección se mueva.

   Nunca hay más de cuatro a la vez y entre una y otra pasan segundos:
   el efecto respira, no estalla. Fuera de pantalla el bucle se
   detiene del todo. */

/* Seis pigmentos, ya en rgba y con la opacidad baja: ninguno es un
   neón al cien por cien. */
const PALETA = [
  'rgba(255, 107, 53, 0.35)',   // naranja
  'rgba(255, 65, 108, 0.30)',   // magenta / rosa
  'rgba(0, 180, 216, 0.30)',    // cyan
  'rgba(114, 9, 183, 0.25)',    // violeta
  'rgba(56, 163, 165, 0.30)',   // verde azulado
  'rgba(255, 190, 11, 0.25)'    // amarillo
];

const azar = (min, max) => Math.random() * (max - min) + min;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export function initHumo(host, opciones = {}) {
  const lienzo = host.querySelector('canvas');
  if (!lienzo) return null;
  const ctx = lienzo.getContext('2d');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null;

  const rueda = document.querySelector(opciones.centro || '#cycleRueda');

  /* En pantallas pequeñas se baja el techo y el desenfoque: un teléfono
     modesto no tiene por qué pagar cuatro difuminados a la vez. */
  const flaco = matchMedia('(max-width: 700px)').matches
                || (navigator.hardwareConcurrency || 8) <= 4;
  const TECHO   = flaco ? 2 : 4;
  const DIFUSO  = flaco ? [20, 40] : [20, 60];
  const ESPERA  = [2000, 5000];
  const VIDA    = [4000, 8000];
  const RADIO   = [80, 200];

  let W = 0, H = 0, dpr = 1, medido = false;
  let corriendo = false, bombas = [], ultima = 0, proxima = azar(...ESPERA);

  /* De dónde sale. Se le pregunta a la rueda su sitio y su tamaño en
     cada nacimiento —no se guardan— porque la sección es pegajosa y el
     círculo se mueve por la pantalla mientras se baja. */
  function origen() {
    if (rueda) {
      const r = rueda.getBoundingClientRect();
      const c = lienzo.getBoundingClientRect();
      if (r.width > 20) {
        const cx = r.left - c.left + r.width / 2;
        const cy = r.top - c.top + r.height / 2;
        const radio = Math.min(r.width, r.height) / 2;
        // dos de cada tres salen del borde; la otra, del centro mismo
        if (Math.random() < .68) {
          const a = Math.random() * Math.PI * 2;
          const d = radio * azar(0.8, 1.2);
          return { x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d, a };
        }
        return { x: cx + azar(-18, 18), y: cy + azar(-18, 18), a: Math.random() * Math.PI * 2 };
      }
    }
    // sin rueda a la vista, en cualquier parte del lienzo
    const a = Math.random() * Math.PI * 2;
    return { x: azar(0, W), y: azar(0, H), a };
  }

  function nacer() {
    const o = origen();
    /* La deriva empuja hacia afuera del círculo y sube un poco: el humo
       se aleja de donde nació y tira hacia arriba. Muy despacio — a
       más velocidad dejaría de parecer humo. */
    const v = azar(0.06, 0.22);
    return {
      x: o.x, y: o.y,
      vx: Math.cos(o.a) * v + azar(-0.04, 0.04),
      vy: Math.sin(o.a) * v - azar(0.02, 0.09),
      maxRadius: azar(...RADIO),
      color: PALETA[Math.floor(azar(0, PALETA.length))],
      birth: performance.now(),
      life: azar(...VIDA),
      radius: 0, opacity: 0, blur: DIFUSO[0],
      dead: false
    };
  }

  function animar(ahora) {
    if (!corriendo) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    if (bombas.length < TECHO && ahora - ultima > proxima) {
      bombas.push(nacer());
      ultima = ahora;
      proxima = azar(...ESPERA);
    }

    for (const b of bombas) {
      const progreso = (ahora - b.birth) / b.life;
      if (progreso >= 1) { b.dead = true; continue; }

      const k = easeOutCubic(progreso);          // abre rápido y se calma
      b.radius  = b.maxRadius * k;
      b.opacity = 0.6 * (1 - progreso);          // se va durante toda su vida
      b.blur    = DIFUSO[0] + (DIFUSO[1] - DIFUSO[0]) * k;
      b.x += b.vx; b.y += b.vy;                  // el viento flojo
      if (b.radius < 1) continue;

      ctx.save();
      ctx.filter = `blur(${b.blur.toFixed(1)}px)`;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fillStyle = b.color;
      ctx.globalAlpha = b.opacity;
      ctx.fill();
      ctx.restore();
    }

    bombas = bombas.filter(b => !b.dead);
    requestAnimationFrame(animar);
  }

  function medir() {
    const r = lienzo.getBoundingClientRect();
    if (!r.width || !r.height) return false;
    dpr = Math.min(flaco ? 1.25 : 1.5, window.devicePixelRatio || 1);
    W = r.width; H = r.height;
    lienzo.width = Math.round(W * dpr);
    lienzo.height = Math.round(H * dpr);
    lienzo.style.width = W + 'px';
    lienzo.style.height = H + 'px';
    return true;
  }

  /* Se mide al entrar en pantalla y no al arrancar: la sección está muy
     por debajo del pliegue y en ese momento puede no tener caja. */
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) {
      if (!medido) medido = medir();
      if (!corriendo) {
        corriendo = true;
        ultima = performance.now();
        requestAnimationFrame(animar);
      }
    } else {
      corriendo = false;
      bombas = [];
      if (W && H) { ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H); }
    }
  }, { rootMargin: '10% 0px 10% 0px' }).observe(host);

  let remedir;
  addEventListener('resize', () => {
    clearTimeout(remedir);
    remedir = setTimeout(() => { medido = medir(); }, 180);
  }, { passive: true });

  return {
    soltar() { if (bombas.length < TECHO) bombas.push(nacer()); },
    destruir() { corriendo = false; }
  };
}
