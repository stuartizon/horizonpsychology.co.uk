# 0005. No client-side UI framework

- **Status:** Accepted
- **Date:** 2026-05-14 (reconstructed: the mobile menu, FAQ accordion and testimonials carousel were all built as vanilla scripts in Astro components)

## Context

The site's interactivity is limited to a mobile menu, a services dropdown, FAQ accordions and a testimonials carousel. The new design was prototyped in React, but that was a prototyping tool, not a production choice.

## Decision

Implement interactive behaviour as small vanilla TypeScript `<script>` blocks inside the relevant Astro component, using semantic HTML (`<button>`, `aria-expanded` and so on) so that content stays usable before and without JavaScript where possible. Don't add React, Vue, Svelte or another UI framework, or an Astro islands integration, without a new ADR.

## Consequences

- Very little JavaScript is shipped, and there's no framework runtime or hydration.
- Each interactive component owns its behaviour, accessibility and tests.
- If the site later needs complex client-side state, revisit this decision.
