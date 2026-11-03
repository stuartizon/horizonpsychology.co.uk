import { readFileSync, readdirSync } from "node:fs";
import { basename, extname } from "node:path";
import { describe, expect, test } from "vitest";
import { services } from "@/data/services";

// Source files that make up the site, leaving out tests and test helpers.
const sources = readdirSync("src", { recursive: true, encoding: "utf8" })
  .filter((path) => /\.(astro|css|ts|md)$/.test(path))
  .filter((path) => !/\.test\.ts$/.test(path) && !path.startsWith("test/"))
  .map((path) => `src/${path}`);

const source = (except: string) =>
  sources
    .filter((path) => path !== except)
    .map((path) => readFileSync(path, "utf8"))
    .join("\n");

describe("every global custom property is used", () => {
  const css = readFileSync("src/styles/global.css", "utf8");
  const properties = [...css.matchAll(/^\s*(--[\w-]+):/gm)].map(
    ([, name]) => name,
  );
  const used = source("");

  for (const property of properties) {
    test(property, () => {
      expect(used).toMatch(new RegExp(`var\\(${property}[,)]`));
    });
  }
});

// The service pages and cards load the photo and icon named after each
// service with import.meta.glob, so those files have no import of their own.
const serviceIds = services.map((service) => service.id);

describe("every component, icon, logo and photo is used", () => {
  const files = ["components", "icons", "logos", "photos"].flatMap((dir) =>
    readdirSync(`src/${dir}`)
      .filter((file) => !file.endsWith(".test.ts"))
      .map((file) => `src/${dir}/${file}`),
  );

  for (const file of files) {
    test(file, () => {
      const ext = extname(file);
      const name = basename(file, ext);
      if (/\/(icons|photos)\//.test(file) && serviceIds.includes(name)) return;
      const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      expect(source(file)).toMatch(new RegExp(`/${escaped}(\\${ext})?["']`));
    });
  }
});
