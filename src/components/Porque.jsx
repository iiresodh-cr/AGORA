import React from 'react';

export default function Porque() {
  return (
    <>
      <a id="porque" aria-hidden="true" tabIndex="-1"></a>
      <section className="band band--dark porque" id="existimos">
        <div className="porque__fondo" aria-hidden="true">
          <video
            className="porque__bg"
            src="/assets/video/trafico.mp4"
            muted
            loop
            playsInline
            preload="none"
            data-lazyvid
            tabIndex="-1"
            aria-hidden="true"
          ></video>
          <span className="porque__scrim" id="porqueScrim"></span>
        </div>

        <div className="band__inner porque__inner">
          <p className="meta" data-reveal>Existimos por algo</p>

          <h2 className="porque__h display" data-reveal style={{ '--reveal-delay': '60ms' }}>
            La mentira que mejor nos gobierna<br />es la de <em>creernos solos</em>
          </h2>

          <div className="relato">
            <p className="relato__p" data-reveal>
              Hay un malestar que recorre Latinoamérica y lo hemos sentido: en la mesa familiar que evita
              el tema para no pelear, en la indignación que se traga con un «¿y qué voy a hacer yo?».
              {' '}<b>No es apatía.</b> Es la certeza, cada vez más difícil de ignorar, de que algo que
              dábamos por garantizado se está desgastando frente a nuestros ojos.
            </p>

            <p className="relato__p" data-reveal style={{ '--reveal-delay': '80ms' }}>
              No fundamos Casa Ágora para representar a nadie. La fundamos porque creemos que el pueblo debe
              volver a representarse a sí mismo. No te pedimos que creas en nosotros, te pedimos que
              vuelvas a creer en tu propio poder, ese que solo se enciende cuando se junta
              {' '}<span className="relato__con">con el de otras personas<i>.</i></span>
            </p>

            <figure className="tres" data-reveal>
              <video
                src="/assets/video/v03.mp4"
                poster="/assets/img/p03.jpg"
                muted
                loop
                playsInline
                preload="none"
                data-lazyvid
                data-desde="0.05"
                data-hasta="2.85"
                aria-label="Tres personas se dan la mano en un campo"
              ></video>
              <span className="tres__borde" aria-hidden="true"></span>
            </figure>

            <h3 className="relato__pregunta display" data-reveal>
              ¿Qué es Casa Ágora?
            </h3>

            <p className="relato__p" data-reveal style={{ '--reveal-delay': '80ms' }}>
              Casa Ágora <b>conecta</b>: personas con personas, comunidades con organizaciones,
              necesidades con capacidades, proyectos con asesoría técnica y con oportunidades de
              financiamiento. Conectamos para que la gente pueda organizarse y actuar en conjunto.
            </p>

            <p className="relato__p" data-reveal style={{ '--reveal-delay': '80ms' }}>
              Muchas iniciativas valiosas ya existen y lo que les falta es capacidad técnica, recursos o
              articulación. Las fortalecemos y respetamos su autonomía: no competimos con quienes
              acompañamos ni nos apropiamos de sus procesos.
            </p>

            <p className="relato__p" data-reveal style={{ '--reveal-delay': '80ms' }}>
              En la antigua Grecia, el ágora era la plaza pública: el lugar donde la gente común se
              encontraba a conversar, decidir y construir comunidad. Casa Ágora
              recupera esa idea.
            </p>

            <p className="relato__p" data-reveal style={{ '--reveal-delay': '80ms' }}>
              Somos <b>apartidistas, no apolíticos</b>: hablamos de democracia, derechos humanos y poder
              ciudadano, nunca a favor ni en contra de un partido, un candidato o un gobierno. Creemos
              que <b>la ciudadanía organizada es la fuerza más poderosa que existe</b>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
