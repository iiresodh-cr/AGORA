/* ============================================================
   ÁGORA · Content
   Ported verbatim from the original mockup. The mockup is the
   source of truth for copy; nothing here is invented. The only
   additions are machine-readable ISO dates on AGENDA entries so
   the page can count down to the first plaza.
   ============================================================ */

export const PHRASES = [
  '¿Y si el futuro dependiera de lo que somos capaces de imaginar juntos?',
  '¿Y si la democracia comenzara en nuestra imaginación?',
  '¿Y si el cambio empezara mucho antes de la acción?',
  '¿Y si el país que soñamos comenzara por una idea compartida?',
  'Toda transformación comienza en la imaginación.'
];

export const MARQUEE = [
  'Construir País', 'Nadie Avanza Solo', 'Ágora es Ahora',
  'Las instituciones son el reflejo de quienes somos', 'Imaginar juntos',
  'El futuro también se comienza con una conversación'
];

export const ORDER = ['democracia', 'territorios', 'economias'];

export const CAUSES = {
  democracia: {
    n: '01', cat: 'Democracia Viva', color: 'var(--blue)', hex: '#2438D8', flood: '#2438D8',
    video: 'assets/video/v03.mp4', poster: 'assets/img/p03.jpg',
    /* Los clips del archivo son montajes de varias tomas, no planos
       sueltos: por eso cada causa apunta a un FRAGMENTO y no al fichero
       entero. Aquí, la marcha con banderas — gente organizada en la
       calle, que es literalmente lo que dice la causa. */
    toma: 'assets/video/v01.mp4', desde: 0.2, hasta: 3.4,
    title: 'La democracia se practica organizándose en comunidad',
    phrase: 'La democracia empieza cuando nos organizamos. La sociedad avanza cuando nadie queda afuera.',
    micro: 'Diálogo, formación ciudadana y Comités Ágora; voluntariado, liderazgo local y la Red de Profesionales al servicio de las causas.',
    photo: 'un círculo de personas conversando en una plaza y una jornada comunitaria de vecinas y vecinos',
    cta: 'Sumate a la conversación',
    problema: 'Antes de que una democracia se caiga, se le nota en cómo habla: empieza a morir cuando el insulto reemplaza al argumento. Y el aislamiento nos convence de que nuestra voz no sirve de nada por sí sola. Esa es la mentira que mejor nos gobierna: creernos pocos. Una ciudadanía que se cree sola es una ciudadanía que ya no se resiste.',
    porque: 'La democracia no se hereda, se construye, y toda construcción exige mantenimiento. Recuperar el espacio público para el debate cívico es cuidar el terreno donde viven todos los demás derechos; no buscamos unanimidad, buscamos conversación. Y ninguna transformación profunda comenzó en solitario: todas empezaron cuando personas comunes descubrieron que compartían la misma preocupación y decidieron actuar juntas.',
    /* Sin `quote` ni `stats` a propósito: la cita repetía casi palabra
       por palabra la primera línea de `problema`, y el bloque de datos
       anunciaba cifras que todavía no existen. Las otras dos causas sí
       los conservan — el render los pinta solo si están. */
    /* Marea Democrática todavía no existe como programa en marcha: se
       presenta como lo que es, una propuesta en construcción. Nada de
       fechas ni actividades que no estén confirmadas. */
    proyectoNombre: 'Marea Democrática',
    proyectoEstado: 'Proyecto en construcción · propuesta en fase 2',
    proyecto: 'Una propuesta de encuentros, conversación y participación que estamos desarrollando: la Agenda Cultural Ágora. Todavía no tiene fechas. Cuando las tenga, se publican acá.',
    hacemos: [
      'Conversatorios y recorridos por la historia común',
      'Comités Ágora y comités ciudadanos que proponen y dan seguimiento',
      'Voluntariado, liderazgo local y Red de Profesionales',
      'Formación en participación y pensamiento crítico'
    ],
    logros: [
      'Que la queja se transforme en propuesta',
      'Que una comunidad vuelva a hablarse y no se sienta sola',
      'Conectar profesionales con proyectos reales',
      'Una agenda ciudadana construida entre muchos'
    ]
  },

  territorios: {
    n: '02', cat: 'Territorios del futuro', color: 'var(--green)', hex: '#0FA36B', flood: '#0b784f',
    /* La cascada, material propio, recortada a 16:9 para el hero de la
       causa. El recorte sigue el movimiento de la cámara para que el
       chorro no se salga de cuadro mientras el plano sube, y el final
       funde contra el primer fotograma: el loop no da tirón. Defender
       el agua es defender la vida, y la toma ya lo dice sola. */
    video: 'assets/video/cascada.mp4', poster: 'assets/img/cascada.jpg',
    // El agua cayendo. Plano continuo.
    toma: 'assets/video/v04.mp4', desde: 0.2, hasta: 7.5,
    title: 'Defender el agua es defender la vida',
    /* Sin `phrase` ni `stats`: la bajada del hero y el bloque de cifras
       por documentar se retiraron. El render pinta ambos sólo si están. */
    micro: 'Acción climática y territorial decidida entre todas y todos, desde lo local.',
    photo: 'jóvenes y familias limpiando y monitoreando un río, agua clara',
    cta: 'Actuá por tu territorio',
    problema: 'Muchas comunidades ven cómo se contamina su río o se degrada su territorio y sienten que no pueden hacer nada. Esa resignación es, justamente, lo que necesita quien contamina sin rendir cuentas. La queja sola no alcanza; se agota.',
    /* Esta causa titula el bloque con la frase que en las otras hace de
       rótulo pequeño, así que ahí el rótulo se omite para no repetirla. */
    porqueTitulo: 'Por qué también es tuya',
    porque: 'Cuidar el agua y la tierra es cuidar el futuro de comunidades enteras. El poder de defender lo nuestro, la casa común, no está arriba, en un despacho. Vive abajo, entre quienes deciden dejar de mirar para otro lado.',
    /* Sin `quote` ni `quoteSrc`: el manifiesto se retiró de esta causa.
       El render pinta la cita sólo si está. */
    /* Mismo criterio que Marea Democrática: el proyecto se presenta por
       lo que es hoy, en desarrollo, sin dar por hecho lo que todavía no
       está andando. */
    proyectoNombre: 'Siempre Verde',
    proyectoEstado: 'Proyecto en desarrollo · fase 2',
    proyecto: 'Organizamos comunidades para que se vuelvan defensoras activas de sus propias fuentes de agua: limpieza, monitoreo, documentación y presión pública para que los contaminadores rindan cuentas. Es lo que estamos construyendo ahora. Cuando haya jornadas abiertas, se publican acá.',
    hacemos: [
      'Jornadas de limpieza y reforestación',
      'Monitoreo y documentación ciudadana del agua',
      'Presión pública para exigir cuentas'
    ],
    logros: [
      'Que la comunidad tenga sus propios datos',
      'Convertir la resignación en vigilancia activa',
      'Fuentes de agua cuidadas por quienes las beben'
    ]
  },

  economias: {
    n: '03', cat: 'Economías que conectan', color: 'var(--yellow)', hex: '#FFC22E', flood: '#FFC22E',
    /* El valle al atardecer, material propio de esta causa. El plano es
       lento, así que el fragmento aguanta el bucle sin cansar; los
       últimos 0.9 s funden contra el primer fotograma. La ciudad en
       sombra ocupa la mitad baja, que es donde va el titular. */
    video: 'assets/video/valle.mp4', poster: 'assets/img/valle.jpg',
    toma: 'assets/video/v02.mp4', desde: 4.2, hasta: 5.9,
    title: 'Cuando la economía local crece, crece el tejido social',
    phrase: 'Tendemos un puente entre el campo y la ciudad.',
    micro: 'Mercados, ferias y emprendimientos que generan encuentro, ingresos y confianza.',
    photo: 'una mesa compartida en el campo y una feria vibrante de productos locales',
    cta: 'Conectá tu economía',
    problema: 'El productor rural vende barato y la ciudad compra caro, y en el medio se pierde el vínculo. Sin ese puente, el campo se vacía y la ciudad se desconecta de lo que come y de quién lo produce.',
    porque: 'Detrás de cada feria y de cada emprendimiento hay personas que se conectan y comunidades que se sostienen. El progreso siempre se construye en comunidad: nadie progresa solo. Fortalecer la economía local es, en el fondo, fortalecer el tejido social.',
    quote: 'El progreso siempre se construye en comunidad. Nadie progresa solo.',
    quoteSrc: 'Manifiesto Ágora Costa Rica',
    /* Sin `stats`: el bloque de cifras por documentar se retiró de esta
       causa, igual que en las otras dos. El render lo pinta, junto con
       su nota al pie, sólo si la lista está. */
    /* Mismo criterio que las otras dos: se nombra el proyecto, se dice
       en qué punto está y qué se está construyendo. Acá no se indica
       fase porque no hay una definida en el contenido existente. */
    proyectoNombre: 'El Sabor de lo Nuestro',
    proyectoEstado: 'Proyecto en desarrollo',
    proyecto: '«Economía que conecta»: visitamos y compartimos una comida con una familia anfitriona en Turrialba o Dota, aprendemos y enseñamos emprendimiento rural, y construimos la plataforma que conecta a productores locales con un mercado justo. Las rutas y la plataforma se están armando. Cuando abran, se publican acá.',
    hacemos: [
      'Rutas campo–ciudad y comidas anfitrionas',
      'Formación en emprendimiento rural',
      'Una plataforma que conecta con un mercado justo'
    ],
    logros: [
      'Que el productor acceda a un precio justo',
      'Reconectar la ciudad con quien la alimenta',
      'Emprendimientos que crecen en red'
    ]
  }
};


