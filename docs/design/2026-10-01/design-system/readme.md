# Horizon Psychology — design system

Horizon Psychology is the private practice of **Dr Emma Izon** — Clinical Psychologist (PhD, DClinPsych), Cognitive Behavioural Psychotherapist, and researcher, trained at the University of Oxford. She is registered with the HCPC and accredited with the BABCP, with particular expertise in psychosis, bipolar disorder, trauma-informed practice and neurodiversity-affirming therapy.

Four services: **individual therapy, couples and partner therapy, clinical supervision, research supervision.** Sessions run **online or face-to-face in Buckinghamshire** — both carry the same care and confidentiality, and the site must never read as online-only. Online work has included clients in Israel and Hong Kong.

The audience is adults considering therapy for a specific difficulty, and professionals seeking supervision. The brief is short and firm: people should feel calm, not overwhelmed, and the practice should read as clinically credible without becoming clinical in tone.

There is one product: **the marketing website** (emmaizon.com, built in Astro, deployed at emmaizoncom.vercel.app).

## Sources
| Source | What was taken from it |
| --- | --- |
| `github.com/stuartizon/emmaizon.com` (branch `main`) | All copy, the four services and their fees, the FAQ set, the testimonials, and the eight icons in `src/icons/`. The logo, mark, favicon and photographs in `public/images/`. |
| `uploads/Website page (1).docx` | The brief: audience, tone, ethical requirements, publications, and the reference sites mentinatherapies.com, jennyhorman.co.uk, elizabethrubiolcsw.com. |

**This system is a design proposal, not a description of the live site.** The site was built without a design phase, and the brief asked to start from fundamentals with the structure open. The visual language here was designed from the brief; the content came from the repo unchanged.

---

## Content fundamentals

**Voice.** Three registers, each kept to its own block.

- *Practice voice* — third person, for credentials and biography: "Dr Emma Izon is a Clinical Psychologist, Cognitive Behavioural Psychotherapist, and researcher…"
- *Service voice* — first person plural, for what is offered: "We offer personalised therapy in a warm, safe, and confidential environment." The plural describes the practice, not only the person.
- *Invitation voice* — first and second person, warm and unhurried, wherever the reader has to decide something: "You may not be completely sure whether therapy is right for you — and that's okay."

A service page opens in service voice and answers questions in invitation voice. The two never mix inside a paragraph. Headings are statements rather than labels — the eyebrow carries the label, so the heading is free to be a sentence: "A space for support, understanding, and change", "Four ways of working together", "How Emma works".

**Rules that are not stylistic preferences.**
- Never guarantee or imply an outcome. Describe what happens in a session, not what it will fix.
- Non-pathologising language: people *have experiences of* psychosis. "Neurodivergent", "lived experience", "difficulties".
- Claims are evidence-based and attributable — every credential is a claim the practice must stand behind.
- State the limits of confidentiality wherever confidentiality is mentioned.
- Say plainly that therapy is not an emergency service, and give real crisis routes. This sits in the footer of every page.
- Testimonials are verbatim, attributed by first name only.
- Repeat the practical facts wherever they matter: the free 15-minute call, the reply within 5 working days, the fee, the 48-hour cancellation policy, online or face-to-face in Buckinghamshire.

**Mechanics.** UK English. Sentence case everywhere — headings, buttons, card titles, names. The **eyebrow is the only uppercase text in the system**, and CSS sets it. No exclamation marks, no emoji, no rhetorical questions as headings. Fees read "£100 · 50 minutes". Registrations are given in full on first use with the acronym in brackets.

---

## Visual foundations

**Colour.** Sage is the brand, sand is the warmth, and the paper is never white. **Sage** `50 #eef3ef` · `100 #dde8e1` · `300 #a8c2b4` · `600 #4f7264` · `800 #2c453c` — 600 for the primary button, icons and links; 800 for headings; 50 for icon discs and detail panels. **Sand** `100 #f2e8d9` · `300 #dcc6a6` · `600 #9a7a55` · `800 #6b543a` — notices, stars, fee lines, and nothing else. **Paper** `#f8f6f1` for the page, white for cards, cream `#f3efe7` for quiet panels and the footer, hairlines `#e4dfd4`. **Ink** `#23302c` for body, `#5c6b64` for secondary. No pure black, no pure white page.

