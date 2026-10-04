# 0006. Adopt the Horizon Psychology redesign

Date: 2026-10-04

## Context

A new design for the whole site (design export *Horizon Psychology website 20261001*) replaces the previous design. It covers 15 routes built from a home page plus a few templates: about, service page, FAQs, research, contact and prose (legal) pages. It ships with a full token system written to fit this codebase.

## Decision

- Implement the new design on the existing stack ([0002](0002-astro-static-site.md), [0003](0003-plain-css-with-design-tokens.md), [0005](0005-no-client-side-ui-framework.md)). Treat the design's markup as a specification only, since it's a React prototype with inline styles.
- Adopt its tokens: a warmer paper background, sage as the brand colour, a new amber accent from the logo's sun, and ink text colours, plus its spacing, radius, shadow and motion tokens.
- Typography: **Lora** for display and **Source Sans 3** for body text, replacing Inter. Both are self-hosted ([0004](0004-self-host-fonts-with-fontsource.md)).
- Content and scope decisions:
  - Testimonials move from the home page to the About page.
  - Credential badges are removed from the site.
  - The blog is **not** part of the MVP. `/blog/` and its footer link are left out for now.
  - `/projects/` is replaced by `/research/` (published work).
- Work is split into issues #1 to #13 and tracked in #14.

## Alternatives considered

- **Port the prototype's React markup directly.** It's built with inline styles and a React runtime, which conflicts with [0003](0003-plain-css-with-design-tokens.md) and [0005](0005-no-client-side-ui-framework.md).
- **Incrementally restyle the existing design.** The new design changes typography, colour and page structure across every page, so piecemeal changes would leave the site inconsistent for longer.

## Consequences

- Most visual change comes from replacing `global.css` tokens. Most components need restyling, and some are deleted (`CredentialBadge`).
- New pages (FAQs, research, legal pages, contact form) need new content structures ([0007](0007-structured-content-in-collections.md)) and email delivery ([0013](0013-contact-form-email-delivery.md)).
