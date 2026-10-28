import { render } from "@/test/render";
import { expect, test } from "vitest";
import Publication from "./Publication.astro";

const publication = {
  authors: "Izon, E., & Dow, R.",
  year: 2022,
  title: "Treating anxiety in an older adult: A case study.",
  journal: "FPOP Bulletin: Psychology of Older People",
  href: "https://doi.org/10.53841/bpsfpop.2022.1.158.22",
};

const text = (element: Element | null | undefined) =>
  element?.textContent?.replace(/\s+/g, " ").trim();

test("lists the authors and year, the title and the journal", async () => {
  const item = (await render(Publication, { publication })).querySelector("li");

  expect([...item!.children].map(text)).toEqual([
    "Izon, E., & Dow, R. · 2022",
    "Treating anxiety in an older adult: A case study. (opens in a new tab)",
    "FPOP Bulletin: Psychology of Older People",
  ]);
});

test("links the title to the paper, in a new tab", async () => {
  const link = (await render(Publication, { publication })).querySelector("a");

  expect(link?.getAttribute("href")).toBe(publication.href);
  expect(link?.getAttribute("target")).toBe("_blank");
});
