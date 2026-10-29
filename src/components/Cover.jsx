import React from 'react';

export default function Cover() {
  return (
    <section className="cover tiene-umbral" id="top">
      {/* El umbral. Aquí ya no hay red: la portada la manda el pincel, y
           dos sistemas peleándose por el mismo espacio se restaban. Queda
           sólo el cambio de suelo —oscuro arriba, papel abajo—, que es lo
           que hace el contraste. data-oscuro invierte la barra encima. */}
      <div className="umbral" id="raices" data-oscuro aria-hidden="true"></div>

      <div className="preguntas" id="preguntas" aria-hidden="true"></div>

      {/* Esta fila no se puede quitar: medirUmbral() la usa para saber
           dónde termina la franja oscura de arriba. */}
      <div className="cover__meta">
        <span className="meta">Casa Ágora</span>
        <span className="meta">Conectar · Fortalecer · Impulsar</span>
      </div>

      <div className="portada" id="portada">
        <figure className="portada__video" data-parallax="0.10">
          <video
            src="/assets/video/v01.mp4"
            poster="/assets/img/p01.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Multitud costarricense con banderas en la calle"
          ></video>
          <span className="portada__vel" aria-hidden="true"></span>
        </figure>

        <h1 className="portada__marca">
          {/* «Casa» lleva el mismo tratamiento que ÁGORA: las dos palabras
               son el nombre, así que las dos se imprimen en cuatro capas. */}
          <span className="portada__linea portada__casa">
            <span className="ag ag--4" aria-hidden="true">Casa</span>
            <span className="ag ag--3" aria-hidden="true">Casa</span>
            <span className="ag ag--2" aria-hidden="true">Casa</span>
            <span className="ag ag--1">Casa</span>
          </span>
          <span className="portada__linea portada__agora">
            <span className="ag ag--4" aria-hidden="true">Ágora</span>
            <span className="ag ag--3" aria-hidden="true">Ágora</span>
            <span className="ag ag--2" aria-hidden="true">Ágora</span>
            <span className="ag ag--1">Ágora</span>
          </span>
        </h1>

        <p className="portada__frase">
          <span className="fr fr--3" aria-hidden="true">nadie avanza solo<i>.</i></span>
          <span className="fr fr--2" aria-hidden="true">nadie avanza solo<i>.</i></span>
          <span className="fr fr--1">nadie avanza solo<i className="cover__dot">.</i></span>
        </p>
      </div>

      <div className="cover__foot">
        <p className="cover__def">Casa Ágora <b>conecta</b> personas, comunidades e iniciativas para que se organicen y actúen juntas, con asesoría técnica y proyectos propios en democracia y derechos humanos.</p>
        <div className="cover__ctas">
          <a className="btn btn--solid" href="#sumate-org">Tengo una iniciativa <span className="arw" aria-hidden="true">→</span></a>
          <a className="tlink" href="#sumate-persona">Quiero sumarme <span className="arw" aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
