/**
 * Contenido de respaldo (copia y textos reales tomados del sitio actual
 * emcl.cl + afiche "Del mineral al producto" e info adicional de Raul).
 * Se usa hasta que el WordPress headless esté conectado.
 */
import type { WPService, WPContactInfo, WPSeoMeta } from '../lib/wp';

export const fallbackServices: WPService[] = [
  {
    id: 'crms',
    slug: 'materiales-de-referencia-certificados',
    title: 'Materiales de Referencia Certificados (MRC)',
    excerpt:
      'Desarrollo y suministro de Materiales de Referencia Certificados para el sector minero chileno.',
    image: '/img/servicios/crms.jpg',
    order: 1,
    content: [
      'Somos especialistas en el desarrollo y suministro de Materiales de Referencia Certificados (MRC) para el sector minero chileno, con trazabilidad metrológica al Sistema Internacional (SI) y cumplimiento de la Norma ISO 17034.',
      'Nuestros MRC respaldan análisis confiables de cobre, litio, oro y otros metales críticos, con procesos de caracterización, evaluación estadística y certificación que garantizan valores de referencia precisos y su incertidumbre asociada.',
      'Ideal para laboratorios de exploración, operación minera y control de calidad que necesitan validar sus métodos analíticos frente a un estándar confiable.',
    ],
  },
  {
    id: 'asesoria',
    slug: 'asesoria-experta-soporte-cientifico',
    title: 'Asesoría Experta y Soporte Científico',
    excerpt:
      'La experiencia y el conocimiento necesario para que su equipo logre la máxima eficiencia y precisión.',
    image: '/img/servicios/asesoria.jpg',
    order: 2,
    content: [
      'En EMCL no solo suministramos materiales; ofrecemos la experiencia y el conocimiento científico necesario para que su equipo logre la máxima eficiencia y precisión en sus procesos analíticos.',
      'Acompañamos a laboratorios de exploración, compañías mineras y laboratorios químico-metalúrgicos en el diseño e implementación de programas de aseguramiento y control de calidad (QA/QC), validación de métodos y buenas prácticas metrológicas.',
      'Nuestro soporte técnico ayuda a reducir errores analíticos, mejorar la trazabilidad de los resultados y cumplir con los requisitos de organismos acreditadores.',
    ],
  },
  {
    id: 'metales-criticos',
    slug: 'soluciones-metales-criticos',
    title: 'Soluciones para Metales Críticos y Competitividad',
    excerpt:
      'Soluciones personalizadas y adaptadas a las necesidades específicas del mercado de metales críticos.',
    image: '/img/servicios/metales-criticos.jpg',
    order: 3,
    content: [
      'EMCL se posiciona como un proveedor esencial en el mercado de metales críticos de Chile, ofreciendo soluciones personalizadas y adaptadas a las necesidades específicas de cada cliente.',
      'Desarrollamos materiales de referencia y soporte técnico especializado para litio, cobre y otros metales estratégicos, ayudando a las empresas mineras a reducir riesgos y asegurar la calidad de sus procesos frente a la creciente demanda internacional.',
      'Trabajamos con foco en trazabilidad, cumplimiento de normas internacionales y competitividad para la industria minera chilena y latinoamericana.',
    ],
  },
  {
    id: 'interlab',
    slug: 'ensayos-comparacion-interlaboratorios',
    title: 'Ensayos de Comparación Interlaboratorios',
    excerpt:
      'Control externo de la calidad: permite a los laboratorios demostrar la confiabilidad y comparabilidad de sus resultados.',
    image: '/img/servicios/interlab.jpg',
    order: 4,
  },
];

export const fallbackContact: WPContactInfo = {
  phone: '+56 9 9533 3306',
  whatsapp: '+56995333306',
  email: 'contacto@emcl.cl',
  address: 'Parcela 42, El Hinojal',
  city: 'La Serena',
  region: 'Región de Coquimbo',
  // Segundo teléfono visto en el afiche
  phoneSecondary: '+56 9 7967 1794',
  people: [
    { name: 'Marilyn Martín', email: 'marilyn.martin@emcl.cl', phone: '+56 9 7967 1794' },
    { name: 'M. Castillo', email: 'mcastillo@emcl.cl', phone: '+56 9 9533 3306' },
  ],
  socials: [
    { label: 'Facebook', url: '#' },
    { label: 'Instagram', url: 'https://www.instagram.com/emcl.chile/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/emcl-estandares-mineros-chile' },
    // TODO: confirmar URL exacta de Facebook cuando Raul la envíe
  ],
};

