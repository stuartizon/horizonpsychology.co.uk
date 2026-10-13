# 0021. Alert Stuart to enquiry failures with Workers Issues and a Claude Code routine

Date: 2026-10-13

## Context

Sending enquiries is the main thing the site's server side does ([0020](0020-email-enquiries-from-a-worker-with-cloudflare-email-routing.md)). If it broke, nobody would know until Emma noticed enquiries had stopped. The enquiry Worker and the Pages Function log a failure with `console.error`, giving only the error's type, but without Workers Logs those lines were only seen by someone watching `wrangler tail` at the time.

Emma's Cloudflare account is on the Free plan. Cloudflare's custom alerts, which can email on Worker errors, need a paid plan. No new service should see visitors' data, so the privacy policy doesn't change.

## Decision

- Both enquiry Workers, production and preview, turn on Workers Logs and Issues in `wrangler.jsonc` (`observability.enabled` and `observability.issues.enabled`). A failed send is kept in the logs for three days and grouped as an Issue. Issues records the Worker's 5xx responses and `console.error` output, so it sees a failed send without any change to the code. The logs still say only that a send failed and the error's type.
- In the Cloudflare dashboard, an Issues automation starts a Claude Code routine on Stuart's Claude account when an issue occurs. The routine opens an issue in this repository first, so GitHub emails Stuart, then investigates and comments with what it finds.
- The automation and the routine are set up by hand and listed in the README.

## Alternatives considered

- **A scheduled GitHub Actions workflow** that asks Workers Logs for failures each hour and fails if there are any, so GitHub emails Stuart. It needs no beta feature, but more code, a token that can read the logs, and GitHub pauses scheduled workflows in a repository with no commits for 60 days.
- **Cloudflare's custom alerts by email.** The simplest, but they need the paid Workers plan.
- **Reporting failures from the visitor's browser.** The form's script already knows when sending fails, but a report to the site is blocked by whatever blocked the enquiry, and a report to another service adds a processor that sees the page where people type health details.
- **A chat app webhook, or a small Worker that emails Stuart**, as the automation's destination. Left for a backup alert that doesn't depend on Claude (#205).

## Consequences

- Stuart hears about a failed send by email, from GitHub, with a first diagnosis, even when it's email sending that has failed.
- The alert depends on a paid Claude plan. If it's cancelled, the routine stops and nobody is told, though failures are still listed under Issues in the Cloudflare dashboard. Move the automation to another destination before cancelling, or add the backup (#205).
- Issues is in open beta and free during it. If it's priced later, it's one setting per Worker to turn off.
- The Pages Function's own failure, when it can't reach the Worker, isn't covered: the Worker never runs, and Pages Functions don't keep logs, only stream them live.
- What Issues sends the routine includes the Worker's logs and request details. The request comes from the Pages Function, not the visitor, and the logs never quote an enquiry, so nothing from the enquiry leaves Cloudflare.
