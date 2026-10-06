import { expect, test, type Page } from "@playwright/test";
import { testimonials } from "@/data/testimonials";
import { pressTab } from "./keyboard";

const [first, second] = testimonials;
const last = testimonials.at(-1)!;

const carousel = (page: Page) => page.getByRole("group", { name: "Testimonials", exact: true });

/** The testimonial showing: hidden slides are out of the accessibility tree. */
const showing = (page: Page) => carousel(page).getByRole("figure");

test.beforeEach(async ({ page }) => {
  await page.clock.install();
  await page.goto("/about/");
});

test("starts on the first testimonial", async ({ page }) => {
  await expect(showing(page)).toHaveCount(1);
  await expect(showing(page)).toContainText(first.name);
});

test("Next shows the next testimonial, and Previous goes round from the first to the last", async ({ page }) => {
  await carousel(page).getByRole("button", { name: "Next testimonial" }).click();
  await expect(showing(page)).toContainText(second.name);

  await carousel(page).getByRole("button", { name: "Previous testimonial" }).click();
  await carousel(page).getByRole("button", { name: "Previous testimonial" }).click();
  await expect(showing(page)).toContainText(last.name);
});

test("a testimonial's button shows it and is marked current", async ({ page }) => {
  const dot = carousel(page).getByRole("button", { name: `Testimonial 3 of ${testimonials.length}` });

  await dot.click();
  await expect(showing(page)).toContainText(testimonials[2].name);
  await expect(dot).toHaveAttribute("aria-current", "true");
  await expect(carousel(page).getByRole("button", { name: `Testimonial 1 of ${testimonials.length}` })).not.toHaveAttribute(
    "aria-current",
  );
});

test("announces the testimonial once someone moves between them", async ({ page }) => {
  const slides = carousel(page).locator("[aria-live]");
  await expect(slides).toHaveAttribute("aria-live", "off");

  await carousel(page).getByRole("button", { name: "Next testimonial" }).click();
  await expect(slides).toHaveAttribute("aria-live", "polite");
});

test("stays the same height whichever testimonial is showing", async ({ page }) => {
  await expect(carousel(page)).toBeVisible();
  const height = async () => (await carousel(page).boundingBox())!.height;
  const start = await height();

  for (let i = 1; i < testimonials.length; i++) {
    await carousel(page).getByRole("button", { name: "Next testimonial" }).click();
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
  await carousel(page).getByRole("button", { name: "Next testimonial" }).focus();

  await page.clock.runFor(15000);
  await expect(showing(page)).toContainText(first.name);
});

test("doesn't move on by itself when reduced motion is preferred", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about/");

  await page.clock.runFor(15000);
  await expect(showing(page)).toContainText(first.name);
});

test("Tab moves from Previous to Next to each testimonial's button", async ({ page }) => {
  await carousel(page).getByRole("button", { name: "Previous testimonial" }).focus();

  await pressTab(page);
  await expect(carousel(page).getByRole("button", { name: "Next testimonial" })).toBeFocused();
  await pressTab(page);
  await expect(carousel(page).getByRole("button", { name: `Testimonial 1 of ${testimonials.length}` })).toBeFocused();
});

test("swiping left shows the next testimonial, and swiping right goes back", async ({ page }) => {
  const box = (await showing(page).boundingBox())!;
  const y = box.y + box.height / 2;
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
