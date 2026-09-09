import React from 'react';

export default function Transmision() {
  return (
    <div className="transmision" id="transmision">
      <div className="tele" aria-hidden="true">
        <div className="tele__mueble">
          <div className="tele__pantalla" id="teleZona">
            <span className="tele__barras"></span>
            <video
              className="tele__video"
              src="/assets/video/v06.mp4"
              poster="/assets/img/p06.jpg"
              muted
              loop
              playsInline
              preload="none"
              data-lazyvid
              tabIndex="-1"
            ></video>
            <span className="tele__calor"></span>
            <span className="tele__grano"></span>
            <canvas className="tele__ruido" id="senalRuido"></canvas>
            <span className="tele__lineas"></span>
            <span className="tele__vidrio"></span>
          </div>
          <div className="tele__frente">
            <p className="tele__placa">
              <span>ÁGORA</span><i>·</i><span>CANAL ABIERTO</span>
            </p>
            <span className="tele__perilla"></span>
            <span className="tele__perilla"></span>
          </div>
        </div>
      </div>

      <section className="band band--dark caravanas" id="movimiento">
        <div className="band__inner caravanas__inner">
          <p className="meta" data-reveal>Caravanas Democráticas</p>
          <h2 className="caravanas__h display" data-reveal style={{ '--reveal-delay': '60ms' }}>
            Salir del<br />edificio gris.
          </h2>
          <div className="caravanas__cols prose">
            <p data-reveal style={{ '--reveal-delay': '120ms' }}>
              Hay momentos en la historia en que una sociedad necesita cambiar. Y quizás uno de nuestros
              mayores desafíos hoy sea que cada vez nos vemos menos, nos encontramos menos, nos
              organizamos menos. Vivimos bajo una lógica que nos empuja al aislamiento, a pensar que
              cada quien debe resolver su propio camino. Pero ninguna sociedad avanza cuando cada
              persona avanza por separado. La conciencia individual necesita encontrarse con una
              conciencia social. Con la capacidad de reconocernos en los demás, de organizarnos, de
              articularnos y de imaginar juntos el mundo que queremos construir.
            </p>
            <p data-reveal style={{ '--reveal-delay': '140ms' }}>
              Vayamos donde están las personas. Si nos necesitamos mutuamente, no podemos construir país desde un escritorio.
            </p>
            <p data-reveal style={{ '--reveal-delay': '200ms' }}>
              Las Caravanas Democráticas son nuestra manera de salir al encuentro de las comunidades: poner capacidades, conocimiento y ganas de ayudar en común. No vamos a decirle a nadie qué hacer: vamos a encontrarnos, a escuchar, a aprender y a construir con las personas.
            </p>
            <p data-reveal style={{ '--reveal-delay': '220ms' }}>
              Fortalecemos redes sociales, producimos contenido audiovisual y grabamos conversaciones
              con las comunidades que visitamos: campañas, videos, contenido alrededor de cada causa,
              y colaboraciones con creadores de contenido que ya tienen esa conversación abierta.
            </p>
            <p data-reveal style={{ '--reveal-delay': '240ms' }}>
              También buscamos voces de posiciones políticas distintas, de izquierda y de derecha: no
              para darles la razón ni quitársela, sino para conocerlas y mostrarlas. Ágora no se presenta
              acá como quien ya tiene todas las respuestas. La estrategia es escuchar, preguntar,
              documentar, analizar y conversar, en ese orden.
            </p>
            <p data-reveal style={{ '--reveal-delay': '260ms' }}>
              <a className="tlink" href="#sumate">Sumá tu talento <span className="arw" aria-hidden="true">→</span></a>
            </p>
          </div>
          <p className="caravanas__pista meta" data-reveal style={{ '--reveal-delay': '320ms' }}>
            Movete: la señal se interrumpe
          </p>
        </div>
      </section>

      <section className="band band--dark consciencias" id="consciencias">
        <div className="band__inner">
          <div className="rev" id="rev">
            <h2 className="rev__t display" data-reveal>
              <span className="rev__l rev__l--4" aria-hidden="true">Revolución<br />de las consciencias</span>
              <span className="rev__l rev__l--3" aria-hidden="true">Revolución<br />de las consciencias</span>
              <span className="rev__l rev__l--2" aria-hidden="true">Revolución<br />de las consciencias</span>
              <span className="rev__l rev__l--1">Revolución<br />de las consciencias</span>
            </h2>

            <p className="rev__sub display" data-reveal style={{ '--reveal-delay': '120ms' }}>
              Antes de transformar el país,<br />hay que atreverse a imaginarlo
            </p>
          </div>

          <div className="voces" id="voices"></div>
        </div>
      </section>
    </div>
  );
}
