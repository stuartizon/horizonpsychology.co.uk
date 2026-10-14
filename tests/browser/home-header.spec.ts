import { expect, test, type Page } from "@playwright/test";
import { pressTab } from "./keyboard";

const header = (page: Page) => page.getByRole("banner");
const nav = (page: Page) =>
  header(page).getByRole("navigation", { name: "Primary" });
const logo = (page: Page) =>
  header(page)
    .getByRole("link", { name: "Horizon Psychology, home" })
    .locator("svg");

/** The opacity of the header's bottom border, from 0 (none) to 1. */
const borderOpacity = (page: Page) =>
  header(page).evaluate((element) => {
    const before = getComputedStyle(element, "::before");
    const style =
      before.content === "none" ? getComputedStyle(element) : before;
    const probe = document.createElement("canvas").getContext("2d")!;
    probe.fillStyle = style.borderBottomColor;
    probe.fillRect(0, 0, 1, 1);
    return probe.getImageData(0, 0, 1, 1).data[3] / 255;
  });

/** Where the visible part of the header ends, from the top of the window. */
const headerBottom = (page: Page) =>
  header(page).evaluate((element) => {
    const { top, height } = element.getBoundingClientRect();
    const before = getComputedStyle(element, "::before");
    return Math.round(
      top + (before.content === "none" ? height : parseFloat(before.height)),
    );
  });

const scrollTo = async (page: Page, y: number) => {
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await page.evaluate(() => new Promise(requestAnimationFrame));
};

type Box = { x: number; y: number; width: number; height: number };

/**
 * The box around what changes in the header when the logo takes focus from the keyboard, which
 * is its focus ring as drawn. Compares screenshots before and after in the page, with a canvas.
 */
const focusRing = async (page: Page): Promise<Box> => {
  const clip = { x: 0, y: 0, width: 1280, height: 200 };
  // Waits for the header to stop changing, as it can still be catching up with a scroll.
  let before = await page.screenshot({ clip });
  for (let previous; !previous?.equals(before);) {
    previous = before;
    before = await page.screenshot({ clip });
  }
  await pressTab(page);
  await expect(
    header(page).getByRole("link", { name: "Horizon Psychology, home" }),
  ).toBeFocused();
  const after = await page.screenshot({ clip });

  return page.evaluate(
    async (screenshots) => {
      const pixels = await Promise.all(
        screenshots.map(async (base64) => {
          const image = new Image();
          image.src = `data:image/png;base64,${base64}`;
          await image.decode();
          const canvas = document.createElement("canvas");
          canvas.width = image.width;
          canvas.height = image.height;
          const context = canvas.getContext("2d")!;
          context.drawImage(image, 0, 0);
          return context.getImageData(0, 0, image.width, image.height);
        }),
      );
      const [a, b] = pixels.map((image) => image.data);
      const { width, height } = pixels[0];
      let [left, top, right, bottom] = [width, height, -1, -1];
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          if ([0, 1, 2].some((c) => Math.abs(a[i + c] - b[i + c]) > 8)) {
            [left, top] = [Math.min(left, x), Math.min(top, y)];
            [right, bottom] = [Math.max(right, x), Math.max(bottom, y)];
          }
        }
      }
      const scale = devicePixelRatio;
      return {
        x: left / scale,
        y: top / scale,
        width: (right + 1 - left) / scale,
        height: (bottom + 1 - top) / scale,
      };
    },
    [before.toString("base64"), after.toString("base64")],
  );
};

/** Checks the ring goes all the way round `logo`, with no more than `gap` around it. */
const expectRingAround = (ring: Box, logo: Box, gap = 8) => {
  expect(ring.x).toBeLessThan(logo.x);
  expect(ring.y).toBeLessThan(logo.y);
  expect(ring.x + ring.width).toBeGreaterThan(logo.x + logo.width);
  expect(ring.y + ring.height).toBeGreaterThan(logo.y + logo.height);
  expect(logo.x - ring.x).toBeLessThanOrEqual(gap);
  expect(logo.y - ring.y).toBeLessThanOrEqual(gap);
  expect(ring.x + ring.width - (logo.x + logo.width)).toBeLessThanOrEqual(gap);
  expect(ring.y + ring.height - (logo.y + logo.height)).toBeLessThanOrEqual(
    gap,
  );
};

