/* ============================================================
   ÁGORA · App
   Renders the data-driven sections, wires navigation and the
   cause routing. Cause pages use ?causa=<slug> so the URL is
   shareable and the back button works on any static host —
   no server rewrite rules required.
   ============================================================ */

import {
  PHRASES, MARQUEE, ORDER, CAUSES, CYCLE, DIMS,
  AGENDA, VOICES, LUPA, ALLIES, JOIN, DIMENSIONES, PAQUETES
} from './data.js';

import {
  initReveal, staggerLines, startEngine, initParallax, initNav, initSpy,
  initCycle, initMagnetic, initLazyVideo, onScrollProgress, reduce
} from './motion.js';

import { initCasa3D, CAPAS } from './casa3d.js';
import { createCampo } from './campo.js';
import { initSonido } from './sonido.js';
import { initRaices } from './raices.js';
import { initHumo } from './humo.js';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s = '') => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ══════════════ RENDER ══════════════ */

function renderMarquee() {
  const el = $('#marquee'); if (!el) return;
  const once = MARQUEE.map(t => `<span>${esc(t)} <b>●</b></span>`).join('');
  el.innerHTML = once + once;           // duplicated for a seamless loop
}


/* Los emblemas de las causas.
   El metraje que había aquí no decía nada de cada causa: era paisaje.
   Esto es materia dibujada que hace lo que la causa afirma —la red que
   se teje, la voz que se alza, el agua que se vigila, el intercambio
   que circula—. Se dibuja en el color de la causa sobre papel, y sólo
   se mueve mientras alguien la está mirando. */
const EMBLEMAS = {
  democracia: `
    <svg viewBox="0 0 120 160" class="emb emb--red" aria-hidden="true">
      <g class="emb__hilos" stroke="var(--c)" stroke-width="1.1" fill="none" opacity=".55"
         pathLength="1" stroke-dasharray="1" stroke-dashoffset="1">
        <path d="M30 44 L60 30 M60 30 L92 52 M92 52 L82 104 M82 104 L44 124 M44 124 L24 82 M24 82 L30 44
                 M30 44 L82 104 M60 30 L44 124 M92 52 L24 82"/>
      </g>
      <g class="emb__nodos" fill="var(--c)">
        <circle cx="30" cy="44" r="4.6"/><circle cx="60" cy="30" r="4.6"/><circle cx="92" cy="52" r="4.6"/>
        <circle cx="82" cy="104" r="4.6"/><circle cx="44" cy="124" r="4.6"/><circle cx="24" cy="82" r="4.6"/>
      </g>
    </svg>`,

  juventud: `
    <svg viewBox="0 0 120 160" class="emb emb--voz" aria-hidden="true">
      <g class="emb__ondas" stroke="var(--c)" fill="none" stroke-width="1.2" opacity=".5">
        <circle cx="60" cy="66" r="20"/><circle cx="60" cy="66" r="20"/><circle cx="60" cy="66" r="20"/>
      </g>
      <g class="emb__coro" fill="var(--c)" opacity=".38">
        <rect x="14" y="108" width="7" height="26" rx="3.5"/>
        <rect x="28" y="114" width="7" height="20" rx="3.5"/>
        <rect x="42" y="104" width="7" height="30" rx="3.5"/>
        <rect x="70" y="106" width="7" height="28" rx="3.5"/>
        <rect x="84" y="116" width="7" height="18" rx="3.5"/>
        <rect x="98" y="110" width="7" height="24" rx="3.5"/>
      </g>
      <rect class="emb__una" x="56" y="60" width="8" height="74" rx="4" fill="var(--c)"/>
    </svg>`,

  /* Lupa Ciudadana no era una causa y por eso no tenía emblema; al
     pasar a ser una dimensión, quedaba coja al lado de las otras dos.
     Sigue la misma lógica que el resto: materia que hace lo que la
     causa afirma. Aquí, el registro público —renglones apretados e
     ilegibles— y una lente encima, donde esos mismos renglones se
     vuelven nítidos y separados. Lo que se mira de cerca se entiende. */
  lupa: `
    <svg viewBox="0 0 120 160" class="emb emb--lente" aria-hidden="true">
      <g stroke="var(--c)" stroke-width=".9" opacity=".28">
        <path d="M14 40h92M14 50h92M14 60h92M14 70h92M14 80h92M14 90h92M14 100h92M14 110h92M14 120h92"/>
      </g>
      <g class="emb__claro" stroke="var(--c)" stroke-width="2.1" opacity=".9">
        <path d="M40 66h40M38 80h44M42 94h36"/>
      </g>
      <circle class="emb__lente" cx="60" cy="80" r="27" fill="none" stroke="var(--c)" stroke-width="2.6"/>
      <path class="emb__mango" d="M79 99 L98 122" stroke="var(--c)" stroke-width="4.4" stroke-linecap="round"/>
    </svg>`,

  territorios: `
    <svg viewBox="0 0 120 160" class="emb emb--agua" aria-hidden="true">
      <g stroke="var(--c)" fill="none" stroke-width="1" opacity=".3">
        <path d="M6 118 q26 -16 54 0 t54 0"/><path d="M6 130 q26 -16 54 0 t54 0"/>
        <path d="M6 142 q26 -16 54 0 t54 0"/>
      </g>
      <path class="emb__gota" d="M60 18 c7 12 12 18 12 25 a12 12 0 0 1 -24 0 c0 -7 5 -13 12 -25Z" fill="var(--c)"/>
      <g class="emb__anillos" stroke="var(--c)" fill="none" stroke-width="1.6">
        <ellipse cx="60" cy="104" rx="14" ry="5"/><ellipse cx="60" cy="104" rx="14" ry="5"/>
        <ellipse cx="60" cy="104" rx="14" ry="5"/>
      </g>
    </svg>`,

  economias: `
    <svg viewBox="0 0 120 160" class="emb emb--flujo" aria-hidden="true">
      <path id="ruta" class="emb__ruta" d="M26 58 C 26 118, 94 42, 94 102"
            stroke="var(--c)" stroke-width="1.1" fill="none" opacity=".45"
            pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
      <g class="emb__cargas" fill="var(--c)">
        <rect width="7" height="7" rx="1.6"><animateMotion dur="2.6s" repeatCount="indefinite" begin="0s"><mpath href="#ruta"/></animateMotion></rect>
        <rect width="7" height="7" rx="1.6"><animateMotion dur="2.6s" repeatCount="indefinite" begin="-.87s"><mpath href="#ruta"/></animateMotion></rect>
        <rect width="7" height="7" rx="1.6"><animateMotion dur="2.6s" repeatCount="indefinite" begin="-1.74s"><mpath href="#ruta"/></animateMotion></rect>
      </g>
      <g fill="none" stroke="var(--c)" stroke-width="2.4">
        <circle class="emb__polo" cx="26" cy="58" r="13"/>
        <circle class="emb__polo" cx="94" cy="102" r="13"/>
      </g>
    </svg>`
};

/* El título de la fila es ahora el nombre de la causa, y a su derecha
   va UN solo bloque: la frase que antes era el titular seguida del
   detalle que ya estaba. No se añade contenido; lo único que se pone
   es el punto que falta al final de la frase, porque un titular no lo
   lleva y una oración sí. */
function unirTexto(frase, detalle) {
  const f = String(frase).trim();
  const cierre = /[.!?…]$/.test(f) ? '' : '.';
  return `${f}${cierre} ${String(detalle).trim()}`;
}


/* ---------- Casa Ágora en la portada ----------------------------
   La casa es la tercera sección. Ya no se explica etiquetando una
   puerta y una ventana: la pintura dejó de ser un plano de paredes y
   pasó a ser un reloj. Lo que se toca es el tiempo.

   La semana tiene dos caras y no siete, porque es lo único que los
   documentos sostienen: el mercado es los sábados; de los talleres
   nadie escribió qué día caen. Inventar un horario habría sido
   inventar información.

   Los Paquetes Ágora salen de la fachada y tienen bloque propio: son
   el mecanismo con el que se financia el método, no un adorno sobre
   una ventana. */

