/**
 * Content Collections — typed frontmatter for all article content.
 * Three collections, one per pillar (CLAUDE.md §4/§8). They share one schema
 * so ArticleLayout can render any of them uniformly.
 */
import { defineCollection, z } from "astro:content";

const faqItem = z.object({
  question: z.string(),
  answer: z.string(), // may contain inline HTML; rendered with set:html
});

const howToStep = z.object({
  name: z.string(),
  text: z.string(),
});

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  /** Content pillar: a = Awaab's Law, b = tenant help, c = landlord/pro, advice = how-to/info. */
  pillar: z.enum(["a", "b", "c", "advice"]),
  /** Primary audience — drives the contextual CTA. */
  audience: z.enum(["tenant", "landlord", "professional"]),
  /** Primary SEO target keyword for this page. */
  targetKeyword: z.string(),
  /** Last human-reviewed date (E-E-A-T "last reviewed"). */
  lastReviewed: z.coerce.date(),
  /** Optional published date; defaults to lastReviewed if omitted. */
  datePublished: z.coerce.date().optional(),
  /** Which CTA block to show at the end of the article. */
  cta: z.enum(["referral", "course", "service", "tool"]).default("referral"),
  /** Optional FAQ block → rendered + FAQPage schema. */
  faqs: z.array(faqItem).optional(),
  /** Optional step list → HowTo schema on step-by-step pages. */
  howToSteps: z.array(howToStep).optional(),
  /** Optional per-page OG image override. */
  ogImage: z.string().optional(),
  /** Hide from listings/sitemap while drafting. */
  draft: z.boolean().default(false),
});

const awaabsLaw = defineCollection({ type: "content", schema: articleSchema });
const tenants = defineCollection({ type: "content", schema: articleSchema });
const professional = defineCollection({ type: "content", schema: articleSchema });
const advice = defineCollection({ type: "content", schema: articleSchema });

export const collections = {
  "awaabs-law": awaabsLaw,
  tenants,
  professional,
  advice,
};
