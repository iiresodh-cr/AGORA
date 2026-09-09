import React from 'react';

export default function Sumate() {
  return (
    <section className="band band--dark sumate" id="sumate">
      <div className="sumate__red" data-red aria-hidden="true">
        <canvas></canvas>
      </div>
      <video
        className="sumate__bg"
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
      <span className="sumate__scrim" aria-hidden="true"></span>

      <div className="band__inner sumate__inner">
        <p className="meta" data-reveal>Sumate</p>
        <h2 className="sumate__h display" data-reveal style={{ '--reveal-delay': '60ms' }}>
          Queremos tu tiempo,<br />tu aliento, tus ganas,<br /><em>tu convicción.</em>
        </h2>
        <p className="lede" data-reveal style={{ '--reveal-delay': '140ms' }}>
          En un mundo que le pone precio a todo, nuestra propuesta es radical. El cambio no se compra,
          se construye con compromiso. Cuando le dedicás tiempo a otras personas, algo en tu forma de
          ver el mundo cambia. Ahí empieza todo.
        </p>

        <div className="paths" id="paths"></div>

        <div className="sumate__aliados">
          <p className="meta" data-reveal>No lo haremos solos</p>
          <h3 className="dual__h display" data-reveal style={{ '--reveal-delay': '60ms' }}>
            Con quién<br />queremos construir
          </h3>
          <p className="prose" data-reveal style={{ '--reveal-delay': '140ms' }}>
            Ágora nace abierta. Buscamos manos de todos lados para sostener un proyecto que no le pertenece a nadie en particular, sino a todas las personas.
          </p>
          <ul className="allies" id="allies"></ul>
          <p data-reveal>
            <a className="tlink" href="#email">
              ¿Tu organización quiere sumar? Hablemos <span className="arw" aria-hidden="true">→</span>
            </a>
          </p>
        </div>

        <form className="signup" id="signup" noValidate>
          <label htmlFor="email">Dejanos tu correo y te avisamos del siguiente encuentro. Sin spam.</label>
          <div className="signup__row">
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              required
            />
            <button className="btn btn--solid" type="submit">Avisame</button>
          </div>
          <p className="signup__msg" id="signupMsg" role="status"></p>
        </form>
      </div>
    </section>
  );
}