function initCasa() {
  const seccion = $('#casa');
  const lamina  = $('#casaLamina');
  const lienzo  = $('#casaLienzo');
  if (!seccion || !lamina) return;

  let casa3d = null;

  /* ---- el escenario --------------------------------------------
     La casa sostiene el segmento entero, no un bloque. El escenario
     queda fijo y el relato pasa por delante; lo único que cambia con
     el scroll es desde dónde se la mira.

     El paralaje se calcula sobre la SECCIÓN y no sobre el escenario:
     el escenario está pegado y su rectángulo casi no se mueve, así
     que medirlo a él daba un progreso plano. */
  const escena = $('#casaEscena');
  /* La atenuación de la casa tiene dos causas —el bloque que se está
     leyendo y la salida del segmento— y una sola variable. Se
     multiplican acá, no en CSS. */
  let opBloque = 1, opFin = 1;
  const pintarOpacidad = () =>
    escena.style.setProperty('--casa-op', (opBloque * opFin).toFixed(3));

  if (escena && !reduce.matches) {
    onScrollProgress(seccion, (p) => {
      escena.style.setProperty('--pz', (p - 0.5).toFixed(4));
      /* La casa se retira al final del segmento. El sticky ya la
         suelta solo al cerrar el <section>, pero apagarla en el último
         tramo hace que se vaya en vez de cortarse. */
      opFin = 1 - Math.max(0, (p - 0.90) / 0.10);
      pintarOpacidad();
    });
  }

  /* ---- la profundidad ------------------------------------------- */
  if (lienzo && !reduce.matches) {
    casa3d = initCasa3D({ figura: lamina, lienzo });
    casa3d && casa3d.listo.then((ok) => {
      if (!ok) { casa3d = null; return; }
      onScrollProgress(lamina, (p) => casa3d.progreso(p));

      lamina.addEventListener('pointermove', (e) => {
        if (e.pointerType === 'touch') return;
        const r = lamina.getBoundingClientRect();
        casa3d.mirar((e.clientX - r.left) / r.width * 2 - 1,
                     (e.clientY - r.top) / r.height * 2 - 1);
      });
      lamina.addEventListener('pointerleave', () => casa3d.mirar(0, 0));

      new IntersectionObserver(([e]) => {
        e.isIntersecting ? casa3d.despertar() : casa3d.dormir();
      }, { rootMargin: '120px' }).observe(lamina);

      addEventListener('resize', () => casa3d.redimensionar(), { passive: true });

      /* Cada bloque del relato pide su encuadre.

         Esto era un IntersectionObserver con una franja estrecha en el
         centro, y estaba mal: cuando el scroll salta, varios bloques
         cambian de estado en el mismo lote y el bucle aplicaba todos
         en orden, así que ganaba el último del array y no el que
         estaba delante de los ojos. Con `cerca` y `cierre` no llegaba
         a aplicarse nunca.

         Ahora se elige por distancia: manda el bloque cuyo centro está
         más cerca del centro de la pantalla. Es determinista, no
         depende del orden de los lotes, y de paso se ahorra el
         observador — ya hay un manejador de scroll para el segmento. */
      /* `velo` oscurece el escenario entero; `op` atenúa sólo la casa.
         Los bloques anchos —paquetes y módulos— usan más `op` que
         `velo`: bajar la casa deja leer el texto sin apagar también la
         red viva que crece detrás. */
      const ESCENAS = {
        fachada: { acerca: 1.00, u: 0.50, v: 0.50, velo: 0.00, op: 1.00 },
        patio:   { acerca: 0.84, u: 0.72, v: 0.58, velo: 0.12, op: 1.00 },
        cerca:   { acerca: 0.80, u: 0.34, v: 0.52, velo: 0.46, op: 0.42 },
        amplio:  { acerca: 1.06, u: 0.52, v: 0.48, velo: 0.22, op: 0.86 },
        cierre:  { acerca: 0.92, u: 0.58, v: 0.52, velo: 0.40, op: 0.50 }
      };

      const bloques = $$('[data-escena]', seccion);
      let bloqueActual = null;

      function encuadrar() {
        const centro = innerHeight / 2;
        let mejor = null, cerca = Infinity;
        for (const b of bloques) {
          const r = b.getBoundingClientRect();
          if (r.bottom < 0 || r.top > innerHeight) continue;
          const d = Math.abs((r.top + r.bottom) / 2 - centro);
          if (d < cerca) { cerca = d; mejor = b; }
        }
        if (!mejor || mejor === bloqueActual) return;
        bloqueActual = mejor;
        const q = ESCENAS[mejor.dataset.escena];
        if (!q) return;
        casa3d.encuadre(q);
        escena.style.setProperty('--velo', q.velo);
        opBloque = q.op; pintarOpacidad();
      }

      onScrollProgress(seccion, encuadrar);
      encuadrar();
    });
  }

  /* ---- la semana ------------------------------------------------
     Dos estados. Pasar a sábado lleva la cámara al portón y entibia
     la luz; volver la devuelve al scroll. */
  const semana = $('#casaSemana');
  if (semana) {
    const dias = $$('.casa__dia', semana);
    const estados = $$('.casa__estado', semana);
    dias.forEach(b => b.addEventListener('click', () => {
      const i = +b.dataset.dia;
      dias.forEach(x => { const en = x === b;
        x.classList.toggle('is-en', en); x.setAttribute('aria-selected', en); });
      estados.forEach(x => x.classList.toggle('is-en', +x.dataset.dia === i));
      seccion.classList.toggle('is-sabado', i === 1);
      casa3d && casa3d.sabado(i === 1);
    }));
  }

  // El viejo circuito de la casa (La casa→Comunidades→Conocimiento→
  // Propuestas→Acción) se retiró: el círculo Conectar→Aprender→Actuar
  // tiene su propia sección aparte (#circulo, ver renderMethod +
  // initRueda), y dos diagramas circulares seguidos era la redundancia
  // que se pidió recortar.
}

/* ---- Paquetes Ágora (sección 05, independiente de Casa Ágora) ------
   Antes vivían dentro de #casa; ahora tienen sección propia porque la
   nueva arquitectura pide que cada paquete se lea junto a la causa que
   financia, no como un anexo de la casa. La cartela que abre el
   detalle es la misma pieza de antes, solo que ya no depende de la
   sección casa para existir. */
function initPaquetes() {
  const paq = $('#casaPaquetes');
  const cartela = $('#casaCartela');
  if (!paq) return;

  paq.innerHTML = PAQUETES.map(p => {
    const c = CAUSES[p.causa];
    return `
      <li class="paq">
        <button class="paq__b" type="button" data-paq="${p.id}">
          <span class="paq__n">${esc(p.n)}</span>
          <span class="paq__t display">${esc(p.nombre)}</span>
          <span class="paq__q">${esc(p.quien)}</span>
          ${c ? `<span class="paq__c meta"><span class="lrow__dot" aria-hidden="true" style="background:${c.color}"></span>Financia · ${esc(c.cat)}</span>` : ''}
          <span class="paq__x">Ver qué incluye <span class="arw" aria-hidden="true">→</span></span>
        </button>
      </li>`;
  }).join('');

  paq.addEventListener('click', (e) => {
    const b = e.target.closest('[data-paq]'); if (!b) return;
    abrirPaquete(PAQUETES.find(x => x.id === b.dataset.paq));
  });

  function abrirPaquete(p) {
    if (!p || !cartela) return;
    const c = CAUSES[p.causa];
    $('#casaCartelaTag').textContent = `Paquete Ágora · ${p.n}${c ? ` · financia ${c.cat}` : ''}`;
    $('#casaCartelaH').textContent = p.nombre;
    $('#casaCartelaQ').textContent = p.quien;
    $('#casaCartelaT').textContent =
      `${p.resuelve} ${p.incluye} Recibís: ${p.queRecibe} Financia: ${p.queFinancia}`;
    cartela.hidden = false;
    void cartela.offsetHeight;
    cartela.classList.add('is-on');
  }

  function cerrarCartela() {
    if (!cartela) return;
    cartela.classList.remove('is-on');
    setTimeout(() => { cartela.hidden = true; }, 520);
  }

  $('#casaCerrar')?.addEventListener('click', cerrarCartela);
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartela && !cartela.hidden) cerrarCartela();
  });
  document.addEventListener('click', (e) => {
    if (!cartela || cartela.hidden) return;
    if (e.target.closest('.casa__cartela') || e.target.closest('[data-paq]')) return;
    cerrarCartela();
  });
}

function renderCauses() {
  const el = $('#causeIndex'); if (!el) return;
  el.innerHTML = ORDER.map(slug => {
    const c = CAUSES[slug];
    const darkInk = slug === 'economias';   // yellow needs ink, not cream
    return `
    <a class="icause" href="?causa=${slug}" data-causa="${slug}"
       data-ink="${darkInk ? 'dark' : 'light'}" style="--c:${c.color};--cf:${c.flood}">
      <span class="icause__flood" aria-hidden="true"></span>
      <span class="icause__media${c.toma ? ' icause__media--toma' : ''}" aria-hidden="true">${
        c.toma
          ? `<span class="duo">
               <video src="${c.toma}" muted playsinline preload="none"
                      data-desde="${c.desde ?? 0}" data-hasta="${c.hasta ?? 0}"></video>
               <span class="duo__papel"></span>
             </span>`
          : (EMBLEMAS[slug] || '')
      }</span>
      <span class="icause__row">
        <span class="icause__n">${c.n}</span>
        <span>
          <span class="icause__t">${esc(c.cat)}</span>
        </span>
        <span class="icause__p">${esc(unirTexto(c.title, c.micro))}</span>
        <span class="icause__go" aria-hidden="true">→</span>
      </span>
    </a>`;
  }).join('');

  /* El emblema respira un poco con la mano: no es un cartel pegado a
     la fila, es algo que está ahí mientras uno lo mira. */
  $$('.icause', el).forEach(a => {
    const m = $('.icause__media', a);
    if (!m) return;
    // La toma sólo corre mientras alguien la está mirando, y sólo el
    // fragmento que le toca.
    const v = $('video', a);
    if (v) {
      ceñirAlFragmento(v, m);
      a.addEventListener('pointerenter', () => v.play().catch(() => {}));
      a.addEventListener('pointerleave', () => v.pause());
    }

    a.addEventListener('pointermove', (e) => {
      const r = a.getBoundingClientRect();
      m.style.setProperty('--ex', (((e.clientX - r.left) / r.width - .5) * 14).toFixed(1) + 'px');
      m.style.setProperty('--ey', (((e.clientY - r.top) / r.height - .5) * 10).toFixed(1) + 'px');
    });
    a.addEventListener('pointerleave', () => {
      m.style.setProperty('--ex', '0px'); m.style.setProperty('--ey', '0px');
    });
  });
}