Three surfaces, each with a job: white cards for anything the reader acts on, cream panels for quiet content, sage panels for practical detail (fee, format, what happens next).

**Background.** Two soft diagonal tints fixed behind every page — sage at 10% from the top left, sand at 9% from the bottom right, each fading out before the middle of the page. Nearly invisible, and the reason flat white never appears.

**Type.** **Lora** for display, at **regular weight in sentence case** — hero `clamp(2.3rem, 4.4vw, 3.5rem)`, h1, h2, and the italic quotations. **Source Sans 3** for body at 17px/1.65, lead paragraphs at 1.15rem, small copy at 0.95rem, captions at 0.85rem. Prose is capped at 64 characters. The eyebrow is body font at 0.78rem, weight 600, tracking 0.14em, uppercase, sage-600.

**Layout.** 1080px of content inside a fluid 20–48px gutter. Sections are separated by 72–128px — the whitespace is doing the calming, so do not compress it. The recurring pattern is an asymmetric two-column split: a section heading on the left, content on the right. Services sit in a 2×2 grid rather than a row of four, so descriptions stay readable. Everything collapses to one column at 900px.

**Shape.** 8px on fields, 16px on cards, 20px on panels and images, pills on buttons and badges. Two shadows only: `--shadow-rest` at 1px, and `--shadow-raised` at `0 14px 34px -22px`, both tinted sage rather than black.

**Interaction.** Cards rise 3px onto the raised shadow with the border shifting to sage-300, over 220ms on `cubic-bezier(0.22, 0.61, 0.36, 1)`. Buttons darken sage-600 → sage-800. FAQ pluses rotate 135° into a cross while the answer opens to its measured height. Links move to sage-800. Focus is a 2px sage-800 outline at 3px offset. **Nothing autoplays, nothing scales, nothing bounces**, and `prefers-reduced-motion` removes all of it.

**Imagery.** Wide crops at 20px radius: trees, water, cloud, light on a horizon — the subjects named in the brief, which also echo the practice name. Cool-warm neutral, soft, never bright or smiling stock. One portrait of Emma; nothing else with a face in it. **All three image files here are placeholders and read as AI-generated — they should be replaced with real photography.**

---

## Iconography

Eight SVGs in `assets/icons/`: `individual-therapy`, `couples-therapy`, `clinical-supervision`, `research-supervision`, `arrow`, `star`, `burger`, `close`. The four service marks are placeholders from the practice's repo; the four UI icons are **Phosphor** (MIT) — `caret-right`, `list`, `x` at Regular weight, and `star` at Fill weight, since a star is a quantity and needs a filled/empty distinction. `Icon` masks the file so it takes `currentColor`.

Service icons render at 26px inside a 52px sage-50 disc, tinted sage-600 — lighter than the solid sage disc with a white mark used today. Stars 17px in sand-600, burger and close 24px in sage-800. The FAQ toggle is two CSS bars rather than an icon file, because it has to rotate into a cross.

Generic UI icons come from Phosphor Regular — outline, because the system is built on hairlines and whitespace and filled icons would be the heaviest ink on the page. Emoji are never used as icons. A new *service* icon should be drawn to match those four; a new *UI* icon should be taken from Phosphor Regular rather than drawn.

**The logo and mark are placeholders** per the brief, so the header pairs the mark with the practice name set in Lora; a real mark can replace the image without changing the lockup.

---

## Components

**Core** — `Button`, `SectionHeading`, `Container`, `CredentialBadge`, `StarRating`, `Icon`, `Callout`
**Content** — `ServiceCard`, `TestimonialCarousel`, `TestimonialCard`, `Quote`, `Faqs`, `PublicationItem`
**Navigation** — `Navbar`, `MobileMenu`
**Footer** — `Footer`
**Forms** — `FormField`, `Input`, `Textarea`, `Select`, `Checkbox`

