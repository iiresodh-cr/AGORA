import React from 'react';

export default function CasaAgora() {
  return (
    <section className="band casa" id="casa">
      <div className="casa__escenario" id="casaEscena" aria-hidden="true">
        <div className="casa__plano">
          <div className="casa__red" data-red="0.9" aria-hidden="true">
            <canvas></canvas>
          </div>
          <div className="casa__cielo" aria-hidden="true"></div>
          <div className="casa__bruma" aria-hidden="true"></div>

          <figure className="casa__lamina" id="casaLamina">
            <canvas className="casa__lienzo" id="casaLienzo" aria-hidden="true"></canvas>
            <img
              src="/assets/img/casa-fachada.jpg"
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
            <p className="casa__num" data-reveal>
              <span className="casa__num-t">Casa Ágora · Escazú, Costa Rica</span>
            </p>
            <h2 className="sec-head__h display" data-reveal style={{ '--reveal-delay': '60ms' }}>
              Casa Ágora,<br />el lugar que <em>te hacía falta</em>.
            </h2>
          </div>

          <p className="prose" data-reveal style={{ '--reveal-delay': '120ms' }}>
            Con la comunidad ya construida, el segundo paso es consolidar Casa Ágora como la
            infraestructura física del proyecto: los Paquetes Ágora, talleres, la cafetería, el bazar,
            el mercado de los sábados, economía circular, encuentros, formación y el acceso a la
            justicia con el IIRESODH. Es el lugar donde conectamos, aprendemos y actuamos, y también
            parte de cómo Ágora se sostiene.
          </p>

          <div className="casa__semana" id="casaSemana" data-reveal>
            <div className="casa__dias" role="tablist" aria-label="La semana de Casa Ágora">
              <button className="casa__dia is-en" type="button" role="tab" aria-selected="true" data-dia="0">
                Entre semana
              </button>
              <button className="casa__dia" type="button" role="tab" aria-selected="false" data-dia="1">
                Los sábados
              </button>
            </div>
            <div className="casa__estados">
              <p className="casa__estado is-en" data-dia="0">
                La puerta siempre está abierta. Tomate un café, explorá nuestros recursos, participá en un taller,
                hacé una consulta jurídica, encontrá un espacio. Conversá, aprendé, compartí y construí comunidad.
                Porque casi todo lo que pasa acá empieza así: una conversación, un taller, una nueva conciencia,
                una idea que se convierte en acción para fortalecer las comunidades que más lo necesitan. Y, sobre todo,
                gente que vuelve.
              </p>
              <p className="casa__estado" data-dia="1">
                El portón se abre y el patio se llena. Pequeños emprendimientos traen lo que hacen, y la casa se convierte
                en un mercado que conecta y promueve la responsabilidad social y la economía circular. Es la misma idea que
                sostiene una de nuestras causas: relaciones directas entre quien produce y quien consume, puesta a funcionar
                en nuestro patio.
              </p>
            </div>
          </div>
        </div>

        <div className="band__inner casa__causas-b" id="causas" data-escena="cerca">
          <div className="sec-head">
            <p className="meta" data-reveal>Tres causas para construir país</p>
            <h3 className="casa__h display" data-reveal style={{ '--reveal-delay': '60ms' }}>
              Nuestras <em>causas</em>
            </h3>
          </div>
          <div className="index" id="causeIndex"></div>
        </div>

        <div className="band__inner casa__paquetes-b" id="paquetes" data-escena="cerca">
          <div className="sec-head sec-head--split">
            <div>
              <p className="meta" data-reveal>Cuatro maneras de involucrarse</p>
              <h3 className="casa__h display" data-reveal style={{ '--reveal-delay': '60ms' }}>
                Los Paquetes <em>Ágora</em>
              </h3>
            </div>
            <p className="lede" data-reveal style={{ '--reveal-delay': '140ms' }}>
              Cada Paquete Ágora ayuda a financiar una causa. El paquete es lo que Ágora le ofrece a la
              sociedad; la causa es lo que esos recursos ayudan a hacer posible.
            </p>
          </div>
          <ol className="casa__paquetes" id="casaPaquetes"></ol>
        </div>

        <aside className="casa__cartela" id="casaCartela" aria-live="polite" hidden>
          <button className="casa__cerrar" id="casaCerrar" type="button" aria-label="Cerrar">×</button>
          <p className="meta" id="casaCartelaTag"></p>
          <h3 className="casa__cartela-h display" id="casaCartelaH"></h3>
          <p className="casa__cartela-q" id="casaCartelaQ"></p>
          <p className="prose" id="casaCartelaT"></p>
        </aside>

        <div className="band__inner casa__inner" data-escena="cierre">
          <div className="casa__texto">
            <p className="casa__golpe" data-reveal>Una casa que puede abrir otras casas.</p>
            <p className="prose" data-reveal style={{ '--reveal-delay': '60ms' }}>
              Lo que se aprende acá no se queda acá. Cada comunidad que se organiza puede abrir su
              propia Casa Ágora: un salón comunal, una biblioteca, un espacio que la comunidad cede.
            </p>
            <p className="casa__golpe" data-reveal style={{ '--reveal-delay': '100ms' }}>
              Esta casa existe para que haya dónde encontrarse.
            </p>
            <p className="prose" data-reveal style={{ '--reveal-delay': '140ms' }}>
              Lo que pasa adentro es lo que la mantiene en pie: las conversaciones, el café, el
              bazar de artesanías, los talleres, el mercado. El método, lo que Ágora sabe hacer y
              enseña a hacer, se financia por otro camino: los Paquetes Ágora, con empresas,
              cooperación y aliados institucionales. De vos, como persona aliada, pedimos tu tiempo
              y tu talento para continuar construyendo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
