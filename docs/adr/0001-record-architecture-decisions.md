# 0001. Record architecture decisions

Date: 2026-10-04

## Context

Decisions about this site have so far lived only in commit messages and in AI coding sessions whose transcripts have since been deleted. When we pick up work later, or bring in someone new, it's hard to tell why things are the way they are.

## Decision

Record significant decisions as architecture decision records (ADRs) in `docs/adr/`, one Markdown file per decision, named `NNNN-short-title.md` and following [`template.md`](template.md): Context, Decision, Alternatives considered, Consequences. This is Michael Nygard's format plus an explicit section for rejected alternatives.

- Past ADRs aren't rewritten. If a decision changes, a new ADR supersedes it and both are kept, with a "Supersedes" / "Superseded by" line under the date linking them. With no such line, a record is current.
- `README.md` in this directory is the index.

## Alternatives considered

- **Plain Nygard template.** It has no place for rejected alternatives, which are often as useful as the decision itself.

## Consequences

- There's a lightweight, reviewable record of why things are the way they are.
- Adding an ADR becomes part of the PR for any significant change.
