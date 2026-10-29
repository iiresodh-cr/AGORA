import React from 'react';

export default function Hacemos() {
  return (
    <section className="band hacemos" id="hacemos">
      <div className="band__inner">
        <div className="sec-head">
          <p className="meta" data-reveal>Qué hacemos</p>
          <h2 className="sec-head__h display" data-reveal style={{ '--reveal-delay': '60ms' }}>
            Conectar, fortalecer, <em>impulsar</em>.
          </h2>
          <p className="lede" data-reveal style={{ '--reveal-delay': '120ms' }}>
            Conectar es el principio. Fortalecer e impulsar es lo que hacemos a partir de ahí.
          </p>
        </div>

        <div className="paths hacemos__paths">
          <div className="path" data-reveal>
            <p className="path__k">01 · Para personas, comunidades y organizaciones</p>
            <h3 className="path__t">Conectamos</h3>
            <p className="path__x">
              Ponemos en contacto a personas, comunidades, organizaciones e iniciativas; necesidades con capacidades; proyectos con asesoría técnica y con oportunidades de financiamiento.
            </p>
            <a className="tlink" href="#sumate-persona">Quiero sumarme <span className="arw" aria-hidden="true">→</span></a>
          </div>

          <div className="path" data-reveal style={{ '--reveal-delay': '80ms' }}>
            <p className="path__k">02 · Para organizaciones, colectivos y personas con un proyecto</p>
            <h3 className="path__t">Fortalecemos iniciativas</h3>
            <p className="path__x">
              Asesoría técnica para que una iniciativa que ya existe alcance sus objetivos: consolidación organizativa, diseño y formulación de proyectos, búsqueda de financiamiento, estrategia y fortalecimiento de capacidades.
            </p>
            <p className="hacemos__golpe">La iniciativa es tuya: acompañamos, transferimos lo que sabemos y soltamos.</p>
            <a className="tlink" href="#sumate-org">Tengo una iniciativa <span className="arw" aria-hidden="true">→</span></a>
          </div>

          <div className="path" data-reveal style={{ '--reveal-delay': '160ms' }}>
            <p className="path__k">03 · En democracia y derechos humanos</p>
            <h3 className="path__t">Impulsamos iniciativas propias</h3>
            <p className="path__x">
              Proyectos propios que nacen abiertos: los construimos con quienes ya trabajan en estos temas, para sumar capacidades y no para disputar espacios ni apropiarnos de proyectos ajenos.
            </p>
            <p><span className="estado">En construcción</span></p>
            <a className="tlink" href="#causas">Ver lo que impulsamos <span className="arw" aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

