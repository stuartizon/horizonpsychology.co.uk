import { faqGroups, faqs } from "@/data/faqs";
import { expect, test } from "vitest";
import { labelled, link, page, text, texts } from "./pages";

const document = page("/faqs/");

test("the FAQs page has its title and heading", () => {
  expect(document.title).toMatch(/^FAQs \| /);
  expect(texts(document, "h1")).toEqual(["Frequently asked questions"]);
});

test("the FAQs page introduces its questions, linking to the Contact page", () => {
  const intro = document.querySelector(".faqs-page__intro > p");

  expect(text(intro)).toBe(
    "Answers to common questions about our services, what to expect, and how to get started. If you can’t find what you’re looking for, please get in touch with us directly.",
  );
  expect(
    link(intro!, "get in touch with us directly").getAttribute("href"),
  ).toBe("/contact/");
});

test("the FAQs page's sections are named in order", () => {
  expect(texts(document, "main h2")).toEqual([
    "Before you begin therapy",
    "How therapy works",
    "Clinical supervision",
    "Research supervision",
    "Fees and confidentiality",
  ]);
});

for (const group of faqGroups) {
  test(`the ${group.title} group is a section of its questions, in order`, () => {
    const section = labelled(document, group.title);

    expect(section.tagName).toBe("SECTION");
    expect(texts(section, "h2")).toEqual([group.title]);
    expect(section.querySelector(".eyebrow")).toBeNull();
    expect(texts(section, "h3 > button")).toEqual(
      group.faqs.map((id) => faqs[id].question),
    );
  });
}

function answer(question: string) {
  const button = [...document.querySelectorAll("h3 > button")].find(
    (button) => text(button) === question,
  );
  return document.getElementById(button!.getAttribute("aria-controls")!)!;
}

test.each([
  [
    "What are your fees and cancellation policy?",
    [["our policy", "/fees-and-cancellations/"]],
  ],
  ["Will my GP be informed?", [["our policy", "/confidentiality/"]]],
  [
    "How does confidentiality work with two people?",
    [
      ["Confidentiality", "/confidentiality/"],
      ["Privacy Policy", "/privacy-policy/"],
    ],
  ],
  [
    "Is therapy confidential?",
    [
      ["Confidentiality", "/confidentiality/"],
      ["Privacy Policy", "/privacy-policy/"],
    ],
  ],
])("the answer to %s links to the policy pages", (question, links) => {
  expect(
    [...answer(question).querySelectorAll("a")].map((a) => [
      text(a),
      a.getAttribute("href"),
    ]),
  ).toEqual(links);
});
