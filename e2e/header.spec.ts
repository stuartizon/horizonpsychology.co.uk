import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { services } from "../src/data/services";
import { pressShiftTab, pressTab } from "./keyboard";

const header = (page: Page) => page.getByRole("banner");
const primaryNav = (page: Page) => header(page).getByRole("navigation", { name: "Primary" });
const contactUs = (page: Page) => header(page).getByRole("link", { name: "Contact Us" });
const menuButton = (page: Page) => header(page).getByRole("button", { name: "Open menu" });
const servicesButton = (page: Page) => primaryNav(page).getByRole("button", { name: "Services" });
const servicesLinks = (page: Page) =>
  primaryNav(page).getByRole("link").filter({ hasText: /Therapy|Supervision/ });
const menu = (page: Page) => page.getByRole("dialog", { name: "Menu" });
const closeButton = (page: Page) => menu(page).getByRole("button", { name: "Close menu" });
const menuLinks = (page: Page) => menu(page).getByRole("navigation").getByRole("link");

test.describe("on a phone", () => {
  test.skip(({ isMobile }) => !isMobile, "Phone layout only");

  test("the header shows the menu button instead of the navigation and Contact Us", async ({ page }) => {
    await page.goto("/");

    await expect(menuButton(page)).toBeVisible();
    await expect(primaryNav(page)).toBeHidden();
    await expect(contactUs(page)).toBeHidden();
  });

  test("the menu button opens the menu and moves focus into it", async ({ page }) => {
    await page.goto("/");

    await menuButton(page).click();

    await expect(menu(page)).toBeVisible();
    await expect(menuButton(page)).toHaveAttribute("aria-expanded", "true");
    await expect(closeButton(page)).toBeFocused();
    await expect(menuLinks(page)).toHaveText([
      "About Emma",
      ...services.map(({ name }) => name),
      "Research",
      "Contact Us",
    ]);
  });

  test("the menu keeps keyboard focus inside it", async ({ page }) => {
    await page.goto("/");
    await menuButton(page).click();

    await pressTab(page);
    await expect(menuLinks(page).first()).toBeFocused();

    await menuLinks(page).last().focus();
    await pressTab(page);
    await expect(menu(page).getByRole("link", { name: /home/ })).toBeFocused();

    await pressShiftTab(page);
    await expect(menuLinks(page).last()).toBeFocused();
  });

  test("Escape closes the menu and returns focus to the menu button", async ({ page }) => {
    await page.goto("/");
    await menuButton(page).click();

    await page.keyboard.press("Escape");

    await expect(menu(page)).toBeHidden();
    await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");
    await expect(menuButton(page)).toBeFocused();
  });

  test("the close button closes the menu and returns focus to the menu button", async ({ page }) => {
    await page.goto("/");
    await menuButton(page).click();

    await closeButton(page).click();

    await expect(menu(page)).toBeHidden();
    await expect(menuButton(page)).toHaveAttribute("aria-expanded", "false");
    await expect(menuButton(page)).toBeFocused();
  });

  test("opening the menu doesn't move the logo or the menu button", async ({ page }) => {
    await page.goto("/about/");
    const headerLogo = await header(page).getByRole("link", { name: /home/ }).boundingBox();
    const burger = await menuButton(page).boundingBox();

    await menuButton(page).click();

    expect(await menu(page).getByRole("link", { name: /home/ }).boundingBox()).toEqual(headerLogo);
    expect(await closeButton(page).boundingBox()).toEqual(burger);
  });

  test("every menu link opens a page", async ({ page }) => {
    await page.goto("/");
    await menuButton(page).click();

    for (const href of await menuLinks(page).evaluateAll((links) => links.map((link) => link.getAttribute("href")))) {
      const response = await page.request.get(href!);
      expect(response.status(), href!).toBe(200);
    }
  });

  test("the menu closes if the window widens to tablet width", async ({ page }) => {
    await page.goto("/");
    await menuButton(page).click();

    await page.setViewportSize({ width: 768, height: 800 });

    await expect(page.locator("dialog#mobile-menu")).not.toHaveAttribute("open");
    await expect.poll(() => page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe("hidden");
  });

  test("the open menu has no detectable accessibility violations", async ({ page }) => {
    await page.goto("/");
    await menuButton(page).click();
    await expect(menu(page)).toBeVisible();

    const results = await new AxeBuilder({ page }).include("dialog").analyze();

    expect(results.violations).toEqual([]);
  });
});

test.describe("from tablet width", () => {
  test.skip(({ isMobile }) => isMobile, "Tablet and desktop layout only");

  test("the header shows the navigation and Contact Us, without a menu button", async ({ page }) => {
    await page.goto("/");

    await expect(primaryNav(page)).toBeVisible();
    await expect(contactUs(page)).toBeVisible();
    await expect(menuButton(page)).toBeHidden();
  });

  test("the full header fits at 768px and switches to the menu button below it", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 800 });
    await page.goto("/about/");

    await expect(primaryNav(page)).toBeVisible();
    await expect(contactUs(page)).toBeInViewport({ ratio: 1 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(768);

    await page.setViewportSize({ width: 767, height: 800 });
    await expect(menuButton(page)).toBeVisible();
    await expect(primaryNav(page)).toBeHidden();
  });

  test("the Services dropdown opens and closes with the keyboard", async ({ page }) => {
    await page.goto("/");
    await servicesButton(page).focus();

    await page.keyboard.press("Enter");
    await expect(servicesButton(page)).toHaveAttribute("aria-expanded", "true");
    await expect(servicesLinks(page)).toHaveText(services.map(({ name }) => name));

    await pressTab(page);
    await expect(servicesLinks(page).first()).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(servicesButton(page)).toHaveAttribute("aria-expanded", "false");
    await expect(servicesLinks(page)).toHaveCount(0);
    await expect(servicesButton(page)).toBeFocused();

    await page.keyboard.press("Space");
    await expect(servicesButton(page)).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Space");
    await expect(servicesButton(page)).toHaveAttribute("aria-expanded", "false");
  });

  test("the Services dropdown closes when focus moves past it", async ({ page }) => {
    await page.goto("/");
    await servicesButton(page).click();

    for (let i = 0; i < services.length; i++) await pressTab(page);
    await expect(servicesLinks(page).last()).toBeFocused();

    await pressTab(page);
    await expect(servicesButton(page)).toHaveAttribute("aria-expanded", "false");
    await expect(primaryNav(page).getByRole("link", { name: "Research", exact: true })).toBeFocused();
  });

  test("the Services dropdown closes when you click outside it", async ({ page }) => {
    await page.goto("/");

    await servicesButton(page).click();
    await expect(servicesLinks(page)).toHaveCount(services.length);

    await page.getByRole("main").click({ position: { x: 10, y: 10 } });
    await expect(servicesButton(page)).toHaveAttribute("aria-expanded", "false");
    await expect(servicesLinks(page)).toHaveCount(0);
  });

  test("the Services dropdown opens on hover and closes when the mouse leaves", async ({ page }) => {
    await page.goto("/");

    await servicesButton(page).hover();
    await expect(servicesButton(page)).toHaveAttribute("aria-expanded", "true");

    await servicesLinks(page).last().hover();
    await expect(servicesButton(page)).toHaveAttribute("aria-expanded", "true");

    await page.getByRole("main").hover({ position: { x: 10, y: 200 } });
    await expect(servicesButton(page)).toHaveAttribute("aria-expanded", "false");
  });

  test("clicking Services while it's open from hovering keeps it open", async ({ page }) => {
    await page.goto("/");

    await servicesButton(page).hover();
    await expect(servicesButton(page)).toHaveAttribute("aria-expanded", "true");

    await servicesButton(page).click();
    await expect(servicesButton(page)).toHaveAttribute("aria-expanded", "true");
  });

  test("the Services dropdown stays open when the mouse leaves after it was clicked open", async ({ page }) => {
    await page.goto("/");
    await servicesButton(page).focus();
    await page.keyboard.press("Enter");

    await servicesButton(page).hover();
    await page.getByRole("main").hover({ position: { x: 10, y: 200 } });
    await page.waitForTimeout(500);

    await expect(servicesButton(page)).toHaveAttribute("aria-expanded", "true");
  });

  test("a Services link opens the service page", async ({ page }) => {
    const [service] = services;
    await page.goto("/");

    await servicesButton(page).click();
    await servicesLinks(page).first().click();

    await expect(page).toHaveURL(`/${service.id}/`);
  });
});

test("the header stays at the top of the page when you scroll", async ({ page }) => {
  await page.goto("/");

  await page.evaluate(() => window.scrollTo(0, 1500));
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

  const box = await header(page).boundingBox();
  expect(box?.y).toBe(0);
});
