import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home page has no detectable accessibility violations", async ({
  page,
}) => {
  // Known colour contrast and missing h1 violations, tracked in #26.
  test.fail();
  await page.goto("/");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
