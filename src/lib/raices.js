/* raices.js — el umbral.
   ─────────────────────────────────────────────────────────────
   La franja de arriba es el único sitio del sitio donde el suelo es
   oscuro. Es deliberado: debajo empieza el papel, y ese salto es el
   umbral. Aquí no hay pigmento que restar —sobre negro no hay luz que
   quitar—, así que el pincel cambia de oficio: en vez de manchar,
   siembra. Cada tramo del trazo deja semillas, y de cada semilla sale
   un filamento que crece, se bifurca, alcanza a otros y se apaga.

   Esa es la frase del sitio dicha en movimiento: una persona toca, una
   conexión responde, otra se enciende, y poco a poco aparece la red.

   Cómo está hecho, y por qué así:
   · La telaraña en reposo se genera una vez y se cuece en mapas de
     bits. En reposo es un volcado por cuadro.
   · Lo que crece NO se redibuja entero cada cuadro. Se pinta sólo la
     punta nueva sobre un lienzo de rastro que se va borrando solo.
     Dibujar toda la historia en cada imagen costaría cien veces más y
     se vería igual.
   · Aquí sí se usa mezcla aditiva, al revés que en el resto del sitio.
     Sobre papel crema sumar luz no hace nada; sobre negro es la única
     física posible. La regla no cambia por capricho: cambia porque
     cambia el suelo.
   ───────────────────────────────────────────────────────────── */

const PALETA = [
  [255, 178,  52],   // ámbar
  [255,  96,  44],   // naranja quemado
  [231,  62,  50],   // rojo
  [ 86, 196, 128],   // verde
  [255, 216, 120]    // amarillo, el acento que remata
];

const MAX_VIVOS = 320;
const CAPAS = 3;
const PARALAJE = [8, 4, 1.6];

function semilla(s) {
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
}

/* El mismo organismo, en tres sitios: el umbral de arriba, el tejido
   que une el método con la agenda, y el cierre. Es el mismo código —no
   una copia—, con dos ajustes: si pinta o no su propio suelo (arriba
   sí, en las bandas oscuras no hace falta) y cuánta red trae. */
