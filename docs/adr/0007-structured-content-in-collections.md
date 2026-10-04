# 0007. Keep structured content in one place

Date: 2026-10-04

## Context

Service data (names, descriptions, prices, durations) is currently duplicated between the home page and `src/pages/[therapyId].astro`. The redesign reuses the same content in many places: service cards, service pages, the nav dropdown, the footer, the contact form topic list, and FAQs shown both on `/faqs/` and on each service page.

## Decision

Hold structured content in a single typed source each, and have pages read from it:

- Astro content collections (or typed TypeScript data files where Markdown adds nothing) for **services**, **FAQs** (tagged by group and by service), **testimonials** and **publications**.
- Markdown files in a collection for the **legal pages**, with a `draft` flag in frontmatter until the wording is signed off.

## Alternatives considered

- **Keep content in each page file.** The current approach. Simple, but the same service and FAQ text would be duplicated in several places and drift apart.

## Consequences

- Content changes are made once and can't drift between pages.
- Schemas (with Zod via `astro:content`) catch missing or malformed fields at build time.
- Non-developers can edit Markdown or data files without touching component code.
