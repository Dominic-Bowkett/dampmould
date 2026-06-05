# Damp & Mould / Awaab's Law Compliance Hub

Static **Astro** content site for the UK damp & mould / Awaab's Law niche,
deployed to **Cloudflare Pages**. See [`CLAUDE.md`](./CLAUDE.md) for the full
project brief (the source of truth) and [`docs/`](./docs) for strategy notes.

## Stack

- **Astro** (static output, zero JS by default) + **MDX** content + **sitemap**
- Plain CSS with design tokens (`src/styles/tokens.css`)
- **Cloudflare Pages Functions** for serverless lead capture (`functions/api/lead.js`)
- JSON-LD schema helpers in `src/lib/schema.ts`

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # static build → dist/
npm run preview  # preview the built site
npx astro check  # type-check
```

## Project layout

```
functions/api/lead.js      Serverless lead/referral handler (stub — wire endpoint before launch)
src/components/            BaseHead, Header, Footer, AuthorBox, Breadcrumbs, FAQ,
                           LeadForm, CompensationCalculator (stub), Schema
src/layouts/              BaseLayout, ArticleLayout
src/content/              Content Collections (config.ts + awaabs-law / tenants / professional)
src/pages/                index.astro (placeholder), [...slug].astro (renders collections)
src/lib/schema.ts         JSON-LD builders (Article, Person, FAQ, HowTo, Breadcrumb)
src/config.ts             Site name, author E-E-A-T data, nav, footer links
```

## Deploy (Cloudflare Pages)

Connect the Git repo to Cloudflare Pages:

- **Build command:** `npm run build`
- **Output directory:** `dist`
- Functions in `/functions` deploy automatically.

## Before launch

Domain is set to **dampmouldhub.com** (canonicals, sitemap, robots, schema) and
the enquiry forms email **help@dampmouldhub.com**. Remaining pre-launch items are
in `CLAUDE.md` §11 / `docs/SEO-AUDIT.md` §6 (GA4 ID, Search Console token,
solicitor referral partner, real OG PNG, complete the privacy notice, Lighthouse
+ schema validation).

## Build progress

- [x] **1–4.** Scaffold, config, base layout, components, content schema
- [x] **5.** Home + About
- [x] **6.** Pillar A — Awaab's Law (4 pages)
- [x] **7.** Pillar B — tenant help (4 pages) + compensation calculator + lead form
- [x] **8.** Pillar C — HHSRS hub + surveyor/specialist/survey/careers/courses (8 pages)
- [x] **9.** /tool, /privacy, /contact + OG image (no broken internal links; 21 pages)
- [x] **10.** SEO pass (titles/meta/keywords/schema/interlinking) — see `docs/SEO-AUDIT.md`
- [x] **+ Advice cluster** — `/advice/` (15 pages, KEYWORDS.md §B); site now 36 pages
