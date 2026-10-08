import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { EmailMessage } from "@/test/cloudflare-email";
import { parseEmail } from "@/test/email";
import worker from "./index";

const enquiry = {
  name: "Jane Doe",
  email: "jane@example.com",
  topic: "Couples therapy",
  format: "Online",
  message: "Something private about my health.",
};

let send: ReturnType<typeof vi.fn>;
let logged: unknown[][];

const env = () => ({
  EMAIL: { send },
  DELIVER_TO: "inbox@example.net",
  ADDRESSED_TO: "emma@horizonpsychology.co.uk",
});

const post = (body: unknown, init: RequestInit = {}) =>
  worker.fetch(
    new Request("https://enquiry-email/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
      ...init,
    }),
    env(),
  );

const sent = () => send.mock.calls.map(([message]) => message as EmailMessage);

beforeEach(() => {
  send = vi.fn().mockResolvedValue(undefined);
  logged = [];
  for (const method of ["log", "info", "warn", "error", "debug"] as const) {
    vi.spyOn(console, method).mockImplementation((...args) => {
      logged.push(args);
    });
  }
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("enquiry email Worker", () => {
  it("sends the enquiry and responds with no content", async () => {
    const response = await post(enquiry);
    expect(response.status).toBe(204);
    expect(sent()).toHaveLength(1);
  });

  it("delivers to the configured address, from the no-reply address", async () => {
    await post(enquiry);
    const [message] = sent();
    expect(message.to).toBe("inbox@example.net");
    expect(message.from).toBe("noreply@horizonpsychology.co.uk");
  });

  it("addresses the email to the configured address on the domain", async () => {
    await post(enquiry);
    const { headers } = parseEmail(sent()[0].raw);
    expect(headers.get("to")).toBe("emma@horizonpsychology.co.uk");
    expect(headers.get("reply-to")).toBe("Jane Doe <jane@example.com>");
  });

  it("sends an enquiry with only a name and email address", async () => {
    const response = await post({ name: "Jane", email: "jane@example.com" });
    expect(response.status).toBe(204);
    expect(sent()).toHaveLength(1);
  });

  it("only accepts POST requests", async () => {
    const response = await worker.fetch(
      new Request("https://enquiry-email/"),
      env(),
    );
    expect(response.status).toBe(405);
    expect(send).not.toHaveBeenCalled();
  });

  it.each([
    ["isn't JSON", "name=Jane"],
    ["isn't an object", ["Jane"]],
    ["has no name", { ...enquiry, name: " " }],
    ["has no email address", { ...enquiry, email: "" }],
    ["has an invalid email address", { ...enquiry, email: "jane" }],
    [
      "has an email address with a display name",
      { ...enquiry, email: "Jane <jane@example.com>" },
    ],
    [
      "has an email address with a line break",
      { ...enquiry, email: "jane@example.com\r\nBcc: someone@example.com" },
    ],
    ["has a field that isn't text", { ...enquiry, topic: 3 }],
    ["has a name over 200 characters", { ...enquiry, name: "a".repeat(201) }],
    [
      "has a message over 10,000 characters",
      { ...enquiry, message: "a".repeat(10_001) },
    ],
  ])("rejects an enquiry that %s", async (_, body) => {
    const response = await post(body);
    expect(response.status).toBe(400);
    expect(send).not.toHaveBeenCalled();
  });

  it("responds with an error when the email can't be sent", async () => {
    send.mockRejectedValue(new Error("destination address is not verified"));
    const response = await post(enquiry);
    expect(response.status).toBe(502);
  });

  it.each([
    ["is sent", enquiry, () => {}],
    ["is rejected", { ...enquiry, email: "jane" }, () => {}],
    [
      "fails to send",
      enquiry,
      () =>
        send.mockRejectedValue(new Error(`Couldn't send ${enquiry.message}`)),
    ],
  ])(
    "never logs what the visitor wrote when the enquiry %s",
    async (_, body, setUp) => {
      setUp();
      await post(body);
      const output = JSON.stringify(logged);
      for (const value of [
        enquiry.name,
        enquiry.email,
        enquiry.message,
        "inbox@example.net",
      ]) {
        expect(output).not.toContain(value);
      }
    },
  );
});
