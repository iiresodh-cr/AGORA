import React from 'react';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="band__inner foot__inner">
        <p className="foot__mark display">ágora<span>.</span></p>
        <div className="foot__meta">
          <p className="meta">Casa Ágora</p>
          <p className="meta"><a href="mailto:agora@iiresodh.org">agora@iiresodh.org</a></p>
          <p className="meta">Nadie avanza solo · © 2026</p>
        </div>
        <nav className="foot__nav" aria-label="Pie">
          <a href="#existimos">Quiénes somos</a>
          <a href="#hacemos">Qué hacemos</a>
          <a href="#causas">Lo que impulsamos</a>
          <a href="#agenda">Agenda</a>
          <a href="#paquete">Paquete Ágora</a>
          <a href="#sumate">Sumate</a>
        </nav>
      </div>
    </footer>
  );
}
