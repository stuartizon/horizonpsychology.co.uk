import { render } from "@/test/render";
import { expect, test } from "vitest";
import Faqs from "./Faqs.astro";

const faqs = [
  { question: "Do I need a referral?", answer: ["No.", "Get in touch directly."] },
  { question: "Do you offer online sessions?", answer: ["Yes."] },
];

test("shows each question with its answer paragraphs", async () => {
  const list = await render(Faqs, { faqs });

  const questions = [...list.querySelectorAll("button")].map((button) => button.textContent?.trim());
  expect(questions).toEqual(["Do I need a referral?", "Do you offer online sessions?"]);

  const firstAnswer = list.querySelector(`#${list.querySelector("button")?.getAttribute("aria-controls")}`);
  expect([...firstAnswer!.querySelectorAll("p")].map((p) => p.textContent)).toEqual([
    "No.",
    "Get in touch directly.",
  ]);
});

test("each question is a collapsed button in a heading, named by the question", async () => {
  const list = await render(Faqs, { faqs });

  for (const button of list.querySelectorAll("button")) {
    expect(button.parentElement?.tagName).toBe("H3");
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(button.hasAttribute("aria-label")).toBe(false);
  }
});

test("the open and closed toggle is hidden from screen readers", async () => {
  const list = await render(Faqs, { faqs });

  for (const button of list.querySelectorAll("button")) {
    const toggle = button.querySelector(".faq__toggle-line");
    expect(toggle?.getAttribute("aria-hidden")).toBe("true");
    expect(toggle?.textContent?.trim()).toBe("");
  }
});

test("two lists on one page don't share answer ids", async () => {
  const first = await render(Faqs, { faqs: [faqs[0]] });
  const second = await render(Faqs, { faqs: [faqs[1]] });

  const ids = [first, second].map((list) => list.querySelector("button")?.getAttribute("aria-controls"));
  expect(ids[0]).not.toBe(ids[1]);
});
