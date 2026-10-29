export const PHRASES = [
  "\xBFY si el futuro dependiera de lo que somos capaces de imaginar juntos?",
  "\xBFY si la democracia comenzara en nuestra imaginaci\xF3n?",
  "\xBFY si lo que hace falta ya existe y solo hay que conectarlo?",
  "\xBFY si el pa\xEDs que so\xF1amos comenzara por una idea compartida?",
  "Toda transformaci\xF3n comienza en la imaginaci\xF3n."
];
export const MARQUEE = [
  "Conectar",
  "Nadie Avanza Solo",
  "Construir Pa\xEDs",
  "Las instituciones son el reflejo de quienes somos",
  "Conectar es el principio",
  "Imaginar juntos"
];
export const ORDER = ["democracia", "comunidades", "economias"];
export const CAUSES = {
  democracia: {
    n: "01",
    cat: "Democracia Viva",
    color: "var(--blue)",
    hex: "#2438D8",
    flood: "#2438D8",
    video: "/assets/video/v02.mp4",
    poster: "/assets/img/p02.jpg",
    toma: "/assets/video/toma-democracia.mp4",
    desde: 0,
    hasta: 5.85,
    /* Sin `toma`: la marcha con banderas se leía como protesta. El
       índice pinta en su lugar el emblema de la causa (la red que se
       teje), que ya existía como respaldo. */
    title: "La democracia empieza cuando nos organizamos.",
    micro: "Conversaci\xF3n ciudadana, mirada cr\xEDtica sobre c\xF3mo se cuenta lo que pasa y liderazgo democr\xE1tico desde la adolescencia.",
    photo: "un c\xEDrculo de personas conversando en una plaza y una jornada comunitaria de vecinas y vecinos",
    cta: "Sumate a la conversaci\xF3n",
    problema: "Antes de que una democracia se caiga, se le nota en c\xF3mo habla. Empieza a desmoronarse cuando el insulto reemplaza al argumento. Y el aislamiento nos convence de que nuestra voz no sirve de nada por s\xED sola. Esa es la mentira que mejor nos gobierna. Hacernos creer que somos pocos. Porque una ciudadan\xEDa que se siente sola queda a merced de unos cuantos poderosos.",
    porque: "La democracia no se hereda, se construye, y toda construcci\xF3n exige mantenimiento. Recuperar el espacio p\xFAblico para el debate c\xEDvico es cuidar el terreno donde viven todos los dem\xE1s derechos; no buscamos unanimidad, buscamos conversaci\xF3n. Y ninguna transformaci\xF3n profunda comenz\xF3 en solitario: todas empezaron cuando personas comunes descubrieron que compart\xEDan la misma preocupaci\xF3n y decidieron actuar juntas.",
    /* Sin `quote` ni `stats` a propósito: la cita repetía casi palabra
       por palabra la primera línea de `problema`, y el bloque de datos
       anunciaba cifras que todavía no existen. Las otras dos causas sí
       los conservan — el render los pinta solo si están. */
    /* Marea Democrática todavía no existe como programa en marcha: se
       presenta como lo que es, una propuesta en construcción. Nada de
       fechas ni actividades que no estén confirmadas. */
    /* Los tres proyectos de la causa, en el orden en que se presentan. */
    trio: true,
    proyectoNombre: "Marea Democr\xE1tica \xB7 Lupa Ciudadana \xB7 Liderazgo democr\xE1tico en la Ni\xF1ez y Adolescencia",
    proyectoEstado: "En construcci\xF3n",
    proyecto: "Una serie de encuentros y convocatorias que Casa \xC1gora va abriendo, uno a uno, alrededor de distintos temas que nos afectan. Re\xFAnen a diferentes sectores y voces de la sociedad para conversar, problematizar esos temas y encontrar puntos de encuentro. A partir de esas conversaciones generamos mesas de trabajo para identificar prioridades y construir propuestas en conjunto.",
    hacemos: [
      "Conversatorios, encuentros y mesas de trabajo con Marea Democr\xE1tica",
      "Formaci\xF3n en pensamiento cr\xEDtico y observaci\xF3n del discurso p\xFAblico con Lupa Ciudadana",
      "Comit\xE9s de adolescentes que identifican problemas y llevan sus propuestas a donde se decide"
    ],
    logros: [
      "Que la queja se transforme en propuesta",
      "Que una comunidad vuelva a hablarse y no se sienta sola",
      "Una ciudadan\xEDa que mira con criterio lo que le cuentan",
      "Adolescentes que ejercen la democracia, no solo la estudian",
      "Conectar profesionales con proyectos reales",
      "Una agenda ciudadana construida entre muchos"
    ]
  },
  /* El tema paraguas «Economía y ambiente». Adentro, al mismo nivel,
     sus dos formas: Economías que conectan y Territorios del futuro
     (ver DIMENSIONES.economias). El slug sigue siendo `economias` para
     no romper enlaces. */
  economias: {
    n: "03",
    cat: "Ambiente y Econom\xEDa Circular",
    color: "var(--yellow)",
    hex: "#FFC22E",
    flood: "#FFC22E",
    /* El valle al atardecer, material propio de esta causa. El plano es
       lento, así que el fragmento aguanta el bucle sin cansar; los
       últimos 0.9 s funden contra el primer fotograma. La ciudad en
       sombra ocupa la mitad baja, que es donde va el titular. */
    video: "/assets/video/valle.mp4",
    poster: "/assets/img/valle.jpg",
    toma: "/assets/video/toma-economias.mp4",
    desde: 0,
    hasta: 5.95,
    title: "Ambiente y econom\xEDa circular van de la mano",
    phrase: "Tendemos un puente entre el campo y la ciudad, y cuidamos el territorio del que vivimos.",
    micro: "Una agenda ambiental que se construye entre muchas personas, mercados artesanales y peque\xF1as emprendedoras.",
    photo: "una mesa compartida en el campo y una feria vibrante de productos locales",
    cta: "Conect\xE1 tu econom\xEDa",
    problema: "El productor rural vende barato y la ciudad compra caro, y en el medio se pierde el v\xEDnculo. Sin ese puente, el campo se vac\xEDa y la ciudad se desconecta de lo que come y de qui\xE9n lo produce. Y el territorio del que todos vivimos se desgasta mientras cada quien mira para otro lado.",
    porque: "Detr\xE1s de cada feria y de cada emprendimiento hay personas que se conectan y comunidades que se sostienen. Una econom\xEDa circular y responsable cuida el territorio del que vive. El progreso siempre se construye en comunidad: nadie progresa solo.",
    quote: "El progreso siempre se construye en comunidad. Nadie progresa solo.",
    quoteSrc: "Manifiesto Casa \xC1gora",
    /* Sin `stats`: el bloque de cifras por documentar se retiró de esta
       causa, igual que en las otras dos. El render lo pinta, junto con
       su nota al pie, sólo si la lista está. */
    /* Mismo criterio que las otras dos: se nombra el proyecto, se dice
       en qué punto está y qué se está construyendo. Acá no se indica
       fase porque no hay una definida en el contenido existente. */
    proyectoNombre: "Siempre Verde \xB7 El Sabor de lo Nuestro",
    proyectoEstado: "En construcci\xF3n",
    proyecto: "Dos proyectos, uno por cada forma del tema. El Sabor de lo Nuestro: visitamos y compartimos una comida con una familia anfitriona en zonas rurales, aprendemos y ense\xF1amos emprendimiento rural, y construimos la plataforma que conecta a productores locales con un mercado justo. Siempre Verde: convocatorias abiertas para construir una agenda ambiental y despu\xE9s llevarla a la acci\xF3n. Cuando abran, se publican ac\xE1.",
    hacemos: [
      "Mercados artesanales y peque\xF1as emprendedoras",
      "Rutas campo\u2013ciudad y comidas anfitrionas",
      "Convocatorias para construir una agenda ambiental"
    ],
    logros: [
      "Emprendedoras que generan ingresos con lo que hacen",
      "Que quien produce acceda a un precio justo",
      "Una agenda ambiental construida entre muchos"
    ]
  },
  /* El tercer tema. Nombre en positivo a propósito: el Documento Madre
     no habla de «poblaciones vulnerables» sino de comunidades con
     memoria, conocimiento y capacidad de organizarse. Todo el contenido
     sale de Comunidad Ágora y Ágora Justa. Todavía no tiene proyecto
     propio con nombre: se dice así. */
  comunidades: {
    n: "02",
    cat: "Nadie queda afuera",
    color: "var(--coral)",
    hex: "#FF4B2B",
    flood: "#bc3720",
    video: "/assets/video/comunidades.mp4",
    toma: "/assets/video/toma-comunidades.mp4",
    desde: 0,
    hasta: 2.8,
    poster: "/assets/img/comunidades.jpg",
    title: "La sociedad avanza cuando nadie queda afuera.",
    phrase: "El punto de partida es la capacidad, no la carencia.",
    micro: "Derechos, encuentro y orientaci\xF3n para comunidades que enfrentan barreras de acceso: pueblos ind\xEDgenas, poblaci\xF3n LGBTIQA+, personas adultas mayores, ni\xF1ez y adolescencia, poblaci\xF3n penitenciaria.",
    cta: "Que nadie quede afuera",
    problema: "Hablar de \xABpoblaciones vulnerables\xBB suele esconder lo m\xE1s importante: la capacidad real de organizaci\xF3n de cada comunidad. La vulnerabilidad no es una identidad, es una circunstancia, muchas veces impuesta. Y cuando a una comunidad le toca defender lo suyo, casi siempre lo hace sola frente al sistema.",
    porque: "Un derecho que no se conoce, no se ejerce y no se defiende es, en la pr\xE1ctica, como si no existiera. Trabajamos con comunidades con memoria, conocimiento y capacidad de organizarse, para que nadie tenga que enfrentarse solo al sistema.",
    proyectoEstado: "En construcci\xF3n",
    proyectoNombre: "Capacitaciones en derechos humanos y rutas de exigibilidad",
    proyecto: "Capacitaciones en derechos humanos y en las rutas para acceder a la justicia y exigir que esos derechos se cumplan, pensadas con y para poblaciones y grupos vulnerabilizados.",
    hacemos: [
      "Talleres de derechos adaptados a la realidad de cada comunidad",
      "Encuentros y actividad cultural",
      "Orientaci\xF3n jur\xEDdica con PIDA y cartillas de derechos"
    ],
    logros: [
      "Que cada comunidad conozca y ejerza sus derechos",
      "Que nadie enfrente solo al sistema",
      "Comunidades que se organizan por cuenta propia"
    ]
  }
};
export const DIMENSIONES = {
  democracia: [
    {
      n: "01",
      id: "marea",
      emblema: "democracia",
      nombre: "Marea Democr\xE1tica",
      verbo: "encontrarnos, conversar y construir propuestas",
      kicker: "C\xF3mo funciona",
      title: "Conversar para construir propuestas",
      estado: "En construcci\xF3n",
      resumen: "Una serie de encuentros y convocatorias que Casa \xC1gora va abriendo, uno a uno, alrededor de distintos temas que nos afectan. Re\xFAnen a diferentes sectores y voces de la sociedad para conversar, problematizar esos temas y encontrar puntos de encuentro. A partir de esas conversaciones generamos mesas de trabajo para identificar prioridades y construir propuestas en conjunto.",
      hacemos: [
        "Convocatorias abiertas alrededor de distintos temas de inter\xE9s democr\xE1tico",
        "Encuentros que re\xFAnen a sectores y voces diferentes",
        "Mesas de trabajo para identificar problemas y prioridades",
        "Propuestas construidas en conjunto"
      ]
    },
    {
      n: "02",
      id: "lupa",
      emblema: "lupa",
      nombre: "Lupa Ciudadana",
      verbo: "observar c\xF3mo se construye el discurso p\xFAblico",
      lede: "\xBFC\xF3mo nos cuentan lo que est\xE1 pasando? Miramos con m\xE9todo c\xF3mo los medios eligen, tratan y narran la actualidad: qu\xE9 se cuenta, qu\xE9 se omite y qu\xE9 carga ideol\xF3gica trae. No te decimos qu\xE9 pensar. Te damos herramientas para observar, preguntar y discutir con argumentos.",
      deLupa: true,
      nota: "Secci\xF3n en construcci\xF3n \xB7 los contenidos se publicar\xE1n a partir del lanzamiento."
    },
    {
      n: "03",
      id: "ninez",
      emblema: "juventud",
      /* Sin acento propio: los tres proyectos van en el azul de la
         causa para que se lean como hermanos, no como invitados. */
      nombre: "Liderazgo democr\xE1tico en la Ni\xF1ez y Adolescencia",
      verbo: "formar liderazgo democr\xE1tico",
      /* La manifestación con pancartas hechas a mano: gente que se
         organiza y sale con su propia voz escrita. No hay metraje de
         infancia en el archivo, así que en vez de inventar una imagen
         tierna se usa la que sí está: el gesto que la causa quiere que
         aprendan a hacer. */
      toma: "/assets/video/v02.mp4",
      desde: 6.05,
      hasta: 7.9,
      video: "/assets/video/v05.mp4",
      poster: "/assets/img/p05.jpg",
      title: "La democracia no empieza en las instituciones. Empieza en la Ni\xF1ez y la Adolescencia.",
      phrase: "Liderazgo democr\xE1tico desde la ni\xF1ez y, especialmente, la adolescencia.",
      micro: "Comit\xE9s y espacios de participaci\xF3n liderados por adolescentes: identifican problemas, se organizan, deliberan y llevan sus propuestas hasta los espacios institucionales.",
      photo: "un grupo de adolescentes deliberando y organiz\xE1ndose en su comunidad",
      cta: "Sumate a esta causa",
      /* Lo único que la página muestra hoy de esta dimensión: el
         resumen y `hacemos`. Todo lo que sigue —problema, porqué,
         cita, stats, proyecto, logros, flow, sostenibilidad— se
         conserva escrito pero no se pinta: la sección tenía el doble
         de peso del que debía y se pidió aligerarla. */
      resumen: "Ni\xF1as, ni\xF1os y adolescentes ya tienen opini\xF3n sobre lo que pasa en su comunidad. Lo que suele faltarles es un lugar donde esa voz cuente de verdad. El liderazgo democr\xE1tico no se estudia, se aprende ejerci\xE9ndolo: hablando, escuchando, organiz\xE1ndose y llevando una propuesta hasta donde se decide. Eso es lo que abrimos: no una clase sobre democracia, sino un espacio para practicarla.",
      problema: "Si el prop\xF3sito de \xC1gora es promover una cultura democr\xE1tica, debemos asumir que la democracia no empieza en las instituciones: empieza en la formaci\xF3n de las personas. Una democracia necesita ciudadanos capaces de pensar, deliberar, convivir con quienes piensan distinto y participar activamente en los asuntos comunes; esa capacidad no aparece sola.",
      porque: "El liderazgo democr\xE1tico en la ni\xF1ez y la adolescencia es una de las causas fundamentales que \xC1gora impulsa, con el mismo peso que las dem\xE1s. Si queremos una cultura democr\xE1tica, no basta con esperar a la adultez: la democracia se aprende ejerci\xE9ndola desde temprano. No se trata de ense\xF1arles solamente qu\xE9 es la democracia, sino de darles la posibilidad de ejercerla. Nuestro diferencial es aportar el know-how para acompa\xF1ar ese proceso: transformar una conversaci\xF3n en una organizaci\xF3n; una organizaci\xF3n en una propuesta; y una propuesta en una acci\xF3n concreta con posibilidades reales de incidencia.",
      quote: "\xC1gora no deber\xEDa limitarse a ense\xF1arles qu\xE9 es la democracia: debe darles la posibilidad de ejercerla.",
      quoteSrc: "Propuesta Casa \xC1gora",
      stats: ["comit\xE9s juveniles", "adolescentes participando", "colegios y comunidades aliadas"],
      proyecto: "Una escuela pr\xE1ctica de democracia: comit\xE9s, grupos y espacios de participaci\xF3n liderados por adolescentes, donde no solo estudian la participaci\xF3n ciudadana, sino que la experimentan. Identifican un problema de su comunidad, se organizan, salen a escuchar a las personas afectadas, construyen una propuesta con el acompa\xF1amiento de \xC1gora y la llevan hacia los espacios institucionales que correspondan.",
      hacemos: [
        "Comit\xE9s y espacios de participaci\xF3n liderados por adolescentes",
        "Identificar problemas, organizarse, deliberar y formular propuestas",
        "Aprender c\xF3mo funcionan las instituciones y los mecanismos de incidencia",
        "Acompa\xF1amiento para convertir una idea en una acci\xF3n concreta"
      ],
      logros: [
        "Convertir una conversaci\xF3n en una organizaci\xF3n",
        "Una organizaci\xF3n en una propuesta",
        "Una propuesta en una acci\xF3n con incidencia real",
        "Adolescentes que ejercen la democracia, no solo la estudian"
      ],
      flow: [
        "Un grupo de adolescentes identifica un problema en su comunidad",
        "Se organiza y forma un comit\xE9",
        "Sale a la comunidad para escuchar y comprender",
        "Aprende de las personas afectadas",
        "Con el acompa\xF1amiento de \xC1gora, desarrolla una propuesta",
        "La propuesta se convierte en un plan de acci\xF3n",
        "Se intenta implementar o llevar a los espacios institucionales",
        "Se eval\xFAan los resultados y se vuelve a la comunidad",
        "Se aprende de nuevo, y el ciclo comienza otra vez"
      ],
      sostenibilidad: {
        titulo: "Un mecanismo que sostiene la causa",
        texto: "Los programas de formaci\xF3n en liderazgo democr\xE1tico, participaci\xF3n, pensamiento cr\xEDtico y organizaci\xF3n comunitaria est\xE1n dirigidos principalmente a j\xF3venes, ni\xF1ez y adolescencia. Algunos de estos procesos pueden financiarse a trav\xE9s de instituciones con capacidad de pago, y lo recaudado permite sostener y ampliar la misma formaci\xF3n para j\xF3venes de comunidades que no podr\xEDan costearla. No es una actividad comercial aparte: es el mecanismo que mantiene viva la causa y lleva la formaci\xF3n democr\xE1tica a m\xE1s adolescentes."
      }
    }
  ],
  /* Territorios del futuro, como subpunto de Economías que conectan:
     una economía circular y responsable cuida el territorio del que
     vive. Por ahora la propuesta es convocar para construir una agenda
     ambiental, y después ejecutarla. */
  economias: [
    {
      n: "01",
      id: "conectan",
      emblema: "economias",
      kicker: "C\xF3mo lo hacemos",
      nombre: "Econom\xEDas que conectan",
      verbo: "mercados que generan encuentro e ingresos",
      title: "Cuando la econom\xEDa local crece, crece el tejido social",
      resumen: "Relaciones directas entre quien produce y quien consume. Mercados artesanales en la casa, peque\xF1as emprendedoras y emprendedores locales, y un espacio donde mujeres en situaci\xF3n de vulnerabilidad puedan vender lo que hacen y generar ingresos. El Sabor de lo Nuestro, nuestro proyecto en construcci\xF3n, tiende adem\xE1s un puente entre el campo y la ciudad.",
      hacemos: [
        "Mercados artesanales en la casa",
        "Promover a peque\xF1as emprendedoras y emprendedores locales",
        "Un espacio donde mujeres en situaci\xF3n de vulnerabilidad puedan vender lo que hacen y generar ingresos",
        "Rutas campo\u2013ciudad y comidas anfitrionas"
      ]
    },
    {
      n: "02",
      id: "territorios",
      emblema: "territorios",
      kicker: "C\xF3mo empezamos",
      color: "var(--green)",
      hex: "#0FA36B",
      nombre: "Territorios del futuro",
      verbo: "construir juntos una agenda ambiental",
      title: "Defender el agua es defender la vida",
      resumen: "Una econom\xEDa circular y responsable cuida el territorio del que vive. Siempre Verde, nuestro proyecto en construcci\xF3n, empieza por convocar: encuentros abiertos para construir, entre todas y todos y desde lo local, una agenda ambiental. Despu\xE9s, llevarla a la acci\xF3n.",
      hacemos: [
        "Convocatorias abiertas para construir una agenda ambiental",
        "Decidir juntos por d\xF3nde empezar, desde lo local",
        "Llevar esa agenda a la acci\xF3n"
      ]
    }
  ]
};
export const DIMENSIONES_TITULO = {
  democracia: "Tres proyectos,<br>una misma causa",
  economias: "Econom\xEDas que conectan<br>y Territorios del futuro"
};
export const DIMENSIONES_LEDE = {
  democracia: "Una democracia viva necesita tres cosas a la vez. Lugares donde encontrarnos y convertir la conversaci\xF3n en propuesta. Herramientas para mirar con criterio lo que nos cuentan. Y nuevas generaciones que aprendan a ejercerla desde temprano. Por eso la causa avanza en tres proyectos que se alimentan entre s\xED."
};
export const PAQUETES = [
  {
    n: "01",
    id: "sujeto",
    nombre: "El Sujeto \xC1gora Pol\xEDtico",
    causa: "democracia",
    quien: "Cada persona, desde su capacidad individual de conocer y ejercer sus derechos.",
    resuelve: "Que un derecho que no se conoce, no se usa y no se defiende es, en la pr\xE1ctica, como si no existiera.",
    incluye: "Cartillas de derechos fundamentales, rutas para reclamarlos, formaci\xF3n con sentido cr\xEDtico y orientaci\xF3n cuando esos derechos se vulneran.",
    queRecibe: "Herramientas concretas para conocer y defender lo suyo: cartillas claras, rutas de reclamo y orientaci\xF3n cuando algo se vulnera.",
    queFinancia: "Sostiene la formaci\xF3n en pensamiento cr\xEDtico y participaci\xF3n ciudadana que Casa \xC1gora lleva a comunidades que no podr\xEDan costearla por s\xED solas."
  },
  {
    n: "02",
    id: "comunidad",
    nombre: "Comunidad \xC1gora",
    causa: "comunidades",
    quien: "Comunidades espec\xEDficas: pueblos ind\xEDgenas, poblaci\xF3n LGBTIQA+, personas adultas mayores, adolescencia, ni\xF1ez, poblaci\xF3n penitenciaria, entre otras.",
    resuelve: "Que hablar de \xABpoblaciones vulnerables\xBB invisibilice la capacidad real de organizaci\xF3n de esas comunidades.",
    incluye: "Casa \xC1gora como espacio f\xEDsico y simb\xF3lico de encuentro, talleres de derechos humanos adaptados a cada comunidad, actividad cultural y PIDA, acompa\xF1amiento sobre las v\xEDas legales que la ley ya pone a disposici\xF3n de la ciudadan\xEDa.",
    queRecibe: "Un espacio f\xEDsico y simb\xF3lico de encuentro, talleres de derechos adaptados a su realidad, actividad cultural y acompa\xF1amiento legal a trav\xE9s de PIDA.",
    queFinancia: "Financia la instalaci\xF3n de nuevas Casas \xC1gora y sostiene el acompa\xF1amiento legal para comunidades que hoy enfrentan solas al sistema."
  },
  {
    n: "03",
    id: "empresarial",
    nombre: "\xC1gora Empresarial",
    causa: "economias",
    quien: "Empresas dispuestas a involucrarse con una comunidad, m\xE1s all\xE1 de una donaci\xF3n puntual.",
    resuelve: "Que la responsabilidad social se haya reducido a un logo en una memoria anual o una donaci\xF3n con foto.",
    incluye: "Un puente de doble v\xEDa hacia una comunidad: tiempo, conocimiento, profesionales, espacios, voluntariado y, cuando corresponde, recursos econ\xF3micos, apropi\xE1ndose de una causa en el tiempo.",
    queRecibe: "Un puente real y sostenido con una comunidad: tiempo, conocimiento, profesionales, espacios y, cuando corresponde, recursos econ\xF3micos.",
    queFinancia: "Financia directamente el trabajo de Casa \xC1gora en el territorio: talleres, materiales, Comit\xE9s \xC1gora y la operaci\xF3n de Casa \xC1gora."
  },
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
  /* Con la reestructura de temas, Comunidad Ágora y Ágora Justa pasan
     a sostener «Nadie queda afuera»: las dos trabajan con comunidades
     que hoy enfrentan solas al sistema. */
  {
    n: "04",
    id: "justa",
    nombre: "\xC1gora Justa",
    causa: "comunidades",
    quien: "Personas y comunidades a las que les toca defender lo suyo frente al sistema, y que hoy lo hacen solas.",
    resuelve: "Que nadie deber\xEDa enfrentarse solo al sistema cuando le toca defender lo suyo.",
    incluye: "Con el IIRESODH, Casa \xC1gora pone a disposici\xF3n PIDA: una herramienta de inteligencia artificial especializada y curada que ayuda a investigar y comprender temas jur\xEDdicos, identificar posibles v\xEDas legales, analizar documentos y generar insumos para procesos jur\xEDdicos, incluyendo recursos de amparo. Una persona revisa cada resultado antes de que se convierta en una acci\xF3n real: no es una IA que sustituye a nadie, es tecnolog\xEDa, conocimiento jur\xEDdico y revisi\xF3n humana.",
    queRecibe: "Ayuda concreta para entender un tema jur\xEDdico, identificar las v\xEDas legales que existen, analizar documentos y preparar los insumos de un proceso, siempre con revisi\xF3n humana antes de que algo se convierta en una acci\xF3n.",
    queFinancia: "Sostiene el acceso a la justicia que Casa \xC1gora abre junto al IIRESODH: los recursos que genera la casa tambi\xE9n se convierten en acceso a derechos."
  }
];
export const CYCLE = [
  {
    n: "1",
    word: "Conectar",
    kicker: "Romper el aislamiento",
    text: "Nos encontramos cara a cara. Descubrimos que no \xE9ramos los \xFAnicos que se preocupan. Esa es la primera grieta que le abrimos a la mentira de la soledad."
  },
  {
    n: "2",
    word: "Aprender",
    kicker: "La intenci\xF3n se vuelve capacidad",
    text: "Talleres, formaci\xF3n y pensamiento cr\xEDtico. Escuchamos qu\xE9 necesita de verdad cada comunidad. La buena voluntad, sola, se agota; ac\xE1 se convierte en herramienta."
  },
  {
    n: "3",
    word: "Actuar",
    kicker: "Dejar una huella que se pueda medir",
    text: "Cuando ya somos comunidad, actuamos. Comit\xE9s ciudadanos, planes concretos, compromisos que no dependen de que otro los cumpla por nosotros."
  },
  {
    n: "4",
    word: "Volver a conectar",
    kicker: "Y la rueda empieza a moverse",
    text: "Lo que se aprende no se queda ac\xE1. Cada comunidad e iniciativa que se fortalece sigue por su cuenta y se vuelve punto de encuentro para la siguiente. Nosotros soltamos; el c\xEDrculo sigue."
  }
];
export const DIMS = [
  "Comunidades movilizadas",
  "Personas articuladas",
  "Espacios creados",
  "Conversaciones iniciadas",
  "Liderazgos fortalecidos",
  "Iniciativas impulsadas",
  "Alianzas construidas",
  "Territorios acompa\xF1ados"
];
export const AGENDA = [
  {
    estado: "Conversar",
    color: "var(--blue)",
    name: "Conversatorios, encuentros y Pol\xEDtica Nocturna",
    tag: "Conversar para entendernos",
    text: "Conversatorios, encuentros ciudadanos, mesas de di\xE1logo y Pol\xEDtica Nocturna: espacios para reunir voces distintas, hablar de lo que nos afecta y construir propuestas."
  },
  {
    estado: "Aprender",
    color: "var(--coral)",
    name: "Talleres y cursos",
    tag: "Aprender haciendo",
    text: "Talleres para conocer y ejercer derechos y aprender a organizarse, cursos en democracia y derechos humanos, y tambi\xE9n talleres art\xEDsticos, de cuentacuentos y de manualidades."
  },
  {
    estado: "Disfrutar y crear",
    color: "var(--green)",
    name: "Cine-foro, cultura y encuentro",
    tag: "El disfrute tambi\xE9n es un derecho",
    text: "Cine-foro, karaoke, m\xFAsica y arte: encuentros donde disfrutar juntas y juntos tambi\xE9n es una manera de hacer comunidad."
  }
];
export const VOICES = [
  /* Las dos voces van sin firma: el render omite el pie cuando no hay
     `author`, así que no queda un elemento vacío alterando el ritmo. */
  {
    /* Abre directamente con el golpe: el párrafo que lo precedía se
       mudó a «Salir del edificio gris», que es donde plantea el
       problema del aislamiento. */
    parrafos: [],
    golpe: "Nadie avanza solo.",
    despues: [
      "No es solamente reconocer que, en alg\xFAn momento del camino, todos necesitamos de alguien m\xE1s. Es tambi\xE9n entender que nosotros podemos ser ese alguien para otros. Es acuerparnos. Es poner nuestro tiempo al servicio de los dem\xE1s. Es tender una mano, compartir lo que sabemos, sostener cuando alguien cae y caminar juntos cuando el camino se vuelve dif\xEDcil. Una sociedad se transforma cuando dejamos de preguntarnos solamente qu\xE9 podemos recibir de los dem\xE1s y comenzamos a preguntarnos qu\xE9 podemos hacer por los dem\xE1s. Antes de transformar una sociedad, tenemos que ser capaces de imaginarla.",
      "Ninguna transformaci\xF3n empez\xF3 en solitario. Todas empezaron con una idea capaz de ponernos de pie. Reunimos aqu\xED algunas palabras de nuestros colaboradores. El verdadero poder pol\xEDtico nace desde abajo. No reside en una instituci\xF3n, sino en las personas que le dan sentido. Antes de construir, debemos imaginar: imaginar narrativas que nos hagan m\xE1s libres y comprender que el protagonismo no pertenece a un l\xEDder, sino a una ciudadan\xEDa que fortalece las instituciones porque ellas son el reflejo de quienes somos."
    ]
  },
  {
    parrafos: [
      "\xBFQu\xE9 es una \xABRevoluci\xF3n de Consciencias\xBB? Una revoluci\xF3n que no se hace con armas ni con discursos inflamatorios desde una tarima; se hace desmontando el cinismo y la resignaci\xF3n que nos hicieron creer que \xABnada o muy poco se puede cambiar\xBB. Es el instante preciso en el que un habitante deja de verse como un simple espectador o v\xEDctima de la pol\xEDtica y se reconoce como usuario y responsable directo de la democracia. Es entender que los derechos no son herencias que se dan por sentadas, sino construcciones diarias que exigen nuestro cuidado, presencia y esfuerzo. Ocurre cuando comprendemos que antes de exigirle \xE9tica al Estado, debemos practicar la empat\xEDa, el di\xE1logo y la solidaridad en nuestro metro cuadrado. Es pasar del \xAB\xBFqu\xE9 van a hacer por m\xED?\xBB al \xAB\xBFqu\xE9 vamos a hacer juntos?\xBB."
    ]
  }
];
export const LUPA = [
  {
    n: "01",
    title: "Explicadores",
    text: "Qu\xE9 se cuenta y qu\xE9 se omite cuando un medio decide c\xF3mo mostrar un hecho. El oficio detr\xE1s del titular, explicado en lenguaje claro.",
    cta: "Ver explicadores"
  },
  {
    n: "02",
    title: "Observatorio de cobertura",
    text: "Un registro p\xFAblico y comparado de titulares y tratamiento informativo entre medios, para discutir con hechos y no con impresiones.",
    cta: "Ver el registro"
  },
  {
    n: "03",
    title: "Narrativas y discurso",
    text: "Identificamos los componentes ideol\xF3gicos y las formas de construir hechos y actores en el discurso p\xFAblico. No decimos qu\xE9 pensar: mostramos c\xF3mo se construye lo que ya se dijo.",
    cta: "Conocer m\xE1s"
  }
];
export const ALLIES = [
  "Academia",
  "Cooperaci\xF3n",
  "Gobiernos locales",
  "Organizaciones sociales",
  "Red de Profesionales",
  "Medios aliados"
];
export const JOIN = [
  {
    id: "sumate-persona",
    kicker: "Soy una persona",
    title: "Quiero sumarme",
    text: "Con tu tiempo o con tu oficio. Contanos qu\xE9 sab\xE9s hacer y qu\xE9 te mueve, y buscamos d\xF3nde conectarte.",
    cta: "Quiero sumarme",
    primary: true
  },
  {
    id: "sumate-org",
    kicker: "Tenemos una iniciativa",
    title: "Comunidad, colectivo u organizaci\xF3n",
    text: "Si tu comunidad, colectivo u organizaci\xF3n tiene un proyecto o una necesidad, conversemos. Vemos c\xF3mo conectarte con asesor\xEDa t\xE9cnica y con oportunidades para que avance.",
    cta: "Escribinos"
  },
  {
    id: "sumate-apoyo",
    kicker: "Organizaciones, empresas y cooperaci\xF3n",
    title: "Sumarse a sostener",
    text: "Buscamos aliados que quieran ayudar a sostener el Paquete \xC1gora y los proyectos propios. Si quer\xE9s explorar c\xF3mo, conversemos.",
    cta: "Conocer el Paquete \xC1gora",
    href: "#paquete"
  }
];

