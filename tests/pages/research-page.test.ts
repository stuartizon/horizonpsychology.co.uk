import { acknowledgements, publications } from "@/data/publications";
import { expect, test } from "vitest";
import { labelled, link, page, text, texts } from "./pages";

const document = page("/research/");
const main = document.querySelector("main")!;

test("the Research page has its title and heading", () => {
  expect(document.title).toMatch(/^Research \| /);
  expect(texts(document, "h1")).toEqual(["Published work"]);
});

test("the Research page introduces Emma's research", () => {
  expect(text(main.querySelector(".research__intro > p"))).toBe(
    "Emma is a highly accomplished researcher whose extensive work is widely published in leading, peer-reviewed clinical journals. Her robust academic footprint spans crucial advancements in early intervention for psychosis, family and sibling dynamics, and cutting-edge virtual reality therapies. Renowned for her rigorous approach to clinical science, she seamlessly translates this high-impact evidence directly into her clinical practice. By bridging the gap between world-class research and frontline care, she ensures her clinical interventions are consistently innovative, deeply compassionate, and grounded in the absolute latest empirical advancements.",
  );
});

test("the Research page describes Emma's research to search engines", () => {
  expect(
    document.querySelector('meta[name="description"]')?.getAttribute("content"),
  ).toBe(
    "Dr Emma Izon's peer-reviewed research focuses on early intervention for psychosis, family relationships, and siblings and relatives supporting someone at risk.",
  );
});

test("the Research page lists Emma's areas of research", () => {
  expect(text(main.querySelector(".research__note"))).toBe(
    "Areas of research: at-risk mental states and psychosis, expressed emotion, family and sibling experience, older adults' access to psychological intervention, service-user measures, and virtual reality therapies.",
  );
});

test("the Research page lists each publication, newest first, linking to it in a new tab", () => {
  const items = [
    ...main.querySelectorAll('[aria-label="Publications"] li.publication'),
  ];

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

test("each publication reads as a citation, with spaces between its parts", () => {
  expect(texts(main, '[aria-label="Publications"] li.publication')).toEqual(
    publications.map(
      ({ authors, year, title, journal }) =>
        `${authors} · ${year} ${title} (opens in a new tab) ${journal}`,
    ),
  );
});

test('the Research page lists the papers that acknowledge Dr Izon, under a heading of "Acknowledged in", after her own', () => {
  const section = labelled(main, "Acknowledged in");

  expect(texts(section, "li.publication")).toEqual(
    acknowledgements.map(
      ({ authors, year, title, journal }) =>
        `${authors} · ${year} ${title} (opens in a new tab) ${journal}`,
    ),
  );
  expect(
    [...section.querySelectorAll("li a")].map((a) => a.getAttribute("href")),
  ).toEqual(acknowledgements.map(({ href }) => href));
  expect(
    main
      .querySelector('[aria-label="Publications"]')!
      .compareDocumentPosition(section) & 4,
  ).toBeTruthy();
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
  expect(
    text(link(main, "Academia.edu (opens in a new tab)").parentElement),
  ).toBe(
    "ResearchGate (opens in a new tab) · Academia.edu (opens in a new tab)",
  );
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
