import { ExternalLink, Info } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { ArticleCard } from "../components/ArticleCard";
import { Ext } from "../components/ExternalLink";
import { FavoriteButton } from "../components/FavoriteButton";
import { ShareButton } from "../components/ShareButton";
import { NotFoundState } from "../components/States";
import { TopicTag } from "../components/TopicTag";
import { YouTubePlayer } from "../components/YouTubePlayer";
import { articleBySlug } from "../data/articles";
import { usePageMeta } from "../hooks/usePageMeta";
import { relatedArticles, videoById } from "../utils/catalog";
import { formatDate } from "../utils/text";

export default function ArticlePage() {
  const { slug = "" } = useParams();
  const a = articleBySlug(slug);
  usePageMeta(a?.headline ?? "Nota no encontrada", a?.dek);
  if (!a) return <NotFoundState title="Nota no encontrada" text="La nota que busca no existe o cambió de dirección." to="/noticias" cta="Ver todas las noticias" />;
  const v = a.videoId ? videoById(a.videoId) : undefined;

  return (
    <article>
      <header className="bg-navy pb-10 pt-8 text-white">
        <div className="wrap">
          <nav aria-label="Ruta" className="text-sm text-white/70">
            <Link to="/noticias" className="link-u">
              Noticias
            </Link>
          </nav>
          <div className="mt-4">
            <TopicTag topic={a.topic} full />
          </div>
          <h1 className="display-lg mt-4 max-w-4xl !normal-case">{a.headline}</h1>
          <p className="mt-4 max-w-prose text-lg text-white/80">{a.dek}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <FavoriteButton kind="article" id={a.slug} label={a.headline} />
            <ShareButton title={a.headline} />
          </div>
        </div>
      </header>

      <div className="wrap grid gap-10 py-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <aside className="flex gap-3 border-l-4 border-lime bg-white p-4 text-sm" aria-label="Aviso de demostración">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue" aria-hidden="true" />
            <p>
              <strong>Nota demostrativa.</strong> Texto redactado para esta demo a partir de {a.kind === "guia" ? "fuentes públicas" : "el título público del video"}. No
              es una publicación de Meketrefes del Deporte.
            </p>
          </aside>

          {v && (
            <div className="mt-8">
              <YouTubePlayer id={v.id} title={v.headline} />
              <p className="mt-2 text-sm text-muted">
                Título original en YouTube: <span className="text-ink">«{v.title}»</span>
              </p>
            </div>
          )}

          <div className="mt-8 max-w-prose space-y-5 text-[1.08rem] leading-[1.7]">
            {a.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <section className="mt-10 max-w-prose border-t-2 border-navy pt-5" aria-labelledby="fuentes">
            <h2 id="fuentes" className="display-sm text-navy">
              Fuentes
            </h2>
            <ul className="mt-3 space-y-2">
              {a.sources.map((s) => (
                <li key={s.url}>
                  <Ext href={s.url} className="link-u inline-flex items-center gap-1 font-medium text-blue">
                    {s.label} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </Ext>
                  {s.consulted && <span className="block text-sm text-muted">Consultado el {formatDate(s.consulted)}</span>}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted">Publicado en: demo de Meketrefes del Deporte (sin fecha de publicación real).</p>
          </section>
        </div>

        <aside aria-labelledby="relacionadas" className="min-w-0">
          <h2 id="relacionadas" className="display-md text-navy">
            Relacionadas
          </h2>
          <div className="mt-4 space-y-8">
            {relatedArticles(a).map((r) => (
              <ArticleCard key={r.slug} a={r} />
            ))}
          </div>
        </aside>
      </div>
    </article>
  );
}
