# 0010. All changes via pull requests, squash merged

- **Status:** Accepted
- **Date:** 2026-10-04
- **Issue:** #15

## Context

Until now, commits went straight to `main`. With TDD, issue tracking and AI-assisted work, we want every change reviewed and checked before it lands, and a readable history on `main`.

## Decision

- Nothing is committed directly to `main`. Every change is made on a branch (`feat/…`, `fix/…`, `docs/…`, `chore/…`, `test/…`) and merged through a pull request.
- Commit little and often on the branch.
- PRs are **squash merged**, so each PR becomes one commit on `main`. The PR title must therefore follow the commit convention ([0012](0012-gitmoji-commit-messages.md)).
- PR descriptions say what changed and why, how it was tested, and link the issue (`Closes #N`).

## Consequences

- `main` has one meaningful commit per change, and the detailed history stays in the PR.
- Repository settings should enforce this: allow only squash merging, protect `main` (require PRs and passing checks), and delete branches on merge.
