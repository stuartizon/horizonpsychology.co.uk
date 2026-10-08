import { expect, test } from "vitest";
import { page, text, texts } from "./pages";

const document = page("/confidentiality/");
const main = document.querySelector("main")!;

test("the Confidentiality page has its title, heading and description", () => {
  expect(document.title).toMatch(/^Confidentiality statement \| /);
  expect(texts(document, "h1")).toEqual(["Confidentiality statement"]);
  expect(
    document.querySelector('meta[name="description"]')?.getAttribute("content"),
  ).toMatch(/^What you share in therapy or supervision stays between us/);
});

test("the Confidentiality page is marked as a draft", () => {
  expect(text(main)).toContain("Draft — to be confirmed");
});

test("the Confidentiality page says what the limits of confidentiality are", () => {
  expect(text(main)).toContain("There are a small number of exceptions.");
});
