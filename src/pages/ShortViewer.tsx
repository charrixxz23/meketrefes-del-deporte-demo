import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FavoriteButton } from "../components/FavoriteButton";
import { ShareButton } from "../components/ShareButton";
import { NotFoundState } from "../components/States";
import { TopicTag } from "../components/TopicTag";
import { YouTubePlayer } from "../components/YouTubePlayer";
import { usePageMeta } from "../hooks/usePageMeta";
import { SHORTS } from "../utils/catalog";

export default function ShortViewer() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const idx = SHORTS.findIndex((s) => s.id === id);
  const v = SHORTS[idx];
  usePageMeta(v ? `Short: ${v.headline}` : "Short no encontrado");
  const touch = useRef<number | null>(null);

  const go = (delta: number) => {
    if (idx < 0 || SHORTS.length < 2) return;
    const next = SHORTS[(idx + delta + SHORTS.length) % SHORTS.length];
    navigate(`/shorts/${next.id}`, { replace: true });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!v) return <NotFoundState title="Short no encontrado" text="Ese clip no está en la demo." to="/shorts" cta="Ver Shorts" />;

  return (
    <div
      className="bg-navy-950 text-white"
      onTouchStart={(e) => (touch.current = e.touches[0].clientY)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dy = e.changedTouches[0].clientY - touch.current;
        touch.current = null;
        if (Math.abs(dy) > 70) go(dy < 0 ? 1 : -1);
      }}
    >
      <div className="wrap flex flex-col items-center gap-6 py-6 md:flex-row md:items-start md:justify-center md:gap-10 md:py-10">
        <div className="w-full max-w-[min(100%,calc((100svh-12rem)*9/16))] md:w-[22rem]">
          <YouTubePlayer key={v.id} id={v.id} title={v.headline} vertical autoload />
        </div>
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/70" aria-live="polite">
              Short {idx + 1} de {SHORTS.length}
            </p>
            <Link to="/shorts" className="grid h-11 w-11 place-items-center hover:text-lime" aria-label="Cerrar el visor y volver a Shorts">
              <X className="h-6 w-6" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-3">
            <TopicTag topic={v.topic} full />
          </div>
          <h1 className="display-md mt-3">{v.headline}</h1>
          <p className="mt-2 text-sm text-white/70">
            Título original: <span className="text-white">«{v.title}»</span>
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <FavoriteButton kind="video" id={v.id} label={v.headline} />
            <ShareButton title={v.headline} />
          </div>
          <div className="mt-6 flex gap-2">
            <button type="button" onClick={() => go(-1)} className="btn btn-ghost flex-1 text-white" disabled={SHORTS.length < 2}>
              <span className="flex items-center gap-1">
                <ChevronUp className="h-5 w-5" aria-hidden="true" /> Anterior
              </span>
            </button>
            <button type="button" onClick={() => go(1)} className="btn btn-lime flex-1" disabled={SHORTS.length < 2}>
              <span className="flex items-center gap-1">
                Siguiente <ChevronDown className="h-5 w-5" aria-hidden="true" />
              </span>
            </button>
          </div>
          <p className="mt-3 text-sm text-white/60">En el teléfono, deslice hacia arriba fuera del video para pasar al siguiente.</p>
        </div>
      </div>
    </div>
  );
}
