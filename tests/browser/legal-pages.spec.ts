import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/confidentiality/");
});

test("on a wide screen the text stops at the feature measure", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "On a phone the text runs the full width");
  await page.setViewportSize({ width: 1280, height: 1024 });

  const width = await page
    .getByText("There are a small number of exceptions.")
    .evaluate((paragraph) => paragraph.getBoundingClientRect().width);

  expect(width).toBe(820);
});

test("the Confidentiality page has no detectable accessibility violations", async ({
  page,
}) => {
  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
