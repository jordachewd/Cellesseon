# Cellesseon

Smart AI assistant SaaS built with Next.js 16, React 19, TypeScript, Tailwind CSS v4.2, Clerk, Stripe, MongoDB, and OpenAI.

## Recent Updates (March 2026)

- Removed all MUI/Emotion/styled-components dependencies and legacy theme files.
- Migrated all component styling from CSS Modules to Tailwind v4.2 utilities and shared `@layer` styles in `src/app/globals.css`.
- Replaced MUI theme runtime with an internal `CellesseonTheme` provider using `data-cellesseon-theme` + local persistence.
- Added regression coverage for theme behavior:
  - Unit: `tests/unit/cellesseon-theme.test.tsx`
  - E2E: dark-mode toggle persistence in `tests/e2e/landing-page.spec.ts`
- Fixed shared component naming typo by renaming `LoggoutBtn` to `LogoutBtn` and updating account menu imports.
- Restored repeated alert visibility for identical messages by adding a per-alert identifier in `AlertMessage`.
- Hardened runtime theme persistence against blocked Web Storage (`SecurityError`) with safe read/write fallbacks.
- Improved chat upload accessibility by replacing label-based upload trigger with a keyboard-accessible button.
- Removed incorrect ARIA menu semantics from the custom account dropdown to align behavior with announced roles.
- Unified upload MIME validation and extension lookup in `upload-file-validation`, with defensive guard in `/api/upload`.
- Updated authenticated E2E flow credential handling to avoid unsafe non-null assertions.
- Migrated Vitest config to ESM (`vitest.config.mts`) to align with Vite Node API direction.

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

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

MONGODB_URL=...

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
CLERK_WEBHOOK_SECRET=...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

OPENAI_KEY=...
OPENAI_ORG=...
OPENAI_PRJ=...

STRIPE_PUBLISHABLE_KEY=...
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...

AWS_S3_REGION=...
AWS_S3_BUCKET=...
AWS_S3_ACCESS_ID=...
AWS_S3_SECRET_KEY=...

DOWNLOAD_URL_ALLOWLIST=assets.example.com,cdn.example.com

E2E_TEST_USERNAME=codex-jwd
E2E_TEST_EMAIL=codex-jwd@jwd.com
E2E_TEST_PASSWORD=q$cuo2WR*%k$n5@oakCJPSZC
```

Never commit `.env.local`.
