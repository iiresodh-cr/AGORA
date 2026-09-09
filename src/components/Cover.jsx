import React from 'react';

export default function Cover() {
  return (
    <section className="cover tiene-umbral" id="top">
      <div className="umbral" id="raices" data-oscuro aria-hidden="true"></div>

      <div className="preguntas" id="preguntas" aria-hidden="true"></div>

      <div className="cover__meta">
        <span className="meta">Centro Ágora Costa Rica</span>
        <span className="meta">San José, CR · <span data-clock>—</span></span>
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
          <span className="portada__linea portada__centro">Centro</span>
          <span className="portada__linea portada__agora">
            <span className="ag ag--4" aria-hidden="true">Ágora</span>
            <span className="ag ag--3" aria-hidden="true">Ágora</span>
            <span className="ag ag--2" aria-hidden="true">Ágora</span>
            <span className="ag ag--1">Ágora</span>
            <span className="pais" aria-hidden="true">
              <span className="pais__eco">Costa Rica</span>
              <span className="pais__t">Costa Rica</span>
            </span>
          </span>
          <span className="visualmente-oculto">Costa Rica</span>
        </h1>

        <p className="portada__frase">
          <span className="fr fr--3" aria-hidden="true">nadie avanza solo<i>.</i></span>
          <span className="fr fr--2" aria-hidden="true">nadie avanza solo<i>.</i></span>
          <span className="fr fr--1">nadie avanza solo<i className="cover__dot">.</i></span>
        </p>
      </div>

      <div className="cover__foot">
        <div className="cover__ctas">
          <a className="btn btn--solid" href="#causas">
            Encontrá tu causa <span className="arw" aria-hidden="true">→</span>
          </a>
          <a className="tlink" href="#existimos">
            Por qué existimos <span className="arw" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
