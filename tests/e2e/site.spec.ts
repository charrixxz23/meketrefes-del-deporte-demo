import { expect, test, type Page } from "@playwright/test";

const DISCLAIMER = "Demo conceptual independiente. No es un sitio oficial de Meketrefes del Deporte.";

/** Errores de consola propios (se ignoran recursos externos como miniaturas de YouTube). */
function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() !== "error") return;
    const t = m.text();
    if (/Failed to load resource|ERR_|ytimg|youtube/i.test(t)) return;
    errors.push(t);
  });
  return errors;
}

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1024;

async function openNav(page: Page) {
  if (isMobile(page)) {
    await page.getByRole("button", { name: "Abrir menú" }).click();
    return page.getByRole("dialog", { name: "Menú" });
  }
  return page.getByRole("navigation", { name: "Principal" });
}

const ROUTES = ["", "noticias", "noticias/panama-croacia-mundial-2026", "tv", "tv/AA09bwfR-ek", "shorts", "shorts/kEa_e49Zp-c", "programas", "programas/show-de-la-lpf", "conocenos", "alianzas", "buscar?q=lpf", "favoritos"];

test.describe("rutas", () => {
  for (const r of ROUTES) {
    test(`/${r} carga sin errores ni desbordamiento`, async ({ page }) => {
      const errors = trackErrors(page);
      await page.goto(r);
      await expect(page.locator("main h1").first()).toBeVisible();
      await expect(page.getByTestId("disclaimer")).toHaveText(DISCLAIMER);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, "desbordamiento horizontal").toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });
  }

  test("ruta inexistente muestra la página 404 de la app", async ({ page }) => {
    await page.goto("esta-pagina-no-existe");
    await expect(page.getByRole("heading", { name: "Fuera de juego" })).toBeVisible();
  });
});

test("la navegación principal llega a todas las secciones", async ({ page }) => {
  await page.goto("");
  const sections = [
    ["Noticias", /\/noticias$/],
    ["Meketrefes TV", /\/tv$/],
    ["Shorts", /\/shorts$/],
    ["Programas", /\/programas$/],
    ["Conócenos", /\/conocenos$/],
    ["Alianzas", /\/alianzas$/],
    ["Inicio", /\.io\/[^/]+\/?$|:\d+\/[^/]+\/?$/],
  ] as const;
  for (const [label, url] of sections) {
    const nav = await openNav(page);
    await nav.getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(url);
    await expect(page.locator("main h1").first()).toBeVisible();
  }
});

test("noticias: filtros, búsqueda y estado vacío", async ({ page }) => {
  await page.goto("noticias");
  const cards = page.locator('main a[href*="/noticias/"]');
  const status = page.locator("main").getByRole("status");
  await expect(cards.first()).toBeVisible();
  const total = await cards.count();
  await page.getByRole("button", { name: "Fútbol de Panamá (LPF)" }).click();
  await expect(page).toHaveURL(/tema=lpf/);
  await expect(status).toContainText("con los filtros actuales");
  const lpf = await cards.count();
  expect(lpf).toBeGreaterThan(0);
  expect(lpf).toBeLessThan(total);
  await page.getByLabel("Buscar en noticias").fill("zzzz sin resultados");
  await expect(page.getByRole("heading", { name: "Ninguna nota coincide" })).toBeVisible();
  await page.getByRole("button", { name: "Quitar filtros" }).click();
  await expect(cards).toHaveCount(total);
});

test("búsqueda global sin tildes", async ({ page }) => {
  await page.goto("buscar?q=seleccion");
  await expect(page.locator("main").getByRole("status")).toContainText("resultados");
  await expect(page.locator('main a[href*="/tv/"]').first()).toBeVisible();
});

test("el reproductor oficial se carga al pulsar reproducir", async ({ page }) => {
  await page.goto("tv");
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.locator('[data-tour="tv-player"]').getByRole("button", { name: /Reproducir/ }).click();
  await expect(page.locator('iframe[src^="https://www.youtube-nocookie.com/embed/AA09bwfR-ek"]')).toHaveCount(1);
});

test("la señal en vivo solo se carga a petición", async ({ page }) => {
  await page.goto("tv");
  await page.getByRole("button", { name: "Comprobar la señal" }).click();
  await expect(page.locator('iframe[src*="live_stream?channel=UCralRBxMBGVaPM7ENvnHpNA"]')).toHaveCount(1);
});

test("visor de Shorts: siguiente con botón y con teclado", async ({ page }) => {
  await page.goto("shorts/kEa_e49Zp-c");
  await expect(page.locator('iframe[src*="kEa_e49Zp-c"]')).toHaveCount(1);
  await page.getByRole("button", { name: "Siguiente" }).click();
  await expect(page).toHaveURL(/shorts\/Y_ls3YzItfs/);
  await page.locator("body").press("ArrowDown");
  await expect(page).toHaveURL(/shorts\/kEa_e49Zp-c/);
});