Each directory holds `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md`, and one `@dsCard` HTML showing its states.

`SectionHeading` and `Quote` carry the type system: the eyebrow-plus-sentence heading, and the standalone Lora line. There is deliberately no `Carousel` — the testimonials sit in a grid, because autoplay works against the calm the brief asks for.

---

## Website structure

**Header** (sticky, translucent) — About · Therapy · Supervision · Research · Contact, with **Book a free call** as the only persistent action. The brand link always goes home. Below 950px the links become a burger opening a full-screen menu on the same paper.

**Home** — a stated hero with two actions and three credential pills; a short about summary; the positioning quote on cream; four service cards each showing its fee; four testimonials; four FAQs.

**Service pages** — one template: heading, lead, two or three paragraphs, and a sage panel carrying fee, duration, practicalities and the call to action. Then four FAQs and a link to the full set.

**About** — biography with portrait, practice statement, therapeutic approach.

**Research** — publications in APA order, with ResearchGate and Academia.edu links.

**Contact** — the free-call enquiry form, the email address, the online/face-to-face choice, and the crisis note.

**Footer** — grouped into Work together / Practice / Practical, closed by the registration and crisis line.

### Structural changes from the live site
1. **Nav grouped into four sections** rather than five service links, freeing room for Research and Contact.
2. **The homepage leads with a statement**, not the logo lockup and tagline.
3. **Fees moved onto the service cards** — cost is the most common unasked question, and putting it on the card removes a click.
4. **Four FAQs per page** instead of twelve repeated on every service page; the full set goes on one FAQ page.
5. **`/contact/`, `/schedule/` and `/research/` were stubs.** Contact and Research are designed here, and Schedule is folded into Contact — "Book a free call" and "Contact" were two doors to one room.
6. **A crisis line now exists**, in the footer of every page.
7. **Testimonials are static.** The carousel is gone; nothing autoplays.
8. **Couples therapy fee differs between sources** — the brief says £130, the code says £120. The kit shows £120; worth confirming.

---

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | The one stylesheet consumers link; `@import`s everything below |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `shape.css`, `motion.css`, `base.css` |
| `assets/` | `logo-mark.svg`, `favicon.svg`, `icons/` (8 SVGs), `imagery/` (3 placeholders). The full lockup is the `Logo` component, not a file — it sets real Lora |
| `components/brand/` | Logo — the locked lockup, its wordmark and mark variants |
| `components/core/` | Button, SectionHeading, Container, CredentialBadge, StarRating, Icon, Callout |
| `components/content/` | ServiceCard, TestimonialCarousel, TestimonialCard, Quote, Faqs, PublicationItem |
| `components/navigation/` | Navbar, MobileMenu |
| `components/footer/` | Footer |
| `components/forms/` | FormField, Input, Textarea, Select, Checkbox |
| `guidelines/` | Specimen cards: colour, type, spacing, shape, motion, brand |
| `ui_kits/website/` | Click-through prototype — start at `index.html` |
| `thumbnail.html` | Homepage tile for this design system |
| `SKILL.md` | Agent Skills entry point |
| `github.md` | Source repository association and sync record |

## Known gaps
- **No real photography.** The three images are placeholders and look it.
- **Logo and mark are placeholders** per the brief; the wordmark is set in Lora beside the mark.
- **Source Sans 3 is a proposal.** Lora is already a site dependency; Source Sans 3 is new, chosen for a plain, highly legible body face. Both load from Google Fonts here rather than the npm packages the site uses.
- **Legal pages are linked but not designed** — privacy policy, confidentiality statement, complaints procedure, terms. They need real content first, and insurers or the HCPC may dictate wording.
- **Blog/resources, testimonials and FAQ pages** are in the footer but not built.
- **The Astro codebase is the implementation target.** These React components are the specification; ship by editing the `.astro` files.
