# CLAUDE.md — Damp & Mould / Awaab's Law Compliance Hub

> Project brief for Claude Code. This file is the single source of truth. Build a fast, static, SEO-optimised content site for the UK damp/mould + Awaab's Law niche, authored under a credentialed surveyor for E-E-A-T. Read this whole file before scaffolding.

---

## 0. TL;DR for the agent

Build an **Astro** static site, deployed to **Cloudflare Pages**, content in **Markdown/MDX**, with **JSON-LD schema**, a **client-side compensation calculator**, and **serverless form handlers** for lead capture. ~25 pages across 3 content pillars. No CMS, no database, no WordPress. Prioritise Lighthouse 95+ on performance/SEO/accessibility. Build mobile-first (most traffic is phone users).

Start by scaffolding the project structure in §4, then build the base layout (§5), then pages in the priority order in §9.

---

## 1. What this site is

A practitioner-authored content hub targeting the UK "Awaab's Law" / damp & mould compliance wave. It serves three audiences and monetises each:
- **Tenants** — traffic engine; monetise via housing-disrepair solicitor referrals.
- **Landlords** — compliance buyers; monetise via services, templates, and a tool.
- **Professionals / career-seekers** — monetise via CPD courses.

The author is **Dominic Bowkett, CertDEA, BA Hons, GDL, MSc, MRPSA (Trustmark)** — a real Domestic Energy Assessor and building surveyor. His credentials are the trust signal that lets a new domain rank in this YMYL ("Your Money or Your Life") niche. Author bio, photo placeholder, and credentials must appear on every article.

**Scope: England-first.** Awaab's Law differs in Scotland/Wales — note this on-page; nation pages come later.

---

## 2. Tech stack (do not substitute without asking)

- **Framework:** Astro (latest stable). Chosen for zero-JS-by-default static output, Markdown content, component islands for the interactive bits, and excellent Lighthouse scores.
- **Styling:** plain CSS with custom properties (design tokens in §6), or Tailwind if preferred — but keep the bundle minimal. No heavy UI frameworks.
- **Content:** Markdown/MDX files in `src/content/`, using Astro Content Collections with typed frontmatter schemas.
- **Interactivity:** Astro islands (vanilla JS or a tiny framework only where needed). The compensation calculator is client-side only.
- **Forms / lead capture:** Cloudflare Pages Functions (serverless) posting to email/CRM. Stub the handler; leave a clear TODO for the endpoint/API key.
- **Hosting/deploy:** Cloudflare Pages from Git. Include `wrangler`/Pages config and a build command.
- **Analytics:** placeholder for Google Analytics 4 + Search Console verification meta tag (leave TODO for IDs).
- **No:** WordPress, databases, server-rendered CMS, localStorage for critical data, client-side API keys.

---

## 3. Non-negotiable quality bars

1. **Performance:** Lighthouse ≥95 mobile. No render-blocking JS. Lazy-load images. System font stack or one preloaded webfont max.
2. **SEO:** unique title + meta description per page; canonical URLs; semantic HTML5; one H1 per page; logical heading hierarchy; internal links between pillar and cluster pages; XML sitemap; robots.txt; Open Graph + Twitter cards.
3. **Schema (JSON-LD):** `Article` + `Person` (author w/ credentials) on every article; `FAQPage` where FAQs exist; `HowTo` on step-by-step pages; `BreadcrumbList` sitewide; `LocalBusiness`/`Service` on service pages.
4. **Accessibility:** WCAG AA. Proper landmarks, alt text, focus states, colour contrast.
5. **Mobile-first.** Design for a phone screen first; enhance up.
6. **Trust/E-E-A-T:** author box on every article (name, credentials, bio, link to about page); "last reviewed" date; cite official sources (gov.uk, legislation.gov.uk) where claims are legal/regulatory.

---

## 4. Project structure to scaffold

