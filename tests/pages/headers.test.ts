import { expect, test } from "vitest";
import { file } from "./pages";

/** The headers Cloudflare Pages adds to each path in the built `_headers` file. */
function headerRules() {
  const rules: Record<string, Record<string, string>> = {};
  let path = "";
  for (const line of file("/_headers").split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    if (!/^\s/.test(line)) {
      path = line.trim();
      rules[path] = {};
    } else {
      const [name, ...value] = line.trim().split(":");
      rules[path][name.trim().toLowerCase()] = value.join(":").trim();
    }
  }
  return rules;
}

test("every page tells browsers to use HTTPS for a year", () => {
  expect(headerRules()["/*"]["strict-transport-security"]).toBe(
    "max-age=31536000",
  );
});

test("no other site can show a page in a frame", () => {
  const headers = headerRules()["/*"];

  expect(headers["x-frame-options"]).toBe("DENY");
  expect(headers["content-security-policy"]).toBe("frame-ancestors 'none'");
});

test("every page turns off browser features the site doesn't use", () => {
  expect(headerRules()["/*"]["permissions-policy"]).toBe(
    "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  );
});

test("the built files, named by their contents, are cached for a year", () => {
  expect(headerRules()["/_astro/*"]["cache-control"]).toBe(
    "public, max-age=31536000, immutable",
  );
});
