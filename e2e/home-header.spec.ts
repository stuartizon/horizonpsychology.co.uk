import { expect, test, type Page } from "@playwright/test";

const header = (page: Page) => page.getByRole("banner");
const nav = (page: Page) => header(page).getByRole("navigation", { name: "Primary" });
const logo = (page: Page) => header(page).getByRole("link", { name: "Horizon Psychology, home" }).locator("svg");

/** The opacity of the header's bottom border, from 0 (none) to 1. */
const borderOpacity = (page: Page) =>
  header(page).evaluate((element) => {
    const probe = document.createElement("canvas").getContext("2d")!;
    probe.fillStyle = getComputedStyle(element).borderBottomColor;
    probe.fillRect(0, 0, 1, 1);
    return probe.getImageData(0, 0, 1, 1).data[3] / 255;
  });

/** Where the visible part of the header ends, from the top of the window. */
const headerBottom = async (page: Page) => {
  const box = (await header(page).boundingBox())!;
  return box.y + box.height;
};

const scrollTo = async (page: Page, y: number) => {
  await page.evaluate((top) => window.scrollTo(0, top), y);
  await page.evaluate(() => new Promise(requestAnimationFrame));
};

test.describe("on the home page from tablet width", () => {
  test.skip(({ isMobile }) => isMobile, "Tablet and desktop only");

  test("the header starts tall, with the full logo and no bottom border", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    expect(await borderOpacity(page)).toBe(0);
    expect(await headerBottom(page)).toBeGreaterThan(150);
    expect((await logo(page).boundingBox())?.height).toBeCloseTo(78, 0);
  });

  test("the header becomes the regular header when you scroll down", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    await scrollTo(page, 400);

    expect(await borderOpacity(page)).toBe(1);
    expect(await headerBottom(page)).toBe(77);
    await expect(header(page).getByRole("link", { name: "Contact Us" })).toBeInViewport({ ratio: 1 });
  });

  test("the page below doesn't move as the header shrinks", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const mainTop = () => page.getByRole("main").evaluate((main) => main.getBoundingClientRect().top + window.scrollY);

    const atTop = await mainTop();
    for (const y of [30, 60, 120, 400]) {
      await scrollTo(page, y);
      expect(await mainTop(), `scrolled ${y}px`).toBe(atTop);
    }
  });

  test("at 768px the full logo fits beside the navigation", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await page.goto("/");

    const firstLink = nav(page).getByRole("link").first();
    const [logoBox, linkBox] = await Promise.all([logo(page).boundingBox(), firstLink.boundingBox()]);
    expect(logoBox!.x + logoBox!.width).toBeLessThan(linkBox!.x);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(768);
  });

  test("other pages use the regular header", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/about/");

    expect(await borderOpacity(page)).toBe(1);
    expect(await headerBottom(page)).toBe(77);
  });

  test("with reduced motion, the home page uses the regular header", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    expect(await borderOpacity(page)).toBe(1);
    expect(await headerBottom(page)).toBe(77);
  });
});

test("on a phone the home page uses the regular header", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Phone only");
  await page.goto("/");

  expect(await borderOpacity(page)).toBe(1);
  expect(await headerBottom(page)).toBe(67);
});