function renderMethod() {
  // Versión original: los pasos nacen apagados (opacity .3, ver
  // .cstep en app.css) y initCycle() los enciende uno a uno según el
  // scroll — es lo que hace que la rueda se sienta construida, no
  // solo mostrada.
  const steps = $('#cycleSteps');
  if (steps) steps.innerHTML = CYCLE.map(s => `
    <li class="cstep">
      <p class="cstep__w">${esc(s.word)}</p>
      <p class="cstep__k">${esc(s.kicker)}</p>
      <p class="cstep__t">${esc(s.text)}</p>
      ${s.recursos ? `
      <div class="cstep__recursos">
        <p class="cstep__recursos-k meta">Recursos que provienen de los Paquetes Ágora</p>
        <p class="cstep__recursos-l">${s.recursos.map(esc).join(' · ')}</p>
      </div>` : ''}
    </li>`).join('');
}

function renderVoices() {
  const el = $('#voices'); if (!el) return;
  /* Cada voz reparte su texto en columnas. Es lo único que hace que
     una cita de trescientas palabras quepa sin convertir la sección en
     una caída vertical de tres pantallas: el ojo baja poco y vuelve a
     subir, como en una página impresa. El golpe («Nadie avanza solo.»)
     cruza las dos columnas para que no se pierda dentro del flujo. */
  el.innerHTML = VOICES.map((v, i) => `
    <blockquote class="voz voz--${i + 1}" data-reveal>
      <div class="voz__texto">
        ${v.parrafos.map(t => `<p>«${esc(t)}${v.golpe || (v.despues && v.despues.length) ? '' : '»'}</p>`).join('')}
        ${v.golpe ? `<p class="voz__golpe display">${esc(v.golpe)}</p>` : ''}
        ${(v.despues || []).map((t, k, a) =>
            `<p>${esc(t)}${k === a.length - 1 ? '»' : ''}</p>`).join('')}
      </div>
      ${v.author ? `<footer class="voz__firma meta">${esc(v.author)}</footer>` : ''}
    </blockquote>`).join('');
}

/* Cuántos días faltan para una fecha. Se cuenta a mediodía para que
   el cambio de día no dependa de la hora a la que alguien entre. */
function daysUntil(iso) {
  const hoy = new Date(); hoy.setHours(12, 0, 0, 0);
  const dia = new Date(iso + 'T12:00:00');
  return Math.round((dia - hoy) / 86400000);
}

function renderAgenda() {
  const el = $('#agendaList'); if (!el) return;
  el.innerHTML = AGENDA.map(a => {
    const d = daysUntil(a.iso);
    const cuando = d > 1 ? `Faltan ${d} días` : d === 1 ? 'Mañana' : d === 0 ? 'Hoy' : 'Fecha pasada';
    /* Cada fila es una ola completa: el día, cómo se llama, qué
       promete y dónde. Antes hacía falta bajar a otra sección para
       saber qué era «Siempre Verde». */
    return `
    <li class="ola" style="--c:${a.color}" data-reveal>
      <p class="ola__dia"><span class="ola__punto" aria-hidden="true"></span>${esc(a.label)}</p>
      <div class="ola__cuerpo">
        <h3 class="ola__nombre">${esc(a.name)}</h3>
        <p class="ola__lema">${esc(a.tag)}</p>
        <p class="ola__t">${esc(a.text)}</p>
        ${a.title ? `<p class="ola__extra">${esc(a.title)}</p>` : ''}
        <p class="ola__donde meta">${esc(a.cause)} · ${esc(a.place)}</p>
      </div>
      <p class="ola__falta meta">${cuando}</p>
    </li>`;
  }).join('');
}

function renderLupa() {
  const el = $('#lupaList'); if (!el) return;
  el.innerHTML = LUPA.map(l => `
    <li class="lrow" data-reveal>
      <span class="lrow__k">${esc(l.n)}</span>
      <span><span class="lrow__t">${esc(l.title)}</span></span>
      <span class="lrow__s">${esc(l.text)}</span>
      <span class="lrow__x">${esc(l.cta)} →</span>
    </li>`).join('');
}

function renderTally() {
  const el = $('#tally'); if (!el) return;
  el.innerHTML = DIMS.map(d => `
    <tr data-reveal>
      <td class="tally__label">${esc(d)}</td>
      <td class="tally__val"><span class="tally__blank" aria-hidden="true"></span>por registrar</td>
    </tr>`).join('');
}

function renderAllies() {
  const el = $('#allies'); if (!el) return;
  el.innerHTML = ALLIES.map(a => `<li>${esc(a)}</li>`).join('');
}

function renderPaths() {
  const el = $('#paths'); if (!el) return;
  el.innerHTML = JOIN.map(j => `
    <div class="path" data-reveal>
      <p class="path__k">${esc(j.kicker)}</p>
      <h3 class="path__t">${esc(j.title)}</h3>
      <p class="path__x">${esc(j.text)}</p>
      <a class="tlink" href="${j.href || '#signup'}">${esc(j.cta)} <span class="arw" aria-hidden="true">→</span></a>
      ${j.extra ? `
      <div class="path__extra">
        <h4 class="path__extra-t">${esc(j.extra.title)}</h4>
        <p class="path__extra-x">${esc(j.extra.text)}</p>
        <a class="tlink" href="${j.extra.href || '#signup'}">${esc(j.extra.cta)} <span class="arw" aria-hidden="true">→</span></a>
      </div>` : ''}
    </div>`).join('');
}

/* ══════════════ LIVE SIGNALS ══════════════ */

function startClock() {
  const nodes = $$('[data-clock]');
  if (!nodes.length) return;
  const fmt = new Intl.DateTimeFormat('es-CR', {
    timeZone: 'America/Costa_Rica', hour: '2-digit', minute: '2-digit', hour12: false
  });
  const tick = () => { const t = fmt.format(new Date()); nodes.forEach(n => n.textContent = t); };
  tick(); setInterval(tick, 30000);
}

/* Las preguntas que se hace una sociedad.
   Irrumpen. No están fijas ni todas a la vez: el espacio lanza una,
   la deja el tiempo suficiente para leerla entera, la retira, y lanza
   otra en otro sitio. Esa intermitencia es lo que las hace parecer
   preguntas de alguien y no etiquetas pegadas al fondo.

   El sitio de cada aparición se sortea y se comprueba: si cae encima
   de Ágora, de la frase o de los bordes de la portada, se descarta y
   se vuelve a sortear. Así la jerarquía se sostiene sola, aunque el
   texto o la pantalla cambien de tamaño. */

/* Cuatro emisores, cada uno con su propio reloj. No hay una animación
   con cuatro pasos: hay cuatro relojes distintos que a veces coinciden
   y a veces dejan la portada casi vacía. Esa irregularidad es lo que
   lo hace parecer vivo y no una secuencia. */
/* En una pantalla de móvil la portada no tiene sitio para cuatro: el
   colocador agota los 160 intentos, afloja la separación a la mitad y
   acaba poniendo dos preguntas encima de otra, ilegibles. Con dos, el
   mismo algoritmo cumple sus propias reglas y el efecto no cambia:
   siguen irrumpiendo y retirándose, sólo que de dos en dos. */
const VISIBLES = matchMedia('(max-width: 700px)').matches ? 2 : 4;
const LEER_MS  = [5200, 7600];   // tiempo suficiente para leerla entera
const PAUSA_MS = [1300, 4400];   // el silencio también compone

const azar = (a, b) => a + Math.random() * (b - a);