/* ---- las dos formas de ejercer Democracia Viva -------------------
   Democracia Viva es el paraguas; dentro conviven dos formas
   concretas de ejercerla: observar cómo se construye el discurso
   público (Lupa Ciudadana) y aprender a participar desde temprano
   (Niñez y Adolescencia).

   Antes había una tercera, «Democracia Viva» misma, que no era una
   forma sino el paraguas presentándose a sí mismo — se quitó. Su
   contenido (el trabajo y la huella de la causa) no se perdió: ahora
   lo pinta la propia causa, antes de esta sección.

   La de Niñez fue una causa suelta de la portada («juventud») y trae
   su contenido completo —problema, porqué, cita, los nueve pasos,
   el mecanismo que la sostiene—. La página ya no lo muestra entero:
   se quedó con el resumen y el «qué proponemos», que es lo que se
   pidió. El resto se conserva acá para no perderlo. */
export const DIMENSIONES = {
  democracia: [
    { n: '01', id: 'lupa', emblema: 'lupa',
      nombre: 'Lupa Ciudadana',
      verbo: 'observar cómo se construye el discurso público',
      lede: '¿Cómo nos cuentan lo que está pasando? Miramos con método cómo los medios eligen, tratan y narran la actualidad: qué se cuenta, qué se omite y qué carga ideológica trae. No te decimos qué pensar. Te damos herramientas para observar, preguntar y discutir con argumentos.',
      deLupa: true,
      nota: 'Sección en construcción · los contenidos se publicarán a partir del lanzamiento.' },

    { n: '02', id: 'ninez', emblema: 'juventud',
      /* conserva su coral, pero sólo en el número y el filete: la
         página sigue siendo azul y la dimensión no la secuestra */
      color: 'var(--coral)', hex: '#FF4B2B',
      nombre: 'Liderazgo democrático en la Niñez y Adolescencia',
      verbo: 'formar liderazgo democrático',
      /* La manifestación con pancartas hechas a mano: gente que se
         organiza y sale con su propia voz escrita. No hay metraje de
         infancia en el archivo, así que en vez de inventar una imagen
         tierna se usa la que sí está: el gesto que la causa quiere que
         aprendan a hacer. */
      toma: 'assets/video/v02.mp4', desde: 6.05, hasta: 7.90,
      video: 'assets/video/v05.mp4', poster: 'assets/img/p05.jpg',
      title: 'La democracia no empieza en las instituciones. Empieza en la Niñez y la Adolescencia.',
      phrase: 'Liderazgo democrático desde la niñez y, especialmente, la adolescencia.',
      micro: 'Comités y espacios de participación liderados por adolescentes: identifican problemas, se organizan, deliberan y llevan sus propuestas hasta los espacios institucionales.',
      photo: 'un grupo de adolescentes deliberando y organizándose en su comunidad',
      cta: 'Sumate a esta causa',
      /* Lo único que la página muestra hoy de esta dimensión: el
         resumen y `hacemos`. Todo lo que sigue —problema, porqué,
         cita, stats, proyecto, logros, flow, sostenibilidad— se
         conserva escrito pero no se pinta: la sección tenía el doble
         de peso del que debía y se pidió aligerarla. */
      resumen: 'Niñas, niños y adolescentes ya tienen opinión sobre lo que pasa en su comunidad. Lo que suele faltarles es un lugar donde esa voz cuente de verdad. El liderazgo democrático no se estudia, se aprende ejerciéndolo: hablando, escuchando, organizándose y llevando una propuesta hasta donde se decide. Eso es lo que abrimos: no una clase sobre democracia, sino un espacio para practicarla.',
      problema: 'Si el propósito de Ágora es promover una cultura democrática, debemos asumir que la democracia no empieza en las instituciones: empieza en la formación de las personas. Una democracia necesita ciudadanos capaces de pensar, deliberar, convivir con quienes piensan distinto y participar activamente en los asuntos comunes; esa capacidad no aparece sola.',
      porque: 'El liderazgo democrático en la niñez y la adolescencia es una de las causas fundamentales que Ágora impulsa, con el mismo peso que las demás. Si queremos una cultura democrática, no basta con esperar a la adultez: la democracia se aprende ejerciéndola desde temprano. No se trata de enseñarles solamente qué es la democracia, sino de darles la posibilidad de ejercerla. Nuestro diferencial es aportar el know-how para acompañar ese proceso: transformar una conversación en una organización; una organización en una propuesta; y una propuesta en una acción concreta con posibilidades reales de incidencia.',
      quote: 'Ágora no debería limitarse a enseñarles qué es la democracia: debe darles la posibilidad de ejercerla.',
      quoteSrc: 'Propuesta Ágora Costa Rica',
      stats: ['comités juveniles', 'adolescentes participando', 'colegios y comunidades aliadas'],
      proyecto: 'Una escuela práctica de democracia: comités, grupos y espacios de participación liderados por adolescentes, donde no solo estudian la participación ciudadana, sino que la experimentan. Identifican un problema de su comunidad, se organizan, salen a escuchar a las personas afectadas, construyen una propuesta con el acompañamiento de Ágora y la llevan hacia los espacios institucionales que correspondan.',
      hacemos: [
        'Comités y espacios de participación liderados por adolescentes',
        'Identificar problemas, organizarse, deliberar y formular propuestas',
        'Aprender cómo funcionan las instituciones y los mecanismos de incidencia',
        'Acompañamiento para convertir una idea en una acción concreta'
      ],
      logros: [
        'Convertir una conversación en una organización',
        'Una organización en una propuesta',
        'Una propuesta en una acción con incidencia real',
        'Adolescentes que ejercen la democracia, no solo la estudian'
      ],
      flow: [
        'Un grupo de adolescentes identifica un problema en su comunidad',
        'Se organiza y forma un comité',
        'Sale a la comunidad para escuchar y comprender',
        'Aprende de las personas afectadas',
        'Con el acompañamiento de Ágora, desarrolla una propuesta',
        'La propuesta se convierte en un plan de acción',
        'Se intenta implementar o llevar a los espacios institucionales',
        'Se evalúan los resultados y se vuelve a la comunidad',
        'Se aprende de nuevo, y el ciclo comienza otra vez'
      ],
      sostenibilidad: {
        titulo: 'Un mecanismo que sostiene la causa',
        texto: 'Los programas de formación en liderazgo democrático, participación, pensamiento crítico y organización comunitaria están dirigidos principalmente a jóvenes, niñez y adolescencia. Algunos de estos procesos pueden financiarse a través de instituciones con capacidad de pago, y lo recaudado permite sostener y ampliar la misma formación para jóvenes de comunidades que no podrían costearla. No es una actividad comercial aparte: es el mecanismo que mantiene viva la causa y lleva la formación democrática a más adolescentes.'
      }
    }
  ]
};


