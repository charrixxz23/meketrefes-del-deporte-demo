import { describe, expect, it } from "vitest";
import { relatedArticles, relatedVideos, search, SHORTS, LONG_VIDEOS, videoById } from "../../src/utils/catalog";
import { cleanTitle, formatDate, normalize } from "../../src/utils/text";
import { embedUrl, thumbChain, watchUrl } from "../../src/utils/youtube";
import { ARTICLES } from "../../src/data/articles";

describe("texto", () => {
  it("normaliza tildes, mayúsculas y signos", () => {
    expect(normalize("¡SELECCIÓN de Panamá!")).toBe("seleccion de panama");
  });
  it("limpia emojis y espacios no separables de los títulos", () => {
    expect(cleanTitle("🚨🇵🇦 PANAMÁ VS INDONESIA EN VIVO  MUNDIAL SUB 15")).toBe("PANAMÁ VS INDONESIA EN VIVO MUNDIAL SUB 15");
    expect(cleanTitle("A | B")).toBe("A | B");
  });
  it("formatea fechas en es-PA sin desfase de zona horaria", () => {
    expect(formatDate("2026-11-06")).toBe("6 de noviembre de 2026");
  });
});

describe("YouTube", () => {
  it("usa el modo de privacidad mejorada y no reproduce solo", () => {
    expect(embedUrl("AA09bwfR-ek")).toMatch(/^https:\/\/www\.youtube-nocookie\.com\/embed\/AA09bwfR-ek\?/);
    expect(embedUrl("AA09bwfR-ek")).not.toContain("autoplay");
    expect(embedUrl("AA09bwfR-ek", { autoplay: true })).toContain("autoplay=1");
  });
  it("construye la cadena de miniaturas de mayor a menor", () => {
    expect(thumbChain("abcdefghijk", "sd")).toEqual([
      "https://i.ytimg.com/vi/abcdefghijk/sddefault.jpg",
      "https://i.ytimg.com/vi/abcdefghijk/hqdefault.jpg",
      "https://i.ytimg.com/vi/abcdefghijk/mqdefault.jpg",
    ]);
  });
  it("enlaza Shorts con su URL propia", () => {
    expect(watchUrl("kEa_e49Zp-c", true)).toBe("https://www.youtube.com/shorts/kEa_e49Zp-c");
  });
});

describe("búsqueda y relacionados", () => {
  it("encuentra contenido sin tildes en notas, videos y programas", () => {
    const hits = search("seleccion");
    expect(hits.some((h) => h.type === "video")).toBe(true);
    expect(hits.some((h) => h.type === "article")).toBe(true);
    expect(search("show lpf").some((h) => h.type === "program")).toBe(true);
  });
  it("exige todas las palabras", () => {
    expect(search("podcast serie")).toHaveLength(search("podcast serie a").length);
    expect(search("podcast inexistentexyz")).toEqual([]);
  });
  it("una búsqueda vacía no devuelve nada", () => {
    expect(search("   ")).toEqual([]);
  });
  it("los relacionados no repiten el actual y respetan el formato vertical", () => {
    const v = LONG_VIDEOS[0];
    const rel = relatedVideos(v);
    expect(rel.map((r) => r.id)).not.toContain(v.id);
    expect(rel.every((r) => !r.vertical)).toBe(true);
    expect(relatedVideos(SHORTS[0]).every((r) => r.vertical)).toBe(true);
    const a = ARTICLES[0];
    expect(relatedArticles(a).map((r) => r.slug)).not.toContain(a.slug);
  });
  it("videoById devuelve undefined para ids desconocidos", () => {
    expect(videoById("noexiste000")).toBeUndefined();
  });
});
