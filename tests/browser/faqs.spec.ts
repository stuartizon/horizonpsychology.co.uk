import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { faqs } from "@/data/faqs";
import { services } from "@/data/services";
import { baseline } from "./baseline";

const [service] = services;
const [first, second] = service.faqs.map((id) => faqs[id]);

test.beforeEach(async ({ page }) => {
  await page.goto(`/${service.id}/`);
});

function question(page: import("@playwright/test").Page, text: string) {
  return page
    .getByRole("heading", { level: 3, name: text })
    .getByRole("button", { name: text });
}

test("answers are hidden until their question is opened", async ({ page }) => {
  await expect(page.getByText(first.answer[0])).toBeHidden();
  await expect(question(page, first.question)).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

test("clicking a question opens its answer, and clicking again closes it", async ({
  page,
}) => {
  const button = question(page, first.question);

  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(first.answer[0])).toBeVisible();
  await expect(page.getByText(second.answer[0])).toBeHidden();

  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByText(first.answer[0])).toBeHidden();
});

test("a question opens with Enter and closes with Space", async ({ page }) => {
  const button = question(page, first.question);
  await button.focus();

  await page.keyboard.press("Enter");
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(first.answer[0])).toBeVisible();

  await page.keyboard.press("Space");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByText(first.answer[0])).toBeHidden();
});

test("the questions have no detectable accessibility violations, open or closed", async ({
  page,
}) => {
  const list = page.locator(".faqs");
  expect(
    (await new AxeBuilder({ page }).include(".faqs").analyze()).violations,
  ).toEqual([]);

  await question(page, first.question).click();
  await expect(page.getByText(first.answer[0])).toBeVisible();
  expect(
    (await new AxeBuilder({ page }).include(".faqs").analyze()).violations,
  ).toEqual([]);
  await expect(list).toBeVisible();
});

test("an open answer lines up with its question, leaving the toggle's column clear", async ({
  page,
}) => {
  const button = question(page, first.question);
  await button.click();
  const answer = page.locator(`#${await button.getAttribute("aria-controls")}`);
  await expect(answer).toBeVisible();

  const row = (await button.locator(".faq__question").boundingBox())!;
  for (const paragraph of await answer.locator("p").all()) {
    const box = (await paragraph.boundingBox())!;
    expect(box.x).toBeCloseTo(row.x, 0);
    expect(box.width).toBeCloseTo(row.width, 0);
  }
});

test("each question's plus is level with the middle of its first line's capitals", async ({
  page,
}) => {
  await page.evaluate(() => document.fonts.ready);
  const text = page.locator(".faq__question").first();
  // The font's own cap height, which doesn't vary with how each platform
  // draws the letters.
  const capHeight = await text.evaluate((node) => {
    const probe = document.createElement("span");
    probe.style.cssText = "display: inline-block; height: 1cap";
    node.append(probe);
    const { height } = probe.getBoundingClientRect();
    probe.remove();
    return height;
  });
  const capMiddle = (await baseline(text)) - capHeight / 2;
  const toggle = (await page.locator(".faq__toggle").first().boundingBox())!;

  // Within a pixel, as platforms round the baseline differently.
  expect(
    Math.abs(toggle.y + toggle.height / 2 - capMiddle),
  ).toBeLessThanOrEqual(1);
});
