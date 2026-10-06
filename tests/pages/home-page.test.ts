import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { expect, test } from "vitest";
import { link, page, text, texts } from "./pages";

const document = page("/");

test("the home page has its title and main content", () => {
  expect(document.title).toMatch(/Horizon Psychology/i);
  expect(document.querySelector("main")).not.toBeNull();
});

test("the home page links to each service with its summary", () => {
  const cards = [...document.querySelectorAll("article")];

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

test("the home page shows each testimonial with its name", () => {
  const cards = [...document.querySelectorAll("figure")];

  expect(
    cards.map((card) => [
      text(card.querySelector("blockquote")),
      text(card.querySelector("figcaption")),
    ]),
  ).toEqual(testimonials.map(({ quote, name }) => [`“${quote}”`, name]));
});

test("the home page invites a free 15-minute call, linking to the contact page", () => {
  expect(texts(document, "h2")).toContain("Start with a free 15-minute call");
  expect(link(document, "Book a free call").getAttribute("href")).toBe(
    "/contact/",
  );
});
