# Sistema de diseño

**Dirección:** deporte + periodismo + energía + Panamá + personalidad. La demo adapta la identidad del medio
(azul marino, azul intenso, blanco y un acento amarillo verdoso) a un portal editorial y audiovisual, sin redibujar su logotipo.

## 1. Paleta

Todas las variables están en `src/styles/index.css` (`:root`) y se exponen a Tailwind en `tailwind.config.js`.

| Variable | Hex | Uso | Procedencia |
|---|---|---|---|
| `--mk-navy` | `#0A1D4A` | Fondo de marca, cabecera, texto principal | Referencia del brief: «azul marino profundo» |
| `--mk-navy-950` | `#061231` | Pie, franjas profundas, TV | Variante oscura del anterior |
| `--mk-navy-800` / `-700` | `#112A63` / `#1B3A7E` | Paneles sobre marino, esqueletos de carga | Variantes |
| `--mk-blue` | `#1446DB` | Botones secundarios, enlaces, bandas | Referencia del brief: «azul intenso» |
| `--mk-lime` | `#C9F02F` | Acento: rótulos, CTA principal, foco del teclado | Referencia del brief: «acento amarillo verdoso» |
| `--mk-paper` | `#F1F4FA` | Fondo de lectura | Blanco ligeramente azulado para separar secciones |
| `--mk-muted` | `#4F5B7A` | Texto secundario | Derivado del marino |
| `--mk-line` | `#D5DCEA` | Bordes y divisores | Derivado del marino |

> **Estado de verificación.** Desde el entorno de desarrollo no fue posible descargar ni muestrear las imágenes
> originales (Instagram y X bloquean el acceso automático; las miniaturas y el logotipo no se pudieron abrir).
> Los valores siguen la referencia de colores del brief y deben ajustarse con los archivos oficiales del medio.
> Basta con cambiar las variables de `:root`.

No se añadieron colores ajenos a la identidad. El único color fuera de la paleta es el rojo de error de formularios
(`#B42318`), por accesibilidad.

### Contraste (WCAG 2.1)

| Combinación | Ratio | Nivel |
|---|---|---|
| Blanco sobre marino | 16,3 : 1 | AAA |
| Lima sobre marino | 12,4 : 1 | AAA |
| Blanco sobre azul / azul sobre blanco | 7,2 : 1 | AAA |
| Azul sobre papel | 6,5 : 1 | AA (AAA en texto grande) |
| Gris secundario sobre papel | 6,1 : 1 | AA |
| Lima sobre azul | 5,5 : 1 | AA |

## 2. Tipografía

| Rol | Familia | Estilo | Por qué |
|---|---|---|---|
| Titulares, navegación, botones, rótulos | **Barlow Condensed** | 800/700 cursiva; 600 recta | Condensada e inclinada: el lenguaje de los rótulos de transmisión deportiva, contundente sin ser ilegible. |
| Texto, interfaz, formularios | **Archivo** | 400–700 | Grotesca robusta con buena lectura en pantallas pequeñas y en textos largos. |

Escala (razón 1,25, con `clamp()` para pantallas): `display-xl` 2,6–5,6 rem · `display-lg` 2,1–3,6 rem ·
`display-md` 1,55–2,2 rem · `display-sm` 1,32 rem · cuerpo 1 rem (1,08 rem en notas) · pequeño 0,875 rem.

Reglas: las mayúsculas se reservan a los titulares grandes de sección (como los títulos del canal);
las notas usan titulares en tipo oración. Líneas de lectura de menos de 75 caracteres (`max-w-prose`).
Las fuentes se sirven desde el propio sitio (`@fontsource`), sin peticiones a Google.

## 3. Recurso gráfico: el corte diagonal

Un solo gesto se repite: el **paralelogramo inclinado −10°** (`--mk-slant`), tomado de los rótulos inferiores de las transmisiones.

- `.btn`: botones en paralelogramo (el texto se endereza dentro).
- `.tag`: rótulos de categoría.
- El rótulo «Meketrefes en vivo» sobre la imagen de portada.
- Las bandas azul y lima de las cabeceras de programa y de la imagen social.

Todo lo demás es sobrio: sin sombras decorativas, sin degradados de relleno y sin animaciones en cada tarjeta.
La única animación no solicitada es la entrada de la imagen de portada (desactivada con `prefers-reduced-motion`).

## 4. Componentes

| Componente | Archivo | Notas |
|---|---|---|
| Identificador temporal | `components/DemoMark.tsx` | Monograma «MK» + nombre. Sustituible por el logotipo oficial. |
| Miniatura | `components/Thumb.tsx` | Carga diferida, esqueleto, cadena maxres → sd → hq → mq y marcador final si falla. |
| Reproductor | `components/YouTubePlayer.tsx` | Fachada ligera: carga `youtube-nocookie.com` solo al pulsar. Enlace a YouTube siempre visible. |
| Señal en vivo | `components/LivePanel.tsx` | Carga el reproductor `live_stream` del canal a petición; no afirma que haya transmisión. |
| Tarjetas | `VideoCard`, `ShortCard`, `ArticleCard` | Variantes: carril, cuadrícula, fila, destacada. |
| Recorrido | `components/Tour.tsx` + `data/tour.ts` | 7 pasos; resalta el componente real sin bloquear clics. |

## 5. Maquetación

- Ancho máximo 84 rem, márgenes laterales de 16 px en móvil.
- Alternancia de bandas (marino, papel, blanco, azul, lima) para dar ritmo de programa deportivo a la portada.
- Escritorio: héroe en dos columnas, carriles horizontales, columnas de lectura con barra lateral.
- Móvil: los carriles conservan el desplazamiento horizontal con *snap*; las listas pasan a filas con miniatura;
  el menú es una pantalla completa con tipografía grande; los Shorts ocupan el alto disponible.

## 6. Accesibilidad

- Enlace «Saltar al contenido», foco visible lima (azul sobre fondos claros), objetivos táctiles ≥ 44 px.
- Estados de filtros con `aria-pressed`; resultados anunciados con `role="status"`.
- Iframes con título descriptivo; enlaces externos anuncian que abren otra pestaña.
- `prefers-reduced-motion` respetado.
