import { Link, useParams } from "react-router-dom";
import { FavoriteButton } from "../components/FavoriteButton";
import { ShareButton } from "../components/ShareButton";
import { NotFoundState } from "../components/States";
import { TopicTag } from "../components/TopicTag";
import { VideoCard } from "../components/VideoCard";
import { YouTubePlayer } from "../components/YouTubePlayer";
import { programBySlug } from "../data/programs";
import { FORMATS } from "../data/topics";
import { usePageMeta } from "../hooks/usePageMeta";
import { LONG_VIDEOS, relatedVideos, videoById } from "../utils/catalog";

export default function VideoPage() {
  const { id = "" } = useParams();
  const v = videoById(id);
  usePageMeta(v?.headline ?? "Video no encontrado", v ? `Video de Meketrefes del Deporte en YouTube: ${v.headline}` : undefined);
  if (!v || v.vertical)
    return v ? (
      <NotFoundState title="Este video es un Short" text="Los Shorts se ven en el visor vertical." to={`/shorts/${v.id}`} cta="Abrir en el visor de Shorts" />
    ) : (
      <NotFoundState title="Video no encontrado" text="Ese video no está en el catálogo de la demo. Puede buscarlo en el canal de YouTube." to="/tv" cta="Ir a Meketrefes TV" />
    );

  const program = v.program ? programBySlug(v.program) : undefined;
  const idx = LONG_VIDEOS.findIndex((x) => x.id === v.id);
  const next = LONG_VIDEOS[(idx + 1) % LONG_VIDEOS.length];

  return (
    <div className="bg-navy-950 text-white">
      <div className="wrap grid gap-10 py-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:py-10">
        <article className="min-w-0">
          <nav aria-label="Ruta" className="text-sm text-white/70">
            <Link to="/tv" className="link-u">
              Meketrefes TV
            </Link>
          </nav>
          <div className="mt-4">
            <YouTubePlayer key={v.id} id={v.id} title={v.headline} autoload />
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <TopicTag topic={v.topic} full />
            <span className="text-sm text-white/70">{FORMATS[v.format]}</span>
          </div>
          <h1 className="display-lg mt-3 !normal-case">{v.headline}</h1>
          <p className="mt-3 text-sm text-white/70">
            Título original: <span className="text-white">«{v.title}»</span>
          </p>
          {program && (
            <p className="mt-2 text-sm">
              Programa:{" "}
              <Link to={`/programas/${program.slug}`} className="link-u font-semibold text-lime">
                {program.name}
              </Link>
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            <FavoriteButton kind="video" id={v.id} label={v.headline} />
            <ShareButton title={v.headline} />
            <Link to={`/tv/${next.id}`} className="btn btn-ghost !min-h-[40px] !text-base text-white">
              <span>Siguiente video</span>
            </Link>
          </div>
        </article>
        <aside className="min-w-0" aria-labelledby="h-rel">
          <h2 id="h-rel" className="display-md">
            Relacionados
          </h2>
          <div className="mt-3 divide-y divide-white/10">
            {relatedVideos(v).map((r) => (
              <VideoCard key={r.id} v={r} variant="row" tone="dark" />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