export const fallbackSeo: Record<string, WPSeoMeta> = {
  home: {
    title: 'EMCL | Materiales de Referencia Certificados para la Minería Chilena',
    description:
      'EMCL — Estándares Mineros Chile desarrolla y comercializa Materiales de Referencia Certificados (MRC), con trazabilidad metrológica y cumplimiento de normas internacionales. La precisión de hoy es la competitividad de mañana.',
  },
  empresa: {
    title: 'Empresa | EMCL — Estándares Mineros Chile',
    description:
      'Conoce EMCL (Estándares Mineros Chile), especializada en comercialización y elaboración de materiales de referencia certificados para la industria minera chilena.',
  },
  servicios: {
    title: 'Servicios | EMCL',
    description:
      'Servicios de EMCL: Materiales de Referencia Certificados, asesoría experta y soluciones para metales críticos.',
  },
  contacto: {
    title: 'Contacto | EMCL',
    description: 'Contáctanos: +56 9 9533 3306 · contacto@emcl.cl · La Serena, Región de Coquimbo.',
  },
  proyectos: {
    title: 'Proyectos | EMCL',
    description:
      'Conoce cómo EMCL ha apoyado a empresas mineras de Latinoamérica con materiales de referencia certificados y ensayos de comparación interlaboratorios.',
  },
};

export const siteContent = {
  brandFullName: 'Estándares Mineros Chile',
  brandTagline: 'Estándares de Referencia para la minería',
  hero: {
    tagline: 'La precisión de hoy es la competitividad de mañana',
  },
  quienesSomos: {
    heading: 'Quiénes Somos',
    body: 'Especializada en comercialización y elaboración de materiales de referencia certificados para la industria minera chilena.',
  },
  mision: {
    heading: 'Misión',
    body: 'Ofrecer soluciones científicas y técnicas de primer nivel que garanticen calidad, precisión y eficiencia.',
  },
  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Empresa', href: '/empresa' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Proyectos', href: '/proyectos' },
    { label: 'Contacto', href: '/contacto' },
  ],
};

/**
 * Del mineral al producto — proceso de 6 etapas (fuente: afiche EMCL).
 */
export const fallbackProcess = {
  eyebrow: 'Del mineral al producto',
  heading: 'El viaje de un material de referencia hasta la confianza que impulsa la minería',
  steps: [
    {
      number: '01',
      title: 'Origen',
      description: 'Selección de minerales de alta calidad desde fuentes controladas.',
    },
    {
      number: '02',
      title: 'Preparación',
      description: 'Conminución y homogeneización para garantizar uniformidad.',
    },
    {
      number: '03',
      title: 'Caracterización',
      description: 'Análisis químicos avanzados para determinar valores de referencia confiables.',
    },
    {
      number: '04',
      title: 'Evaluación',
      description: 'Evaluación estadística de datos para establecer valores confiables y sus incertidumbres.',
    },
    {
      number: '05',
      title: 'Certificación',
      description: 'Trazabilidad metrológica y cumplimiento de estándares internacionales.',
    },
    {
      number: '06',
      title: 'Producto',
      description: 'Envasado, etiquetado y listo para respaldar análisis confiables y resultados de calidad.',
    },
  ],
};

/**
 * Pilares de marca (fuente: afiche EMCL) — "Confianza técnica. Rigor
 * metrológico. Impacto real."
 */
export const fallbackPillars = {
  eyebrow: 'Confianza técnica. Rigor metrológico. Impacto real.',
  items: [
    {
      title: 'Rigor y Precisión',
      description: 'Decisiones basadas en datos confiables.',
    },
    {
      title: 'Estándares Globales',
      description: 'Alineados con los principales organismos internacionales.',
    },
    {
      title: 'Trazabilidad',
      description: 'Desde el origen hasta el resultado.',
    },
    {
      title: 'Compromiso',
      description: 'Con la excelencia operativa y la sostenibilidad.',
    },
    {
      title: 'Valor Compartido',
      description: 'Calidad que impulsa el desarrollo de la industria.',
    },
  ],
};

/**
 * Capacidades técnicas (franja inferior del afiche EMCL).
 */
export const fallbackCapabilities = [
  'Análisis químicos avanzados',
  'Control estadístico riguroso',
  'Trazabilidad metrológica',
  'Cumplimiento de normas internacionales',
  'Listos para uso en laboratorio e industria minera',
];

/**
 * Propósito / Misión / Visión / Alcance (afiche "Ciencia, Calidad y
 * Liderazgo Femenino") + propuesta de valor (afiche "Estándares de
 * Referencia para la minería").
 */
