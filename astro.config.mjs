// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// Production domain (used for canonicals + sitemap). www is the canonical host.
const SITE = "https://www.dampmouldhub.com";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // Static output — deploys to Cloudflare Pages as plain HTML (Pages Functions live in /functions).
  output: "static",
  integrations: [mdx(), sitemap()],
  // Trailing slashes off → clean canonical URLs (/awaabs-law, not /awaabs-law/).
  trailingSlash: "never",
  build: {
    // Emit /awaabs-law.html (not /awaabs-law/index.html) so Cloudflare Pages
    // serves the no-slash URL with 200 — matching our canonicals/sitemap/links
    // and avoiding the /path -> /path/ 308 redirect chain.
    format: "file",
  },
});
