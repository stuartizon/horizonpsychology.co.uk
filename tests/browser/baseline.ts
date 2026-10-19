import type { Locator } from "@playwright/test";

/** Where the first line of text in an element sits, measured from a marker at its start. */
export async function baseline(element: Locator) {
  return element.evaluate((node) => {
    const marker = document.createElement("span");
    marker.style.display = "inline-block";
    node.prepend(marker);
    const { top } = marker.getBoundingClientRect();
    marker.remove();
    return top;
  });
}

/**
 * Where the tops of the capitals on an element's first line sit, from the
 * font's own cap height, which doesn't vary with how each platform draws the
 * letters.
 */
export async function capTop(element: Locator) {
  const capHeight = await element.evaluate((node) => {
    const probe = document.createElement("span");
    probe.style.cssText = "display: inline-block; height: 1cap";
    node.append(probe);
    const { height } = probe.getBoundingClientRect();
    probe.remove();
    return height;
  });
  return (await baseline(element)) - capHeight;
}
