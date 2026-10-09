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
