import ExternalLink from "@/components/ExternalLink.astro";
import { render } from "@/test/render";
import { parseHTML } from "linkedom";
import { markdownToHtml } from "satteri";
import { expect, test } from "vitest";
import externalLinks from "./externalLinks";

/** The first link in `markdown`, rendered with the plugin. */
function markdownLink(markdown: string) {
  const { html } = markdownToHtml(markdown, { hastPlugins: [externalLinks] });
  return parseHTML(
    `<!doctype html><html><body>${html}</body></html>`,
  ).document.body.querySelector("a")!;
}

/** An element's HTML, ignoring whitespace either side of its tags. */
const markup = (element: Element) =>
  element.outerHTML.replace(/\s*(<[^>]+>)\s*/g, "$1");

const text = (element: Element | null | undefined) =>
  element?.textContent?.replace(/\s+/g, " ").trim();

test("marks up a link to another site the same way as ExternalLink", async () => {
  const href = "https://ico.org.uk/make-a-complaint/";
  const label = "Information Commissioner’s Office (ICO)";
  const component = (await render(ExternalLink, { href, label })).querySelector(
    "a",
  )!;
  const link = markdownLink(`[${label}](${href})`);

  expect(markup(link)).toBe(markup(component));
  expect(text(link)).toBe(text(component));
});

test("keeps the formatting of a link's text, with the arrow after its last part", () => {
  const link = markdownLink("[the **BABCP**](https://babcp.com/)");

  expect(text(link)).toBe("the BABCP (opens in a new tab)");
  expect(text(link.querySelector(".external-link__end strong"))).toBe("BABCP");
});

for (const href of [
  "/privacy-policy/",
  "https://horizonpsychology.co.uk/about/",
  "mailto:hello@horizonpsychology.co.uk",
  "tel:+443031231113",
]) {
  test(`leaves a link to ${href} as it is`, () => {
    expect(markdownLink(`[a link](${href})`).outerHTML).toBe(
      `<a href="${href}">a link</a>`,
    );
  });
}
