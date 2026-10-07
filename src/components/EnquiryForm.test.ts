import { services } from "@/data/services";
import { render } from "@/test/render";
import { expect, test } from "vitest";
import EnquiryForm from "./EnquiryForm.astro";

const form = (await render(EnquiryForm)).querySelector("form")!;

/** The text of an element, with whitespace collapsed. */
const text = (element: Element | null | undefined) =>
  element?.textContent?.replace(/\s+/g, " ").trim();

/** The form control labelled `name`. */
function field(name: string) {
  const label = [...form.querySelectorAll("label")].find((label) =>
    text(label)?.startsWith(name),
  );
  const control = label && form.querySelector(`#${label.getAttribute("for")}`);
  if (!control) throw new Error(`No field labelled "${name}"`);
  return control;
}

test("asks for a name and an email address, both required", () => {
  expect(field("Your name").getAttribute("name")).toBe("name");
  expect(field("Your name").getAttribute("autocomplete")).toBe("name");
  expect(field("Email").getAttribute("name")).toBe("email");
  expect(field("Email").getAttribute("type")).toBe("email");
  expect(field("Email").getAttribute("autocomplete")).toBe("email");
  for (const name of ["Your name", "Email"]) {
    expect(field(name).hasAttribute("required")).toBe(true);
  }
});

test("asks what the enquiry is about, from the services or other", () => {
  const topic = field("What are you enquiring about?");

  expect(topic.tagName).toBe("SELECT");
  expect(topic.getAttribute("name")).toBe("topic");
  expect(
    [...topic.querySelectorAll("option")].map((option) => [
      option.getAttribute("value"),
      text(option),
    ]),
  ).toEqual([
    ...services.map(({ id, name }) => [id, name]),
    ["other", "Other"],
  ]);
});

test("asks whether sessions would be online or face-to-face", () => {
  const format = field("Online or face-to-face?");

  expect(format.tagName).toBe("SELECT");
  expect(format.getAttribute("name")).toBe("format");
  expect([...format.querySelectorAll("option")].map(text)).toEqual([
    "Online",
    "Face-to-face in Buckinghamshire",
    "Not sure yet",
  ]);
});

test("the message is optional, and its hint describes it", () => {
  const message = field("Write a message");

  expect(message.tagName).toBe("TEXTAREA");
  expect(message.getAttribute("name")).toBe("message");
  expect(message.hasAttribute("required")).toBe(false);
  expect(
    text(form.querySelector(`#${message.getAttribute("aria-describedby")}`)),
  ).toBe("Only as much as you feel comfortable sharing.");
});

test("asks the visitor to confirm they've read the privacy policy", () => {
  const consent = field("I have read the privacy policy");

  expect(consent.getAttribute("type")).toBe("checkbox");
  expect(consent.getAttribute("name")).toBe("consent");
  expect(consent.hasAttribute("required")).toBe(true);
  expect(
    form.querySelector(`label[for="${consent.id}"] a`)?.getAttribute("href"),
  ).toBe("/privacy-policy/");
});

test("marks the required fields, hiding the marker from screen readers", () => {
  const markers = [...form.querySelectorAll("label .required")];

  expect(
    markers.map((marker) => marker.closest("label")?.getAttribute("for")),
  ).toEqual(["name", "email", "consent"]);
  for (const marker of markers) {
    expect(marker.getAttribute("aria-hidden")).toBe("true");
  }
});

test("has a button to send the enquiry", () => {
  const button = form.querySelector('button[type="submit"]');

  expect(text(button)).toBe("Send enquiry");
});

test("posts the enquiry", () => {
  expect(form.getAttribute("method")).toBe("post");
  expect(form.getAttribute("action")).toBeTruthy();
});
