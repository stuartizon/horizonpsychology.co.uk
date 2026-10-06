import { expect, test, type Page } from "@playwright/test";
import { testimonials } from "@/data/testimonials";
import { pressTab } from "./keyboard";

const [first, second] = testimonials;
const last = testimonials.at(-1)!;

const carousel = (page: Page) => page.getByRole("group", { name: "Testimonials", exact: true });

/** The testimonial showing: hidden slides are out of the accessibility tree. */
const showing = (page: Page) => carousel(page).getByRole("figure");

const dot = (page: Page, n: number) =>
  carousel(page).getByRole("button", { name: `Testimonial ${n} of ${testimonials.length}` });

// The clock only moves when a test runs it on, so time spent loading the page
// doesn't count towards moving on.
test.beforeEach(async ({ page }) => {
  await page.clock.install();
  await page.clock.pauseAt(Date.now() + 1000);
  await page.goto("/about/");
});

test("starts on the first testimonial", async ({ page }) => {
  await expect(showing(page)).toHaveCount(1);
  await expect(showing(page)).toContainText(first.name);
});

test("Next shows the next testimonial, and Previous goes round from the first to the last", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Phones have no arrows");
  await carousel(page).getByRole("button", { name: "Next testimonial" }).click();
  await expect(showing(page)).toContainText(second.name);

  await carousel(page).getByRole("button", { name: "Previous testimonial" }).click();
  await carousel(page).getByRole("button", { name: "Previous testimonial" }).click();
  await expect(showing(page)).toContainText(last.name);
});

test("a testimonial's button shows it and is marked current", async ({ page }) => {
  await dot(page, 3).click();
  await expect(showing(page)).toContainText(testimonials[2].name);
  await expect(dot(page, 3)).toHaveAttribute("aria-current", "true");
  await expect(dot(page, 1)).not.toHaveAttribute("aria-current");
});

test("announces the testimonial once someone moves between them", async ({ page }) => {
  const slides = carousel(page).locator("[aria-live]");
  await expect(slides).toHaveAttribute("aria-live", "off");

  await dot(page, 2).click();
  await expect(slides).toHaveAttribute("aria-live", "polite");
});

test("stays the same height whichever testimonial is showing", async ({ page }) => {
  await expect(carousel(page)).toBeVisible();
  const height = async () => (await carousel(page).boundingBox())!.height;
  const start = await height();

  for (let n = 2; n <= testimonials.length; n++) {
    await dot(page, n).click();
    expect(await height()).toBe(start);
  }
});

test("moves on to the next testimonial by itself every 7 seconds", async ({ page }) => {
  await page.clock.runFor(6900);
  await expect(showing(page)).toContainText(first.name);

  await page.clock.runFor(200);
  await expect(showing(page)).toContainText(second.name);
});

test("doesn't move on by itself while the pointer is over it", async ({ page, isMobile }) => {
  test.skip(isMobile, "Phones have no pointer to hover");
  await carousel(page).hover();

  await page.clock.runFor(15000);
  await expect(showing(page)).toContainText(first.name);
});

test("doesn't move on by itself while focus is in it", async ({ page }) => {
  await dot(page, 1).focus();

  await page.clock.runFor(15000);
  await expect(showing(page)).toContainText(first.name);
});

test("doesn't move on by itself when reduced motion is preferred", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about/");

  await page.clock.runFor(15000);
  await expect(showing(page)).toContainText(first.name);
});

test("Tab moves from Previous to Next to each testimonial's button", async ({ page, isMobile }) => {
  test.skip(isMobile, "Phones have no arrows");
  await carousel(page).getByRole("button", { name: "Previous testimonial" }).focus();

  await pressTab(page);
  await expect(carousel(page).getByRole("button", { name: "Next testimonial" })).toBeFocused();
  await pressTab(page);
  await expect(dot(page, 1)).toBeFocused();
});

test("swiping left shows the next testimonial, and swiping right goes back", async ({ page }) => {
  // Halfway down the part on screen, as a long quote can be taller than a phone's screen.
  await showing(page).scrollIntoViewIfNeeded();
  const box = (await showing(page).boundingBox())!;
  const y = (Math.max(box.y, 0) + Math.min(box.y + box.height, page.viewportSize()!.height)) / 2;
  const swipe = async (from: number, to: number) => {
    await page.mouse.move(from, y);
    await page.mouse.down();
    await page.mouse.move(to, y, { steps: 8 });
    await page.mouse.up();
  };

  await swipe(box.x + box.width * 0.8, box.x + box.width * 0.2);
  await expect(showing(page)).toContainText(second.name);

  await swipe(box.x + box.width * 0.2, box.x + box.width * 0.8);
  await expect(showing(page)).toContainText(first.name);
});

test("on a phone the arrows are hidden, and the testimonial runs the full width", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Phones only");

  await expect(carousel(page).getByRole("button", { name: "Next testimonial" })).toBeHidden();
  await expect(carousel(page).getByRole("button", { name: "Previous testimonial" })).toBeHidden();
  const width = (await carousel(page).boundingBox())!.width;
  expect((await showing(page).boundingBox())!.width).toBeCloseTo(width, 0);
});

for (const width of [768, 1280]) {
  test(`at ${width}px the arrows sit either side of the testimonial`, async ({ page, isMobile }) => {
    test.skip(isMobile, "Phones have no arrows");
    await page.setViewportSize({ width, height: 1024 });

    const quote = (await showing(page).boundingBox())!;
    const previous = (await carousel(page).getByRole("button", { name: "Previous testimonial" }).boundingBox())!;
    const next = (await carousel(page).getByRole("button", { name: "Next testimonial" }).boundingBox())!;
    expect(previous.x + previous.width).toBeLessThanOrEqual(quote.x);
    expect(next.x).toBeGreaterThanOrEqual(quote.x + quote.width);
  });
}

test("a shorter testimonial sits halfway down the space the longest needs", async ({ page }) => {
  const shortest = testimonials.reduce((a, b) => (b.quote.length < a.quote.length ? b : a));
  await dot(page, testimonials.indexOf(shortest) + 1).click();
  await expect(showing(page)).toContainText(shortest.name);

  const space = (await carousel(page).locator("[aria-live]").boundingBox())!;
  const top = (await showing(page).locator("blockquote").boundingBox())!.y;
  const name = (await showing(page).locator("figcaption").boundingBox())!;
  expect((top + name.y + name.height) / 2).toBeCloseTo(space.y + space.height / 2, 0);
});
