import { expect, test } from "vitest";
import { labelled, page, text, texts } from "./pages";

const document = page("/contact/");
const main = document.querySelector("main")!;

test("the Contact page has its title and heading", () => {
  expect(document.title).toMatch(/^Contact \| /);
  expect(texts(document, "h1")).toEqual(["Get in touch"]);
  expect(text(main.querySelector(".eyebrow"))).toBe("Contact us");
});

test("the Contact page gives the practice's email address", () => {
  const email = main.querySelector('a[href^="mailto:"]');

  expect(email?.getAttribute("href")).toBe(
    "mailto:hello@horizonpsychology.co.uk",
  );
  expect(text(email)).toBe("hello@horizonpsychology.co.uk");
});

test("the Contact page says sessions are online or face-to-face", () => {
  expect(text(main)).toContain(
    "Sessions are available online, delivered securely by video call, or face-to-face in Buckinghamshire.",
  );
});

test("the Contact page says where to get help now", () => {
  const notice = labelled(main, "If you need help now");

  expect(notice.tagName).toBe("ASIDE");
  expect(text(notice)).toContain(
    "Therapy is not an emergency service. If you need support today, contact your GP, call NHS 111, or call the Samaritans free on 116 123.",
  );
});

test("the Contact page has the enquiry form", () => {
  expect(main.querySelectorAll("form")).toHaveLength(1);
  expect(text(main.querySelector('form button[type="submit"]'))).toBe(
    "Send enquiry",
  );
});
