import { useCallback, useSyncExternalStore } from "react";

export type FavKind = "video" | "article";
export interface Favorite {
  kind: FavKind;
  id: string;
}

const KEY = "mk-demo:favoritos";
const listeners = new Set<() => void>();
let cache: Favorite[] | null = null;

const read = (): Favorite[] => {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    cache = Array.isArray(parsed)
      ? parsed.filter((f): f is Favorite => !!f && typeof f.id === "string" && (f.kind === "video" || f.kind === "article"))
      : [];
  } catch {
    cache = [];
  }
  return cache;
};

const write = (next: Favorite[]) => {
  cache = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* Almacenamiento no disponible (modo privado): se conservan en memoria. */
  }
  listeners.forEach((l) => l());
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      cache = null;
      l();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", onStorage);
  };
};

const EMPTY: Favorite[] = [];

/** Favoritos guardados en este navegador. */
export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, read, () => EMPTY);
  const has = useCallback((kind: FavKind, id: string) => favorites.some((f) => f.kind === kind && f.id === id), [favorites]);
  const toggle = useCallback((kind: FavKind, id: string) => {
    const cur = read();
    const exists = cur.some((f) => f.kind === kind && f.id === id);
    write(exists ? cur.filter((f) => !(f.kind === kind && f.id === id)) : [{ kind, id }, ...cur]);
    return !exists;
  }, []);
  const clear = useCallback(() => write([]), []);
  return { favorites, has, toggle, clear };
}

/** Solo para pruebas. */
export const __resetFavoritesCache = () => {
  cache = null;
};
