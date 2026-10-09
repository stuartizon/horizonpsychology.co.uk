import { expect, test } from "vitest";
import { link, page, pages, texts } from "./pages";

const document = page("/404.html");

test("the 404 page has its title, heading and description", () => {
  expect(document.title).toMatch(/^Page not found \| /);
  expect(texts(document, "h1")).toEqual(["This page isn't here"]);
  expect(
    document.querySelector('meta[name="description"]')?.getAttribute("content"),
  ).toBe(
    "The page you were looking for isn't on the Horizon Psychology website.",
  );
});

test("the 404 page has its photo, sized for the screen", () => {
  const photo = document.querySelector('img[alt="An hourglass on a table"]');

  expect(photo?.getAttribute("src")).toMatch(/^\/_astro\/404\..+\.webp$/);
  expect(photo?.getAttribute("srcset")).toBeTruthy();
});

test("the 404 page links back to the home page", () => {
  expect(
    link(document.querySelector("main")!, "Return home").getAttribute("href"),
  ).toBe("/");
});

test("no page loads anything from the old /images/ folder", () => {
  const urls = pages().flatMap((path) =>
    [...page(path).querySelectorAll("[src], [href]")]
      .map(
        (element) =>
          element.getAttribute("src") ?? element.getAttribute("href"),
      )
      .filter((url) => url?.startsWith("/images/"))
      .map((url) => `${path}: ${url}`),
  );

  expect(urls).toEqual([]);
});
