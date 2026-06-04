// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// REPLACE_DOMAIN: swap for the real domain before launch (used for canonicals + sitemap).
const SITE = "https://REPLACE_DOMAIN";

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // Static output — deploys to Cloudflare Pages as plain HTML (Pages Functions live in /functions).
  output: "static",
  integrations: [mdx(), sitemap()],
  // Trailing slashes off → clean canonical URLs (/awaabs-law, not /awaabs-law/).
  trailingSlash: "never",
  build: {
    format: "directory",
  },
});
