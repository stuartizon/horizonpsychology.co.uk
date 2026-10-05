import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { services } from "../src/data/services";

const [service] = services;

test.beforeEach(async ({ page }) => {
  await page.goto(`/${service.id}/`);
});

test("on a wide screen the fees panel sits beside the description", async ({ page, isMobile }) => {
  test.skip(isMobile, "On a phone the fees panel follows the description");

  const description = (await page.getByText(service.description[0]).boundingBox())!;
  const fees = (await page.getByRole("complementary", { name: "Fees and practicalities" }).boundingBox())!;

  expect(fees.x).toBeGreaterThan(description.x + description.width);
  expect(fees.y).toBeLessThan(description.y);
});

test("on a phone the fees panel follows the description", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Phones only");

  const description = (await page.getByText(service.description.at(-1)!).boundingBox())!;
  const fees = (await page.getByRole("complementary", { name: "Fees and practicalities" }).boundingBox())!;

  expect(fees.y).toBeGreaterThan(description.y + description.height);
});

test("on a wide screen the questions sit to the right of their heading", async ({ page, isMobile }) => {
  test.skip(isMobile, "On a phone the questions follow their heading");

  const section = page.getByRole("region", { name: "Before you get in touch" });
  const heading = (await section.getByRole("heading", { level: 2 }).boundingBox())!;
  const questions = (await section.locator(".faqs").boundingBox())!;

  expect(questions.x).toBeGreaterThan(heading.x + heading.width);
});

test("the service page has no detectable accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
