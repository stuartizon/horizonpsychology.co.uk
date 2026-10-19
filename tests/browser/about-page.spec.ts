import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator, type Page } from "@playwright/test";
import { capTop } from "./baseline";

test.beforeEach(async ({ page }) => {
  await page.goto("/about/");
});

/** The width of the page's content, inside the container's padding. */
async function contentWidth(page: Page) {
  return page
    .locator("main .container")
    .first()
    .evaluate((container) => {
      const style = getComputedStyle(container);
      return (
        container.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight)
      );
    });
}

/** Each line of an element's text, as its top, left and right edges. */
async function lines(element: Locator) {
  return element.evaluate((node) => {
    const range = document.createRange();
    range.selectNodeContents(node);
    return [...range.getClientRects()].map(({ top, left, right }) => ({
      top,
      left,
      right,
    }));
  });
}

for (const width of [1024, 1280]) {
  test(`at ${width}px the portrait sits beside the introduction`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On a phone the portrait is between the paragraphs");
    await page.setViewportSize({ width, height: 1024 });

    const portrait = (await page
      .getByRole("img", { name: "Dr Emma Izon" })
      .boundingBox())!;
    const intro = page.locator(".about__intro > p");
    for (const paragraph of await intro.all()) {
      const box = (await paragraph.boundingBox())!;
      expect(box.x + box.width).toBeLessThan(portrait.x);
    }
  });
}

test("at 768px the introduction wraps around the portrait", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "On a phone the portrait is between the paragraphs");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.evaluate(() => document.fonts.ready);

  const portrait = (await page
    .getByRole("img", { name: "Dr Emma Izon" })
    .boundingBox())!;

  // The first paragraph's lines stop short of the portrait beside them.
  const first = await lines(
    page.locator("p", { hasText: /Dr Emma Izon is a Clinical/ }),
  );
  const beside = first.filter(
    (line) => line.top < portrait.y + portrait.height,
  );
  expect(beside.length).toBeGreaterThan(0);
  for (const line of beside) expect(line.right).toBeLessThan(portrait.x);

  // The last runs the full width of the page, under it.
  const last = (await page
    .locator("p", { hasText: /Emma offers a compassionate/ })
    .boundingBox())!;
  expect(last.y).toBeGreaterThan(portrait.y + portrait.height);
  expect(last.width).toBeCloseTo(await contentWidth(page), 0);
});

test("at 768px the approach wraps around the bookshelf photo", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "On a phone the photo is between the paragraphs");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.evaluate(() => document.fonts.ready);

  const section = page.getByRole("region", { name: "How Emma works" });
  const photo = (await section.getByRole("img").boundingBox())!;
  const right = photo.x + photo.width;

  // The heading starts beside the photo, after it.
  const heading = await lines(section.getByRole("heading", { level: 2 }));
  expect(heading[0]!.top).toBeLessThan(photo.y + photo.height);
  expect(heading[0]!.left).toBeGreaterThan(right);

  // The text's last lines run under it, from the left of the page.
  const text = await lines(section.getByText(/Her approach is/));
  const under = text.filter((line) => line.top > photo.y + photo.height);
  expect(under.length).toBeGreaterThan(0);
  for (const line of under) expect(line.left).toBeLessThan(photo.x + 1);
});

for (const width of [1024, 1280]) {
  test(`at ${width}px the bookshelf photo sits beside the approach's heading and text`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On a phone the photo is between the paragraphs");
    await page.setViewportSize({ width, height: 1024 });

    const section = page.getByRole("region", { name: "How Emma works" });
    const heading = (await section
      .getByRole("heading", { level: 2 })
      .boundingBox())!;
    const body = (await section.getByText(/Emma believes/).boundingBox())!;
    const photo = (await section.getByRole("img").boundingBox())!;

    expect(photo.x + photo.width).toBeLessThan(heading.x);
    expect(photo.x + photo.width).toBeLessThan(body.x);
    expect(body.y).toBeGreaterThan(heading.y + heading.height);
  });
}

for (const width of [768, 1280]) {
  test(`at ${width}px the portrait's top is level with the top of the heading's capitals`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On a phone the portrait follows the introduction");
    await page.setViewportSize({ width, height: 1024 });
    await page.evaluate(() => document.fonts.ready);

    const heading = await capTop(page.getByRole("heading", { level: 1 }));
    const portrait = (await page
      .getByRole("img", { name: "Dr Emma Izon" })
      .boundingBox())!;

    // Within a pixel, as platforms round the baseline differently.
    expect(Math.abs(portrait.y - heading)).toBeLessThanOrEqual(1);
  });

  test(`at ${width}px the bookshelf photo's top is level with the top of its heading's capitals`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On a phone the photo is between the paragraphs");
    await page.setViewportSize({ width, height: 1024 });
    await page.evaluate(() => document.fonts.ready);

    const section = page.getByRole("region", { name: "How Emma works" });
    const heading = await capTop(section.getByRole("heading", { level: 2 }));
    const photo = (await section.getByRole("img").boundingBox())!;

    expect(Math.abs(photo.y - heading)).toBeLessThanOrEqual(1);
  });
}

for (const width of [1024, 1280, 1440]) {
  test(`at ${width}px the approach text starts in line with the portrait`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On a phone both run the full width");
    await page.setViewportSize({ width, height: 1024 });
    await page.evaluate(() => document.fonts.ready);

    const portrait = (await page
      .getByRole("img", { name: "Dr Emma Izon" })
      .boundingBox())!;
    const body = (await page
      .locator("p", { hasText: /Emma believes/ })
      .boundingBox())!;

    expect(Math.abs(body.x - portrait.x)).toBeLessThanOrEqual(1);
  });
}

