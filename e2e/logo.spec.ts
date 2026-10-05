import { expect, test } from "@playwright/test";
import { services } from "../src/data/services";

const pages = ["/", "/about/", "/contact/", "/projects/", ...services.map(({ id }) => `/${id}/`), "/404/"];

test("the header logo is 20px tall on a phone and 24px from tablet width", async ({ page, isMobile }) => {
  await page.goto("/");

  const logo = page.getByRole("banner").getByRole("link", { name: "Horizon Psychology, home" }).locator("svg");
  expect((await logo.boundingBox())?.height).toBe(isMobile ? 20 : 24);
});

test("the footer logo is the same size as the header logo", async ({ page }) => {
  await page.goto("/");
  const logo = (landmark: "banner" | "contentinfo") =>
    page.getByRole(landmark).getByRole("link", { name: "Horizon Psychology, home" }).locator("svg").boundingBox();

  const [header, footer] = await Promise.all([logo("banner"), logo("contentinfo")]);
  expect(footer?.height).toBe(header?.height);
  expect(footer?.width).toBe(header?.width);
});

test.describe("at 320px", () => {
  test.skip(({ isMobile }) => !isMobile, "Phone size only");

  for (const path of pages) {
    test(`${path} doesn't scroll sideways`, async ({ page }) => {
      await page.goto(path);

      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
    });
  }
});
