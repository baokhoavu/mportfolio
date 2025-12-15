import nextVitals from "eslint-config-next/core-web-vitals";
import { defineConfig, globalIgnores } from "eslint/config";
import nextTs from "eslint-config-next/typescript";

// Recommended flat config for Next.js projects using the
// Next-provided shareable configs. This avoids using
// FlatCompat and prevents potential circular validator
// issues while keeping the project's lint rules intact.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // Ensure builds/output are ignored similar to eslint-config-next defaults.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
