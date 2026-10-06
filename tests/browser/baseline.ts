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
