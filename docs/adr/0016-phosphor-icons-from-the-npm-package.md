# 0016. Use Phosphor icons from the npm package

Date: 2026-10-05

## Context

The redesign uses [Phosphor](https://phosphoricons.com) for its interface icons: the menu, close, caret and star icons. Phosphor is MIT licensed, which asks that its copyright and licence notice go with copies of it. The four service icons were drawn for the design and aren't Phosphor.

## Decision

Install [`@phosphor-icons/core`](https://www.npmjs.com/package/@phosphor-icons/core) and import each icon's SVG from the package with `?raw`, for example `@phosphor-icons/core/regular/list.svg?raw`, so it's inlined in the page and coloured with `currentColor`. Phosphor icons aren't copied into `src/icons/`.

The custom service icons stay in `src/icons/`, named by service id.

## Consequences

- The licence comes with the package, and icons are versioned with the rest of the dependencies.
- Any of Phosphor's icons and weights can be used without adding files. Only the ones imported end up in the build.
- `src/icons/` holds only the site's own icons.
