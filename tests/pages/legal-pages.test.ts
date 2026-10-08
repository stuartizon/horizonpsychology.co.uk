import { services } from "@/data/services";
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

describe("the Complaints page", () => {
  const document = page("/complaints/");
  const main = document.querySelector("main")!;

  test("has its title, heading and description", () => {
    expect(document.title).toMatch(/^Complaints procedure \| /);
    expect(texts(document, "h1")).toEqual(["Complaints procedure"]);
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toMatch(/^If something about your care has not been right/);
  });

  test("is marked as a draft", () => {
    expect(text(main)).toContain("Draft — to be confirmed");
  });

  test("says how long a response takes", () => {
    expect(text(main)).toContain(
      "You will receive an acknowledgement within 5 working days and a full response within 20 working days.",
    );
  });

  test("names the HCPC and BABCP in full the first time", () => {
    expect(text(main)).toContain(
      "the Health and Care Professions Council (HCPC)",
    );
    expect(text(main)).toContain(
      "the British Association for Behavioural and Cognitive Psychotherapies (BABCP)",
    );
  });
});

describe("the Fees and cancellations page", () => {
  const document = page("/terms-and-conditions/");
  const main = document.querySelector("main")!;

  test("has its title, heading and description", () => {
    expect(document.title).toMatch(/^Fees and cancellations \| /);
    expect(texts(document, "h1")).toEqual(["Fees and cancellations"]);
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toMatch(/^Session fees, payment, and the notice needed/);
  });

  test("is marked as a draft", () => {
    expect(text(main)).toContain("Draft — to be confirmed");
  });

  test("lists each service's fee", () => {
    expect(texts(main, "dd")).toEqual(
      services.map(({ price, minutes }) => `£${price} · ${minutes} minutes`),
    );
  });

  test("sets out the notice needed to cancel and what a late cancellation costs", () => {
    expect(text(main)).toContain("at least 48 hours’ notice");
    expect(text(main)).toContain(
      "Cancellations with less than 48 hours’ notice are charged at 50% of the session fee",
    );
  });
});
