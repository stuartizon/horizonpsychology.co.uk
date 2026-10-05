import { expect, test } from "@playwright/test";

test("the home page invites a free 15-minute call, linking to the contact page", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Start with a free 15-minute call" })).toBeVisible();
  const link = page.getByRole("link", { name: "Book a free call" });
  await expect(link).toHaveAttribute("href", "/contact/");

  await link.click();
  await expect(page).toHaveURL("/contact/");
});

test("on a wide screen the Book a free call button sits beside the paragraph, below the heading", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "On a phone the button wraps below the paragraph");
  await page.goto("/");
  const panel = page.locator(".cta-panel");

  const heading = (await panel.getByRole("heading").boundingBox())!;
  const paragraph = (await panel.locator("p").boundingBox())!;
  const button = (await panel.getByRole("link", { name: "Book a free call" }).boundingBox())!;

  expect(button.y).toBeGreaterThanOrEqual(heading.y + heading.height);
  expect(button.x).toBeGreaterThan(paragraph.x + paragraph.width);
  const buttonMiddle = button.y + button.height / 2;
  const paragraphMiddle = paragraph.y + paragraph.height / 2;
  expect(Math.abs(buttonMiddle - paragraphMiddle)).toBeLessThanOrEqual(1);
});
