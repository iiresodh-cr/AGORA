/* ═══════════════════════════════════════════════════════════════════
   Casa Ágora en profundidad — WebGL

   La pintura no se sustituye por un modelo: se le devuelve el espacio
   que un cuadro siempre tuvo. `casa-fachada.jpg` se monta sobre una
   malla cuyos vértices se hunden o se adelantan según un mapa de
   profundidad (`casa-profundidad.png`, blanco = cerca, negro = lejos),
   y la cámara se mueve. El cielo queda atrás, el empedrado adelante, y
   por la puerta y el portón se mira hacia dentro.

   El mapa se dibujó midiendo la pintura sobre una rejilla de
   porcentajes: el alero se adelanta, la tapia del jardín queda detrás
   del plano de la casa, y los dos huecos —el zaguán encendido y el
   portón abierto— se hunden. Está desenfocado a propósito: el
   desplazamiento sólo necesita frecuencias bajas, y un borde duro
   dejaría ver el recorte.

   Sin librerías. Un plano texturizado y una cámara son ~9 KB de WebGL
   plano; Three.js habría costado unos 600 KB para lo mismo.

   Mejora progresiva: si no hay WebGL, o si el usuario pidió menos
   movimiento, este módulo no arranca y queda la <img> de siempre.
   ═══════════════════════════════════════════════════════════════════ */

const PINTURA = 'assets/img/casa-fachada.jpg';
const RELIEVE_MAPA = 'assets/img/casa-profundidad.png';
/* La máscara es el recorte de la arquitectura. No está dibujada a
   mano: el cielo se sacó inundando la pintura desde arriba con un
   umbral de luz, de modo que el filo sigue el relieve real del tejado
   teja por teja. Fuera de la casa el alfa es cero, así que no hay
   rectángulo posible: lo que se ve alrededor es el espacio de la
   sección. El cielo de la pintura ya no está en la pintura — está en
   el fondo de la página. */
const MASCARA = 'assets/img/casa-silueta.png';

/* La malla se pasa de tamaño un 8 % por cada lado. Al hundirse, el
   cielo se encoge y dejaría ver el fondo por el borde; con este margen
   nunca llega a asomar. Las uv se recortan a [0,1], así que el exceso
   estira el píxel del borde —cal, cielo y empedrado, sin detalle— y no
   se nota. */
const MARGEN = 0.08;
const ASPECTO = 1600 / 1067;

/* Cuánto se separan en Z el punto más cercano y el más lejano, en
   unidades del plano (que mide 1.5 de ancho). Es deliberadamente poco:
   la profundidad se percibe por el movimiento, no por la deformación.
   Con más, la pintura se dobla y se ve el truco. */
const RELIEVE = 0.145;

/* Dónde mira la cámara en cada capa. Las uv son las mismas que usan
   los puntos interactivos sobre la pintura. */
export const CAPAS = [
  { id: 'fachada', n: '01', nombre: 'La fachada', u: 0.50, v: 0.50, acerca: 1.00 },
  { id: 'zaguan',  n: '02', nombre: 'El zaguán',  u: 0.155, v: 0.545, acerca: 0.66 },
  { id: 'patio',   n: '03', nombre: 'El patio',   u: 0.79, v: 0.63, acerca: 0.64 }
];

/* ---- matrices ---------------------------------------------------
   Lo mínimo para una cámara: perspectiva, traslación y dos giros. */
function perspectiva(fovY, aspecto, cerca, lejos) {
  const f = 1 / Math.tan(fovY / 2), nf = 1 / (cerca - lejos);
  return [f / aspecto, 0, 0, 0,
          0, f, 0, 0,
          0, 0, (lejos + cerca) * nf, -1,
          0, 0, 2 * lejos * cerca * nf, 0];
}

function multiplicar(a, b) {
  const r = new Array(16);
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      r[i * 4 + j] = a[j] * b[i * 4] + a[4 + j] * b[i * 4 + 1] +
                     a[8 + j] * b[i * 4 + 2] + a[12 + j] * b[i * 4 + 3];
    }
  }
  return r;
}

