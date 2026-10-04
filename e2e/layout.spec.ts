import { expect, test } from "@playwright/test";

// Space either side of the content: a 20–48px gutter, until the content reaches its 1080px maximum.
const margins = [
  { width: 320, margin: 20 },
  { width: 780, margin: 39 },
  { width: 1440, margin: 180 },
];

for (const { width, margin } of margins) {
  test(`the header and page content share the same width at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/about/");

    const header = await page.locator("header .container").boundingBox();
    const content = await page.locator("main .container").first().boundingBox();

    expect(header?.x).toBe(content?.x);
    expect(header?.width).toBe(content?.width);
    expect(Math.round(content!.x)).toBe(margin);
    expect(Math.round(width - content!.x - content!.width)).toBe(margin);
  });
}