/* ---- los Paquetes Ágora -----------------------------------------
   Literal del Documento Ejecutivo: a quién va dirigido, qué resuelve
   y qué incluye. El documento no trae precios ni beneficios, así que
   acá tampoco los hay. Su papel también está escrito: es «el
   mecanismo por el cual el conocimiento y el método de Ágora se
   financian y se sostienen sin depender de la filantropía
   tradicional». */
/* Cada paquete queda ligado a la causa con la que comparte hilo
   narrativo directo, sin forzarlo: «Sujeto Ágora Político» habla de
   ejercer derechos — lo mismo que dice el título de Democracia Viva
   («la democracia se practica organizándose en comunidad»); «Comunidad
   Ágora» es esa misma organización aplicada a comunidades específicas,
   así que comparte causa; «Ágora Empresarial» tiende un puente entre
   una empresa y una comunidad, que es literalmente lo que nombra
   Economías que Conectan; y «Ágora Justa» es el instrumento con el que
   Territorios del Futuro hace lo que dice que hace, exigirle cuentas a
   quien contamina. Las tres causas tienen ya su paquete; el número por
   causa no es el mismo, y no tiene por qué serlo. */
export const PAQUETES = [
  { n: '01', id: 'sujeto', nombre: 'El Sujeto Ágora Político', causa: 'democracia',
    quien: 'Cada persona, desde su capacidad individual de conocer y ejercer sus derechos.',
    resuelve: 'Que un derecho que no se conoce, no se usa y no se defiende es, en la práctica, como si no existiera.',
    incluye: 'Cartillas de derechos fundamentales, rutas para reclamarlos, formación con sentido crítico y orientación cuando esos derechos se vulneran.',
    queRecibe: 'Herramientas concretas para conocer y defender lo suyo: cartillas claras, rutas de reclamo y orientación cuando algo se vulnera.',
    queFinancia: 'Sostiene la formación en pensamiento crítico y participación ciudadana que Ágora lleva a comunidades que no podrían costearla por sí solas.' },

  { n: '02', id: 'comunidad', nombre: 'Comunidad Ágora', causa: 'democracia',
    quien: 'Comunidades específicas: pueblos indígenas, población LGBTIQA+, personas adultas mayores, adolescencia, niñez, población penitenciaria, entre otras.',
    resuelve: 'Que hablar de «poblaciones vulnerables» invisibilice la capacidad real de organización de esas comunidades.',
    incluye: 'El Centro Ágora como espacio físico y simbólico de encuentro, talleres de derechos humanos adaptados a cada comunidad, actividad cultural y PIDA, acompañamiento sobre las vías legales que la ley ya pone a disposición de la ciudadanía.',
    queRecibe: 'Un espacio físico y simbólico de encuentro, talleres de derechos adaptados a su realidad, actividad cultural y acompañamiento legal a través de PIDA.',
    queFinancia: 'Financia la instalación de nuevas Casas Ágora y sostiene el acompañamiento legal para comunidades que hoy enfrentan solas al sistema.' },

  { n: '03', id: 'empresarial', nombre: 'Ágora Empresarial', causa: 'economias',
    quien: 'Empresas dispuestas a involucrarse con una comunidad, más allá de una donación puntual.',
    resuelve: 'Que la responsabilidad social se haya reducido a un logo en una memoria anual o una donación con foto.',
    incluye: 'Un puente de doble vía hacia una comunidad: tiempo, conocimiento, profesionales, espacios, voluntariado y, cuando corresponde, recursos económicos, apropiándose de una causa en el tiempo.',
    queRecibe: 'Un puente real y sostenido con una comunidad: tiempo, conocimiento, profesionales, espacios y, cuando corresponde, recursos económicos.',
    queFinancia: 'Financia directamente el trabajo de Ágora en el territorio: talleres, materiales, Comités Ágora y la operación de Casa Ágora.' },

  /* El acceso a la justicia con el IIRESODH era una sección aparte y
     se leía como una explicación institucional. Es, en realidad, una
     de las propuestas concretas de Casa Ágora, así que entra como
     cuarto paquete.

     Y es el paquete de Territorios del Futuro, la causa que se había
     quedado sin ninguno. No hizo falta inventar nada: esa causa dice
     que documenta y presiona «para que los contaminadores rindan
     cuentas», y esto es justamente el instrumento con el que se hace
     (vías legales, análisis de documentos, insumos para un proceso y
     recursos de amparo). Era el único paquete sin causa y la única
     causa sin paquete, y encajan por lo que ya dice cada uno. */
  { n: '04', id: 'justa', nombre: 'Ágora Justa', causa: 'territorios',
    quien: 'Personas y comunidades a las que les toca defender lo suyo frente al sistema, y que hoy lo hacen solas.',
    resuelve: 'Que nadie debería enfrentarse solo al sistema cuando le toca defender lo suyo.',
    incluye: 'Con el IIRESODH, Casa Ágora pone a disposición PIDA: una herramienta de inteligencia artificial especializada y curada que ayuda a investigar y comprender temas jurídicos, identificar posibles vías legales, analizar documentos y generar insumos para procesos jurídicos, incluyendo recursos de amparo. Una persona revisa cada resultado antes de que se convierta en una acción real: no es una IA que sustituye a nadie, es tecnología, conocimiento jurídico y revisión humana.',
    queRecibe: 'Ayuda concreta para entender un tema jurídico, identificar las vías legales que existen, analizar documentos y preparar los insumos de un proceso, siempre con revisión humana antes de que algo se convierta en una acción.',
    queFinancia: 'Sostiene el acceso a la justicia que Casa Ágora abre junto al IIRESODH: los recursos que genera la casa también se convierten en acceso a derechos.' }
];