function vista(x, y, z, giroY, giroX) {
  const cy = Math.cos(giroY), sy = Math.sin(giroY);
  const cx = Math.cos(giroX), sx = Math.sin(giroX);
  // rotación Y · rotación X, después traslación: la cámara orbita muy
  // poco alrededor del cuadro, no lo empuja de lado.
  const m = [ cy, sy * sx, -sy * cx, 0,
              0,  cx,       sx,      0,
              sy, -cy * sx, cy * cx, 0,
              0,  0,        0,       1 ];
  m[12] = x * m[0] + y * m[4] + z * m[8];
  m[13] = x * m[1] + y * m[5] + z * m[9];
  m[14] = x * m[2] + y * m[6] + z * m[10];
  return m;
}

const VERT = `
attribute vec3 aPos;
attribute vec2 aUv;
uniform mat4 uMvp;
varying vec2 vUv;
varying float vZ;
void main() {
  vUv = aUv;
  vZ = aPos.z;
  gl_Position = uMvp * vec4(aPos, 1.0);
}`;

const FRAG = `
precision mediump float;
uniform sampler2D uPintura;
uniform sampler2D uMascara;
uniform vec3 uFondo;
uniform float uNiebla;
uniform float uCalidez;
uniform vec2 uVista;
varying vec2 vUv;
varying float vZ;
void main() {
  vec3 c = texture2D(uPintura, clamp(vUv, 0.0, 1.0)).rgb;
  /* Una pizca de aire: lo que quedó atrás se asienta hacia el color de
     la banda. Muy poco —la pintura ya trae su propia perspectiva
     aérea— y sólo para que no flote recortada sobre el fondo. */
  float lejania = clamp(-vZ / ${RELIEVE.toFixed(3)}, 0.0, 1.0);
  c = mix(c, uFondo, lejania * uNiebla);
  /* El sábado la casa está más entrada la tarde. No es un ciclo
     día-noche —la pintura tiene su hora y no se le puede cambiar sin
     inventarla—, sólo un grado más cálido y un punto de luz en las
     sombras, como cuando hay gente adentro. */
  c = mix(c, c * vec3(1.10, 1.015, 0.90) + vec3(0.035, 0.018, 0.0), uCalidez);
  float m = texture2D(uMascara, clamp(vUv, 0.0, 1.0)).r;
  /* Con el recorte ya no hace falta velar arriba ni abajo: fuera de
     la casa el alfa es cero. Queda un seguro sólo a los lados, porque
     ahí el muro lo corta el marco de la pintura y no una pared, y al
     acercarse la cámara podría comerse el poco desvanecido que trae
     el propio recorte. */
  vec2 s = gl_FragCoord.xy / uVista;
  /* Asimétrico a propósito. Por la derecha la casa acaba en
     arquitectura de verdad —el pilar del portón— y no hay que
     disimular nada. Por la izquierda es el marco de la pintura el que
     corta el muro a media pared, así que ahí el desvanecido tiene que
     ser largo o se ve el canto. */
  float borde = smoothstep(0.0, 0.115, s.x) * (1.0 - smoothstep(0.975, 1.0, s.x));
  gl_FragColor = vec4(c, m * borde);
}`;

function compilar(gl, tipo, fuente) {
  const s = gl.createShader(tipo);
  gl.shaderSource(s, fuente);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn('casa3d:', gl.getShaderInfoLog(s));
    return null;
  }
  return s;
}

function cargarImagen(src) {
  return new Promise((ok, mal) => {
    const im = new Image();
    im.decoding = 'async';
    im.onload = () => ok(im);
    im.onerror = mal;
    im.src = src;
  });
}

/* El mapa de profundidad se lee una sola vez en la CPU y la Z se hornea
   en el buffer de vértices. Así se evita el muestreo de texturas en el
   vertex shader, que en WebGL 1 no está garantizado (hay móviles con
   MAX_VERTEX_TEXTURE_IMAGE_UNITS = 0), y la malla no cuesta nada por
   frame: sólo se mueve la cámara. */
function leerRelieve(imagen, cols, filas) {
  const c = document.createElement('canvas');
  c.width = cols; c.height = filas;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(imagen, 0, 0, cols, filas);
  const px = ctx.getImageData(0, 0, cols, filas).data;
  const z = new Float32Array(cols * filas);
  for (let i = 0; i < cols * filas; i++) z[i] = px[i * 4] / 255;
  return z;
}

