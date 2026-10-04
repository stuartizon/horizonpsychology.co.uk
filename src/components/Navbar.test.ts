import { services } from "@/data/services";
import { render } from "@/test/render";
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
  const nav = (await renderHeader()).querySelector('nav[aria-label="Primary"]')!;

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
  const menu = header.querySelector(`#${toggle.getAttribute("aria-controls")}`)!;

  expect(toggle.getAttribute("aria-expanded")).toBe("false");
  const links = [...menu.querySelectorAll("a")].map((link) => [
    link.textContent?.trim(),
    link.getAttribute("href"),
  ]);
  expect(links).toEqual(services.map((service) => [service.name, `/${service.id}/`]));
});

test("Contact Us links to the contact page", async () => {
  const header = await renderHeader();

  const contact = [...header.querySelectorAll("a")].find((link) => link.textContent?.trim() === "Contact Us");
  expect(contact?.getAttribute("href")).toBe("/contact/");
});

test("no header link goes to the missing schedule page", async () => {
  const header = await renderHeader();

  const hrefs = [...header.querySelectorAll("a")].map((link) => link.getAttribute("href"));
  expect(hrefs).not.toContain("/schedule/");
});
