import { SITE } from "../data/site";

/**
 * Identificador TEMPORAL de la demo. No es el logotipo oficial de Meketrefes del Deporte
 * ni pretende ser un rediseño: se sustituye por el logotipo autorizado en una versión oficial.
 */
export function DemoMonogram({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path d="M10 2h36L38 46H2z" fill="var(--mk-blue)" />
      <path d="M33 2h13l-8 44H25z" fill="var(--mk-lime)" />
      <text
        x="20"
        y="33.5"
        textAnchor="middle"
        fontFamily="Barlow Condensed, Arial Narrow, sans-serif"
        fontStyle="italic"
        fontWeight="800"
        fontSize="22"
        fill="#fff"
      >
        {SITE.demoMark}
      </text>
    </svg>
  );
}

export function DemoMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <DemoMonogram />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] font-extrabold italic uppercase tracking-tight text-white">
          Meketrefes <span className="font-semibold not-italic normal-case text-white/80">del Deporte</span>
        </span>
        {!compact && <span className="mt-1 text-[0.68rem] font-medium text-lime">Identificador temporal · demo</span>}
      </span>
    </span>
  );
}
