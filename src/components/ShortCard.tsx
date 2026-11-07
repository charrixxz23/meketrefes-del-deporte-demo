import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import type { Video } from "../data/types";
import { Thumb } from "./Thumb";
import { TopicTag } from "./TopicTag";

export function ShortCard({ v, className = "" }: { v: Video; className?: string }) {
  return (
    <Link to={`/shorts/${v.id}`} className={`group relative block overflow-hidden bg-navy-950 text-white ${className}`}>
      <Thumb id={v.id} alt="" className="aspect-[9/16] w-full" />
      <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/10 to-transparent" aria-hidden="true" />
      <span className="absolute left-3 top-3">
        <TopicTag topic={v.topic} />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-3">
        <Play className="mb-2 h-7 w-7 rounded-full bg-lime p-1.5 text-navy" aria-hidden="true" />
        <span className="display-sm block">{v.headline}</span>
      </span>
    </Link>
  );
}
