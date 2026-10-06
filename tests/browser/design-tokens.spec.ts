import { expect, test } from "@playwright/test";
import { pressTab } from "./keyboard";

test("body text is set in Source Sans 3", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  const fontFamily = await page.locator("body").evaluate((el) => getComputedStyle(el).fontFamily);
  expect(fontFamily).toMatch(/^"Source Sans 3/);
  expect(await page.evaluate(() => document.fonts.check('16px "Source Sans 3 Variable"'))).toBe(true);
});

test("headings are set in Lora at regular weight", async ({ page }) => {
  await page.goto("/");

  const heading = page.getByRole("heading").first();
  const style = await heading.evaluate((el) => {
    const { fontFamily, fontWeight } = getComputedStyle(el);
    return { fontFamily, fontWeight };
  });
  expect(style.fontFamily).toMatch(/^Lora/);
  expect(style.fontWeight).toBe("400");
});

test("Inter is no longer loaded", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  const families = await page.evaluate(() => [...document.fonts].map((font) => font.family));
  expect(families.some((family) => /inter/i.test(family))).toBe(false);
});

test("keyboard focus shows a ring and a soft halo", async ({ page }) => {
  await page.goto("/");
  await pressTab(page);

  const style = await page.evaluate(() => {
    const { outlineStyle, outlineWidth, boxShadow } = getComputedStyle(document.activeElement!);
    return { outlineStyle, outlineWidth, boxShadow };
  });
  expect(style.outlineStyle).toBe("solid");
  expect(style.outlineWidth).toBe("2px");
  expect(style.boxShadow).toContain("5px");
});

test("link transitions are switched off when reduced motion is preferred", async ({ page }) => {
  await page.goto("/");
  const link = page.locator("main a").first();
  const longestTransition = () =>
    link.evaluate((el) =>
      Math.max(...getComputedStyle(el).transitionDuration.split(", ").map(parseFloat)),
    );

  expect(await longestTransition()).toBeGreaterThan(0);

  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await longestTransition()).toBeLessThan(0.001);
});
