import { ListVideo } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Ext } from "../components/ExternalLink";
import { LivePanel } from "../components/LivePanel";
import { SectionHead } from "../components/Section";
import { TopicTag } from "../components/TopicTag";
import { VideoCard } from "../components/VideoCard";
import { YouTubePlayer } from "../components/YouTubePlayer";
import { SITE } from "../data/site";
import { FORMATS, TOPICS, TOPIC_ORDER } from "../data/topics";
import type { FormatId, TopicId } from "../data/types";
import { FEATURED_VIDEO_ID, PLAYLISTS } from "../data/videos";
import { usePageMeta } from "../hooks/usePageMeta";
import { LONG_VIDEOS, videoById, videosBy } from "../utils/catalog";
import { playlistEmbedUrl, playlistUrl } from "../utils/youtube";

const RAILS: { format: FormatId; title: string }[] = [
  { format: "transmision", title: "Transmisiones publicadas" },
  { format: "show", title: "El Show de la LPF" },
  { format: "analisis", title: "Análisis y debate" },
  { format: "podcast", title: "Podcasts" },
  { format: "entrevista", title: "Entrevistas" },
  { format: "mejores", title: "Mejores momentos" },
];

function Playlist({ id, title }: { id: string; title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid gap-6 bg-navy-800 p-5 md:grid-cols-[1fr_1.4fr] md:p-6">
      <div>
        <ListVideo className="h-8 w-8 text-lime" aria-hidden="true" />
        <h3 className="display-md mt-3">{title}</h3>
        <p className="mt-2 text-sm text-white/75">Lista temática pública del canal. Se reproduce con el reproductor oficial de listas de YouTube.</p>
        <Ext href={playlistUrl(id)} className="link-u mt-4 inline-block text-sm font-semibold text-lime">
          Abrir la lista en YouTube
        </Ext>
      </div>
      <div className="relative aspect-video bg-navy-950">
        {open ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={playlistEmbedUrl(id)}
            title={`Lista de YouTube: ${title}`}
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setOpen(true)} className="absolute inset-0 grid place-items-center text-white hover:text-lime">
            <span className="btn btn-lime">
              <span>Cargar la lista</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default function TV() {
  usePageMeta("Meketrefes TV", "Centro multimedia: transmisiones publicadas, El Show de la LPF, podcasts, entrevistas y análisis con el reproductor oficial de YouTube.");
  const [params, setParams] = useSearchParams();
  const tema = params.get("tema") as TopicId | null;
  const formato = params.get("formato") as FormatId | null;
  const featured = videoById(FEATURED_VIDEO_ID)!;

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
    setLimit(9);
  };

  const archive = useMemo(() => videosBy({ topic: tema ?? undefined, format: formato ?? undefined }), [tema, formato]);
  const [limit, setLimit] = useState(9);
  const topics = TOPIC_ORDER.filter((t) => LONG_VIDEOS.some((v) => v.topic === t));
  const formats = (Object.keys(FORMATS) as FormatId[]).filter((f) => LONG_VIDEOS.some((v) => v.format === f));

  return (
    <div className="bg-navy-950 text-white">
      <section className="wrap grid gap-8 py-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:py-12" aria-labelledby="tv-title">
        <div className="min-w-0" data-tour="tv-player">
          <h1 id="tv-title" className="display-xl">
            Meketrefes TV
          </h1>
          <div className="mt-5">
            <YouTubePlayer id={featured.id} title={featured.headline} />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <TopicTag topic={featured.topic} />
            <span className="text-sm text-white/70">{FORMATS[featured.format]}</span>
          </div>
          <h2 className="display-md mt-2">{featured.headline}</h2>
        </div>
        <div className="min-w-0 space-y-6 lg:pt-[4.6rem]">
          <LivePanel />
          <div className="border border-white/15 p-5">
            <h2 className="display-sm">Todo el canal</h2>
            <p className="mt-2 text-sm text-white/75">Esta selección es una muestra. El archivo completo y las novedades están en YouTube.</p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
              <Ext href={SITE.youtube.videos} className="link-u text-lime">
                Videos
              </Ext>
              <Ext href={SITE.youtube.playlists} className="link-u text-lime">
                Listas
              </Ext>
              <Ext href={SITE.youtube.subscribe} className="link-u text-lime">
                Suscribirse
              </Ext>
            </div>
          </div>
        </div>
      </section>

      {RAILS.map((r) => {
        const list = videosBy({ format: r.format }).filter((v) => v.id !== featured.id);
        if (!list.length) return null;
        return (
          <section key={r.format} className="border-t border-white/10 py-10" aria-labelledby={`rail-${r.format}`}>
            <div className="wrap">
              <SectionHead id={`rail-${r.format}`} dark title={r.title} />
              <div className="scroll-rail" role="list">
                {list.map((v) => (
                  <div role="listitem" key={v.id}>
                    <VideoCard v={v} variant="rail" tone="dark" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="border-t border-white/10 py-10" aria-labelledby="h-listas">
        <div className="wrap">
          <SectionHead id="h-listas" dark title="Listas temáticas" />
          {PLAYLISTS.map((p) => (
            <Playlist key={p.id} id={p.id} title={p.title} />
          ))}
        </div>
      </section>

      <section id="archivo" className="bg-paper py-12 text-ink" aria-labelledby="h-archivo">
        <div className="wrap">
          <SectionHead id="h-archivo" title="Archivo de videos" intro="Filtre por categoría y formato." />
          <div className="flex flex-wrap gap-2" role="group" aria-label="Categoría">
            <button type="button" className="chip" aria-pressed={!tema} onClick={() => set("tema", null)}>
              Todas las categorías
            </button>
            {topics.map((t) => (
              <button key={t} type="button" className="chip" aria-pressed={tema === t} onClick={() => set("tema", tema === t ? null : t)}>
                {TOPICS[t].label}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Formato">
            {formats.map((f) => (
              <button key={f} type="button" className="chip" aria-pressed={formato === f} onClick={() => set("formato", formato === f ? null : f)}>
                {FORMATS[f]}
              </button>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted" role="status" aria-live="polite">
            {archive.length === 1 ? "1 video" : `${archive.length} videos`}
          </p>
          {archive.length ? (
            <div className="mt-4 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {archive.slice(0, limit).map((v) => (
                <VideoCard key={v.id} v={v} />
              ))}
            </div>
          ) : null}
          {archive.length > limit && (
            <button type="button" className="btn btn-blue mt-10" onClick={() => setLimit((l) => l + 9)}>
              <span>Mostrar más videos ({archive.length - limit})</span>
            </button>
          )}
          {archive.length === 0 && (
            <div className="mt-4 bg-white p-8">
              <p className="display-sm text-navy">No hay videos con esa combinación</p>
              <button type="button" className="btn btn-blue mt-4" onClick={() => setParams({}, { replace: true })}>
                <span>Quitar filtros</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
