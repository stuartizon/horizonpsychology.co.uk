import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const width of [768, 1280]) {
  test(`at ${width}px the text runs the full width inside the gutters`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "Covered by the 768px and 1280px viewports");
    await page.setViewportSize({ width, height: 1024 });
    await page.goto("/confidentiality/");

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

for (const path of [
  "/confidentiality/",
  "/complaints/",
  "/terms-and-conditions/",
  "/privacy-policy/",
]) {
  test(`${path} has no detectable accessibility violations`, async ({
    page,
  }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();

    expect(results.violations).toEqual([]);
  });
}

for (const width of [320, 768]) {
  test(`at ${width}px every fee sits ${width < 768 ? "under" : "beside"} its service's name`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1024 });
    await page.goto("/terms-and-conditions/");

    const rows = await page.locator("dl > div").evaluateAll((rows) =>
      rows.map((row) => {
        const name = row.querySelector("dt")!.getBoundingClientRect();
        const fee = row.querySelector("dd")!.getBoundingClientRect();
        return fee.top >= name.bottom ? "under" : "beside";
      }),
    );

    expect(rows).toEqual(Array(4).fill(width < 768 ? "under" : "beside"));
  });
}
