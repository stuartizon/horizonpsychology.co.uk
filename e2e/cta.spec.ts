import { expect, test } from "@playwright/test";

test("the home page invites a free 15-minute call, linking to the contact page", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Start with a free 15-minute call" })).toBeVisible();
  const link = page.getByRole("link", { name: "Book a free call" });
  await expect(link).toHaveAttribute("href", "/contact/");

  await link.click();
  await expect(page).toHaveURL("/contact/");
});
