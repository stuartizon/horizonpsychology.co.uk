import { services } from "@/data/services";
import { describe, expect, test } from "vitest";
import { page, text, texts } from "./pages";

describe("the Confidentiality page", () => {
  const document = page("/confidentiality/");
  const main = document.querySelector("main")!;

  test("has its title, heading and description", () => {
    expect(document.title).toMatch(/^Confidentiality \| /);
    expect(texts(document, "h1")).toEqual(["Confidentiality"]);
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toBe(
      "At Horizon Psychology, confidentiality is central to creating a safe, trusting and collaborative therapeutic relationship.",
    );
  });

  test("is not marked as a draft", () => {
    expect(text(main)).not.toContain("Draft — to be confirmed");
  });

  test("has a heading for each part", () => {
    expect(texts(main, "h2")).toEqual([
      "When might confidentiality be limited?",
      "Clinical supervision",
      "Confidentiality in supervision",
      "Confidentiality and your records",
      "Questions",
    ]);
  });

  test("says what the limits of confidentiality are", () => {
    expect(texts(main, "li")).toEqual([
      "There is a serious concern about your safety or wellbeing, or the safety of another person.",
      "There are safeguarding concerns involving a child or an adult at risk of abuse or neglect.",
      "Information must be disclosed to meet a legal obligation, such as a court order, or where disclosure is otherwise justified by law or a relevant public interest.",
    ]);
  });

  test("links to the privacy policy", () => {
    expect(main.querySelector('a[href="/privacy-policy/"]')).not.toBeNull();
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
  const document = page("/fees-and-cancellations/");
  const main = document.querySelector("main")!;

  test("has its title, heading and description", () => {
    expect(document.title).toMatch(/^Fees and cancellations \| /);
    expect(texts(document, "h1")).toEqual(["Fees and cancellations"]);
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content"),
    ).toMatch(
      /^At Horizon Psychology, fees and cancellation arrangements are outlined clearly from the outset/,
    );
  });

  test("is not marked as a draft", () => {
    expect(text(main)).not.toContain("Draft — to be confirmed");
  });

  test("has a heading for each part, in sentence case", () => {
    expect(texts(main, "h2")).toEqual([
      "Session fees",
      "Payment",
      "Cancellation and rescheduling policy",
      "Questions about fees",
    ]);
  });

  test("lists each service's fee under Session fees", () => {
    expect(texts(main, "dd")).toEqual(
      services.map(({ price, minutes }) => `£${price} · ${minutes} minutes`),
    );
    expect(text(main.querySelector("dl")?.previousElementSibling)).toBe(
      "Session fees",
    );
  });

  test("offers new therapy clients a free introductory call", () => {
    expect(text(main)).toContain(
      "A free, no-obligation 15-minute introductory phone consultation is available for new therapy clients.",
    );
  });

  test("sets out what each late cancellation costs", () => {
    expect(texts(main, "li")).toEqual([
      "48 hours or more: No cancellation fee.",
      "Less than 48 hours’ notice: 50% of the session fee.",
      "Less than 24 hours’ notice: The full session fee.",
      "Missed appointments without notice: The full session fee.",
    ]);
  });

  test("ends with the email address for questions about fees", () => {
    expect(
      main.querySelector('a[href="mailto:hello@horizonpsychology.co.uk"]'),
    ).toHaveProperty("textContent", "hello@horizonpsychology.co.uk");
  });
});

for (const path of ["/confidentiality/", "/complaints/", "/privacy-policy/"]) {
  test(`${path} gives the email address for questions`, () => {
    expect(
      page(path).querySelector(
        'main a[href="mailto:hello@horizonpsychology.co.uk"]',
      ),
    ).not.toBeNull();
  });
}

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

  test("names the services that handle an enquiry, and says the website keeps none", () => {
    expect(text(main)).toContain(
      "Enquiries from the contact form are delivered by Cloudflare, which also hosts this website.",
    );
    expect(text(main)).toContain(
      "The website itself does not store or log what you send.",
    );
    expect(text(main)).toContain("provided by Google");
  });
});
