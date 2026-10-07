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

  test(`at ${width}px the enquiry button stays clear of the publications`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On a phone the publications follow the introduction");
    await page.setViewportSize({ width, height: 1024 });
    await page.evaluate(() => document.fonts.ready);

    const button = (await page
      .getByRole("link", { name: "Enquire about research supervision" })
      .boundingBox())!;
    const publications = (await page
      .getByRole("list")
      .filter({ has: page.locator(".publication") })
      .boundingBox())!;

    expect(button.x + button.width).toBeLessThan(publications.x);
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

test("on a phone the introduction's text runs the full width", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Phones only");
  await page.evaluate(() => document.fonts.ready);

  // Each line ends only where the next line's first word wouldn't fit on it.
  const shortLines = await page
    .locator(".research__intro > p")
    .evaluateAll((paragraphs) =>
      // The paragraphs of plain text, not the profile links.
      paragraphs
        .filter((paragraph) => paragraph.children.length === 0)
        .flatMap((paragraph) => {
          const text = paragraph.firstChild!;
          const words = [...text.textContent!.matchAll(/\S+/g)].map((match) => {
            const range = document.createRange();
            range.setStart(text, match.index);
            range.setEnd(text, match.index + match[0].length);
            return range.getBoundingClientRect();
          });
          const space = (() => {
            const range = document.createRange();
            const index = text.textContent!.indexOf(" ", 1);
            range.setStart(text, index);
            range.setEnd(text, index + 1);
            return range.getBoundingClientRect().width;
          })();
          const right = paragraph.getBoundingClientRect().right;
          return words.flatMap((word, i) => {
            const next = words[i + 1];
            return next &&
              next.top > word.top + 1 &&
              word.right + space + next.width <= right
              ? [paragraph.textContent!.trim().slice(0, 30)]
              : [];
          });
        }),
    );

  expect(shortLines).toEqual([]);
});

test("on a phone the enquiry button is centred, within the page's gutters", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Phones only");

  const container = (await page.locator("main .container").boundingBox())!;
  const padding = await page
    .locator("main .container")
    .evaluate((node) => parseFloat(getComputedStyle(node).paddingLeft));
  const button = (await page
    .getByRole("link", { name: "Enquire about research supervision" })
    .boundingBox())!;

  expect(button.x).toBeGreaterThanOrEqual(container.x + padding);
  expect(button.x + button.width).toBeLessThanOrEqual(
    container.x + container.width - padding,
  );
  expect(
    Math.abs(button.x + button.width / 2 - (container.x + container.width / 2)),
  ).toBeLessThanOrEqual(1);
});