export function initCasa3D({ figura, lienzo, puntos = [] } = {}) {
  if (!figura || !lienzo) return null;

  /* Con alfa: la casa tiene que poder mezclarse con la página, no
     taparla con un rectángulo opaco. */
  const gl = lienzo.getContext('webgl', {
    alpha: true, premultipliedAlpha: false, antialias: true, depth: false,
    powerPreference: 'low-power'
  }) || lienzo.getContext('experimental-webgl');
  if (!gl) return null;

  const movil = matchMedia('(max-width: 700px)').matches;
  const COLS = movil ? 64 : 128;
  const FILAS = Math.round(COLS / ASPECTO);

  let prog, bufPos, bufUv, bufIdx, textura, mascara, nIndices = 0;
  let relieve = null, relieveCols = 0, relieveFilas = 0;
  let vivo = false, pedido = 0;

  /* estado de cámara: un valor objetivo y uno que lo persigue, para que
     todo llegue con inercia y nada dé saltos */
  const cam = {
    acerca: 1.0, acercaObj: 1.0,
    u: 0.5, uObj: 0.5,
    v: 0.5, vObj: 0.5,
    giroX: 0, giroXObj: 0,
    giroY: 0, giroYObj: 0,
    calidez: 0, calidezObj: 0
  };
  let capaFijada = -1, t0 = performance.now();
  /* El último progreso de scroll. Hace falta guardarlo: al salir del
     sábado hay que devolver la cámara a donde la dejó el scroll, no a
     donde la dejó el sábado. */
  let ultimoP = 0;

  /* ---- construcción de la malla -------------------------------- */
  function malla() {
    const pos = new Float32Array((COLS + 1) * (FILAS + 1) * 3);
    const uv  = new Float32Array((COLS + 1) * (FILAS + 1) * 2);
    let p = 0, q = 0;
    for (let j = 0; j <= FILAS; j++) {
      for (let i = 0; i <= COLS; i++) {
        // s,t recorren [-MARGEN, 1+MARGEN]: el plano se pasa de tamaño
        const s = -MARGEN + (i / COLS) * (1 + 2 * MARGEN);
        const t = -MARGEN + (j / FILAS) * (1 + 2 * MARGEN);
        pos[p++] = (s - 0.5) * ASPECTO;
        pos[p++] = (0.5 - t);
        pos[p++] = zEn(s, t);
        uv[q++] = s;
        uv[q++] = t;
      }
    }
    const idx = new Uint16Array(COLS * FILAS * 6);
    let k = 0;
    for (let j = 0; j < FILAS; j++) {
      for (let i = 0; i < COLS; i++) {
        const a = j * (COLS + 1) + i, b = a + 1, c = a + COLS + 1, d = c + 1;
        idx[k++] = a; idx[k++] = c; idx[k++] = b;
        idx[k++] = b; idx[k++] = c; idx[k++] = d;
      }
    }
    nIndices = idx.length;
    return { pos, uv, idx };
  }

  /* Z en unas uv cualesquiera, con interpolación bilineal. La usan la
     malla y también los puntos interactivos, para que un punto se
     hunda exactamente lo mismo que el píxel sobre el que está. */
  function zEn(s, t) {
    if (!relieve) return 0;
    const x = Math.min(Math.max(s, 0), 1) * (relieveCols - 1);
    const y = Math.min(Math.max(t, 0), 1) * (relieveFilas - 1);
    const x0 = Math.floor(x), y0 = Math.floor(y);
    const x1 = Math.min(x0 + 1, relieveCols - 1), y1 = Math.min(y0 + 1, relieveFilas - 1);
    const fx = x - x0, fy = y - y0;
    const a = relieve[y0 * relieveCols + x0], b = relieve[y0 * relieveCols + x1];
    const c = relieve[y1 * relieveCols + x0], d = relieve[y1 * relieveCols + x1];
    const cerca = (a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy;
    // 0.58 es el plano de la fachada: es el que se queda quieto
    return (cerca - 0.58) * RELIEVE;
  }

  /* ---- tamaño --------------------------------------------------- */
  let ancho = 0, alto = 0, dpr = 1;
  function medir() {
    const r = figura.getBoundingClientRect();
    /* La densidad se topa por debajo de la del dispositivo. Desde que
       la casa se mezcla con alfa y ocupa todo el ancho, el relleno es
       lo que cuesta: a dpr 2 el lienzo pasa de 4 millones de píxeles y
       aparecían frames largos. A 1.75 son un 23 % menos y no se nota,
       porque esto es una pintura y no tiene detalle fino. En móvil el
       lienzo es pequeño y ahí sí se puede pagar la densidad entera. */
    dpr = Math.min(devicePixelRatio || 1, movil ? 2 : 1.75);
    ancho = Math.round(r.width); alto = Math.round(r.height);
    if (!ancho || !alto) return false;
    const w = Math.round(ancho * dpr), h = Math.round(alto * dpr);
    if (lienzo.width !== w || lienzo.height !== h) {
      lienzo.width = w; lienzo.height = h;
      gl.viewport(0, 0, w, h);
    }
    return true;
  }

  /* Distancia a la que el plano cubre exactamente el encuadre. Se
     calcula por alto y por ancho y gana la mayor, para que nunca se
     vea el borde del cuadro. */
  const FOV = 36 * Math.PI / 180;
  function distanciaBase() {
    const a = ancho / alto;
    const t = Math.tan(FOV / 2);
    return Math.max(0.5 / t, (ASPECTO / 2) / (t * a));
  }

  /* ---- proyección de un punto a píxeles de pantalla -------------
     Los puntos interactivos son botones del DOM, no geometría: así
     siguen siendo enfocables con el teclado y los lee un lector de
     pantalla. Sólo se les recalcula la posición cada frame. */
  function proyectar(mvp, u, v) {
    const x = (u - 0.5) * ASPECTO, y = 0.5 - v, z = zEn(u, v);
    const cx = mvp[0] * x + mvp[4] * y + mvp[8] * z + mvp[12];
    const cy = mvp[1] * x + mvp[5] * y + mvp[9] * z + mvp[13];
    const cw = mvp[3] * x + mvp[7] * y + mvp[11] * z + mvp[15];
    if (cw <= 0) return null;
    return { x: (cx / cw * 0.5 + 0.5) * ancho, y: (0.5 - cy / cw * 0.5) * alto };
  }

  /* ---- bucle ---------------------------------------------------- */
  const uFondo = [0x14 / 255, 0x13 / 255, 0x0F / 255];  // el negro de la banda
  let locMvp, locNiebla, locFondo, locCalidez, locVista;
  /* El color al que se retira lo lejano. No es negro puro: es el de la
     banda, para que el aire de la pintura y el de la página sean el
     mismo aire. */

  function dibujar(ahora) {
    pedido = 0;
    if (!vivo || !medir()) return;

    const dt = Math.min((ahora - t0) / 1000, 0.05); t0 = ahora;
    const k = 1 - Math.pow(0.001, dt);   // seguimiento suave, estable a cualquier fps

    // respiración: la casa no se queda del todo quieta
    const resp = Math.sin(ahora / 4200) * 0.006;
    const deriva = Math.sin(ahora / 6800) * 0.010;

    cam.acerca += (cam.acercaObj - cam.acerca) * k;
    cam.u      += (cam.uObj - cam.u) * k;
    cam.v      += (cam.vObj - cam.v) * k;
    cam.giroX  += (cam.giroXObj - cam.giroX) * k;
    cam.giroY  += (cam.giroYObj - cam.giroY) * k;
    cam.calidez += (cam.calidezObj - cam.calidez) * k;

    const dist = distanciaBase() * (cam.acerca + resp);

    /* Tope del paneo. Cuanto más se acerca la cámara, menos pintura
       cabe en el encuadre y más se puede pasear sin salirse de ella.
       Sin este tope, las capas —que sí entran a fondo— sacaban el ojo
       fuera del cuadro y se veía el margen estirado de la malla. */
    const tg = Math.tan(FOV / 2);
    const medioAlto = dist * tg;
    const medioAncho = medioAlto * (ancho / alto);
    const holguraGiro = Math.abs(cam.giroY + deriva) * dist;
    const topeX = Math.max(0, ASPECTO / 2 - medioAncho - holguraGiro);
    const topeY = Math.max(0, 0.5 - medioAlto);
    const tope = (v, t) => Math.min(Math.max(v, -t), t);

    const px = tope((cam.u - 0.5) * ASPECTO * 0.85, topeX);
    const py = tope((0.5 - cam.v) * 0.85, topeY);

    const proj = perspectiva(FOV, ancho / alto, 0.05, 12);
    const v = vista(-px, -py, -dist, cam.giroY + deriva, cam.giroX);
    const mvp = multiplicar(proj, v);

    gl.useProgram(prog);
    gl.uniformMatrix4fv(locMvp, false, new Float32Array(mvp));
    gl.uniform1f(locNiebla, 0.10);
    gl.uniform1f(locCalidez, cam.calidez);
    gl.uniform2f(locVista, lienzo.width, lienzo.height);
    gl.uniform3fv(locFondo, uFondo);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, nIndices, gl.UNSIGNED_SHORT, 0);

    /* En 3D los puntos nacen invisibles (lo pone el CSS) y sólo
       aparecen cuando ya tienen una posición proyectada: si no, el
       primer frame los pinta amontonados en la esquina. */
    for (const p of puntos) {
      const s = proyectar(mvp, p.u, p.v);
      if (!s) { p.el.style.opacity = '0'; continue; }
      p.el.style.transform = `translate(${s.x}px, ${s.y}px) translate(-50%, -50%)`;
      p.el.style.opacity = '1';
    }

    pedido = requestAnimationFrame(dibujar);
  }

  function pintar() {
    if (!pedido && vivo) pedido = requestAnimationFrame(dibujar);
  }

  /* La postura de reposo, la que dicta el scroll. */
  function neutral() {
    /* Menos recorrido que antes. Con la casa recortada, acercarse un
       18 % se comía el desvanecido lateral y el muro terminaba en un
       canto vertical. */
    cam.acercaObj = 1.00 - 0.09 * ultimoP;
    cam.uObj = 0.5;
    cam.vObj = 0.5 + (ultimoP - 0.5) * 0.10;
    cam.giroXObj = (ultimoP - 0.5) * 0.05;
    cam.giroYObj = 0;
  }

  /* ---- api ------------------------------------------------------ */
  const api = {
    /* El scroll manda mientras no se esté en sábado. La cámara sólo se
       acerca: no pasea de lado. Antes se inclinaba hacia una de tres
       capas, pero esas capas ya no existen en la interfaz y dejaban la
       casa descentrada sin motivo. */
    progreso(p) {
      ultimoP = Math.min(1, Math.max(0, p));
      if (capaFijada >= 0) return;
      neutral();
      pintar();
    },
    /* El encuadre que pide cada bloque del relato. La casa no cambia
       de bloque en bloque: cambia el punto desde el que se la mira,
       que es lo que la mantiene siendo la misma casa durante todo el
       segmento. Si hay una capa fijada a mano —el sábado—, manda esa. */
    encuadre({ acerca, u, v }) {
      if (capaFijada >= 0) return;
      if (acerca != null) cam.acercaObj = acerca;
      if (u != null) cam.uObj = u;
      if (v != null) cam.vObj = v;
      cam.giroYObj = 0;
      pintar();
    },
    /* El puntero da un vistazo alrededor; en táctil no existe. */
    mirar(nx, ny) {
      if (movil || capaFijada >= 0) return;
      cam.giroYObj = nx * 0.055;
      cam.giroXObj = -ny * 0.035;
      pintar();
    },
    /* Ir a una capa: la cámara entra hacia ella y se queda. */
    irACapa(i) {
      const c = CAPAS[i]; if (!c) return;
      capaFijada = i;
      cam.acercaObj = c.acerca;
      cam.uObj = c.u; cam.vObj = c.v;
      cam.giroYObj = (c.u - 0.5) * 0.10;
      cam.giroXObj = 0;
      pintar();
    },
    soltar() { capaFijada = -1; },
    /* El sábado: la cámara se va al portón —que en la pintura ya está
       abierto al patio— y la luz se entibia. Es lo único que se toca;
       la pintura no cambia de hora. */
    sabado(si) {
      cam.calidezObj = si ? 1 : 0;
      if (si) { api.irACapa(2); }
      else { capaFijada = -1; neutral(); }   // vuelve a donde la dejó el scroll
      pintar();
    },
    get fijada() { return capaFijada; },
    /* Se apaga al salir del viewport: un rAF que nadie ve es
       batería tirada. */
    despertar() { if (!vivo) { vivo = true; t0 = performance.now(); pintar(); } },
    dormir() { vivo = false; if (pedido) cancelAnimationFrame(pedido); pedido = 0; },
    redimensionar() { pintar(); },
    destruir() {
      api.dormir();
      [bufPos, bufUv, bufIdx].forEach(b => b && gl.deleteBuffer(b));
      [textura, mascara].forEach(t => t && gl.deleteTexture(t));
      prog && gl.deleteProgram(prog);
    }
  };

  /* ---- arranque -------------------------------------------------- */
  const listo = Promise.all([cargarImagen(PINTURA), cargarImagen(RELIEVE_MAPA), cargarImagen(MASCARA)])
    .then(([pintura, mapa, mate]) => {
      relieveCols = mapa.naturalWidth; relieveFilas = mapa.naturalHeight;
      relieve = leerRelieve(mapa, relieveCols, relieveFilas);

      const vs = compilar(gl, gl.VERTEX_SHADER, VERT);
      const fs = compilar(gl, gl.FRAGMENT_SHADER, FRAG);
      if (!vs || !fs) throw new Error('shaders');
      prog = gl.createProgram();
      gl.attachShader(prog, vs); gl.attachShader(prog, fs);
      gl.bindAttribLocation(prog, 0, 'aPos');
      gl.bindAttribLocation(prog, 1, 'aUv');
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link');

      const { pos, uv, idx } = malla();
      bufPos = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, bufPos);
      gl.bufferData(gl.ARRAY_BUFFER, pos, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0);

      bufUv = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, bufUv);
      gl.bufferData(gl.ARRAY_BUFFER, uv, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(1);
      gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 0, 0);

      bufIdx = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufIdx);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, idx, gl.STATIC_DRAW);

      textura = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, textura);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, pintura);
      /* La pintura mide 1600×1067, que no es potencia de dos. En WebGL 1
         eso obliga a CLAMP_TO_EDGE y prohíbe los mipmaps: pedir
         LINEAR_MIPMAP_LINEAR deja la textura incompleta y se muestrea
         en negro. Se queda en LINEAR. No se pierde gran cosa: es una
         pintura, no tiene detalle de alta frecuencia que aliasee, y de
         paso el margen de la malla necesita CLAMP_TO_EDGE igualmente. */
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      mascara = gl.createTexture();
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, mascara);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, gl.LUMINANCE, gl.UNSIGNED_BYTE, mate);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.activeTexture(gl.TEXTURE0);

      locMvp = gl.getUniformLocation(prog, 'uMvp');
      locNiebla = gl.getUniformLocation(prog, 'uNiebla');
      locCalidez = gl.getUniformLocation(prog, 'uCalidez');
      locVista = gl.getUniformLocation(prog, 'uVista');
      locFondo = gl.getUniformLocation(prog, 'uFondo');
      gl.useProgram(prog);
      gl.uniform1i(gl.getUniformLocation(prog, 'uPintura'), 0);
      gl.uniform1i(gl.getUniformLocation(prog, 'uMascara'), 1);

      /* Se limpia a transparente y se mezcla con lo que haya detrás.
         Sin profundidad: es una sola superficie que no se cruza
         consigo misma, y el test estorbaría al alfa. */
      gl.clearColor(0, 0, 0, 0);
      gl.disable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,
                           gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      figura.classList.add('is-3d');
      api.despertar();
      return api;
    })
    .catch((e) => { console.warn('casa3d: se queda la pintura plana —', e.message); return null; });

  api.listo = listo;
  return api;
}
