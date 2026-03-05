# Cellesseon

Smart AI assistant SaaS built with Next.js 16, React 19, TypeScript, Tailwind CSS v4.2, Clerk, Stripe, MongoDB, and OpenAI.

## Recent Updates (March 2026)

- Expanded behavior-first test coverage for core features and failure paths:
  - Unit: `proxy` access control, `/api/aws` upload/delete success + error handling, Stripe webhook verification and checkout handling, malformed `/api/openai` payload handling, and shared serialization behavior.
  - E2E: unauthenticated redirect to sign-in for private routes, plus existing landing/theme/authenticated regression flows.
- Fixed technical debt items from `SPEC.md`:
  - Replaced duplicated `(account)`/`(admin)` layout markup with shared `src/components/layout/route-group-layout.tsx`.
  - Replaced repeated `JSON.parse(JSON.stringify(...))` server action serialization with `src/lib/utils/serialize-for-client.ts`.
- Standardized Playwright artifacts under `tests/e2e/test-results`.
- Authenticated E2E specs use `E2E_TEST_*` credentials from `.env.local` via `tests/e2e/utils/e2e-test-user.ts`.

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

Playwright authenticated tests read credentials from `.env.local` automatically.
