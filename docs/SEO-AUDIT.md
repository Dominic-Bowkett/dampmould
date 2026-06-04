# SEO Audit & Checklist — Damp & Mould Hub

_Last run: 2026-06-04 · against `KEYWORDS.md` (Ahrefs UK, June 2026) · 21 pages built._

This is the step-10 SEO pass. It records what was checked, what passed, what was
fixed, and what still needs doing before/after launch.

---

## 1. Scorecard (current state)

| Area | Status | Notes |
|---|---|---|
| **Unique `<title>` per page** | ✅ | All 21 pages; primary keyword in title; brand suffix "Damp & Mould Hub". |
| **One `<h1>` per page** | ✅ | Verified 1 per page sitewide. |
| **Meta description per page** | ✅ | Unique, ~150–180 chars, leads with primary keyword. |
| **Canonical URLs** | ✅ | Self-referencing canonical on every page (`REPLACE_DOMAIN`). |
| **Open Graph + Twitter cards** | ✅ | Title/desc/image/url on every page; default OG image set. |
| **JSON-LD schema** | ✅ | 21/21 valid: `Organization` + `Person` everywhere; `Article` + `BreadcrumbList` + `FAQPage` on articles; `HowTo` on step pages; `WebSite` on home. |
| **Heading hierarchy** | ✅ | Logical H1 → H2 → H3; no skipped levels. |
| **Internal linking** | ✅ | 0 broken links; every content page ≥5 inbound internal links (no orphans). |
| **XML sitemap** | ✅ | `sitemap-index.xml` (21 URLs), auto-generated. |
| **robots.txt** | ✅ | Allows all; references sitemap. |
| **Mobile-first / responsive** | ✅ | Built mobile-first; system font stack; zero-JS by default. |
| **Image alt text** | ✅ | Author photo + favicon have alt/aria. |
| **Lighthouse ≥95** | ⏳ | Run on the live preview (can't run in the build sandbox). Architecture is built for it — see §4. |
| **OG image (raster)** | ⚠ | Currently SVG. Replace with 1200×630 PNG before launch (some platforms ignore SVG OG). |

---

## 2. Keyword coverage vs KEYWORDS.md §A

Primary keyword placement — T = title, M = meta, H = H1, B = first 100 words.
"≈" = covered by natural phrasing rather than a literal contiguous match (correct
practice — we don't keyword-stuff).

| Page | Primary keyword | T/M/H/B |
|---|---|---|
| `/awaabs-law` | awaab's law | ✅✅✅✅ |
| `/awaabs-law/timescales` | awaab's law timescales | ✅✅✅✅ |
| `/awaabs-law/private-landlords` | awaab's law private landlords | ≈ (all terms; "Does Awaab's Law apply to private landlords?") |
| `/awaabs-law/social-housing` | awaab's law social housing | ≈ ("Awaab's Law for Social Housing Landlords") |
| `/tenants/damp-mould-rights` | tenants' rights damp and mould uk | ≈ ("Tenants' Rights on Damp and Mould (UK)") |
| `/tenants/compensation` | how much compensation for damp and mould uk | ✅ (punctuation only break) |
| `/tenants/how-to-claim` | compensation for damp and mould | ✅✅✅✅ |
| `/tenants/find-a-solicitor` | damp and mould solicitors | ✅✅✅✅ |
| `/hhsrs` | hhsrs | ✅✅✅✅ |
| `/hhsrs/inspection` | hhsrs inspection | ✅✅✅✅ |
| `/hhsrs/training` | hhsrs training | ✅✅✅✅ |
| `/damp-mould-surveyor` | damp and mould surveyor | ✅✅✅✅ |
| `/find-a-specialist` | damp and mould specialist near me | ≈ (title "near you"; body has "near me") |
| `/damp-mould-survey` | damp and mould survey | ✅✅✅✅ |
| `/become-a-damp-mould-surveyor` | damp and mould surveyor jobs | ≈ ("How to Become a Damp and Mould Surveyor"; "jobs" in meta) |
| `/training-courses` | damp and mould training courses | ✅✅✅✅ |

**Secondary keywords** are woven into H2s/FAQs (e.g. tenant rights page now answers
"damp in house who to call" and "does house insurance cover damp"). HHSRS pages
cover "housing health and safety rating system", "hhsrs categories/hazards/assessment".

---

## 3. What was fixed in this pass

- Spelled out **"damp and mould"** (not "&") in keyword-bearing page titles/H1s to
  exact-match the search queries, keeping the "Damp & Mould Hub" brand suffix.
- Retitled the tenant pillar to **"Tenants' Rights on Damp and Mould (UK)"**.
- Rewrote meta descriptions to **lead with the primary keyword** and sit ~155–170 chars.
- Shortened the over-long `/damp-mould-surveyor` title (85 → 62 chars).
- Added two **secondary-keyword FAQs** to the tenant rights page (now in FAQPage schema).

---

## 4. Lighthouse — run this on the preview

Can't run in the sandbox (no browser). The build is designed to score 95+:
static HTML, **zero JS by default** (only tiny inline islands for the nav toggle,
lead form and calculator), system fonts (no webfont download), lazy-loaded images,
and minimal CSS. To verify:

1. Deploy the preview (Cloudflare Pages / `wrangler pages deploy dist`).
2. Chrome DevTools → Lighthouse → Mobile → analyse a content page (e.g. `/awaabs-law`).
3. Expect ≥95 on Performance/SEO/Best Practices/Accessibility. Likely only flag:
   the SVG OG image (replace with PNG) and `REPLACE_DOMAIN` (swap for real domain).
4. Validate schema: paste a few URLs into Google's **Rich Results Test** and the
   **Schema Markup Validator** — expect Article, FAQ, HowTo, Breadcrumb to pass.

---

## 5. Biggest opportunity: the advice cluster (KEYWORDS.md §B) — NOT yet built

This is the largest untapped win and is **not in the current 21 pages**. The data
shows big, easy, on-strategy informational volume that pulls worried tenants AND
homeowners/landlords and converts to the surveyor service / tool:

| Proposed page | Primary keyword | Vol | KD | CPC |
|---|---|---|---|---|
| `/advice/condensation` | condensation | 10,000 | 8 | £10 |
| `/advice/rising-damp` | rising damp | 8,500 | 9 | — |
| `/advice/condensation-on-windows` | condensation on windows | 4,900 | 2 | £6 |
| `/advice/types-of-damp` | penetrating damp | 2,300 | 1 | — |
| `/advice/how-to-get-rid-of-mould-on-walls` | how to get rid of mould on walls permanently | 1,700 | 0 | £25 |
| `/advice/mould-in-bedroom` | how to get rid of mould in bedroom | 500 | 5 | £25 |
| `/advice/mould-on-ceiling` | how to get rid of mould on ceiling | 350 | 0 | £15 |
| `/advice/what-causes-damp` | what causes damp in a house | 300 | 8 | — |
| `/advice/damp-smell` | how to get rid of damp smell in house | 250 | 0 | — |
| `/advice/what-causes-mould-on-walls` | what causes mould on walls | 250 | 14 | £10 |
| `/advice/mould-bathroom-ceiling` | how to get rid of mould on bathroom ceiling | 200 | 0 | £30 |
| `/advice/how-to-treat-a-damp-wall` | how to treat a damp wall | 200 | 3 | — |
| `/advice/is-mould-dangerous` | mould health risks | ~200 | low | — |
| `/advice/damp-proofing-cost` | how much to damp proof a house | 250 | 0 | — |

**Recommended build:** a new `/advice/` content collection, same templates. "How to"
pages get **HowTo schema** + numbered steps; each interlinks to the relevant
compliance/service page (mould advice → `/damp-mould-surveyor`; tenant angle →
`/tenants/compensation` & `/awaabs-law`). Health content (`is-mould-dangerous`) is
YMYL — cite NHS/gov.uk and flag claims for Dom. **Excluded:** product-brand terms
(mould magic, anti-mould paint, cillit bang) — affiliate mentions only, no pages.

Tier-1 first (KD ≤2): mould on walls permanently, condensation on windows,
penetrating damp, damp and mould survey.

---

## 6. Pre-launch SEO TODOs

- [ ] Find-and-replace `REPLACE_DOMAIN` with the real domain (canonicals, sitemap, robots, schema).
- [ ] Replace SVG OG image with a 1200×630 PNG.
- [ ] Add GA4 measurement ID + Search Console verification token (placeholders in `BaseHead.astro`).
- [ ] Submit `sitemap-index.xml` in Search Console once live.
- [ ] Verify all `<!-- TODO -->` regulatory/health claims (timescales, HHSRS bands, insurance, mould health).
- [ ] Run Lighthouse on the live preview and the Rich Results Test on key pages.
- [ ] Complete the privacy notice before collecting real lead data.
