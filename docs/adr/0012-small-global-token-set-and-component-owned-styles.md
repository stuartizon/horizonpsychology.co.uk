# 0012. Keep global tokens small and give components their own styles

Date: 2026-10-04

Supersedes [0003](0003-plain-css-with-design-tokens.md).

## Context

The redesign's token system came from a design-tool export. On top of the palette it had a semantic layer that renamed palette colours by role (`--color-eyebrow`, `--color-button-*`, `--surface-*`, `--color-text-*` and so on), plus tokens that only one element uses. Most of them were unused or used in one place, so changing a colour meant following a chain of aliases, and the styling decisions sat far from the elements they styled.

## Decision

- Use plain CSS, with no CSS framework (Tailwind or similar) and no CSS-in-JS library. This is unchanged from 0003.
- `src/styles/global.css` holds only:
  - the colour palette, as hex values (paper, sage, amber, ink and error)
  - shared scales: type sizes, weights, leading, spacing, layout widths, radii, shadows and motion
  - base element styles, which use palette colours directly
- There is no semantic or role layer of colour tokens. A component chooses palette colours directly, for example `color: var(--color-sage-600)`. A new colour is added to the palette first; components don't bring their own hex values.
- Build small components even for simple elements (eyebrow, button, heading). Each component's styles live in its `.astro` file's scoped `<style>`, next to its markup.
- A component uses the shared scales where they fit. A value only that component needs (such as the eyebrow's letter-spacing) is defined in the component, not added to `global.css`.

## Alternatives considered

- **Keep the design system's semantic token layer.** It matches the design tool's vocabulary, but nearly all of it was single-use and it adds a layer of indirection. Dark mode or other theming would justify it, and neither is planned.
- **Derive palette steps from each other with `color-mix()`.** The steps were chosen by eye and checked for contrast, not mixed from one colour. Deriving them would change the colours and make a change to one step move others silently.

## Consequences

- A colour or scale change is still made once, in `global.css`. A change to how one element looks is made in that element's component.
- Reviews check that components use palette and scale tokens, and that one-off values stay in the component rather than growing the global set.
- The old components still use legacy names, kept in a marked block in `global.css` until the redesign issues (#4 to #10) rework them.
