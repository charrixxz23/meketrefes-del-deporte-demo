import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";

export function PageLoading() {
  return (
    <div className="wrap py-16" role="status" aria-live="polite">
      <div className="skeleton h-10 w-2/3 max-w-lg" />
      <div className="skeleton mt-4 h-4 w-1/2 max-w-sm" />
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton aspect-video" />
        ))}
      </div>
      <span className="sr-only">Cargando la sección…</span>
    </div>
  );
}

export function NotFoundState({ title, text, to = "/", cta = "Ir a la portada" }: { title: string; text: string; to?: string; cta?: string }) {
  return (
    <div className="wrap py-20">
      <h1 className="display-lg text-navy">{title}</h1>
      <p className="mt-3 max-w-prose text-muted">{text}</p>
      <Link to={to} className="btn btn-blue mt-6">
        <span>{cta}</span>
      </Link>
    </div>
  );
}

/** Captura errores de renderizado para que una sección rota no deje la página en blanco. */
export class ErrorBoundary extends Component<{ children: ReactNode; resetKey?: string }, { error: Error | null }> {
  state = { error: null as Error | null };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Error en la sección:", error, info.componentStack);
  }
  componentDidUpdate(prev: { resetKey?: string }) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null });
  }
  render() {
    if (this.state.error) {
      const chunk = /dynamically imported module|Loading chunk|Failed to fetch/i.test(this.state.error.message);
      return (
        <div className="wrap py-20" role="alert">
          <h1 className="display-lg text-navy">{chunk ? "No se pudo cargar esta sección" : "Esta sección tuvo un problema"}</h1>
          <p className="mt-3 max-w-prose text-muted">
            {chunk
              ? "Revise su conexión y vuelva a cargar la página. Si el sitio se actualizó mientras navegaba, recargar descarga la versión nueva."
              : "Vuelva a cargar la página. Si el problema continúa, el resto del sitio sigue disponible desde el menú."}
          </p>
          <button type="button" className="btn btn-blue mt-6" onClick={() => window.location.reload()}>
            <span>Recargar la página</span>
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
