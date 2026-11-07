import { CalendarClock, ExternalLink, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Ext } from "../components/ExternalLink";
import { NotFoundState } from "../components/States";
import { VideoCard } from "../components/VideoCard";
import { YouTubePlayer } from "../components/YouTubePlayer";
import { programBySlug } from "../data/programs";
import { usePageMeta } from "../hooks/usePageMeta";
import { programVideos } from "../utils/catalog";
import { formatDate } from "../utils/text";

export default function ProgramPage() {
  const { slug = "" } = useParams();
  const p = programBySlug(slug);
  usePageMeta(p?.name ?? "Programa no encontrado", p?.tagline);
  if (!p) return <NotFoundState title="Programa no encontrado" text="Ese programa no está en la demo." to="/programas" cta="Ver programas" />;
  const vids = programVideos(p);

  return (
    <>
      <header className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 -skew-x-12 bg-blue md:block" aria-hidden="true" />
        <div className="absolute inset-y-0 right-[-4%] hidden w-[8%] -skew-x-12 bg-lime md:block" aria-hidden="true" />
        <div className="wrap relative py-10 md:py-14">
          <nav aria-label="Ruta" className="text-sm text-white/70">
            <Link to="/programas" className="link-u">
              Programas
            </Link>
          </nav>
          <h1 className="display-xl mt-4 max-w-3xl">{p.name}</h1>
          <p className="mt-4 max-w-prose text-lg text-white/85">{p.tagline}</p>
        </div>
      </header>

      <div className="wrap grid gap-10 py-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <div className="max-w-prose space-y-4 text-[1.05rem]">
            {p.description.map((d, i) => (
              <p key={i}>{d}</p>
            ))}
          </div>
          {vids[0] && (
            <div className="mt-8">
              <YouTubePlayer id={vids[0].id} title={vids[0].headline} />
              <p className="display-sm mt-3 text-navy">{vids[0].headline}</p>
            </div>
          )}
        </div>
        <aside className="min-w-0 space-y-4">
          <div className="bg-white p-5">
            <h2 className="display-sm flex items-center gap-2 text-navy">
              <CalendarClock className="h-5 w-5 text-blue" aria-hidden="true" /> Horario
            </h2>
            {p.schedule ? (
              <>
                <p className="mt-2 font-semibold">{p.schedule.text}</p>
                <p className="mt-2 text-sm text-muted">
                  Fuente:{" "}
                  <Ext href={p.schedule.sourceUrl} className="link-u text-blue">
                    {p.schedule.source}
                  </Ext>
                  , consultada el {formatDate(p.schedule.consulted)}. Conviene confirmar con el equipo que siga vigente.
                </p>
              </>
            ) : (
              <p className="mt-2 text-sm text-muted">Sin horario fijo publicado. Los episodios se anuncian en los canales oficiales.</p>
            )}
          </div>
          <div className="bg-white p-5">
            <h2 className="display-sm flex items-center gap-2 text-navy">
              <Users className="h-5 w-5 text-blue" aria-hidden="true" /> Presentadores
            </h2>
            {p.hosts.length ? (
              <ul className="mt-2">{p.hosts.map((h) => <li key={h}>{h}</li>)}</ul>
            ) : (
              <p className="mt-2 text-sm text-muted">Pendiente de confirmar con el medio. La demo no publica nombres que no estén verificados.</p>
            )}
          </div>
          <div className="bg-navy p-5 text-white">
            <h2 className="display-sm">Ver en la plataforma original</h2>
            <ul className="mt-3 space-y-2">
              {p.links.map((l) => (
                <li key={l.url}>
                  <Ext href={l.url} className="link-u inline-flex items-center gap-1 font-semibold text-lime">
                    {l.label} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  </Ext>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {vids.length > 1 && (
        <section className="bg-white py-12" aria-labelledby="h-episodios">
          <div className="wrap">
            <h2 id="h-episodios" className="display-lg text-navy">
              Episodios en la demo
            </h2>
            <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {vids.slice(1).map((v) => (
                <VideoCard key={v.id} v={v} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
