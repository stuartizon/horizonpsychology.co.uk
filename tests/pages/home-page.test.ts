import { services } from "@/data/services";
import { expect, test } from "vitest";
import { labelled, link, page, text, texts } from "./pages";

const document = page("/");

test("the home page has its title and main content", () => {
  expect(document.title).toMatch(/Horizon Psychology/i);
  expect(document.querySelector("main")).not.toBeNull();
});

test("the hero introduces Emma and the practice, and invites you to get in touch", () => {
  const hero = document.querySelector("main hgroup")!;

  expect(text(hero.querySelector(".eyebrow"))).toBe(
    "Dr Emma Izon · Clinical Psychologist",
  );
  expect(texts(document, "h1")).toEqual([
    "A space for support, understanding, and change",
  ]);
  expect(link(document, "Get in touch").getAttribute("href")).toBe("/contact/");
});

test("the hero photo is Emma's portrait, served from the optimised images", () => {
  const photo = document.querySelector("main img")!;

  expect(photo.getAttribute("alt")).toBe("Dr Emma Izon");
  expect(photo.getAttribute("src")).toMatch(/^\/_astro\//);
});

test("What we offer describes the practice and links to more about Emma", () => {
  const section = labelled(
    document,
    "Evidence-based therapy, delivered with warmth",
  );

  expect(text(section)).toContain(
    "National Institute for Health and Care Excellence (NICE) guidelines",
  );
  expect(link(section, "More about Emma").getAttribute("href")).toBe("/about/");
});

test("Four ways of working together links to each service with its summary", () => {
  const section = labelled(document, "Four ways of working together");
  const cards = [...section.querySelectorAll("article")];

  expect(
    cards.map((card) => [
      text(card.querySelector("h3")),
      text(card.querySelector("p")),
      card.querySelector("a")?.getAttribute("href"),
    ]),
  ).toEqual(
    services.map((service) => [
      service.name,
      service.summary,
      `/${service.id}/`,
    ]),
  );
});

test("the home page has the quote band", () => {
  expect(texts(document, "blockquote")).toEqual([
    "“A space for support, understanding, and change. Helping you move through difficult times, one step at a time.”",
  ]);
});

test("the home page invites a free 15-minute call, linking to the contact page", () => {
  expect(texts(document, "h2")).toContain("Start with a free 15-minute call");
  expect(link(document, "Book a free call").getAttribute("href")).toBe(
    "/contact/",
  );
});

test("the testimonials and credential badges are no longer on the home page", () => {
  expect(document.querySelector("[data-testimonial-carousel]")).toBeNull();
  expect(texts(document, "h2")).not.toContain("Testimonials");
  expect(text(document.querySelector("main"))).not.toContain("HCPC registered");
});
