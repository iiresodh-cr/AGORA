import React from 'react';

export default function Agenda() {
  return (
    <section className="band agenda agenda--papel" id="agenda">
      <div className="agenda__red" data-red="0.9" aria-hidden="true"><canvas></canvas></div>
      <div className="agenda__cielo" aria-hidden="true"></div>

      <div className="band__inner" id="rev-agenda">
        <div className="agenda__cabeza">
          <h2 className="agenda__t display" data-reveal>
            <span className="rev__l rev__l--4" aria-hidden="true">Agenda abierta</span>
            <span className="rev__l rev__l--3" aria-hidden="true">Agenda abierta</span>
            <span className="rev__l rev__l--2" aria-hidden="true">Agenda abierta</span>
            <span className="rev__l rev__l--1">Agenda abierta</span>
          </h2>
          <p className="agenda__t2 display" data-reveal style={{ '--reveal-delay': '90ms' }}>
            Conversar, aprender, crear, encontrarnos.
          </p>
          <p className="agenda__pie meta" data-reveal style={{ '--reveal-delay': '170ms' }}>
            Esto es lo que queremos que pase en Casa Ágora. Cuando haya fecha, la publicamos acá.
          </p>
        </div>
        <ol className="agenda__lista" id="agendaList"></ol>

        <div className="agenda__propone" data-reveal>
          <p className="agenda__propone-t display">¿Querés dar un taller o proponer una actividad?</p>
          <p className="agenda__propone-x">
            La agenda también la armamos con quienes se acercan. Si tenés algo para compartir, conversemos.
          </p>
          <a className="tlink" href="#sumate-org">Escribinos <span className="arw" aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
