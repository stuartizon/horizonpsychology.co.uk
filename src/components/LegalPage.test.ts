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

test("has the title as an h1 under an Information eyebrow", async () => {
  const page = await render(LegalPage, props);

  expect(textOf(page.querySelector("hgroup .eyebrow"))).toBe("Information");
  expect(textOf(page.querySelector("hgroup h1"))).toBe(
    "Confidentiality statement",
  );
});

test("starts with the lead, then the page's text", async () => {
  const page = await render(LegalPage, props, {
    default: "<p>Everything you share is treated with care.</p>",
  });

  expect(
    [...page.querySelectorAll(".legal-page__body > p")].map(textOf),
  ).toEqual([
    "What you share stays between us.",
    "Everything you share is treated with care.",
  ]);
});

test("says the wording is a draft while it is one", async () => {
  const page = await render(LegalPage, { ...props, draft: true });

  expect(page.textContent).toContain("Draft — to be confirmed");
});

test("doesn't mention a draft once the wording is final", async () => {
  const page = await render(LegalPage, props);

  expect(page.textContent).not.toContain("Draft");
});

test("lists the fees under a Session fees heading after the lead when asked", async () => {
  const page = await render(LegalPage, { ...props, fees: true });
  const list = page.querySelector(".legal-page__body > dl");
  const heading = list?.previousElementSibling;

  expect(heading?.tagName).toBe("H2");
  expect(textOf(heading)).toBe("Session fees");
  expect(textOf(heading?.previousElementSibling)).toBe(props.lead);
});

test("doesn't list the fees otherwise", async () => {
  const page = await render(LegalPage, props);

  expect(page.querySelector("dl")).toBeNull();
});
