import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Horizon Psychology/i);
  await expect(page.getByRole("main")).toBeVisible();
});

test("primary navigation links open their pages", async ({ page, isMobile }) => {
  test.skip(isMobile, "On a phone the navigation is behind the menu button");
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Primary navigation" });
  const links = await nav.getByRole("link").all();
  expect(links.length).toBeGreaterThan(0);

  for (const href of await Promise.all(links.map((link) => link.getAttribute("href")))) {
    const response = await page.request.get(href!);
    expect(response.status(), href!).toBe(200);
  }
});

test("home page has no detectable accessibility violations", async ({ page }) => {
  // Known colour contrast and missing h1 violations, tracked in #26.
  test.fail();
  await page.goto("/");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
