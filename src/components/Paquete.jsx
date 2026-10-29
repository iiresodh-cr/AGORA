import React from 'react';

export default function Paquete() {
  return (
    <section className="band band--dark organizaciones paquete" id="paquete">
      <div className="impulsamos__red paquete__red" data-red aria-hidden="true"><canvas></canvas></div>
      <div className="band__inner">
        <div className="sec-head sec-head--split">
          <div>
            <p className="meta" data-reveal>Para comunidades que enfrentan barreras de acceso</p>
            <h2 className="sec-head__h display" data-reveal style={{ '--reveal-delay': '60ms' }}>
              El Paquete <em>Ágora</em>
            </h2>
          </div>
          <div data-reveal style={{ '--reveal-delay': '140ms' }}>
            <p className="lede">
              Herramientas para que una comunidad conozca sus derechos, se conecte y también disfrute.
              Porque una vida digna incluye las tres cosas.
            </p>
            <p className="organizaciones__nota">
              <span className="estado">En construcción</span> Un modelo que buscamos impulsar poco a poco, junto con las comunidades.
            </p>
          </div>
        </div>

        <ol className="pqres" id="pqRes" aria-label="Lo que trae el Paquete Ágora">
          <li data-reveal>
            <button type="button" className="pqres__b" aria-expanded="false" aria-controls="pqPanel" data-pq="1">
              <span className="pqres__n">01</span>
              <span className="pqres__t">Cartillas y rutas para defender tus derechos</span>
              <span className="pqres__mas" aria-hidden="true"></span>
            </button>
          </li>
          <li data-reveal style={{ '--reveal-delay': '60ms' }}>
            <button type="button" className="pqres__b" aria-expanded="false" aria-controls="pqPanel" data-pq="2">
              <span className="pqres__n">02</span>
              <span className="pqres__t">Orientación jurídica con PIDA</span>
              <span className="pqres__mas" aria-hidden="true"></span>
            </button>
          </li>
          <li data-reveal style={{ '--reveal-delay': '120ms' }}>
            <button type="button" className="pqres__b" aria-expanded="false" aria-controls="pqPanel" data-pq="3">
              <span className="pqres__n">03</span>
              <span className="pqres__t">Internet y dispositivos</span>
              <span className="pqres__mas" aria-hidden="true"></span>
            </button>
          </li>
          <li data-reveal style={{ '--reveal-delay': '180ms' }}>
            <button type="button" className="pqres__b" aria-expanded="false" aria-controls="pqPanel" data-pq="4">
              <span className="pqres__n">04</span>
              <span className="pqres__t">Cine, cultura y encuentro</span>
              <span className="pqres__mas" aria-hidden="true"></span>
            </button>
          </li>
          <li className="pqpanel" id="pqPanel" role="region" aria-live="polite" hidden>
            <button type="button" className="pqpanel__cerrar" aria-label="Cerrar">×</button>
            <div className="pqpanel__cuerpo"></div>
          </li>
        </ol>

        <template
          id="pq-t-1"
          dangerouslySetInnerHTML={{
            __html: `<p class="pqpanel__n">01</p><h3 class="pqpanel__t display">Cartillas y rutas para defender tus derechos</h3><div class="pqpanel__x"><p>Materiales impresos y digitales, en lenguaje sencillo, sobre qué derechos tenés y qué hacer si se vulneran.</p><p>Explican cuáles son las rutas institucionales y jurídicas para pedir protección o exigir que se cumplan. La idea es que los derechos no queden en abstracto: que haya información práctica para saber cómo actuar.</p></div>`
          }}
        />
        <template
          id="pq-t-2"
          dangerouslySetInnerHTML={{
            __html: `<p class="pqpanel__n">02</p><h3 class="pqpanel__t display">Orientación jurídica con PIDA<small>Inteligencia artificial especializada en derechos humanos</small></h3><div class="pqpanel__x"><p>Desarrollada con juristas, jueces, litigantes y otras personas expertas. Orienta sobre tus derechos y sobre las posibles rutas para exigirlos. No reemplaza a un abogado.</p><p>PIDA no es una inteligencia artificial generalista: su valor está en la especialización en derechos humanos y en las materias jurídicas relacionadas con su protección y garantía, y en el trabajo experto que la sustenta.</p><p>Busca mejorar el acceso a la información jurídica y facilitar el camino hacia la justicia. No resuelve casos por sí sola.</p></div>`
          }}
        />
        <template
          id="pq-t-3"
          dangerouslySetInnerHTML={{
            __html: `<p class="pqpanel__n">03</p><h3 class="pqpanel__t display">Internet y dispositivos</h3><div class="pqpanel__x"><p>Conexión a internet, computadoras portátiles y otros dispositivos, según las condiciones y los recursos disponibles.</p><p>Para reducir la brecha digital y ampliar el acceso a información, educación, formación y otras oportunidades.</p></div>`
          }}
        />
        <template
          id="pq-t-4"
          dangerouslySetInnerHTML={{
            __html: `<p class="pqpanel__n">04</p><h3 class="pqpanel__t display">Cine, cultura y encuentro</h3><div class="pqpanel__x"><p>La tecnología también es para descansar, ver cine, cantar en un karaoke y encontrarnos. <b>El disfrute también es un derecho.</b></p><p>No es un adorno ni un extra. El descanso, la recreación y la vida cultural son parte de una vida digna, y las comunidades también merecen disfrutar y compartir.</p></div>`
          }}
        />

        <ol className="ledger pqlist">
          <li className="pq pq--vision" data-reveal>
            <span className="pq__k">→</span>
            <h3 className="pq__t">
              Nuevas Casas Ágora en el territorio<small><span className="estado">Visión de futuro</span></small>
            </h3>
            <div className="pq__x prose">
              <p>
                Aspiramos a que el Paquete Ágora ayude a consolidar nuevas Casas Ágora en comunidades rurales y territorios históricamente excluidos: espacios de conexión, herramientas digitales, información sobre derechos y disfrute colectivo.
              </p>
              <p>Hoy es una visión, no una red existente. Queremos construirla junto con las comunidades.</p>
            </div>
          </li>
        </ol>

        <div className="pqcta">
          <div className="pqcta__b" data-reveal>
            <p className="pqcta__t display">¿Tu comunidad quiere el Paquete Ágora?</p>
            <a className="tlink" href="#sumate-org">Conversemos <span className="arw" aria-hidden="true">→</span></a>
          </div>
          <div className="pqcta__b" data-reveal style={{ '--reveal-delay': '80ms' }}>
            <p className="pqcta__t display">¿Tu organización quiere ayudar a sostenerlo?</p>
            <a className="tlink" href="#sumate-apoyo">Hablemos <span className="arw" aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

