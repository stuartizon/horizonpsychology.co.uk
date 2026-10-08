import { describe, expect, it } from "vitest";
import { parseEmail } from "@/test/email";
import { enquiryEmail, type Enquiry } from "./message";

const enquiry: Enquiry = {
  name: "Jane Doe",
  email: "jane@example.com",
  topic: "Couples therapy",
  format: "Online",
  message: "I'd like to ask about sessions.",
};

const email = (overrides: Partial<Enquiry> = {}) =>
  parseEmail(
    enquiryEmail({ ...enquiry, ...overrides }, "emma@horizonpsychology.co.uk"),
  );

describe("enquiryEmail", () => {
  it("is from the website's no-reply address", () => {
    expect(email().headers.get("from")).toMatch(
      /<noreply@horizonpsychology\.co\.uk>$/,
    );
  });

  it("is addressed to the given address", () => {
    expect(email().headers.get("to")).toBe("emma@horizonpsychology.co.uk");
  });

  it("is replied to at the visitor's name and email address", () => {
    expect(email().headers.get("reply-to")).toBe("Jane Doe <jane@example.com>");
  });

  it("names the visitor in the subject", () => {
    expect(email().headers.get("subject")).toBe(
      "Website enquiry from Jane Doe",
    );
  });

  it("has a date and a message ID on the website's domain", () => {
    const { headers } = email();
    expect(Date.parse(headers.get("date")!)).not.toBeNaN();
    expect(headers.get("message-id")).toMatch(
      /^<.+@horizonpsychology\.co\.uk>$/,
    );
  });

  it("lists the enquiry's fields in the body", () => {
    expect(email().body).toBe(
      [
        "Name: Jane Doe",
        "Email: jane@example.com",
        "Enquiring about: Couples therapy",
        "Online or face-to-face: Online",
        "",
        "I'd like to ask about sessions.",
      ].join("\r\n"),
    );
  });

  it("leaves out the fields the visitor didn't fill in", () => {
    expect(email({ topic: "", format: "", message: "" }).body).toBe(
      ["Name: Jane Doe", "Email: jane@example.com"].join("\r\n"),
    );
  });

  it("keeps non-ASCII text intact", () => {
    const { headers, body } = email({
      name: "Zoë Ångström",
      message: "Café — ✓ 日本語",
    });
    expect(headers.get("subject")).toBe("Website enquiry from Zoë Ångström");
    expect(headers.get("reply-to")).toBe("Zoë Ångström <jane@example.com>");
    expect(body).toContain("Café — ✓ 日本語");
  });

  it("can't be given extra headers through the visitor's name", () => {
    const raw = enquiryEmail(
      { ...enquiry, name: "Jane\r\nBcc: someone@example.com" },
      "emma@horizonpsychology.co.uk",
    );
    const head = raw.split("\r\n\r\n")[0];
    expect(head).not.toMatch(/^Bcc:/im);
  });

  it("keeps every line short enough for mail servers", () => {
    const raw = enquiryEmail(
      { ...enquiry, name: "Ä".repeat(200), message: "word ".repeat(2000) },
      "emma@horizonpsychology.co.uk",
    );
    for (const line of raw.split("\r\n")) {
      expect(line.length).toBeLessThanOrEqual(78);
    }
  });
});