export const fallbackAbout = {
  purpose: {
    label: 'Propósito',
    text: 'Asegurar mediciones confiables para decisiones seguras.',
  },
  mission: {
    label: 'Misión',
    text: 'Desarrollar y proveer materiales de referencia de alta calidad para la minería.',
  },
  vision: {
    label: 'Visión',
    text: 'Ser referentes técnicos en calidad y confianza a nivel global.',
  },
  reach: {
    label: 'Alcance',
    text: 'Latinoamérica y el mundo.',
  },
  statement:
    'Seremos el Organismo técnico idóneo en la elaboración de materiales de referencia en Latinoamérica y el mundo, de manera que las empresas de exploración y mineras en general puedan reducir los riesgos asociados a estas áreas de inversión asegurando la calidad de sus procesos y servicios.',
};

/**
 * Propuesta de valor — franja de 4 íconos (afiche "Estándares de
 * Referencia para la minería").
 */
export const fallbackValueProps = [
  {
    title: 'Calidad',
    description: 'Materiales de referencia con trazabilidad y confiabilidad.',
  },
  {
    title: 'Precisión',
    description: 'Datos precisos para decisiones con seguridad.',
  },
  {
    title: 'Reducción de Riesgos',
    description: 'Menos incertidumbre, mayor confianza en cada resultado.',
  },
  {
    title: 'Alcance Global',
    description: 'Estándares que conectan a Latinoamérica y el mundo.',
  },
];

/**
 * Servicio adicional: Ensayos de Comparación Interlaboratorios
 * (afiche "Confiabilidad y Comparabilidad"). Se agrega como 4º servicio.
 */
export const fallbackInterlabService = {
  eyebrow: 'Confiabilidad y Comparabilidad',
  heading: 'Calidad que se demuestra, confianza que nos une',
  intro:
    'La confiabilidad y comparabilidad son esenciales en las mediciones analíticas. Nuestros ensayos de comparación interlaboratorios permiten a los laboratorios demostrar la confiabilidad y comparabilidad de sus resultados frente a otros laboratorios, fortaleciendo sus sistemas de aseguramiento de la calidad y cumpliendo con los requerimientos de organismos acreditadores.',
  benefits: [
    {
      title: 'Evaluar Desempeño',
      description: 'Permite evaluar el desempeño analítico y compararlo con otros laboratorios.',
    },
    {
      title: 'Identificar Desviaciones',
      description: 'Ayuda a identificar problemas o sesgos en los métodos o en la ejecución analítica.',
    },
    {
      title: 'Demostrar Confiabilidad',
      description: 'Entrega evidencia objetiva de la calidad y competencia técnica del laboratorio.',
    },
    {
      title: 'Cumplir Requisitos',
      description: 'Frecuentemente requerido por organismos acreditadores y clientes como parte del aseguramiento de la calidad.',
    },
    {
      title: 'Mejorar Procesos',
      description: 'Contribuye a la mejora continua de los procesos analíticos y de gestión del laboratorio.',
    },
  ],
  steps: [
    { number: '1', title: 'Preparación', description: 'Preparamos y caracterizamos materiales de ensayo de alta homogeneidad y estabilidad.' },
    { number: '2', title: 'Distribución', description: 'Enviamos el material de ensayo a todos los laboratorios participantes.' },
    { number: '3', title: 'Análisis', description: 'Cada laboratorio analiza el material utilizando sus métodos y procedimientos habituales.' },
    { number: '4', title: 'Evaluación Estadística', description: 'Evaluamos los resultados mediante análisis estadístico robusto para determinar el desempeño de cada laboratorio.' },
    { number: '5', title: 'Informe de Desempeño', description: 'Entregamos un informe confidencial con los resultados, evaluación y recomendaciones para la mejora continua.' },
  ],
  quote: 'Una herramienta objetiva que transforma los datos analíticos en evidencia de calidad, confianza y mejora continua.',
};

/**
 * Empresa creada y liderada por mujeres (afiche "Ciencia, Calidad y
 * Liderazgo Femenino").
 */
export const fallbackWomenLeadership = {
  badge: 'Empresa creada y liderada por mujeres',
  heading: 'Ciencia, Calidad y Liderazgo Femenino al servicio de la minería',
  intro:
    'EMCL es una empresa creada y liderada por mujeres comprometidas con la excelencia, la innovación y la calidad en la industria minera.',
  closing: 'Somos mujeres que lideran, inspiran y generan impacto.',
};


/**
 * Catálogo de Materiales de Referencia (MR) — valores vistos en los
 * frascos del afiche "Estándares de Referencia para la minería".
 * TODO: confirmar con Raul/cliente el listado completo y las
 * incertidumbres/certificados reales antes de publicar en producción.
 */
