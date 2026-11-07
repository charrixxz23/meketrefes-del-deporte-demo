import { Link } from "react-router-dom";
import { SITE } from "../data/site";
import { DemoMark } from "./DemoMark";
import { Ext } from "./ExternalLink";
import { NAV } from "./Header";
import { PlatformIcon } from "./PlatformIcon";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="h-2 bg-gradient-to-r from-blue via-blue to-lime" aria-hidden="true" />
      <div className="wrap grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <DemoMark />
          <p className="mt-4 max-w-sm text-sm text-white/75">
            Propuesta de portal web para un medio deportivo de Panamá: fútbol panameño, Selección, Concacaf, debate y transmisiones.
          </p>
          <ul className="mt-5 flex gap-2">
            {SITE.socials.map((s) => (
              <li key={s.id}>
                <Ext href={s.url} className="grid h-11 w-11 place-items-center border border-white/20 hover:border-lime hover:text-lime">
                  <PlatformIcon id={s.id} />
                  <span className="sr-only">{s.label}</span>
                </Ext>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Secciones">
          <h2 className="font-display text-lg font-bold italic text-lime">Secciones</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm md:grid-cols-1">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-lime">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/favoritos" className="hover:text-lime">
                Favoritos
              </Link>
            </li>
          </ul>
        </nav>
        <div className="text-sm text-white/75">
          <h2 className="font-display text-lg font-bold italic text-lime">Sobre esta demo</h2>
          <p className="mt-3">
            Videos y miniaturas: reproductores y servidores oficiales de YouTube. Las marcas y contenidos pertenecen a sus titulares.
          </p>
          <p className="mt-3">
            Desarrollo de la demo:{" "}
            <Ext href={SITE.developer.url} className="link-u text-white">
              {SITE.developer.name}
            </Ext>
          </p>
          <p className="mt-3">
            <Link to="/conocenos#aviso" className="link-u text-white">
              Aviso sobre contenido y marcas
            </Link>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="wrap py-5 text-sm font-semibold text-lime" data-testid="disclaimer">
          {SITE.disclaimer}
        </p>
      </div>
    </footer>
  );
}