test.describe("on the home page from tablet width", () => {
  test.skip(({ isMobile }) => isMobile, "Tablet and desktop only");

  test("the header starts tall, with the full logo and no bottom border", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    expect(await borderOpacity(page)).toBe(0);
    expect(await headerBottom(page)).toBeGreaterThan(150);
    expect((await logo(page).boundingBox())?.height).toBeCloseTo(78, 0);
  });

  test("the header becomes the regular header when you scroll down", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await scrollTo(page, 500);

    expect(await borderOpacity(page)).toBe(1);
    expect(await headerBottom(page)).toBe(77);
    await expect(
      header(page).getByRole("link", { name: "Contact Us" }),
    ).toBeInViewport({ ratio: 1 });
  });

  test("the header shrinks over the first 375px of scrolling", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await scrollTo(page, 150);
    expect(await headerBottom(page)).toBe(137);
    await scrollTo(page, 375);
    expect(await headerBottom(page)).toBe(77);
  });

  test("the page stays just below the header as it shrinks", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const mainTop = () =>
      page
        .getByRole("main")
        .evaluate((main) => Math.round(main.getBoundingClientRect().top));

    for (const y of [0, 75, 150, 300, 375]) {
      await scrollTo(page, y);
      expect(await mainTop(), `scrolled ${y}px`).toBe(await headerBottom(page));
    }
    await scrollTo(page, 475);
    expect(await mainTop()).toBe(77 - 100);
  });

  test("where the browser supports it, the page follows the scroll with a scroll-driven animation, so it doesn't lag behind", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    test.skip(
      !(await page.evaluate(() =>
        CSS.supports("animation-timeline: scroll()"),
      )),
      "The browser doesn't support scroll-driven animations, so the script moves the page",
    );

    const timelines = await page.evaluate(() =>
      ["main", "footer"].map((name) =>
        document
          .querySelector(`body > ${name}`)!
          .getAnimations()
          .map((animation) => animation.timeline?.constructor.name),
      ),
    );

    expect(timelines).toEqual([["ScrollTimeline"], ["ScrollTimeline"]]);
  });

  test("at 768px the full logo fits beside the navigation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await page.goto("/");

    const firstLink = nav(page).getByRole("link").first();
    const [logoBox, linkBox] = await Promise.all([
      logo(page).boundingBox(),
      firstLink.boundingBox(),
    ]);
    expect(logoBox!.x + logoBox!.width).toBeLessThan(linkBox!.x);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(768);
  });

  for (const width of [1280, 768]) {
    test(`at ${width}px the focus ring goes round the full logo`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");

      const ring = await focusRing(page);

      expectRingAround(ring, (await logo(page).boundingBox())!);
    });

    test(`at ${width}px the focus ring goes round the wordmark once the header has shrunk`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      await scrollTo(page, 500);

      const ring = await focusRing(page);

      const link = header(page).getByRole("link", {
        name: "Horizon Psychology, home",
      });
      expectRingAround(ring, (await link.boundingBox())!);
    });
  }

  test("other pages use the regular header", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/about/");

    expect(await borderOpacity(page)).toBe(1);
    expect(await headerBottom(page)).toBe(77);
  });

  test("with reduced motion, the home page uses the regular header", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    expect(await borderOpacity(page)).toBe(1);
    expect(await headerBottom(page)).toBe(77);
  });
});

test("on a phone the home page uses the regular header", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Phone only");
  await page.goto("/");

  expect(await borderOpacity(page)).toBe(1);
  expect(await headerBottom(page)).toBe(67);
});
