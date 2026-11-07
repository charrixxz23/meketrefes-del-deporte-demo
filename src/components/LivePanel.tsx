import { Radio } from "lucide-react";
import { useState } from "react";
import { SITE } from "../data/site";
import { liveEmbedUrl } from "../utils/youtube";
import { Ext } from "./ExternalLink";

/**
 * Comprobación de señal en vivo SIN afirmar que hay transmisión:
 * el reproductor oficial de "live_stream" muestra la señal si existe; si no, YouTube lo indica.
 */
export function LivePanel() {
  const [open, setOpen] = useState(false);
  return (
    <section aria-labelledby="h-live" className="border border-white/15 bg-navy-800 p-5 text-white">
      <h2 id="h-live" className="display-sm flex items-center gap-2">
        <Radio className="h-5 w-5 text-lime" aria-hidden="true" /> Señal en vivo
      </h2>
      {!open ? (
        <>
          <p className="mt-2 text-sm text-white/80">
            Esta web no sabe por sí sola si el canal está transmitiendo. Al comprobarlo se carga el reproductor de la señal en vivo de YouTube: si no hay
            transmisión, el propio reproductor lo indica y puede ver el programa grabado de arriba.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="btn btn-lime !min-h-[40px] !text-base" onClick={() => setOpen(true)}>
              <span>Comprobar la señal</span>
            </button>
            <Ext href={SITE.youtube.streams} className="btn btn-ghost !min-h-[40px] !text-base text-white">
              <span>Transmisiones del canal</span>
            </Ext>
          </div>
        </>
      ) : (
        <>
          <div className="relative mt-3 aspect-video bg-navy-950">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={liveEmbedUrl(SITE.youtube.channelId)}
              title="Señal en vivo del canal de YouTube de Meketrefes del Deporte (si está transmitiendo)"
              allow="autoplay; encrypted-media; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <button type="button" className="link-u mt-3 text-sm" onClick={() => setOpen(false)}>
            Cerrar la señal
          </button>
        </>
      )}
      <p className="mt-4 border-t border-white/10 pt-3 text-sm text-white/75">
        En radio: {SITE.shok.radio} y streaming de Shok Multimedia, según{" "}
        <Ext href={SITE.shok.programUrl} className="link-u text-white">
          la página del programa
        </Ext>
        .
      </p>
    </section>
  );
}
