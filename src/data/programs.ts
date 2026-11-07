import { SITE } from "./site";
import type { Program } from "./types";

/**
 * Formatos identificables en fuentes públicas.
 * No se publican presentadores ni horarios que no estén confirmados.
 */
export const PROGRAMS: Program[] = [
  {
    slug: "meketrefes-en-vivo",
    name: "Meketrefes en vivo",
    tagline: "Transmisiones del canal con análisis, noticias y llamadas en vivo.",
    description: [
      "Las transmisiones de YouTube identificadas como «Meketrefes en vivo» acompañan a la Selección de Panamá, la LPF, las eliminatorias de Concacaf y otros eventos con análisis y conversación.",
      "Los títulos publicados mencionan formatos como narración y comentarios, análisis y llamadas en vivo. Las transmisiones grabadas quedan disponibles en el canal.",
    ],
    hosts: [],
    match: (v) => v.program === "meketrefes-en-vivo",
    links: [
      { label: "Transmisiones en YouTube", url: SITE.youtube.streams },
      { label: "Canal de YouTube", url: SITE.youtube.url },
    ],
    accent: "blue",
  },
  {
    slug: "show-de-la-lpf",
    name: "El Show de la LPF",
    tagline: "El fútbol de Panamá: tabla, clasificados, finales y lo mejor de cada jornada.",
    description: [
      "Programa dedicado a la Liga Panameña de Fútbol. Los episodios publicados repasan la tabla de posiciones, analizan la jornada y recogen los mejores momentos.",
      "También incluye conversaciones con protagonistas del torneo local.",
    ],
    hosts: [],
    match: (v) => v.program === "show-de-la-lpf",
    links: [{ label: "Ver en YouTube", url: SITE.youtube.videos }],
    accent: "lime",
  },
  {
    slug: "podcasts",
    name: "Podcasts de fútbol internacional",
    tagline: "Serie A y liga española, comentadas desde Panamá.",
    description: [
      "Episodios en formato podcast sobre las grandes ligas europeas: jornadas del calcio italiano, fichajes y la liga española.",
    ],
    hosts: [],
    match: (v) => v.program === "podcasts",
    links: [{ label: "Ver en YouTube", url: SITE.youtube.videos }],
    accent: "navy",
  },
  {
    slug: "en-shok-multimedia",
    name: "Meketrefes del Deporte en Shok Multimedia",
    tagline: "Una hora de debate, análisis y humor, en streaming y en radio.",
    description: [
      "Shok Multimedia presenta el programa como una hora diaria de debate, análisis y humor con invitados, disponible en streaming y en radio.",
      "La página del programa en Shok Multimedia no menciona a los presentadores, así que esta demo no los nombra.",
    ],
    schedule: {
      text: `Lunes a viernes, 11:00 a. m. – 12:00 p. m. · Streaming y ${SITE.shok.radio}`,
      source: "Página del programa en Shok Multimedia",
      sourceUrl: SITE.shok.programUrl,
      consulted: SITE.verifiedOn,
    },
    hosts: [],
    links: [
      { label: "Página del programa", url: SITE.shok.programUrl },
      { label: "Señal de Shok Multimedia", url: SITE.shok.liveUrl },
    ],
    accent: "blue",
  },
];

export const programBySlug = (slug: string) => PROGRAMS.find((p) => p.slug === slug);
