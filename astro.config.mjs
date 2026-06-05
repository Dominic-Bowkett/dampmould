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
    format: "directory",
  },
});
