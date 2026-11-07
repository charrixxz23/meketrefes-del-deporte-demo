# Despliegue

## Requisitos

- Node.js 20 o 22 (`.nvmrc` indica 22) y npm.
- Para las pruebas de navegador: `npx playwright install chromium`.

## Local

```bash
npm ci
npm run dev                       # http://localhost:5173/meketrefes-del-deporte-demo/
npm run typecheck && npm test     # tipos + pruebas unitarias
npm run build                     # genera dist/ (incluye 404.html y .nojekyll)
node scripts/serve-pages.mjs      # sirve dist/ como GitHub Pages en http://localhost:4173/meketrefes-del-deporte-demo/
npm run test:e2e                  # Playwright: escritorio, Android e iPhone (emulados en Chromium)
```

En Windows (PowerShell) los comandos son los mismos.

## GitHub Pages

El flujo `.github/workflows/deploy.yml` se ejecuta en cada *push* a `main` (y manualmente):

1. `npm ci` (dependencias exactas de `package-lock.json`).
2. Calcula la ruta base (`/<repositorio>/`) y la URL pública (`https://<usuario>.github.io/<repositorio>/`).
3. Verificación de tipos, pruebas unitarias, compilación y pruebas de extremo a extremo.
4. Publica `dist/` con `actions/deploy-pages`. Si un paso falla, el despliegue se detiene y el error aparece en la pestaña *Actions*.

### Primera vez

1. Cree el repositorio vacío `meketrefes-del-deporte-demo` y suba el código a `main`.
2. *Settings → Pages → Build and deployment → Source:* **GitHub Actions**.
   Con la CLI: `gh api -X POST repos/<usuario>/meketrefes-del-deporte-demo/pages -f build_type=workflow`.
3. Ejecute el flujo (o haga un *push*). La URL aparece en el resumen del trabajo *Publicar*.

### Rutas internas sin errores 404

GitHub Pages no conoce las rutas de la aplicación (`/tv/…`, `/noticias/…`). `scripts/postbuild.mjs` copia
`index.html` como `404.html`, así que cualquier ruta carga la aplicación y React Router muestra la página correcta.
Consecuencia conocida: esas rutas responden con código HTTP 404 aunque se vean bien. Para una versión oficial con SEO
conviene un alojamiento con reescrituras (Netlify, Vercel, Cloudflare Pages) o pre-renderizar las rutas.

### Otra cuenta o dominio

- Otro usuario de GitHub: el flujo calcula la URL automáticamente. Actualice `SITE.developer` y `SITE.repoUrl` en `src/data/site.ts` y los enlaces del README.
- Dominio propio: compile con `BASE_PATH=/` y `SITE_URL=https://dominio/`, y añada `public/CNAME`.
  No use dominios que puedan confundirse con un sitio oficial del medio.

## Capturas

`node scripts/screenshots.mjs [URL]` regenera `docs/screenshots/`. Las capturas incluidas se tomaron en un entorno sin
acceso a los servidores de YouTube, por eso muestran el marcador «Miniatura no disponible». Para obtenerlas con las
miniaturas reales:

```bash
node scripts/screenshots.mjs https://<usuario>.github.io/meketrefes-del-deporte-demo/
```
