import React from 'react';

export default function MobileMenu() {
  return (
    <div className="menu" id="menu" hidden>
      <nav className="menu__list" aria-label="Menú">
        <a href="#existimos"><span className="menu__n">01</span> Quiénes somos</a>
        <a href="#hacemos"><span className="menu__n">02</span> Qué hacemos</a>
        <a href="#causas"><span className="menu__n">03</span> Lo que impulsamos</a>
        <a href="#casa"><span className="menu__n">04</span> La casa</a>
        <a href="#circulo"><span className="menu__n">05</span> Cómo conectamos</a>
        <a href="#agenda"><span className="menu__n">06</span> Agenda</a>
        <a href="#paquete"><span className="menu__n">07</span> Paquete Ágora</a>
        <a href="#sumate"><span className="menu__n">08</span> Sumate</a>
      </nav>
      <p className="menu__foot meta">Casa Ágora · Nadie avanza solo</p>
    </div>
  );
}
