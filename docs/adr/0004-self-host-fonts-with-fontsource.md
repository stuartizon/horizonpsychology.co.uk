# 0004. Self-host web fonts with Fontsource

Date: 2026-08-03

## Context

Loading fonts from Google Fonts at runtime sends visitors' IP addresses to a third party, a known GDPR concern in the UK and EU, and adds a connection to another origin. This matters more for a health practice's site.

## Decision

Install fonts as npm packages from [Fontsource](https://fontsource.org) and import them in the layout or page, so they're bundled and served from our own origin. Import only the weights and styles that are used.

## Consequences

- No third-party font requests and no extra connection before text can render.
- Fonts are versioned with the rest of the dependencies.
- The redesign changes which fonts are used (Lora and Source Sans 3 instead of Inter, see [0006](0006-adopt-horizon-psychology-redesign.md)) but keeps this approach.
