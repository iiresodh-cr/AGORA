import React from 'react';

export default function Circulo() {
  return (
    <section className="band band--dark circulo" id="circulo">
      <div className="impulsamos__red circulo__red" data-red aria-hidden="true"><canvas></canvas></div>
      <div className="circulo__fondo" aria-hidden="true">
        <video
          className="circulo__bg"
          src="/assets/video/v09.mp4"
          poster="/assets/img/p11.jpg"
          muted
          loop
          playsInline
          preload="none"
          data-lazyvid
          tabIndex="-1"
        ></video>
      </div>
      <span className="sumate__scrim circulo__scrim" aria-hidden="true"></span>
      <div className="humo" aria-hidden="true"><canvas></canvas></div>
      <div className="band__inner">
        <div className="sec-head">
          <h2 className="sec-head__h display" data-reveal>Así conectamos: <em>un círculo que no se detiene</em>.</h2>
          <p className="lede" data-reveal style={{ '--reveal-delay': '80ms' }}>
            Conectamos, aprendemos y actuamos, y volvemos a conectar. No es una vez: cada conexión
            abre la siguiente.
          </p>
        </div>
      </div>

      {/* Scroll-scrubbed cycle: la rueda se arma y los pasos avanzan juntos. */}
      <div className="cycle" id="cycle">
        <div className="cycle__sticky">
          <div className="cycle__ring" id="cycleRueda" aria-hidden="true"></div>
          <ol className="cycle__steps" id="cycleSteps"></ol>
        </div>
        <div className="cycle__rail" id="cycleRail" aria-hidden="true"></div>
      </div>
    </section>
  );
}
