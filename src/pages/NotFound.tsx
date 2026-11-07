import { NotFoundState } from "../components/States";
import { usePageMeta } from "../hooks/usePageMeta";

export default function NotFound() {
  usePageMeta("Página no encontrada");
  return <NotFoundState title="Fuera de juego" text="Esta página no existe en la demo. Vuelva a la portada o use el menú para seguir navegando." />;
}