export const REFLECTION = [
  'Todo empieza cuando una persona decide hablar con otra en lugar de resignarse. Cuando una comunidad decide organizarse. Cuando dejamos de esperar a que alguien más venga a resolver lo que nos duele.',
  'Antes de transformar el mundo, hace falta atreverse a imaginarlo distinto. Imaginar no es ingenuidad: es el punto de partida de toda política. Por eso imaginamos un país donde el racismo, el machismo, la homofobia y toda forma de odio sean parte del pasado y no del futuro. Un país donde la justicia, la dignidad y el cuidado de la tierra sean parte de la vida de todos los días, y una niñez que crezca libre para ser quien quiera ser.',
  'Imaginar, entonces, no para huir de la realidad, sino para transformarla: la primera forma de resistir, y el inicio de una narrativa que nos haga más libres.'
];

/* Cada paso trae, además de su texto, los recursos concretos con los
   que Casa Ágora lo pone a andar (antes vivían como una lista aparte,
   "los tres módulos con los que se instala una Casa Ágora" — el
   Documento Ejecutivo los liga a Conexión/Aprendizaje/Acción, que
   son literalmente Conectar/Aprender/Actuar). Volver a conectar cierra
   el ciclo y no trae recursos propios: no es un módulo, es la vuelta. */
