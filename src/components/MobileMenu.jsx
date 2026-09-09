import React from 'react';

export default function MobileMenu() {
  return (
    <div className="menu" id="menu" hidden>
      <nav className="menu__list" aria-label="Menú">
        <a href="#existimos"><span className="menu__n">01</span> La mentira que mejor nos gobierna</a>
        <a href="#casa"><span className="menu__n">02</span> Casa Ágora</a>
        <a href="#circulo"><span className="menu__n">03</span> El círculo que no se detiene</a>
        <a href="#movimiento"><span className="menu__n">04</span> Salir del edificio gris</a>
        <a href="#agenda"><span className="menu__n">05</span> Agenda</a>
        <a href="#sumate"><span className="menu__n">06</span> Súmate</a>
      </nav>
      <p className="menu__foot meta">San José · Costa Rica · <span data-clock>—</span></p>
    </div>
  );
}
