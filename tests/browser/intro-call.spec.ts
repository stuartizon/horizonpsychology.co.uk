import { expect, test } from "@playwright/test";

test("on a wide screen the Book a free call button sits beside the paragraph, below the heading", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "On a phone the button wraps below the paragraph");
  await page.goto("/");
  const panel = page.locator(".intro-call-panel");

  const heading = (await panel.getByRole("heading").boundingBox())!;
  const paragraph = (await panel.locator("p").boundingBox())!;
  const button = (await panel.getByRole("link", { name: "Book a free call" }).boundingBox())!;

  expect(button.y).toBeGreaterThanOrEqual(heading.y + heading.height);
  expect(button.x).toBeGreaterThan(paragraph.x + paragraph.width);
  const buttonMiddle = button.y + button.height / 2;
  const paragraphMiddle = paragraph.y + paragraph.height / 2;
  expect(Math.abs(buttonMiddle - paragraphMiddle)).toBeLessThanOrEqual(1);
});

test("on a phone the Book a free call button is centred below the paragraph", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Phones only");
  await page.goto("/");
  const panel = page.locator(".intro-call-panel");

  const box = (await panel.boundingBox())!;
  const paragraph = (await panel.locator("p").boundingBox())!;
  const button = (await panel.getByRole("link", { name: "Book a free call" }).boundingBox())!;

  expect(button.y).toBeGreaterThanOrEqual(paragraph.y + paragraph.height);
  expect(Math.abs(button.x + button.width / 2 - (box.x + box.width / 2))).toBeLessThanOrEqual(1);
});
