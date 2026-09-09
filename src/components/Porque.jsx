import React from 'react';

export default function Porque() {
  return (
    <>
      <a id="porque" aria-hidden="true" tabIndex="-1"></a>
      <section className="band band--dark porque" id="existimos">
        <div className="porque__fondo" aria-hidden="true">
          <video
            className="porque__bg"
            src="/assets/video/ciudad.mp4"
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
              Hay un malestar que recorre Latinoamérica y lo hemos sentido. En la mesa familiar que evita
              el tema para no pelear, en la indignación que sube hasta la garganta y se traga con un
              «¿y qué voy a hacer yo?». <b>No es apatía.</b> Es la certeza, cada vez más difícil de ignorar,
              de que algo que dábamos por garantizado se está desgastando frente a nuestros ojos.
            </p>

            <p className="relato__p" data-reveal style={{ '--reveal-delay': '80ms' }}>
              No fundamos Ágora para representar a nadie. La fundamos porque creemos que el pueblo debe
              volver a representarse a sí mismo. No te pedimos que creas en nosotros, te pedimos que
              vuelvas a creer en tu propio poder, ese que solo se enciende cuando se junta{' '}
              <span className="relato__con">con el de otras personas<i>.</i></span>
            </p>

            <figure className="tres" data-reveal>
              <video
                src="/assets/video/v02.mp4"
                poster="/assets/img/p02.jpg"
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
              ¿Qué es Ágora y cuál es su carácter transformador?
            </h3>

            <p className="relato__p" data-reveal style={{ '--reveal-delay': '80ms' }}>
              En la antigua Grecia, el Ágora era la plaza pública: el lugar donde la gente común se
              encontraba no a consumir, sino a conversar, decidir y construir comunidad. El Centro Ágora
              Costa Rica es la recuperación contemporánea de ese espacio sagrado.
            </p>

            <p className="relato__p" data-reveal style={{ '--reveal-delay': '80ms' }}>
              Su carácter transformador radica en que desarma la trampa del odio y la polarización
              mediante el encuentro cara a cara. Mientras los liderazgos destructivos lucran dividiendo
              y sembrando resentimiento, Ágora une mediante causas concretas: el agua, la cultura,
              la justicia y la dignidad comunitaria.
            </p>

            <p className="relato__p" data-reveal style={{ '--reveal-delay': '80ms' }}>
              Ágora no busca convencer a todos de pensar igual; busca garantizar que podamos convivir y
              construir en la diversidad. Transformar a Costa Rica no significa esperar a que una persona
              «salvadora» llegue al gobierno, sino despertar la convicción de que{' '}
              <b>la ciudadanía organizada es la fuerza más poderosa que existe</b>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
