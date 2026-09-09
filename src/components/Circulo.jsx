import React from 'react';

export default function Circulo() {
  return (
    <section className="band band--space circulo" id="circulo">
      <div className="humo" aria-hidden="true">
        <canvas></canvas>
      </div>
      <div className="band__inner">
        <div className="sec-head">
          <h2 className="sec-head__h display" data-reveal>
            El círculo <em>que no se detiene</em>.
          </h2>
          <p className="lede" data-reveal style={{ '--reveal-delay': '80ms' }}>
            Acá conectamos, aprendemos y actuamos, y volvemos a conectar. No es una vez: es un
            círculo que no se detiene.
          </p>
        </div>
      </div>

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
