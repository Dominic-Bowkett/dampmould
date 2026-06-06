/**
 * IndexNow submitter — pings IndexNow (Bing, Yandex, Seznam, …) with the site's
 * URLs so they get discovered/recrawled quickly.
 *
 * Usage (after a build, so dist/sitemap-0.xml exists):
 *   npm run build && npm run indexnow
 *
 * Reads the built sitemap, then POSTs the URL list to api.indexnow.org.
 * Non-fatal: logs and exits 0 even if the ping fails, so it never breaks a build.
 */
import { readFile } from "node:fs/promises";

const HOST = "www.dampmouldhub.com";
const KEY = "b4f1393eadbe6db4b269131a1c5ea74f"; // must match public/<key>.txt
const SITEMAP = "dist/sitemap-0.xml";

async function main() {
  let xml;
  try {
    xml = await readFile(SITEMAP, "utf8");
  } catch {
    console.error(`IndexNow: ${SITEMAP} not found — run "npm run build" first.`);
    process.exit(0);
  }

  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (urlList.length === 0) {
    console.error("IndexNow: no URLs found in sitemap.");
    process.exit(0);
  }

  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    // IndexNow returns 200 or 202 on success.
    console.log(`IndexNow: submitted ${urlList.length} URLs — HTTP ${res.status}`);
  } catch (err) {
    console.error("IndexNow: submission failed —", err?.message || err);
  }
  process.exit(0);
}

main();
