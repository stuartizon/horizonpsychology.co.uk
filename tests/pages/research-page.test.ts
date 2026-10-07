import { publications } from "@/data/publications";
import { expect, test } from "vitest";
import { link, page, text, texts } from "./pages";

const document = page("/research/");
const main = document.querySelector("main")!;

test("the Research page has its title and heading", () => {
  expect(document.title).toMatch(/^Research \| /);
  expect(texts(document, "h1")).toEqual(["Published work"]);
});

test("the Research page lists each publication, newest first, linking to it in a new tab", () => {
  const items = [...main.querySelectorAll("li.publication")];

  expect(items.map((item) => text(item.querySelector("a")))).toEqual(
    publications.map(({ title }) => `${title} (opens in a new tab)`),
  );
  expect(
    items.map((item) => item.querySelector("a")?.getAttribute("href")),
  ).toEqual(publications.map(({ href }) => href));
  for (const item of items) {
    expect(item.querySelector("a")?.getAttribute("target")).toBe("_blank");
  }
});

test("the Research page links to Emma's ResearchGate and Academia.edu profiles in new tabs", () => {
  for (const [name, href] of [
    ["ResearchGate", "https://www.researchgate.net/profile/Emma-Izon"],
    ["Academia.edu", "https://manchester.academia.edu/EmmaIzon"],
  ]) {
    const profile = link(main, `${name} (opens in a new tab)`);

    expect(profile.getAttribute("href")).toBe(href);
    expect(profile.getAttribute("target")).toBe("_blank");
  }
});

test("the Research page links to an enquiry about research supervision", () => {
  expect(
    link(main, "Enquire about research supervision").getAttribute("href"),
  ).toBe("/contact/?topic=research-supervision");
});

test("the Research page shows Emma's thesis, optimised by Astro", () => {
  const photo = main.querySelector("img");

  expect(photo?.getAttribute("alt")).toMatch(/thesis/);
  expect(photo?.getAttribute("src")).toMatch(/^\/_astro\/research\..+\.webp$/);
  expect(photo?.getAttribute("srcset")).toBeTruthy();
});
