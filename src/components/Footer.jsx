import React from 'react';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="band__inner foot__inner">
        <p className="foot__mark display">
          ágora<span>.</span>
        </p>
        <div className="foot__meta">
          <p className="meta">Centro Ágora Costa Rica</p>
          <p className="meta">San José, Costa Rica · <span data-clock>—</span></p>
          <p className="meta">Nadie avanza solo · © 2026</p>
        </div>
        <nav className="foot__nav" aria-label="Pie">
          <a href="#existimos">Por qué existimos</a>
          <a href="#casa">Casa Ágora</a>
          <a href="#circulo">El círculo</a>
          <a href="#movimiento">Salir del edificio gris</a>
          <a href="#agenda">Agenda</a>
          <a href="#sumate">Sumate</a>
        </nav>
      </div>
    </footer>
  );
}
