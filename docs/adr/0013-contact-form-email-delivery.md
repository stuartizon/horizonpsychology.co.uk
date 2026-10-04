# 0013. Contact form email delivery

Date: 2026-10-04

## Context

The redesign adds a contact form (name, email, topic, online or face-to-face, message, privacy consent). The site is static ([0002](0002-astro-static-site.md)), so something outside the static build has to send enquiries to Dr Izon by email. Enquiries may contain health information, which is special-category data under UK GDPR.

## Decision

Not yet made. It depends on confirming the hosting platform (`.vercel/` in `.gitignore` suggests Vercel). Whichever option is chosen must have:

- UK or EU data handling with a data processing agreement, and minimal or no retention of submissions
- spam protection, such as a honeypot field and/or Cloudflare Turnstile
- the provider named in the privacy policy

## Alternatives considered

- **Hosted form service (Formspree, Web3Forms, Basin and similar).** The form posts straight to the service, which emails Dr Izon. The site stays fully static, but data handling depends on the provider.
- **Astro server route plus an email API (Resend, Postmark).** One on-demand route validates the form and sends the email. More control over validation, spam handling and storage, but needs a host that runs server functions.
- **`mailto:` link only.** No service needed, but no structured enquiry, no consent capture, and it depends on the visitor having a mail client set up.

## Consequences

Contact form delivery (#12) is blocked until this is decided.
