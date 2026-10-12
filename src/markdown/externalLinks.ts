// A Markdown plugin giving each link to another site the markup of
// ExternalLink: it opens in a new tab, an arrow shows it, and screen readers
// are told.
import arrowIcon from "@phosphor-icons/core/regular/arrow-up-right.svg?raw";
import type { Element, ElementContent } from "hast";
import { defineHastPlugin } from "satteri";

function isExternal(href: unknown) {
  return (
    typeof href === "string" &&
    /^https?:\/\//.test(href) &&
    new URL(href).hostname !== "horizonpsychology.co.uk"
  );
}

/** The link's text, then the arrow, kept on the same line as its last word. */
function withArrow(children: readonly ElementContent[]): ElementContent[] {
  const last = children.at(-1);
  let start = children.slice(0, -1);
  let end = last ? [last] : [];
  if (last?.type === "text") {
    const split = last.value.lastIndexOf(" ") + 1;
    start = [...start, { type: "text", value: last.value.slice(0, split) }];
    end = [{ type: "text", value: last.value.slice(split) }];
  }
  return [
    ...start,
    {
      type: "element",
      tagName: "span",
      properties: { className: ["external-link__end"] },
      children: [
        ...end,
        {
          type: "element",
          tagName: "span",
          properties: {
            className: ["external-link__icon"],
            ariaHidden: "true",
          },
          // A raw node passes the icon's SVG through as it is.
          children: [{ type: "raw", value: arrowIcon } as ElementContent],
        },
      ],
    },
    {
      type: "element",
      tagName: "span",
      properties: { className: ["visually-hidden"] },
      children: [{ type: "text", value: " (opens in a new tab)" }],
    },
  ];
}

export default defineHastPlugin({
  name: "external-links",
  element: {
    filter: ["a"],
    visit(link): Element | void {
      if (!isExternal(link.properties.href)) return;
      return {
        ...link,
        properties: { ...link.properties, target: "_blank", rel: ["noopener"] },
        children: withArrow(link.children),
      };
    },
  },
});
