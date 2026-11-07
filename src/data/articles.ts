import { SITE } from "./site";
import type { Article } from "./types";

const yt = (id: string) => ({ label: "Video en YouTube · Meketrefes del Deporte", url: `https://www.youtube.com/watch?v=${id}`, consulted: SITE.verifiedOn });

/**
 * Notas DEMOSTRATIVAS.
 * - "nota-video": presenta un video real del canal. El texto se redactó para la demo a partir
 *   del título público y NO atribuye declaraciones a nadie ni añade resultados.
 * - "guia": información verificable sobre el medio, con su fuente.
 */
export const ARTICLES: Article[] = [
  {
    slug: "panama-croacia-mundial-2026",
    kind: "nota-video",
    headline: "Panamá vs Croacia, en la transmisión de Meketrefes",
    dek: "El partido de la Selección en el Mundial 2026, vivido en el canal de YouTube del medio.",
    topic: "seleccion",
    videoId: "AA09bwfR-ek",
    body: [
      "Meketrefes del Deporte publicó en su canal la transmisión «Panamá vs Croacia en vivo», dentro de su cobertura de la Selección de Panamá en el Mundial 2026.",
      "La grabación completa está disponible en YouTube. Para el desarrollo del partido, el análisis y las opiniones, vea el video: esta nota no resume su contenido para no atribuir afirmaciones que no se han verificado.",
    ],
    sources: [yt("AA09bwfR-ek")],
  },
  {
    slug: "ghana-panama-debut-mundialista",
    kind: "nota-video",
    headline: "Ghana vs Panamá: el debut mundialista en el canal",
    dek: "La transmisión que Meketrefes dedicó al debut de Panamá en la Copa del Mundo.",
    topic: "seleccion",
    videoId: "94Qp1Mu64SI",
    body: [
      "Con el título «Ghana vs Panamá en vivo | Debut mundialista», el canal publicó su transmisión del estreno de la Selección en el Mundial.",
      "Esta es una nota de demostración que enlaza a la fuente original. El contenido de la transmisión se consulta en el video.",
    ],
    sources: [yt("94Qp1Mu64SI")],
  },
  {
    slug: "delantero-de-panama-mundial",
    kind: "nota-video",
    headline: "El delantero de Panamá para el Mundial, a debate",
    dek: "Una transmisión dedicada a la elección del delantero de la Selección.",
    topic: "seleccion",
    videoId: "r2MoF5OCul4",
    body: [
      "«Definido el delantero de Panamá, el elegido para el Mundial» es el tema de esta transmisión del canal.",
      "Quién es el elegido y qué opinan los Meketrefes se cuenta en el video. Esta nota de ejemplo no lo resume para no atribuir afirmaciones.",
    ],
    sources: [yt("r2MoF5OCul4")],
  },
  {
    slug: "cuantos-millones-panama-mundial",
    kind: "nota-video",
    headline: "¿Cuánto dinero puede recibir Panamá por jugar el Mundial 2026?",
    dek: "Un video del canal sobre lo que representa el Mundial para Panamá en premios.",
    topic: "seleccion",
    videoId: "cem-rA4W10k",
    body: [
      "El canal plantea la pregunta «¿Cuántos millones ganará Panamá en el Mundial 2026?».",
      "Las cifras y su explicación están en el video. Esta demo no reproduce montos que no ha verificado.",
    ],
    sources: [yt("cem-rA4W10k")],
  },
  {
    slug: "final-lpf-universitario-plaza-amador",
    kind: "nota-video",
    headline: "Universitario vs Plaza Amador: la final de la LPF, con narración y comentarios",
    dek: "La transmisión de la final del torneo local, publicada en el canal.",
    topic: "lpf",
    videoId: "QJD4pZCQOko",
    body: [
      "Meketrefes del Deporte publicó una transmisión con narración y comentarios de la final de la Liga Panameña de Fútbol entre Universitario y Plaza Amador.",
      "El resultado y las incidencias se consultan en el video original.",
    ],
    sources: [yt("QJD4pZCQOko")],
  },
  {
    slug: "show-lpf-tabla-y-analisis",
    kind: "nota-video",
    headline: "El Show de la LPF repasa la tabla y analiza la jornada",
    dek: "Un episodio del programa dedicado al fútbol de Panamá.",
    topic: "lpf",
    videoId: "u9so3gnyjNE",
    body: [
      "En este episodio de El Show de la LPF, el canal revisa la tabla de posiciones y analiza la jornada del fútbol panameño.",
      "La tabla mostrada corresponde al momento en que se grabó el programa. Consulte el video para ver los datos.",
    ],
    sources: [yt("u9so3gnyjNE")],
  },
  {
    slug: "eliminatorias-concacaf-llamadas-en-vivo",
    kind: "nota-video",
    headline: "Eliminatorias de Concacaf, con llamadas del público",
    dek: "Una transmisión de análisis con participación en vivo de la audiencia.",
    topic: "centroamerica",
    videoId: "obvcPhXoXsA",
    body: [
      "«Meketrefes en vivo» dedicó esta transmisión al análisis de las eliminatorias de Concacaf, con llamadas en vivo.",
      "Es un ejemplo del formato participativo del medio, que la web puede destacar en una sección propia.",
    ],
    sources: [yt("obvcPhXoXsA")],
  },
  {
    slug: "panamenos-de-moda",
    kind: "nota-video",
    headline: "Panameños de moda: el fútbol panameño en su mejor momento",
    dek: "Un video sobre el momento de los futbolistas panameños.",
    topic: "internacional",
    videoId: "1G03uAzd9jc",
    body: [
      "El canal analiza el momento del fútbol panameño bajo el título «Panameños están de moda».",
      "Los nombres y datos que se mencionan están en el video original.",
    ],
    sources: [yt("1G03uAzd9jc")],
  },
  {
    slug: "racismo-en-los-deportes",
    kind: "nota-video",
    headline: "Racismo en los deportes, desde la psicología",
    dek: "Un análisis que va más allá del resultado.",
    topic: "sociedad",
    videoId: "EfNHB_dxkh0",
    body: [
      "Meketrefes del Deporte publicó un análisis psicológico sobre el racismo en los deportes.",
      "Es un ejemplo de contenido de opinión y contexto que puede tener su propio espacio editorial.",
    ],
    sources: [yt("EfNHB_dxkh0")],
  },
  {
    slug: "meketrefes-a-la-television",
    kind: "guia",
    headline: "Meketrefes del Deporte llega a la televisión",
    dek: "El canal anunció su paso a la televisión en dos videos.",
    topic: "meketrefes",
    videoId: "rLQDwCC-UWM",
    body: [
      "En su canal de YouTube, el medio publicó «Contenido exclusivo | Meketrefes del Deporte se va a la televisión, todos los detalles» y «Meketrefes del Deporte a la televisión | Lo nuevo en Panamá».",
      "Los detalles del anuncio, como el canal y el horario, se explican en esos videos. Esta demo no los repite porque no pudo confirmar si siguen vigentes.",
    ],
    sources: [yt("rLQDwCC-UWM"), yt("H-AvGVTs0ks")],
  },
  {
    slug: "meketrefes-en-shok-multimedia",
    kind: "guia",
    headline: "De lunes a viernes, una hora de Meketrefes en Shok Multimedia",
    dek: "Debate, análisis y humor en streaming y en el 93.3 FM, según la página del programa.",
    topic: "meketrefes",
    body: [
      "La página del programa en Shok Multimedia lo describe como una hora diaria de debate, análisis y humor con invitados expertos, en streaming y en radio.",
      "El horario publicado es de lunes a viernes, de 11:00 a. m. a 12:00 p. m., en el 93.3 FM. Se consultó el 6 de noviembre de 2026; conviene confirmar con el equipo que siga vigente.",
    ],
    sources: [{ label: "Shok Multimedia · Meketrefes del Deporte", url: SITE.shok.programUrl, consulted: SITE.verifiedOn }],
  },
  {
    slug: "donde-seguir-a-meketrefes",
    kind: "guia",
    headline: "Dónde seguir a Meketrefes del Deporte",
    dek: "YouTube, Instagram, X y la radio: las plataformas públicas del medio.",
    topic: "meketrefes",
    body: [
      "En YouTube (@MeketrefesDelDeporte) están las transmisiones, El Show de la LPF, los podcasts y los Shorts.",
      "En Instagram el medio publica como @meketrefesdeldeporte y en X como @SportMeketrefes. El programa también se emite en Shok Multimedia.",
    ],
    sources: [
      { label: "YouTube · @MeketrefesDelDeporte", url: SITE.youtube.url, consulted: SITE.verifiedOn },
      { label: "Instagram · @meketrefesdeldeporte", url: "https://www.instagram.com/meketrefesdeldeporte/" },
      { label: "X · @SportMeketrefes", url: "https://x.com/SportMeketrefes" },
    ],
  },
];

export const articleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);
