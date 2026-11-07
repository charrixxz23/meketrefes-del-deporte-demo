import { Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { ErrorBoundary, PageLoading } from "../components/States";
import { TourProvider } from "../components/Tour";
import { SITE } from "../data/site";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export function RootLayout() {
  const { pathname } = useLocation();
  return (
    <TourProvider>
      <ScrollManager />
      <a href="#contenido" className="sr-only z-50 bg-lime px-4 py-2 font-semibold text-navy focus:not-sr-only focus:fixed focus:left-2 focus:top-2">
        Saltar al contenido
      </a>
      <div className="bg-navy-950 text-[0.78rem] text-white/80">
        <p className="wrap py-1.5">{SITE.disclaimer}</p>
      </div>
      <Header />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <ErrorBoundary resetKey={pathname}>
          <Suspense fallback={<PageLoading />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </TourProvider>
  );
}