```
/
├── CLAUDE.md                  # this file
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── public/
│   ├── robots.txt
│   ├── favicon.svg
│   └── images/                # author photo, OG images (placeholders ok)
├── functions/                 # Cloudflare Pages Functions (serverless)
│   └── api/
│       └── lead.js            # POST handler for lead/referral forms (stubbed)
└── src/
    ├── content/
    │   ├── config.ts          # Content Collections schema (typed frontmatter)
    │   ├── awaabs-law/        # Pillar A markdown
    │   ├── tenants/           # Pillar B markdown
    │   └── professional/      # Pillar C markdown
    ├── components/
    │   ├── BaseHead.astro     # meta, title, canonical, OG, schema slot
    │   ├── Header.astro
    │   ├── Footer.astro
    │   ├── AuthorBox.astro     # Dom's credentials block (reused everywhere)
    │   ├── Breadcrumbs.astro
    │   ├── FAQ.astro           # renders FAQ + emits FAQPage JSON-LD
    │   ├── LeadForm.astro      # email capture / referral form → /api/lead
    │   ├── CompensationCalculator.astro  # client-side island
    │   └── Schema.astro        # JSON-LD helpers (Article, Person, HowTo, etc.)
    ├── layouts/
    │   ├── BaseLayout.astro
    │   └── ArticleLayout.astro # wraps content, injects AuthorBox + schema + breadcrumbs
    ├── pages/
    │   ├── index.astro
    │   ├── about.astro         # author authority page
    │   ├── [...slug].astro     # renders content collections
    │   └── sitemap (via @astrojs/sitemap)
    └── styles/
        └── tokens.css          # design tokens (§6)
```

Use `@astrojs/sitemap` and `@astrojs/mdx`. Add `astro-seo` or hand-roll meta in `BaseHead.astro`.

---

## 5. Base layout & components — requirements

- **BaseHead.astro:** accepts `title`, `description`, `canonical`, `ogImage`, and a `schema` prop (array of JSON-LD objects) rendered as `<script type="application/ld+json">`. Includes GA4 + Search Console placeholders.
- **ArticleLayout.astro:** renders frontmatter (title as H1, last-reviewed date), breadcrumbs, the MDX body, an `AuthorBox`, related-links block (internal linking), and a contextual CTA (LeadForm or course link depending on `audience` frontmatter field).
- **AuthorBox.astro:** "Written by Dominic Bowkett, CertDEA · BA Hons · GDL · MSc · MRPSA Trustmark — Domestic Energy Assessor & Building Surveyor" + 2-line bio + link to /about. Emits `Person` schema with `hasCredential`.
- **Content schema (config.ts):** frontmatter = `title, description, pillar (a|b|c), audience (tenant|landlord|professional), targetKeyword, lastReviewed (date), faqs (optional array), howToSteps (optional array), cta (referral|course|service|tool)`.

---

## 6. Design tokens (clean, trustworthy, NOT the brewery-tours neo-brutalist style)

This niche needs calm, credible, professional — think reassuring authority, not bold/playful. Anxious tenants and compliance-minded landlords must trust it instantly.

```css
:root {
  /* Calm, professional palette */
  --color-bg: #ffffff;
  --color-surface: #f5f7f8;
  --color-ink: #1a2b33;          /* near-black slate */
  --color-muted: #5a6b73;
  --color-primary: #0f6e8c;       /* trustworthy teal-blue */
  --color-primary-dark: #0a4f66;
  --color-accent: #1d8a6e;        /* calm green for positive CTAs */
  --color-warn: #b4541a;          /* muted amber for deadlines/warnings */
  --color-border: #dde4e7;

  --font-sans: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --font-heading: var(--font-sans); /* or one preloaded webfont, e.g. "Inter" */

  --radius: 10px;
  --shadow: 0 1px 3px rgba(0,0,0,.06), 0 4px 12px rgba(0,0,0,.04);
  --maxw: 720px;                  /* readable article measure */
}
```

Layout: single readable column (~720px) for articles, generous line-height (1.6), clear headings, prominent but not garish CTAs. Fast and clean over flashy.

---

## 7. The interactive pieces

- **CompensationCalculator.astro (client island):** inputs = monthly rent, months affected, severity (minor/moderate/severe), whether reported to landlord. Output = an *indicative* compensation range with a clear disclaimer ("indicative only, not legal advice") and a CTA to the referral LeadForm. Pure client-side JS, no backend. This is a lead magnet on the tenant compensation pages.
- **LeadForm.astro → /functions/api/lead.js:** name, email, postcode, situation, audience-type. Serverless handler validates and forwards (stub: log + TODO for email/CRM/partner endpoint). Honeypot + basic rate-limit note.
- **Template downloads:** static PDF/files in `/public/downloads/`, gated behind LeadForm (email-to-unlock pattern, client-side reveal after submit).
- **Tool (later phase, separate build):** a Damp & Mould Inspection & Report Generator PWA lives at a subdomain/path and is *linked from* the content. Do NOT build it in this repo's first pass — leave a placeholder "/tool" landing page with email capture. (Architecturally: PWA + serverless functions, matching Dom's existing PWAs.)

---

## 8. Full page list (build as Markdown content entries)

