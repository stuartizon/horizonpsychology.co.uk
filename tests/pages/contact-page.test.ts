import { expect, test } from "vitest";
import { labelled, page, spokenText, text, texts } from "./pages";

const document = page("/contact/");
const main = document.querySelector("main")!;

test("the Contact page has its title and heading", () => {
  expect(document.title).toMatch(/^Contact \| /);
  expect(texts(document, "h1")).toEqual(["Get in touch"]);
  expect(text(main.querySelector(".eyebrow"))).toBe("Contact us");
});

test("the Contact page introduction is Emma's", () => {
  expect(texts(main, ".contact__intro > p")).toEqual([
    "You don’t need to have everything figured out to take the first step. Whether you’re looking for psychological therapy, clinical or research supervision, or simply have a question, you’re very welcome to get in touch using the contact form below or by emailing hello@horizonpsychology.co.uk.",
    "A free, no-obligation 15-minute phone consultation is available for new therapy clients to discuss what’s bringing them to therapy and explore how Emma might help. For supervision enquiries, please get in touch to discuss your needs and how we might work together.",
    "Sessions are available online via secure video call or face-to-face in Buckinghamshire. Emma aims to respond to enquiries within 48 hours.",
  ]);
});

test("the Contact page introduction links to the practice's email address", () => {
  const email = main.querySelector('.contact__intro a[href^="mailto:"]');

  expect(email?.getAttribute("href")).toBe(
    "mailto:hello@horizonpsychology.co.uk",
  );
  expect(text(email)).toBe("hello@horizonpsychology.co.uk");
});

test("the Contact page says where to get urgent support", () => {
  const notice = labelled(main, "If you need urgent support");

  expect(notice.tagName).toBe("ASIDE");
  expect(texts(notice, "p")).toEqual([
    "If you need urgent support",
    "Horizon Psychology is not an emergency or crisis service. If you need urgent mental health support, please contact your local healthcare provider or crisis service. If you are in immediate danger or need urgent medical attention, contact your local emergency services or attend the nearest emergency department.",
    "If you are in the UK, you can contact your GP, call NHS 111 for urgent mental health support, or call Samaritans free on 116 123, at any time of day or night. If you are outside the UK, please contact the relevant crisis support service in your country.",
  ]);
});

test("the Contact page has the enquiry form", () => {
  expect(main.querySelectorAll("form")).toHaveLength(1);
  expect(spokenText(main.querySelector('form button[type="submit"]'))).toBe(
    "Send enquiry",
  );
});
