export type TopicId =
  | "seleccion"
  | "lpf"
  | "centroamerica"
  | "internacional"
  | "beisbol"
  | "multideporte"
  | "sociedad"
  | "meketrefes";

export type FormatId = "transmision" | "show" | "podcast" | "entrevista" | "analisis" | "mejores" | "short";

export interface Video {
  /** Identificador de 11 caracteres de YouTube. */
  id: string;
  /** Título exactamente como aparece en YouTube (verificado vía oEmbed). */
  title: string;
  /** Titular limpio para la web (sin emojis ni separadores). No añade información. */
  headline: string;
  topic: TopicId;
  format: FormatId;
  /** Programa al que pertenece, si el título lo indica. */
  program?: string;
  vertical?: boolean;
  /** Canal que publica el video. */
  channel: "MeketrefesDelDeporte";
  /**
   * Fecha de publicación en ISO. Solo se rellena cuando está verificada.
   * En esta versión no se pudo verificar ninguna (ver docs/content-sources.md).
   */
  publishedAt?: string;
}

export interface Article {
  slug: string;
  kind: "nota-video" | "guia";
  headline: string;
  dek: string;
  topic: TopicId;
  /** Video asociado (fuente principal). */
  videoId?: string;
  body: string[];
  sources: { label: string; url: string; consulted?: string }[];
}

export interface Program {
  slug: string;
  name: string;
  tagline: string;
  description: string[];
  /** Horario solo si está publicado por una fuente verificable. */
  schedule?: { text: string; source: string; sourceUrl: string; consulted: string };
  /** Presentadores verificados. Vacío si no se han confirmado. */
  hosts: string[];
  /** Cómo se identifican sus videos. */
  match?: (v: Video) => boolean;
  playlistId?: string;
  links: { label: string; url: string }[];
  accent: "blue" | "lime" | "navy";
}

export interface Partnership {
  id: string;
  name: string;
  placement: string;
  description: string;
  formats: string[];
}
