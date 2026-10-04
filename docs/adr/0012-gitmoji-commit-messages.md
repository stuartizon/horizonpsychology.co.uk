# 0012. Gitmoji commit messages

Date: 2026-10-04

## Context

Commit messages so far are plain imperative sentences. We want the type of each change to be recognisable at a glance in the history and in PR titles.

## Decision

Follow [gitmoji](https://gitmoji.dev): start each commit message and each PR title with the relevant gitmoji as a Unicode character, followed by an imperative summary in sentence case with no full stop, for example `✨ Add services dropdown to the header`. The commonly used emojis are listed in `CLAUDE.md`. Messages describe the change itself, not where third-party assets came from.

## Alternatives considered

- **Conventional Commits (`feat:`, `fix:` and so on).** Machine-readable, but we don't generate changelogs or versions from commits, and gitmoji is quicker to scan.
- **Free-form messages.** The previous approach. Readable, but the type of change isn't visible at a glance.

## Consequences

- The type of change is visible at a glance on `main` (via squash-merged PR titles) and on branches.
- Contributors need the gitmoji list to hand. Tooling such as `gitmoji-cli` or a commit-msg hook could enforce it later if needed.
