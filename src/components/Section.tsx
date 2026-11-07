import type { ReactNode } from "react";
import { Link } from "react-router-dom";

/** Cabecera de sección: titular y, si existe, un enlace a la sección completa. */
export function SectionHead({
  title,
  intro,
  to,
  linkLabel,
  dark = false,
  id,
}: {
  title: string;
  intro?: ReactNode;
  to?: string;
  linkLabel?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <div className="min-w-0">
        <h2 id={id} className={`display-lg ${dark ? "text-white" : "text-navy"}`}>
          {title}
        </h2>
        {intro && <p className={`mt-2 max-w-prose ${dark ? "text-white/75" : "text-muted"}`}>{intro}</p>}
      </div>
      {to && linkLabel && (
        <Link to={to} className={`link-u shrink-0 font-semibold ${dark ? "text-lime" : "text-blue"}`}>
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
