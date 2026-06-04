/**
 * Cloudflare Pages Function — lead / referral capture endpoint.
 * Route: POST /api/lead   (file path /functions/api/lead.js maps to this URL)
 *
 * STUB ONLY. This validates + logs the submission. It does NOT yet forward
 * anywhere. Before going live, wire the forward to a real destination
 * (email service, CRM, or SRA-regulated solicitor partner).
 *
 * Secrets must be set as Pages environment variables (server-side only) —
 * NEVER hard-code keys here or expose them to the client.
 *   TODO: LEAD_FORWARD_URL   (partner/CRM webhook)
 *   TODO: LEAD_FORWARD_TOKEN (auth for the above)
 *   TODO: LEAD_NOTIFY_EMAIL  (where to email new leads, if using an email API)
 */

const ALLOWED_AUDIENCES = ["tenant", "landlord", "professional"];

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export async function onRequestPost(context) {
  const { request /*, env */ } = context;

  let body;
  try {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      body = await request.json();
    } else {
      // Support standard HTML form posts too.
      const form = await request.formData();
      body = Object.fromEntries(form.entries());
    }
  } catch {
    return json({ ok: false, error: "Invalid request body." }, 400);
  }

  // Honeypot — bots fill hidden fields; humans leave them empty.
  if (body.company || body._gotcha) {
    // Pretend success so bots don't learn they were caught.
    return json({ ok: true });
  }

  const name = (body.name || "").toString().trim();
  const email = (body.email || "").toString().trim();
  const postcode = (body.postcode || "").toString().trim();
  const situation = (body.situation || "").toString().trim();
  const audience = (body.audience || "").toString().trim().toLowerCase();

  // Minimal validation — keep it forgiving but block junk.
  const emailLooksValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!name || !emailLooksValid) {
    return json({ ok: false, error: "Please provide a name and a valid email." }, 422);
  }
  if (audience && !ALLOWED_AUDIENCES.includes(audience)) {
    return json({ ok: false, error: "Unknown audience type." }, 422);
  }

  const lead = {
    name,
    email,
    postcode,
    situation,
    audience: audience || "unknown",
    receivedAt: new Date().toISOString(),
    ua: request.headers.get("user-agent") || "",
  };

  // TODO: rate-limit by IP (e.g. Cloudflare KV or Turnstile) before production.
  // TODO: forward `lead` to env.LEAD_FORWARD_URL with env.LEAD_FORWARD_TOKEN,
  //       and/or send a notification to env.LEAD_NOTIFY_EMAIL.
  console.log("New lead (stub — not yet forwarded):", JSON.stringify(lead));

  return json({ ok: true, message: "Thanks — we’ll be in touch." });
}

// Reject non-POST methods cleanly.
export async function onRequest(context) {
  if (context.request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed." }, 405);
  }
  return onRequestPost(context);
}
