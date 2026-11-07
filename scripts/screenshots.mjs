// Capturas para el README.  Uso:
//   node scripts/screenshots.mjs                         (contra el servidor local: node scripts/serve-pages.mjs)
//   node scripts/screenshots.mjs https://<usuario>.github.io/meketrefes-del-deporte-demo/
// Requiere: npx playwright install chromium
import { chromium, devices } from "@playwright/test";
import { mkdirSync } from "node:fs";

const base = (process.argv[2] ?? "http://localhost:4173/meketrefes-del-deporte-demo/").replace(/\/?$/, "/");
const out = "docs/screenshots";
mkdirSync(out, { recursive: true });

const desktop = [
  ["", "01-inicio-escritorio.png"],
  ["noticias", "02-noticias-escritorio.png"],
  ["tv", "03-meketrefes-tv-escritorio.png"],
  ["programas/show-de-la-lpf", "04-programa-escritorio.png"],
  ["alianzas", "05-alianzas-escritorio.png"],
];
const mobile = [
  ["", "06-inicio-movil.png"],
  ["shorts/kEa_e49Zp-c", "07-short-movil.png"],
];

const browser = await chromium.launch();
const settle = async (page) => {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(800);
};

const d = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
for (const [path, file] of desktop) {
  await d.goto(base + path);
  await settle(d);
  await d.screenshot({ path: `${out}/${file}` });
  console.log("✓", file);
}
await d.goto(base + "noticias");
await settle(d);
await d.getByTestId("tour-start").click();
await d.getByTestId("tour").getByRole("button", { name: "Siguiente" }).click();
await settle(d);
await d.screenshot({ path: `${out}/08-recorrido-escritorio.png` });
console.log("✓ 08-recorrido-escritorio.png");

const m = await (await browser.newContext({ ...devices["Pixel 7"], deviceScaleFactor: 2 })).newPage();
for (const [path, file] of mobile) {
  await m.goto(base + path);
  await settle(m);
  await m.screenshot({ path: `${out}/${file}` });
  console.log("✓", file);
}
await m.goto(base);
await m.getByRole("button", { name: "Abrir menú" }).click();
await m.waitForTimeout(300);
await m.screenshot({ path: `${out}/09-menu-movil.png` });
console.log("✓ 09-menu-movil.png");
await browser.close();
