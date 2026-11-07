import { describe, expect, it } from "vitest";
import { ARTICLES } from "../../src/data/articles";
import { PARTNERSHIPS } from "../../src/data/partnerships";
import { PROGRAMS } from "../../src/data/programs";
import { SITE } from "../../src/data/site";
import { TOPICS } from "../../src/data/topics";
import { TOUR_STEPS } from "../../src/data/tour";
import { FEATURED_VIDEO_ID, PLAYLISTS, VIDEOS } from "../../src/data/videos";
import { YT_ID } from "../../src/utils/youtube";

describe("catálogo de contenido", () => {
  it("los videos tienen identificadores de YouTube válidos y únicos", () => {
    const ids = VIDEOS.map((v) => v.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(YT_ID);
  });

  it("cada video tiene título original, titular y categoría conocida", () => {
    for (const v of VIDEOS) {
      expect(v.title.trim().length).toBeGreaterThan(5);
      expect(v.headline.trim().length).toBeGreaterThan(5);
      expect(TOPICS[v.topic]).toBeDefined();
      expect(v.channel).toBe("MeketrefesDelDeporte");
    }
  });

  it("no se publican fechas sin verificar", () => {
    for (const v of VIDEOS) if (v.publishedAt) expect(v.publishedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("los Shorts están marcados como verticales y el resto no", () => {
    for (const v of VIDEOS) expect(Boolean(v.vertical)).toBe(v.format === "short");
  });

  it("el video destacado existe y es horizontal", () => {
    const v = VIDEOS.find((x) => x.id === FEATURED_VIDEO_ID);
    expect(v).toBeDefined();
    expect(v?.vertical).toBeFalsy();
  });

  it("los programas referenciados por los videos existen", () => {
    const slugs = new Set(PROGRAMS.map((p) => p.slug));
    for (const v of VIDEOS) if (v.program) expect(slugs.has(v.program)).toBe(true);
  });

  it("las listas tienen identificador de playlist", () => {
    for (const p of PLAYLISTS) expect(p.id).toMatch(/^PL[\w-]{16,}$/);
  });
});

describe("notas y programas", () => {
  it("cada nota tiene slug único, fuente y, si cita un video, ese video existe", () => {
    const slugs = ARTICLES.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const a of ARTICLES) {
      expect(a.sources.length).toBeGreaterThan(0);
      for (const s of a.sources) expect(s.url).toMatch(/^https:\/\//);
      if (a.videoId) expect(VIDEOS.some((v) => v.id === a.videoId)).toBe(true);
    }
  });

  it("los horarios siempre citan su fuente y la fecha de consulta", () => {
    for (const p of PROGRAMS) {
      if (!p.schedule) continue;
      expect(p.schedule.sourceUrl).toMatch(/^https:\/\//);
      expect(p.schedule.consulted).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("no hay presentadores sin verificar", () => {
    for (const p of PROGRAMS) expect(p.hosts).toEqual([]);
  });
});

describe("marca y comercial", () => {
  it("el aviso de demo es exactamente el requerido", () => {
    expect(SITE.disclaimer).toBe("Demo conceptual independiente. No es un sitio oficial de Meketrefes del Deporte.");
    expect(SITE.isOfficial).toBe(false);
  });

  it("no hay correo comercial inventado", () => {
    expect(SITE.contactEmail).toBeNull();
  });

  it("los espacios comerciales no nombran patrocinadores", () => {
    for (const p of PARTNERSHIPS) expect(Object.keys(p)).not.toContain("sponsor");
  });

  it("los enlaces sociales apuntan a dominios oficiales", () => {
    for (const s of SITE.socials) expect(s.url).toMatch(/^https:\/\/(www\.)?(youtube\.com|instagram\.com|x\.com)\//);
  });
});

describe("recorrido guiado", () => {
  it("cubre las 7 secciones pedidas en orden", () => {
    expect(TOUR_STEPS.map((s) => s.id)).toEqual(["inicio", "noticias", "videos", "shorts", "programas", "comunidad", "alianzas"]);
    for (const s of TOUR_STEPS) {
      expect(s.route.startsWith("/")).toBe(true);
      expect(s.target).toMatch(/^\[data-tour="[\w-]+"\]$/);
    }
  });
});
