import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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

test("the About page has no detectable accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
