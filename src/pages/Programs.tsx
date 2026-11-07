import { Link } from "react-router-dom";
import { Thumb } from "../components/Thumb";
import { DemoMonogram } from "../components/DemoMark";
import { PROGRAMS } from "../data/programs";
import { usePageMeta } from "../hooks/usePageMeta";
import { programVideos } from "../utils/catalog";

const ACCENT = { blue: "bg-blue text-white", lime: "bg-lime text-navy", navy: "bg-navy text-white" } as const;

export default function Programs() {
  usePageMeta("Programas", "Formatos audiovisuales de Meketrefes del Deporte: transmisiones, El Show de la LPF, podcasts y el programa en Shok Multimedia.");
  return (
    <>
      <header className="bg-navy py-10 text-white">
        <div className="wrap">
          <h1 className="display-xl">Programas</h1>
          <p className="mt-3 max-w-prose text-white/80">
            Los formatos identificados en las plataformas públicas del medio. Solo se indican horarios y presentadores cuando una fuente pública los
            confirma.
          </p>
        </div>
      </header>
      <div className="wrap py-10">
        <ul data-tour="programs" className="grid gap-6 md:grid-cols-2">
          {PROGRAMS.map((p) => {
            const vids = programVideos(p);
            return (
              <li key={p.slug}>
                <Link to={`/programas/${p.slug}`} className="group grid h-full overflow-hidden bg-white sm:grid-cols-[2fr_3fr]">
                  <div className={`relative flex min-h-[10rem] items-end p-4 ${ACCENT[p.accent]}`}>
                    {vids[0] ? (
                      <Thumb id={vids[0].id} alt="" className="absolute inset-0 h-full w-full opacity-35 mix-blend-luminosity" />
                    ) : (
                      <DemoMonogram className="absolute right-4 top-4 h-12 w-12" />
                    )}
                    <span className="relative font-display text-sm font-semibold">
                      {vids.length ? `${vids.length} videos en la demo` : p.schedule ? "Radio y streaming" : ""}
                    </span>
                  </div>
                  <div className="p-5">
                    <h2 className="display-md text-navy group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">{p.name}</h2>
                    <p className="mt-2 text-muted">{p.tagline}</p>
                    {p.schedule && <p className="mt-3 text-sm font-semibold text-blue">{p.schedule.text}</p>}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
