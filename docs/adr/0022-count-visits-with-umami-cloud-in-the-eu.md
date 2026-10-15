# 0022. Count visits with Umami Cloud, with its data in the EU

Date: 2026-10-15

## Context

To improve the site, we want to know which pages people visit and where they arrive from, the routes they take, for example to the contact page, and how many visits end in an enquiry, sent from the form or by clicking the email link (#168). Cloudflare's dashboard shows only server-side traffic.

The visitors are people looking for therapy, so which pages someone visits can say something about their health. Nothing that identifies a visitor should be kept, nothing from the enquiry form should ever be recorded, and there should be no session recording or heatmaps that capture typing. The script should be small enough not to affect the Lighthouse scores (#155), and the data should stay in the UK or EU with a provider that doesn't use it for its own purposes.

Under PECR, storing or reading information on a visitor's device needs consent, which means a consent banner, and usually only around half of visitors accept. The Data (Use and Access) Act 2025 adds an exemption for statistical purposes. The ICO's final guidance on storage and access technologies (April 2026) reads it strictly: first-party analytics used only to understand and improve a site can run without consent, as long as visitors are told clearly and can opt out, and the data isn't used for anything else.

## Decision

- Count visits with **Umami Cloud**, on its free Hobby plan, with the account's data region set to the **EU**. The region was chosen when the account was created and can't be changed.
- Its script loads on every page from `cloud.umami.is`, about 5KB. It sets no cookies and stores nothing on the device. It's set to respect the browser's Do Not Track setting (`data-do-not-track`) and to leave query strings out of the addresses it counts (`data-exclude-search`), as `/contact/?topic=…` would say which service someone is enquiring about.
- Two events, from `src/analytics.ts` (#236), which only accepts an event's name, so nothing else can be sent: **Enquiry sent**, when the form's script hears an enquiry was sent, and **Email link clicked**, on any `mailto:` link. An enquiry sent without the script shows as a visit to `/contact/sent/`. A third event, **Enquiry not sent**, when the form shows its error message, is to follow (#243), and a failure without the script shows as a visit to `/contact/not-sent/`.
- Only the live site is counted: `ANALYTICS_DOMAINS` in `src/consts.ts` (#236), passed to the script's `data-domains`, lists the domains it counts. Previews aren't counted, so testing doesn't mix with real visits, and the browser tests check the events with Umami's script replaced by a stub.
- No consent banner. The privacy policy says what's counted, by whom and why (#239), and visitors can opt out (#240): the script doesn't load if the browser sends Global Privacy Control, and a button on the privacy policy page sets Umami's `umami.disabled` marker in the browser.
- The live site isn't counted until the privacy policy describes the analytics and the opt-out works (#241).

## Alternatives considered

- **Plausible.** Also cookieless and stored in the EU, with a smaller script, and a strong record on privacy. But funnels and journeys need its Business plan, about $39 a month, where Umami's free plan has them.
- **Google Analytics 4.** Free, with events, funnels and path exploration. But it sets a cookie with an identifier that recognises a visitor for months, so it needs a consent banner, and Google uses the data for its own purposes, so the statistical purposes exemption doesn't fit. Its script is also the heaviest.
- **PostHog or Mixpanel.** Product analytics, good at routes through a site, and both can be set up without cookies and stored in the EU. But they're built to follow a person, with session recording a setting away, which is more than this site needs and more to keep switched off.
- **Cloudflare Web Analytics.** Free, cookieless and already in place, but it only counts page views, so it can't count enquiries.
- **Our own events on Cloudflare,** such as a Pages Function writing to Workers Analytics Engine. No new processor, but we'd have to build and maintain the reports ourselves.

## Consequences

- Visitors who block the script, with Brave Shields or an ad blocker, aren't counted at all, often 10–30% of visits. We won't get round blockers by serving the script from the site's own domain, as they show a visitor doesn't want to be tracked. Read the numbers as trends. The true count of enquiries is in Emma's inbox and the enquiry Worker's logs ([0021](0021-alert-enquiry-failures-with-workers-issues-and-a-claude-code-routine.md)).
- The free plan keeps 6 months of data and allows 100,000 events a month. Year-on-year comparisons need a paid plan.
- Umami's API needs a paid plan, so the reports are read in the dashboard. The goals, funnels and journeys are set up there by hand and listed in the README.
- Umami is a new processor of visit data, so the privacy policy names it, and a data processing agreement is needed before the live site is counted (#238).
- There are no heatmaps. Scroll depth and routes come from the events, funnels and journeys instead.
- Failed enquiries are counted, as well as alerted. [0021](0021-alert-enquiry-failures-with-workers-issues-and-a-claude-code-routine.md) rejected reporting failures from the visitor's browser, partly as it would add a service that sees the contact page. With Umami on every page, that no longer applies, so the Enquiry not sent event counts failures the server never hears about. It isn't an alert: Workers Issues still alerts Stuart to failures on the server.
- Umami is open source, so if Umami Cloud stopped suiting us, it could be hosted elsewhere without changing how the site counts visits.
