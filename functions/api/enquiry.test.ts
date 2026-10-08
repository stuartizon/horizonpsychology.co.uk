import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  type Mock,
} from "vitest";
import { onRequestPost } from "./enquiry";

const form = {
  name: "Jane Doe",
  email: "jane@example.com",
  topic: "couples-therapy",
  format: "Online",
  message: "Something private about my health.",
  consent: "yes",
  leave_empty: "",
};

let worker: Mock<(input: string, init?: RequestInit) => Promise<Response>>;
let logged: unknown[][];

const post = (fields: Record<string, string>) =>
  onRequestPost({
    request: new Request("https://horizonpsychology.co.uk/api/enquiry", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new URLSearchParams(fields),
    }),
    env: { ENQUIRY_EMAIL: { fetch: worker } },
  });

/** The enquiry the function passed to the email Worker. */
const forwarded = async () => {
  const [, init] = worker.mock.calls[0];
  return JSON.parse(init!.body as string);
};

beforeEach(() => {
  worker = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
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

describe("POST /api/enquiry", () => {
  it("sends the enquiry and responds with no content", async () => {
    const response = await post(form);
    expect(response.status).toBe(204);
    expect(worker).toHaveBeenCalledOnce();
  });

  it("passes the enquiry to the email Worker as JSON", async () => {
    await post(form);
    const [, init] = worker.mock.calls[0];
    expect(init?.method).toBe("POST");
    expect(new Headers(init?.headers).get("Content-Type")).toBe(
      "application/json",
    );
    expect(await forwarded()).toEqual({
      name: "Jane Doe",
      email: "jane@example.com",
      topic: "Couples Therapy",
      format: "Online",
      message: "Something private about my health.",
    });
  });

  it("names a topic of other as Other", async () => {
    await post({ ...form, topic: "other" });
    expect((await forwarded()).topic).toBe("Other");
  });

  it("sends an enquiry without a message", async () => {
    const response = await post(
      Object.fromEntries(
        Object.entries(form).filter(([name]) => name !== "message"),
      ),
    );
    expect(response.status).toBe(204);
    expect((await forwarded()).message).toBe("");
  });

  it.each([
    ["has no name", { ...form, name: " " }],
    ["has no email address", { ...form, email: "" }],
    ["has an invalid email address", { ...form, email: "jane@example" }],
    ["isn't consented to", { ...form, consent: "" }],
    ["has an unknown topic", { ...form, topic: "astrology" }],
    ["has an unknown format", { ...form, format: "By carrier pigeon" }],
  ])("rejects an enquiry that %s", async (_, fields) => {
    const response = await post(fields);
    expect(response.status).toBe(400);
    expect(worker).not.toHaveBeenCalled();
  });

  it("rejects a request that isn't a form", async () => {
    const response = await onRequestPost({
      request: new Request("https://horizonpsychology.co.uk/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{",
      }),
      env: { ENQUIRY_EMAIL: { fetch: worker } },
    });
    expect(response.status).toBe(400);
    expect(worker).not.toHaveBeenCalled();
  });

  it("quietly drops an enquiry with the hidden field filled in, as a bot's", async () => {
    const response = await post({
      ...form,
      leave_empty: "https://spam.example",
    });
    expect(response.status).toBe(204);
    expect(worker).not.toHaveBeenCalled();
  });

  it("rejects an enquiry the email Worker rejects", async () => {
    worker.mockResolvedValue(new Response(null, { status: 400 }));
    const response = await post(form);
    expect(response.status).toBe(400);
  });

  it.each([
    [
      "can't send it",
      () => worker.mockResolvedValue(new Response(null, { status: 502 })),
    ],
    ["can't be reached", () => worker.mockRejectedValue(new Error("Network"))],
  ])("responds with an error when the email Worker %s", async (_, setUp) => {
    setUp();
    const response = await post(form);
    expect(response.status).toBe(502);
  });

  it.each([
    ["is sent", form, () => {}],
    ["is rejected", { ...form, consent: "" }, () => {}],
    [
      "fails to send",
      form,
      () =>
        worker.mockRejectedValue(new Error(`Couldn't send ${form.message}`)),
    ],
  ])(
    "never logs what the visitor wrote when the enquiry %s",
    async (_, fields, setUp) => {
      setUp();
      await post(fields);
      const output = JSON.stringify(logged);
      for (const value of [form.name, form.email, form.message]) {
        expect(output).not.toContain(value);
      }
    },
  );
});