export function initRaices(host, opciones = {}) {
  const conSuelo = opciones.suelo !== false;
  const densidad = opciones.densidad ?? 1;
  const lienzo = host.querySelector('canvas');
  if (!lienzo) return null;
  const ctx = lienzo.getContext('2d', { alpha: true });
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0, H = 0, dpr = 1;
  let tramos = [], planos = [], unico = null;
  let rastro = null, rctx = null;

  /* ---- la telaraña que ya estaba ahí ---------------------- */
  function filamento(x, y, ang, pasos, grosor, gen, capa, tinte, rnd) {
    if (pasos < 4 || gen > 4) return;
    const puntos = [{ x, y }];
    let giro = (rnd() - .5) * .12;
    const paso = H * (.020 + rnd() * .018);
    for (let i = 0; i < pasos; i++) {
      giro = Math.max(-.26, Math.min(.26, giro + (rnd() - .5) * .09));
      ang += giro;
      x += Math.cos(ang) * paso; y += Math.sin(ang) * paso;
      puntos.push({ x, y });
      if (x < -W * .1 || x > W * 1.1 || y < -H * .15) break;
      if (i > 2 && rnd() < .17 && gen < 4) {
        filamento(x, y, ang + (rnd() < .5 ? -1 : 1) * (.5 + rnd() * .6),
                  Math.round(pasos * (.42 + rnd() * .28)),
                  grosor * (.55 + rnd() * .18), gen + 1, capa, tinte, rnd);
      }
    }
    if (puntos.length > 1) tramos.push({ puntos, grosor, capa, tinte, gen });
  }

  function sembrarTelaraña() {
    tramos = [];
    const rnd = semilla(20260826);
    for (let capa = 0; capa < CAPAS; capa++) {
      /* Más raíces cuanto más lejos: el plano de fondo es un tejido
         apretado y el de delante son cuatro trazos gruesos. Ese
         desequilibrio es lo que hace que se lea profundidad y no una
         maraña plana. Todo esto se cuece una sola vez. */
      const cuantas = Math.max(3, Math.round((capa === 0 ? 9 : capa === 1 ? 15 : 22) * densidad));
      for (let i = 0; i < cuantas; i++) {
        const x = W * ((i + .5 + (rnd() - .5) * .8) / cuantas);
        const y = H * (.96 + rnd() * .12);
        const ang = -Math.PI / 2 + (rnd() - .5) * 2.3;
        const pasos = Math.round((16 + rnd() * 20) * (1 - capa * .12));
        const grosor = (2.2 - capa * .58) * (.75 + rnd() * .55);
        filamento(x, y, ang, pasos, grosor, 0, capa,
                  PALETA[Math.floor(rnd() * PALETA.length)], rnd);
      }
    }
  }

  function cocer() {
    planos = [];
    for (let capa = 0; capa < CAPAS; capa++) {
      const c = document.createElement('canvas');
      c.width = lienzo.width; c.height = lienzo.height;
      const g = c.getContext('2d');
      g.scale(dpr, dpr); g.lineCap = 'round'; g.lineJoin = 'round';
      for (const t of tramos) {
        if (t.capa !== capa) continue;
        /* Sobre suelo oscuro hace falta bastante más tinta que sobre papel
   para que una línea de un píxel exista siquiera. Los valores no son
   los mismos porque el fondo no es el mismo. */
        const base = (.62 - capa * .14) * Math.max(.18, 1 - t.gen * .18);
        for (let i = 1; i < t.puntos.length; i++) {
          const k = i / (t.puntos.length - 1);
          g.strokeStyle = `rgba(${t.tinte[0]},${t.tinte[1]},${t.tinte[2]},${(base * (1 - k * .55)).toFixed(3)})`;
          g.lineWidth = Math.max(.35, t.grosor * (1 - k * .72));
          g.beginPath();
          g.moveTo(t.puntos[i - 1].x, t.puntos[i - 1].y);
          g.lineTo(t.puntos[i].x, t.puntos[i].y);
          g.stroke();
        }
      }
      planos.push(c);
    }
    unico = document.createElement('canvas');
    unico.width = lienzo.width; unico.height = lienzo.height;
    const gu = unico.getContext('2d');
    planos.forEach(p => gu.drawImage(p, 0, 0));
  }

  /* ---- lo que crece --------------------------------------- */
  const vivos = [];
  for (let i = 0; i < MAX_VIVOS; i++) {
    vivos.push({ on: false, x: 0, y: 0, px: 0, py: 0, ang: 0, vel: 0,
                 gen: 0, vida: 0, fin: 0, capa: 0, tinte: PALETA[0], grosor: 1, chispa: false });
  }
  let siguiente = 0;
  function nacer(x, y, ang, vel, gen, capa, tinte, grosor, fin, chispa) {
    for (let n = 0; n < MAX_VIVOS; n++) {
      const f = vivos[(siguiente + n) % MAX_VIVOS];
      if (f.on) continue;
      siguiente = (siguiente + n + 1) % MAX_VIVOS;
      f.on = true; f.x = f.px = x; f.y = f.py = y;
      f.ang = ang; f.vel = vel; f.gen = gen; f.vida = 0; f.fin = fin;
      f.capa = capa; f.tinte = tinte; f.grosor = grosor; f.chispa = chispa;
      return f;
    }
    return null;
  }

  /* ---- la mano -------------------------------------------- */
  let mx = 0, my = 0, dentro = false, energia = 0, ultimoRoce = 0;
  let manoX = -999, manoY = -999, manoPX = -999, manoPY = -999, rapidez = 0;

  function mano(e) {
    const r = lienzo.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const antes = dentro;
    dentro = x > -80 && x < r.width + 80 && y > -80 && y < r.height + 100;
    if (!dentro) { manoPX = manoPY = -999; return; }
    ultimoRoce = performance.now();
    if (antes && manoPX > -900) rapidez = Math.min(60, Math.hypot(x - manoPX, y - manoPY));
    else rapidez = 0;
    manoPX = manoX; manoPY = manoY;
    manoX = x; manoY = y;
    mx = (x / r.width - .5) * 2;
    my = (y / r.height - .5) * 2;
    if (antes) sembrarDesdeLaMano(x, y);
  }

  /* Lo que hace la mano depende de cómo se mueva. Despacio: pocas
     semillas, gruesas, que se quedan cerca y se ramifican mucho —el
     trazo se espesa donde uno se detiene—. Deprisa: muchas, finas,
     lanzadas lejos, y alguna chispa que se desprende. Es el mismo
     comportamiento que ya tiene el pincel sobre el papel, dicho en
     otro material. */
  function sembrarDesdeLaMano(x, y) {
    const v = rapidez;
    const lento = v < 9;
    const cuantas = lento ? (Math.random() < .55 ? 2 : 1) : Math.min(4, 2 + (v / 20) | 0);
    for (let i = 0; i < cuantas; i++) {
      const capa = (Math.random() * CAPAS) | 0;
      const tinte = PALETA[(Math.random() * PALETA.length) | 0];
      const dir = Math.atan2(y - manoPY, x - manoPX) || Math.random() * 6.2832;
      const ang = lento
        ? Math.random() * 6.2832                       // se abre en todas direcciones
        : dir + (Math.random() - .5) * 1.1;            // sale lanzada en el sentido del trazo
      nacer(x + (Math.random() - .5) * 10, y + (Math.random() - .5) * 10, ang,
            lento ? 1.3 + Math.random() * 1.2 : 2.6 + v * .07,
            0, capa, tinte,
            (lento ? 2.7 : 1.8) * (1 - capa * .20),
            lento ? 70 + Math.random() * 60 : 46 + Math.random() * 44,
            false);
      if (!lento && Math.random() < .5) {
        nacer(x, y, Math.random() * 6.2832, 1.4 + Math.random() * 2.2, 3, capa, tinte, 1.3,
              10 + Math.random() * 14, true);
      }
    }
  }

  function crecer() {
    rctx.globalCompositeOperation = 'lighter';
    for (const f of vivos) {
      if (!f.on) continue;
      f.px = f.x; f.py = f.y;
      if (f.chispa) {
        f.vel *= .93;
        f.ang += (Math.random() - .5) * .3;
      } else {
        f.ang += (Math.random() - .5) * .24;   // menos titubeo: llega más lejos
      }
      f.x += Math.cos(f.ang) * f.vel;
      f.y += Math.sin(f.ang) * f.vel;
      f.vida++;

      // nace, brilla y se apaga: nunca entra ni sale de golpe
      const k = f.vida / f.fin;
      const fuerza = k < .18 ? k / .18 : Math.max(0, 1 - (k - .18) / .82);
      const a = fuerza * (f.chispa ? .85 : .80) * (1 - f.capa * .16);
      if (a > .004) {
        rctx.strokeStyle = `rgba(${f.tinte[0]},${f.tinte[1]},${f.tinte[2]},${a.toFixed(3)})`;
        rctx.lineWidth = f.grosor * (f.chispa ? .7 : 1) * (1 - k * .45);
        rctx.beginPath(); rctx.moveTo(f.px, f.py); rctx.lineTo(f.x, f.y); rctx.stroke();
      }

      // Se bifurca por el costado, no por la punta: así la rama madre
      // sigue su camino y lo que queda es un árbol, no una cadena.
      if (!f.chispa && f.gen < 3 && f.vida > 4 && Math.random() < .075) {
        nacer(f.x, f.y, f.ang + (Math.random() < .5 ? -1 : 1) * (.55 + Math.random() * .55),
              f.vel * (.78 + Math.random() * .2), f.gen + 1, f.capa, f.tinte,
              f.grosor * .74, f.fin * (.55 + Math.random() * .25), false);
      }

      if (f.vida >= f.fin || f.x < -40 || f.x > W + 40 || f.y < -40 || f.y > H + 60) f.on = false;
    }
    rctx.globalCompositeOperation = 'source-over';
  }

  /* ---- medir ---------------------------------------------- */
  function medir() {
    /* Se mide el lienzo, no el contenedor. En el umbral coinciden,
       pero en el tejido el contenedor mide toda la sección —más de
       cinco mil píxeles— y el lienzo va pegado a la ventana: medir el
       contenedor creaba un mapa de bits de siete millones de píxeles
       para dibujar una franja de pantalla. */
    const r = lienzo.getBoundingClientRect();
    if (!r.width || !r.height) return false;
    // En pantallas pequeñas se baja la resolución: la franja es más
    // corta y el trabajo por cuadro tiene que caber en un teléfono.
    const techo = r.width < 700 ? 1.25 : 1.5;
    dpr = Math.min(techo, window.devicePixelRatio || 1);
    W = r.width; H = r.height;
    lienzo.width = Math.round(W * dpr); lienzo.height = Math.round(H * dpr);
    lienzo.style.width = W + 'px'; lienzo.style.height = H + 'px';

    rastro = document.createElement('canvas');
    rastro.width = lienzo.width; rastro.height = lienzo.height;
    rctx = rastro.getContext('2d');
    rctx.scale(dpr, dpr);
    rctx.lineCap = 'round'; rctx.lineJoin = 'round';

    sembrarTelaraña(); cocer();
    vivos.forEach(f => { f.on = false; });
    return true;
  }

  /* ---- el cuadro ------------------------------------------ */
  let corriendo = false, cuadros = 0;

  function fondo() {
    // El suelo del umbral. Se apoya en el color de tinta del sitio, no
    // en un negro cualquiera, y se disuelve hacia abajo para entregarle
    // el espacio al papel sin ningún corte.
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0,   'rgba(13, 11, 10, .97)');
    g.addColorStop(.52, 'rgba(17, 14, 12, .93)');
    g.addColorStop(.80, 'rgba(24, 20, 16, .62)');
    g.addColorStop(1,   'rgba(30, 25, 20, 0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  function cuadro(ahora) {
    if (!corriendo) return;
    const t = ahora / 1000;
    cuadros++;

    if (dentro && performance.now() - ultimoRoce > 700) { dentro = false; rapidez = 0; }
    let activos = 0;
    for (const f of vivos) if (f.on) activos++;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    if (conSuelo) fondo();

    if (!dentro && energia < .01 && !activos) {
      // Nada que atender: la telaraña late sola, en un solo volcado.
      ctx.globalAlpha = (.86 + Math.sin(t * .22) * .14) * .68;
      ctx.drawImage(unico, 0, 0, W, H);
      ctx.globalAlpha = 1;
    } else {
      for (let capa = 0; capa < CAPAS; capa++) {
        const late = .86 + Math.sin(t * (.22 + capa * .07) + capa * 2.1) * .14;
        ctx.globalAlpha = late * (.68 + energia * .3);
        ctx.drawImage(planos[capa], mx * PARALAJE[capa], my * PARALAJE[capa] * .45, W, H);
      }
      ctx.globalAlpha = 1;
    }

    if (activos) crecer();

    /* El rastro se borra a saltos y no cuadro a cuadro: con un alfa
       diminuto el borrado redondea a cero y la luz se queda pegada
       para siempre. Restando más de golpe cada cinco cuadros la caída
       sí llega hasta el fondo, y a doce pasos por segundo el ojo no ve
       el escalón. */
    if (rastro) {
      ctx.drawImage(rastro, 0, 0, W, H);
      if (cuadros % 5 === 0) {
        rctx.globalCompositeOperation = 'destination-out';
        rctx.fillStyle = 'rgba(0,0,0,.058)';
        rctx.fillRect(0, 0, W, H);
        rctx.globalCompositeOperation = 'source-over';
      }
    }

    energia = dentro ? Math.min(1, energia + .05) : energia * .96;
    requestAnimationFrame(cuadro);
  }

  if (!medir()) return null;

  if (reduce) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (conSuelo) fondo();
    ctx.globalAlpha = .68;
    ctx.drawImage(unico, 0, 0, W, H);
    return { destruir() {} };
  }

  /* Sólo dibuja el que se está viendo. Con tres organismos en la
     página, dejar los tres girando fuera de pantalla sería pagar tres
     veces por dos cosas que nadie mira. */
  const arrancar = () => { if (!corriendo) { corriendo = true; requestAnimationFrame(cuadro); } };
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) arrancar(); else corriendo = false;
  }, { rootMargin: '15% 0px 15% 0px' }).observe(host);
  arrancar();
  window.addEventListener('pointermove', mano, { passive: true });
  ['pointerup', 'pointercancel'].forEach(ev =>
    window.addEventListener(ev, () => { dentro = false; rapidez = 0; manoPX = -999; }, { passive: true }));
  let remedir;
  addEventListener('resize', () => { clearTimeout(remedir); remedir = setTimeout(medir, 180); }, { passive: true });

  return { destruir() { corriendo = false; window.removeEventListener('pointermove', mano); } };
}
