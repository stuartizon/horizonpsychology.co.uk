import { expect, test } from "@playwright/test";
import { testimonials } from "../src/data/testimonials";

test("the home page shows each testimonial with its name", async ({ page }) => {
  await page.goto("/");

  const cards = page.getByRole("figure");
  await expect(cards.locator("figcaption")).toHaveText(testimonials.map(({ name }) => name));
  for (const [index, { quote }] of testimonials.entries()) {
    await expect(cards.nth(index).locator("blockquote")).toHaveText(`“${quote}”`);
  }
});
