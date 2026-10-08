import { describe, expect, test } from "vitest";
import { page, text, texts } from "./pages";

describe("the Confidentiality page", () => {
  const document = page("/confidentiality/");
  const main = document.querySelector("main")!;

  test("has its title, heading and description", () => {
    expect(document.title).toMatch(/^Confidentiality statement \| /);
    expect(texts(document, "h1")).toEqual(["Confidentiality statement"]);
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toMatch(/^What you share in therapy or supervision stays between us/);
  });

  test("is marked as a draft", () => {
    expect(text(main)).toContain("Draft — to be confirmed");
  });

  test("says what the limits of confidentiality are", () => {
    expect(text(main)).toContain("There are a small number of exceptions.");
  });
});

describe("the Privacy policy page", () => {
  const document = page("/privacy-policy/");
  const main = document.querySelector("main")!;

  test("has its title, heading and description", () => {
    expect(document.title).toMatch(/^Privacy policy \| /);
    expect(texts(document, "h1")).toEqual(["Privacy policy"]);
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toMatch(/^How enquiry and client information is collected/);
  });

  test("is marked as a draft", () => {
    expect(text(main)).toContain("Draft — to be confirmed");
  });

  test("says what happens to an enquiry", () => {
    expect(text(main)).toContain(
      "Enquiries that do not lead to work together are deleted.",
    );
  });
});
