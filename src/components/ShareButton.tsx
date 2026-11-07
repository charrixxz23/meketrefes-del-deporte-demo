import { Check, Share2 } from "lucide-react";
import { useState } from "react";

/** Comparte con el menú nativo del teléfono o copia el enlace en escritorio. */
export function ShareButton({ title, tone = "dark" }: { title: string; tone?: "dark" | "light" }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch (e) {
      if ((e as DOMException)?.name === "AbortError") return;
      setStatus("error");
    }
    window.setTimeout(() => setStatus("idle"), 2500);
  };
  const cls =
    tone === "dark"
      ? "border-white/30 text-white hover:border-lime hover:text-lime"
      : "border-line bg-white text-navy hover:border-blue hover:text-blue";
  return (
    <>
      <button type="button" onClick={share} className={`inline-flex min-h-[40px] items-center gap-1.5 rounded-sm border px-3 text-sm font-medium ${cls}`}>
        {status === "copied" ? <Check className="h-4 w-4" aria-hidden="true" /> : <Share2 className="h-4 w-4" aria-hidden="true" />}
        {status === "copied" ? "Enlace copiado" : "Compartir"}
      </button>
      <span className="sr-only" role="status">
        {status === "copied" ? "Enlace copiado al portapapeles" : status === "error" ? "No se pudo copiar el enlace" : ""}
      </span>
    </>
  );
}