export const CYCLE = [
  { n: '1', word: 'Conectar', kicker: 'Romper el aislamiento',
    text: 'Nos encontramos cara a cara. Descubrimos que no éramos los únicos que se preocupan. Esa es la primera grieta que le abrimos a la mentira de la soledad.',
    recursos: ['Laptop comunitaria', 'Pantalla para cine-foro y asambleas', 'Biblioteca del Encuentro'] },
  { n: '2', word: 'Aprender', kicker: 'La intención se vuelve capacidad',
    text: 'Talleres, formación y pensamiento crítico. Escuchamos qué necesita de verdad cada comunidad. La buena voluntad, sola, se agota; acá se convierte en herramienta.',
    recursos: ['Cartillas de derechos en lenguaje sencillo', 'Mapa de la Dignidad para saber a qué institución acudir, cómo hacerlo y qué requisitos necesitás'] },
  { n: '3', word: 'Actuar', kicker: 'Dejar una huella que se pueda medir',
    text: 'Cuando ya somos comunidad, actuamos. Comités ciudadanos, planes concretos, compromisos que no dependen de que otro los cumpla por nosotros.',
    recursos: ['Kit de organización', 'Semillas de Diálogo'] },
  { n: '4', word: 'Volver a conectar', kicker: 'Y la rueda empieza a moverse',
    text: 'Cada acción devuelve a la comunidad algo que antes no tenía: experiencia, datos, confianza. Con eso se vuelve a conectar, y el círculo arranca otra vez un poco más arriba.' }
];

