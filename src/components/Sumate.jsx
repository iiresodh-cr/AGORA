import React from 'react';

export default function Sumate() {
  return (
    <section className="band band--dark sumate" id="sumate">
      <div className="sumate__red" data-red aria-hidden="true"><canvas></canvas></div>
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
          Del «¿qué van a hacer por mí?» al «¿qué vamos a hacer juntos?». El cambio no se compra, se
          construye con compromiso, y cuando le dedicás tiempo a otras personas algo en tu forma de
          ver el mundo cambia.
        </p>

        <div className="paths" id="paths"></div>

        <form className="signup" id="signup" noValidate>
          <label htmlFor="email">
            Dejanos tu correo y te contactamos, o escribinos directamente a{' '}
            <a className="signup__mail" href="mailto:agora@iiresodh.org">agora@iiresodh.org</a>.
          </label>
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
