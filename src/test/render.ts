import { experimental_AstroContainer as AstroContainer } from "astro/container";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { parseHTML } from "linkedom";

/** Renders an Astro component to HTML and returns it as a queryable DOM. */
export async function render(
  component: AstroComponentFactory,
  props: Record<string, unknown> = {},
) {
  const container = await AstroContainer.create();
  const html = await container.renderToString(component, { props });
  return parseHTML(`<!doctype html><html><body>${html}</body></html>`).document.body;
}
