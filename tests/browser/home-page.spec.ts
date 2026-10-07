import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { baseline } from "./baseline";

test("home page has no detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

test("on a phone the hero photo follows the text", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Phones only");
  await page.goto("/");

  const button = (await page
    .getByRole("main")
    .getByRole("link", { name: "Get in touch" })
    .boundingBox())!;
  const photo = (await page
    .getByRole("img", { name: "Dr Emma Izon" })
    .boundingBox())!;

  expect(photo.y).toBeGreaterThan(button.y + button.height);
});

for (const width of [768, 1280]) {
  test(`at ${width}px the hero photo sits beside the text`, async ({
    page,
    isMobile,
  }) => {
    test.skip(
      isMobile,
      "Sets a tablet or desktop width on the desktop browsers",
    );
    await page.setViewportSize({ width, height: 1024 });
    await page.goto("/");

    const heading = (await page
      .getByRole("heading", { level: 1 })
      .boundingBox())!;
    const photo = (await page
      .getByRole("img", { name: "Dr Emma Izon" })
      .boundingBox())!;

    expect(photo.x).toBeGreaterThan(heading.x + heading.width);
  });
}

for (const [width, columns] of [
  [320, 1],
  [768, 2],
  [1280, 4],
] as const) {
  test(`at ${width}px the service cards are in ${columns} column${columns > 1 ? "s" : ""}`, async ({
    page,
    isMobile,
  }) => {
    test.skip(
      isMobile !== (width === 320),
      "The phone width runs on the phones, the others on the desktop browsers",
    );
    await page.setViewportSize({ width, height: 1024 });
    await page.goto("/");

    const lefts = await page
      .getByRole("region", { name: "Four ways of working together" })
      .getByRole("article")
      .evaluateAll((cards) =>
        cards.map((card) => Math.round(card.getBoundingClientRect().left)),
      );
    expect(new Set(lefts).size).toBe(columns);
  });
}

for (const width of [768, 1280]) {
  test(`at ${width}px the photo's top is level with the top of the eyebrow's capitals`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On a phone the photo follows the text");
    await page.setViewportSize({ width, height: 1024 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    // The font's own cap height, which doesn't vary with how each platform
    // draws the letters.
    const eyebrow = page.locator(".hero .eyebrow");
    const capHeight = await eyebrow.evaluate((node) => {
      const probe = document.createElement("span");
      probe.style.cssText = "display: inline-block; height: 1cap";
      node.append(probe);
      const { height } = probe.getBoundingClientRect();
      probe.remove();
      return height;
    });
    const capTop = (await baseline(eyebrow)) - capHeight;
    const photo = (await page
      .getByRole("img", { name: "Dr Emma Izon" })
      .boundingBox())!;

    // Within a pixel, as platforms round the baseline differently.
    expect(Math.abs(photo.y - capTop)).toBeLessThanOrEqual(1);
  });
}

/** How far below the navigation's links the page's photo starts. */
async function linksToPhoto(page: Page, path: string) {
  await page.goto(path);
  await page.evaluate(() => document.fonts.ready);
  const link = (await page
    .getByRole("navigation", { name: "Primary" })
    .getByRole("link", { name: "About Emma" })
    .boundingBox())!;
  const photo = (await page
    .getByRole("img", { name: "Dr Emma Izon" })
    .boundingBox())!;
  return photo.y - (link.y + link.height);
}

for (const width of [1024, 1280]) {
  test(`at ${width}px the photo starts as far below the navigation as on the About page`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On a phone the navigation is behind the menu button");
    await page.setViewportSize({ width, height: 1024 });

    const home = await linksToPhoto(page, "/");
    const about = await linksToPhoto(page, "/about/");

    expect(Math.abs(home - about)).toBeLessThanOrEqual(2);
  });
}

for (const width of [320, 740]) {
  test(`at ${width}px the hero text runs the full width`, async ({
    page,
    isMobile,
  }) => {
    test.skip(
      isMobile !== (width === 320),
      "The phone width runs on the phones, the other on the desktop browsers",
    );
    await page.setViewportSize({ width, height: 1024 });
    await page.goto("/");

    const photo = (await page
      .getByRole("img", { name: "Dr Emma Izon" })
      .boundingBox())!;
    const heading = (await page.locator(".hero hgroup").boundingBox())!;
    expect(heading.x).toBeCloseTo(photo.x, 0);
    expect(heading.width).toBeCloseTo(photo.width, 0);
  });
}

test("on a phone Get in touch and More about Emma are centred", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Phones only");
  await page.goto("/");

  const photo = (await page
    .getByRole("img", { name: "Dr Emma Izon" })
    .boundingBox())!;
  const middle = photo.x + photo.width / 2;
  for (const name of ["Get in touch", "More about Emma"]) {
    const link = (await page
      .getByRole("main")
      .getByRole("link", { name, exact: true })
      .boundingBox())!;
    expect(Math.abs(link.x + link.width / 2 - middle)).toBeLessThanOrEqual(1);
  }
});
