import { ARTICLES } from "../data/articles";
import { PROGRAMS } from "../data/programs";
import { TOPICS } from "../data/topics";
import type { Article, FormatId, Program, TopicId, Video } from "../data/types";
import { VIDEOS } from "../data/videos";
import { normalize } from "./text";

export const LONG_VIDEOS = VIDEOS.filter((v) => !v.vertical);
export const SHORTS = VIDEOS.filter((v) => v.vertical);

export const videoById = (id: string) => VIDEOS.find((v) => v.id === id);

export const videosBy = (f: { topic?: TopicId; format?: FormatId; program?: string }, list = LONG_VIDEOS) =>
  list.filter(
    (v) => (!f.topic || v.topic === f.topic) && (!f.format || v.format === f.format) && (!f.program || v.program === f.program),
  );

export const programVideos = (p: Program) => (p.match ? LONG_VIDEOS.filter(p.match) : []);

/** Relacionados: mismo programa, luego mismo tema, luego mismo formato. Sin repetir el actual. */
export const relatedVideos = (v: Video, n = 6) => {
  const score = (o: Video) =>
    (v.program && o.program === v.program ? 4 : 0) + (o.topic === v.topic ? 2 : 0) + (o.format === v.format ? 1 : 0);
  const pool = v.vertical ? SHORTS : LONG_VIDEOS;
  return pool
    .filter((o) => o.id !== v.id)
    .map((o, i) => ({ o, s: score(o), i }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, n)
    .map((x) => x.o);
};

export const relatedArticles = (a: Article, n = 3) =>
  ARTICLES.filter((o) => o.slug !== a.slug)
    .map((o, i) => ({ o, s: o.topic === a.topic ? 1 : 0, i }))
    .sort((x, y) => y.s - x.s || x.i - y.i)
    .slice(0, n)
    .map((x) => x.o);

export type SearchHit =
  | { type: "video"; item: Video }
  | { type: "short"; item: Video }
  | { type: "article"; item: Article }
  | { type: "program"; item: Program };

/** Búsqueda sobre el contenido cargado: todas las palabras deben aparecer (sin tildes). */
export const search = (query: string): SearchHit[] => {
  const terms = normalize(query).split(" ").filter(Boolean);
  if (!terms.length) return [];
  const match = (text: string) => {
    const t = normalize(text);
    return terms.every((w) => t.includes(w));
  };
  const hits: SearchHit[] = [];
  for (const a of ARTICLES) if (match(`${a.headline} ${a.dek} ${a.body.join(" ")} ${TOPICS[a.topic].label}`)) hits.push({ type: "article", item: a });
  for (const v of VIDEOS)
    if (match(`${v.title} ${v.headline} ${TOPICS[v.topic].label}`)) hits.push({ type: v.vertical ? "short" : "video", item: v });
  for (const p of PROGRAMS) if (match(`${p.name} ${p.tagline} ${p.description.join(" ")}`)) hits.push({ type: "program", item: p });
  return hits;
};
