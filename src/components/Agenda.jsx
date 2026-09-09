import React from 'react';

export default function Agenda() {
  return (
    <section className="band band--dark agenda" id="agenda">
      <div className="agenda__red" data-red aria-hidden="true">
        <canvas></canvas>
      </div>

      <div className="band__inner" id="rev-agenda">
        <div className="agenda__cabeza">
          <h2 className="agenda__t display" data-reveal>
            <span className="rev__l rev__l--4" aria-hidden="true">Agenda cultural</span>
            <span className="rev__l rev__l--3" aria-hidden="true">Agenda cultural</span>
            <span className="rev__l rev__l--2" aria-hidden="true">Agenda cultural</span>
            <span className="rev__l rev__l--1">Agenda cultural</span>
          </h2>
          <p className="agenda__t2 display" data-reveal style={{ '--reveal-delay': '90ms' }}>
            Del método al movimiento.
          </p>
          <p className="agenda__t3 display" data-reveal style={{ '--reveal-delay': '170ms' }}>
            Estas son las primeras olas.
          </p>
          <p className="agenda__pie meta" data-reveal style={{ '--reveal-delay': '250ms' }}>
            Fecha tentativa, lugares y horas quedan por confirmar.
          </p>
        </div>
        <ol className="agenda__lista" id="agendaList"></ol>
      </div>
    </section>
  );
}
