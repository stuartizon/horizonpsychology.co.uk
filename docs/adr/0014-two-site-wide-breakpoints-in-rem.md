# 0014. Use two site-wide breakpoints, in rem

Date: 2026-10-04

## Context

The design export changes layout at five different widths (620, 700, 800, 900 and 1080px), each chosen for one page or component, and its header has four variants. That's more layouts to build, test and keep consistent than the content needs. The site must work from 320px wide ([CONTRIBUTING.md](../../CONTRIBUTING.md)), and styles are plain CSS ([0012](0012-small-global-token-set-and-component-owned-styles.md)), where custom properties can't be used in media queries.

## Decision

- Every page and component uses the same two breakpoints, giving at most three layouts:
  - **Phone**: the default, below 48rem (768px at the default text size).
  - **Tablet**: from `@media (min-width: 48rem)`.
  - **Desktop**: from `@media (min-width: 64rem)` (1024px).
- Media queries are mobile-first: the phone layout is the unconditioned style and wider layouts build on it with `min-width`.
- Breakpoints are in rem. In a media query a rem is the browser's default text size, so someone who sets a larger default gets the narrower layout sooner instead of large text squeezed into a wide one. Page zoom moves rem and px breakpoints alike.
- The values are written out in each media query. `src/styles/breakpoints.test.ts` fails on any other width, and `global.css` documents the breakpoints alongside the tokens.

## Alternatives considered

- **Pixel breakpoints, as in Bootstrap.** Familiar numbers, but they ignore the browser's text size setting.
- **Named breakpoints with `@custom-media`, compiled by PostCSS.** Browsers don't support `@custom-media` yet, and because Astro processes each component's styles separately, sharing the names needs PostCSS with two plugins and a config file. That's a build step to name two values the test already guards.

## Consequences

- Each layout change happens at a breakpoint every other component also uses, so the header, service cards and contact page switch together.
- Files from before the redesign that still use their own widths are marked as known failures in the test, with the issue that redesigns each one. They come off the list as they're redesigned.
- If browsers ship `@custom-media`, the breakpoints can be named in plain CSS without a build step.
