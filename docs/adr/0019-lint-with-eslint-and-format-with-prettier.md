# 0019. Lint with ESLint and format with Prettier

Date: 2026-10-06

## Context

`astro check` catches type errors, but nothing checked code style, common mistakes or accessibility problems in templates before the browser tests ran. Code was formatted by hand, so style drifted between files and reviews could get caught up in it.

## Decision

Lint with [ESLint](https://eslint.org), using the recommended rules from `@eslint/js`, [typescript-eslint](https://typescript-eslint.io) and [eslint-plugin-astro](https://ota-meshi.github.io/eslint-plugin-astro/). Add eslint-plugin-astro's `jsx-a11y-strict` rules, which check accessibility in Astro templates and run on [eslint-plugin-jsx-a11y-x](https://github.com/es-tooling/eslint-plugin-jsx-a11y-x). `eslint-config-prettier` turns off the rules that only concern formatting. `no-undef` is off in `.astro` files, because `astro check` already reports undefined names and knows Astro's global types.

Format TypeScript, JavaScript, Astro, CSS, Markdown, JSON and YAML with [Prettier](https://prettier.io) and [prettier-plugin-astro](https://github.com/withastro/prettier-plugin-astro), on Prettier's default options. The design snapshot in `docs/design/` isn't formatted, because it's kept as exported ([ADR 0017](0017-keep-a-snapshot-of-the-design-in-the-repo.md)).

`astroCompressHTML` is set to `"html"`, to match how Astro handles whitespace in templates with `compressHTML: true`, which `astro.config.mjs` sets because Astro 7's default is `"jsx"`. With that setting, the plugin only wraps lines where the whitespace it adds doesn't change what's rendered.

`npm run lint` and `npm run format:check` run as separate jobs in CI, in parallel with the other checks, and the deploy needs both to pass. `npm run format` formats the repo.

## Alternatives considered

- **eslint-plugin-jsx-a11y** for the accessibility rules. It doesn't support ESLint 10. eslint-plugin-astro accepts either plugin, and eslint-plugin-jsx-a11y-x is a maintained fork with the same rules.

## Consequences

- Style isn't a review topic. Formatting is checked in CI, and editors can format on save with the Prettier extension.
- Accessibility mistakes in templates, such as an image without `alt` or a link without `href`, fail lint before any browser test runs. Axe in the browser tests still checks the rendered pages.
- Prettier can wrap the text inside an element onto its own lines. The rendered page looks the same, but `textContent` keeps the line breaks, so tests compare text with whitespace collapsed, for example `textContent.replace(/\s+/g, " ").trim()`.
- If a newer Astro changes how whitespace in templates is handled, `astroCompressHTML` must change to match.
- Prettier pads Markdown tables, so adding a longer row realigns the whole table in the diff.
- Stylelint could later take over checks on the CSS, such as the breakpoint check in `src/styles/breakpoints.test.ts`.
