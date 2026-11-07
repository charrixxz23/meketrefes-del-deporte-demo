import { Search } from "lucide-react";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ArticleCard } from "../components/ArticleCard";
import { ARTICLES } from "../data/articles";
import { TOPICS, TOPIC_ORDER } from "../data/topics";
import type { TopicId } from "../data/types";
import { usePageMeta } from "../hooks/usePageMeta";
import { normalize } from "../utils/text";

const KINDS = { "nota-video": "Notas en video", guia: "Guías" } as const;

export default function News() {
  usePageMeta("Noticias", "Notas de la demo basadas en videos reales de Meketrefes del Deporte, con su fuente.");
  const [params, setParams] = useSearchParams();
  const tema = params.get("tema") as TopicId | null;
  const tipo = params.get("tipo") as keyof typeof KINDS | null;
  const q = params.get("q") ?? "";

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const topics = TOPIC_ORDER.filter((t) => ARTICLES.some((a) => a.topic === t));
  const results = useMemo(() => {
    const terms = normalize(q).split(" ").filter(Boolean);
    return ARTICLES.filter((a) => {
      if (tema && a.topic !== tema) return false;
      if (tipo && a.kind !== tipo) return false;
      const text = normalize(`${a.headline} ${a.dek} ${a.body.join(" ")}`);
      return terms.every((t) => text.includes(t));
    });
  }, [q, tema, tipo]);
  const filtered = Boolean(tema || tipo || q);
  const [lead, ...rest] = results;

  return (
    <>
      <header className="bg-navy py-10 text-white">
        <div className="wrap">
          <h1 className="display-xl">Noticias</h1>
          <p className="mt-3 max-w-prose text-white/80">
            Notas demostrativas: cada una presenta un video real del canal o información pública verificable, y enlaza a su fuente. No contienen
            declaraciones ni resultados añadidos por la demo.
          </p>
        </div>
      </header>

      <div className="wrap py-8">
        <div data-tour="news-tools" className="bg-white p-4 sm:p-5">
          <label htmlFor="news-q" className="text-sm font-semibold text-navy">
            Buscar en noticias
          </label>
          <div className="mt-1 flex items-center border-2 border-navy bg-white focus-within:border-blue">
            <Search className="ml-3 h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
            <input
              id="news-q"
              type="search"
              value={q}
              onChange={(e) => set("q", e.target.value)}
              placeholder="Por ejemplo: Mundial, LPF, Concacaf"
              className="min-h-[44px] w-full min-w-0 bg-transparent px-3 focus:outline-none"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoría">
            <button type="button" className="chip" aria-pressed={!tema} onClick={() => set("tema", null)}>
              Todas
            </button>
            {topics.map((t) => (
              <button key={t} type="button" className="chip" aria-pressed={tema === t} onClick={() => set("tema", tema === t ? null : t)}>
                {TOPICS[t].label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filtrar por tipo">
            {(Object.keys(KINDS) as (keyof typeof KINDS)[]).map((k) => (
              <button key={k} type="button" className="chip" aria-pressed={tipo === k} onClick={() => set("tipo", tipo === k ? null : k)}>
                {KINDS[k]}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-muted" role="status" aria-live="polite">
          {results.length === 1 ? "1 nota" : `${results.length} notas`}
          {filtered ? " con los filtros actuales" : ""}
        </p>

        {results.length === 0 ? (
          <div className="mt-6 bg-white p-8">
            <h2 className="display-md text-navy">Ninguna nota coincide</h2>
            <p className="mt-2 text-muted">Pruebe con otra palabra o quite los filtros.</p>
            <button type="button" className="btn btn-blue mt-5" onClick={() => setParams({}, { replace: true })}>
              <span>Quitar filtros</span>
            </button>
          </div>
        ) : (
          <>
            {lead && (
              <div className="mt-6">
                <ArticleCard a={lead} variant={filtered ? "grid" : "lead"} />
              </div>
            )}
            <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((a) => (
                <ArticleCard key={a.slug} a={a} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
