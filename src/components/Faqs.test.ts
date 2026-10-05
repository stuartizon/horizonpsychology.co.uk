import { iconPath } from "@/test/icon";
import { render } from "@/test/render";
import caretDownIcon from "@phosphor-icons/core/regular/caret-down.svg?raw";
import { expect, test } from "vitest";
import Faqs from "./Faqs.astro";

test("shows each question with its answer paragraphs", async () => {
  const list = await render(Faqs, {
    faqs: [
      { question: "Do I need a referral?", answer: ["No.", "Get in touch directly."] },
      { question: "Do you offer online sessions?", answer: ["Yes."] },
    ],
  });

  const questions = [...list.querySelectorAll("button")].map((button) => button.textContent?.trim());
  expect(questions).toEqual(["Do I need a referral?", "Do you offer online sessions?"]);

  const firstAnswer = list.querySelector(`#${list.querySelector("button")?.getAttribute("aria-controls")}`);
  expect([...firstAnswer!.querySelectorAll("p")].map((p) => p.textContent)).toEqual([
    "No.",
    "Get in touch directly.",
  ]);
});

test("each question shows a Phosphor caret", async () => {
  const list = await render(Faqs, {
    faqs: [{ question: "Do I need a referral?", answer: ["No."] }],
  });

  expect(iconPath(list.querySelector("button"))).toBe(iconPath(caretDownIcon));
});
