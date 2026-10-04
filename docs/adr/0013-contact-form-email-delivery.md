# 0013. Contact form email delivery

- **Date:** 2026-10-04
- **Issue:** #12

## Context

The redesign adds a contact form (name, email, topic, online or face-to-face, message, privacy consent). The site is static ([0002](0002-astro-static-site.md)), so something outside the static build has to send enquiries to Dr Izon by email. Enquiries may contain health information, which is special-category data under UK GDPR.

## Options

1. **Hosted form service** (for example Formspree, Web3Forms or Basin). The form posts directly to the service, which emails Dr Izon. The site stays fully static and there's no server code. Data handling depends on the provider.
2. **Astro server route plus an email API** (for example Resend or Postmark). One on-demand route via the hosting adapter validates the form and sends the email. This gives more control over validation, spam handling and what's stored, but needs a host that runs server functions. `.vercel/` is in `.gitignore`, which suggests Vercel hosting, but that isn't confirmed.

## Requirements for whichever option is chosen

- UK or EU data handling with a data processing agreement, and minimal or no retention of submissions.
- Spam protection, such as a honeypot field and/or Cloudflare Turnstile.
- The provider is named in the privacy policy.

## Decision

To be decided once the hosting platform is confirmed.
