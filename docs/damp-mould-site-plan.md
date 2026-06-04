# Damp & Mould / Awaab's Law Compliance Hub — Build Plan

*A practitioner-authored content + tool + training asset, built on a dedicated domain. Authored under Dominic Bowkett (CertDEA, BA Hons, GDL, MSc, MRPSA Trustmark) for credibility.*

---

## 1. The strategy in one paragraph

This site targets a regulatory wave ("Awaab's Law" grew from ~0 to ~10,000 UK searches/month in three years) in a niche where the money keywords have near-zero SEO difficulty because almost no one combines genuine practitioner authority with content/SEO skill. It serves three distinct audiences from one hub — **tenants** (the traffic engine), **landlords** (the compliance buyers), and **professionals/career-seekers** (your course buyers) — and monetises each differently. A self-built inspection/reporting tool acts as the high-margin conversion layer, distributed through the content rather than via (non-existent) generic-SaaS search demand. Your credentials are the moat.

---

## 2. Domain & positioning

- **Build on a fresh, brandable, category-matched domain** — not dominicbowkett.com (confirmed DR2.8, zero rankings, no equity to leverage, minor spam but nothing toxic). Examples to check availability: dampandmouldhelp.co.uk, awaabslawhelp.co.uk, mouldcompliance.co.uk. Favour a clean, trustworthy brand name over a keyword-stuffed one — tenant/landlord trust matters more than an exact-match nudge.
- **Scope: England-first.** Awaab's Law specifics differ in Scotland/Wales; note this explicitly on-page and add nation-specific pages later ("awaab's law scotland" already shows ~300/mo).
- **Author/E-E-A-T layer:** prominent "by Dominic Bowkett, CertDEA MSc MRPSA" authorship, photo, bio, credentials, and a linked professional about-page. This is what lets a fresh domain rank in a YMYL ("Your Money or Your Life") niche where Google weights demonstrated expertise heavily.
- **Tech: static HTML** (matches your ukbrewerytours.com / Cloudflare Pages workflow). Faster than WordPress — a real ranking advantage in a YMYL niche — plus near-zero hosting cost and no plugin/security upkeep. See §3a for the static stack and §9 for how the dynamic parts (tool, lead capture) attach without a CMS. Hand-author semantic HTML with schema markup (Article, FAQ, HowTo, LocalBusiness for service pages).

---

## 3a. Static stack & how the "dynamic" bits work without a CMS

A content + tool site doesn't need a database — separate the *static content* (99% of the site) from the few *interactive* pieces, which run client-side or as serverless functions.

**Build approach — pick one:**
- **Hand-authored HTML** (simplest; fine for ~25 pages) with shared header/footer via HTML includes or a tiny build step. Matches your brewery-tours build exactly.
- **Static site generator** if you want templating without repetition: **Astro** (best for content sites — ships zero JS by default, component-based, great Lighthouse scores), Eleventy (11ty), or Hugo (fastest builds). Astro is the strongest fit here — you write content in Markdown, it outputs static HTML, and you can drop interactive "islands" (the tool, calculators) into otherwise-static pages.

