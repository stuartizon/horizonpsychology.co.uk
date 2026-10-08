import { services } from "@/data/services";
import { render } from "@/test/render";
import { expect, test } from "vitest";
import FeeList from "./FeeList.astro";

const textOf = (element: Element | null | undefined) =>
  element?.textContent?.replace(/\s+/g, " ").trim();

test("lists each service with its fee and session length", async () => {
  const list = (await render(FeeList)).querySelector("dl")!;

  expect([...list.querySelectorAll("dt")].map(textOf)).toEqual(
    services.map((service) => service.name),
  );
  expect([...list.querySelectorAll("dd")].map(textOf)).toEqual(
    services.map((service) => `£${service.price} · ${service.minutes} minutes`),
  );
});

test("links each service to its page", async () => {
  const links = [...(await render(FeeList)).querySelectorAll("dt a")];

  expect(links.map((link) => link.getAttribute("href"))).toEqual(
    services.map((service) => `/${service.id}/`),
  );
});
