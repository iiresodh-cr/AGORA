import React from 'react';

export default function CasaAgora() {
  return (
    <section className="band casa" id="casa">
      <div className="casa__escenario" id="casaEscena" aria-hidden="true">
        <div className="casa__plano">
          <div className="casa__red" data-red="0.9" aria-hidden="true"><canvas></canvas></div>
          <div className="casa__cielo" aria-hidden="true"></div>
          <div className="casa__bruma" aria-hidden="true"></div>

          <figure className="casa__lamina" id="casaLamina">
            <canvas className="casa__lienzo" id="casaLienzo" aria-hidden="true"></canvas>
            <img
              src="/assets/img/casa-agora.jpg"
              width="1600"
              height="1067"
              alt="Casa Ágora: una casa de zócalo azul y cal, con la puerta abierta a un zaguán iluminado"
              loading="lazy"
              decoding="async"
            />
            <span className="casa__suelo" aria-hidden="true"></span>
          </figure>

          <div className="casa__velo"></div>
        </div>
      </div>

      <div className="casa__relato">
        <div className="band__inner casa__rotulo" data-escena="fachada">
          <div className="sec-head casa__head">
            <p className="casa__num" data-reveal><span className="casa__num-t">La casa</span></p>
            <h2 className="sec-head__h display" data-reveal style={{ '--reveal-delay': '60ms' }}>
              Casa Ágora,<br />el lugar que <em>te hacía falta</em>.
            </h2>
          </div>

          <p className="prose" data-reveal style={{ '--reveal-delay': '120ms' }}>
            Estamos construyendo una casa para que las conexiones ocurran cara a cara: un lugar seguro y
            abierto donde organizaciones, colectivos y personas puedan reunirse, trabajar y crear juntas.
          </p>
          <p data-reveal style={{ '--reveal-delay': '160ms' }}><span className="estado">Próximamente</span></p>
        </div>

        <div className="band__inner casa__inner" data-escena="cierre">
          <div className="casa__texto">
            <p className="casa__golpe" data-reveal>Esta casa existe para que haya dónde encontrarse.</p>
            <p className="prose" data-reveal style={{ '--reveal-delay': '60ms' }}>
              Un espacio abierto a quienes se sumen: para trabajar, para reunirse o simplemente para
              compartir con otra gente que tiene intereses parecidos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
