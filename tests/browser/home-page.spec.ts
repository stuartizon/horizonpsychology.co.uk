import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { capTop } from "./baseline";

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
  test(`at ${width}px the photo's top is level with the top of the heading's capitals`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On a phone the photo follows the text");
    await page.setViewportSize({ width, height: 1024 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const heading = await capTop(page.getByRole("heading", { level: 1 }));
    const photo = (await page
      .getByRole("img", { name: "Dr Emma Izon" })
      .boundingBox())!;

    // Within a pixel, as platforms round the baseline differently.
    expect(Math.abs(photo.y - heading)).toBeLessThanOrEqual(1);
  });

  test(`at ${width}px What we offer's text starts level with the top of its heading's capitals`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On a phone the text follows the heading");
    await page.setViewportSize({ width, height: 1024 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const section = page.getByRole("region", {
      name: "A safe, welcoming and non-judgemental space",
    });
    const heading = await capTop(section.getByRole("heading", { level: 2 }));
    const text = await capTop(section.locator("p", { hasText: /is led by/ }));

    expect(Math.abs(text - heading)).toBeLessThanOrEqual(1);
  });
}

for (const width of [1024, 1280, 1440]) {
  test(`at ${width}px What we offer's text starts in line with the hero photo`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On a phone both run the full width");
    await page.setViewportSize({ width, height: 1024 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);

    const photo = (await page
      .getByRole("img", { name: "Dr Emma Izon" })
      .boundingBox())!;
    const text = (await page
      .locator("p", { hasText: /is led by/ })
      .boundingBox())!;

    expect(Math.abs(text.x - photo.x)).toBeLessThanOrEqual(1);
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
