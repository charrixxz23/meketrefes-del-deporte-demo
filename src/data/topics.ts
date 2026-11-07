import type { FormatId, TopicId } from "./types";

export const TOPICS: Record<TopicId, { label: string; short: string }> = {
  seleccion: { label: "Selección de Panamá", short: "Selección" },
  lpf: { label: "Fútbol de Panamá (LPF)", short: "LPF" },
  centroamerica: { label: "Centroamérica y Concacaf", short: "Concacaf" },
  internacional: { label: "Fútbol internacional", short: "Internacional" },
  beisbol: { label: "Béisbol", short: "Béisbol" },
  multideporte: { label: "Juegos y multideporte", short: "Multideporte" },
  sociedad: { label: "Deporte y sociedad", short: "Sociedad" },
  meketrefes: { label: "Meketrefes", short: "Meketrefes" },
};

export const FORMATS: Record<FormatId, string> = {
  transmision: "Transmisión publicada",
  show: "Programa",
  podcast: "Podcast",
  entrevista: "Entrevista",
  analisis: "Análisis y debate",
  mejores: "Mejores momentos",
  short: "Short",
};

export const TOPIC_ORDER: TopicId[] = [
  "seleccion",
  "lpf",
  "centroamerica",
  "internacional",
  "beisbol",
  "multideporte",
  "sociedad",
  "meketrefes",
];
