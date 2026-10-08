// Answers the contact form's enquiries. It checks each one and passes it to
// the Worker that emails it (ADR 0020), through a service binding, because
// Pages Functions can't send email themselves. The form's script reads only
// the status: 204 when sent, 400 when the enquiry isn't valid, 502 otherwise.
import { formats, topics } from "../../src/data/enquiry";

interface Env {
  /** The enquiry email Worker: production's on main, the preview's on pull requests. */
  ENQUIRY_EMAIL: {
    fetch(input: string, init?: RequestInit): Promise<Response>;
  };
}

/** The same check as the form's script. The Worker checks it more strictly. */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) {
  const form = await request.formData().catch(() => undefined);
  if (!form) return status(400);
  const field = (name: string) => String(form.get(name) ?? "").trim();

  // Only a bot fills in the hidden field. It's told the enquiry was sent, so
  // it doesn't try again.
  if (field("leave_empty")) return status(204);

  const name = field("name");
  const email = field("email");
  const topic = topics.find(({ value }) => value === field("topic"));
  const format = field("format");
  if (
    !name ||
    !emailPattern.test(email) ||
    field("consent") !== "yes" ||
    !topic ||
    (format && !formats.includes(format))
  ) {
    return status(400);
  }

  try {
    const response = await env.ENQUIRY_EMAIL.fetch("https://enquiry-email/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        topic: topic.label,
        format,
        message: field("message"),
      }),
    });
    if (response.ok) return status(204);
    return status(response.status === 400 ? 400 : 502);
  } catch (error) {
    // Only the error's type is logged, as its message could quote the enquiry.
    console.error(
      "Couldn't reach the enquiry email Worker:",
      error instanceof Error ? error.name : typeof error,
    );
    return status(502);
  }
}

const status = (code: number) => new Response(null, { status: code });
