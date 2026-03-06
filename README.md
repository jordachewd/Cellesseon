# Cellesseon

Smart AI assistant SaaS built with Next.js 16, React 19, TypeScript, Tailwind CSS v4.2, Clerk, Stripe, MongoDB, and OpenAI.

## Recent Updates (March 2026)

### Security hardening

- Enforced task ownership — `updateTask` now filters by both `_id` and `userId`, preventing cross-user task overwrites.
- Auth-gated `updateUser`, `deleteUser`, and `deleteAllTransactions` server actions. Webhook handlers (Clerk, Stripe) now perform direct DB operations under signature-verified context instead of calling the exported actions.
- Added per-user rate limiting on `/api/openai` (in-memory sliding window, 20 req/60s) with proper `429` responses and `Retry-After` headers.
- Stripe webhook no longer leaks the raw error object — catch block returns a generic message.
- `/api/download` proxy route now requires Clerk authentication.

### UI/UX and code quality

- Fixed client/runtime boundary and accessibility regressions: added missing `"use client"` directives (`avatar-menu`, `toggle-theme`) and removed invalid `role="link"` from form submit checkout button.
- Corrected non-canonical Tailwind utilities across the codebase and silenced `suggestCanonicalClasses` in VS Code settings.
- Removed global heading reset that was overriding brand `.heading-[x]` classes.
- Increased `.btn-lg` padding and adjusted `.tooltip-content` padding.
- Moved universal reset to `@layer base` so component styles are no longer overridden.
- Hardened `serializeForClient` typing with a `Jsonify<T>` return type.
- Moved `stripe` to runtime `dependencies` so production installs do not break webhook/checkout flows.

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
  unit/                    # 21 suites, 96 tests (Vitest)
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
