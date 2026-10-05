import { faqGroups, faqs } from "@/data/faqs";
import { expect, test } from "vitest";
import { labelled, page, texts } from "./site";

const document = page("/faqs/");

test("the FAQs page has its title and heading", () => {
  expect(document.title).toMatch(/^FAQs \| /);
  expect(texts(document, "h1")).toEqual(["Frequently asked questions"]);
});

for (const group of faqGroups) {
  test(`the ${group.title} group is a section of its questions, in order`, () => {
    const section = labelled(document, group.title);

    expect(section.tagName).toBe("SECTION");
    expect(texts(section, "h2")).toEqual([group.title]);
    expect(section.querySelector(".eyebrow")).toBeNull();
    expect(texts(section, "h3 > button")).toEqual(group.faqs.map((id) => faqs[id].question));
  });
}
