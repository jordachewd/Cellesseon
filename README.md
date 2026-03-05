# Cellesseon

Smart AI assistant SaaS built with Next.js 16, React 19, TypeScript, Tailwind CSS v4.2, Clerk, Stripe, MongoDB, and OpenAI.

## Recent Updates (March 2026)

- Normalized legacy component filenames to kebab-case across `src/components/**` and updated all imports/references.
- Fixed Tailwind canonical class warnings that were causing editor `suggestCanonicalClasses` noise (for example `z-[1]` -> `z-1` and cleaned arbitrary radial-gradient value formatting).
- Expanded behavior-first tests for critical success and failure paths:
  - Unit: added `/api/webhooks/clerk` webhook coverage (missing headers, invalid signature, create/update/delete flows, unhandled events), plus webhook route-public access assertions in `proxy` tests.
  - E2E: strengthened unauthenticated route protection checks across `/profile`, `/plans`, and `/dashboard`, alongside existing landing/theme/authenticated flows.
- Re-hardened Playwright config:
  - Enforced `tests/e2e/test-results` output directory for artifacts.
  - Added failure-focused screenshot/video retention to improve debugging signal.

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
