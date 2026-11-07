/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Ruta base de GitHub Pages: https://<usuario>.github.io/meketrefes-del-deporte-demo/
// Se puede cambiar con BASE_PATH (por ejemplo "/" para un dominio propio).
const base = process.env.BASE_PATH ?? "/meketrefes-del-deporte-demo/";
// URL pública (para metadatos de redes sociales). Cambiar con SITE_URL si se publica en otra cuenta.
const siteUrl = (process.env.SITE_URL ?? "https://charrixxz23.github.io/meketrefes-del-deporte-demo/").replace(/\/?$/, "/");

export default defineConfig({
  base,
  plugins: [
    react(),
    {
      name: "site-url",
      transformIndexHtml: (html) => html.replaceAll("__SITE_URL__", siteUrl),
    },
  ],
  build: {
    target: "es2020",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: { react: ["react", "react-dom", "react-router-dom"] },
      },
    },
  },
  test: {
    environment: "jsdom",
    include: ["tests/unit/**/*.test.{ts,tsx}"],
  },
});