export const DIMS = [
  'Comunidades movilizadas', 'Personas articuladas', 'Espacios creados', 'Conversaciones iniciadas',
  'Liderazgos fortalecidos', 'Iniciativas impulsadas', 'Alianzas construidas', 'Territorios acompañados'
];

/* Dates are tentative — the copy says so — but real ISO values let the
   page state how far away the first plaza is, in the present tense. */
/* La agenda, que ahora lleva dentro lo que antes era una sección
   aparte: cada fecha ES una de las primeras olas. Estaban repetidas —
   el nombre y el lema en un sitio, el día y el lugar en otro— y había
   que leer dos secciones para entender una sola cosa. */
export const AGENDA = [
  /* Fechas tentativas, a un horizonte de noviembre y diciembre: antes
     caían a tres semanas vista y la agenda parecía anunciar encuentros
     ya encima, con lugar y hora todavía sin confirmar. Los días son
     sábados reales de 2026, para que la etiqueta no mienta. */
  { iso: '2026-11-21', label: 'SÁB 21 NOV', slug: 'democracia', color: 'var(--blue)',
    name: 'Marea Democrática',
    tag: 'La conversación que nos une',
    text: 'Recuperamos el espacio público para el debate cívico y sumamos gente a un Comité Ágora.',
    title: 'Primer encuentro: la conversación que nos une',
    cause: 'Democracia Viva en Comunidad',
    place: 'San José · lugar y hora por confirmar' },

  { iso: '2026-12-05', label: 'SÁB 5 DIC', slug: 'economias', color: 'var(--yellow)',
    name: 'El Sabor de lo Nuestro',
    tag: 'Economía que conecta',
    text: 'Un puente entre el campo y la ciudad, con comidas anfitrionas y una plataforma justa.',
    cause: 'Economías que Conectan',
    place: 'lugar y hora por confirmar' },

  { iso: '2026-12-05', label: 'SÁB 5 DIC', slug: 'territorios', color: 'var(--green)',
    name: 'Siempre Verde',
    tag: 'Defender el agua es defender la vida',
    text: 'Comunidades que limpian, monitorean y le exigen cuentas a quienes contaminan.',
    cause: 'Territorios del Futuro',
    place: 'Sede por confirmar · cupos limitados' }
];

