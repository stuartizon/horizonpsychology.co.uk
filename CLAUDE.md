# CLAUDE.md

Guidance for Claude (and humans) working in this repository.

## Project

Marketing website for **Horizon Psychology**, the private practice of Dr Emma Izon (clinical psychologist): individual and couples therapy, clinical supervision and research supervision, online or face-to-face in Buckinghamshire.

- Static site built with [Astro](https://astro.build) 5, TypeScript (strict), plain CSS.
- The demo is deployed to Vercel. Production hosting isn't decided yet (#18), so don't assume Vercel-specific features or adapters.
- Node `>=22` (see `.nvmrc`).

## Commands

```sh
npm install
npm run dev      # local dev server on 127.0.0.1
npm run check    # astro check (types + .astro diagnostics)
npm run build    # check, then static build to dist/
npm run preview  # serve the production build
npm test         # component tests (Vitest)
npm run test:e2e # browser and accessibility tests (Playwright + axe)
```

Before the first `npm run test:e2e`, install the browser once with `npx playwright install chromium`.

`npm run build`, `npm test` and `npm run test:e2e` must pass before a PR is opened. CI runs all three on every PR.

## Layout

```
src/
  pages/        # one file per route; [therapyId].astro renders the service pages
  layouts/      # BaseLayout.astro (head, Navbar, Footer)
  components/   # reusable .astro components with scoped <style>
  icons/        # SVGs imported with ?raw
  styles/       # global.css: design tokens and base element styles
  test/         # test helpers (render.ts renders a component to a queryable DOM)
  consts.ts     # site title and description
e2e/            # Playwright browser and accessibility tests
public/         # static assets served as-is (images, favicon, robots.txt)
docs/adr/       # architecture decision records
```

- Import from `src` with the `@/` alias (e.g. `@/components/Button.astro`).
- Styling uses CSS custom properties defined in `src/styles/global.css`. Use the tokens; don't hard-code colours, font sizes, spacing or radii in components.
- Interactive behaviour (menu, carousel, accordion) is small vanilla TypeScript in a component's `<script>`. Don't add a UI framework without an ADR.
- Content must be accessible: semantic HTML, keyboard operable, visible focus, respects `prefers-reduced-motion`, works from 320px wide.

## Ways of working

### Track everything in GitHub issues

Every user story, task, bug or chore is a GitHub issue in `stuartizon/horizonpsychology.co.uk` before work starts. Larger pieces of work get a tracking issue with a checklist of sub-issues (e.g. the redesign in #14). Reference the issue from the branch, the PR and the commits.

### Test-driven development: red, green, refactor

1. **Red**: write a failing test that describes the behaviour. Run it and see it fail for the expected reason. **Commit the failing test on its own** (e.g. `✅ Add failing test for service card price line`).
2. **Green**: write the simplest implementation that makes the test pass. Commit.
3. **Refactor**: tidy the code and tests with the suite green. Commit.

The test-first commit is part of the history on the branch, so reviewers can see the test existed before the implementation. CI on the PR must be green, not each intermediate commit.

Pure visual styling with no testable behaviour (e.g. adjusting a token value) doesn't need a contrived test. Say so in the PR description and include before/after screenshots instead.

Where tests go ([ADR 0011](docs/adr/0011-vitest-and-playwright-for-tests.md)):

- **Component tests** (`npm test`): `Component.test.ts` next to the component. Render it with `render()` from `@/test/render` and query the returned DOM. Use these for rendered output: content, links, attributes, ARIA.
- **Browser tests** (`npm run test:e2e`): `e2e/*.spec.ts`. Use these for anything that needs a browser: scripts, keyboard and focus, navigation, responsive layout, and axe accessibility checks.
- A test for a known bug that won't be fixed in the current PR is marked `test.fail()` with a comment linking the issue. Remove the marker in the PR that fixes it.

### Branches, commits and pull requests

- Never commit directly to `main`. All changes go through a pull request.
- Branch from `main` with a short descriptive name (e.g. `services-dropdown`).
- **Commit little and often.** Each commit is one small, coherent step.
- PRs are **squash merged**. The PR title becomes the commit on `main`, so it must follow the gitmoji style below. The PR description should say what changed, why, how it was tested, and `Closes #<issue>`.
- Keep PRs small enough to review in one sitting. Split large issues into several PRs.
- Update `README.md`, this file and the ADRs in the same PR as the change they describe (new commands, setup steps, conventions or decisions).

### Commit messages: gitmoji

Start every commit message and PR title with a [gitmoji](https://gitmoji.dev) as the Unicode emoji, then an imperative summary in sentence case, no full stop:

```
✨ Add services dropdown to the header
```

Common ones:

| Emoji | Use for |
|---|---|
| ✨ | New feature or page |
| 🐛 | Bug fix |
| ✅ | Add or update tests (including the red, test-first commit) |
| ♻️ | Refactor |
| 💄 | UI and style changes |
| 📝 | Documentation (including ADRs and this file) |
| 🔧 | Configuration |
| ➕ / ➖ | Add / remove a dependency |
| 🔥 | Remove code or files |
| 🍱 | Add or update assets (images, fonts, icons) |
| ♿️ | Accessibility |
| 🚚 | Move or rename files or routes |
| ⚡️ | Performance |
| 🔒️ | Security or privacy |
| 👷 | CI and build system |

Keep messages about the change itself. Don't describe where third-party assets came from or what attribution was removed from them.

### Architecture decision records

Significant decisions are recorded in `docs/adr/` as one Markdown file each: `NNNN-short-title.md`, numbered in sequence and copied from `docs/adr/template.md` (Context, Decision, Alternatives considered if there were any, Consequences). Add an ADR when you choose or change a framework, library, hosting or service, data handling approach, or way of working, and list it in `docs/adr/README.md`. ADRs aren't rewritten once written: if a decision changes, write a new ADR that supersedes the old one, add "Supersedes" / "Superseded by" lines under both dates, and mark the old one in the index. Record where a decision landed, not the conversation that led to it.

## Domain notes

- The site is for a health practice. Treat anything a visitor submits, especially contact form messages, as potentially sensitive health data under UK GDPR. Collect the minimum, and don't log or store it beyond what's needed.
- Always keep the "not an emergency service" signposting (GP, NHS 111, Samaritans 116 123) where the design includes it.
- Legal pages (fees and cancellations, confidentiality, privacy, complaints) need sign-off from Dr Izon before they're published as final.
