import { Link } from "react-router-dom";
import type { Article } from "../data/types";
import { DemoMonogram } from "./DemoMark";
import { Thumb } from "./Thumb";
import { TopicTag } from "./TopicTag";

export function ArticleCard({ a, variant = "grid" }: { a: Article; variant?: "grid" | "lead" | "compact" }) {
  const media = a.videoId ? (
    <Thumb id={a.videoId} alt="" size={variant === "lead" ? "sd" : "hq"} className="aspect-video w-full" />
  ) : (
    <div className="flex aspect-video w-full items-center justify-center bg-blue">
      <DemoMonogram className="h-14 w-14" />
    </div>
  );

  if (variant === "compact") {
    return (
      <Link to={`/noticias/${a.slug}`} className="group block border-t-2 border-navy py-3">
        <TopicTag topic={a.topic} tone="navy" />
        <h3 className="display-sm mt-2 group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4">{a.headline}</h3>
      </Link>
    );
  }

  const lead = variant === "lead";
  return (
    <Link to={`/noticias/${a.slug}`} className="group block min-w-0">
      <div className="relative">
        {media}
        <span className="absolute left-3 top-3">
          <TopicTag topic={a.topic} tone="lime" />
        </span>
      </div>
      <h3 className={`${lead ? "display-lg !normal-case" : "display-sm"} mt-3 group-hover:underline group-hover:decoration-2 group-hover:underline-offset-4`}>
        {a.headline}
      </h3>
      <p className={`mt-2 text-muted ${lead ? "max-w-prose text-lg" : "text-sm"}`}>{a.dek}</p>
      <p className="mt-2 text-xs font-medium text-muted">{a.kind === "guia" ? "Guía con fuentes" : "Nota demostrativa basada en un video"}</p>
    </Link>
  );
}
