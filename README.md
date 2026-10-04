# Horizon Psychology website

Website for Horizon Psychology, the private practice of Dr Emma Izon, clinical psychologist. It covers individual and couples therapy, clinical supervision and research supervision, online or face-to-face in Buckinghamshire.

It's a static site built with [Astro](https://astro.build), TypeScript and plain CSS.

## Development

Requires Node 22 or later (see `.nvmrc`).

```sh
npm install
npm run dev
```

## Commands

- `npm run dev` starts the local development server.
- `npm run check` runs Astro and TypeScript checks.
- `npm run build` checks and builds the static site.
- `npm run preview` previews the production build locally.
- `npm test` runs the component tests.
- `npm run test:e2e` runs the browser and accessibility tests. Install the browser first with `npx playwright install chromium`.

## How we work

- [CLAUDE.md](CLAUDE.md) describes the project layout and ways of working: GitHub issues for all work, test-driven development, pull requests with squash merging, and gitmoji commit messages. It's written for Claude Code but applies to everyone.
- [docs/adr/](docs/adr/README.md) records the architecture decisions behind the site.
- Work is tracked in [GitHub issues](https://github.com/stuartizon/horizonpsychology.co.uk/issues).
