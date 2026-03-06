# Cellesseon

Smart AI assistant SaaS built with Next.js 16, React 19, TypeScript, Tailwind CSS v4.2, Clerk, Stripe, MongoDB, and OpenAI.

## Recent Updates (March 2026)

- Normalized Tailwind animation delay utilities to canonical classes (for example, `animate-delay-200` and `animate-delay-800`) to eliminate `suggestCanonicalClasses` warnings.
- Audited `knip` results item by item, then removed dead server-action code and unused exports in user/task actions and shared utility modules.
- Removed unused runtime/dev dependencies reported by `knip` (including `axios`, `mongodb`, `openapi-typescript`, `react-icons`, and unused testing/type packages).
- Added `knip.json` to suppress validated false positives (`src/types/globals.d.tsx`, `tests/e2e/global.setup.ts`) and keep `prettier` intentionally installed.
- Simplified `postcss.config.mjs` type annotation usage to avoid unlisted dependency noise and keep static analysis output clean.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript 5.7 (`strict`)
- Tailwind CSS 4.2 + `@tailwindcss/postcss`
- Clerk authentication
- Stripe payments
- MongoDB + Mongoose
- OpenAI SDK
- Vitest + Playwright

## Project Structure

```text
src/
  app/
    globals.css            # Tailwind tokens, shared layers, global styles
    layout.tsx             # Root layout + Clerk + theme init
    api/                   # Route handlers (openai, upload, download, webhooks)
  components/
    chat/                  # Chat UI
    layout/                # App shell + theme provider
    sections/              # Landing/plans/profile sections
    shared/                # Reusable UI primitives/components
  constants/
  lib/
    actions/
    database/
    hooks/
    utils/
  types/
tests/
  unit/
  e2e/
```

## Validation Workflow

Run in this order:

```bash
npx prettier --write .
npm run lint
npx tsc --noEmit
npm run test
npm run test:e2e
npm run build
```
