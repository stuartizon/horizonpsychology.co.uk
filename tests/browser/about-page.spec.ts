import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { baseline } from "./baseline";

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

for (const width of [768, 1280]) {
  test(`at ${width}px the portrait's top is level with the top of the eyebrow's capitals`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On a phone the portrait follows the introduction");
    await page.setViewportSize({ width, height: 1024 });
    await page.evaluate(() => document.fonts.ready);

    // The font's own cap height, which doesn't vary with how each platform
    // draws the letters.
    const eyebrow = page.locator(".about .eyebrow");
    const capHeight = await eyebrow.evaluate((node) => {
      const probe = document.createElement("span");
      probe.style.cssText = "display: inline-block; height: 1cap";
      node.append(probe);
      const { height } = probe.getBoundingClientRect();
      probe.remove();
      return height;
    });
    const capTop = (await baseline(eyebrow)) - capHeight;
    const portrait = (await page.getByRole("img", { name: "Dr Emma Izon" }).boundingBox())!;

    // Within a pixel, as platforms round the baseline differently.
    expect(Math.abs(portrait.y - capTop)).toBeLessThanOrEqual(1);
  });
}

for (const width of [768, 1024, 1280]) {
  test(`at ${width}px the approach text ends in line with the portrait`, async ({ page, isMobile }) => {
    test.skip(isMobile, "On a phone both run the full width");
    await page.setViewportSize({ width, height: 1024 });
    await page.evaluate(() => document.fonts.ready);

    const portrait = (await page.getByRole("img", { name: "Dr Emma Izon" }).boundingBox())!;
    const body = (await page.locator("p", { hasText: /Emma believes/ }).boundingBox())!;

    expect(body.x + body.width).toBeCloseTo(portrait.x + portrait.width, 0);
  });
}

test("on a phone the portrait follows the introduction", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Phones only");

  const intro = (await page.getByText(/She works collaboratively/).boundingBox())!;
  const portrait = (await page.getByRole("img", { name: "Dr Emma Izon" }).boundingBox())!;

  expect(portrait.y).toBeGreaterThan(intro.y + intro.height);
});

/** Sets the width on the desktop browsers, or keeps the phone's own. */
async function atWidth(page: Page, isMobile: boolean, width: number) {
  if (!isMobile) await page.setViewportSize({ width, height: 1024 });
}

for (const width of [320, 700]) {
  test(`below tablet width, at ${width}px, the text runs the full width of the page`, async ({ page, isMobile }) => {
    test.skip(isMobile && width !== 320, "Phones are 320px");
    await atWidth(page, isMobile, width);

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
}

for (const width of [320, 700, 768, 1280]) {
  test(`at ${width}px the buttons are centred on the page, below both columns`, async ({ page, isMobile }) => {
    test.skip(isMobile && width !== 320, "Phones are 320px");
    await atWidth(page, isMobile, width);

    const section = page.getByRole("region", { name: "How Emma works" });
    const content = (await section.locator(".container").boundingBox())!;
    const text = (await section.locator("p", { hasText: /Her work is grounded/ }).boundingBox())!;
    const buttons = await Promise.all(
      ["Get in touch", "See publications"].map(
        async (name) => (await section.getByRole("link", { name, exact: true }).boundingBox())!,
      ),
    );
    const left = Math.min(...buttons.map((button) => button.x));
    const right = Math.max(...buttons.map((button) => button.x + button.width));

    expect((left + right) / 2).toBeCloseTo(content.x + content.width / 2, 0);
    expect(Math.min(...buttons.map((button) => button.y))).toBeGreaterThan(text.y + text.height);
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
