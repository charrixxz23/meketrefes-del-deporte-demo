import { useEffect } from "react";
import { SITE } from "../data/site";

/** Título del documento y descripción por página. */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE.name} (demo)` : `${SITE.name} | Demo web`;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}
