// Sends a contact form enquiry to the practice by email (ADR 0020). It has no
// public URL: the site's /api/enquiry Pages Function calls it through a
// service binding, because Pages Functions can't send email themselves.
import { EmailMessage } from "cloudflare:email";
import { enquiryEmail, FROM, type Enquiry } from "./message";

interface Env {
  /** Cloudflare's send_email binding, which only delivers to addresses verified in Email Routing. */
  EMAIL: { send(message: EmailMessage): Promise<unknown> };
  /** The verified address the email is delivered to. It's personal, so it's a secret. */
  DELIVER_TO: string;
  /** The address on the domain the email is addressed to: the one the site shows. */
  ADDRESSED_TO: string;
}

/** Each field's maximum length. */
const limits = {
  name: 200,
  email: 254,
  topic: 100,
  format: 100,
  message: 10_000,
};

/** A plain address, with nothing that could add a display name or header. */
const emailPattern =
  /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]+$/;

export default {
  async fetch(request: Request, env: Env) {
    if (request.method !== "POST") {
      return new Response(null, { status: 405, headers: { Allow: "POST" } });
    }
    const enquiry = parseEnquiry(await request.json().catch(() => undefined));
    if (!enquiry) return new Response(null, { status: 400 });

    try {
      await env.EMAIL.send(
        new EmailMessage(
          FROM,
          env.DELIVER_TO,
          enquiryEmail(enquiry, env.ADDRESSED_TO),
        ),
      );
    } catch (error) {
      // The error could quote the email or its addresses, which may be health
      // information, so only its type is logged.
      console.error(
        "Couldn't send an enquiry email:",
        error instanceof Error ? error.name : typeof error,
      );
      return new Response(null, { status: 502 });
    }
    return new Response(null, { status: 204 });
  },
};

/** The enquiry in a request's JSON body, or undefined if it isn't valid. */
function parseEnquiry(body: unknown): Enquiry | undefined {
  if (typeof body !== "object" || body === null || Array.isArray(body)) return;
  const fields: Record<string, string> = {};
  for (const [field, limit] of Object.entries(limits)) {
    const value = (body as Record<string, unknown>)[field] ?? "";
    if (typeof value !== "string" || value.length > limit) return;
    fields[field] = value.trim();
  }
  const { name, email, topic, format, message } = fields;
  if (!name || !emailPattern.test(email)) return;
  return { name, email, topic, format, message };
}
