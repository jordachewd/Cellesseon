# Cellesseon

Smart AI assistant SaaS built with Next.js 16, React 19, TypeScript, Tailwind CSS v4.2, Clerk, Stripe, MongoDB, and OpenAI.

## Current Status

- **Validation pipeline:** TypeScript, ESLint, Prettier, and Vitest all pass (23 suites, 101 tests).
- **E2E:** 2 Playwright specs covering landing page and authenticated flows.
- **Architecture:** Server Components first, Server Actions for mutations, Clerk proxy-based route protection.
- **Open work:** See `TODO.md` for prioritized, granular development tasks.

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
  unit/                    # 23 suites, 101 tests (Vitest)
  e2e/                     # 2 specs (Playwright)
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

All six gates must pass before every commit.
