// Counts visits and the site's two events with Umami (#168). An event is only
// its name: nothing a visitor writes, or which service they're enquiring
// about, is sent. A visitor can opt out (#240): the analytics aren't loaded
// if their browser sends Global Privacy Control or Do Not Track, and the
// privacy policy has a switch that sets Umami's own opt-out marker. For now,
// only previews are counted, not the live site.
import { ANALYTICS_WEBSITE_ID, COUNTED_HOSTNAMES } from "@/consts";

type Event = "Enquiry sent" | "Email link clicked";

declare global {
  interface Window {
    umami?: { track(event: Event): void };
  }
  interface Navigator {
    globalPrivacyControl?: boolean;
  }
}

/** Umami doesn't count a browser with this in its local storage. */
const OPT_OUT = "umami.disabled";

/** Whether the browser asks websites not to track it. */
export function askedNotToTrack() {
  return (
    navigator.globalPrivacyControl === true || navigator.doNotTrack === "1"
  );
}

/** Whether visits to the site at `hostname` are counted: only previews, for now. */
export function countsVisits(hostname = location.hostname) {
  return COUNTED_HOSTNAMES.test(hostname);
}

/** Adds Umami's script to the page, where visits are counted, unless the browser asks not to be tracked. */
export function loadAnalytics() {
  if (!countsVisits() || askedNotToTrack()) return;
  const script = document.createElement("script");
  script.src = "https://cloud.umami.is/script.js";
  script.dataset.websiteId = ANALYTICS_WEBSITE_ID;
  script.dataset.excludeSearch = "true";
  document.head.append(script);
}

/** Whether this browser has opted out, or `undefined` if its storage can't be used. */
export function optedOut() {
  try {
    return localStorage.getItem(OPT_OUT) !== null;
  } catch {
    return undefined;
  }
}

/** Stops or restarts counting this browser's visits. */
export function setOptedOut(out: boolean) {
  if (out) localStorage.setItem(OPT_OUT, "1");
  else localStorage.removeItem(OPT_OUT);
}

/** Counts `event`, if the analytics have loaded and the visitor hasn't opted out. */
export function track(event: Event) {
  window.umami?.track(event);
}
