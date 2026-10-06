/** The path data of an SVG icon, to check a rendered icon is the expected one. */
export function iconPath(svg: string | Element | null | undefined) {
  if (svg == null) return undefined;
  if (typeof svg !== "string")
    return svg.querySelector("path")?.getAttribute("d") ?? undefined;
  return svg.match(/<path[^>]* d="([^"]+)"/)?.[1];
}