/* Las olas ya no viven aquí: cada una es una fecha de la agenda. Se
   quitó esta lista porque tenerla en dos sitios era justo lo que hacía
   que la misma información apareciera dos veces en la página. */
/* Las dos voces de la Revolución de las consciencias.
   El texto que antes hacía de entradilla («Ninguna transformación
   empezó en solitario…») está ahora dentro de la primera, que es de
   donde salía: era una cita partida en dos sitios. */
export const VOICES = [
  /* Las dos voces van sin firma: el render omite el pie cuando no hay
     `author`, así que no queda un elemento vacío alterando el ritmo. */
  {
    /* Abre directamente con el golpe: el párrafo que lo precedía se
       mudó a «Salir del edificio gris», que es donde plantea el
       problema del aislamiento. */
    parrafos: [],
    golpe: 'Nadie avanza solo.',
    despues: [
      'No es solamente reconocer que, en algún momento del camino, todos necesitamos de alguien más. Es también entender que nosotros podemos ser ese alguien para otros. Es acuerparnos. Es poner nuestro tiempo al servicio de los demás. Es tender una mano, compartir lo que sabemos, sostener cuando alguien cae y caminar juntos cuando el camino se vuelve difícil. Una sociedad se transforma cuando dejamos de preguntarnos solamente qué podemos recibir de los demás y comenzamos a preguntarnos qué podemos hacer por los demás. Antes de transformar una sociedad, tenemos que ser capaces de imaginarla.',
      'Ninguna transformación empezó en solitario. Todas empezaron con una idea capaz de ponernos de pie. Reunimos aquí algunas palabras de nuestros colaboradores. El verdadero poder político nace desde abajo. No reside en una institución, sino en las personas que le dan sentido. Antes de construir, debemos imaginar: imaginar narrativas que nos hagan más libres y comprender que el protagonismo no pertenece a un líder, sino a una ciudadanía que fortalece las instituciones porque ellas son el reflejo de quienes somos.'
    ]
  },
  {
    parrafos: [
      '¿Qué es una «Revolución de Consciencias»? Una revolución que no se hace con armas ni con discursos inflamatorios desde una tarima; se hace desmontando el cinismo y la resignación que nos hicieron creer que «nada o muy poco se puede cambiar». Es el instante preciso en el que un habitante deja de verse como un simple espectador o víctima de la política y se reconoce como usuario y responsable directo de la democracia. Es entender que los derechos no son herencias que se dan por sentadas, sino construcciones diarias que exigen nuestro cuidado, presencia y esfuerzo. Ocurre cuando comprendemos que antes de exigirle ética al Estado, debemos practicar la empatía, el diálogo y la solidaridad en nuestro metro cuadrado. Es pasar del «¿qué van a hacer por mí?» al «¿qué vamos a hacer juntos?».'
    ]
  }
];

