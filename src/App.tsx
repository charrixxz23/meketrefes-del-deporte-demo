import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import Home from "./pages/Home";

const News = lazy(() => import("./pages/News"));
const ArticlePage = lazy(() => import("./pages/ArticlePage"));
const TV = lazy(() => import("./pages/TV"));
const VideoPage = lazy(() => import("./pages/VideoPage"));
const Shorts = lazy(() => import("./pages/Shorts"));
const ShortViewer = lazy(() => import("./pages/ShortViewer"));
const Programs = lazy(() => import("./pages/Programs"));
const ProgramPage = lazy(() => import("./pages/ProgramPage"));
const About = lazy(() => import("./pages/About"));
const Partners = lazy(() => import("./pages/Partners"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const Favorites = lazy(() => import("./pages/Favorites"));
const NotFound = lazy(() => import("./pages/NotFound"));

// import.meta.env.BASE_URL = "/meketrefes-del-deporte-demo/" en GitHub Pages.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "noticias", element: <News /> },
        { path: "noticias/:slug", element: <ArticlePage /> },
        { path: "tv", element: <TV /> },
        { path: "tv/:id", element: <VideoPage /> },
        { path: "shorts", element: <Shorts /> },
        { path: "shorts/:id", element: <ShortViewer /> },
        { path: "programas", element: <Programs /> },
        { path: "programas/:slug", element: <ProgramPage /> },
        { path: "conocenos", element: <About /> },
        { path: "alianzas", element: <Partners /> },
        { path: "buscar", element: <SearchPage /> },
        { path: "favoritos", element: <Favorites /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  { basename },
);

export function App() {
  return <RouterProvider router={router} />;
}
