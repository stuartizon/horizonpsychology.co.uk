import { CONTACT_EMAIL, SITE_DESCRIPTION, SITE_TITLE } from "@/consts";
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
  expect(texts(document, "h1")).toEqual(["Beyond the horizon, there is hope"]);
  expect(text(hero.querySelector(".section-heading__subtitle"))).toBe(
    "Psychological therapy, clinical and research supervision for adults. Online, or face-to-face in Buckinghamshire. Helping you move through difficult times, one step at a time.",
  );
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
    "A safe, welcoming and non-judgemental space",
  );

  expect(text(section.querySelector(".eyebrow"))).toBe("What we offer");
  expect(texts(section, ".offer__body p")).toEqual([
    "Horizon Psychology is led by Dr Emma Izon, who offers compassionate, evidence-based psychological therapy tailored to each person’s individual needs, experiences and goals.",
    "At the heart of her approach is empathy, compassion and a genuine commitment to working collaboratively with each client to understand, process and navigate the challenges they face. Horizon Psychology aims to provide a safe, welcoming and non-judgemental space where individuals feel heard, understood and accepted, and can work towards greater self-understanding, resilience and meaningful, lasting change.",
    "Horizon Psychology is committed to providing neurodiversity-affirming care, meeting each person with warmth, curiosity and understanding. Therapy offers an opportunity to explore difficulties at a pace that feels right, develop a kinder relationship with oneself, build on existing strengths and find a way forward that feels meaningful and sustainable.",
  ]);
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
    "“You don’t have to navigate life’s challenges alone. Therapy offers a safe, supportive space to explore your experiences, find understanding and discover new perspectives, helping you move through difficult times towards meaningful change, one step at a time.”",
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

test("describes the practice and Emma for search engines, with the site's details", () => {
  const scripts = document.querySelectorAll(
    'script[type="application/ld+json"]',
  );
  expect(scripts).toHaveLength(1);
  const { "@context": context, "@graph": graph } = JSON.parse(
    scripts[0].textContent!,
  );
  const practice = graph.find(
    (node: { "@type": string }) => node["@type"] === "MedicalBusiness",
  );
  const emma = graph.find(
    (node: { "@type": string }) => node["@type"] === "Person",
  );

  expect(context).toBe("https://schema.org");
  expect(practice).toMatchObject({
    name: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://horizonpsychology.co.uk/",
    email: CONTACT_EMAIL,
    areaServed: { "@type": "AdministrativeArea", name: "Buckinghamshire" },
    founder: { "@id": emma["@id"] },
  });
  expect(emma).toMatchObject({
    name: "Emma Izon",
    honorificPrefix: "Dr",
    jobTitle: "Clinical Psychologist",
    url: "https://horizonpsychology.co.uk/about/",
    worksFor: { "@id": practice["@id"] },
  });
  expect(
    emma.hasCredential.map(
      (credential: { recognizedBy: { name: string } }) =>
        credential.recognizedBy.name,
    ),
  ).toEqual([
    "Health and Care Professions Council",
    "British Association for Behavioural and Cognitive Psychotherapies",
  ]);
});

test("gives no address or phone number for search engines, as the site shows neither", () => {
  const data = document.querySelector(
    'script[type="application/ld+json"]',
  )?.textContent;

  expect(data).toBeTruthy();
  expect(data).not.toMatch(/"(address|telephone)"/);
});
