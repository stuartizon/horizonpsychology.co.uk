import babcpAccredited from "@/logos/babcp-accredited.png";
import { render } from "@/test/render";
import { expect, test } from "vitest";
import CredentialLogo from "./CredentialLogo.astro";

const logo = async () =>
  (
    await render(CredentialLogo, {
      href: "https://www.babcp.com/",
      src: babcpAccredited,
      name: "British Association for Behavioural and Cognitive Psychotherapies (BABCP) accredited",
    })
  ).querySelector("a")!;

test("links to the body's site, opening it in a new tab", async () => {
  const element = await logo();

  expect(element.getAttribute("href")).toBe("https://www.babcp.com/");
  expect(element.getAttribute("target")).toBe("_blank");
  expect(element.getAttribute("rel")).toBe("noopener");
});

test("shows the logo, named in full by its alt text", async () => {
  const image = (await logo()).querySelector("img");

  expect(image?.getAttribute("alt")).toBe(
    "British Association for Behavioural and Cognitive Psychotherapies (BABCP) accredited",
  );
  expect(image?.getAttribute("src")).toMatch(/babcp-accredited/);
});

test("says it opens in a new tab, for screen readers only", async () => {
  const element = await logo();

  expect(element.querySelector(".visually-hidden")?.textContent?.trim()).toBe(
    "(opens in a new tab)",
  );
});

test("gives the body's name in full as a tooltip", async () => {
  expect((await logo()).getAttribute("title")).toBe(
    "British Association for Behavioural and Cognitive Psychotherapies (BABCP) accredited",
  );
});
