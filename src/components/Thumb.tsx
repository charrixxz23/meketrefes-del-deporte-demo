import { useMemo, useState } from "react";
import { thumbChain, type ThumbSize } from "../utils/youtube";
import { DemoMonogram } from "./DemoMark";

interface Props {
  id: string;
  alt: string;
  size?: ThumbSize;
  className?: string;
  eager?: boolean;
  /** Recorta al centro (para Shorts verticales). */
  fit?: "cover" | "contain";
}

/**
 * Miniatura oficial de YouTube con carga diferida, esqueleto de carga
 * y cadena de respaldo. Si ninguna resolución carga (sin conexión, bloqueo),
 * muestra un marcador neutro: nunca un hueco roto.
 */
export function Thumb({ id, alt, size = "hq", className = "", eager = false, fit = "cover" }: Props) {
  const chain = useMemo(() => thumbChain(id, size), [id, size]);
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const failed = idx >= chain.length;

  return (
    <div className={`relative overflow-hidden bg-navy-800 ${className}`}>
      {!loaded && !failed && <div className="skeleton absolute inset-0" aria-hidden="true" />}
      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-navy-800 p-3 text-center text-white/70" role="img" aria-label={alt}>
          <DemoMonogram className="h-8 w-8 opacity-80" />
          <span className="text-xs">Miniatura no disponible</span>
        </div>
      ) : (
        <img
          key={chain[idx]}
          src={chain[idx]}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={(e) => {
            // YouTube responde 120×90 cuando una resolución no existe: pasar a la siguiente.
            if (e.currentTarget.naturalWidth <= 120 && idx < chain.length - 1) setIdx(idx + 1);
            else setLoaded(true);
          }}
          onError={() => setIdx((i) => i + 1)}
          className={`absolute inset-0 h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"} transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
