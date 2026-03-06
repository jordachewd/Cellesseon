# Cellesseon

Smart AI assistant SaaS built with Next.js 16, React 19, TypeScript, Tailwind CSS v4.2, Clerk, Stripe, MongoDB, and OpenAI.

## Recent Updates (March 2026)

- Migrated Clerk client hooks from `@clerk/clerk-react` to `@clerk/nextjs` in chat intro, plans section, and avatar menu to unblock production builds.
- Updated `src/app/layout.tsx` so `ClerkProvider` is mounted inside `<body>` while preserving existing appearance customization.
- Reworked authenticated E2E coverage to use Clerk's official testing helpers (`@clerk/testing/playwright`) with `tests/e2e/global.setup.ts` auth-state bootstrap.
- Strengthened route-protection coverage across `/profile`, `/plans`, and `/dashboard`, alongside landing page and theme persistence flows.
- Re-hardened Playwright output handling with scoped `tests/e2e/test-results` artifacts and failure-focused screenshot/video retention.

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
