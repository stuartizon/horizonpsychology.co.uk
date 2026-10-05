import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { faqGroups, faqs } from "../src/data/faqs";

test.beforeEach(async ({ page }) => {
  await page.goto("/faqs/");
});

test("the FAQs page has its title and heading", async ({ page }) => {
  await expect(page).toHaveTitle(/^FAQs \| /);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Frequently asked questions");
});

test("each group is a section of its questions, in order", async ({ page }) => {
  for (const group of faqGroups) {
    const section = page.getByRole("region", { name: group.title });
    await expect(section.getByRole("heading", { level: 2 })).toHaveText(group.title);
    await expect(section.getByText(group.eyebrow, { exact: true })).toBeVisible();

    const questions = section.getByRole("heading", { level: 3 }).getByRole("button");
    await expect(questions).toHaveText(group.faqs.map((id) => faqs[id].question));
  }
});

test("a question opens to show its answer", async ({ page }) => {
  const faq = faqs[faqGroups.at(-1)!.faqs[0]];
  const button = page.getByRole("button", { name: faq.question });

  await expect(page.getByText(faq.answer[0])).toBeHidden();
  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(faq.answer[0])).toBeVisible();
});

for (const width of [768, 1280]) {
  test(`at ${width}px each group's questions sit to the right of its heading`, async ({ page, isMobile }) => {
    test.skip(isMobile, "On a phone the questions follow their heading");
    await page.setViewportSize({ width, height: 1024 });

    for (const group of faqGroups) {
      const section = page.getByRole("region", { name: group.title });
      const heading = (await section.getByRole("heading", { level: 2 }).boundingBox())!;
      const questions = (await section.locator(".faqs").boundingBox())!;

      expect(questions.x, group.title).toBeGreaterThan(heading.x + heading.width);
    }
  });
}

test("on a phone each group's questions follow closely after its heading", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Phones only");

  for (const group of faqGroups) {
    const section = page.getByRole("region", { name: group.title });
    const heading = (await section.getByRole("heading", { level: 2 }).boundingBox())!;
    const questions = (await section.locator(".faqs").boundingBox())!;

    expect(questions.y - (heading.y + heading.height), group.title).toBeGreaterThan(0);
    expect(questions.y - (heading.y + heading.height), group.title).toBeLessThanOrEqual(16);
  }
});

test("the FAQs page has no detectable accessibility violations", async ({ page }) => {
  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});