function startPhrases() {
  const caja = $('#preguntas');
  const portada = $('#portada');
  if (!caja || !portada) return;

  /* Dónde parte el color la frase: el borde del panel de video, pero
     medido dentro de la caja de la frase. Se recalcula al cambiar el
     tamaño porque ni el ancho del panel ni el de la frase son fijos. */
  const video = $('.portada__video');

  /* Dónde acaba exactamente la palabra ÁGORA. La firma cuelga de ahí,
     así que el dato no se puede escribir a mano: cambia con la fuente
     y con el ancho de la pantalla. */
  const colgarFirma = () => {
    const palabra = $('.portada__agora'), letras = $('.ag--1'), firma = $('.pais');
    if (!palabra || !letras || !firma) return;
    const r = document.createRange();
    r.selectNodeContents(letras);
    const g = r.getBoundingClientRect(), a = palabra.getBoundingClientRect();
    if (!g.width) return;
    firma.style.setProperty('--finAgora', (g.right - a.left).toFixed(1) + 'px');
    firma.style.setProperty('--baseAgora', (g.bottom - a.top).toFixed(1) + 'px');
    if (video) {
      const f = firma.getBoundingClientRect(), v = video.getBoundingClientRect();
      firma.classList.toggle('is-claro',
        f.left >= v.left - 4 && f.right <= v.right + 4 && f.top >= v.top - 4 && f.bottom <= v.bottom + 4);
    }
  };

  const partirFrase = () => {
    const frase = $('.portada__frase');
    if (!frase || !video) return;
    const f = frase.getBoundingClientRect(), v = video.getBoundingClientRect();
    if (!f.width) return;
    // En vertical el panel de metraje deja de estar al lado y pasa a
    // ser una banda de arriba: entonces la frase no cruza nada y va
    // entera en tinta. Preguntarle al video dónde está es más honesto
    // que dar por hecho que siempre parte la pantalla en dos.
    const cruza = f.top < v.bottom - 2 && f.bottom > v.top + 2;
    const pct = cruza ? (v.left - f.left) / f.width * 100 : 100;
    frase.style.setProperty('--fcorte', Math.max(0, Math.min(100, pct)).toFixed(2) + '%');
  };
  const medirMarca = () => { partirFrase(); colgarFirma(); };
  medirMarca();
  addEventListener('resize', medirMarca, { passive: true });
  if (document.fonts) document.fonts.ready.then(medirMarca);

  const preg = Array.from({ length: VISIBLES }, () => {
    const el = document.createElement('p');
    el.className = 'preg';
    caja.appendChild(el);
    return el;
  });

  if (reduce.matches) {
    preg.forEach((el, i) => {
      el.textContent = PHRASES[i % PHRASES.length];
      el.style.left = (i ? 62 : 6) + '%';
      el.style.top = (i ? 74 : 12) + '%';
      el.classList.add('is-on');
    });
    return;
  }

  /* Lo que no se puede tapar nunca. Se mide en vivo —no se anota a
     mano— porque el nombre cambia de tamaño con el viewport. */
  // Cada caja se ensancha por lo que el paralaje la va a mover después
  // —Ágora viaja 22px de lado y 14 de alto—. Reservar el recorrido de
  // cada pieza es mucho más barato que reservar aire alrededor de todo:
  // con un margen plano el único hueco libre acababa siendo el borde
  // derecho, y las preguntas salían siempre por el mismo sitio.
  const inflar = (r, dx, dy) => ({
    left: r.left - dx, right: r.right + dx, top: r.top - dy, bottom: r.bottom + dy
  });

  const prohibido = () => {
    const zonas = [];
    const letras = $('.ag--1');
    if (letras) {
      const r = document.createRange();
      r.selectNodeContents(letras);
      zonas.push(inflar(r.getBoundingClientRect(), 24, 16));
    }
    [['.portada__frase', 9, 7], ['.portada__centro', 5, 4], ['.pais', 10, 7]]
      .forEach(([sel, dx, dy]) => { const e = $(sel); if (e) zonas.push(inflar(e.getBoundingClientRect(), dx, dy)); });

    /* De la fila de datos y de la de botones se reserva lo que ocupan
       las palabras, no la fila entera: son contenedores que cruzan la
       pantalla de lado a lado y, tomados enteros, cerraban las franjas
       de arriba y de abajo —justo las que había que abrir. */
    ['.cover__meta > *', '.cover__ctas > *'].forEach(sel =>
      $$(sel).forEach(e => {
        const r = e.getBoundingClientRect();
        if (r.width) zonas.push(inflar(r, 10, 10));
      }));
    return zonas;
  };

  const choca = (a, b, aire = 10) =>
    a.left < b.right + aire && a.right > b.left - aire &&
    a.top < b.bottom + aire && a.bottom > b.top - aire;

  /* Se mide la pregunta UNA vez y después se sortea sobre papel: leer
     la caja dentro del bucle obligaba al navegador a recalcular el
     diseño noventa veces seguidas y se notaba el tirón justo cuando
     aparecía. El tamaño no depende de dónde se ponga, así que basta
     con moverlo en aritmética y tocar el DOM al final. */
  const colocar = (el, holgura = 1) => {
    if (!caja || !caja.getBoundingClientRect) return false;
    const p = caja.getBoundingClientRect();
    if (!p.width || !p.height) return false;
    const v = video ? video.getBoundingClientRect() : null;
    const zonas = prohibido();
    /* Una pregunta sigue ocupando su sitio mientras se desvanece: si
       sólo contaran las que están del todo encendidas, la siguiente
       podría caer encima de una que todavía se ve. */
    const otras = preg.filter(o => o !== el && o.dataset.ocupado)
                      .map(o => o.getBoundingClientRect());

    const irr = Math.abs(parseFloat(el.style.getPropertyValue('--irr'))) || 0;
    el.style.maxWidth = azar(0, 1) < .5 ? '17ch' : '13ch';
    const m = el.getBoundingClientRect();          // el único reflujo
    const w = m.width, h = m.height;
    if (!w || !h) return false;

    for (let intento = 0; intento < 160; intento++) {
      const px = azar(1.5, 86), py = azar(1.5, 92);
      const left = caja.left + caja.width * px / 100;
      const top = caja.top + caja.height * py / 100;
      const r = { left, top, right: left + w, bottom: top + h };

      /* Los bordes se comprueban contando el desplazamiento con el que
         la pregunta irrumpe, no sólo su sitio final: si no, una que
         acaba a cinco píxeles del borde entra desde fuera de la
         pantalla y se la ve cortada durante medio segundo. */
      if (r.right + irr > p.right - 6 || r.bottom > p.bottom - 6 ||
          r.left - irr < p.left + 4 || r.top < p.top + 4) continue;
      /* La jerarquía no se negocia: 'holgura' afloja el aire entre
         preguntas cuando no hay sitio, nunca el que protege al nombre.
         Y se reserva además el trecho que la pregunta recorre al
         irrumpir —si sólo se reservara su sitio final, rozaría la
         frase durante el medio segundo que tarda en llegar. */
      const trayecto = { left: r.left - irr, top: r.top, right: r.right + irr, bottom: r.bottom };
      if (zonas.some(z => choca(trayecto, z, 10))) continue;
      // Bien separadas: dos preguntas cerca se leen como un párrafo
      // partido en dos, no como dos voces distintas. El aire entre
      // ellas es lo que las vuelve independientes.
      if (otras.some(z => choca(r, z, 105 * holgura))) continue;

      /* Una pregunta a medio caballo entre el papel y el metraje no se
         puede pintar de un solo color sin perder media línea, así que
         ese sitio simplemente no vale: o entera sobre papel, o entera
         sobre imagen. */
      let dentro = false;
      if (v) {
        dentro = r.left >= v.left && r.right <= v.right && r.top >= v.top && r.bottom <= v.bottom;
        const fuera = r.right <= v.left || r.left >= v.right || r.bottom <= v.top || r.top >= v.bottom;
        if (!dentro && !fuera) continue;
        /* Durante la primera mitad de la búsqueda sólo se aceptan sitios
           sobre el papel. El metraje atrae porque es la zona más grande
           y libre, y si no se le pone freno todas acaban encima de él
           mientras la crema se queda vacía. */
        if (dentro && intento < 96) continue;
      }
      el.style.left = px.toFixed(1) + '%';
      el.style.top = py.toFixed(1) + '%';
      el.classList.toggle('preg--claro', dentro);
      return true;
    }
    return false;
  };

  /* Una bolsa barajada en vez de azar puro: así no sale dos veces
     seguidas la misma pregunta ni coinciden las dos a la vez, que es
     lo que pasa cuando cada aparición sortea por su cuenta. */
  let bolsa = [];
  const siguiente = () => {
    if (!bolsa.length) {
      bolsa = PHRASES.map((_, k) => k);
      for (let k = bolsa.length - 1; k > 0; k--) {
        const j = (Math.random() * (k + 1)) | 0;
        [bolsa[k], bolsa[j]] = [bolsa[j], bolsa[k]];
      }
    }
    return PHRASES[bolsa.pop()];
  };

  const ciclo = (el, i, estreno = false) => {
    // Se espera a que termine de irse antes de recolocarla: si no, la
    // pregunta salta de sitio mientras todavía se está viendo.
    //
    // Pero en el estreno no hay nada que se esté yendo, y el silencio
    // de PAUSA_MS —que entre pregunta y pregunta compone— delante de la
    // primera es sólo tiempo muerto: sumaba hasta 4,4 s a una espera
    // que ya arrastraba el arranque escalonado. Quien entra al sitio
    // se encontraba la portada vacía durante segundos.
    const salida = parseFloat(el.style.getPropertyValue('--sale')) || 0;
    el.classList.remove('is-on');
    setTimeout(() => {
      delete el.dataset.ocupado;      // ya no se ve: su sitio queda libre
      el.textContent = siguiente();
      // Cada aparición entra a su ritmo y desde su lado: si todas
      // entraran igual, dejaría de ser irrupción y sería una lista.
      const lado = Math.random() < .5 ? -1 : 1;
      el.style.setProperty('--irr', (lado * azar(12, 28)).toFixed(0) + 'px');
      el.style.setProperty('--entra', azar(420, 820).toFixed(0) + 'ms');
      el.style.setProperty('--sale', azar(800, 1400).toFixed(0) + 'ms');
      el.style.setProperty('--op', azar(.72, .95).toFixed(2));

      // Si el hueco no aparece, se busca otra vez con menos exigencia
      // antes de rendirse: vale más una pregunta un poco apretada que
      // una portada donde no aparece nada.
      if (colocar(el) || colocar(el, .55)) {
        el.dataset.ocupado = '1';
        requestAnimationFrame(() => el.classList.add('is-on'));
        setTimeout(() => ciclo(el, i), azar(...LEER_MS));
      } else {
        /* Sin hueco libre se reintenta. En el estreno se reintenta
           rápido y se sigue considerando estreno: las cuatro llegan
           casi juntas y es entonces cuando más se estorban, así que
           esperar 900 ms dejaba a una fuera de la portada varios
           segundos justo al entrar. */
        setTimeout(() => ciclo(el, i, estreno), estreno ? 200 : 900);
      }
    }, estreno ? 0 : salida + azar(...PAUSA_MS));
  };

  /* Arranque desigual: si las cuatro empezaran a la vez quedarían
     sincronizadas para siempre. Pero el desnivel se paga una sola vez y
     no hace falta que sea de segundos: con ~300 ms entre una y otra ya
     no vuelven a coincidir, y las cuatro están puestas antes de que
     nadie haya terminado de mirar la portada. */
  preg.forEach((el, i) => setTimeout(() => ciclo(el, i, true), 90 + i * 300 + Math.random() * 220));

  /* El cursor las roza. No las hace desaparecer: cada una mantiene su
     ciclo. Sólo se apartan, como algo suspendido a lo que le pasa el
     aire por al lado. Y de paso el ratón separa las capas del nombre. */
  let pendiente = false, px = -9999, py = -9999;
  const mover = () => {
    pendiente = false;
    const r = portada.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;

    const mx = Math.max(-1, Math.min(1, ((px - r.left) / r.width - 0.5) * 2));
    const my = Math.max(-1, Math.min(1, ((py - r.top) / r.height - 0.5) * 2));
    portada.style.setProperty('--mx', mx.toFixed(3));
    portada.style.setProperty('--my', my.toFixed(3));

    const firma = $('.pais');
    if (firma) {
      const b = firma.getBoundingClientRect();
      const d = Math.hypot(b.left + b.width / 2 - px, b.top + b.height / 2 - py);
      firma.style.setProperty('--sep', d < 260 ? ((1 - d / 260) ** 2 * .16).toFixed(3) + 'em' : '0em');
    }

    preg.forEach(el => {
      if (!el.classList.contains('is-on')) return;
      const b = el.getBoundingClientRect();
      const dx = b.left + b.width / 2 - px, dy = b.top + b.height / 2 - py;
      const d = Math.hypot(dx, dy), R = 190;
      let ox = 0, oy = 0;
      if (d < R && d > .5) { const f = (1 - d / R) ** 2 * 9; ox = dx / d * f; oy = dy / d * f; }
      el.style.setProperty('--dx', ox.toFixed(1) + 'px');
      el.style.setProperty('--dy', oy.toFixed(1) + 'px');
    });
  };
  const pedir = () => { if (!pendiente) { pendiente = true; requestAnimationFrame(mover); } };
  window.addEventListener('pointermove', e => { px = e.clientX; py = e.clientY; pedir(); }, { passive: true });
  window.addEventListener('scroll', pedir, { passive: true });
}

