export interface TourStep {
  id: string;
  title: string;
  text: string;
  route: string;
  /** Selector del componente real que se señala. */
  target: string;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: "inicio",
    title: "Inicio",
    text: "La portada abre con un video real del canal y lleva directo al programa, a las noticias y a YouTube.",
    route: "/",
    target: '[data-tour="hero"]',
  },
  {
    id: "noticias",
    title: "Noticias",
    text: "Busque y filtre por categoría. Cada nota enlaza a su fuente; las de esta demo están marcadas como demostrativas.",
    route: "/noticias",
    target: '[data-tour="news-tools"]',
  },
  {
    id: "videos",
    title: "Meketrefes TV",
    text: "El centro multimedia usa el reproductor oficial de YouTube y solo se carga cuando usted pulsa reproducir.",
    route: "/tv",
    target: '[data-tour="tv-player"]',
  },
  {
    id: "shorts",
    title: "Shorts",
    text: "Clips verticales con un visor pensado para el teléfono: deslice o use las flechas para pasar al siguiente.",
    route: "/shorts",
    target: '[data-tour="shorts-grid"]',
  },
  {
    id: "programas",
    title: "Programas",
    text: "Cada formato tiene su página con sus videos. El horario solo aparece cuando una fuente pública lo confirma.",
    route: "/programas",
    target: '[data-tour="programs"]',
  },
  {
    id: "comunidad",
    title: "Comunidad",
    text: "Los enlaces llevan a los perfiles oficiales del medio en YouTube, Instagram y X.",
    route: "/conocenos",
    target: '[data-tour="community"]',
  },
  {
    id: "alianzas",
    title: "Espacios comerciales",
    text: "Propuesta de espacios para marcas. Todos aparecen como disponibles: la demo no inventa patrocinadores.",
    route: "/alianzas",
    target: '[data-tour="slots"]',
  },
];
