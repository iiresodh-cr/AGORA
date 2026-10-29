import React from 'react';

export default function Impulsamos() {
  return (
    <section className="band band--dark impulsamos" id="causas">
      <div className="impulsamos__red" data-red aria-hidden="true"><canvas></canvas></div>
      <video
        className="impulsamos__bg"
        src="/assets/video/v09.mp4"
        poster="/assets/img/p11.jpg"
        muted
        loop
        playsInline
        preload="none"
        data-lazyvid
        aria-hidden="true"
        tabIndex="-1"
      ></video>
      <span className="impulsamos__scrim" aria-hidden="true"></span>

      <div className="band__inner">
        <div className="sec-head sec-head--split">
          <div>
            <p className="meta" data-reveal>Lo que impulsamos</p>
            <h2 className="sec-head__h display" data-reveal style={{ '--reveal-delay': '60ms' }}>
              Las causas que <em>nos convocan</em>
            </h2>
          </div>
          <p className="lede" data-reveal style={{ '--reveal-delay': '140ms' }}>
            Tenemos proyectos propios, pero ningún tema es nuestro. Cada uno nace abierto a las
            comunidades y a quienes ya trabajan en esto. Todavía los estamos construyendo.
          </p>
        </div>
        <div className="index" id="causeIndex"></div>
      </div>
    </section>
  );
}

