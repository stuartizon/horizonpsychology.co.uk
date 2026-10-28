import { expect, test } from "vitest";
import { acknowledgements, publications } from "./publications";

test("publications and acknowledgements are listed newest first", () => {
  for (const list of [publications, acknowledgements]) {
    const years = list.map(({ year }) => year);

    expect(years).toEqual(years.toSorted((a, b) => b - a));
  }
});

test("every publication and acknowledgement links to its DOI", () => {
  for (const { title, href } of [...publications, ...acknowledgements]) {
    expect(href, title).toMatch(/^https:\/\/doi\.org\/10\.\d+\//);
  }
});

test("every publication and acknowledgement gives its volume or issue, and its pages or article number", () => {
  for (const { title, journal } of [...publications, ...acknowledgements]) {
    expect(journal, title).toMatch(
      /, (\d+(\(\d+\))?|\(\d+\)), (\d+–\d+|Article \d+|e\d+)$/,
    );
  }
});

test("hyphenated first names are abbreviated as APA writes them, such as L.-A.", () => {
  for (const { title, authors } of [...publications, ...acknowledgements]) {
    expect(authors, title).not.toMatch(/\b[A-Z]-[A-Z]\./);
  }
});
