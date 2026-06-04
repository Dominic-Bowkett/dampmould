/**
 * JSON-LD builders. Pure functions returning plain objects — components pass
 * the results into BaseHead's `schema` prop, which serialises them into
 * <script type="application/ld+json"> tags. Keeping these typed and in one
 * place means our structured data stays consistent across every page.
 */
import { AUTHOR, SITE } from "../config";

type JsonLd = Record<string, unknown>;

/** Absolute URL helper — schema generally wants fully-qualified URLs. */
export function absUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE.url.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}

/** Person schema for Dominic, with credentials as hasCredential entries. */
export function personSchema(): JsonLd {
  return {
    "@type": "Person",
    "@id": absUrl(`${AUTHOR.aboutUrl}#person`),
    name: AUTHOR.name,
    jobTitle: AUTHOR.jobTitle,
    description: AUTHOR.bioShort,
    url: absUrl(AUTHOR.aboutUrl),
    image: absUrl(AUTHOR.photo),
    hasCredential: AUTHOR.credentials.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c,
    })),
  };
}

/** Organisation/Website identity used as publisher. */
export function organizationSchema(): JsonLd {
  return {
    "@type": "Organization",
    "@id": absUrl("#organization"),
    name: SITE.name,
    url: SITE.url,
    logo: absUrl("/favicon.svg"),
  };
}

/** WebSite node — used on the home page for sitewide identity. */
export function webSiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": absUrl("#website"),
    name: SITE.name,
    url: SITE.url,
    description: SITE.tagline,
    inLanguage: "en-GB",
    publisher: { "@id": absUrl("#organization") },
  };
}

interface ArticleInput {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}

/** Article schema with the Person as author and the site as publisher. */
export function articleSchema(input: ArticleInput): JsonLd {
  return {
    "@type": "Article",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": absUrl(input.url) },
    author: { "@id": absUrl(`${AUTHOR.aboutUrl}#person`) },
    publisher: { "@id": absUrl("#organization") },
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    ...(input.image ? { image: absUrl(input.image) } : {}),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQPage schema from a list of Q&As. */
export function faqSchema(items: FaqItem[]): JsonLd {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export interface HowToStep {
  name: string;
  text: string;
}

/** HowTo schema for step-by-step pages. */
export function howToSchema(name: string, steps: HowToStep[]): JsonLd {
  return {
    "@type": "HowTo",
    name,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export interface Crumb {
  label: string;
  href: string;
}

/** BreadcrumbList schema from an ordered list of crumbs. */
export function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absUrl(c.href),
    })),
  };
}

/**
 * Wrap one or more schema objects in a single @graph document.
 * Filters out null/undefined so callers can pass conditional schema.
 */
export function graph(...nodes: Array<JsonLd | null | undefined>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter(Boolean) as JsonLd[],
  };
}
