import { Link } from "react-router-dom";
import { Ext } from "../components/ExternalLink";
import { PlatformIcon } from "../components/PlatformIcon";
import { Thumb } from "../components/Thumb";
import { SITE } from "../data/site";
import { FORMATS, TOPICS, TOPIC_ORDER } from "../data/topics";
import type { FormatId } from "../data/types";
import { usePageMeta } from "../hooks/usePageMeta";
import { LONG_VIDEOS } from "../utils/catalog";
import { formatDate } from "../utils/text";

const FORMAT_TEXT: Partial<Record<FormatId, string>> = {
  transmision: "Transmisiones en YouTube, con narración y comentarios, análisis y llamadas del público.",
  show: "El Show de la LPF: tabla, análisis de la jornada y finales del fútbol panameño.",
  podcast: "Podcasts sobre la Serie A y la liga española.",
  entrevista: "Conversaciones con protagonistas del fútbol local.",
  analisis: "Análisis, debate y opinión, también sobre temas como el racismo en el deporte.",
  short: "Shorts con reacciones y temas del día.",
};

export default function About() {
  usePageMeta("Conócenos", "Qué es Meketrefes del Deporte, qué contenido produce y dónde seguirlo.");
  const counts = TOPIC_ORDER.map((t) => ({ t, n: LONG_VIDEOS.filter((v) => v.topic === t).length })).filter((x) => x.n > 0 && x.t !== "meketrefes");
  const max = Math.max(...counts.map((c) => c.n));
  const gallery = LONG_VIDEOS.filter((v) => v.topic !== "meketrefes").slice(0, 8);

  return (
    <>
      <header className="bg-navy py-12 text-white">
        <div className="wrap max-w-4xl">
          <h1 className="display-xl">Conócenos</h1>
          <p className="mt-5 text-xl leading-relaxed text-white/90">
            Meketrefes del Deporte es un medio de comunicación deportiva de Panamá. Hace contenido en español sobre el fútbol panameño, la Selección,
            Centroamérica y Concacaf, con debate, análisis y humor.
          </p>
          <p className="mt-4 text-white/75">
            Su canal de YouTube se presenta como un espacio de podcasts, reportajes, transmisiones en vivo y cobertura deportiva. En radio y streaming,
            Shok Multimedia emite el programa de lunes a viernes, según la página del programa.
          </p>
        </div>
      </header>

      <section className="wrap grid gap-12 py-12 lg:grid-cols-2" aria-label="Contenido y enfoque">
        <div>
          <h2 className="display-lg text-navy">Qué produce</h2>
          <ul className="mt-5 space-y-4">
            {(Object.keys(FORMAT_TEXT) as FormatId[]).map((f) => (
              <li key={f} className="border-l-4 border-blue pl-4">
                <span className="display-sm block text-navy">{FORMATS[f]}</span>
                <span className="text-muted">{FORMAT_TEXT[f]}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="display-lg text-navy">Su enfoque</h2>
          <p className="mt-3 text-muted">Temas de los {LONG_VIDEOS.length} videos de la muestra usada en esta demo (no del canal completo).</p>
          <ul className="mt-5 space-y-3">
            {counts.map(({ t, n }) => (
              <li key={t}>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{TOPICS[t].label}</span>
                  <span className="text-muted">{n}</span>
                </div>
                <div className="mt-1 h-2.5 bg-line">
                  <div className="h-full bg-blue" style={{ width: `${(n / max) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="plataformas" className="bg-white py-12" aria-labelledby="h-plataformas">
        <div className="wrap">
          <h2 id="h-plataformas" className="display-lg text-navy">
            Plataformas oficiales
          </h2>
          <ul data-tour="community" className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {SITE.socials.map((s) => (
              <li key={s.id}>
                <Ext href={s.url} className="flex h-full items-center gap-4 border-2 border-navy p-4 hover:bg-navy hover:text-white">
                  <PlatformIcon id={s.id} className="h-7 w-7 shrink-0" />
                  <span className="min-w-0">
                    <span className="display-sm block">{s.label}</span>
                    <span className="block break-words text-sm">{s.handle}</span>
                  </span>
                </Ext>
              </li>
            ))}
            <li>
              <Ext href={SITE.shok.programUrl} className="flex h-full items-center gap-4 border-2 border-navy p-4 hover:bg-navy hover:text-white">
                <PlatformIcon id="radio" className="h-7 w-7 shrink-0" />
                <span className="min-w-0">
                  <span className="display-sm block">Shok Multimedia</span>
                  <span className="block text-sm">Programa en radio ({SITE.shok.radio}) y streaming</span>
                </span>
              </Ext>
            </li>
          </ul>
        </div>
      </section>

      <section className="py-12" aria-labelledby="h-galeria">
        <div className="wrap">
          <h2 id="h-galeria" className="display-lg text-navy">
            Galería del canal
          </h2>
          <p className="mt-2 max-w-prose text-muted">
            Miniaturas servidas por YouTube. Cuando el medio autorice fotografías propias, este espacio puede convertirse en una galería editorial.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-2 md:grid-cols-4">
            {gallery.map((v) => (
              <li key={v.id}>
                <Link to={`/tv/${v.id}`} className="group block">
                  <Thumb id={v.id} alt={v.headline} className="aspect-video w-full transition-opacity group-hover:opacity-80" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="aviso" className="bg-navy-950 py-12 text-white" aria-labelledby="h-aviso">
        <div className="wrap max-w-4xl">
          <h2 id="h-aviso" className="display-lg">
            Aviso sobre esta demo
          </h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-white/85">
            <li>
              <strong className="text-lime">{SITE.disclaimer}</strong> Es una propuesta tecnológica independiente desarrollada por{" "}
              <Ext href={SITE.developer.url} className="link-u text-white">
                {SITE.developer.name}
              </Ext>
              , sin participación del medio.
            </li>
            <li>
              El símbolo «{SITE.demoMark}» y el rótulo de la cabecera son un identificador temporal. No son el logotipo oficial ni un rediseño de la marca.
            </li>
            <li>
              Los videos se reproducen con el reproductor oficial de YouTube y las miniaturas se cargan desde sus servidores. La demo no descarga ni
              redistribuye contenido audiovisual.
            </li>
            <li>Las notas de la sección Noticias son demostrativas y citan su fuente. No hay declaraciones, marcadores, rankings ni patrocinadores inventados.</li>
            <li>
              Los títulos, canales y enlaces se verificaron el {formatDate(SITE.verifiedOn)}. Las fechas de publicación de los videos no se pudieron verificar y por
              eso no se muestran.
            </li>
            <li>Meketrefes del Deporte, Shok Multimedia, YouTube, Instagram y X son marcas de sus respectivos titulares.</li>
          </ul>
        </div>
      </section>
    </>
  );
}
