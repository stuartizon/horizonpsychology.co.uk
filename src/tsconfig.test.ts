import ts from "typescript";
import { expect, test } from "vitest";

// Astro's checks don't report problems with tsconfig.json's own options, such as ones a new
// TypeScript version deprecates, but editors do.
test("tsconfig.json has no option errors", () => {
  const config = ts.getParsedCommandLineOfConfigFile(
    "tsconfig.json",
    {},
    {
      ...ts.sys,
      onUnRecoverableConfigFileDiagnostic: () => {},
    },
  );
  const program = ts.createProgram({ rootNames: [], options: config!.options });
  const errors = [...config!.errors, ...program.getOptionsDiagnostics()].map(
    (d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"),
  );
  expect(errors).toEqual([]);
});
