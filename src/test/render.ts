import { experimental_AstroContainer as AstroContainer } from "astro/container";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import { parseHTML } from "linkedom";

/**
 * Renders an Astro component to HTML and returns it as a queryable DOM.
 * `slots` maps a slot's name, such as `default`, to the HTML to put in it.
 */
export async function render(
  component: AstroComponentFactory,
  props: Record<string, unknown> = {},
  slots: Record<string, string> = {},
) {
  const container = await AstroContainer.create();
  const html = await container.renderToString(component, { props, slots });
  return parseHTML(`<!doctype html><html><body>${html}</body></html>`).document
    .body;
}
