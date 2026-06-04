/**
 * Routing helpers for content collections. Kept in their own module (not inline
 * in [...slug].astro) because Astro hoists getStaticPaths above same-file
 * declarations — anything it calls must be imported, not declared alongside it.
 */

export type Collection = "awaabs-law" | "tenants" | "professional" | "advice";

/** Where each collection mounts in the URL tree (professional pages sit at root). */
export const BASE: Record<Collection, string> = {
  "awaabs-law": "/awaabs-law",
  tenants: "/tenants",
  professional: "",
  advice: "/advice",
};

/** Human label for each pillar's top-level breadcrumb. */
export const PILLAR_LABEL: Record<Collection, string> = {
  "awaabs-law": "Awaab's Law",
  tenants: "Tenant help",
  professional: "Landlords & professionals",
  advice: "Damp & mould advice",
};

/**
 * The landing/pillar page for each collection — used for the breadcrumb trail.
 * Not every collection has a page at its base path (tenants/professional don't),
 * so this points at the real hub page instead of a would-be 404.
 */
export const PILLAR_HOME: Record<Collection, string> = {
  "awaabs-law": "/awaabs-law",
  tenants: "/tenants/damp-mould-rights",
  professional: "/hhsrs",
  advice: "/advice",
};

/** Build the public URL for an entry from its collection + slug. */
export function urlFor(collection: Collection, slug: string): string {
  // An "index" slug represents the collection's landing page.
  const clean = slug.replace(/(^|\/)index$/, "");
  const path = `${BASE[collection]}/${clean}`.replace(/\/+/g, "/").replace(/\/$/, "");
  return path === "" ? "/" : path;
}
