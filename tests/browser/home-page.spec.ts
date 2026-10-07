import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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
  [1280, 2],
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
