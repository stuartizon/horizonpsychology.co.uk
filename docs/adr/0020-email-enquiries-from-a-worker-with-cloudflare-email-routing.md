# 0020. Email contact form enquiries from a Worker with Cloudflare Email Routing

Date: 2026-10-08

## Context

The contact form posts to `/api/enquiry`, and something outside the static build has to email the enquiry to Emma. Enquiries may contain health information, which is special-category data under UK GDPR, so as few services as possible should handle them and none should keep them.

The domain's email already runs through Cloudflare Email Routing, which forwards mail for the domain to Emma's personal inbox. A Worker's `send_email` binding can send email through Email Routing for free, but only to a verified destination address. Pages Functions can't use that binding ([0015](0015-host-on-cloudflare-pages-deployed-from-github-actions.md)), but they can call a Worker through a service binding.

## Decision

- A Worker, `horizonpsychology-enquiry-email` in `workers/enquiry-email/`, sends each enquiry as one plain-text email through the `send_email` binding. It has no public URL; the site's Pages Function calls it through a service binding. It doesn't store enquiries or log what they say.
- The email is from `noreply@horizonpsychology.co.uk`, with the visitor's address as Reply-To. It's delivered to Emma's verified personal address but addressed in its `To:` header to `emma@horizonpsychology.co.uk`, so her email program replies from that address.
- The personal address it's delivered to is a GitHub Actions secret, never in the repo, and CI uploads it with each deploy.
- CI deploys the Worker before the Pages site. Pull requests deploy a separate preview Worker, `horizonpsychology-enquiry-email-preview`, which emails Stuart, never Emma. Every pull request shares it, so it runs the code from whichever pull request deployed last.
- The `CLOUDFLARE_API_TOKEN` secret also has the Workers Editor role, limited to the two enquiry Workers. It can deploy them but not create Workers, so each was first deployed by hand.

## Alternatives considered

- **A hosted form service, such as Formspree or Basin.** The least code, but enquiries would be kept on another company's servers, mostly in the US, with retention and logging we can't control or test.
- **A third-party email API, such as Resend or Postmark.** The same control as sending through Cloudflare, but it adds another processor, account and API key. It's only needed to email visitors, which the site doesn't do.
- **Cloudflare Email Sending.** It can send to any address, but needs the paid Workers plan, and the form only emails the practice.
- **A `mailto:` link only.** No structured enquiry and no consent, and it relies on the visitor having an email program set up.

## Consequences

- Sending enquiries is free, and Cloudflare is the only service that handles them. It already hosts the site and routes the domain's email.
- The Worker can only email verified Email Routing addresses. Emailing visitors, such as an automatic acknowledgement, would mean Email Sending on the paid plan or another provider.
- Some Cloudflare setup is done by hand, outside the repo, and listed in the README, such as Email Routing and DNS.
- Replying from `emma@` needs Gmail set up to send as that address, which the domain's SPF record allows.
