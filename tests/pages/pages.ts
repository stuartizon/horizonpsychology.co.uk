import { readFileSync, readdirSync } from "node:fs";
import { parseHTML } from "linkedom";

/** The built file at the site path `path`: `/about/` reads `dist/about/index.html`. */
export function file(path: string) {
  return readFileSync(
    `dist${path.endsWith("/") ? `${path}index.html` : path}`,
    "utf8",
  );
}

/** The built page at `path`, as a queryable DOM. */
export function page(path: string) {
  return parseHTML(file(path)).document;
}

/** The site path of every built page, such as `/` and `/about/`. */
export function pages() {
  return readdirSync("dist", { recursive: true, encoding: "utf8" })
    .filter((path) => path.endsWith(".html"))
    .map((path) => `/${path}`.replace(/index\.html$/, ""))
    .sort();
}

/** The element labelled by a heading with the text `name`, such as a section or aside. */
export function labelled(root: ParentNode, name: string) {
  const element = [...root.querySelectorAll("[aria-labelledby]")].find(
    (element) =>
      root
        .querySelector(`#${element.getAttribute("aria-labelledby")}`)
        ?.textContent?.trim() === name,
  );
  if (!element) throw new Error(`Nothing labelled "${name}"`);
  return element;
}

/** An element's text, with runs of whitespace collapsed as a browser shows them. */
export function text(element: Element | null | undefined) {
  return element?.textContent?.replace(/\s+/g, " ").trim();
}

/** An element's text without what's hidden from screen readers, as they read it. */
export function spokenText(element: Element | null | undefined) {
  const copy = element?.cloneNode(true) as Element | undefined;
  for (const hidden of copy?.querySelectorAll('[aria-hidden="true"]') ?? []) {
    hidden.remove();
  }
  return text(copy);
}

/** The text of each element matching `selector` in `root`. */
export function texts(root: ParentNode, selector: string) {
  return [...root.querySelectorAll(selector)].map(text);
}

/** The link in `root` whose text is `name`. */
export function link(root: ParentNode, name: string) {
  const element = [...root.querySelectorAll("a")].find(
    (link) => text(link) === name,
  );
  if (!element) throw new Error(`No link "${name}"`);
  return element;
}
