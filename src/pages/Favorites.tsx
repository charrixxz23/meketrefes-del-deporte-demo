import { Link } from "react-router-dom";
import { ArticleCard } from "../components/ArticleCard";
import { ShortCard } from "../components/ShortCard";
import { VideoCard } from "../components/VideoCard";
import { articleBySlug } from "../data/articles";
import { useFavorites } from "../hooks/useFavorites";
import { usePageMeta } from "../hooks/usePageMeta";
import { videoById } from "../utils/catalog";

export default function Favorites() {
  usePageMeta("Favoritos");
  const { favorites, clear } = useFavorites();
  const videos = favorites.filter((f) => f.kind === "video").map((f) => videoById(f.id)).filter((v) => !!v);
  const articles = favorites.filter((f) => f.kind === "article").map((f) => articleBySlug(f.id)).filter((a) => !!a);

  return (
    <div className="wrap py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="display-xl text-navy">Favoritos</h1>
          <p className="mt-2 text-muted">Se guardan solo en este navegador. No hace falta cuenta.</p>
        </div>
        {favorites.length > 0 && (
          <button type="button" onClick={clear} className="btn btn-ghost-dark">
            <span>Vaciar favoritos</span>
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="mt-8 bg-white p-8">
          <h2 className="display-md text-navy">Aún no guardó nada</h2>
          <p className="mt-2 text-muted">Pulse «Guardar» en un video o una nota para encontrarlo aquí después.</p>
          <Link to="/tv" className="btn btn-blue mt-5">
            <span>Ir a Meketrefes TV</span>
          </Link>
        </div>
      ) : (
        <>
          {videos.length > 0 && (
            <section className="mt-10" aria-label="Videos guardados">
              <h2 className="display-md text-navy">Videos</h2>
              <div className="mt-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((v) => (v.vertical ? <ShortCard key={v.id} v={v} className="max-w-[16rem]" /> : <VideoCard key={v.id} v={v} />))}
              </div>
            </section>
          )}
          {articles.length > 0 && (
            <section className="mt-10" aria-label="Notas guardadas">
              <h2 className="display-md text-navy">Notas</h2>
              <div className="mt-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((a) => (
                  <ArticleCard key={a.slug} a={a} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
