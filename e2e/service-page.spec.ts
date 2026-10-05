import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { services } from "../src/data/services";

const [service] = services;

test.beforeEach(async ({ page }) => {
  await page.goto(`/${service.id}/`);
});

test("on a tablet the fees panel sits beside the description", async ({ page, isMobile }) => {
  test.skip(isMobile, "Sets a tablet width on the desktop browsers");
  await page.setViewportSize({ width: 768, height: 1024 });

  const description = (await page.getByText(service.description[0]).boundingBox())!;
  const fees = (await page.getByRole("complementary", { name: "Fees and practicalities" }).boundingBox())!;

  expect(fees.x).toBeGreaterThan(description.x + description.width);
});

for (const { id, name } of services) {
  test(`the ${name} page title fits on one line`, async ({ page, isMobile }) => {
    await page.goto(`/${id}/`);
    await page.evaluate(() => document.fonts.ready);
    const lines = () =>
      page.getByRole("heading", { level: 1 }).evaluate((heading) => {
        const range = document.createRange();
        range.selectNodeContents(heading);
        return range.getClientRects().length;
      });

    expect(await lines()).toBe(1);
    if (!isMobile) {
      await page.setViewportSize({ width: 768, height: 1024 });
      expect(await lines()).toBe(1);
    }
  });
}

test("the service icon is sized to the page title", async ({ page }) => {
  const heading = page.getByRole("heading", { level: 1 });
  const fontSize = await heading.evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
  const icon = (await page.locator(".service__icon svg").boundingBox())!;

  expect(icon.height / fontSize).toBeGreaterThan(1);
  expect(icon.height / fontSize).toBeLessThan(1.1);
});

for (const { id, name } of services) {
  test(`the ${name} page shows its own photo, resized, with alt text`, async ({ page }) => {
    await page.goto(`/${id}/`);
    const photo = page.locator(".service__image");

    await expect(photo).toHaveAttribute("src", new RegExp(`^/_astro/${id}\\.`));
    await expect(photo).toHaveAttribute("srcset", /\d+w/);
    await expect(photo).toHaveAttribute("alt", /\S/);
  });

  test(`the ${name} photo keeps its own proportions`, async ({ page }) => {
    await page.goto(`/${id}/`);
    const photo = page.locator(".service__image");
    await expect(photo).toHaveJSProperty("complete", true);

    const { natural, shown } = await photo.evaluate((img: HTMLImageElement) => ({
      natural: img.naturalWidth / img.naturalHeight,
      shown: img.clientWidth / img.clientHeight,
    }));

    expect(shown).toBeCloseTo(natural, 2);
  });
}

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

for (const width of [768, 1280]) {
  test(`at ${width}px the questions sit to the right of their heading`, async ({ page, isMobile }) => {
    test.skip(isMobile, "On a phone the questions follow their heading");
    await page.setViewportSize({ width, height: 1024 });

    const section = page.getByRole("region", { name: "Before you get in touch" });
    const heading = (await section.getByRole("heading", { level: 2 }).boundingBox())!;
    const questions = (await section.locator(".faqs").boundingBox())!;

    expect(questions.x).toBeGreaterThan(heading.x + heading.width);
  });
}

test("the service page has no detectable accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});

for (const width of [320, 740]) {
  test(`at ${width}px the description and fees panel are the same width`, async ({ page, isMobile }) => {
    test.skip(isMobile && width !== 320, "Sets a narrow width on the desktop browsers");
    await page.setViewportSize({ width, height: 1024 });

    const description = (await page.getByText(service.description[0]).boundingBox())!;
    const fees = (await page.getByRole("complementary", { name: "Fees and practicalities" }).boundingBox())!;

    expect(description.x).toBeCloseTo(fees.x, 0);
    expect(description.width).toBeCloseTo(fees.width, 0);
  });

  test(`at ${width}px the questions follow closely after their heading`, async ({ page, isMobile }) => {
    test.skip(isMobile && width !== 320, "Sets a narrow width on the desktop browsers");
    await page.setViewportSize({ width, height: 1024 });

    const section = page.getByRole("region", { name: "Before you get in touch" });
    const heading = (await section.getByRole("heading", { level: 2 }).boundingBox())!;
    const questions = (await section.locator(".faqs").boundingBox())!;

    expect(questions.y - (heading.y + heading.height)).toBeLessThanOrEqual(16);
  });
}
