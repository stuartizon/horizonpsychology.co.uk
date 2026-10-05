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

test("on a wide screen the heading and intro each fit on one line", async ({ page, isMobile }) => {
  test.skip(isMobile, "On a phone they wrap");
  await page.setViewportSize({ width: 1280, height: 1024 });
  await page.evaluate(() => document.fonts.ready);

  for (const element of [page.getByRole("heading", { level: 1 }), page.getByText(/Everything people usually/)]) {
    const lines = await element.evaluate((node) => {
      const range = document.createRange();
      range.selectNodeContents(node);
      return new Set([...range.getClientRects()].map((rect) => Math.round(rect.top))).size;
    });
    expect(lines).toBe(1);
  }
});

test("each group is a section of its questions, in order", async ({ page }) => {
  for (const group of faqGroups) {
    const section = page.getByRole("region", { name: group.title });
    await expect(section.getByRole("heading", { level: 2 })).toHaveText(group.title);
    await expect(section.locator(".eyebrow")).toHaveCount(0);

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

for (const width of [768, 1280]) {
  test(`at ${width}px each group's questions run on from the last group's, with one divider between`, async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "On a phone the groups are spaced apart");
    await page.setViewportSize({ width, height: 1024 });
    const lists = page.locator(".faqs");

    for (let i = 1; i < faqGroups.length; i++) {
      const previous = (await lists.nth(i - 1).boundingBox())!;
      const list = (await lists.nth(i).boundingBox())!;
      expect(list.y, faqGroups[i].title).toBeCloseTo(previous.y + previous.height, 0);

      const topBorder = await lists.nth(i).locator(".faq").first().evaluate((faq) => getComputedStyle(faq).borderTopWidth);
      expect(topBorder, faqGroups[i].title).toBe("0px");
    }
  });
}

/** Where the first line of text in each element sits, measured from a marker at its start. */
async function baseline(element: import("@playwright/test").Locator) {
  return element.evaluate((node) => {
    const marker = document.createElement("span");
    marker.style.display = "inline-block";
    node.prepend(marker);
    const { top } = marker.getBoundingClientRect();
    marker.remove();
    return top;
  });
}

for (const width of [768, 1280]) {
  test(`at ${width}px each group's heading lines up with its first question`, async ({ page, isMobile }) => {
    test.skip(isMobile, "On a phone the questions follow their heading");
    await page.setViewportSize({ width, height: 1024 });
    await page.evaluate(() => document.fonts.ready);

    for (const group of faqGroups) {
      const section = page.getByRole("region", { name: group.title });
      const heading = await baseline(section.getByRole("heading", { level: 2 }));
      const question = await baseline(section.locator(".faq__question").first());

      expect(heading, group.title).toBeCloseTo(question, 0);
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
