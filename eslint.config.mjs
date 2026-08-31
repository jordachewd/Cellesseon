import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// Flat config replacing the legacy .eslintrc.json, which extended
// "next/core-web-vitals" and "next/typescript". `next lint` was removed in
// Next.js 16, so the lint gate now runs through the ESLint CLI (`eslint .`).
export default defineConfig([
  {
    extends: [...nextCoreWebVitals, ...nextTypescript],
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
