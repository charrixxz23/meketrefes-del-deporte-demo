/** Minúsculas sin tildes para búsquedas tolerantes. */
export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Elimina emojis y espacios repetidos de un título de YouTube para mostrarlo como texto. */
export const cleanTitle = (s: string) =>
  s
    .replace(/[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}️‍]/gu, "")
    .replace(/ /g, " ")
    .replace(/\s+/g, " ")
    .trim();

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("es-PA", { day: "numeric", month: "long", year: "numeric", timeZone: "America/Panama" }).format(
    new Date(`${iso}T12:00:00-05:00`),
  );
