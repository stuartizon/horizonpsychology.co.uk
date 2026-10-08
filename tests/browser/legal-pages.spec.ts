import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/confidentiality/");
});

for (const width of [768, 1280]) {
  test(`at ${width}px the text runs the full width inside the gutters`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Covered by the 768px and 1280px viewports");
    await page.setViewportSize({ width, height: 1024 });

    const [paragraph, content] = await page
      .getByText("There are a small number of exceptions.")
      .evaluate((paragraph) => {
        const container = paragraph.closest(".container")!;
        const style = getComputedStyle(container);
        const box = container.getBoundingClientRect();
        return [
          paragraph.getBoundingClientRect().width,
          box.width -
            parseFloat(style.paddingLeft) -
            parseFloat(style.paddingRight),
        ];
      });

    expect(paragraph).toBeCloseTo(content, 0);
  });
}

test("the Confidentiality page has no detectable accessibility violations", async ({
  page,
}) => {
  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
