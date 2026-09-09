import React from 'react';

export default function Nav() {
  return (
    <header className="nav" id="nav">
      <div className="nav__start">
        <a className="nav__brand" href="#top" data-nav-home>
          ágora<span>.</span>
        </a>

        <button className="sonido" id="sonido" type="button" aria-pressed="false" hidden>
          <span className="sonido__rule" aria-hidden="true"></span>
          <span className="sonido__t">Sonido</span>
          <span className="sonido__s" data-sonido-estado>OFF</span>
        </button>
      </div>

      <nav className="nav__links" aria-label="Principal">
        <a href="#existimos">Por qué existimos</a>
        <a href="#casa">Casa Ágora</a>
        <a href="#agenda">Agenda</a>
      </nav>

      <div className="nav__end">
        <a className="btn btn--solid nav__cta" href="#sumate">Súmate</a>
        <button className="nav__burger" id="burger" aria-expanded="false" aria-controls="menu">
          <span className="vh">Abrir menú</span>
          <span className="nav__burger-b" aria-hidden="true"></span>
          <span className="nav__burger-b" aria-hidden="true"></span>
        </button>
      </div>
    </header>
  );
}
