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
