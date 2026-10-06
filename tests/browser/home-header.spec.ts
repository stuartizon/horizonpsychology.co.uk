import { expect, test, type Page } from "@playwright/test";

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
