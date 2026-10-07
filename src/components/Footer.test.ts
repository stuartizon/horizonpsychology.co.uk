import { services } from "@/data/services";
import { render } from "@/test/render";
import { expect, test } from "vitest";
import Footer from "./Footer.astro";

async function renderFooter() {
  const body = await render(Footer);
  return body.querySelector("footer")!;
}

async function groupLinks(name: string) {
  const nav = (await renderFooter()).querySelector(
    `nav[aria-label="${name}"]`,
  )!;
  return [...nav.querySelectorAll("a")].map((link) => [
    link.textContent?.trim(),
    link.getAttribute("href"),
  ]);
}

test("Work together links to each service", async () => {
  expect(await groupLinks("Work together")).toEqual(
    services.map((service) => [service.name, `/${service.id}/`]),
  );
});

test("Practice links to About Emma, Research, FAQs and Contact Us, with no blog", async () => {
  expect(await groupLinks("Practice")).toEqual([
    ["About Emma", "/about/"],
    ["Research", "/research/"],
    ["FAQs", "/faqs/"],
    ["Contact Us", "/contact/"],
  ]);
});

test("Practical links to the practical pages", async () => {
  expect(await groupLinks("Practical")).toEqual([
    ["Fees and cancellations", "/terms-and-conditions/"],
    ["Confidentiality", "/confidentiality/"],
    ["Privacy policy", "/privacy-policy/"],
    ["Complaints", "/complaints/"],
  ]);
});

test("shows what the practice offers and the email address", async () => {
  const footer = await renderFooter();

  expect(footer.textContent?.replace(/\s+/g, " ")).toContain(
    "Psychological therapy, clinical and research supervision. Online, and face-to-face in Buckinghamshire.",
  );
  const email = footer.querySelector('a[href^="mailto:"]');
  expect(email?.getAttribute("href")).toBe(
    "mailto:hello@horizonpsychology.co.uk",
  );
  expect(email?.textContent?.trim()).toBe("hello@horizonpsychology.co.uk");
});

test("signposts that therapy isn't an emergency service, and gives registration", async () => {
  const text = (await renderFooter()).textContent!.replace(/\s+/g, " ");

  expect(text).toContain(
    "registered with the Health and Care Professions Council and accredited by the BABCP",
  );
  expect(text).toContain("Therapy is not an emergency service");
  expect(text).toContain("contact your GP or call NHS 111");
});