**Hosting:** Cloudflare Pages (you're already there) or Netlify — free tier, global CDN, automatic HTTPS, instant deploys from Git.

**The interactive pieces, without a CMS:**
| Feature | How it works statically |
|---|---|
| Compensation/eligibility calculators | Client-side JS in the page (no backend) — great lead magnets |
| Lead capture / email signup | Serverless form (Cloudflare Pages Functions, Netlify Forms) → your email/CRM |
| Solicitor-referral lead form | Same — serverless function posts to partner or your inbox |
| Template/PDF downloads | Static files, gated behind an email form |
| Course sales | Embed/redirect to your existing platform (Gumroad/Teachable) — no backend needed |
| Blog/content updates | Markdown files in Git → rebuild (Astro/11ty) |

**Content workflow:** write pages as Markdown, version-control in Git, push to deploy. This also makes the site Claude Code–friendly — you can scaffold and update pages programmatically, the way you work already.

---


Three content pillars, each mapped to an audience and a monetisation route. Difficulty (KD) and volume from Ahrefs (UK).

### PILLAR A — Awaab's Law explained (authority hub / top of funnel)
*Captures the brand term, feeds all three audiences, earns the links.*

| Page | Target keyword | Vol | KD |
|---|---|---|---|
| **Pillar: What is Awaab's Law? (complete guide)** | awaab's law | 4,900 | 19 |
| Awaab's Law timescales & deadlines | awaab's law timescales | 300 | low |
| Does Awaab's Law apply to private landlords? | awaab's law private landlords | 300 | low |
| Awaab's Law for social housing | awaab's law social housing | 150 | low |
| What is Awaab's Law? (plain-English short) | what is awaab's law | 150 | 13 |
| Awaab's Law Scotland / Wales (later) | awaab's law scotland | 300 | n/a |

### PILLAR B — Tenant help (traffic engine → solicitor referral revenue)
*Highest volume, lowest difficulty. Monetise via housing-disrepair solicitor/claims referrals.*

| Page | Target keyword | Vol | KD |
|---|---|---|---|
| **Pillar: Damp & mould — your rights as a tenant** | tenants' rights damp and mould uk | 600 | 10 |
| How much compensation for damp & mould? | how much compensation for damp and mould uk | 800 | 0 |
| How to claim compensation for damp & mould | compensation for damp and mould | 350 | 1 |
| Damp & mould claim — step by step | damp and mould claim | 150 | n/a |
| Damp & mould solicitors (directory/referral) | damp and mould solicitors | 100 | 0 |

### PILLAR C — Landlord & professional (compliance + services + courses + TOOL)
*Lower volume, high intent, high CPC. Monetise via tool, templates, services, and CPD courses.*

| Page | Target keyword | Vol | KD | CPC |
|---|---|---|---|---|
| **Pillar: HHSRS explained (the methodology hub)** | hhsrs | 700 | 15 | £60 |
| HHSRS inspection guide | hhsrs inspection | 150 | 3 | £70 |
| HHSRS training & qualification (→ course) | hhsrs training | 200 | 0 | £60 |
| Damp & mould surveyor (→ your service) | damp and mould surveyor | 400 | 0 | — |
| Find a damp & mould specialist near you | damp and mould specialist near me | 450 | 9 | — |
| Damp & mould survey explained | damp and mould survey | 250 | 1 | — |
| Become a damp & mould surveyor (→ course) | damp and mould surveyor jobs | 350 | 0 | — |
| Damp & mould training courses (→ course) | damp and mould training courses | 100 | 0 | — |

---

## 4. The tool (conversion layer — your unfair advantage)

**Don't** build a horizontal "property compliance software" SaaS chasing SEO — that search demand doesn't exist (top term ~50/mo). **Do** build a focused tool discovered *through the content*, not through search.

- **Architecture fits static perfectly:** build the tool as a **PWA** (exactly like your window-photogrammetry and mileage PWAs) — client-side app for the inspection flow, with a serverless function (Cloudflare/Netlify) only for the bits that need a backend (saving reports, auth, PDF generation, any Claude API calls). It lives at a subdomain or path (e.g. tool.yourdomain / yourdomain/app) and is linked *from* the content. No CMS, no server to maintain.
- **MVP: Damp & Mould Inspection & Report Generator** — guided mobile inspection (rooms, readings, photos), auto-generates a professional report mapped to HHSRS categories and Awaab's Law timescales. Squarely in your wheelhouse (cf. ET Helper, window photogrammetry PWA, EPC tools).
- **Secondary candidate: HHSRS scoring tool** — pure client-side calculator; the methodology is your core expertise and "hhsrs scoring sheet" / "worked examples" show demand. Cheap to build, strong lead magnet.
- **Pricing model:** freemium entry (one free report — "property inspection app free" has £170 CPC intent) → subscription for surveyors/landlords (£X/month). High CPCs (£350–500 on inspection-app terms) confirm willingness to pay.
- **Entry points on the tool funnel:** building condition survey template (£180 CPC), damp report template, HHSRS scoring sheet — offer these as lead-magnet downloads that upsell the tool.

---

## 5. Monetisation map (per audience)

1. **Tenants → referral fees.** Housing-disrepair solicitors/claims firms pay well for qualified leads. *Caveat: claims-management referral arrangements are regulated — verify the rules and choose SRA-regulated partners before building revenue here.*
2. **Landlords → services + tool + templates.** Your DEA/surveying services, paid templates, tool subscriptions.
3. **Professionals → CPD courses (already built).** Your Awaab's Law course suite + HHSRS training. Highest-margin, lowest-effort given the content already exists.
4. **Display/affiliate** as a baseline once traffic builds (the high CPCs make even modest ad revenue worthwhile).

---

## 6. Build sequence (priority order)

**Phase 1 — Foundation (weeks 1–4)**
- Register domain; set up Git repo, static stack (Astro recommended, or hand-authored HTML), Cloudflare Pages deploy, analytics, Search Console.
- Build page templates (header/footer/article/schema) once, so every new page is fast to add.
- Build author/about page + credentials (E-E-A-T).
- Publish Pillar A (Awaab's Law guide) + 2 supporting pages. This is the link-earning centrepiece.

**Phase 2 — Traffic engine (weeks 4–8)**
- Build out Pillar B (tenant cluster) — fastest to rank (KD 0–10), drives volume.
- Set up solicitor referral partnership(s).

**Phase 3 — Authority + monetisation (weeks 8–16)**
- Build Pillar C, lead with HHSRS hub (your strongest under-served, on-brand term).
- Wire in CPD course landing pages.
- Launch tool MVP as free report + email capture.

**Phase 4 — Compounding**
- Tool freemium→paid conversion live.
- Add nation/region pages, more long-tail.
- Light link-building: practitioner guest posts, trade-body citations, HARO-style expert commentary (Awaab's Law is newsworthy — pitch journalists as an expert source; earns high-DR editorial links).

---

## 7. Why this is defensible

Each layer needs something competitors lack: the content needs genuine practitioner authority (your credentials), the tool needs domain knowledge *plus* the ability to build it (you have both), the courses need standing to teach (you have it). It's a rare niche where your exact, unusual combination — UK property-compliance expertise + self-build software capability — is itself the barrier to entry.

## 8. Honest risks & caveats

- **Modest absolute volumes.** This is high-value-per-conversion, not high-traffic. The model works because each lead/sale/subscription is worth a lot — not because of floods of visitors.
- **Regulatory timing.** Awaab's Law demand may plateau once rules bed in. The durable asset is the audience, tool, and courses you build — not any single regulation. Diversify into the broader HHSRS/damp/surveying evergreen terms so you're not solely exposed to one news cycle.
- **Claims-referral regulation** (see §5.1) — get this right before monetising tenant traffic.
- **Fresh-domain ramp.** Expect 6–12 months to rank even on low-KD terms. Front-load content during that window so you're aged and indexed when it matters.
- **Data recency.** Ahrefs volumes are smoothed and partly back-filled; validate with Google Trends and Search Console once live.

---

## 9. Static-stack notes (the "no backend" reassurance)

Everything that *looks* like it needs a server has a static-friendly answer, so going static costs you nothing strategically:

- **SEO:** static HTML is *better* for SEO than WordPress, not worse — faster load, perfect crawlability, full control of markup and schema. The only thing WordPress gave you was authoring convenience, which Astro/Markdown + Git replaces.
- **The tool:** PWA + serverless functions (your existing pattern). No always-on server.
- **Forms, lead capture, referrals:** serverless form handlers (Cloudflare Pages Functions / Netlify Forms).
- **Courses & payments:** offload to Gumroad/Teachable/Stripe links — never needs your own backend.
- **Updates at scale:** Markdown-in-Git means you (or Claude Code) can add/edit dozens of pages programmatically, and each deploy is instant and free.

Net: you keep the entire strategy and architecture above; only the *delivery mechanism* changes from CMS to static — and in this niche that's a ranking and cost advantage, not a compromise.
