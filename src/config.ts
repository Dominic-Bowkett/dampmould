/**
 * Sitewide constants. Single place to edit brand details, author E-E-A-T data,
 * and primary navigation. Imported by layouts/components.
 */

// Production host (used for canonicals, sitemap and absolute-URL schema).
export const SITE = {
  name: "Damp & Mould Hub",
  // Short tagline used in header/footer and default meta.
  tagline: "Awaab's Law, HHSRS & tenant damp-and-mould help — England",
  url: "https://www.dampmouldhub.com",
  // Default social/OG image. SVG placeholder for now — replace with a
  // 1200x630 PNG/JPG before launch for full social-platform support.
  defaultOgImage: "/images/og-default.svg",
  locale: "en_GB",
  // Where the contact / enquiry forms address their email (mailto: approach).
  contactEmail: "help@dampmouldhub.com",
};

/**
 * Author E-E-A-T block. Drives AuthorBox + Person schema everywhere.
 * Credentials are listed as discrete items so we can emit hasCredential schema.
 */
export const AUTHOR = {
  name: "Dominic Bowkett",
  // Post-nominals shown after the name.
  credentials: ["CertDEA", "BA Hons", "GDL", "MSc", "MRPSA Trustmark"],
  jobTitle: "Domestic Energy Assessor & Building Surveyor",
  bioShort:
    "Dominic is a qualified Domestic Energy Assessor and building surveyor specialising in housing health, HHSRS assessment and damp & mould compliance.",
  // TODO: replace with real author photo before launch.
  photo: "/images/author-dom.jpg",
  aboutUrl: "/about",
};

/** Primary navigation — one entry per pillar plus key conversion pages. */
export const NAV = [
  { label: "Awaab's Law", href: "/awaabs-law" },
  { label: "Tenant rights", href: "/tenants/damp-mould-rights" },
  { label: "Advice", href: "/advice" },
  { label: "HHSRS", href: "/hhsrs" },
  { label: "Find a surveyor", href: "/damp-mould-surveyor" },
  { label: "About", href: "/about" },
];

/** Footer link groups. */
export const FOOTER_LINKS = {
  "Awaab's Law": [
    { label: "What is Awaab's Law?", href: "/awaabs-law" },
    { label: "Timescales & deadlines", href: "/awaabs-law/timescales" },
    { label: "Private landlords", href: "/awaabs-law/private-landlords" },
    { label: "Social housing", href: "/awaabs-law/social-housing" },
  ],
  "Tenant help": [
    { label: "Your rights", href: "/tenants/damp-mould-rights" },
    { label: "Compensation calculator", href: "/tenants/compensation" },
    { label: "How to claim", href: "/tenants/how-to-claim" },
    { label: "Find a solicitor", href: "/tenants/find-a-solicitor" },
  ],
  "Landlords & pros": [
    { label: "HHSRS explained", href: "/hhsrs" },
    { label: "Damp & mould surveyor", href: "/damp-mould-surveyor" },
    { label: "Training courses", href: "/training-courses" },
    { label: "Inspection tool", href: "/tool" },
  ],
  "Damp & mould advice": [
    { label: "Get rid of mould on walls", href: "/advice/how-to-get-rid-of-mould-on-walls" },
    { label: "Condensation", href: "/advice/condensation" },
    { label: "Rising damp", href: "/advice/rising-damp" },
    { label: "Is mould dangerous?", href: "/advice/is-mould-dangerous" },
  ],
  Site: [
    { label: "About the author", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
  ],
};
