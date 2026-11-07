# Fuentes de contenido y verificación

Fecha de la investigación: **6 de noviembre de 2026**.

## Qué se pudo consultar

| Fuente | Resultado | Uso en la demo |
|---|---|---|
| YouTube, página del canal [@MeketrefesDelDeporte](https://www.youtube.com/@MeketrefesDelDeporte) | Accesible parcialmente: nombre, identificador `UCralRBxMBGVaPM7ENvnHpNA`, descripción (podcasts, reportajes, transmisiones en vivo y cobertura deportiva) y palabras clave (deportes, Panamá, fútbol, LPF, Selección de Panamá). La lista de videos no se pudo leer (página generada con JavaScript; el feed RSS bloquea el acceso automático). | Datos del canal y enlaces. |
| YouTube oEmbed (`youtube.com/oembed`) | Accesible. Devuelve título exacto, canal y proporción del video. | **Verificación de cada video** del catálogo: título y autor «Meketrefes Del Deporte». La proporción 113 × 200 confirma los Shorts. |
| Buscador web | Accesible. | Descubrir identificadores de videos, que luego se verificaron con oEmbed. |
| [Shok Multimedia, página del programa](https://www.shokmultimedia.com/programas/maketrefes-del-deporte/) | Accesible. Describe una hora diaria de debate, análisis y humor; **lunes a viernes, 11:00 a. m. – 12:00 p. m.**; streaming y **93.3 FM**. No nombra presentadores. La página escribe el nombre como «Maketrefes» en la URL y el título y «Meketrefes» en el menú. | Programa «En Shok Multimedia» y nota guía, con fuente y fecha. |
| Instagram [@meketrefesdeldeporte](https://www.instagram.com/meketrefesdeldeporte/) | **No accesible** (bloqueo a herramientas automáticas). El perfil aparece en resultados de búsqueda. | Solo enlace al perfil. Sin publicaciones, fotos ni cifras. |
| X [@SportMeketrefes](https://x.com/SportMeketrefes) | **No accesible** (bloqueo a herramientas automáticas). Usuario tomado del brief. | Solo enlace al perfil. |
| Facebook | Aparece una página «Meketrefes Del Deporte» en buscadores, pero no se pudo abrir. | **No se incluye** hasta confirmarla. |
| Canal «Meketrefes Live» (@meketrefesLive) y videos en «Shok 360» | Existen videos con el nombre del medio en otros canales. | **No se incluyen**: no se pudo confirmar su relación oficial. |
| Logotipo e ilustración (archivos en shokmultimedia.com) | Se localizaron sus URL pero no se pudieron abrir. | **No se usan.** Se creó un identificador temporal. |

## Limitaciones declaradas

1. **Fechas de publicación**: no se pudieron verificar (ni la página del video ni el feed RSS fueron accesibles).
   La web no muestra fechas ni rotula nada como «lo último». El campo `publishedAt` existe para cuando se carguen fechas reales.
2. **Orden del catálogo**: es editorial (por tema), no cronológico.
3. **Shorts**: solo se pudieron verificar 2. La sección enlaza a todos los Shorts del canal.
4. **Transmisiones**: los títulos «… EN VIVO» corresponden a transmisiones ya publicadas. La web las rotula como
   «Transmisión publicada»; la señal en vivo solo se carga cuando el visitante la pide, y la comprueba el propio YouTube.
5. **Paleta**: ver `design-system.md`.
6. **Seguidores y estadísticas**: no se muestran.

## Qué se considera contenido demostrativo

- **Notas «nota-video»**: texto redactado para la demo a partir del título público del video. No resume lo que
  se dice en el video, no atribuye declaraciones y no añade marcadores. Cada una lleva el aviso «Nota demostrativa».
- **Guías**: información pública verificable con su fuente y fecha de consulta.
- **Espacios comerciales**: conceptuales, marcados «Disponible» y «Espacio demostrativo».
- **Formulario**: valida y prepara el mensaje, pero no lo envía (no hay correo comercial verificado).

## Cómo actualizar el contenido

| Qué | Archivo |
|---|---|
| Videos, Shorts, listas y video de portada | `src/data/videos.ts` |
| Notas | `src/data/articles.ts` |
| Programas (horario y presentadores solo con fuente) | `src/data/programs.ts` |
| Redes, enlaces, correo comercial, aviso | `src/data/site.ts` |
| Espacios comerciales | `src/data/partnerships.ts` |
| Recorrido guiado | `src/data/tour.ts` |

**Añadir un video:**

1. Copie el identificador de 11 caracteres (`watch?v=XXXXXXXXXXX` o `/shorts/XXXXXXXXXXX`).
2. Compruebe título y canal abriendo
   `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=XXXXXXXXXXX&format=json`.
3. Añada una entrada en `VIDEOS` con `title` (exacto), `headline`, `topic`, `format` y, si es un Short, `vertical: true`.
4. Ejecute `npm test`: las pruebas comprueban identificadores, duplicados, programas y notas.

## Sincronización futura con YouTube (sin claves en el navegador)

1. Un GitHub Action programado (por ejemplo, cada 6 horas) llama a la **YouTube Data API v3**
   (`playlistItems.list` sobre la lista de subidas `UU…` del canal y `videos.list` para duración y estado en vivo)
   con una clave guardada como **secreto del repositorio**, nunca en el frontend.
2. El script escribe `src/data/videos.generated.json` con id, título, fecha real, duración y miniatura.
3. Si hay cambios, abre un *pull request* para revisión editorial; al aprobarlo, el despliegue publica la web.
4. Alternativa sin clave: el feed RSS público del canal (`/feeds/videos.xml?channel_id=…`), leído desde el Action,
   respetando las condiciones de uso de YouTube.
5. Para Instagram, la vía oficial es la **Instagram Graph API** con una cuenta profesional y un token del propio medio.
