import { services } from "@/data/services";
import { iconPath } from "@/test/icon";
import { render } from "@/test/render";
import caretDownIcon from "@phosphor-icons/core/regular/caret-down.svg?raw";
import listIcon from "@phosphor-icons/core/regular/list.svg?raw";
import xIcon from "@phosphor-icons/core/regular/x.svg?raw";
import { expect, test } from "vitest";
import Navbar from "./Navbar.astro";

async function renderHeader() {
  const body = await render(Navbar);
  return body.querySelector("header")!;
}

test("links the brand to the home page", async () => {
  const header = await renderHeader();

  expect(header.querySelector("a")?.getAttribute("href")).toBe("/");
});

test("the primary navigation has About Emma, Services and Research", async () => {
  const nav = (await renderHeader()).querySelector(
    'nav[aria-label="Primary"]',
  )!;

  const links = [...nav.querySelectorAll(":scope > a")].map((link) => [
    link.textContent?.trim(),
    link.getAttribute("href"),
  ]);
  expect(links).toEqual([
    ["About Emma", "/about/"],
    ["Research", "/projects/"],
  ]);
  expect(nav.querySelector("button")?.textContent?.trim()).toBe("Services");
});

test("the Services dropdown links to each service", async () => {
  const header = await renderHeader();
  const toggle = header.querySelector("button[aria-controls]")!;
  const menu = header.querySelector(
    `#${toggle.getAttribute("aria-controls")}`,
  )!;

  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  const links = [...menu.querySelectorAll("a")].map((link) => [
    link.textContent?.trim(),
    link.getAttribute("href"),
  ]);
  expect(links).toEqual(
    services.map((service) => [service.name, `/${service.id}/`]),
  );
});

test("the Services toggle shows a Phosphor caret", async () => {
  const toggle = (await renderHeader()).querySelector("button[aria-controls]")!;

  expect(iconPath(toggle)).toBe(iconPath(caretDownIcon));
});

test("Contact Us links to the contact page", async () => {
  const header = await renderHeader();

  const contact = [...header.querySelectorAll("a")].find(
    (link) => link.textContent?.trim() === "Contact Us",
  );
  expect(contact?.getAttribute("href")).toBe("/contact/");
});

test("no header or menu link goes to the missing schedule page", async () => {
  const body = await render(Navbar);

  const hrefs = [...body.querySelectorAll("a")].map((link) =>
    link.getAttribute("href"),
  );
  expect(hrefs).not.toContain("/schedule/");
});

async function renderMenu() {
  const body = await render(Navbar);
  const burger = body.querySelector('header button[aria-label="Open menu"]')!;
  return body.querySelector(`#${burger.getAttribute("aria-controls")}`)!;
}

test("the menu button opens the menu dialog", async () => {
  const menu = await renderMenu();

  expect(menu.tagName).toBe("DIALOG");
  expect(menu.getAttribute("aria-label")).toBe("Menu");
  expect(menu.querySelector('button[aria-label="Close menu"]')).not.toBeNull();
});

test("the menu links to the home page, About Emma, each service, Research and Contact Us", async () => {
  const menu = await renderMenu();

  const links = [...menu.querySelectorAll("a")].map((link) =>
    link.getAttribute("href"),
  );
  expect(links).toEqual([
    "/",
    "/about/",
    ...services.map((service) => `/${service.id}/`),
    "/projects/",
    "/contact/",
  ]);
  const navLinks = [...menu.querySelectorAll("nav a")].map((link) =>
    link.textContent?.trim(),
  );
  expect(navLinks).toEqual([
    "About Emma",
    ...services.map((service) => service.name),
    "Research",
    "Contact Us",
  ]);
});

test("the menu button shows the Phosphor list icon", async () => {
  const body = await render(Navbar);
  const burger = body.querySelector('header button[aria-label="Open menu"]')!;

  expect(iconPath(burger)).toBe(iconPath(listIcon));
});

test("the close button shows the Phosphor x icon", async () => {
  const menu = await renderMenu();

  expect(iconPath(menu.querySelector('button[aria-label="Close menu"]'))).toBe(
    iconPath(xIcon),
  );
});
