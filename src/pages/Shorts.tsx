import { useState } from "react";
import { Ext } from "../components/ExternalLink";
import { SectionHead } from "../components/Section";
import { ShortCard } from "../components/ShortCard";
import { VideoCard } from "../components/VideoCard";
import { SITE } from "../data/site";
import { TOPICS, TOPIC_ORDER } from "../data/topics";
import type { TopicId } from "../data/types";
import { usePageMeta } from "../hooks/usePageMeta";
import { SHORTS, videosBy } from "../utils/catalog";

export default function Shorts() {
  usePageMeta("Shorts y mejores momentos", "Clips verticales y mejores momentos de Meketrefes del Deporte con el reproductor oficial de YouTube.");
  const [tema, setTema] = useState<TopicId | null>(null);
  const topics = TOPIC_ORDER.filter((t) => SHORTS.some((s) => s.topic === t));
  const list = tema ? SHORTS.filter((s) => s.topic === tema) : SHORTS;
  const best = videosBy({ format: "mejores" });

  return (
    <div className="bg-navy text-white">
      <header className="wrap pb-6 pt-10">
        <h1 className="display-xl">Shorts</h1>
        <p className="mt-3 max-w-prose text-white/80">
          Clips verticales del canal. Ábralos en el visor para pasar de uno a otro deslizando o con las flechas del teclado.
        </p>
      </header>

      <section className="wrap pb-12" aria-label="Shorts del canal">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Categoría">
          <button type="button" className="chip !border-white/30 !bg-transparent !text-white aria-pressed:!border-lime aria-pressed:!bg-lime aria-pressed:!text-navy" aria-pressed={!tema} onClick={() => setTema(null)}>
            Todos
          </button>
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              className="chip !border-white/30 !bg-transparent !text-white aria-pressed:!border-lime aria-pressed:!bg-lime aria-pressed:!text-navy"
              aria-pressed={tema === t}
              onClick={() => setTema(tema === t ? null : t)}
            >
              {TOPICS[t].label}
            </button>
          ))}
        </div>
        <div data-tour="shorts-grid" className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {list.map((s) => (
            <ShortCard key={s.id} v={s} />
          ))}
          <Ext
            href={SITE.youtube.shorts}
            className="flex aspect-[9/16] flex-col justify-end border-2 border-dashed border-white/30 p-4 hover:border-lime hover:text-lime"
          >
            <span className="display-sm">Más Shorts en YouTube</span>
            <span className="mt-2 text-sm text-white/75">La demo incluye solo los Shorts verificados. El resto está en el canal.</span>
          </Ext>
        </div>
      </section>

      <section className="bg-navy-950 py-12" aria-labelledby="h-best">
        <div className="wrap">
          <SectionHead id="h-best" dark title="Mejores momentos" intro="Lo mejor del fútbol de Panamá, del Show de la LPF." />
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {best.map((v) => (
              <VideoCard key={v.id} v={v} tone="dark" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
