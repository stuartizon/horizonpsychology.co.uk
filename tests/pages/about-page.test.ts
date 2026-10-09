import { testimonials } from "@/data/testimonials";
import { expect, test } from "vitest";
import { labelled, link, page, text, texts } from "./pages";

const document = page("/about/");

test("the About page has its title and heading, with Emma's credentials", () => {
  expect(document.title).toMatch(/^About Emma \| /);
  expect(texts(document, "h1")).toEqual(["Dr Emma Izon"]);
  expect(text(document.querySelector("main"))).toContain(
    "PhD, DClinPsych, MSc, BSc (International)",
  );
});

test("the About page shows Emma's portrait, optimised by Astro", () => {
  const portrait = document.querySelector('img[alt="Dr Emma Izon"]');

  expect(portrait?.getAttribute("src")).toMatch(/^\/_astro\/about\..+\.webp$/);
  expect(portrait?.getAttribute("srcset")).toBeTruthy();
});

test("the About page links to Emma's registration and accreditation, with their logos", () => {
  const credentials = [...document.querySelectorAll(".about__intro a")].map(
    (link) => ({
      href: link.getAttribute("href"),
      name: `${link.querySelector("img")?.getAttribute("alt")} ${text(link)}`,
      logo: link.querySelector("img")?.getAttribute("src"),
    }),
  );

  expect(credentials).toEqual([
    {
      href: "https://www.hcpc-uk.org/check-the-register/professional-registration-detail/?query=PYL043541&profession=PYL",
      name: "Health and Care Professions Council (HCPC) registered (opens in a new tab)",
      logo: expect.stringMatching(/^\/_astro\/hcpc-registered\..+\.webp$/),
    },
    {
      href: "https://www.babcp.com/",
      name: "British Association for Behavioural and Cognitive Psychotherapies (BABCP) accredited (opens in a new tab)",
      logo: expect.stringMatching(/^\/_astro\/babcp-accredited\..+\.webp$/),
    },
  ]);
});

test("the About page shows each testimonial with its name", () => {
  const section = labelled(document, "What people have said");
  const cards = [...section.querySelectorAll("figure")];

  expect(
    cards.map((card) => [
      text(card.querySelector("blockquote")),
      text(card.querySelector("figcaption")),
    ]),
  ).toEqual(testimonials.map(({ quote, name }) => [`“${quote}”`, name]));
});

test("the About page describes how Emma works", () => {
  const section = labelled(document, "How Emma works");

  expect(text(section)).toContain("Cognitive Behavioural Therapy (CBT)");
});

test("the About page links to the contact page and Emma's publications", () => {
  expect(link(document, "Get in touch").getAttribute("href")).toBe("/contact/");
  expect(link(document, "See publications").getAttribute("href")).toBe(
    "/research/",
  );
});
