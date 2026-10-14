import { expect, test, type Page } from "@playwright/test";

/**
 * The path of every page: those in the sitemap, and those kept out of it.
 * Read from the running site, so a new page is checked without changing this.
 */
async function everyPage(page: Page) {
  const locations = async (path: string) => {
    const response = await page.request.get(path);
    return [...(await response.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map(
      (match) => new URL(match[1]).pathname,
    );
  };
  const sitemaps = await locations("/sitemap-index.xml");
  const listed = (await Promise.all(sitemaps.map(locations))).flat();
  expect(listed.length, "pages in the sitemap").toBeGreaterThan(10);
  return [
    ...listed,
    "/contact/sent/",
    "/contact/not-sent/",
    "/a-page-that-does-not-exist/",
  ];
}

test("at 320px no page scrolls sideways", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Phone width only");
  const tooWide: string[] = [];

  for (const path of await everyPage(page)) {
    await page.goto(path);
    const width = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    if (width > 320) tooWide.push(`${path} is ${width}px wide`);
  }

  expect(tooWide).toEqual([]);
});

test("with reduced motion, nothing on any page moves, except in a single 0.01ms step", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "The same styles apply at every width");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const moving: string[] = [];

  for (const path of await everyPage(page)) {
    await page.goto(path);
    const found = await page.evaluate(() => {
      const seconds = (value: string) =>
        Math.max(
          ...value
            .split(", ")
            .map((part) =>
              part.endsWith("ms") ? parseFloat(part) / 1000 : parseFloat(part),
            ),
        );
      const results: string[] = [];
      for (const element of document.querySelectorAll("*")) {
        for (const pseudo of [null, "::before", "::after"]) {
          const style = getComputedStyle(element, pseudo);
          const transition = seconds(style.transitionDuration);
          const animation =
            style.animationName === "none"
              ? 0
              : seconds(style.animationDuration);
          if (transition > 0.00001 || animation > 0.00001) {
            results.push(
              `${element.tagName.toLowerCase()}.${element.className}${pseudo ?? ""}: transition ${transition}s, animation ${animation}s`,
            );
          }
        }
      }
      return results;
    });
    moving.push(...found.map((item) => `${path} ${item}`));
  }

  expect(moving).toEqual([]);
});