/* ══════════════ NAVIGATION ══════════════ */

function smoothTo(hash) {
  const t = document.querySelector(hash);
  if (!t) return;
  const y = t.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68);
  window.scrollTo({ top: y, behavior: reduce.matches ? 'auto' : 'smooth' });
}

function initMenu() {
  const burger = $('#burger'), menu = $('#menu');
  if (!burger || !menu) return;

  const close = () => {
    burger.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    document.body.style.overflow = '';
    document.body.classList.remove('menu-open');
  };
  const open = () => {
    burger.setAttribute('aria-expanded', 'true');
    menu.hidden = false;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('menu-open');
    $$('.menu__list a', menu).forEach((a, i) => a.style.animationDelay = `${60 + i * 45}ms`);
  };

  burger.addEventListener('click', () =>
    burger.getAttribute('aria-expanded') === 'true' ? close() : open());

  menu.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    e.preventDefault(); close(); smoothTo(a.getAttribute('href'));
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') { close(); burger.focus(); }
  });
}

function initAnchors() {
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]:not(.skip)');
    if (!a || a.closest('#menu')) return;
    const hash = a.getAttribute('href');
    if (hash === '#' || !document.querySelector(hash)) return;
    e.preventDefault();
    if (!$('#detail').hidden) { closeDetail(false); }
    smoothTo(hash);
  });
}

/* ══════════════ CAUSE ROUTING ══════════════ */

const detail = $('#detail');
const main = $('#main');
const foot = $('.foot');


/* ---- las piezas que ahora comparten la causa y sus dimensiones ---
   Antes «Nuestro trabajo», «Lo que queremos dejar», el ciclo y la
   sostenibilidad eran secciones sueltas de la plantilla de causa. Se
   extraen tal cual para que una dimensión pueda usarlas sin duplicar
   nada: el texto no cambió, sólo dejó de estar clavado en un sitio. */
function trabajoHTML(c, alt = true) {
  return `
  <section class="dsec${alt ? ' dsec--alt' : ''}">
    <div class="dsec__inner" style="--c:${c.color}">
      <p class="meta">Qué hacemos</p>
      <h2 class="dsec__h display">Nuestro trabajo</h2>
      <ul class="dlist">${c.hacemos.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>
  </section>

  <section class="dsec${alt ? '' : ' dsec--alt'}">
    <div class="dsec__inner" style="--c:${c.color}">
      <p class="meta">La huella que buscamos</p>
      <h2 class="dsec__h display">Lo que queremos dejar</h2>
      <ul class="dlist">${c.logros.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>
  </section>

  ${c.flow ? `
  <section class="dsec dsec--alt">
    <div class="dsec__inner" style="--c:${c.color}">
      <p class="meta">Cómo funciona en la práctica</p>
      <h2 class="dsec__h display">Una escuela práctica de democracia</h2>
      <ol class="dflow">${c.flow.map(x => `<li>${esc(x)}</li>`).join('')}</ol>
      <p class="foot-note meta" style="grid-column:1/-1">Y el ciclo vuelve a empezar: Conectar → Aprender → Actuar.</p>
    </div>
  </section>` : ''}

  ${c.sostenibilidad ? `
  <section class="dsec">
    <div class="dsec__inner">
      <p class="meta">Sostenibilidad con propósito</p>
      <h2 class="dsec__h display">${esc(c.sostenibilidad.titulo)}</h2>
      <div class="dsec__b prose"><p>${esc(c.sostenibilidad.texto)}</p></div>
    </div>
  </section>` : ''}`;
}

/* ---- el recorrido por dimensiones -------------------------------
   Antes, entre el título y el contenido había una tabla que anunciaba
   las formas —número, nombre, verbo— y sólo después venía cada una
   con su cabecera repitiendo lo mismo. Se leía dos veces y obligaba a
   pasar por una capa intermedia para llegar a lo que importa. Ahora el
   título entrega directo a la primera forma.

   La página sigue siendo azul. Una dimensión con color propio sólo lo
   usa en el número y en el filete de su cabecera. */
function dimensionesHTML(slug, c) {
  const dims = DIMENSIONES[slug];
  return `
  <section class="dbisagra">
    <div class="dsec__inner">
      <h2 class="dsec__h display">Diferentes formas de ejercer<br>y construir democracia</h2>
    </div>
  </section>

  ${dims.map(d => dimHTML(d, c)).join('')}`;
}

function dimHTML(d, c) {
  const acento = d.color || c.color;
  const cabeza = `
  <header class="ddim__head" id="dim-${d.id}" style="--c:${acento}">
    <div class="dsec__inner">
      <p class="ddim__n">${d.n}</p>
      <h2 class="ddim__t display">${esc(d.nombre)}</h2>
      <p class="ddim__v">${esc(d.verbo)}</p>
      ${d.emblema ? `<div class="ddim__emb" aria-hidden="true">${EMBLEMAS[d.emblema] || ''}</div>` : ''}
    </div>
  </header>`;

  // 01 · Lupa Ciudadana: no es sección propia del sitio, es una
  //      herramienta que pertenece a Democracia Viva. El mismo texto
  //      y los mismos tres frentes que ya aparecen en el detalle del
  //      paquete o en cualquier otra mención de Lupa — una sola fuente.
  if (d.deLupa) return cabeza + `
  <section class="dsec dsec--alt">
    <div class="dsec__inner">
      <p class="meta">Conocimiento para la acción</p>
      <h2 class="dsec__h display">Ciudadanía que observa y pregunta</h2>
      <div class="dsec__b prose"><p>${esc(d.lede)}</p></div>
      <ol class="ledger ledger--lupa dlupa">
        ${LUPA.map(l => `
        <li class="lrow">
          <span class="lrow__k">${esc(l.n)}</span>
          <span><span class="lrow__t">${esc(l.title)}</span></span>
          <span class="lrow__s">${esc(l.text)}</span>
        </li>`).join('')}
      </ol>
      <p class="foot-note meta">${esc(d.nota)}</p>
    </div>
  </section>`;

  // 02 · Niñez y Adolescencia. Era la sección más larga de la página
  //      —problema, cita, porqué, stats, proyecto, trabajo, huella,
  //      nueve pasos y sostenibilidad—: ahora responde en dos golpes
  //      «¿cómo se aprende a participar desde temprano?» y muestra qué
  //      proponemos. El resto del texto sigue escrito en data.js.
  return cabeza + `
  <section class="dsec dsec--alt">
    <div class="dsec__inner" style="--c:${acento}">
      <p class="meta">Cómo se aprende a participar</p>
      <h2 class="dsec__h display">${esc(d.title)}</h2>
      <div class="dsec__b prose"><p>${esc(d.resumen)}</p></div>
      <ul class="dlist">${d.hacemos.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    </div>
  </section>`;
}

/* El puente explícito entre la causa y el Paquete Ágora que la
   financia: la cadena que antes había que deducir. Las tres causas
   tienen ya su paquete (ver la nota del mapeo en data.js), y el
   número por causa no es el mismo: Democracia Viva tiene dos y las
   otras dos tienen uno.

   Las fichas se maquetan como fila, no como lista: el titular ocupa
   la columna de la izquierda, igual que en el resto de la página, y
   las fichas el ancho que queda. Cada ficha mide lo mismo tenga la
   causa una o dos, que es lo que hace que las tres se lean como el
   mismo sistema. */
