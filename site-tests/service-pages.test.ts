import { faqs } from "@/data/faqs";
import { services } from "@/data/services";
import { describe, expect, test } from "vitest";
import { labelled, link, page, text, texts } from "./site";

describe.each(services)("the $name page", (service) => {
  const document = page(`/${service.id}/`);
  const main = document.querySelector("main")!;

  test("shows the service's details", () => {
    expect(document.title).toMatch(new RegExp(`^${service.name} \\|`));
    expect(texts(main, "h1")).toEqual([service.name]);
    expect(texts(main, "p")).toEqual(expect.arrayContaining([service.summary, ...service.description]));
  });

  test("shows its fees and links to the contact form", () => {
    const fees = labelled(document, "Fees and practicalities");

    expect(texts(fees, "*")).toEqual(
      expect.arrayContaining([`£${service.price}`, `${service.minutes}-minute session`, ...service.practical]),
    );
    expect(link(fees, "Schedule").getAttribute("href")).toBe(`/contact/?topic=${service.id}`);
  });

  test("shows its own questions", () => {
    const section = labelled(document, "Before you get in touch");

    expect(texts(section, "button")).toEqual(service.faqs.map((id) => faqs[id].question));
    expect(link(section, "All frequently asked questions").getAttribute("href")).toBe("/faqs/");
  });

  test("links to the other three services", () => {
    const others = services.filter((other) => other.id !== service.id);
    const cards = [...labelled(document, "Also available").querySelectorAll("article")];

    expect(cards.map((card) => [text(card.querySelector("h3")), card.querySelector("a")?.getAttribute("href")])).toEqual(
      others.map((other) => [other.name, `/${other.id}/`]),
    );
  });

  test("shows its own photo, resized, with alt text", () => {
    const photo = document.querySelector(".service__image")!;

    expect(photo.getAttribute("src")).toMatch(new RegExp(`^/_astro/${service.id}\\.`));
    expect(photo.getAttribute("srcset")).toMatch(/\d+w/);
    expect(photo.getAttribute("alt")).toMatch(/\S/);
  });
});