export const fallbackReferenceMaterials = [
  {
    code: 'MR-01',
    element: 'Fe',
    value: '3,85 %',
  },
  {
    code: 'MR-02',
    element: 'Cu',
    value: '1,23 %',
  },
  {
    code: 'MR-02',
    element: 'Au',
    value: '0,85 g/t',
  },
  {
    code: 'MR-03',
    element: 'Fe',
    value: '3,45 %',
  },
];

/**
 * Slider principal del home — copia exacta del sitio original emcl.cl
 * (3 slides, capturados directo del sitio en vivo).
 */
export const fallbackSlides = [
  {
    image: '/img/slider/slide-1.webp',
    title: 'Trazabilidad y Cumplimiento ISO en Laboratorio',
    text: 'Asegure la fiabilidad de sus resultados con trazabilidad al Sistema Internacional (SI) y cumplimiento de la Norma ISO 17034.',
    cta: 'Saber más',
    href: '/servicios',
  },
  {
    image: '/img/slider/slide-2.webp',
    title: 'Materiales de Referencia Certificados (MRC) para la Minería Chilena',
    text: 'Suministro de MRC para cobre, litio, oro y otros metales críticos. Garantizamos precisión y baja incertidumbre para sus análisis.',
    cta: 'Saber más',
    href: '/servicios',
  },
  {
    image: '/img/slider/slide-3.webp',
    title: 'Aseguramiento y Control de Calidad (QA/QC) Minero',
    text: 'Soluciones científicas para programas de QA/QC en exploración y operación, validando datos geoquímicos. La precisión de hoy es la competitividad de mañana.',
    cta: 'Saber más',
    href: '/servicios',
  },
];

/**
 * "Nuestra Empresa" — sección corta con foto, tal como aparece en el
 * sitio original justo después del slider principal.
 */
export const fallbackCompanyIntro = {
  eyebrow: 'Estándares Mineros Chile (EMCL)',
  heading: 'Nuestra Empresa',
  image: '/img/nuestra-empresa.jpg',
  paragraphs: [
    'EMCL es una empresa especializada en la comercialización y elaboración de materiales de referencia certificados (MRC) para la industria minera chilena. Nuestro propósito es ofrecer soluciones científicas y técnicas de primer nivel que garanticen la calidad, precisión y eficiencia en el sector minero.',
    'Somos un socio estratégico dedicado a impulsar la competitividad y sostenibilidad de nuestros clientes. Brindamos aseguramiento y control de calidad (QA/QC) a lo largo de toda la cadena de valor minera:',
  ],
  audiences: [
    'Empresas de exploración',
    'Compañías mineras',
    'Laboratorios químico-metalúrgicos',
  ],
};

/**
 * "Lo que ofrecemos" — franja de 6 íconos para la home.
 */
export const fallbackOfrecemos = [
  {
    icon: 'chat',
    title: 'Asesoría Especializada',
    description: 'Acompañamiento técnico para una toma de decisiones segura y eficiente.',
  },
  {
    icon: 'flask',
    title: 'Análisis y Evaluación',
    description: 'Interpretación de resultados para mejorar la calidad y confiabilidad de sus procesos.',
  },
  {
    icon: 'clipboard',
    title: 'Mejora de Procesos',
    description: 'Recomendaciones prácticas para optimizar métodos y aumentar la productividad.',
  },
  {
    icon: 'target',
    title: 'Eficiencia y Precisión',
    description: 'Soluciones basadas en evidencia científica para resultados confiables y comparables.',
  },
  {
    icon: 'shield',
    title: 'Confianza y Transparencia',
    description: 'Generan credibilidad ante clientes, inversionistas y partes interesadas en toda la cadena de valor.',
  },
  {
    icon: 'trending',
    title: 'Mejora Continua',
    description: 'Proporcionan información clave para la evaluación del desempeño y la mejora permanente.',
  },
];

/**
 * Valores organizacionales de EMCL.
 */
export const fallbackValues = {
  eyebrow: 'Nuestros Valores',
  items: [
    {
      title: 'Integridad',
      description: 'Actuamos con ética, transparencia y responsabilidad.',
    },
    {
      title: 'Colaboración',
      description: 'Trabajamos en equipo con respeto y confianza.',
    },
    {
      title: 'Excelencia',
      description: 'Buscamos la más alta calidad en todo lo que hacemos.',
    },
    {
      title: 'Sostenibilidad',
      description: 'Promovemos prácticas responsables con el entorno y la sociedad.',
    },
  ],
};
