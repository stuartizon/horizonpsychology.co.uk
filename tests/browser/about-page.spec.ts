import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/about/");
});

for (const width of [768, 1280]) {
  test(`at ${width}px the portrait sits beside the introduction`, async ({ page, isMobile }) => {
    test.skip(isMobile, "On a phone the portrait follows the introduction");
    await page.setViewportSize({ width, height: 1024 });

    const heading = (await page.getByRole("heading", { level: 1 }).boundingBox())!;
    const portrait = (await page.getByRole("img", { name: "Dr Emma Izon" }).boundingBox())!;

    expect(portrait.x).toBeGreaterThan(heading.x + heading.width);
  });

  test(`at ${width}px the approach sits beside its heading`, async ({ page, isMobile }) => {
    test.skip(isMobile, "On a phone the approach follows its heading");
    await page.setViewportSize({ width, height: 1024 });

    const section = page.getByRole("region", { name: "How Emma works" });
    const heading = (await section.getByRole("heading", { level: 2 }).boundingBox())!;
    const body = (await section.getByText(/Emma believes/).boundingBox())!;

    expect(body.x).toBeGreaterThan(heading.x + heading.width);
  });
}

test("on a phone the portrait follows the introduction", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Phones only");

  const intro = (await page.getByText(/She works collaboratively/).boundingBox())!;
  const portrait = (await page.getByRole("img", { name: "Dr Emma Izon" }).boundingBox())!;

  expect(portrait.y).toBeGreaterThan(intro.y + intro.height);
});

/** Sets a width below the tablet breakpoint on the desktop browsers, or keeps the phone's own. */
async function narrow(page: Page, isMobile: boolean, width: number) {
  if (!isMobile) await page.setViewportSize({ width, height: 1024 });
}

for (const width of [320, 700]) {
  test(`below tablet width, at ${width}px, the text runs the full width of the page`, async ({ page, isMobile }) => {
    test.skip(isMobile && width !== 320, "Phones are 320px");
    await narrow(page, isMobile, width);

    const content = await page.locator("main .container").first().evaluate((container) => {
      const style = getComputedStyle(container);
      return container.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    });

    const paragraphs = [/Dr Emma Izon is a Clinical/, /She works collaboratively/, /Emma believes/, /Her work is grounded/];
    for (const text of paragraphs) {
      const paragraph = (await page.locator("p", { hasText: text }).boundingBox())!;
      expect(paragraph.width, String(text)).toBeCloseTo(content, 0);
    }
  });

  test(`below tablet width, at ${width}px, the buttons are centred`, async ({ page, isMobile }) => {
    test.skip(isMobile && width !== 320, "Phones are 320px");
    await narrow(page, isMobile, width);

    const body = (await page.locator("p", { hasText: /Emma believes/ }).boundingBox())!;
    for (const name of ["Get in touch", "See publications"]) {
      const button = (await page.getByRole("link", { name, exact: true }).last().boundingBox())!;
      expect(button.x + button.width / 2, name).toBeCloseTo(body.x + body.width / 2, 0);
    }
  });
}

test("the portrait is shown at its own proportions, uncropped", async ({ page }) => {
  const portrait = page.getByRole("img", { name: "Dr Emma Izon" });
  await expect(portrait).toHaveJSProperty("complete", true);

  const { shown, natural } = await portrait.evaluate((img: HTMLImageElement) => ({
    shown: img.clientWidth / img.clientHeight,
    natural: img.naturalWidth / img.naturalHeight,
  }));

  expect(shown).toBeCloseTo(natural, 2);
});

test("the About page has no detectable accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
