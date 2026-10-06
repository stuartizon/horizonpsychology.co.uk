import { expect, test, type Locator } from "@playwright/test";

// Space either side of the content: a 20–48px gutter, until the content reaches its 1080px maximum.
const margins = [
  { width: 320, margin: 20 },
  { width: 780, margin: 39 },
  { width: 1440, margin: 180 },
];

/** The left and right edges of an element's content, inside its padding. */
const contentEdges = (locator: Locator) =>
  locator.evaluate((element) => {
    const { left, right } = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return {
      left: Math.round(left + parseFloat(style.paddingLeft)),
      right: Math.round(right - parseFloat(style.paddingRight)),
    };
  });

for (const { width, margin } of margins) {
  test(`the header and page content share the same width at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto("/about/");

    const header = await contentEdges(page.locator("header .container"));
    const content = await contentEdges(page.locator("main .container").first());

    expect(header).toEqual(content);
    expect(content).toEqual({ left: margin, right: width - margin });
  });
}
