# Contributing

## Issues

Every user story, task, bug or chore is a [GitHub issue](https://github.com/stuartizon/horizonpsychology.co.uk/issues) before work starts ([ADR 0009](docs/adr/0009-github-issues-for-work-tracking.md)). Larger pieces of work get a tracking issue with a checklist of sub-issues, such as the redesign in #14. Reference the issue from the branch, commits and pull request.

## Test-first

Work is test-first: a failing test is written and committed before the code that makes it pass ([ADR 0007](docs/adr/0007-test-driven-development.md)). The README describes the kinds of test.

## Design

The design is in [docs/design/](docs/design/2026-10-01/README.md), a dated snapshot from Claude Design ([ADR 0017](docs/adr/0017-keep-a-snapshot-of-the-design-in-the-repo.md)). It's a reference for the styles and copy the design intended, not a spec, and it's temporary: it's deleted once the redesign (#14) is built. Where sources disagree, the later one wins: the code, ADRs and issues, then the website design, then the design system. If a change departs from the design on purpose, add it to the snapshot's list of known differences in the same pull request.

## Accessibility

Everything on the site must:

- use semantic HTML
- be operable with a keyboard alone, with visible focus
- respect `prefers-reduced-motion`
- work from 320px wide

The browser tests check pages with axe and cover keyboard and focus behaviour. New interactive components also get a manual check with the keyboard.

## Branches and pull requests

- Nothing is committed directly to `main`; every change goes through a pull request ([ADR 0008](docs/adr/0008-pull-requests-and-squash-merge.md)). A ruleset on `main` enforces this, along with squash merging and passing CI.
- Branch from `main` with a short descriptive name, such as `services-dropdown`.
- Commit little and often, one small, coherent step per commit.
- Pull requests are squash merged, so the title becomes the commit on `main` and follows the commit style below. The description says what changed, why, how it was tested, and `Closes #<issue>`.
- Keep pull requests small enough to review in one sitting. Split large issues into several.
- Format with `npm run format`, or let your editor format on save with Prettier.
- The build, lint, format check and all three test suites must pass. CI runs them on every pull request.
- CI deploys each pull request to its own preview, linked from the pull request. Check the change there before merging: merging to `main` puts it live straight away.
- Update the README, this file and the ADRs in the same pull request as the change they describe.
- Dependabot opens a pull request each week for minor and patch dependency updates, and one for each major update. Major updates, such as a new Astro version, often need code changes and get their own issue.

## Commit messages

We use [gitmoji](https://gitmoji.dev) ([ADR 0010](docs/adr/0010-gitmoji-commit-messages.md)). Commit messages and pull request titles start with the emoji as a Unicode character, then an imperative summary in sentence case with no full stop:

```
✨ Add services dropdown to the header
```

Keep messages about the change itself, not where third-party assets came from.

## Architecture decision records

Significant decisions are recorded in [docs/adr/](docs/adr/README.md), one Markdown file each, numbered in sequence and copied from the template. Add one when choosing or changing a framework, library, hosting or service, data handling approach, or way of working, and list it in the index. Records aren't rewritten: a changed decision gets a new record that supersedes the old one, with "Supersedes" and "Superseded by" lines on both, and the old one is marked as superseded in the index.

## Working on a health practice's site

- Treat anything a visitor submits, especially contact form messages, as potentially sensitive health data under UK GDPR. Collect the minimum, and don't log or store it beyond what's needed.
- Keep the "not an emergency service" signposting (GP, NHS 111, Samaritans 116 123) wherever the design includes it.
- Legal pages (fees and cancellations, confidentiality, privacy, complaints) need sign-off from Dr Izon before they're published as final.

## Writing copy

The site's wording isn't final, but whoever writes it follows these rules.

**Voice.** Use one voice per block, and don't mix them within a paragraph:

- third person for credentials and biography: "Dr Emma Izon is a Clinical Psychologist…"
- "we" for what the practice offers: "We offer personalised therapy…"
- "you" wherever the reader has a decision to make: "You may not be completely sure whether therapy is right for you, and that's okay."

Headings are statements, not labels: the eyebrow above them carries the label.

**What we say.**

- Never guarantee or imply an outcome. Describe what happens in sessions, not what they'll fix.
- Use non-pathologising language: people _have experiences of_ psychosis. Prefer "difficulties", "lived experience" and "neurodivergent".
- Only claim what the practice can stand behind and attribute, especially credentials.
- Wherever confidentiality is mentioned, say what its limits are.

**Style.** UK English. Sentence case everywhere, including headings, buttons and card titles. The eyebrow is the only uppercase text, and CSS sets it. No exclamation marks, no emoji, and no rhetorical questions as headings. Write fees as "£100 · 50 minutes". Give a registration body's name in full the first time, with its acronym in brackets.
