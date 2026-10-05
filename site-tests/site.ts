import { readFileSync, readdirSync } from "node:fs";
import { parseHTML } from "linkedom";

/** The built file at the site path `path`: `/about/` reads `dist/about/index.html`. */
export function file(path: string) {
  return readFileSync(`dist${path.endsWith("/") ? `${path}index.html` : path}`, "utf8");
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
    (element) => root.querySelector(`#${element.getAttribute("aria-labelledby")}`)?.textContent?.trim() === name,
  );
  if (!element) throw new Error(`Nothing labelled "${name}"`);
  return element;
}

/** The trimmed text of each element matching `selector` in `root`. */
export function texts(root: ParentNode, selector: string) {
  return [...root.querySelectorAll(selector)].map((element) => element.textContent?.trim());
}
