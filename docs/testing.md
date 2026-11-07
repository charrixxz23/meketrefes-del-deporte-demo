# Validación

Ejecutada el 6 de noviembre de 2026 en Linux con Node.js 22 y Chromium (Playwright 1.63).

| Comprobación | Comando | Resultado |
|---|---|---|
| Instalación reproducible (copia limpia extraída del ZIP) | `npm ci` | 250 paquetes, sin errores |
| Tipos (TypeScript estricto) | `npm run typecheck` | Sin errores |
| Pruebas unitarias (Vitest) | `npm test` | **32 aprobadas** (4 archivos) |
| Compilación | `npm run build` | Sin errores |
| Extremo a extremo (Playwright) | `npm run test:e2e` | **74 aprobadas, 4 omitidas** por perfil (las de teclado y Escape solo aplican a escritorio). Repetida 3 veces seguidas: 222 aprobadas, 12 omitidas, 0 fallidas. |

Durante el desarrollo una prueba falló de forma intermitente por una condición de carrera **en la propia prueba**
(contaba las notas antes de que la página terminara de cargar). Se corrigió esperando a que el contenido sea visible.

## Qué cubren las pruebas de navegador

En tres perfiles (escritorio 1440 × 900, Android Pixel 7 e iPhone 14, estos dos emulados en Chromium):

- Las 13 rutas cargan con la ruta base de GitHub Pages, sin errores de consola ni desplazamiento horizontal, y con el aviso de demo en el pie.
- Recarga directa de rutas internas (respaldo `404.html`) y página 404 propia.
- Navegación principal (barra en escritorio, menú en móvil).
- Noticias: filtro por categoría, búsqueda, estado vacío y «Quitar filtros».
- Búsqueda global sin tildes.
- El reproductor oficial solo se inserta al pulsar «Reproducir»; la señal en vivo solo al pedirla.
- Visor de Shorts: botón «Siguiente» y flechas del teclado.
- Favoritos: guardar, persistir tras recargar, listar y vaciar.
- Recorrido guiado: 7 pasos, cada uno en su ruta y resaltando su componente; «Anterior», «Siguiente», «Finalizar»,
  y que después no quede resaltado ni bloqueo de navegación. Escape lo cierra.
- Formulario comercial: validación con foco en el primer error y confirmación honesta de que no envió nada.
- Enlaces externos: solo dominios oficiales y `rel="noopener"`.
- Teclado: el primer Tab llega a «Saltar al contenido».

## Lo que no se pudo verificar en el entorno de desarrollo

| Elemento | Motivo | Cómo verificarlo |
|---|---|---|
| Carga real de miniaturas y reproducción de videos | El entorno no tenía acceso a `youtube.com` ni a `i.ytimg.com`. Se verificó que el reproductor se inserta con la URL correcta y que las miniaturas caen al marcador si fallan. | Abrir la URL publicada; el flujo de GitHub Actions sí tiene acceso a internet. |
| Safari / WebKit real | Solo había Chromium. | Probar en un iPhone. |
| URL pública en GitHub Pages | El despliegue lo realiza el propietario de la cuenta. | Ver `deployment.md`. |
| Instagram y X | Bloquean el acceso automático. | Revisión manual de los perfiles. |
