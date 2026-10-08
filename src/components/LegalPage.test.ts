import { CONTACT_EMAIL } from "@/consts";
import { render } from "@/test/render";
import { expect, test } from "vitest";
import LegalPage from "./LegalPage.astro";

const props = {
  title: "Confidentiality statement",
  lead: "What you share stays between us.",
  draft: false,
};

const textOf = (element: Element | null | undefined) =>
  element?.textContent?.replace(/\s+/g, " ").trim();

test("has the title as an h1 under a Practical eyebrow", async () => {
  const page = await render(LegalPage, props);

  expect(textOf(page.querySelector("hgroup .eyebrow"))).toBe("Practical");
  expect(textOf(page.querySelector("hgroup h1"))).toBe(
    "Confidentiality statement",
  );
});

test("starts with the lead, then the page's text, then the note about questions", async () => {
  const page = await render(LegalPage, props, {
    default: "<p>Everything you share is treated with care.</p>",
  });

  expect(
    [...page.querySelectorAll(".legal-page__body > p")].map(textOf),
  ).toEqual([
    "What you share stays between us.",
    "Everything you share is treated with care.",
    `Questions about this page can go to ${CONTACT_EMAIL}.`,
  ]);
});

test("ends by saying where to send questions about the page", async () => {
  const page = await render(LegalPage, props);
  const link = page.querySelector(`a[href="mailto:${CONTACT_EMAIL}"]`);

  expect(textOf(link)).toBe(CONTACT_EMAIL);
  expect(textOf(link?.parentElement)).toBe(
    `Questions about this page can go to ${CONTACT_EMAIL}.`,
  );
});

test("says the wording is a draft while it is one", async () => {
  const page = await render(LegalPage, { ...props, draft: true });

  expect(page.textContent).toContain("Draft — to be confirmed");
});

test("doesn't mention a draft once the wording is final", async () => {
  const page = await render(LegalPage, props);

  expect(page.textContent).not.toContain("Draft");
});
