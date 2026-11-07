import { ExternalLink, Play } from "lucide-react";
import { useState } from "react";
import { embedUrl, watchUrl } from "../utils/youtube";
import { Thumb } from "./Thumb";

interface Props {
  id: string;
  title: string;
  vertical?: boolean;
  /** Carga el reproductor directamente (p. ej. al abrir una página de video). */
  autoload?: boolean;
  className?: string;
}

/**
 * Reproductor oficial de YouTube con carga diferida: hasta que la persona pulsa
 * reproducir solo se descarga la miniatura (rendimiento y privacidad).
 */
export function YouTubePlayer({ id, title, vertical = false, autoload = false, className = "" }: Props) {
  const [active, setActive] = useState(autoload);
  const [ready, setReady] = useState(false);
  const ratio = vertical ? "aspect-[9/16]" : "aspect-video";

  return (
    <figure className={className}>
      <div className={`relative w-full overflow-hidden bg-navy-950 ring-1 ring-white/15 ${ratio}`}>
        {active ? (
          <>
            {!ready && (
              <div className="absolute inset-0 flex items-center justify-center text-sm text-white/70" role="status">
                <span className="skeleton absolute inset-0" aria-hidden="true" />
                <span className="relative">Cargando reproductor de YouTube…</span>
              </div>
            )}
            <iframe
              className="absolute inset-0 h-full w-full"
              src={embedUrl(id, { autoplay: !autoload })}
              title={`Reproductor de YouTube: ${title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              onLoad={() => setReady(true)}
            />
          </>
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group absolute inset-0 h-full w-full text-left"
            aria-label={`Reproducir: ${title}`}
          >
            <Thumb id={id} alt="" size={vertical ? "hq" : "sd"} className="absolute inset-0 h-full w-full" />
            <span className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" aria-hidden="true" />
            <span className="btn btn-lime absolute bottom-4 left-4 shadow-lg group-hover:bg-white">
              <span className="flex items-center gap-2">
                <Play className="h-5 w-5 fill-current" aria-hidden="true" /> Reproducir
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="text-current opacity-75">Reproductor oficial de YouTube</span>
        <a href={watchUrl(id, vertical)} target="_blank" rel="noopener noreferrer" className="link-u inline-flex items-center gap-1 font-medium">
          Abrir en YouTube <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">(se abre en una pestaña nueva)</span>
        </a>
      </figcaption>
    </figure>
  );
}
