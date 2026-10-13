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

test("About Horizon links to About Emma, Research, FAQs and Contact Us, with no blog", async () => {
  expect(await groupLinks("About Horizon")).toEqual([
    ["About Emma", "/about/"],
    ["Research", "/research/"],
    ["FAQs", "/faqs/"],
    ["Contact Us", "/contact/"],
  ]);
});

test("Information links to the practical pages", async () => {
  expect(await groupLinks("Information")).toEqual([
    ["Fees and cancellations", "/fees-and-cancellations/"],
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

test("has no registration or emergency line", async () => {
  const text = (await renderFooter()).textContent!;

  expect(text).not.toContain("Health and Care Professions Council");
  expect(text).not.toContain("NHS 111");
});

test("ends with a copyright line for the year it was built", async () => {
  const copyright = (await renderFooter()).querySelector(".footer__copyright");

  expect(copyright?.textContent?.replace(/\s+/g, " ").trim()).toBe(
    `© ${new Date().getFullYear()} Horizon Psychology`,
  );
});
