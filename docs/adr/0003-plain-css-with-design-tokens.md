# 0003. Style with plain CSS and custom-property design tokens

Date: 2026-05-12

Superseded by [0012](0012-small-global-token-set-and-component-owned-styles.md).

## Context

The site has a small, bespoke visual design. A utility or component CSS framework would add a dependency and a second vocabulary for little benefit, and design changes should be easy to make in one place.

## Decision

- Use plain CSS. Global design tokens (colour, type, spacing, radii, shadows, motion) are CSS custom properties in `src/styles/global.css`, along with base element styles.
- Component styles live in each `.astro` component's scoped `<style>` block and use the tokens.
- Don't use a CSS framework (Tailwind or similar) or a CSS-in-JS library.

## Consequences

- A redesign is largely a matter of swapping token values.
- Discipline is needed to avoid hard-coded values in components. Review should check for them.
