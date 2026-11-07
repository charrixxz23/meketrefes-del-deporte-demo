/**
 * Datos institucionales de la demo. Todo lo que aparece aquí se verificó en fuentes
 * públicas el 6 de noviembre de 2026 (ver docs/content-sources.md).
 * Para una versión oficial basta con editar este archivo.
 */
export const SITE = {
  name: "Meketrefes del Deporte",
  shortName: "Meketrefes",
  country: "Panamá",
  /** Identificador temporal: no es el logotipo oficial. */
  demoMark: "MK",
  isOfficial: false,
  disclaimer: "Demo conceptual independiente. No es un sitio oficial de Meketrefes del Deporte.",
  developer: { name: "charrixxz23", url: "https://github.com/charrixxz23" },
  repoUrl: "https://github.com/charrixxz23/meketrefes-del-deporte-demo",
  /** Correo comercial verificado. null = no hay uno confirmado y el formulario funciona en modo demo. */
  contactEmail: null as string | null,
  verifiedOn: "2026-11-06",
  youtube: {
    channelId: "UCralRBxMBGVaPM7ENvnHpNA",
    handle: "@MeketrefesDelDeporte",
    url: "https://www.youtube.com/@MeketrefesDelDeporte",
    videos: "https://www.youtube.com/@MeketrefesDelDeporte/videos",
    shorts: "https://www.youtube.com/@MeketrefesDelDeporte/shorts",
    streams: "https://www.youtube.com/@MeketrefesDelDeporte/streams",
    playlists: "https://www.youtube.com/@MeketrefesDelDeporte/playlists",
    subscribe: "https://www.youtube.com/@MeketrefesDelDeporte?sub_confirmation=1",
  },
  socials: [
    {
      id: "youtube",
      label: "YouTube",
      handle: "@MeketrefesDelDeporte",
      url: "https://www.youtube.com/@MeketrefesDelDeporte",
      blurb: "Transmisiones, El Show de la LPF, podcasts y Shorts.",
    },
    {
      id: "instagram",
      label: "Instagram",
      handle: "@meketrefesdeldeporte",
      url: "https://www.instagram.com/meketrefesdeldeporte/",
      blurb: "Publicaciones y clips del día a día del medio.",
    },
    {
      id: "x",
      label: "X",
      handle: "@SportMeketrefes",
      url: "https://x.com/SportMeketrefes",
      blurb: "Reacciones y conversación en tiempo real.",
    },
  ],
  shok: {
    programUrl: "https://www.shokmultimedia.com/programas/maketrefes-del-deporte/",
    liveUrl: "https://www.shokmultimedia.com/envivo",
    radio: "93.3 FM",
  },
} as const;

export type SocialId = (typeof SITE.socials)[number]["id"];
