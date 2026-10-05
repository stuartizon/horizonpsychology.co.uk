import { expect, test } from "@playwright/test";
import { services } from "../src/data/services";

test("clicking anywhere on a service card opens its page", async ({ page }) => {
  await page.goto("/");
  const [service] = services;

  // Away from the link text: the link covers the whole card.
  await page.getByRole("article").filter({ hasText: service.name }).click({ position: { x: 20, y: 20 } });

  await expect(page).toHaveURL(`/${service.id}/`);
});

test("on a wide screen every service card title fits on one line", async ({ page, isMobile }) => {
  test.skip(isMobile, "Wide screens only");
  await page.setViewportSize({ width: 1400, height: 900 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  const lines = await page.locator(".service-card h3").evaluateAll((titles) =>
    titles.map((title) => {
      const range = document.createRange();
      range.selectNodeContents(title);
      return range.getClientRects().length;
    }),
  );
  expect(lines).toEqual(services.map(() => 1));
});
