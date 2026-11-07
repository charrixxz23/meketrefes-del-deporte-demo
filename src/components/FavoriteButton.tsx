import { Bookmark, BookmarkCheck } from "lucide-react";
import { useFavorites, type FavKind } from "../hooks/useFavorites";

export function FavoriteButton({ kind, id, label, tone = "dark" }: { kind: FavKind; id: string; label: string; tone?: "dark" | "light" }) {
  const { has, toggle } = useFavorites();
  const on = has(kind, id);
  const base =
    tone === "dark"
      ? "border-white/30 text-white hover:border-lime hover:text-lime"
      : "border-line bg-white text-navy hover:border-blue hover:text-blue";
  return (
    <button
      type="button"
      onClick={() => toggle(kind, id)}
      aria-pressed={on}
      className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-sm border px-3 text-sm font-medium transition-colors ${base} ${on ? "!border-lime" : ""}`}
    >
      {on ? <BookmarkCheck className="h-4 w-4" aria-hidden="true" /> : <Bookmark className="h-4 w-4" aria-hidden="true" />}
      <span>{on ? "Guardado" : "Guardar"}</span>
      <span className="sr-only">{label}</span>
    </button>
  );
}