/* Lupa Ciudadana cambió de objeto: ya no fiscaliza la gestión pública
   (eso vivía en «Gabinete Sombra», que se retira de aquí) sino que
   analiza cómo los medios cuentan lo que pasa — titulares, selección,
   encuadre y los componentes ideológicos del discurso público. No es
   partidista y no le dice a nadie qué pensar: hace visible cómo se
   construye la noticia para que cada quien pueda juzgarla. */
export const LUPA = [
  { n: '01', title: 'Explicadores',
    text: 'Qué se cuenta y qué se omite cuando un medio decide cómo mostrar un hecho. El oficio detrás del titular, explicado en lenguaje claro.',
    cta: 'Ver explicadores' },
  { n: '02', title: 'Observatorio de cobertura',
    text: 'Un registro público y comparado de titulares y tratamiento informativo entre medios, para discutir con hechos y no con impresiones.',
    cta: 'Ver el registro' },
  { n: '03', title: 'Narrativas y discurso',
    text: 'Identificamos los componentes ideológicos y las formas de construir hechos y actores en el discurso público. No decimos qué pensar: mostramos cómo se construye lo que ya se dijo.',
    cta: 'Conocer más' }
];

export const ALLIES = [
  'Academia', 'Cooperación', 'Gobiernos locales',
  'Organizaciones sociales', 'Red de Profesionales', 'Medios aliados'
];

/* Tres formas de sumarse, no cinco: Casa Ágora vive dentro de
   Presencia (cruzar la puerta es otra forma de dar tiempo) e
   Involucramiento vive dentro de Respaldo (un Paquete Ágora es otra
   forma de sostener). `extra` es una segunda invitación dentro del
   mismo bloque, no un cuarto/quinto bloque aparte — .paths sigue
   siendo una grilla de 3 columnas. */
export const JOIN = [
  { kicker: 'Con tu tiempo', title: 'Presencia',
    text: 'Voluntariado, talleres, jornadas en el territorio. Ser arquitecto o arquitecta de la narrativa que queremos cambiar.',
    cta: 'Quiero sumar tiempo',
    extra: { title: 'Casa Ágora',
      text: 'Un café, un taller, el mercado de los sábados. La forma más simple de empezar es cruzar la puerta.',
      cta: 'Conocé Casa Ágora', href: '#casa' } },
  { kicker: 'Con tu talento', title: 'Oficio',
    text: 'Comunicación, derecho, economía, diseño, psicología, ciencias sociales. La Red de Profesionales pone tu conocimiento al servicio de una causa.',
    cta: 'Sumar mi talento' },
  { kicker: 'Con tu apoyo', title: 'Respaldo',
    text: 'Si podés y querés. Cada moneda se invierte en acciones concretas y auditables, con cuentas abiertas.',
    cta: 'Apoyar',
    extra: { title: 'Involucramiento',
      text: 'Contratá o adquirí un Paquete Ágora: recibís algo concreto y útil, y financiás directamente el trabajo detrás de una causa.',
      cta: 'Ver los Paquetes Ágora', href: '#paquetes' } }
];