test("favoritos se guardan y sobreviven a la recarga", async ({ page }) => {
  await page.goto("tv/AA09bwfR-ek");
  await page.getByRole("button", { name: /Guardar/ }).click();
  await expect(page.getByRole("button", { name: /Guardado/ })).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(page.getByRole("button", { name: /Guardado/ })).toBeVisible();
  await page.getByRole("link", { name: /Favoritos \(1\)/ }).click();
  await expect(page.locator('main a[href$="/tv/AA09bwfR-ek"]')).toBeVisible();
  await page.getByRole("button", { name: "Vaciar favoritos" }).click();
  await expect(page.getByRole("heading", { name: "Aún no guardó nada" })).toBeVisible();
});

test("recorrido guiado: avanza, retrocede, señala componentes y se cierra sin rastro", async ({ page }) => {
  await page.goto("");
  if (isMobile(page)) {
    await page.getByRole("button", { name: "Abrir menú" }).click();
    await page.getByRole("dialog", { name: "Menú" }).getByRole("button", { name: "Explorar la demo" }).click();
  } else {
    await page.getByTestId("tour-start").click();
  }
  const tour = page.getByTestId("tour");
  const expected = [
    ["Inicio", /\/$/, '[data-tour="hero"]'],
    ["Noticias", /\/noticias$/, '[data-tour="news-tools"]'],
    ["Meketrefes TV", /\/tv$/, '[data-tour="tv-player"]'],
    ["Shorts", /\/shorts$/, '[data-tour="shorts-grid"]'],
    ["Programas", /\/programas$/, '[data-tour="programs"]'],
    ["Comunidad", /\/conocenos$/, '[data-tour="community"]'],
    ["Espacios comerciales", /\/alianzas$/, '[data-tour="slots"]'],
  ] as const;
  for (let i = 0; i < expected.length; i++) {
    const [title, url, target] = expected[i];
    await expect(tour.getByRole("heading")).toHaveText(title);
    await expect(page).toHaveURL(url);
    await expect(page.locator(target)).toHaveClass(/tour-target/);
    if (i === 1) {
      await tour.getByRole("button", { name: "Anterior" }).click();
      await expect(tour.getByRole("heading")).toHaveText("Inicio");
      await tour.getByRole("button", { name: "Siguiente" }).click();
      await expect(tour.getByRole("heading")).toHaveText("Noticias");
    }
    await tour.getByRole("button", { name: i === expected.length - 1 ? "Finalizar" : "Siguiente" }).click();
  }
  await expect(tour).toHaveCount(0);
  await expect(page.locator(".tour-target")).toHaveCount(0);
  // La navegación sigue funcionando después de finalizar.
  const nav = await openNav(page);
  await nav.getByRole("link", { name: "Noticias", exact: true }).click();
  await expect(page).toHaveURL(/\/noticias$/);
});

test("el recorrido se puede omitir con Escape", async ({ page }) => {
  test.skip(isMobile(page), "El botón de cabecera solo existe en escritorio");
  await page.goto("");
  await page.getByTestId("tour-start").click();
  await expect(page.getByTestId("tour")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("tour")).toHaveCount(0);
  await expect(page.locator(".tour-target")).toHaveCount(0);
});

test("formulario comercial: valida y no finge un envío", async ({ page }) => {
  await page.goto("alianzas");
  await page.getByRole("button", { name: "Preparar mensaje" }).click();
  await expect(page.getByText("Escriba su nombre.")).toBeVisible();
  await expect(page.locator("#f-nombre")).toBeFocused();
  await page.locator("#f-nombre").fill("Ana Pérez");
  await page.locator("#f-correo").fill("ana@empresa.com");
  await page.locator("#f-mensaje").fill("Nos interesa patrocinar El Show de la LPF.");
  await page.getByRole("button", { name: "Preparar mensaje" }).click();
  await expect(page.getByRole("heading", { name: "Mensaje listo para enviar" })).toBeVisible();
  await expect(page.getByText("no envió nada")).toBeVisible();
  const slots = page.locator('[data-tour="slots"] > li');
  await expect(slots).toHaveCount(4);
  for (const s of await slots.all()) await expect(s).toContainText("Disponible");
});

test("enlaces externos: dominios oficiales y pestaña nueva segura", async ({ page }) => {
  await page.goto("conocenos");
  const links = page.locator('a[target="_blank"]');
  const n = await links.count();
  expect(n).toBeGreaterThan(3);
  for (const l of await links.all()) {
    const href = (await l.getAttribute("href")) ?? "";
    expect(await l.getAttribute("rel")).toContain("noopener");
    expect(href).toMatch(/^https:\/\/(www\.)?(youtube\.com|instagram\.com|x\.com|shokmultimedia\.com|github\.com)\//);
  }
});

test("teclado: el primer Tab llega al enlace para saltar al contenido", async ({ page }) => {
  test.skip(isMobile(page), "Prueba de teclado en escritorio");
  await page.goto("");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Saltar al contenido" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#contenido$/);
});
