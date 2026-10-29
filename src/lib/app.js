/* ============================================================
   ÁGORA · App
   Renders the data-driven sections, wires navigation and the
   cause routing. Cause pages use ?causa=<slug> so the URL is
   shareable and the back button works on any static host —
   no server rewrite rules required.
   ============================================================ */

import {
  PHRASES, MARQUEE, ORDER, CAUSES, CYCLE, DIMS,
  AGENDA, VOICES, LUPA, ALLIES, JOIN, DIMENSIONES,
  DIMENSIONES_TITULO, DIMENSIONES_LEDE, PAQUETES
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

  var $ = (s, r = document) => r.querySelector(s);
  var $$ = (s, r = document) => [...r.querySelectorAll(s)];
  var esc = (s = "") => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  function renderMarquee() {
    const el = $("#marquee");
    if (!el) return;
    const once = MARQUEE.map((t) => `<span>${esc(t)} <b>\u25CF</b></span>`).join("");
    el.innerHTML = once + once;
  }
  var EMBLEMAS = {
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
  EMBLEMAS.comunidades = EMBLEMAS.juventud;
  function unirTexto(frase, detalle) {
    const f = String(frase).trim();
    const cierre = /[.!?…]$/.test(f) ? "" : ".";
    return `${f}${cierre} ${String(detalle).trim()}`;
  }
  function initCasa() {
    const seccion = $("#casa");
    const lamina = $("#casaLamina");
    const lienzo = $("#casaLienzo");
    if (!seccion || !lamina) return;
    let casa3d = null;
    const escena = $("#casaEscena");
    let opBloque = 1, opFin = 1;
    const pintarOpacidad = () => escena.style.setProperty("--casa-op", (opBloque * opFin).toFixed(3));
    if (escena && !reduce.matches) {
      onScrollProgress(seccion, (p) => {
        escena.style.setProperty("--pz", (p - 0.5).toFixed(4));
        opFin = 1 - Math.max(0, (p - 0.9) / 0.1);
        pintarOpacidad();
      });
    }
    if (lienzo && !reduce.matches) {
      casa3d = initCasa3D({ figura: lamina, lienzo });
      casa3d && casa3d.listo.then((ok) => {
        if (!ok) {
          casa3d = null;
          return;
        }
        onScrollProgress(lamina, (p) => casa3d.progreso(p));
        lamina.addEventListener("pointermove", (e) => {
          if (e.pointerType === "touch") return;
          const r = lamina.getBoundingClientRect();
          casa3d.mirar(
            (e.clientX - r.left) / r.width * 2 - 1,
            (e.clientY - r.top) / r.height * 2 - 1
          );
        });
        lamina.addEventListener("pointerleave", () => casa3d.mirar(0, 0));
        new IntersectionObserver(([e]) => {
          e.isIntersecting ? casa3d.despertar() : casa3d.dormir();
        }, { rootMargin: "120px" }).observe(lamina);
        addEventListener("resize", () => casa3d.redimensionar(), { passive: true });
        const ESCENAS = {
          fachada: { acerca: 1, u: 0.5, v: 0.5, velo: 0, op: 1 },
          patio: { acerca: 0.84, u: 0.72, v: 0.58, velo: 0.12, op: 1 },
          cerca: { acerca: 0.8, u: 0.34, v: 0.52, velo: 0.46, op: 0.42 },
          amplio: { acerca: 1.06, u: 0.52, v: 0.48, velo: 0.22, op: 0.86 },
          cierre: { acerca: 0.92, u: 0.58, v: 0.52, velo: 0.4, op: 0.5 }
        };
        const bloques = $$("[data-escena]", seccion);
        let bloqueActual = null;
        function encuadrar() {
          const centro = innerHeight / 2;
          let mejor = null, cerca = Infinity;
          for (const b of bloques) {
            const r = b.getBoundingClientRect();
            if (r.bottom < 0 || r.top > innerHeight) continue;
            const d = Math.abs((r.top + r.bottom) / 2 - centro);
            if (d < cerca) {
              cerca = d;
              mejor = b;
            }
          }
          if (!mejor || mejor === bloqueActual) return;
          bloqueActual = mejor;
          const q = ESCENAS[mejor.dataset.escena];
          if (!q) return;
          casa3d.encuadre(q);
          escena.style.setProperty("--velo", q.velo);
          opBloque = q.op;
          pintarOpacidad();
        }
        onScrollProgress(seccion, encuadrar);
        encuadrar();
      });
    }
    const semana = $("#casaSemana");
    if (semana) {
      const dias = $$(".casa__dia", semana);
      const estados = $$(".casa__estado", semana);
      dias.forEach((b) => b.addEventListener("click", () => {
        const i = +b.dataset.dia;
        dias.forEach((x) => {
          const en = x === b;
          x.classList.toggle("is-en", en);
          x.setAttribute("aria-selected", en);
        });
        estados.forEach((x) => x.classList.toggle("is-en", +x.dataset.dia === i));
        seccion.classList.toggle("is-sabado", i === 1);
        casa3d && casa3d.sabado(i === 1);
      }));
    }
  }
  function initPaquetes() {
    const paq = $("#casaPaquetes");
    const cartela = $("#casaCartela");
    if (!paq) return;
    paq.innerHTML = PAQUETES.map((p) => {
      const c = CAUSES[p.causa];
      return `
      <li class="paq">
        <button class="paq__b" type="button" data-paq="${p.id}">
          <span class="paq__n">${esc(p.n)}</span>
          <span class="paq__t display">${esc(p.nombre)}</span>
          <span class="paq__q"><b>Llega a:</b> ${esc(p.quien)}</span>
          ${c ? `<span class="paq__c meta"><span class="lrow__dot" aria-hidden="true" style="background:${c.color}"></span>Sostiene \xB7 ${esc(c.cat)}</span>` : ""}
          <span class="paq__x">Ver qu\xE9 incluye <span class="arw" aria-hidden="true">\u2192</span></span>
        </button>
      </li>`;
    }).join("");
    paq.addEventListener("click", (e) => {
      const b = e.target.closest("[data-paq]");
      if (!b) return;
      abrirPaquete(PAQUETES.find((x) => x.id === b.dataset.paq));
    });
    function abrirPaquete(p) {
      if (!p || !cartela) return;
      const c = CAUSES[p.causa];
      $("#casaCartelaTag").textContent = `Paquete \xC1gora \xB7 ${p.n}${c ? ` \xB7 sostiene ${c.cat}` : ""} \xB7 En construcci\xF3n`;
      $("#casaCartelaH").textContent = p.nombre;
      $("#casaCartelaQ").textContent = `Llega a: ${p.quien}`;
      $("#casaCartelaT").textContent = `${p.resuelve} ${p.incluye} Quien lo recibe obtiene: ${p.queRecibe} Quien lo sostiene financia: ${p.queFinancia}`;
      cartela.hidden = false;
      void cartela.offsetHeight;
      cartela.classList.add("is-on");
    }
    function cerrarCartela() {
      if (!cartela) return;
      cartela.classList.remove("is-on");
      setTimeout(() => {
        cartela.hidden = true;
      }, 520);
    }
    $("#casaCerrar")?.addEventListener("click", cerrarCartela);
    addEventListener("keydown", (e) => {
      if (e.key === "Escape" && cartela && !cartela.hidden) cerrarCartela();
    });
    document.addEventListener("click", (e) => {
      if (!cartela || cartela.hidden) return;
      if (e.target.closest(".casa__cartela") || e.target.closest("[data-paq]")) return;
      cerrarCartela();
    });
  }
  /* Paquete Ágora: cada pieza abre su descripción debajo de su fila. */
  function initPaqueteRes() {
    const lista = $("#pqRes"), panel = $("#pqPanel");
    if (!lista || !panel) return;
    const cuerpo = $(".pqpanel__cuerpo", panel);
    const botones = $$(".pqres__b", lista);
    let abierto = null;
    const columnas = () => getComputedStyle(lista).gridTemplateColumns.split(" ").filter(Boolean).length || 1;
    function ubicar() {
      if (!abierto) return;
      const items = botones.map((b) => b.parentElement);
      const i = botones.indexOf(abierto), c = columnas();
      const fin = Math.min(items.length - 1, Math.floor(i / c) * c + c - 1);
      items[fin].after(panel);
    }
    function cerrar() {
      botones.forEach((b) => b.setAttribute("aria-expanded", "false"));
      panel.hidden = true; abierto = null;
    }
    botones.forEach((b) => b.addEventListener("click", () => {
      if (abierto === b) { cerrar(); return; }
      botones.forEach((x) => x.setAttribute("aria-expanded", String(x === b)));
      cuerpo.innerHTML = $("#pq-t-" + b.dataset.pq).innerHTML;
      abierto = b; ubicar(); panel.hidden = false;
      panel.classList.remove("is-in"); void panel.offsetWidth; panel.classList.add("is-in");
      const r = panel.getBoundingClientRect();
      if (r.bottom > innerHeight) panel.scrollIntoView({ behavior: reduce.matches ? "auto" : "smooth", block: "nearest" });
    }));
    $(".pqpanel__cerrar", panel).addEventListener("click", () => { const b = abierto; cerrar(); b && b.focus(); });
    addEventListener("resize", ubicar, { passive: true });
  }
  function renderCauses() {
    const el = $("#causeIndex");
    if (!el) return;
    el.innerHTML = ORDER.map((slug) => {
      const c = CAUSES[slug];
      const darkInk = slug === "economias";
      return `
    <a class="icause" href="?causa=${slug}" data-causa="${slug}"
       data-ink="${darkInk ? "dark" : "light"}" style="--c:${c.color};--cf:${c.flood}">
      <span class="icause__flood" aria-hidden="true"></span>
      <span class="icause__media${c.toma ? " icause__media--toma" : ""}" aria-hidden="true">${c.toma ? `<span class="duo">
               <video src="${c.toma}" muted playsinline preload="none"
                      data-desde="${c.desde ?? 0}" data-hasta="${c.hasta ?? 0}"></video>
               <span class="duo__papel"></span>
             </span>` : EMBLEMAS[slug] || ""}</span>
      <span class="icause__row">
        <span class="icause__n">${c.n}</span>
        <span>
          <span class="icause__t">${esc(c.cat)}</span>
        </span>
        <span class="icause__p">${esc(unirTexto(c.title, c.micro))}${c.proyectoEstado ? `<span class="icause__proy meta">${(c.proyectoNombre || "").includes(" \xB7 ") ? "Proyectos propios" : "Proyecto propio"} \xB7 ${c.proyectoNombre ? esc(c.proyectoNombre) + " \xB7 " : ""}${esc(c.proyectoEstado)} \xB7 abierto a quienes ya trabajan en esto</span>` : ""}</span>
        <span class="icause__go" aria-hidden="true">\u2192</span>
      </span>
    </a>`;
    }).join("");
    $$(".icause", el).forEach((a) => {
      const m = $(".icause__media", a);
      if (!m) return;
      const v = $("video", a);
      if (v) {
        ce\u00F1irAlFragmento(v, m);
        a.addEventListener("pointerenter", () => v.play().catch(() => {
        }));
        a.addEventListener("pointerleave", () => v.pause());
      }
      a.addEventListener("pointermove", (e) => {
        const r = a.getBoundingClientRect();
        m.style.setProperty("--ex", (((e.clientX - r.left) / r.width - 0.5) * 14).toFixed(1) + "px");
        m.style.setProperty("--ey", (((e.clientY - r.top) / r.height - 0.5) * 10).toFixed(1) + "px");
      });
      a.addEventListener("pointerleave", () => {
        m.style.setProperty("--ex", "0px");
        m.style.setProperty("--ey", "0px");
      });
    });
  }
  function renderMethod() {
    const steps = $("#cycleSteps");
    if (steps) steps.innerHTML = CYCLE.map((s) => `
    <li class="cstep">
      <p class="cstep__w">${esc(s.word)}</p>
      <p class="cstep__k">${esc(s.kicker)}</p>
      <p class="cstep__t">${esc(s.text)}</p>
      ${s.recursos ? `
      <div class="cstep__recursos">
        <p class="cstep__recursos-k meta">Lo que va a haber en la casa \xB7 Pr\xF3ximamente</p>
        <p class="cstep__recursos-l">${s.recursos.map(esc).join(" \xB7 ")}</p>
      </div>` : ""}
    </li>`).join("");
  }
  function renderVoices() {
    const el = $("#voices");
    if (!el) return;
    el.innerHTML = VOICES.map((v, i) => `
    <blockquote class="voz voz--${i + 1}" data-reveal>
      <div class="voz__texto">
        ${v.parrafos.map((t) => `<p>\xAB${esc(t)}${v.golpe || v.despues && v.despues.length ? "" : "\xBB"}</p>`).join("")}
        ${v.golpe ? `<p class="voz__golpe display">${esc(v.golpe)}</p>` : ""}
        ${(v.despues || []).map((t, k, a) => `<p>${esc(t)}${k === a.length - 1 ? "\xBB" : ""}</p>`).join("")}
      </div>
      ${v.author ? `<footer class="voz__firma meta">${esc(v.author)}</footer>` : ""}
    </blockquote>`).join("");
  }
  function renderAgenda() {
    const el = $("#agendaList");
    if (!el) return;
    el.innerHTML = AGENDA.map((a) => `
    <li class="ola" style="--c:${a.color}" data-reveal>
      <p class="ola__dia"><span class="ola__punto" aria-hidden="true"></span>${esc(a.estado)}</p>
      <div class="ola__cuerpo">
        <h3 class="ola__nombre">${esc(a.name)}</h3>
        <p class="ola__lema">${esc(a.tag)}</p>
        <p class="ola__t">${esc(a.text)}</p>
      </div>
    </li>`).join("");
  }
  function renderLupa() {
    const el = $("#lupaList");
    if (!el) return;
    el.innerHTML = LUPA.map((l) => `
    <li class="lrow" data-reveal>
      <span class="lrow__k">${esc(l.n)}</span>
      <span><span class="lrow__t">${esc(l.title)}</span></span>
      <span class="lrow__s">${esc(l.text)}</span>
      <span class="lrow__x">${esc(l.cta)} \u2192</span>
    </li>`).join("");
  }
  function renderTally() {
    const el = $("#tally");
    if (!el) return;
    el.innerHTML = DIMS.map((d) => `
    <tr data-reveal>
      <td class="tally__label">${esc(d)}</td>
      <td class="tally__val"><span class="tally__blank" aria-hidden="true"></span>por registrar</td>
    </tr>`).join("");
  }
  function renderAllies() {
    const el = $("#allies");
    if (!el) return;
    el.innerHTML = ALLIES.map((a) => `<li>${esc(a)}</li>`).join("");
  }
  function renderPaths() {
    const el = $("#paths");
    if (!el) return;
    el.innerHTML = JOIN.map((j) => `
    <div class="path"${j.id ? ` id="${j.id}"` : ""} data-reveal>
      <p class="path__k">${esc(j.kicker)}</p>
      <h3 class="path__t">${esc(j.title)}</h3>
      <p class="path__x">${esc(j.text)}</p>
      ${j.estado ? `<p><span class="estado">${esc(j.estado)}</span></p>` : ""}
      <a class="${j.primary ? "btn btn--solid" : "tlink"}" href="${j.href || "#signup"}">${esc(j.cta)} <span class="arw" aria-hidden="true">\u2192</span></a>
      ${j.extra ? `
      <div class="path__extra">
        <h4 class="path__extra-t">${esc(j.extra.title)}</h4>
        <p class="path__extra-x">${esc(j.extra.text)}</p>
        <a class="tlink" href="${j.extra.href || "#signup"}">${esc(j.extra.cta)} <span class="arw" aria-hidden="true">\u2192</span></a>
      </div>` : ""}
    </div>`).join("");
  }
  function startClock() {
    const nodes = $$("[data-clock]");
    if (!nodes.length) return;
    const fmt = new Intl.DateTimeFormat("es-CR", {
      timeZone: "America/Costa_Rica",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
    const tick = () => {
      const t = fmt.format(/* @__PURE__ */ new Date());
      nodes.forEach((n) => n.textContent = t);
    };
    tick();
    setInterval(tick, 3e4);
  }
  var VISIBLES = matchMedia("(max-width: 700px)").matches ? 1 : 2;
  var LEER_MS = [5200, 7600];
  var PAUSA_MS = [1300, 4400];
  var azar2 = (a, b) => a + Math.random() * (b - a);
  function startPhrases() {
    const caja = $("#preguntas");
    const portada = $("#portada");
    if (!caja || !portada) return;
    const video = $(".portada__video");
    const colgarFirma = () => {
      const palabra = $(".portada__agora"), letras = $(".ag--1"), firma = $(".pais");
      if (!palabra || !letras || !firma) return;
      const r = document.createRange();
      r.selectNodeContents(letras);
      const g = r.getBoundingClientRect(), a = palabra.getBoundingClientRect();
      if (!g.width) return;
      firma.style.setProperty("--finAgora", (g.right - a.left).toFixed(1) + "px");
      firma.style.setProperty("--baseAgora", (g.bottom - a.top).toFixed(1) + "px");
      if (video) {
        const f = firma.getBoundingClientRect(), v = video.getBoundingClientRect();
        firma.classList.toggle(
          "is-claro",
          f.left >= v.left - 4 && f.right <= v.right + 4 && f.top >= v.top - 4 && f.bottom <= v.bottom + 4
        );
      }
    };
    const partirFrase = () => {
      const frase = $(".portada__frase");
      if (!frase || !video) return;
      const f = frase.getBoundingClientRect(), v = video.getBoundingClientRect();
      if (!f.width) return;
      const cruza = f.top < v.bottom - 2 && f.bottom > v.top + 2;
      const pct = cruza ? (v.left - f.left) / f.width * 100 : 100;
      frase.style.setProperty("--fcorte", Math.max(0, Math.min(100, pct)).toFixed(2) + "%");
    };
    const medirMarca = () => {
      partirFrase();
      colgarFirma();
    };
    medirMarca();
    addEventListener("resize", medirMarca, { passive: true });
    if (document.fonts) document.fonts.ready.then(medirMarca);
    const preg = Array.from({ length: VISIBLES }, () => {
      const el = document.createElement("p");
      el.className = "preg";
      caja.appendChild(el);
      return el;
    });
    if (reduce.matches) {
      preg.forEach((el, i) => {
        el.textContent = PHRASES[i % PHRASES.length];
        el.style.left = (i ? 62 : 6) + "%";
        el.style.top = (i ? 74 : 12) + "%";
        el.classList.add("is-on");
      });
      return;
    }
    const inflar = (r, dx, dy) => ({
      left: r.left - dx,
      right: r.right + dx,
      top: r.top - dy,
      bottom: r.bottom + dy
    });
    const prohibido = () => {
      const zonas = [];
      $$(".ag--1").forEach((letras) => {
        const r = document.createRange();
        r.selectNodeContents(letras);
        zonas.push(inflar(r.getBoundingClientRect(), 24, 16));
      });
      [[".portada__frase", 9, 7], [".portada__centro", 5, 4], [".pais", 10, 7]].forEach(([sel, dx, dy]) => {
        const e = $(sel);
        if (e) zonas.push(inflar(e.getBoundingClientRect(), dx, dy));
      });
      [".cover__meta > *", ".cover__ctas > *", ".cover__def"].forEach((sel) => $$(sel).forEach((e) => {
        const r = e.getBoundingClientRect();
        if (r.width) zonas.push(inflar(r, 10, 10));
      }));
      return zonas;
    };
    const choca = (a, b, aire = 10) => a.left < b.right + aire && a.right > b.left - aire && a.top < b.bottom + aire && a.bottom > b.top - aire;
    const colocar = (el, holgura = 1) => {
      const caja2 = $("#preguntas").getBoundingClientRect();
      const p = caja2;
      const v = video ? video.getBoundingClientRect() : null;
      const zonas = prohibido();
      const otras = preg.filter((o) => o !== el && o.dataset.ocupado).map((o) => o.getBoundingClientRect());
      const irr = Math.abs(parseFloat(el.style.getPropertyValue("--irr"))) || 0;
      el.style.maxWidth = azar2(0, 1) < 0.5 ? "17ch" : "13ch";
      const m = el.getBoundingClientRect();
      const w = m.width, h = m.height;
      if (!w || !h) return false;
      for (let intento = 0; intento < 160; intento++) {
        const px2 = azar2(1.5, 86), py2 = azar2(1.5, 92);
        const left = caja2.left + caja2.width * px2 / 100;
        const top = caja2.top + caja2.height * py2 / 100;
        const r = { left, top, right: left + w, bottom: top + h };
        if (r.right + irr > p.right - 6 || r.bottom > p.bottom - 6 || r.left - irr < p.left + 4 || r.top < p.top + 4) continue;
        const trayecto = { left: r.left - irr, top: r.top, right: r.right + irr, bottom: r.bottom };
        if (zonas.some((z) => choca(trayecto, z, 10))) continue;
        if (otras.some((z) => choca(r, z, 105 * holgura))) continue;
        let dentro = false;
        if (v) {
          dentro = r.left >= v.left && r.right <= v.right && r.top >= v.top && r.bottom <= v.bottom;
          const fuera = r.right <= v.left || r.left >= v.right || r.bottom <= v.top || r.top >= v.bottom;
          if (!dentro && !fuera) continue;
          if (dentro && intento < 96) continue;
        }
        el.style.left = px2.toFixed(1) + "%";
        el.style.top = py2.toFixed(1) + "%";
        el.classList.toggle("preg--claro", dentro);
        return true;
      }
      return false;
    };
    let bolsa = [];
    const siguiente = () => {
      if (!bolsa.length) {
        bolsa = PHRASES.map((_, k) => k);
        for (let k = bolsa.length - 1; k > 0; k--) {
          const j = Math.random() * (k + 1) | 0;
          [bolsa[k], bolsa[j]] = [bolsa[j], bolsa[k]];
        }
      }
      return PHRASES[bolsa.pop()];
    };
    const ciclo = (el, i, estreno = false) => {
      const salida = parseFloat(el.style.getPropertyValue("--sale")) || 0;
      el.classList.remove("is-on");
      setTimeout(() => {
        delete el.dataset.ocupado;
        el.textContent = siguiente();
        const lado = Math.random() < 0.5 ? -1 : 1;
        el.style.setProperty("--irr", (lado * azar2(12, 28)).toFixed(0) + "px");
        el.style.setProperty("--entra", azar2(420, 820).toFixed(0) + "ms");
        el.style.setProperty("--sale", azar2(800, 1400).toFixed(0) + "ms");
        el.style.setProperty("--op", azar2(0.72, 0.95).toFixed(2));
        if (colocar(el) || colocar(el, 0.55)) {
          el.dataset.ocupado = "1";
          requestAnimationFrame(() => el.classList.add("is-on"));
          setTimeout(() => ciclo(el, i), azar2(...LEER_MS));
        } else {
          setTimeout(() => ciclo(el, i, estreno), estreno ? 200 : 900);
        }
      }, estreno ? 0 : salida + azar2(...PAUSA_MS));
    };
    preg.forEach((el, i) => setTimeout(() => ciclo(el, i, true), 90 + i * 300 + Math.random() * 220));
    let pendiente = false, px = -9999, py = -9999;
    const mover = () => {
      pendiente = false;
      const r = portada.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const mx = Math.max(-1, Math.min(1, ((px - r.left) / r.width - 0.5) * 2));
      const my = Math.max(-1, Math.min(1, ((py - r.top) / r.height - 0.5) * 2));
      portada.style.setProperty("--mx", mx.toFixed(3));
      portada.style.setProperty("--my", my.toFixed(3));
      const firma = $(".pais");
      if (firma) {
        const b = firma.getBoundingClientRect();
        const d = Math.hypot(b.left + b.width / 2 - px, b.top + b.height / 2 - py);
        firma.style.setProperty("--sep", d < 260 ? ((1 - d / 260) ** 2 * 0.16).toFixed(3) + "em" : "0em");
      }
      preg.forEach((el) => {
        if (!el.classList.contains("is-on")) return;
        const b = el.getBoundingClientRect();
        const dx = b.left + b.width / 2 - px, dy = b.top + b.height / 2 - py;
        const d = Math.hypot(dx, dy), R = 190;
        let ox = 0, oy = 0;
        if (d < R && d > 0.5) {
          const f = (1 - d / R) ** 2 * 9;
          ox = dx / d * f;
          oy = dy / d * f;
        }
        el.style.setProperty("--dx", ox.toFixed(1) + "px");
        el.style.setProperty("--dy", oy.toFixed(1) + "px");
      });
    };
    const pedir = () => {
      if (!pendiente) {
        pendiente = true;
        requestAnimationFrame(mover);
      }
    };
    window.addEventListener("pointermove", (e) => {
      px = e.clientX;
      py = e.clientY;
      pedir();
    }, { passive: true });
    window.addEventListener("scroll", pedir, { passive: true });
  }
  function smoothTo(hash) {
    const t = document.querySelector(hash);
    if (!t) return;
    const y = t.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 68);
    window.scrollTo({ top: y, behavior: reduce.matches ? "auto" : "smooth" });
  }
  function initMenu() {
    const burger = $("#burger"), menu = $("#menu");
    if (!burger || !menu) return;
    const close = () => {
      burger.setAttribute("aria-expanded", "false");
      menu.hidden = true;
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
    const open = () => {
      burger.setAttribute("aria-expanded", "true");
      menu.hidden = false;
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
      $$(".menu__list a", menu).forEach((a, i) => a.style.animationDelay = `${60 + i * 45}ms`);
    };
    burger.addEventListener("click", () => burger.getAttribute("aria-expanded") === "true" ? close() : open());
    menu.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      e.preventDefault();
      close();
      smoothTo(a.getAttribute("href"));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        close();
        burger.focus();
      }
    });
  }
  function initAnchors() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]:not(.skip)');
      if (!a || a.closest("#menu")) return;
      const hash = a.getAttribute("href");
      if (hash === "#" || !document.querySelector(hash)) return;
      e.preventDefault();
      if (!$("#detail").hidden && !$("#detail").contains(document.querySelector(hash))) {
        closeDetail(false);
      }
      smoothTo(hash);
    });
  }
  var detail = $("#detail");
  var main = $("#main");
  var foot = $(".foot");
  function trabajoHTML(c, alt = true) {
    return `
  <section class="dsec${alt ? " dsec--alt" : ""}">
    <div class="dsec__inner" style="--c:${c.color}">
      <p class="meta">Qu\xE9 hacemos \xB7 La huella que buscamos</p>
      <h2 class="dsec__h display">Lo que hacemos y lo que queremos dejar</h2>
      <div class="dpar">
        <div class="dpar__col">
          <p class="dpar__lbl meta">Lo que hacemos</p>
          <ul class="dlist">${c.hacemos.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        </div>
        <span class="dpar__arw" aria-hidden="true">\u2192</span>
        <div class="dpar__col">
          <p class="dpar__lbl meta">La huella que buscamos</p>
          <ul class="dlist">${c.logros.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        </div>
      </div>
    </div>
  </section>

  ${c.flow ? `
  <section class="dsec dsec--alt">
    <div class="dsec__inner" style="--c:${c.color}">
      <p class="meta">C\xF3mo funciona en la pr\xE1ctica</p>
      <h2 class="dsec__h display">Una escuela pr\xE1ctica de democracia</h2>
      <ol class="dflow">${c.flow.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>
      <p class="foot-note meta" style="grid-column:1/-1">Y el ciclo vuelve a empezar: Conectar \u2192 Aprender \u2192 Actuar.</p>
    </div>
  </section>` : ""}

  ${c.sostenibilidad ? `
  <section class="dsec">
    <div class="dsec__inner">
      <p class="meta">Sostenibilidad con prop\xF3sito</p>
      <h2 class="dsec__h display">${esc(c.sostenibilidad.titulo)}</h2>
      <div class="dsec__b prose"><p>${esc(c.sostenibilidad.texto)}</p></div>
    </div>
  </section>` : ""}`;
  }
  function dimensionesHTML(slug, c) {
    const dims = DIMENSIONES[slug];
    return `
  <section class="dbisagra">
    <div class="dsec__inner">
      ${c.trio ? `<p class="meta">${esc(c.cat)} \xB7 ${dims.length} proyectos</p>` : ""}
      <h2 class="dsec__h display">${DIMENSIONES_TITULO[slug] || ""}</h2>
      ${DIMENSIONES_LEDE[slug] ? `<div class="dsec__b prose"><p>${esc(DIMENSIONES_LEDE[slug])}</p></div>` : ""}
      ${c.trio ? `
      <nav class="ledger dbisagra__l" aria-label="Los proyectos de ${esc(c.cat)}">
        ${dims.map((d) => `<a class="lrow" href="#dim-${d.id}">
          <span class="lrow__k">${d.n}</span>
          <span><span class="lrow__t">${esc(d.nombre)}</span></span>
          <span class="lrow__s">${esc(d.verbo)}</span>
          <span class="lrow__x" aria-hidden="true">\u2193</span></a>`).join("")}
      </nav>` : ""}
    </div>
  </section>

  ${dims.map((d) => dimHTML(d, c)).join("")}`;
  }
  function dimHTML(d, c) {
    const acento = d.color || c.color;
    const cabeza = `
  <header class="ddim__head" id="dim-${d.id}" style="--c:${acento}">
    <div class="dsec__inner">
      <p class="ddim__n">${d.n}</p>
      <h2 class="ddim__t display">${esc(d.nombre)}</h2>
      <p class="ddim__v">${esc(d.verbo)}</p>
      ${d.emblema ? `<div class="ddim__emb" aria-hidden="true">${EMBLEMAS[d.emblema] || ""}</div>` : ""}
    </div>
  </header>`;
    if (d.deLupa) return cabeza + `
  <section class="dsec dsec--alt">
    <div class="dsec__inner">
      <p class="meta">Conocimiento para la acci\xF3n</p>
      <h2 class="dsec__h display">Ciudadan\xEDa que observa y pregunta</h2>
      <div class="dsec__b prose"><p>${esc(d.lede)}</p></div>
      <ol class="ledger ledger--lupa dlupa">
        ${LUPA.map((l) => `
        <li class="lrow">
          <span class="lrow__k">${esc(l.n)}</span>
          <span><span class="lrow__t">${esc(l.title)}</span></span>
          <span class="lrow__s">${esc(l.text)}</span>
        </li>`).join("")}
      </ol>
      <p class="foot-note meta">${esc(d.nota)}</p>
    </div>
  </section>`;
    return cabeza + `
  <section class="dsec dsec--alt">
    <div class="dsec__inner" style="--c:${acento}">
      <p class="meta">${esc(d.kicker || "C\xF3mo se aprende a participar")}</p>
      <h2 class="dsec__h display">${esc(d.title)}</h2>
      <div class="dsec__b prose">${d.estado ? `<p class="dproy__e meta">${esc(d.estado)}</p>` : ""}<p>${esc(d.resumen)}</p></div>
      <ul class="dlist">${d.hacemos.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
    </div>
  </section>`;
  }
  function paqueteHTML(slug, c) {
    const paquetes = PAQUETES.filter((p) => p.causa === slug);
    if (!paquetes.length) return "";
    return `
  <section class="dsec">
    <div class="dsec__inner" style="--c:${c.color}">
      <p class="meta">C\xF3mo se financia</p>
      <h2 class="dsec__h display">El Paquete \xC1gora que sostiene esta causa</h2>
      <div class="dcadena">
        ${paquetes.map((p) => `
        <a class="dcadena__p" href="#paquetes" data-paquete="${p.id}">
          <span class="dcadena__n">${esc(p.n)}</span>
          <span class="dcadena__t display">${esc(p.nombre)}</span>
          <span class="dcadena__paso"><b>Recibe</b> <i>${esc(p.queRecibe)}</i></span>
          <span class="dcadena__paso"><b>Financia</b> <i>${esc(p.queFinancia)}</i></span>
          <span class="dcadena__x">Ver el paquete <span class="arw" aria-hidden="true">\u2192</span></span>
        </a>`).join("")}
      </div>
    </div>
  </section>`;
  }
  var PROYECTOS = {
    democracia: [
      { nombre: "Marea Democr\xE1tica", texto: "Encuentros y convocatorias alrededor de los temas que nos afectan, para reunir voces distintas, conversar y construir propuestas." },
      { nombre: "Lupa Ciudadana", texto: "\xBFC\xF3mo nos cuentan lo que est\xE1 pasando? Herramientas para mirar con criterio c\xF3mo los medios eligen y narran la actualidad. No te decimos qu\xE9 pensar." },
      { nombre: "Liderazgo democr\xE1tico en la Ni\xF1ez y Adolescencia", texto: "Comit\xE9s y espacios de participaci\xF3n liderados por adolescentes, donde la democracia se ejerce y no solo se estudia." }
    ],
    comunidades: [
      { nombre: "Capacitaciones en derechos humanos y rutas de exigibilidad", texto: "Capacitaciones en derechos humanos y en las rutas para acceder a la justicia y exigir que esos derechos se cumplan, pensadas con y para poblaciones y grupos vulnerabilizados." }
    ],
    economias: [
      { nombre: "Siempre Verde", texto: "Convocatorias abiertas para construir, desde lo local, una agenda ambiental y despu\xE9s llevarla a la acci\xF3n." },
      { nombre: "El Sabor de lo Nuestro", texto: "Un puente entre el campo y la ciudad: comidas con familias anfitrionas en zonas rurales, emprendimiento rural y mercados artesanales." }
    ]
  };
  function causeHTML(slug) {
    const c = CAUSES[slug];
    if (!c) return "";
    const others = ORDER.filter((s) => s !== slug);
    const proys = PROYECTOS[slug] || [];
    const varios = proys.length > 1;
    return `
  <section class="dhero" style="--c:${c.color}">
    <video src="${c.video}" poster="${c.poster}" autoplay muted loop playsinline preload="metadata" aria-hidden="true"></video>
    <span class="dhero__scrim" style="background:linear-gradient(180deg,rgba(20,19,15,.55),rgba(20,19,15,.92))"></span>
    <p class="dhero__n" style="color:${c.color}">${c.n} / ${String(ORDER.length).padStart(2, "0")}</p>
    <p class="dhero__cat">${esc(c.cat)}</p>
    <h1 class="dhero__t display">${esc(c.title)}</h1>
    ${c.phrase ? `<p class="dhero__p">${esc(c.phrase)}</p>` : ""}
  </section>

  <section class="dsec">
    <div class="dsec__inner">
      <p class="meta">Lo que est\xE1 en juego</p>
      <h2 class="dsec__h display">De d\xF3nde parte</h2>
      <div class="dsec__b prose"><p>${esc(c.problema)}</p></div>
    </div>
  </section>

  <section class="dsec">
    <div class="dsec__inner" style="--c:${c.color}">
      <p class="meta">${varios ? "Proyectos propios" : "Proyecto propio"} \xB7 En construcci\xF3n</p>
      <h2 class="dsec__h display">${varios ? "Los proyectos" : "El proyecto"}</h2>
      <ol class="ledger dproys">
        ${proys.map((p, i) => `
        <li class="lrow" style="--c:${c.color}">
          <span class="lrow__k"><span class="lrow__dot" aria-hidden="true"></span>${String(i + 1).padStart(2, "0")}</span>
          <span><span class="lrow__t">${esc(p.nombre)}</span></span>
          <span class="lrow__s">${esc(p.texto)}</span>
        </li>`).join("")}
      </ol>
    </div>
  </section>

  <section class="dsec">
    <div class="dsec__inner" style="--c:${c.color}">
      <p class="meta">Lo que proponemos hacer</p>
      <h2 class="dsec__h display">Qu\xE9 hacemos</h2>
      <ul class="dlist">${c.hacemos.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
    </div>
  </section>

  <section class="dsec">
    <div class="dsec__inner" style="--c:${c.color}">
      <p class="meta">Si ya trabaj\xE1s en esto</p>
      <h2 class="dsec__h display">${varios ? "Los proyectos son nuestros" : "El proyecto es nuestro"}; el tema, no</h2>
      <ul class="dlist">
        <li>Impuls\xE9moslo juntos: sum\xE1 tu organizaci\xF3n al proyecto.</li>
        <li>Te acompa\xF1amos: fortalecemos lo que ya est\xE1s haciendo, transferimos lo que sabemos y soltamos.</li>
        <li>Te conectamos con otras iniciativas que trabajan en lo mismo.</li>
      </ul>
    </div>
  </section>

  <section class="dsec">
    <div class="dsec__inner">
      <p class="meta">Sumate a esta causa</p>
      <h2 class="dsec__h display">${esc(c.cta)}</h2>
      <div class="dsec__b prose">
        <p>Sum\xE1 tu tiempo o tu oficio, o tra\xE9 a tu organizaci\xF3n, y construyamos esto juntos.</p>
        <p style="margin-top:1.5rem;display:flex;gap:.75rem;flex-wrap:wrap">
          <a class="btn btn--solid" href="?#sumate" data-home data-destino="#sumate-persona">Quiero sumarme</a>
          <a class="btn" href="?#sumate" data-home data-destino="#sumate-org">Mi organizaci\xF3n trabaja en esto</a>
        </p>
      </div>
      <nav class="dstats ledger" aria-label="Otras causas">
        ${others.map((s) => `<a class="lrow" href="?causa=${s}" data-causa="${s}" style="--c:${CAUSES[s].color}">
          <span class="lrow__k"><span class="lrow__dot" aria-hidden="true"></span>${CAUSES[s].n}</span>
          <span><span class="lrow__t">${esc(CAUSES[s].cat)}</span></span>
          <span class="lrow__x">Ver tema \u2192</span></a>`).join("")}
      </nav>
    </div>
  </section>

  <button class="btn dback" id="dback">\u2190 Volver a lo que impulsamos</button>`;
  }
  function alternarBandas(raiz) {
    let i = 0;
    for (const sec of raiz.children) {
      if (!sec.classList.contains("dsec")) {
        if (sec.classList.contains("dquote") || sec.classList.contains("dbisagra") || sec.classList.contains("dhero")) i = 0;
        continue;
      }
      sec.classList.toggle("dsec--alt", i % 2 === 1);
      i++;
    }
  }
  function openDetail(slug, push = true) {
    const detail = $("#detail");
    const main = $("#main");
    const foot = $(".foot");
    if (!detail || !CAUSES[slug]) return;
    detail.innerHTML = causeHTML(slug);
    alternarBandas(detail);
    detail.hidden = false;
    detail.removeAttribute("aria-hidden");
    main.hidden = true;
    if (foot) foot.hidden = true;
    document.title = `${CAUSES[slug].cat} \xB7 Casa \xC1gora`;
    /* Abierto como archivo local, algunos navegadores no dejan cambiar la dirección: la página igual se abre. */
    if (push) try { history.pushState({ causa: slug }, "", `?causa=${slug}`); } catch (_) {}
    const destino = dimDestino && detail.querySelector(`#dim-${dimDestino}`);
    dimDestino = null;
    if (destino) destino.scrollIntoView({ behavior: "instant", block: "start" });
    else window.scrollTo({ top: 0, behavior: "instant" });
    $("#dback")?.addEventListener("click", () => closeDetail());
    staggerLines(detail);
    initReveal();
    detail.querySelector("h1")?.setAttribute("tabindex", "-1");
    detail.querySelector("h1")?.focus({ preventScroll: true });
  }
  function closeDetail(push = true) {
    const detail = $("#detail");
    const main = $("#main");
    const foot = $(".foot");
    if (!detail) return;
    detail.hidden = true;
    detail.setAttribute("aria-hidden", "true");
    detail.innerHTML = "";
    main.hidden = false;
    if (foot) foot.hidden = false;
    document.title = "Casa \xC1gora \xB7 Nadie avanza solo";
    if (push) try { history.pushState({}, "", location.pathname); } catch (_) {}
    smoothTo("#causas");
  }
  var CAUSAS_MUDADAS = {
    juventud: { a: "democracia", dim: "ninez" },
    territorios: { a: "economias", dim: "territorios" }
  };
  var dimDestino = null;
  function resolverCausa(slug) {
    if (!slug) return null;
    if (CAUSES[slug]) return slug;
    const m = CAUSAS_MUDADAS[slug];
    if (!m) return null;
    dimDestino = m.dim;
    try { history.replaceState({ causa: m.a }, "", `?causa=${m.a}`); } catch (_) {}
    return m.a;
  }
  function initRouting() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest("[data-causa]");
      if (a) {
        e.preventDefault();
        if (a.dataset.dim) dimDestino = a.dataset.dim;
        openDetail(a.dataset.causa);
        return;
      }
      const h = e.target.closest("[data-home]");
      if (h) {
        e.preventDefault();
        closeDetail();
        setTimeout(() => smoothTo(h.dataset.destino || "#sumate"), 120);
      }
    });
    window.addEventListener("popstate", () => {
      const slug2 = resolverCausa(new URLSearchParams(location.search).get("causa"));
      if (slug2) openDetail(slug2, false);
      else closeDetail(false);
    });
    const slug = resolverCausa(new URLSearchParams(location.search).get("causa"));
    if (slug) openDetail(slug, false);
  }
  function initForm() {
    const form = $("#signup"), msg = $("#signupMsg");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = $("#email", form);
      if (!input.value || !input.checkValidity()) {
        msg.textContent = "Escrib\xED un correo v\xE1lido para poder avisarte.";
        input.focus();
        return;
      }
      const asunto = encodeURIComponent("Quiero sumarme a Casa \xC1gora");
      const cuerpo = encodeURIComponent("Hola, quiero sumarme a Casa \xC1gora. Mi correo es " + input.value + ".");
      location.href = "mailto:agora@iiresodh.org?subject=" + asunto + "&body=" + cuerpo;
      msg.textContent = "Se abri\xF3 tu programa de correo con el mensaje listo para enviar. Si no se abri\xF3, escribinos a agora@iiresodh.org.";
      form.reset();
    });
  }
  function canRunField() {
    if (reduce.matches) return false;
    if (navigator.connection?.saveData) return false;
    if ((navigator.deviceMemory ?? 8) < 4) return false;
    if ((navigator.hardwareConcurrency ?? 8) < 4) return false;
    const c = document.createElement("canvas");
    return !!c.getContext("webgl2");
  }
  function initField() {
    const host = $("#campo"), canvas = $("#campoCanvas");
    if (!host || !canvas || !canRunField()) return null;
    const wide = window.matchMedia("(min-width: 900px)").matches;
    const campo = createCampo(canvas, wide ? { count: 780, simScale: 0.62, simCap: 1400, maxCov: 0.46 } : { count: 340, simScale: 0.45, simCap: 820, maxCov: 0.4 });
    if (!campo) return null;
    document.body.classList.add("has-campo");
    requestAnimationFrame(() => host.classList.add("is-live"));
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      campo.setScroll(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    const rail = $("#cycleRail");
    if (rail) {
      const cycle = $("#cycle");
      const drive = () => {
        const el = rail.offsetHeight >= 40 ? rail : cycle;
        if (!el || el.offsetHeight < 40) return;
        const r = el.getBoundingClientRect();
        const total = r.height + window.innerHeight;
        const t = (window.innerHeight - r.top) / total;
        campo.setCycle((Math.max(0, Math.min(1, t)) - 0.04) / 0.62);
      };
      window.addEventListener("scroll", drive, { passive: true });
      drive();
    }
    document.addEventListener("visibilitychange", () => campo.setActive(!document.hidden));
    window.__campo = campo;
    return campo;
  }
  function medirUmbral() {
    const umbral = $("#raices"), datos = $(".cover__meta"), portada = $("#top");
    if (!umbral || !datos || !portada) return;
    const aplicar = () => {
      const p = portada.getBoundingClientRect(), d = datos.getBoundingClientRect();
      const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 68;
      const hastaLaLinea = d.bottom - p.top + nav;
      if (hastaLaLinea < 40) return;
      const disolucion = Math.round(hastaLaLinea * 0.42);
      const alto = hastaLaLinea + disolucion;
      umbral.style.setProperty("--alto-umbral", alto + "px");
      umbral.style.setProperty("--corte-umbral", (hastaLaLinea / alto * 100).toFixed(1) + "%");
    };
    aplicar();
    addEventListener("resize", aplicar, { passive: true });
    if (document.fonts) document.fonts.ready.then(aplicar);
  }
  function initFondosDePorque() {
    const fondo = $(".porque__bg"), seccion = $("#existimos"), figura = $(".tres");
    if (!fondo || !seccion || reduce.matches) return;
    let enSeccion = false, cedido = false;
    const mandar = () => {
      if (enSeccion && !cedido) {
        if (fondo.preload !== "auto") {
          fondo.preload = "auto";
          fondo.load();
        }
        fondo.play().catch(() => {
        });
      } else fondo.pause();
    };
    fondo.addEventListener("play", () => {
      if (cedido || !enSeccion) fondo.pause();
    });
    new IntersectionObserver(
      ([e]) => {
        enSeccion = e.isIntersecting;
        mandar();
      },
      { rootMargin: "60% 0px 60% 0px" }
    ).observe(seccion);
    if (figura) new IntersectionObserver(
      ([e]) => {
        cedido = e.isIntersecting;
        mandar();
      },
      { rootMargin: "10% 0px 10% 0px" }
    ).observe(figura);
    mandar();
  }
  function initPenumbra() {
    const sec = $("#existimos"), velo = $("#porqueScrim");
    if (!sec || !velo || reduce.matches) return;
    let pendiente = false, x = 50, y = 40;
    const pintar = () => {
      pendiente = false;
      velo.style.setProperty("--lx", x.toFixed(1) + "%");
      velo.style.setProperty("--ly", y.toFixed(1) + "%");
    };
    window.addEventListener("pointermove", (e) => {
      const r = sec.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      x = (e.clientX - r.left) / r.width * 100;
      y = (e.clientY - r.top) / r.height * 100;
      if (!pendiente) {
        pendiente = true;
        requestAnimationFrame(pintar);
      }
    }, { passive: true });
  }
  function ce\u00F1irAlFragmento(v, panel) {
    const desde = +v.dataset.desde || 0;
    const hasta = +v.dataset.hasta || 0;
    if (!hasta) return;
    const marca = panel || v.parentElement;
    const desdeElPrincipio = desde < 0.5;
    if (desdeElPrincipio) {
      v.loop = true;
      v.addEventListener("timeupdate", () => {
        if (v.currentTime > hasta) {
          try {
            v.currentTime = 0;
          } catch (_) {
          }
        }
      });
      return;
    }
    v.loop = true;
    let mirando = false;
    const vigilar = () => {
      if (v.paused || v.ended) {
        mirando = false;
        return;
      }
      const t = v.currentTime;
      const fuera = t < desde - 0.02 || t > hasta;
      if (fuera && v.seekable.length && v.seekable.end(v.seekable.length - 1) > desde + 0.5) {
        v.playbackRate = 1;
        try {
          v.currentTime = desde;
        } catch (_) {
        }
        marca.classList.remove("is-buscando");
      } else {
        v.playbackRate = fuera ? 8 : 1;
        marca.classList.toggle("is-buscando", fuera);
      }
      requestAnimationFrame(vigilar);
    };
    const arrancar = () => {
      if (!mirando) {
        mirando = true;
        requestAnimationFrame(vigilar);
      }
    };
    v.addEventListener("play", arrancar);
    v.addEventListener("pause", () => marca.classList.remove("is-buscando"));
  }
  function initFragmentos() {
    $$("video[data-desde]").forEach((v) => {
      if (v.closest(".icause")) return;
      ce\u00F1irAlFragmento(v, v.closest("figure") || v.parentElement);
    });
  }
  function initSenal(campo) {
    const zona = $("#teleZona");
    const lienzo = $("#senalRuido");
    if (!zona || !lienzo || reduce.matches) return;
    const ctx = lienzo.getContext("2d");
    const W = 480, H = 360;
    lienzo.width = W;
    lienzo.height = H;
    const tela = document.createElement("canvas");
    tela.width = tela.height = 128;
    const tctx = tela.getContext("2d");
    const grano = tctx.createImageData(128, 128);
    const rehacerGrano = () => {
      const d = grano.data;
      for (let k = 0; k < d.length; k += 4) {
        const v = Math.random() * 255;
        d[k] = d[k + 1] = d[k + 2] = v;
        d[k + 3] = 255;
      }
      tctx.putImageData(grano, 0, 0);
    };
    rehacerGrano();
    if (campo) campo.setZonaMuda(zona);
    let px = -999, py = -999, activo = false, cuadro = 0, ultimo = 0;
    let senal = 0;
    const paso = () => {
      cuadro++;
      if (cuadro % 6 === 0) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.fillStyle = "rgba(0,0,0,.062)";
        ctx.fillRect(0, 0, W, H);
        ctx.globalCompositeOperation = "source-over";
      }
      if (senal > 0.3 && cuadro % 2 === 0) {
        ctx.globalAlpha = (senal - 0.3) * 0.52;
        ctx.drawImage(tela, Math.random() * 128 | 0, Math.random() * 128 | 0, 128, 128, 0, 0, W, H);
        ctx.globalAlpha = 1;
      }
      if (activo && performance.now() - ultimo < 150) {
        if (cuadro % 3 === 0) rehacerGrano();
        const r = zona.getBoundingClientRect();
        const x = (px - r.left) / r.width * W;
        const y = (py - r.top) / r.height * H;
        for (let k = 3; k >= 0; k--) {
          const rad = 26 + k * 15;
          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, rad, 0, 6.2832);
          ctx.clip();
          ctx.globalAlpha = (1 - k / 4) * 0.5;
          ctx.drawImage(
            tela,
            Math.random() * 128 | 0,
            Math.random() * 128 | 0,
            128,
            128,
            x - 90,
            y - 90,
            180,
            180
          );
          ctx.restore();
        }
        ctx.globalAlpha = 0.45;
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
    window.addEventListener("pointermove", (e) => {
      const r = zona.getBoundingClientRect();
      activo = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (activo) {
        px = e.clientX;
        py = e.clientY;
        ultimo = performance.now();
      }
    }, { passive: true });
    const emisora = $("#transmision");
    if (emisora) onScrollProgress(emisora, (p) => {
      senal = Math.max(0, Math.min(1, p));
      emisora.style.setProperty("--senal", senal.toFixed(3));
    });
    let vela = 1;
    setInterval(() => {
      if (!emisora) return;
      const prob = 0.05 + senal * 0.3;
      vela = Math.random() < prob ? 1 - Math.random() * (0.1 + senal * 0.28) : 1;
      emisora.style.setProperty("--parpadeo", vela.toFixed(3));
    }, 220);
  }
  function initRevolucion() {
    $$(".rev, .agenda__cabeza").forEach(separarCapas);
  }
  function separarCapas(rev) {
    if (!rev || reduce.matches) return;
    let pedido = false, px = 0, py = 0;
    const pintar = () => {
      pedido = false;
      const r = rev.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      rev.style.setProperty("--rx", Math.max(-1, Math.min(1, ((px - r.left) / r.width - 0.5) * 2)).toFixed(3));
      rev.style.setProperty("--ry", Math.max(-1, Math.min(1, ((py - r.top) / r.height - 0.5) * 2)).toFixed(3));
    };
    addEventListener("pointermove", (e) => {
      px = e.clientX;
      py = e.clientY;
      if (!pedido) {
        pedido = true;
        requestAnimationFrame(pintar);
      }
    }, { passive: true });
  }
  async function initRueda() {
    const host = $("#cycleRueda");
    if (!host) return;
    try {
      host.innerHTML = '<svg class="rueda" id="ruedaAgora" viewBox="0 0 1000 1000" role="img"\n     aria-label="Rueda de carreta pintada: el ciclo Conectar, Aprender, Actuar, volver a conectar, con \xC1gora en el centro">\n  <g class="pz pz--cubo">\n    <circle cx="500.0" cy="500.0" r="118" fill="#F0E5CA" stroke="#141310" stroke-width="10" style="--t:0.000"/>\n    <polygon points="582.2,499.0 579.8,534.3 610.2,522.5" fill="#FF4B2B" opacity="0.90" style="--t:0.000"/>\n    <polygon points="575.6,531.0 561.5,560.2 592.9,563.2" fill="#2438D8" opacity="0.90" style="--t:0.000"/>\n    <polygon points="561.0,559.3 531.2,574.8 562.9,591.1" fill="#0FA36B" opacity="0.90" style="--t:0.000"/>\n    <polygon points="531.2,576.3 499.3,586.7 523.2,612.2" fill="#FFC22E" opacity="0.90" style="--t:0.000"/>\n    <polygon points="500.3,586.6 469.9,576.3 478.7,608.8" fill="#FF4B2B" opacity="0.90" style="--t:0.000"/>\n    <polygon points="468.3,578.9 439.8,560.0 435.1,594.3" fill="#2438D8" opacity="0.90" style="--t:0.000"/>\n    <polygon points="439.3,559.3 423.8,530.9 405.5,563.6" fill="#0FA36B" opacity="0.90" style="--t:0.000"/>\n    <polygon points="420.8,533.6 419.0,500.1 390.0,520.3" fill="#FFC22E" opacity="0.90" style="--t:0.000"/>\n    <polygon points="416.2,500.3 423.6,469.7 388.1,477.2" fill="#FF4B2B" opacity="0.90" style="--t:0.000"/>\n    <polygon points="423.3,467.2 440.7,440.5 406.4,436.8" fill="#2438D8" opacity="0.90" style="--t:0.000"/>\n    <polygon points="441.9,443.4 470.4,424.5 438.6,408.4" fill="#0FA36B" opacity="0.90" style="--t:0.000"/>\n    <polygon points="466.9,422.0 499.7,413.5 476.6,389.2" fill="#FFC22E" opacity="0.90" style="--t:0.000"/>\n    <polygon points="500.3,417.2 531.9,419.9 524.0,387.9" fill="#FF4B2B" opacity="0.90" style="--t:0.000"/>\n    <polygon points="532.0,422.4 557.3,440.5 560.0,406.3" fill="#2438D8" opacity="0.90" style="--t:0.000"/>\n    <polygon points="558.4,441.5 579.7,466.5 593.8,436.7" fill="#0FA36B" opacity="0.90" style="--t:0.000"/>\n    <polygon points="577.5,466.5 584.8,499.2 608.4,478.5" fill="#FFC22E" opacity="0.90" style="--t:0.000"/>\n    <circle cx="500.0" cy="500.0" r="80" fill="#F0E5CA" stroke="#141310" stroke-width="5" opacity=".8" style="--t:0.000"/>\n    <text x="500.0" y="515.0" text-anchor="middle" class="rueda__cubo" style="--t:0.000">\xE1gora</text>\n  </g>\n  <g class="pz pz--radios">\n    <line x1="604.0" y1="499.9" x2="907.5" y2="499.7" pathLength="1" stroke="#141310" stroke-width="9" opacity=".72" stroke-linecap="round" style="--t:0.050"/>\n    <line x1="595.8" y1="540.4" x2="875.3" y2="658.3" pathLength="1" stroke="#141310" stroke-width="9" opacity=".72" stroke-linecap="round" style="--t:0.067"/>\n    <line x1="573.6" y1="573.4" x2="787.7" y2="787.0" pathLength="1" stroke="#141310" stroke-width="9" opacity=".72" stroke-linecap="round" style="--t:0.084"/>\n    <line x1="539.2" y1="596.3" x2="653.4" y2="877.3" pathLength="1" stroke="#141310" stroke-width="9" opacity=".72" stroke-linecap="round" style="--t:0.101"/>\n    <line x1="500.4" y1="604.0" x2="501.5" y2="907.5" pathLength="1" stroke="#141310" stroke-width="9" opacity=".72" stroke-linecap="round" style="--t:0.118"/>\n    <line x1="459.6" y1="595.8" x2="343.2" y2="872.1" pathLength="1" stroke="#141310" stroke-width="9" opacity=".72" stroke-linecap="round" style="--t:0.135"/>\n    <line x1="426.9" y1="574.0" x2="215.9" y2="787.6" pathLength="1" stroke="#141310" stroke-width="9" opacity=".72" stroke-linecap="round" style="--t:0.152"/>\n    <line x1="404.2" y1="540.4" x2="122.3" y2="659.2" pathLength="1" stroke="#141310" stroke-width="9" opacity=".72" stroke-linecap="round" style="--t:0.169"/>\n    <line x1="396.0" y1="500.4" x2="97.9" y2="501.4" pathLength="1" stroke="#141310" stroke-width="9" opacity=".72" stroke-linecap="round" style="--t:0.186"/>\n    <line x1="403.9" y1="460.2" x2="126.3" y2="345.3" pathLength="1" stroke="#141310" stroke-width="9" opacity=".72" stroke-linecap="round" style="--t:0.203"/>\n    <line x1="426.0" y1="426.9" x2="213.7" y2="217.0" pathLength="1" stroke="#141310" stroke-width="9" opacity=".72" stroke-linecap="round" style="--t:0.220"/>\n    <line x1="460.9" y1="403.6" x2="347.9" y2="125.3" pathLength="1" stroke="#141310" stroke-width="9" opacity=".72" stroke-linecap="round" style="--t:0.237"/>\n    <line x1="500.0" y1="396.0" x2="499.8" y2="94.7" pathLength="1" stroke="#141310" stroke-width="9" opacity=".72" stroke-linecap="round" style="--t:0.254"/>\n    <line x1="539.2" y1="403.7" x2="653.9" y2="122.3" pathLength="1" stroke="#141310" stroke-width="9" opacity=".72" stroke-linecap="round" style="--t:0.271"/>\n    <line x1="573.7" y1="426.6" x2="789.3" y2="211.7" pathLength="1" stroke="#141310" stroke-width="9" opacity=".72" stroke-linecap="round" style="--t:0.288"/>\n    <line x1="596.3" y1="460.7" x2="875.1" y2="347.1" pathLength="1" stroke="#141310" stroke-width="9" opacity=".72" stroke-linecap="round" style="--t:0.305"/>\n  </g>\n  <g class="pz pz--aro">\n    <circle cx="500.0" cy="500.0" r="474" pathLength="1" fill="none" stroke="#141310" stroke-width="12" opacity=".92" style="--t:0.340"/>\n    <circle cx="500.0" cy="500.0" r="410" pathLength="1" fill="none" stroke="#141310" stroke-width="4" opacity=".55" style="--t:0.378"/>\n    <circle cx="500.0" cy="500.0" r="332" pathLength="1" fill="none" stroke="#141310" stroke-width="5" opacity=".7" style="--t:0.416"/>\n    <circle cx="500.0" cy="500.0" r="240" pathLength="1" fill="none" stroke="#141310" stroke-width="4" opacity=".62" style="--t:0.454"/>\n  </g>\n  <g class="pz pz--greca">\n    <polygon points="837.4,497.5 828.3,558.5 901.4,539.9" fill="#2438D8" opacity="0.90" style="--t:0.420"/>\n    <polygon points="826.0,561.1 812.7,622.9 891.9,606.8" fill="#FF4B2B" opacity="0.90" style="--t:0.424"/>\n    <polygon points="810.6,617.5 783.7,676.1 857.5,677.3" fill="#0FA36B" opacity="0.90" style="--t:0.429"/>\n    <polygon points="783.9,679.8 751.5,727.7 825.9,741.9" fill="#FFC22E" opacity="0.90" style="--t:0.433"/>\n    <polygon points="749.3,728.3 705.4,770.4 772.0,797.4" fill="#2438D8" opacity="0.90" style="--t:0.438"/>\n    <polygon points="701.7,764.8 646.9,800.1 716.8,846.3" fill="#FF4B2B" opacity="0.90" style="--t:0.443"/>\n    <polygon points="649.8,801.5 591.6,819.6 650.4,874.8" fill="#0FA36B" opacity="0.90" style="--t:0.447"/>\n    <polygon points="591.3,821.6 530.3,835.9 569.9,893.0" fill="#FFC22E" opacity="0.90" style="--t:0.452"/>\n    <polygon points="526.7,830.7 469.3,836.6 501.3,902.8" fill="#2438D8" opacity="0.90" style="--t:0.456"/>\n    <polygon points="468.6,833.4 410.3,824.0 430.4,897.9" fill="#FF4B2B" opacity="0.90" style="--t:0.460"/>\n    <polygon points="405.3,819.7 349.9,797.6 357.8,873.0" fill="#0FA36B" opacity="0.90" style="--t:0.465"/>\n    <polygon points="351.7,796.3 294.7,765.5 287.8,839.8" fill="#FFC22E" opacity="0.90" style="--t:0.469"/>\n    <polygon points="296.3,773.2 253.0,729.6 229.1,792.9" fill="#2438D8" opacity="0.90" style="--t:0.474"/>\n    <polygon points="250.7,729.8 217.1,674.9 175.0,742.0" fill="#FF4B2B" opacity="0.90" style="--t:0.478"/>\n    <polygon points="216.9,675.8 183.6,623.3 137.8,685.7" fill="#0FA36B" opacity="0.90" style="--t:0.483"/>\n    <polygon points="187.2,621.1 171.0,557.6 112.6,612.0" fill="#FFC22E" opacity="0.90" style="--t:0.487"/>\n    <polygon points="169.9,558.3 168.4,504.0 97.0,542.1" fill="#2438D8" opacity="0.90" style="--t:0.492"/>\n    <polygon points="163.8,497.5 168.4,440.1 95.2,458.3" fill="#FF4B2B" opacity="0.90" style="--t:0.496"/>\n    <polygon points="170.2,442.1 184.7,374.6 107.3,391.0" fill="#0FA36B" opacity="0.90" style="--t:0.501"/>\n    <polygon points="185.6,381.1 208.7,323.0 136.8,321.1" fill="#FFC22E" opacity="0.90" style="--t:0.505"/>\n    <polygon points="218.0,323.4 253.2,275.2 179.4,260.9" fill="#2438D8" opacity="0.90" style="--t:0.510"/>\n    <polygon points="249.9,275.8 295.1,230.9 233.5,201.2" fill="#FF4B2B" opacity="0.90" style="--t:0.514"/>\n    <polygon points="296.3,229.9 354.7,202.4 291.8,158.5" fill="#0FA36B" opacity="0.90" style="--t:0.519"/>\n    <polygon points="350.1,198.1 406.3,181.7 353.7,121.2" fill="#FFC22E" opacity="0.90" style="--t:0.523"/>\n    <polygon points="408.6,175.1 465.7,161.4 426.1,99.6" fill="#2438D8" opacity="0.90" style="--t:0.528"/>\n    <polygon points="466.8,165.8 534.3,163.1 498.4,95.6" fill="#FF4B2B" opacity="0.90" style="--t:0.532"/>\n    <polygon points="530.0,160.4 592.3,178.1 572.2,99.1" fill="#0FA36B" opacity="0.90" style="--t:0.537"/>\n    <polygon points="588.3,179.8 648.2,194.8 648.2,128.5" fill="#FFC22E" opacity="0.90" style="--t:0.541"/>\n    <polygon points="648.0,196.5 706.9,231.7 711.1,161.1" fill="#2438D8" opacity="0.90" style="--t:0.546"/>\n    <polygon points="706.6,232.9 751.0,271.9 773.7,205.4" fill="#FF4B2B" opacity="0.90" style="--t:0.550"/>\n    <polygon points="748.1,275.3 782.7,322.1 821.0,252.3" fill="#0FA36B" opacity="0.90" style="--t:0.555"/>\n    <polygon points="782.6,325.6 812.7,381.4 863.0,321.7" fill="#FFC22E" opacity="0.90" style="--t:0.559"/>\n    <polygon points="818.6,380.9 829.4,437.1 884.9,389.2" fill="#2438D8" opacity="0.90" style="--t:0.564"/>\n    <polygon points="833.1,440.5 833.6,499.3 904.8,461.8" fill="#FF4B2B" opacity="0.90" style="--t:0.569"/>\n  </g>\n  <g class="pz pz--rombos">\n    <polygon points="829.5,500.5 784.0,524.9 741.3,500.4 784.2,476.0" fill="#FF4B2B" opacity="0.92" style="--t:0.500"/>\n    <polygon points="807.7,617.5 758.5,625.1 725.8,586.2 772.7,578.0" fill="#FFC22E" opacity="0.92" style="--t:0.507"/>\n    <polygon points="749.6,713.3 700.2,703.3 686.1,659.1 730.5,664.9" fill="#2438D8" opacity="0.92" style="--t:0.514"/>\n    <polygon points="666.1,780.2 623.7,756.7 625.2,711.2 665.1,730.7" fill="#0FA36B" opacity="0.92" style="--t:0.521"/>\n    <polygon points="556.2,822.1 524.9,786.8 541.8,739.3 572.9,775.3" fill="#FF4B2B" opacity="0.92" style="--t:0.528"/>\n    <polygon points="447.6,823.8 430.9,774.7 461.4,738.9 478.9,783.8" fill="#FFC22E" opacity="0.92" style="--t:0.535"/>\n    <polygon points="330.4,781.8 331.0,732.8 374.7,708.2 373.5,758.0" fill="#2438D8" opacity="0.92" style="--t:0.542"/>\n    <polygon points="247.3,708.1 265.6,661.4 310.0,656.5 296.0,699.8" fill="#0FA36B" opacity="0.92" style="--t:0.549"/>\n    <polygon points="191.6,618.1 223.4,579.5 273.6,586.7 241.3,625.5" fill="#FF4B2B" opacity="0.92" style="--t:0.556"/>\n    <polygon points="174.0,494.5 212.6,470.4 256.9,495.9 216.9,519.6" fill="#FFC22E" opacity="0.92" style="--t:0.563"/>\n    <polygon points="195.3,382.2 241.9,373.7 274.3,412.7 227.8,420.9" fill="#2438D8" opacity="0.92" style="--t:0.570"/>\n    <polygon points="247.8,286.1 299.3,297.7 312.0,340.6 268.6,335.7" fill="#0FA36B" opacity="0.92" style="--t:0.577"/>\n    <polygon points="336.5,213.1 380.2,240.2 378.0,285.9 337.0,263.8" fill="#FF4B2B" opacity="0.92" style="--t:0.584"/>\n    <polygon points="440.3,180.0 471.9,215.8 454.9,258.1 423.4,223.6" fill="#FFC22E" opacity="0.92" style="--t:0.591"/>\n    <polygon points="562.7,177.4 579.1,222.6 546.1,263.0 530.4,214.2" fill="#2438D8" opacity="0.92" style="--t:0.598"/>\n    <polygon points="666.5,214.9 666.5,264.0 623.8,288.1 621.9,242.8" fill="#0FA36B" opacity="0.92" style="--t:0.605"/>\n    <polygon points="746.9,287.1 733.9,331.0 685.6,339.9 699.4,295.7" fill="#FF4B2B" opacity="0.92" style="--t:0.612"/>\n    <polygon points="805.3,388.5 775.8,425.4 728.8,416.5 760.9,378.4" fill="#FFC22E" opacity="0.92" style="--t:0.619"/>\n  </g>\n  <g class="pz pz--interior">\n    <polygon points="732.9,501.6 726.8,565.9 675.5,526.4" fill="#0FA36B" opacity="0.90" style="--t:0.560"/>\n    <polygon points="722.1,566.8 696.4,626.2 656.0,572.6" fill="#2438D8" opacity="0.90" style="--t:0.566"/>\n    <polygon points="696.0,624.9 652.5,672.4 631.8,616.3" fill="#FFC22E" opacity="0.90" style="--t:0.571"/>\n    <polygon points="653.0,674.6 599.9,716.4 593.1,647.4" fill="#FF4B2B" opacity="0.90" style="--t:0.577"/>\n    <polygon points="598.1,716.9 531.8,731.5 547.5,669.0" fill="#0FA36B" opacity="0.90" style="--t:0.582"/>\n    <polygon points="535.7,732.7 464.9,732.4 501.9,680.2" fill="#2438D8" opacity="0.90" style="--t:0.588"/>\n    <polygon points="466.5,731.8 405.3,713.1 451.8,671.5" fill="#FFC22E" opacity="0.90" style="--t:0.593"/>\n    <polygon points="404.8,711.3 345.6,680.2 406.1,647.8" fill="#FF4B2B" opacity="0.90" style="--t:0.599"/>\n    <polygon points="346.4,679.0 305.4,628.4 366.9,614.3" fill="#0FA36B" opacity="0.90" style="--t:0.604"/>\n    <polygon points="298.9,628.4 274.3,567.8 341.7,572.2" fill="#2438D8" opacity="0.90" style="--t:0.610"/>\n    <polygon points="279.8,564.6 262.4,498.3 322.4,525.4" fill="#FFC22E" opacity="0.90" style="--t:0.615"/>\n    <polygon points="264.9,501.2 277.4,434.8 327.6,476.6" fill="#FF4B2B" opacity="0.90" style="--t:0.621"/>\n    <polygon points="273.8,434.2 302.9,370.7 337.8,424.1" fill="#0FA36B" opacity="0.90" style="--t:0.626"/>\n    <polygon points="305.2,372.8 344.9,318.5 367.5,382.4" fill="#2438D8" opacity="0.90" style="--t:0.632"/>\n    <polygon points="349.7,326.4 404.1,290.2 407.0,353.0" fill="#FFC22E" opacity="0.90" style="--t:0.637"/>\n    <polygon points="400.6,288.3 464.6,271.7 450.0,334.4" fill="#FF4B2B" opacity="0.90" style="--t:0.643"/>\n    <polygon points="465.5,270.6 533.7,268.1 500.5,327.4" fill="#0FA36B" opacity="0.90" style="--t:0.648"/>\n    <polygon points="531.5,269.8 596.9,284.3 548.3,330.4" fill="#2438D8" opacity="0.90" style="--t:0.654"/>\n    <polygon points="596.7,286.0 652.7,321.9 596.4,353.2" fill="#FFC22E" opacity="0.90" style="--t:0.659"/>\n    <polygon points="657.2,320.1 696.4,373.9 633.6,382.1" fill="#FF4B2B" opacity="0.90" style="--t:0.665"/>\n    <polygon points="697.1,375.7 727.9,432.9 662.3,426.2" fill="#0FA36B" opacity="0.90" style="--t:0.670"/>\n    <polygon points="724.9,432.2 737.5,499.2 676.5,474.8" fill="#2438D8" opacity="0.90" style="--t:0.675"/>\n  </g>\n  <g class="pz pz--pasos">\n    <path id="arcoSup" fill="none" d="M 82.0 500.0 A 418 418 0 0 1 918.0 500.0"/>\n    <path id="arcoInf" fill="none" d="M 34.0 500.0 A 466 466 0 0 0 966.0 500.0"/>\n    <text class="rueda__paso" data-paso="0" text-anchor="middle" style="--t:0.080"><textPath href="#arcoSup" startOffset="50%">Conectar</textPath></text>\n    <text class="rueda__paso" data-paso="1" text-anchor="middle" style="--t:0.280"><textPath href="#arcoSup" startOffset="88%">Aprender</textPath></text>\n    <text class="rueda__paso" data-paso="2" text-anchor="middle" style="--t:0.500"><textPath href="#arcoInf" startOffset="80%">Actuar</textPath></text>\n    <text class="rueda__paso" data-paso="3" text-anchor="middle" style="--t:0.720"><textPath href="#arcoInf" startOffset="26%">Volver a conectar</textPath></text>\n  </g>\n  <g class="pz pz--flechas">\n    <polygon points="756.1,120.3 785.6,119.2 764.0,148.0" fill="#141310" opacity="0.85" style="--t:0.660"/>\n    <polygon points="956.9,531.9 972.6,556.9 936.8,552.6" fill="#141310" opacity="0.85" style="--t:0.660"/>\n    <polygon points="484.0,957.7 459.6,974.3 462.7,938.4" fill="#141310" opacity="0.85" style="--t:0.660"/>\n    <polygon points="43.1,468.1 27.4,443.1 63.2,447.4" fill="#141310" opacity="0.85" style="--t:0.660"/>\n  </g>\n</svg>';
      initCycle($("#cycleRail"), host, $$(".cstep"));
    } catch {
    }
  }
  let booted = false;
  export function boot() {
    if (booted) return;
    booted = true;
    startClock();
    startPhrases();
    renderMarquee();
    renderCauses();
    initCasa();
    initPaquetes();
    initPaqueteRes();
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
    initNav($("#nav"));
    initSpy($$(".nav__links a"));
    initMagnetic($$(".cover__ctas .btn--solid"));
    startEngine();
    const campo = initField();
    initRueda();
    initPenumbra();
    initSenal(campo);
    initSonido();
    medirUmbral();
    initFragmentos();
    initFondosDePorque();
    initRevolucion();
    const franja = $("#raices");
    if (franja) initRaices(franja);
    $$("[data-red]").forEach((el) => initRaices(el, {
      suelo: false,
      densidad: parseFloat(el.dataset.red) || 0.62
    }));
    const aire = $(".humo");
    if (aire) initHumo(aire);
  }

