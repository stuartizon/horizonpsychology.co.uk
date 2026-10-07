import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { baseline } from "./baseline";

test.beforeEach(async ({ page }) => {
  await page.goto("/research/");
});

for (const width of [768, 1280]) {
  test(`at ${width}px the publications sit beside the introduction`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On a phone the publications follow the introduction");
    await page.setViewportSize({ width, height: 1024 });

    const heading = (await page
      .getByRole("heading", { level: 1 })
      .boundingBox())!;
    const publications = (await page
      .getByRole("list")
      .filter({ has: page.locator(".publication") })
      .boundingBox())!;

    expect(publications.x).toBeGreaterThan(heading.x + heading.width);
  });

  test(`at ${width}px the first publication's authors line up with the eyebrow`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On a phone the publications follow the introduction");
    await page.setViewportSize({ width, height: 1024 });
    await page.evaluate(() => document.fonts.ready);

    const eyebrow = await baseline(page.locator("main .eyebrow"));
    const authors = await baseline(page.locator(".publication__meta").first());

    // Within a pixel, as platforms round the baseline differently.
    expect(Math.abs(authors - eyebrow)).toBeLessThanOrEqual(1);
  });
}

test("there's no line above the first publication or below the last", async ({
  page,
}) => {
  const borders = await page
    .locator(".publication")
    .evaluateAll((items) =>
      items.map((item) => [
        getComputedStyle(item).borderTopWidth,
        getComputedStyle(item).borderBottomWidth,
      ]),
    );

  expect(borders[0]).toEqual(["0px", "0px"]);
  expect(borders.at(-1)![1]).toBe("0px");
  expect(borders.slice(1).every(([top]) => top === "1px")).toBe(true);
});

test("the Research page has no detectable accessibility violations", async ({
  page,
}) => {
  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
