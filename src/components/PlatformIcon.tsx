/** Glifos genéricos (no logotipos de marca) para identificar plataformas junto a su nombre. */
export function PlatformIcon({ id, className = "h-5 w-5" }: { id: string; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", "aria-hidden": true, focusable: false } as const;
  if (id === "youtube")
    return (
      <svg {...common} fill="currentColor">
        <rect x="2" y="5" width="20" height="14" rx="4" />
        <path d="M10 9v6l5-3z" fill="var(--mk-navy)" />
      </svg>
    );
  if (id === "instagram")
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  if (id === "x")
    return (
      <svg {...common} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M5 4l14 16M19 4L5 20" />
      </svg>
    );
  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}