function paqueteHTML(slug, c) {
  const paquetes = PAQUETES.filter(p => p.causa === slug);
  if (!paquetes.length) return '';
  return `
  <section class="dsec">
    <div class="dsec__inner" style="--c:${c.color}">
      <p class="meta">Cómo se financia</p>
      <h2 class="dsec__h display">El Paquete Ágora que sostiene esta causa</h2>
      <div class="dcadena">
        ${paquetes.map(p => `
        <a class="dcadena__p" href="#paquetes" data-paquete="${p.id}">
          <span class="dcadena__n">${esc(p.n)}</span>
          <span class="dcadena__t display">${esc(p.nombre)}</span>
          <span class="dcadena__paso"><b>Recibe</b> <i>${esc(p.queRecibe)}</i></span>
          <span class="dcadena__paso"><b>Financia</b> <i>${esc(p.queFinancia)}</i></span>
          <span class="dcadena__x">Ver el paquete <span class="arw" aria-hidden="true">→</span></span>
        </a>`).join('')}
      </div>
    </div>
  </section>`;
}

function causeHTML(slug) {
  const c = CAUSES[slug]; if (!c) return '';
  const others = ORDER.filter(s => s !== slug);

  return `
  <section class="dhero" style="--c:${c.color}">
    <video src="${c.video}" poster="${c.poster}" autoplay muted loop playsinline preload="metadata" aria-hidden="true"></video>
    <span class="dhero__scrim" style="background:linear-gradient(180deg,rgba(20,19,15,.55),rgba(20,19,15,.92))"></span>
    <p class="dhero__n" style="color:${c.color}">${c.n} / ${String(ORDER.length).padStart(2, '0')}</p>
    <p class="dhero__cat">${esc(c.cat)}</p>
    <h1 class="dhero__t display">${esc(c.title)}</h1>
    ${c.phrase ? `<p class="dhero__p">${esc(c.phrase)}</p>` : ''}
  </section>

  <section class="dsec">
    <div class="dsec__inner">
      <p class="meta">Lo que está en juego</p>
      <h2 class="dsec__h display">De dónde parte</h2>
      <div class="dsec__b prose"><p>${esc(c.problema)}</p></div>
    </div>
  </section>

  ${c.quote ? `
  <section class="dquote">
    <blockquote>«${esc(c.quote)}»<cite>${esc(c.quoteSrc)}</cite></blockquote>
  </section>` : ''}

  <section class="dsec dsec--alt">
    <div class="dsec__inner">
      ${c.porqueTitulo ? '' : '<p class="meta">Por qué también es tuya</p>'}
      <h2 class="dsec__h display">${esc(c.porqueTitulo || 'Por qué esta causa te pertenece')}</h2>
      <div class="dsec__b prose"><p>${esc(c.porque)}</p></div>
      ${c.stats ? `
      <ul class="dstats ledger">
        ${c.stats.map(s => `<li class="lrow"><span class="lrow__k"><span class="tally__blank" aria-hidden="true"></span></span><span class="lrow__s">${esc(s)}</span></li>`).join('')}
      </ul>
      <p class="foot-note meta">Datos por documentar · los publicaremos cuando existan, verificables.</p>` : ''}
    </div>
  </section>

  <section class="dsec">
    <div class="dsec__inner">
      <p class="meta">La idea que nos mueve</p>
      <h2 class="dsec__h display">El proyecto</h2>
      <div class="dsec__b prose">
        ${c.proyectoNombre ? `<p class="dproy__n display">${esc(c.proyectoNombre)}</p>` : ''}
        ${c.proyectoEstado ? `<p class="dproy__e meta">${esc(c.proyectoEstado)}</p>` : ''}
        <p>${esc(c.proyecto)}</p>
      </div>
    </div>
  </section>

  ${trabajoHTML(c)}

  ${DIMENSIONES[slug] ? dimensionesHTML(slug, c) : ''}

  ${paqueteHTML(slug, c)}

  <section class="dsec dsec--alt">
    <div class="dsec__inner">
      <p class="meta">Sumate a esta causa</p>
      <h2 class="dsec__h display">${esc(c.cta)}</h2>
      <div class="dsec__b prose">
        <p>Queremos tu tiempo. Sumá tu presencia, tu oficio o tu respaldo, y construyamos esto juntos.</p>
        <p style="margin-top:1.5rem;display:flex;gap:.75rem;flex-wrap:wrap">
          <a class="btn btn--solid" href="?#sumate" data-home>Con mi Tiempo y Talento</a>
          <a class="btn" href="?#sumate" data-home>Con mi respaldo</a>
        </p>
      </div>
      <nav class="dstats ledger" aria-label="Otras causas">
        ${others.map(s => `<a class="lrow" href="?causa=${s}" data-causa="${s}" style="--c:${CAUSES[s].color}">
          <span class="lrow__k"><span class="lrow__dot" aria-hidden="true"></span>${CAUSES[s].n}</span>
          <span><span class="lrow__t">${esc(CAUSES[s].cat)}</span></span>
          <span class="lrow__x">Ver causa →</span></a>`).join('')}
      </nav>
    </div>
  </section>

  <button class="btn dback" id="dback">← Volver a las causas</button>`;
}

/* El fondo alterno de las secciones venía escrito a mano en cada
   plantilla. Al componer la causa con sus dimensiones, dos bloques que
   se escribieron por separado quedaban con el mismo fondo pegados y se
   perdía el corte entre secciones. Se calcula: las bandas oscuras —el
   héroe, la cita, la bisagra— reinician la cuenta, porque después de
   una de ellas el ojo vuelve a empezar. */
function alternarBandas(raiz) {
  let i = 0;
  for (const sec of raiz.children) {
    if (!sec.classList.contains('dsec')) {
      if (sec.classList.contains('dquote') || sec.classList.contains('dbisagra') ||
          sec.classList.contains('dhero')) i = 0;
      continue;
    }
    sec.classList.toggle('dsec--alt', i % 2 === 1);
    i++;
  }
}

function openDetail(slug, push = true) {
  const detail = $('#detail');
  const main = $('#main');
  const foot = $('.foot');
  if (!detail || !CAUSES[slug]) return;
  detail.innerHTML = causeHTML(slug);
  alternarBandas(detail);
  detail.hidden = false;
  detail.removeAttribute('aria-hidden');
  if (main) main.hidden = true;
  if (foot) foot.hidden = true;

  document.title = `${CAUSES[slug].cat} · Centro Ágora Costa Rica`;
  if (push) history.pushState({ causa: slug }, '', `?causa=${slug}`);

  const destino = dimDestino && detail.querySelector(`#dim-${dimDestino}`);
  dimDestino = null;
  if (destino) destino.scrollIntoView({ behavior: 'instant', block: 'start' });
  else window.scrollTo({ top: 0, behavior: 'instant' });
  $('#dback')?.addEventListener('click', () => closeDetail());
  staggerLines(detail);
  initReveal();
  detail.querySelector('h1')?.setAttribute('tabindex', '-1');
  detail.querySelector('h1')?.focus({ preventScroll: true });
}

function closeDetail(push = true) {
  const detail = $('#detail');
  const main = $('#main');
  const foot = $('.foot');
  if (detail) {
    detail.hidden = true;
    detail.setAttribute('aria-hidden', 'true');
    detail.innerHTML = '';
  }
  if (main) main.hidden = false;
  if (foot) foot.hidden = false;
  document.title = 'Centro Ágora Costa Rica · Nadie avanza solo';
  if (push) history.pushState({}, '', location.pathname);
  smoothTo('#causas');
}


/* «juventud» fue una causa de la portada y su enlace puede estar
   circulando. Ahora es la dimensión 02 de Democracia Viva, así que en
   vez de dar un 404 silencioso se lleva a quien llegue hasta ahí. */
const CAUSAS_MUDADAS = { juventud: { a: 'democracia', dim: 'ninez' } };

/* Dónde dejar a quien llega por un enlace mudado: no basta con abrir
   la causa, hay que dejarlo en la dimensión que venía a buscar. */
let dimDestino = null;

function resolverCausa(slug) {
  if (!slug) return null;
  if (CAUSES[slug]) return slug;
  const m = CAUSAS_MUDADAS[slug];
  if (!m) return null;
  dimDestino = m.dim;
  history.replaceState({ causa: m.a }, '', `?causa=${m.a}`);
  return m.a;
}

function initRouting() {
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-causa]');
    if (a) {
      e.preventDefault();
      // Un enlace puede pedir una dimensión concreta (p. ej. Lupa
      // Ciudadana desde dentro de Casa Ágora) en vez de abrir la causa
      // en su tope.
      if (a.dataset.dim) dimDestino = a.dataset.dim;
      openDetail(a.dataset.causa);
      return;
    }
    const h = e.target.closest('[data-home]');
    if (h) { e.preventDefault(); closeDetail(); setTimeout(() => smoothTo('#sumate'), 120); }
  });

  window.addEventListener('popstate', () => {
    const slug = resolverCausa(new URLSearchParams(location.search).get('causa'));
    if (slug) openDetail(slug, false); else closeDetail(false);
  });

  const slug = resolverCausa(new URLSearchParams(location.search).get('causa'));
  if (slug) openDetail(slug, false);
}

/* ══════════════ FORM ══════════════ */

function initForm() {
  const form = $('#signup'), msg = $('#signupMsg');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = $('#email', form);
    if (!input.value || !input.checkValidity()) {
      msg.textContent = 'Escribí un correo válido para poder avisarte.';
      input.focus(); return;
    }
    // No backend yet — say so plainly rather than fake a success state.
    msg.textContent = 'Todavía no hay lista de correos conectada. Escribinos y te sumamos a mano.';
    form.reset();
  });
}


/* ══════════════ EL CAMPO ══════════════ */

/* The field is an enhancement, never a requirement. It starts only when
   the device can plausibly carry it and the visitor has not asked for
   less motion; otherwise the editorial site stands on its own — which
   matters, because Ágora recruits in communities, not in studios. */
