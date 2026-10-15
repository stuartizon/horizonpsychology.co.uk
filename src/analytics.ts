// Counts the site's two events with Umami (#168). An event is only its name:
// nothing a visitor writes, or which service they're enquiring about, is sent.

type Event = "Enquiry sent" | "Email link clicked";

declare global {
  interface Window {
    umami?: { track(event: Event): void };
  }
}

/** Counts `event`, if the analytics have loaded and the visitor hasn't opted out. */
export function track(event: Event) {
  window.umami?.track(event);
}
