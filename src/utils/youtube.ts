export const YT_ID = /^[A-Za-z0-9_-]{11}$/;

export type ThumbSize = "maxres" | "sd" | "hq" | "mq";

const FILE: Record<ThumbSize, string> = {
  maxres: "maxresdefault.jpg",
  sd: "sddefault.jpg",
  hq: "hqdefault.jpg",
  mq: "mqdefault.jpg",
};

/** Miniatura oficial servida por YouTube (no se descarga ni se redistribuye). */
export const thumbUrl = (id: string, size: ThumbSize = "hq") => `https://i.ytimg.com/vi/${id}/${FILE[size]}`;

/** Orden de respaldo cuando una resolución no existe. */
export const thumbChain = (id: string, first: ThumbSize): string[] => {
  const order: ThumbSize[] = ["maxres", "sd", "hq", "mq"];
  return order.slice(order.indexOf(first)).map((s) => thumbUrl(id, s));
};

export const watchUrl = (id: string, vertical = false) =>
  vertical ? `https://www.youtube.com/shorts/${id}` : `https://www.youtube.com/watch?v=${id}`;

/** Reproductor oficial en modo de privacidad mejorada. */
export const embedUrl = (id: string, opts: { autoplay?: boolean } = {}) => {
  const p = new URLSearchParams({ rel: "0", modestbranding: "1", playsinline: "1" });
  if (opts.autoplay) p.set("autoplay", "1");
  return `https://www.youtube-nocookie.com/embed/${id}?${p.toString()}`;
};

export const playlistEmbedUrl = (listId: string) =>
  `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(listId)}&rel=0`;

/**
 * Reproductor de la señal en vivo del canal. Si el canal no está transmitiendo,
 * YouTube lo indica dentro del propio reproductor: la web no lo presenta como "en vivo".
 */
export const liveEmbedUrl = (channelId: string) =>
  `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(channelId)}&autoplay=1&playsinline=1`;

export const playlistUrl = (listId: string) => `https://www.youtube.com/playlist?list=${encodeURIComponent(listId)}`;
