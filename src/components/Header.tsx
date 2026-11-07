import { Bookmark, Compass, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { DemoMark } from "./DemoMark";
import { useTour } from "./Tour";

export const NAV = [
  { to: "/", label: "Inicio", end: true },
  { to: "/noticias", label: "Noticias" },
  { to: "/tv", label: "Meketrefes TV" },
  { to: "/shorts", label: "Shorts" },
  { to: "/programas", label: "Programas" },
  { to: "/conocenos", label: "Conócenos" },
  { to: "/alianzas", label: "Alianzas" },
];

function SearchForm({ onDone, autoFocus = false }: { onDone?: () => void; autoFocus?: boolean }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    navigate(`/buscar?q=${encodeURIComponent(term)}`);
    setQ("");
    onDone?.();
  };
  return (
    <form role="search" onSubmit={submit} className="flex w-full items-stretch">
      <label htmlFor={autoFocus ? "q-top" : "q-menu"} className="sr-only">
        Buscar videos, notas y programas
      </label>
      <input
        id={autoFocus ? "q-top" : "q-menu"}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus={autoFocus}
        placeholder="Buscar: LPF, Mundial, podcast…"
        className="min-h-[44px] w-full min-w-0 border-0 bg-white px-4 text-ink placeholder:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
      />
      <button type="submit" className="bg-lime px-4 text-navy hover:bg-white" aria-label="Buscar">
        <Search className="h-5 w-5" aria-hidden="true" />
      </button>
    </form>
  );
}

export function Header() {
  const [menu, setMenu] = useState(false);
  const [searching, setSearching] = useState(false);
  const { pathname } = useLocation();
  const { favorites } = useFavorites();
  const tour = useTour();
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMenu(false);
    setSearching(false);
  }, [pathname]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        menuBtn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menu]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-2.5 py-2 font-display text-[1.12rem] font-bold italic tracking-wide transition-colors xl:px-3 ${
      isActive ? "text-lime" : "text-white hover:text-lime"
    }`;

  return (
    <header className="sticky top-0 z-40 bg-navy text-white shadow-[0_1px_0_rgb(255_255_255/0.08)]">
      <div className="wrap flex h-16 items-center gap-3">
        <Link to="/" className="mr-auto shrink-0" aria-label="Meketrefes del Deporte, demo: ir a la portada">
          <DemoMark />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center">
            {NAV.map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} end={n.end} className={navClass}>
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearching((s) => !s)}
            aria-expanded={searching}
            aria-controls="buscador"
            className="grid h-11 w-11 place-items-center hover:text-lime"
            aria-label={searching ? "Cerrar buscador" : "Abrir buscador"}
          >
            {searching ? <X className="h-5 w-5" aria-hidden="true" /> : <Search className="h-5 w-5" aria-hidden="true" />}
          </button>
          <Link to="/favoritos" className="relative grid h-11 w-11 place-items-center hover:text-lime" aria-label={`Favoritos (${favorites.length})`}>
            <Bookmark className="h-5 w-5" aria-hidden="true" />
            {favorites.length > 0 && (
              <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-lime px-1 text-[0.65rem] font-bold text-navy" aria-hidden="true">
                {favorites.length}
              </span>
            )}
          </Link>
          <button type="button" onClick={tour.start} className="btn btn-lime ml-2 hidden !min-h-[40px] !px-4 !text-base xl:inline-flex" data-testid="tour-start">
            <span className="flex items-center gap-1.5">
              <Compass className="h-4 w-4" aria-hidden="true" /> Explorar la demo
            </span>
          </button>
          <button
            ref={menuBtn}
            type="button"
            className="grid h-11 w-11 place-items-center lg:hidden"
            aria-expanded={menu}
            aria-controls="menu-movil"
            onClick={() => setMenu(true)}
            aria-label="Abrir menú"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {searching && (
        <div id="buscador" className="border-t border-white/10 bg-navy-800 py-3">
          <div className="wrap">
            <SearchForm autoFocus onDone={() => setSearching(false)} />
          </div>
        </div>
      )}

      {menu && (
        <div id="menu-movil" role="dialog" aria-modal="true" aria-label="Menú" className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-navy-950 lg:hidden">
          <div className="wrap flex h-16 shrink-0 items-center justify-between">
            <DemoMark compact />
            <button type="button" onClick={() => setMenu(false)} className="grid h-11 w-11 place-items-center" aria-label="Cerrar menú" autoFocus>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="wrap pb-8">
            <SearchForm onDone={() => setMenu(false)} />
            <nav aria-label="Principal (móvil)" className="mt-6">
              <ul>
                {NAV.map((n) => (
                  <li key={n.to} className="border-b border-white/10">
                    <NavLink
                      to={n.to}
                      end={n.end}
                      className={({ isActive }) =>
                        `block py-3 font-display text-[2rem] font-extrabold italic uppercase leading-none ${isActive ? "text-lime" : "text-white"}`
                      }
                    >
                      {n.label}
                    </NavLink>
                  </li>
                ))}
                <li className="border-b border-white/10">
                  <NavLink to="/favoritos" className="block py-3 font-display text-[1.5rem] font-bold italic text-white/85">
                    Mis favoritos ({favorites.length})
                  </NavLink>
                </li>
              </ul>
            </nav>
            <button
              type="button"
              className="btn btn-lime mt-8 w-full"
              onClick={() => {
                setMenu(false);
                tour.start();
              }}
            >
              <span className="flex items-center gap-2">
                <Compass className="h-5 w-5" aria-hidden="true" /> Explorar la demo
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
