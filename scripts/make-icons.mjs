// Genera los iconos PNG y la imagen para redes sociales a partir de HTML/SVG propios.
// Requiere Playwright con Chromium:  npx playwright install chromium  &&  npm run icons
import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";

const svg = readFileSync("public/icons/favicon.svg", "utf8");
const browser = await chromium.launch();
const page = await browser.newPage();

async function shot(html, w, h, path) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<html><body style="margin:0">${html}</body></html>`);
  await page.screenshot({ path, omitBackground: false });
  console.log("✓", path);
}

const icon = (pad) =>
  `<div style="width:100vw;height:100vh;background:#0a1d4a;display:grid;place-items:center">
     <div style="width:${100 - pad * 2}vw;height:${100 - pad * 2}vh">${svg.replace("<svg ", '<svg width="100%" height="100%" ')}</div></div>`;

await shot(icon(0), 32, 32, "public/icons/favicon-32.png");
await shot(icon(0), 180, 180, "public/icons/apple-touch-icon.png");
await shot(icon(0), 192, 192, "public/icons/icon-192.png");
await shot(icon(0), 512, 512, "public/icons/icon-512.png");
await shot(icon(12), 512, 512, "public/icons/icon-maskable-512.png");

const fontCss = (file) => `data:font/woff2;base64,${readFileSync(file).toString("base64")}`;
const bc = fontCss("node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-800-italic.woff2");
const ar = fontCss("node_modules/@fontsource/archivo/files/archivo-latin-500-normal.woff2");
await shot(
  `<style>@font-face{font-family:BC;src:url(${bc})}@font-face{font-family:AR;src:url(${ar})}</style>
   <div style="width:1200px;height:630px;background:#0a1d4a;position:relative;overflow:hidden;font-family:AR">
     <div style="position:absolute;right:-60px;top:0;bottom:0;width:420px;background:#1446db;transform:skewX(-12deg)"></div>
     <div style="position:absolute;right:-90px;top:0;bottom:0;width:110px;background:#c9f02f;transform:skewX(-12deg)"></div>
     <div style="position:absolute;left:80px;top:90px;width:120px;height:120px">${svg.replace("<svg ", '<svg width="120" height="120" ')}</div>
     <div style="position:absolute;left:80px;top:240px;color:#fff;font-family:BC;font-style:italic;font-size:118px;line-height:.9;text-transform:uppercase">Meketrefes<br>del Deporte</div>
     <div style="position:absolute;left:80px;bottom:70px;color:#c9f02f;font-size:28px">Demo conceptual independiente de portal web · No es un sitio oficial</div>
   </div>`,
  1200,
  630,
  "public/images/og-image.png",
);
await browser.close();
