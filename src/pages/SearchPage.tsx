import { Search } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArticleCard } from "../components/ArticleCard";
import { ShortCard } from "../components/ShortCard";
import { VideoCard } from "../components/VideoCard";
import { usePageMeta } from "../hooks/usePageMeta";
import { search } from "../utils/catalog";

const SUGGESTIONS = ["Mundial", "LPF", "Concacaf", "Podcast", "Serie A", "Selección"];

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") ?? "";
  const [draft, setDraft] = useState(q);
  useEffect(() => setDraft(q), [q]);
  usePageMeta(q ? `Búsqueda: ${q}` : "Buscar");
  const hits = useMemo(() => search(q), [q]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setParams(draft.trim() ? { q: draft.trim() } : {});
  };

  const articles = hits.filter((h) => h.type === "article");
  const videos = hits.filter((h) => h.type === "video");
  const shorts = hits.filter((h) => h.type === "short");
  const programs = hits.filter((h) => h.type === "program");

  return (
    <div className="wrap py-10">
      <h1 className="display-xl text-navy">Buscar</h1>
      <form role="search" onSubmit={submit} className="mt-5 flex max-w-2xl border-2 border-navy bg-white focus-within:border-blue">
        <label htmlFor="search-page-q" className="sr-only">
          Buscar en el contenido del sitio
        </label>
        <input
          id="search-page-q"
          type="search"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Videos, notas y programas"
          className="min-h-[48px] w-full min-w-0 px-4 focus:outline-none"
        />
        <button type="submit" className="bg-navy px-5 text-white hover:bg-blue" aria-label="Buscar">
          <Search className="h-5 w-5" aria-hidden="true" />
        </button>
      </form>
      <p className="mt-3 text-sm text-muted">Busca en el contenido cargado en la demo, sin distinguir tildes ni mayúsculas.</p>

      {!q ? (
        <div className="mt-8">
          <p className="font-semibold">Pruebe con:</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <li key={s}>
                <Link to={`/buscar?q=${encodeURIComponent(s)}`} className="chip">
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <p className="mt-6 font-semibold" role="status" aria-live="polite">
            {hits.length === 0 ? `Sin resultados para «${q}».` : `${hits.length} ${hits.length === 1 ? "resultado" : "resultados"} para «${q}»`}
          </p>
          {hits.length === 0 && <p className="mt-2 text-muted">Revise la ortografía o use una palabra más general, como «Panamá» o «LPF».</p>}
          {programs.length > 0 && (
            <section className="mt-8" aria-label="Programas">
              <h2 className="display-md text-navy">Programas</h2>
              <ul className="mt-3 space-y-2">
                {programs.map((h) => (
                  <li key={h.item.slug}>
                    <Link to={`/programas/${h.item.slug}`} className="link-u font-semibold text-blue">
                      {h.item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {articles.length > 0 && (
            <section className="mt-10" aria-label="Noticias">
              <h2 className="display-md text-navy">Noticias</h2>
              <div className="mt-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((h) => (
                  <ArticleCard key={h.item.slug} a={h.item} />
                ))}
              </div>
            </section>
          )}
          {videos.length > 0 && (
            <section className="mt-10" aria-label="Videos">
              <h2 className="display-md text-navy">Videos</h2>
              <div className="mt-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((h) => (
                  <VideoCard key={h.item.id} v={h.item} />
                ))}
              </div>
            </section>
          )}
          {shorts.length > 0 && (
            <section className="mt-10" aria-label="Shorts">
              <h2 className="display-md text-navy">Shorts</h2>
              <div className="mt-4 grid max-w-xl grid-cols-2 gap-3">
                {shorts.map((h) => (
                  <ShortCard key={h.item.id} v={h.item} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
