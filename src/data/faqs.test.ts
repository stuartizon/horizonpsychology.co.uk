import { expect, test } from "vitest";
import { faqGroups, faqs } from "./faqs";

test("every FAQ is in exactly one group on the FAQs page", () => {
  const grouped = faqGroups.flatMap((group) => group.faqs);

  expect(grouped.toSorted()).toEqual(Object.keys(faqs).toSorted());
});