### Pillar A — Awaab's Law (collection: awaabs-law)
| Slug | H1 / Title | targetKeyword |
|---|---|---|
| `/awaabs-law` | What is Awaab's Law? Complete Guide (2026) | awaab's law |
| `/awaabs-law/timescales` | Awaab's Law Timescales & Deadlines Explained | awaab's law timescales |
| `/awaabs-law/private-landlords` | Does Awaab's Law Apply to Private Landlords? | awaab's law private landlords |
| `/awaabs-law/social-housing` | Awaab's Law for Social Housing Landlords | awaab's law social housing |

### Pillar B — Tenant help (collection: tenants)
| Slug | H1 / Title | targetKeyword |
|---|---|---|
| `/tenants/damp-mould-rights` | Damp & Mould: Your Rights as a Tenant (UK) | tenants' rights damp and mould uk |
| `/tenants/compensation` | How Much Compensation for Damp & Mould? + calculator | how much compensation for damp and mould uk |
| `/tenants/how-to-claim` | How to Claim Compensation for Damp & Mould | compensation for damp and mould |
| `/tenants/find-a-solicitor` | Damp & Mould Solicitors: How to Find Help | damp and mould solicitors |

### Pillar C — Landlord & professional (collection: professional)
| Slug | H1 / Title | targetKeyword |
|---|---|---|
| `/hhsrs` | HHSRS Explained: The Complete Guide | hhsrs |
| `/hhsrs/inspection` | HHSRS Inspection Guide (Step by Step) | hhsrs inspection |
| `/hhsrs/training` | HHSRS Training & Qualifications | hhsrs training |
| `/damp-mould-surveyor` | Damp & Mould Surveyor: What They Do & When to Hire | damp and mould surveyor |
| `/find-a-specialist` | Find a Damp & Mould Specialist Near You | damp and mould specialist near me |
| `/damp-mould-survey` | Damp & Mould Survey Explained | damp and mould survey |
| `/become-a-damp-mould-surveyor` | How to Become a Damp & Mould Surveyor | damp and mould surveyor jobs |
| `/training-courses` | Damp & Mould Training Courses | damp and mould training courses |

### Sitewide
`/` (home — routes the 3 audiences), `/about` (author authority page), `/tool` (placeholder + email capture), `/privacy`, `/contact`.

For first pass: generate each page with a proper H1, intro, well-structured H2/H3 sections, an FAQ block (3–5 Qs) where natural, internal links to sibling/pillar pages, and the right CTA. Write genuinely useful, accurate, practitioner-toned content — but insert `<!-- TODO: Dom to verify legal specifics / latest dates -->` on any regulatory claim (timescales, legal duties) so Dom reviews before publish. Do not fabricate statistics or case citations.

---

## 9. Build order

1. Scaffold project (§4), install deps, config Astro + sitemap + mdx, set up Cloudflare Pages config.
2. Design tokens + BaseLayout + Header/Footer + BaseHead (schema plumbing).
3. AuthorBox, Breadcrumbs, FAQ, Schema helpers.
4. ArticleLayout + Content Collections schema (config.ts).
5. Home + About (author authority).
6. **Pillar A** all pages (the authority hub).
7. **Pillar B** + CompensationCalculator + LeadForm + /api/lead stub (traffic engine + monetisation).
8. **Pillar C** lead with /hhsrs (the under-served on-brand wedge).
9. /tool placeholder, /privacy, /contact, sitemap, robots.txt, OG images.
10. Lighthouse pass + fix; verify schema with validator; final internal-linking sweep.

---

## 10. Content tone & rules

- Authoritative but plain-English. Tenants are often anxious — be clear, calm, practical. Landlords/pros want precise compliance detail.
- Every regulatory claim flagged with a TODO for human verification; cite gov.uk / legislation.gov.uk.
- Compensation/legal content carries a visible "not legal advice" disclaimer.
- No dark patterns. Genuine value first; CTA second.
- British English throughout.

---

## 11. Things to leave as TODO (don't invent)

- GA4 measurement ID, Search Console verification token.
- Lead/referral endpoint + any API keys (server-side only, never client).
- Solicitor referral partner details (regulated — Dom to arrange).
- Course platform links (Gumroad/Teachable URLs).
- Final domain name (use `REPLACE_DOMAIN` placeholder in canonicals/sitemap).
- Author photo + real OG images.
- Exact legal timescales/figures — Dom verifies before publish.

---

## 12. Context the agent should know about the owner

Dom builds his own tools (Chrome extensions, PWAs, Python/PHP/Apps Script) and works in static HTML already (ukbrewerytours.com on Cloudflare Pages). He prefers concise, decisive sessions, clean deliverables, reasonable defaults accepted without over-explanation. He is technically literate but not a professional developer — keep code clean, commented where non-obvious, and explain any architectural choice in one line, not three paragraphs.
