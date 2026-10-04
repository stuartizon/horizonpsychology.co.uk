import { expect, test } from "@playwright/test";
import { testimonials } from "../src/data/testimonials";

test("the home page shows each testimonial with its name", async ({ page }) => {
  await page.goto("/");

  // The carousel hides off-screen slides from the accessibility tree, so find every card.
  const cards = page.locator("figure");
  await expect(cards.locator("figcaption")).toHaveText(testimonials.map(({ name }) => name));
  for (const [index, { quote }] of testimonials.entries()) {
    await expect(cards.nth(index).locator("blockquote")).toHaveText(`“${quote}”`);
  }
});
