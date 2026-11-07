import { Link } from "react-router-dom";
import { FORMATS } from "../data/topics";
import type { Video } from "../data/types";
import { Thumb } from "./Thumb";
import { TopicTag } from "./TopicTag";

type Variant = "rail" | "grid" | "row" | "feature";

/** Tarjeta de video. Toda la tarjeta enlaza a la página del video dentro del sitio. */
export function VideoCard({ v, variant = "grid", tone = "light" }: { v: Video; variant?: Variant; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const to = `/tv/${v.id}`;

  if (variant === "row") {
    return (
      <Link to={to} className={`group grid grid-cols-[8.5rem_1fr] gap-3 py-3 sm:grid-cols-[11rem_1fr] ${dark ? "text-white" : "text-ink"}`}>
        <Thumb id={v.id} alt="" className="aspect-video w-full" />
        <span className="min-w-0">
          <span className={`text-xs font-medium ${dark ? "text-lime" : "text-blue"}`}>{FORMATS[v.format]}</span>
          <span className="display-sm mt-1 block group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">{v.headline}</span>
        </span>
      </Link>
    );
  }

  const big = variant === "feature";
  return (
    <Link
      to={to}
      className={`group block min-w-0 ${variant === "rail" ? "w-[78vw] max-w-[22rem] shrink-0 sm:w-[20rem]" : ""} ${dark ? "text-white" : "text-ink"}`}
    >
      <div className="relative">
        <Thumb id={v.id} alt="" size={big ? "sd" : "hq"} className="aspect-video w-full" />
        <span className="absolute left-3 top-3">
          <TopicTag topic={v.topic} tone={dark ? "lime" : "navy"} />
        </span>
        <span className="absolute bottom-0 left-0 h-1 w-0 bg-lime transition-all duration-300 group-hover:w-full" aria-hidden="true" />
      </div>
      <p className={`mt-3 text-xs font-medium ${dark ? "text-white/70" : "text-muted"}`}>{FORMATS[v.format]}</p>
      <h3 className={`${big ? "display-md" : "display-sm"} mt-1 group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4`}>
        {v.headline}
      </h3>
    </Link>
  );
}
