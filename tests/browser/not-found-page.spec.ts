import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/no-such-page/");
});

test("a missing page shows the 404 page", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "This page isn't here",
  );
});

test("the 404 page has no detectable accessibility violations", async ({
  page,
}) => {
  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test("the 404 page fits the screen without scrolling sideways", async ({
  page,
}) => {
  await page.evaluate(() => document.fonts.ready);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );

  expect(overflow).toBe(0);
});

test("on a phone the button follows the photo", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Phones only");

  const photo = (await page
    .getByRole("img", { name: "An hourglass on a table" })
    .boundingBox())!;
  const button = (await page
    .getByRole("link", { name: "Return home" })
    .boundingBox())!;

  expect(button.y).toBeGreaterThan(photo.y + photo.height);
});

for (const width of [768, 1280]) {
  test(`at ${width}px the heading and button sit beside the photo, centred on it`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On a phone the photo comes between them");
    await page.setViewportSize({ width, height: 1024 });
    await page.evaluate(() => document.fonts.ready);

    const photo = (await page
      .getByRole("img", { name: "An hourglass on a table" })
      .boundingBox())!;
    const heading = (await page
      .getByRole("heading", { level: 1 })
      .boundingBox())!;
    const button = (await page
      .getByRole("link", { name: "Return home" })
      .boundingBox())!;

    expect(button.x + button.width).toBeLessThan(photo.x);
    expect(button.y).toBeGreaterThan(heading.y);
    const textMiddle = (heading.y + button.y + button.height) / 2;
    expect(Math.abs(textMiddle - (photo.y + photo.height / 2))).toBeLessThan(
      30,
    );
  });
}
