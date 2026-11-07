import { Play, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { ArticleCard } from "../components/ArticleCard";
import { Ext } from "../components/ExternalLink";
import { PlatformIcon } from "../components/PlatformIcon";
import { SectionHead } from "../components/Section";
import { ShortCard } from "../components/ShortCard";
import { Thumb } from "../components/Thumb";
import { TopicTag } from "../components/TopicTag";
import { VideoCard } from "../components/VideoCard";
import { ARTICLES } from "../data/articles";
import { PROGRAMS } from "../data/programs";
import { SITE } from "../data/site";
import { FORMATS } from "../data/topics";
import { FEATURED_VIDEO_ID } from "../data/videos";
import { usePageMeta } from "../hooks/usePageMeta";
import { LONG_VIDEOS, SHORTS, programVideos, videoById, videosBy } from "../utils/catalog";

function Hero() {
  const v = videoById(FEATURED_VIDEO_ID)!;
  return (
    <section className="relative overflow-hidden bg-navy text-white" aria-labelledby="hero-title" data-tour="hero">
      <div className="wrap grid items-center gap-8 py-10 lg:grid-cols-[5fr_7fr] lg:gap-10 lg:py-16">
        <div className="relative z-10 min-w-0 lg:order-1">
          <TopicTag topic={v.topic} full />
          <h1 id="hero-title" className="display-xl mt-4">
            {v.headline}
          </h1>
          <p className="mt-4 max-w-md text-lg text-white/80">
            La transmisión de Meketrefes del Deporte, publicada en su canal de YouTube. Fútbol panameño con debate, análisis y personalidad.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to={`/tv/${v.id}`} className="btn btn-lime">
              <span className="flex items-center gap-2">
                <Play className="h-5 w-5 fill-current" aria-hidden="true" /> Ver el programa
              </span>
            </Link>
            <Link to="/noticias" className="btn btn-ghost text-white">
              <span>Explorar noticias</span>
            </Link>
            <Ext href={SITE.youtube.subscribe} className="btn btn-ghost text-white">
              <span className="flex items-center gap-2">
                <PlatformIcon id="youtube" /> Suscribirse en YouTube
              </span>
            </Ext>
          </div>
        </div>
        <Link to={`/tv/${v.id}`} className="group relative block min-w-0 lg:order-2" aria-label={`Ver: ${v.headline}`}>
          <div className="hero-wipe relative" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
            <Thumb id={v.id} alt="" size="maxres" eager className="aspect-video w-full" />
            <span className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" aria-hidden="true" />
          </div>
          {/* Rótulo inferior al estilo de una transmisión deportiva */}
          <div className="absolute -bottom-3 left-3 right-10 sm:left-6">
            <div className="tag bg-lime px-4 py-2 text-navy">
              <span className="flex items-center gap-2 text-[1.1rem] sm:text-[1.3rem]">
                <Radio className="h-5 w-5" aria-hidden="true" /> Meketrefes en vivo
              </span>
            </div>
            <div className="tag ml-3 mt-1 bg-white px-3 py-1.5 text-navy">
              <span className="text-[0.95rem]">{FORMATS[v.format]} en YouTube</span>
            </div>
          </div>
        </Link>
      </div>
      <div className="h-2 bg-blue" aria-hidden="true" />
    </section>
  );
}

export default function Home() {
  usePageMeta(undefined, "Demo de portal web para Meketrefes del Deporte: fútbol panameño, Selección de Panamá, LPF, Concacaf, transmisiones, podcasts y Shorts.");
  const rail = LONG_VIDEOS.filter((v) => v.id !== FEATURED_VIDEO_ID && v.topic !== "meketrefes").slice(0, 10);
  const seleccion = videosBy({ topic: "seleccion" }).filter((v) => v.id !== FEATURED_VIDEO_ID);
  const [lead, ...rest] = ARTICLES.filter((a) => a.kind === "nota-video");
  const lpf = videosBy({ topic: "lpf" }).slice(0, 4);
  const intl = videosBy({ topic: "internacional" }).slice(0, 4);
  const opinion = videosBy({ format: "analisis" }).filter((v) => v.topic !== "meketrefes" && v.topic !== "seleccion").slice(0, 3);
  const showLpf = PROGRAMS.find((p) => p.slug === "show-de-la-lpf")!;
  const clips = programVideos(showLpf).filter((v) => v.format === "mejores");

  return (
    <>
      <Hero />

      <section className="bg-navy-950 py-12 text-white" aria-labelledby="h-canal">
        <div className="wrap">
          <SectionHead
            id="h-canal"
            dark
            title="En el canal"
            intro="Transmisiones, análisis y programas publicados por Meketrefes del Deporte en YouTube."
            to="/tv"
            linkLabel="Ir a Meketrefes TV"
          />
          <div className="scroll-rail" role="list">
            {rail.map((v) => (
              <div role="listitem" key={v.id}>
                <VideoCard v={v} variant="rail" tone="dark" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14" aria-labelledby="h-seleccion">
        <div className="wrap">
          <SectionHead id="h-seleccion" title="Selección de Panamá" intro="El camino de la Selección, en las transmisiones y análisis del canal." to="/tv?tema=seleccion" linkLabel="Todos los videos de la Selección" />
          <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
            <VideoCard v={seleccion[0]} variant="feature" />
            <div className="divide-y divide-line border-y border-line">
              {seleccion.slice(1, 5).map((v) => (
                <VideoCard key={v.id} v={v} variant="row" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14" aria-labelledby="h-noticias">
        <div className="wrap">
          <SectionHead id="h-noticias" title="Noticias" intro="Notas de demostración construidas sobre videos reales del medio, siempre con su fuente." to="/noticias" linkLabel="Todas las noticias" />
          <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
            <ArticleCard a={lead} variant="lead" />
            <div>
              {rest.slice(0, 4).map((a) => (
                <ArticleCard key={a.slug} a={a} variant="compact" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14" aria-label="Fútbol nacional e internacional">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead title="Fútbol de Panamá" to="/tv?tema=lpf" linkLabel="Ver LPF" />
            <div className="divide-y divide-line border-y border-line">
              {lpf.map((v) => (
                <VideoCard key={v.id} v={v} variant="row" />
              ))}
            </div>
          </div>
          <div>
            <SectionHead title="Fútbol internacional" to="/tv?tema=internacional" linkLabel="Ver internacional" />
            <div className="divide-y divide-line border-y border-line">
              {intl.map((v) => (
                <VideoCard key={v.id} v={v} variant="row" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue py-14 text-white" aria-labelledby="h-debate">
        <div className="wrap">
          <SectionHead id="h-debate" dark title="Debate y opinión" intro="El análisis con personalidad que distingue al medio." to="/tv?formato=analisis" linkLabel="Más análisis" />
          <div className="grid gap-8 md:grid-cols-3">
            {opinion.map((v) => (
              <VideoCard key={v.id} v={v} tone="dark" />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-14 text-white" aria-labelledby="h-clips">
        <div className="wrap">
          <SectionHead id="h-clips" dark title="Clips y Shorts" intro="Formato vertical y mejores momentos del fútbol panameño." to="/shorts" linkLabel="Ir a Shorts" />
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {SHORTS.map((s) => (
                <ShortCard key={s.id} v={s} />
              ))}
            </div>
            <div>
              <h3 className="display-sm text-lime">Mejores momentos</h3>
              <div className="mt-2 divide-y divide-white/10 border-y border-white/10">
                {clips.map((v) => (
                  <VideoCard key={v.id} v={v} variant="row" tone="dark" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14" aria-labelledby="h-programas">
        <div className="wrap">
          <SectionHead id="h-programas" title="Programas" to="/programas" linkLabel="Todos los programas" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMS.map((p) => (
              <li key={p.slug}>
                <Link to={`/programas/${p.slug}`} className="group flex h-full flex-col border-l-[6px] border-blue bg-white p-5 hover:border-lime">
                  <span className="display-md text-navy group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">{p.name}</span>
                  <span className="mt-2 text-sm text-muted">{p.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-14" aria-labelledby="h-comunidad" id="comunidad">
        <div className="wrap">
          <SectionHead id="h-comunidad" title="Comunidad" intro="Siga a Meketrefes del Deporte en sus perfiles oficiales." />
          <ul className="grid gap-4 md:grid-cols-3">
            {SITE.socials.map((s) => (
              <li key={s.id}>
                <Ext href={s.url} className="group flex h-full items-start gap-4 bg-navy p-5 text-white hover:bg-navy-800">
                  <span className="grid h-12 w-12 shrink-0 place-items-center bg-lime text-navy">
                    <PlatformIcon id={s.id} className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="display-sm block">{s.label}</span>
                    <span className="block break-words text-sm text-lime">{s.handle}</span>
                    <span className="mt-1 block text-sm text-white/75">{s.blurb}</span>
                  </span>
                </Ext>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-lime py-12 text-navy" aria-labelledby="h-alianzas">
        <div className="wrap flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="h-alianzas" className="display-lg">Su marca, en la conversación del fútbol panameño</h2>
            <p className="mt-2 max-w-prose">Propuesta de espacios para patrocinadores e integraciones. Todos están disponibles.</p>
          </div>
          <Link to="/alianzas" className="btn bg-navy text-white hover:bg-blue">
            <span>Ver espacios comerciales</span>
          </Link>
        </div>
      </section>
    </>
  );
}
