import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TOUR_STEPS } from "../data/tour";

interface TourApi {
  active: boolean;
  start: () => void;
}
const TourContext = createContext<TourApi>({ active: false, start: () => {} });
export const useTour = () => useContext(TourContext);

const HIGHLIGHT = "tour-target";

/**
 * Recorrido "Explorar la demo": señala componentes reales de cada sección.
 * No bloquea la navegación (el resaltado no intercepta clics) y al terminar
 * elimina cualquier rastro visual.
 */
export function TourProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<number | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [found, setFound] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const clearHighlight = () => document.querySelectorAll(`.${HIGHLIGHT}`).forEach((el) => el.classList.remove(HIGHLIGHT));

  const finish = useCallback(() => {
    clearHighlight();
    setStep(null);
    opener.current?.focus?.();
  }, []);

  const start = useCallback(() => {
    opener.current = document.activeElement as HTMLElement | null;
    setStep(0);
  }, []);

  // Navegar a la ruta del paso.
  useEffect(() => {
    if (step === null) return;
    const s = TOUR_STEPS[step];
    if (pathname !== s.route) navigate(s.route);
  }, [step, pathname, navigate]);

  // Esperar a que el componente exista y resaltarlo.
  useEffect(() => {
    if (step === null) return;
    const s = TOUR_STEPS[step];
    if (pathname !== s.route) return;
    clearHighlight();
    let raf = 0;
    const t0 = performance.now();
    const look = () => {
      const el = document.querySelector<HTMLElement>(s.target);
      if (el) {
        el.classList.add(HIGHLIGHT);
        el.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        setFound(true);
      } else if (performance.now() - t0 < 4000) raf = requestAnimationFrame(look);
      else setFound(false);
    };
    raf = requestAnimationFrame(look);
    panelRef.current?.focus();
    return () => cancelAnimationFrame(raf);
  }, [step, pathname]);

  useEffect(() => {
    if (step === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, finish]);

  useEffect(() => () => clearHighlight(), []);

  const api = useMemo(() => ({ active: step !== null, start }), [step, start]);
  const s = step !== null ? TOUR_STEPS[step] : null;
  const last = step === TOUR_STEPS.length - 1;

  return (
    <TourContext.Provider value={api}>
      {children}
      {s && step !== null && (
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="false"
          aria-labelledby="tour-title"
          aria-describedby="tour-text"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md border-t-4 border-lime bg-navy p-5 text-white shadow-2xl outline-none sm:inset-x-auto sm:bottom-6 sm:right-6"
          data-testid="tour"
        >
          <div className="flex items-start justify-between gap-4">
            <p className="text-sm text-white/70" aria-live="polite">
              Paso {step + 1} de {TOUR_STEPS.length}
            </p>
            <button type="button" onClick={finish} className="-m-2 p-2 text-white/80 hover:text-lime" aria-label="Cerrar el recorrido">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <h2 id="tour-title" className="display-md mt-1">
            {s.title}
          </h2>
          <p id="tour-text" className="mt-2 text-[0.95rem] leading-relaxed text-white/90">
            {s.text}
          </p>
          {!found && <p className="mt-2 text-sm text-lime">No se encontró el componente en pantalla; puede continuar con el siguiente paso.</p>}
          <div className="mt-3 flex gap-1" aria-hidden="true">
            {TOUR_STEPS.map((x, i) => (
              <span key={x.id} className={`h-1 flex-1 ${i <= step ? "bg-lime" : "bg-white/20"}`} />
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <button type="button" onClick={finish} className="link-u text-sm text-white/80">
              Omitir recorrido
            </button>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
                className="btn btn-ghost text-white disabled:opacity-40"
              >
                <span className="flex items-center gap-1">
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Anterior
                </span>
              </button>
              <button type="button" onClick={() => (last ? finish() : setStep(step + 1))} className="btn btn-lime">
                <span className="flex items-center gap-1">
                  {last ? "Finalizar" : "Siguiente"}
                  {!last && <ChevronRight className="h-4 w-4" aria-hidden="true" />}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </TourContext.Provider>
  );
}