function canRunField() {
  if (reduce.matches) return false;
  if (navigator.connection?.saveData) return false;
  if ((navigator.deviceMemory ?? 8) < 4) return false;
  if ((navigator.hardwareConcurrency ?? 8) < 4) return false;
  const c = document.createElement('canvas');
  return !!c.getContext('webgl2');
}

function initField() {
  const host = $('#campo'), canvas = $('#campoCanvas');
  if (!host || !canvas || !canRunField()) return null;

  const wide = window.matchMedia('(min-width: 900px)').matches;
  const campo = createCampo(canvas, wide
    ? { count: 780, simScale: 0.62, simCap: 1400, maxCov: 0.46 }
    : { count: 340, simScale: 0.45, simCap: 820,  maxCov: 0.40 });
  if (!campo) return null;

  document.body.classList.add('has-campo');
  requestAnimationFrame(() => host.classList.add('is-live'));

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    campo.setScroll(max > 0 ? Math.min(1, window.scrollY / max) : 0);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // The cycle runs where the page explains it: the field performs
  // CONECTAR → APRENDER → ACTUAR → CONECTAR in step with the words.
  const rail = $('#cycleRail');
  if (rail) {
    // On narrow screens the scrubbing rail collapses to nothing, and a
    // zero-height element reads as "finished" the moment the page loads —
    // which froze the field in ACTUAR forever. Fall back to the section
    // itself so the four movements still happen where they are explained.
    const cycle = $('#cycle');
    const drive = () => {
      const el = rail.offsetHeight >= 40 ? rail : cycle;
      if (!el || el.offsetHeight < 40) return;
      const r = el.getBoundingClientRect();
      const total = r.height + window.innerHeight;
      const t = (window.innerHeight - r.top) / total;
      campo.setCycle((Math.max(0, Math.min(1, t)) - 0.04) / 0.62);
    };
    window.addEventListener('scroll', drive, { passive: true });
    drive();
  }

  // No work off-screen.
  document.addEventListener('visibilitychange', () => campo.setActive(!document.hidden));
  window.__campo = campo;   // handle for verification
  return campo;
}

/* ══════════════ LA PENUMBRA ══════════════ */

/* El trazo aparta la oscuridad en vez de pintarla. Es el mismo gesto
   —mover la mano— con otra consecuencia, que es justo lo que hace que
   el sitio se sienta como un espacio y no como una página: entrás en
   otra sección y lo que hacés significa otra cosa. */
/* Dos vídeos decodificando a la vez cuestan la mitad de las imágenes
   por segundo —medido: cualquiera de los dos solo va a sesenta, los
   dos juntos a treinta—. En esta sección la escena que importa es la
   de las tres personas, así que el fondo le cede el paso mientras ella
   está en pantalla y vuelve a moverse cuando se va. El fondo va detrás
   de una penumbra al 90 %: que se quede quieto un rato no lo nota
   nadie; que las tres personas se congelen, sí. */
/* Dónde termina la franja oscura: justo debajo de la línea de datos
   —«CENTRO ÁGORA COSTA RICA · SAN JOSÉ»—, que es el límite marcado en
   la referencia. Se mide en vez de escribirse a mano porque esa fila
   cambia de sitio con el tamaño de la pantalla. Debajo del límite se
   deja un trecho corto para que el oscuro se disuelva en el papel. */
function medirUmbral() {
  const umbral = $('#raices'), datos = $('.cover__meta'), portada = $('#top');
  if (!umbral || !datos || !portada) return;
  const aplicar = () => {
    const p = portada.getBoundingClientRect(), d = datos.getBoundingClientRect();
    const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 68;
    const hastaLaLinea = (d.bottom - p.top) + nav;      // desde el techo del umbral
    if (hastaLaLinea < 40) return;
    const disolucion = Math.round(hastaLaLinea * .42);
    const alto = hastaLaLinea + disolucion;
    umbral.style.setProperty('--alto-umbral', alto + 'px');
    umbral.style.setProperty('--corte-umbral', (hastaLaLinea / alto * 100).toFixed(1) + '%');
  };
  aplicar();
  addEventListener('resize', aplicar, { passive: true });
  if (document.fonts) document.fonts.ready.then(aplicar);
}


/* El fondo de «Por qué existimos». Uno solo —el tráfico detenido— que
   acompaña la sección entera. La única regla que queda es que le ceda
   el paso a la toma de las tres personas mientras está en pantalla:
   dos vídeos decodificando a la vez dejan la sección en treinta
   imágenes por segundo, está medido, y de los dos la escena que hay
   que mirar es la de la gente. */
function initFondosDePorque() {
  const fondo = $('.porque__bg'), seccion = $('#existimos'), figura = $('.tres');
  if (!fondo || !seccion || reduce.matches) return;
  let enSeccion = false, cedido = false;

  const mandar = () => {
    if (enSeccion && !cedido) {
      if (fondo.preload !== 'auto') { fondo.preload = 'auto'; fondo.load(); }
      fondo.play().catch(() => {});
    } else fondo.pause();
  };
  fondo.addEventListener('play', () => { if (cedido || !enSeccion) fondo.pause(); });

  new IntersectionObserver(([e]) => { enSeccion = e.isIntersecting; mandar(); },
    { rootMargin: '60% 0px 60% 0px' }).observe(seccion);
  if (figura) new IntersectionObserver(([e]) => { cedido = e.isIntersecting; mandar(); },
    { rootMargin: '10% 0px 10% 0px' }).observe(figura);
  mandar();
}

function initPenumbra() {
  const sec = $('#existimos'), velo = $('#porqueScrim');
  if (!sec || !velo || reduce.matches) return;
  let pendiente = false, x = 50, y = 40;
  const pintar = () => {
    pendiente = false;
    velo.style.setProperty('--lx', x.toFixed(1) + '%');
    velo.style.setProperty('--ly', y.toFixed(1) + '%');
  };
  window.addEventListener('pointermove', (e) => {
    const r = sec.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    x = ((e.clientX - r.left) / r.width) * 100;
    y = ((e.clientY - r.top) / r.height) * 100;
    if (!pendiente) { pendiente = true; requestAnimationFrame(pintar); }
  }, { passive: true });
}


/* ══════════════ LA SEÑAL ══════════════ */

/* El pincel deja de dar pigmento y pasa a interrumpir la transmisión.
   La estática aparece SÓLO por donde pasó el cursor y se va borrando
   detrás — una mano metida en la antena, no un filtro encima de todo.

   Blanco y negro. Esto es memoria de televisión analógica: en cuanto
   entra color, deja de ser un recuerdo y pasa a ser cyberpunk. */
/* Cada clip del archivo encadena varias escenas dentro de un mismo
   fichero, y lo que sirve casi siempre es un fragmento.
   Lo natural sería saltar con currentTime, pero un salto necesita que
   el servidor conteste a peticiones por rango, y no todos lo hacen:
   donde no lo hace, el navegador aterriza en cero sin avisar y se ve
   la escena equivocada —que es exactamente el problema que veníamos
   arrastrando—. Así que no se salta: se cruza a toda velocidad lo que
   no interesa, con la imagen apagada, y se vuelve al paso normal justo
   al entrar en el tramo bueno. Funciona igual con rangos y sin ellos,
   y de paso el corte se lee como una revelación y no como un fallo. */
function ceñirAlFragmento(v, panel) {
  const desde = +v.dataset.desde || 0;
  const hasta = +v.dataset.hasta || 0;
  if (!hasta) return;
  const marca = panel || v.parentElement;

  /* Volver a cero sí se puede sin rangos —es el único punto que el
     navegador siempre tiene—. Así que los fragmentos que arrancan al
     principio del clip se reinician de golpe, sin apagón: sólo los que
     viven a mitad del montaje tienen que cruzar a toda velocidad. */
  const desdeElPrincipio = desde < .5;

  if (desdeElPrincipio) {
    v.loop = true;
    v.addEventListener('timeupdate', () => {
      if (v.currentTime > hasta) { try { v.currentTime = 0; } catch (_) {} }
    });
    return;
  }

  /* El cruce rápido se vigila cuadro a cuadro, no con 'timeupdate':
     ese evento avisa unas cuatro veces por segundo y a ocho aumentos
     eso son dos segundos de metraje entre aviso y aviso — se pasaba
     de largo el fragmento una vuelta sí y otra también. */
  v.loop = true;
  let mirando = false;
  const vigilar = () => {
    if (v.paused || v.ended) { mirando = false; return; }
    const t = v.currentTime;
    const fuera = t < desde - .02 || t > hasta;

    /* Si el servidor sí responde a peticiones por rango —lo hace el
       alojamiento real, no el de desarrollo—, el salto es inmediato y
       no hace falta cruzar nada. Se comprueba en vivo en vez de darlo
       por hecho en un sentido o en el otro. */
    if (fuera && v.seekable.length && v.seekable.end(v.seekable.length - 1) > desde + .5) {
      v.playbackRate = 1;
      try { v.currentTime = desde; } catch (_) {}
      marca.classList.remove('is-buscando');
    } else {
      v.playbackRate = fuera ? 8 : 1;
      marca.classList.toggle('is-buscando', fuera);
    }
    requestAnimationFrame(vigilar);
  };
  const arrancar = () => { if (!mirando) { mirando = true; requestAnimationFrame(vigilar); } };
  v.addEventListener('play', arrancar);
  v.addEventListener('pause', () => marca.classList.remove('is-buscando'));
}