for (const width of [768, 1024, 1280]) {
  test(`at ${width}px the approach text ends in line with the portrait`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On a phone both run the full width");
    await page.setViewportSize({ width, height: 1024 });
    await page.evaluate(() => document.fonts.ready);

    const portrait = (await page
      .getByRole("img", { name: "Dr Emma Izon" })
      .boundingBox())!;
    const body = (await page
      .locator("p", { hasText: /Emma believes/ })
      .boundingBox())!;

    expect(body.x + body.width).toBeCloseTo(portrait.x + portrait.width, 0);
  });
}

test("on a phone the portrait is between the second and third paragraphs", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Phones only");

  const second = (await page
    .getByText(/Emma has particular expertise/)
    .boundingBox())!;
  const third = (await page
    .getByText(/Emma has undertaken additional training/)
    .boundingBox())!;
  const portrait = (await page
    .getByRole("img", { name: "Dr Emma Izon" })
    .boundingBox())!;

  expect(portrait.y).toBeGreaterThan(second.y + second.height);
  expect(third.y).toBeGreaterThan(portrait.y + portrait.height);
});

/** Sets the width on the desktop browsers, or keeps the phone's own. */
async function atWidth(page: Page, isMobile: boolean, width: number) {
  if (!isMobile) await page.setViewportSize({ width, height: 1024 });
}

for (const width of [320, 768, 1280]) {
  test(`at ${width}px the HCPC and BABCP logos are centred under the introduction's text`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile && width !== 320, "Phones are 320px");
    await atWidth(page, isMobile, width);

    const intro = (await page
      .locator("p", { hasText: /Emma offers a compassionate/ })
      .boundingBox())!;
    const hcpc = (await page
      .getByRole("link", { name: /^Health and Care Professions Council/ })
      .boundingBox())!;
    const babcp = (await page
      .getByRole("link", { name: /^British Association/ })
      .boundingBox())!;

    expect(babcp.y).toBeCloseTo(hcpc.y, 0);
    expect(
      Math.abs(
        (hcpc.x + babcp.x + babcp.width) / 2 - (intro.x + intro.width / 2),
      ),
    ).toBeLessThanOrEqual(1);
  });
}

for (const width of [320, 700]) {
  test(`below tablet width, at ${width}px, the text runs the full width of the page`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile && width !== 320, "Phones are 320px");
    await atWidth(page, isMobile, width);

    const content = await contentWidth(page);

    const paragraphs = [
      /Dr Emma Izon is a Clinical/,
      /Emma offers a compassionate/,
      /Emma believes/,
      /Her approach is compassionate/,
    ];
    for (const text of paragraphs) {
      const paragraph = (await page
        .locator("p", { hasText: text })
        .boundingBox())!;
      expect(paragraph.width, String(text)).toBeCloseTo(content, 0);
    }
  });
}

for (const width of [320, 700, 768, 1280]) {
  test(`at ${width}px the buttons are centred on the page, below both columns`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile && width !== 320, "Phones are 320px");
    await atWidth(page, isMobile, width);

    const section = page.getByRole("region", { name: "How Emma works" });
    const content = (await section.locator(".container").boundingBox())!;
    const text = (await section
      .locator("p", { hasText: /Her approach is compassionate/ })
      .boundingBox())!;
    const buttons = await Promise.all(
      ["Get in touch", "See publications"].map(
        async (name) =>
          (await section
            .getByRole("link", { name, exact: true })
            .boundingBox())!,
      ),
    );
    const left = Math.min(...buttons.map((button) => button.x));
    const right = Math.max(...buttons.map((button) => button.x + button.width));

    expect((left + right) / 2).toBeCloseTo(content.x + content.width / 2, 0);
    expect(Math.min(...buttons.map((button) => button.y))).toBeGreaterThan(
      text.y + text.height,
    );
  });
}

test("on a phone the bookshelf photo is between the approach's paragraphs", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "From a tablet up the photo sits beside the text");

  const section = page.getByRole("region", { name: "How Emma works" });
  const first = (await section.getByText(/Emma believes/).boundingBox())!;
  const second = (await section.getByText(/Her approach is/).boundingBox())!;
  const photo = (await section.getByRole("img").boundingBox())!;

  expect(photo.y).toBeGreaterThan(first.y + first.height);
  expect(second.y).toBeGreaterThan(photo.y + photo.height);
});

for (const name of [
  "Dr Emma Izon",
  "Psychology books, a trailing plant and succulents on a wooden shelf",
]) {
  test(`the photo "${name}" is shown at its own proportions, uncropped`, async ({
    page,
  }) => {
    const photo = page.getByRole("img", { name });
    await photo.scrollIntoViewIfNeeded();
    await expect(photo).toHaveJSProperty("complete", true);

    // The height is rounded to a whole pixel, so it's within 1px of the
    // height the photo's proportions give its width.
    const { height, uncropped } = await photo.evaluate(
      (img: HTMLImageElement) => ({
        height: img.clientHeight,
        uncropped: (img.clientWidth * img.naturalHeight) / img.naturalWidth,
      }),
    );

    expect(Math.abs(height - uncropped)).toBeLessThanOrEqual(1);
  });
}

test("the About page has no detectable accessibility violations", async ({
  page,
}) => {
  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
