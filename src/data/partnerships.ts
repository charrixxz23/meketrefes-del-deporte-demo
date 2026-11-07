import type { Partnership } from "./types";

/** Espacios comerciales CONCEPTUALES. Ninguno está vendido ni representa un acuerdo real. */
export const PARTNERSHIPS: Partnership[] = [
  {
    id: "transmisiones",
    name: "Presentador de las transmisiones",
    placement: "Meketrefes en vivo",
    description: "Marca asociada a las transmisiones del canal: mención de apertura y cierre, rótulo en pantalla y enlace en la descripción.",
    formats: ["Mención en vivo", "Rótulo en pantalla", "Enlace en descripción"],
  },
  {
    id: "show-lpf",
    name: "Patrocinio de El Show de la LPF",
    placement: "Programa semanal del fútbol de Panamá",
    description: "Integración en la tabla de posiciones y en el segmento de mejores momentos de cada jornada.",
    formats: ["Segmento patrocinado", "Cortinilla", "Página del programa"],
  },
  {
    id: "web-editorial",
    name: "Espacio editorial en la web",
    placement: "Portada y notas",
    description: "Formato nativo dentro de la portada y de las notas, identificado siempre como contenido patrocinado.",
    formats: ["Portada", "Notas", "Boletín (futuro)"],
  },
  {
    id: "shorts",
    name: "Serie de Shorts de marca",
    placement: "Shorts y redes sociales",
    description: "Serie corta en formato vertical creada con el estilo del medio para YouTube Shorts e Instagram.",
    formats: ["YouTube Shorts", "Instagram", "X"],
  },
];