function initFragmentos() {
  $$('video[data-desde]').forEach(v => {
    if (v.closest('.icause')) return;      // las causas se atan al pasar el ratón
    ceñirAlFragmento(v, v.closest('figure') || v.parentElement);
  });
}

function initSenal(campo) {
  // La zona es la pantalla del aparato, no la sección: la estática
  // sólo existe dentro del tubo, y el pigmento sólo calla ahí.
  const zona = $('#teleZona');
  const lienzo = $('#senalRuido');
  if (!zona || !lienzo || reduce.matches) return;

  const ctx = lienzo.getContext('2d');
  // Un lienzo pequeño estirado por CSS: el grano de un tubo es grueso.
  const W = 480, H = 360;
  lienzo.width = W; lienzo.height = H;

  // El ruido se genera una vez en un mosaico y se reutiliza desplazado.
  // Regenerarlo entero cada cuadro sería tirar trabajo a la basura.
  const tela = document.createElement('canvas');
  tela.width = tela.height = 128;
  const tctx = tela.getContext('2d');
  const grano = tctx.createImageData(128, 128);
  const rehacerGrano = () => {
    const d = grano.data;
    for (let k = 0; k < d.length; k += 4) {
      const v = Math.random() * 255;
      d[k] = d[k + 1] = d[k + 2] = v; d[k + 3] = 255;
    }
    tctx.putImageData(grano, 0, 0);
  };
  rehacerGrano();

  if (campo) campo.setZonaMuda(zona);

  // 'ultimo' es lo que impide que un cursor parado siga quemando el
  // fósforo en el mismo punto: la estática es rastro de un gesto, no
  // una mancha que se queda donde uno abandona la mano.
  let px = -999, py = -999, activo = false, cuadro = 0, ultimo = 0;
  // Cuánta señal hay: 0 en Caravanas, 1 al final de Revolución. De ella
  // dependen el ruido de fondo y el parpadeo, para que la transmisión
  // se vaya degradando sola aunque nadie toque el ratón.
  let senal = 0;

  const paso = () => {
    cuadro++;
    /* El rastro se borra a saltos, no cuadro a cuadro. Con alfa por
       cuadro tan baja el 'destination-out' redondea la resta a cero y
       la estática se queda pegada para siempre; restando más de golpe
       cada seis cuadros la caída sí llega hasta el fondo, y a diez
       pasos por segundo el ojo no ve el escalón. */
    if (cuadro % 6 === 0) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,.062)';
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';
    }

    /* El grano ambiente. No lo pinta nadie: es la señal que se cae por
       su cuenta según se baja, y por eso crece con el scroll. La mano
       sólo agrava lo que ya estaba pasando. */
    /* La estática de fondo: sube con el scroll y se renueva cada dos
       cuadros para que se vea MOVERSE, no como una textura pegada. En
       la Revolución, que es donde la señal está más rota, es lo que
       hace que la pantalla parezca viva. */
    if (senal > .30 && cuadro % 2 === 0) {
      ctx.globalAlpha = (senal - .30) * .52;
      ctx.drawImage(tela, (Math.random() * 128) | 0, (Math.random() * 128) | 0, 128, 128, 0, 0, W, H);
      ctx.globalAlpha = 1;
    }

    if (activo && performance.now() - ultimo < 150) {
      if (cuadro % 3 === 0) rehacerGrano();
      const r = zona.getBoundingClientRect();
      const x = ((px - r.left) / r.width) * W;
      const y = ((py - r.top) / r.height) * H;

      // el borde se ablanda dibujando círculos concéntricos que pierden
      // fuerza hacia afuera
      for (let k = 3; k >= 0; k--) {
        const rad = 26 + k * 15;
        ctx.save();
        ctx.beginPath(); ctx.arc(x, y, rad, 0, 6.2832); ctx.clip();
        ctx.globalAlpha = (1 - k / 4) * 0.5;
        ctx.drawImage(tela, (Math.random() * 128) | 0, (Math.random() * 128) | 0, 128, 128,
                      x - 90, y - 90, 180, 180);
        ctx.restore();
      }
      /* El desgarro horizontal: una señal mala se corta en franjas.
         Corto y estrecho a propósito —si se desparrama demasiado deja
         de leerse el recorrido de la mano y queda una mancha. */
      ctx.globalAlpha = .45;
      for (let k = 0; k < 2; k++) {
        const fy = y - 26 + Math.random() * 52;
        const alto = 2 + Math.random() * 4;
        const corr = (Math.random() - 0.5) * 24;
        ctx.drawImage(lienzo, x - 38, fy, 76, alto, x - 38 + corr, fy, 76, alto);
      }
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(paso);
  };
  requestAnimationFrame(paso);

  window.addEventListener('pointermove', (e) => {
    const r = zona.getBoundingClientRect();
    activo = e.clientX >= r.left && e.clientX <= r.right &&
             e.clientY >= r.top && e.clientY <= r.bottom;
    if (activo) { px = e.clientX; py = e.clientY; ultimo = performance.now(); }
  }, { passive: true });

  /* La señal crece y después se disuelve hacia la Revolución de las
     conciencias: las dos secciones son la misma transmisión. Se mide
     sobre el contenedor, no sobre la pantalla —la pantalla va pegada
     y su progreso no diría nada. */
  const emisora = $('#transmision');
  if (emisora) onScrollProgress(emisora, (p) => {
    senal = Math.max(0, Math.min(1, p));
    emisora.style.setProperty('--senal', senal.toFixed(3));
  });

  /* El parpadeo del tubo: irregular y raro al principio, más frecuente
     y más profundo según se degrada la señal. Va en su propio reloj,
     lento, para no pelearse con el cuadro del dibujo. */
  let vela = 1;
  setInterval(() => {
    if (!emisora) return;
    const prob = .05 + senal * .30;
    vela = Math.random() < prob ? 1 - Math.random() * (.10 + senal * .28) : 1;
    emisora.style.setProperty('--parpadeo', vela.toFixed(3));
  }, 220);
}


/* El título de la revolución separa sus capas con el ratón, igual que
   ÁGORA. Se mide sólo cuando está en pantalla: fuera de ella no hay
   nada que separar y sí un coste que ahorrarse. */
function initRevolucion() {
  /* Dos títulos comparten el mismo tratamiento —el de la revolución y
     el de la agenda—, así que comparten también el paralaje que separa
     sus capas. Un solo sitio donde afinarlo. */
  $$('.rev, .agenda__cabeza').forEach(separarCapas);
}

function separarCapas(rev) {
  if (!rev || reduce.matches) return;
  let pedido = false, px = 0, py = 0;
  const pintar = () => {
    pedido = false;
    const r = rev.getBoundingClientRect();
    if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
    rev.style.setProperty('--rx', Math.max(-1, Math.min(1, ((px - r.left) / r.width - .5) * 2)).toFixed(3));
    rev.style.setProperty('--ry', Math.max(-1, Math.min(1, ((py - r.top) / r.height - .5) * 2)).toFixed(3));
  };
  addEventListener('pointermove', (e) => {
    px = e.clientX; py = e.clientY;
    if (!pedido) { pedido = true; requestAnimationFrame(pintar); }
  }, { passive: true });
}


/* ══════════════ LA RUEDA ══════════════ */

/* Se inyecta desde assets/rueda.svg en vez de vivir pegada en el HTML:
   así se regenera con manifiesto/rueda.py sin tocar la maqueta. Si la
   petición falla, la sección se queda con su lista de cuatro pasos y no
   se rompe nada — la rueda ilustra el método, no lo sustituye. */
async function initRueda() {
  const host = $('#cycleRueda');
  if (!host) return;
  try {
    const r = await fetch('assets/rueda.svg');
    if (!r.ok) return;
    host.innerHTML = await r.text();
    initCycle($('#cycleRail'), host, $$('.cstep'));
  } catch { /* sin rueda, con método */ }
}

/* ══════════════ BOOT ══════════════ */

let booted = false;

export function boot() {
  if (booted) return;
  booted = true;

  /* La portada primero. Es lo único que se ve al entrar, y todo lo que
     va detrás son secciones que nadie está mirando todavía. */
  startClock();
  startPhrases();
  renderMarquee();

  renderCauses();
  initCasa();
  initPaquetes();
  renderMethod();
  renderVoices();
  renderAgenda();
  renderLupa();
  renderTally();
  renderAllies();
  renderPaths();

  initMenu();
  initAnchors();
  initRouting();
  initForm();

  staggerLines();
  initReveal();
  initParallax();
  initLazyVideo();
  initNav($('#nav'));
  initSpy($$('.nav__links a'));
  initMagnetic($$('.cover__ctas .btn--solid'));
  startEngine();

  // El campo primero: la televisión necesita decirle dónde callarse.
  const campo = initField();
  initRueda();
  initPenumbra();
  initSenal(campo);
  initSonido();
  medirUmbral();
  initFragmentos();
  initFondosDePorque();
  initRevolucion();
  const franja = $('#raices');
  if (franja) initRaices(franja);
  /* El mismo organismo, más adentro: en el tejido que une el método
     con la agenda, y en el cierre. Menos denso que arriba —ahí es el
     umbral y tiene que pesar; aquí acompaña un texto. */
  /* Cada instancia puede pedir su densidad: la de Casa Ágora cubre un
     bloque más alto y con .62 la red quedaba casi invisible. */
  $$('[data-red]').forEach(el => initRaices(el, {
    suelo: false, densidad: parseFloat(el.dataset.red) || .62
  }));
  const aire = $('.humo');
  if (aire) initHumo(aire);
}

