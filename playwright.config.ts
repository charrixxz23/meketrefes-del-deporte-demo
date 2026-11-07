import { defineConfig, devices } from "@playwright/test";

const PORT = 4173;
const BASE = process.env.BASE_PATH ?? "/meketrefes-del-deporte-demo/";

/**
 * Pruebas de extremo a extremo contra la compilación de producción servida como en GitHub Pages
 * (ruta base /meketrefes-del-deporte-demo/ y 404.html como respaldo).
 * Los perfiles móviles emulan Android y iPhone sobre Chromium (tamaño, densidad, táctil y agente de usuario);
 * no sustituyen una prueba en Safari real.
 */
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}${BASE}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "escritorio", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "android", use: { ...devices["Pixel 7"] } },
    { name: "iphone", use: { ...devices["iPhone 14"], browserName: "chromium", defaultBrowserType: "chromium" } },
  ],
  webServer: {
    command: `node scripts/serve-pages.mjs ${PORT}`,
    url: `http://localhost:${PORT}${BASE}`,
    reuseExistingServer: !process.env.CI,
  },
});
