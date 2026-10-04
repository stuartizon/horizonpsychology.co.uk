import type { Page } from "@playwright/test";

/**
 * Moves focus to the next element, including links. Safari only tabs to links
 * when "Press Tab to highlight each item" is turned on; Option+Tab always does.
 */
export async function pressTab(page: Page) {
  const engine = page.context().browser()?.browserType().name();
  await page.keyboard.press(engine === "webkit" ? "Alt+Tab" : "Tab");
}
