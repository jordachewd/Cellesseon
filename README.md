# Cellesseon

<div align="center">

![Cellesseon](public/images/lp-hero-image-480x480.png)

_Smart AI Assistant powered by OpenAI_

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://cellesseon.jwd-apps.com)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![MUI](https://img.shields.io/badge/MUI-7-007FFF)](https://mui.com/)

</div>

---

## Description

**Cellesseon** is a modern, full-featured AI-powered virtual assistant built as a Software as a Service (SaaS) platform. It delivers insightful, concise answers in a warm yet professional tone, with responses carefully formatted for optimal readability and comprehension.

### Key Features

- **AI Chat Interface** — Interactive conversational AI powered by OpenAI
- **Image Generation** — Create images using AI capabilities
- **Audio Generation** — Text-to-speech and voice input support
- **File Uploads** — Upload and analyze documents via AWS S3
- **Authentication** — Secure user authentication with Clerk
- **Subscription Plans** — Tiered pricing with Stripe integration
- **Dark/Light Mode** — Customizable theme support
- **Responsive Design** — Optimized for all device sizes

### Subscription Tiers

| Plan | Description |
|------|-------------|
| **Lite** | Free 3-day trial with limited features |
| **Pro** | Best for personal projects with expanded limits |
| **Premium** | Unlimited access with priority support |

:point_right: **[See it in action](https://cellesseon.jwd-apps.com)**

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [TypeScript 5.7](https://www.typescriptlang.org/) | Type-safe development |
| [Material UI 7](https://mui.com/) | Component library |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first CSS |
| [Emotion](https://emotion.sh/) | CSS-in-JS styling |

### Backend & Services
| Technology | Purpose |
|------------|---------|
| [OpenAI API](https://openai.com/) | AI/ML capabilities |
| [MongoDB](https://www.mongodb.com/) | Database |
| [Mongoose](https://mongoosejs.com/) | ODM for MongoDB |
| [AWS S3](https://aws.amazon.com/s3/) | File storage |

### Authentication & Payments
| Technology | Purpose |
|------------|---------|
| [Clerk](https://clerk.com/) | Authentication & user management |
| [Stripe](https://stripe.com/) | Payment processing |
| [Svix](https://www.svix.com/) | Webhook handling |

### Deployment
| Technology | Purpose |
|------------|---------|
| [Vercel](https://vercel.com/) | Hosting & deployment |

---

## Project Structure

```
cellesseon/
├── public/                          # Static assets
│   └── images/                      # Image files
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── globals.css              # Global styles
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home page
│   │   │
│   │   ├── (account)/               # Account route group
│   │   │   ├── layout.tsx           # Account layout
│   │   │   ├── plans/               # Subscription plans page
│   │   │   └── profile/             # User profile page
│   │   │
│   │   ├── (admin)/                 # Admin route group
│   │   │   ├── layout.tsx           # Admin layout
│   │   │   └── dashboard/           # Admin dashboard
│   │   │
│   │   ├── (auth)/                  # Auth route group
│   │   │   ├── layout.tsx           # Auth layout
│   │   │   ├── sign-in/             # Sign in page
│   │   │   └── sign-up/             # Sign up page
│   │   │
│   │   ├── 401/                     # Unauthorized page
│   │   │
│   │   └── api/                     # API Routes
│   │       ├── aws/                 # AWS S3 operations
│   │       ├── download/            # File download handler
│   │       ├── openai/              # OpenAI API integration
│   │       ├── upload/              # File upload handler
│   │       └── webhooks/            # Webhook handlers
│   │           ├── clerk/           # Clerk webhooks
│   │           └── stripe/          # Stripe webhooks
│   │
│   ├── components/                  # React components
│   │   ├── chat/                    # Chat interface components
│   │   │   ├── ChatBody.tsx         # Message display
│   │   │   ├── ChatHeader.tsx       # Chat header
│   │   │   ├── ChatInput.tsx        # Message input
│   │   │   ├── ChatIntro.tsx        # Welcome screen
│   │   │   ├── ChatSidebar.tsx      # Chat history sidebar
│   │   │   └── ChatWrapper.tsx      # Main chat container
│   │   │
│   │   ├── layout/                  # Layout components
│   │   │   ├── CellesseonTheme.tsx  # Theme provider
│   │   │   ├── Footer.tsx           # Site footer
│   │   │   ├── Header.tsx           # Site header
│   │   │   ├── MainWrapper.tsx      # Main content wrapper
│   │   │   ├── PageHead.tsx         # Page head component
│   │   │   └── PageWrapper.tsx      # Page wrapper
│   │   │
│   │   ├── sections/                # Page sections
│   │   │   ├── Faqs.tsx             # FAQ section
│   │   │   ├── LandingPage.tsx      # Landing page hero
│   │   │   ├── Plans.tsx            # Pricing plans
│   │   │   ├── ProfileBilling.tsx   # Billing management
│   │   │   └── ProfileHero.tsx      # Profile header
│   │   │
│   │   └── shared/                  # Reusable components
│   │       ├── AlertMessage.tsx     # Alert notifications
│   │       ├── AudioPlayer.tsx      # Audio playback
│   │       ├── AvatarMenu.tsx       # User avatar dropdown
│   │       ├── Checkout.tsx         # Stripe checkout
│   │       ├── ImageHolder.tsx      # Image display
│   │       ├── LoadingBubbles.tsx   # Loading indicator
│   │       ├── Logo.tsx             # App logo
│   │       ├── PlanCard.tsx         # Plan display card
│   │       ├── PlanCountDown.tsx    # Trial countdown
│   │       ├── PlanPromo.tsx        # Promotional banner
│   │       ├── LoggoutBtn.tsx       # Logout button
│   │       ├── SidebarToggle.tsx    # Sidebar toggle
│   │       ├── ToggleTheme.tsx      # Theme switcher
│   │       ├── TooltipArrow.tsx     # Tooltip component
│   │       └── UploadFileInput.tsx  # File upload input
│   │
│   ├── constants/                   # App constants
│   │   ├── aws.tsx                  # AWS configuration
│   │   ├── faqs.tsx                 # FAQ data
│   │   ├── introChipsData.tsx       # Chat intro suggestions
│   │   ├── openai.tsx               # OpenAI configuration
│   │   └── plans.tsx                # Subscription plans data
│   │
│   ├── lib/                         # Library functions
│   │   ├── actions/                 # Server actions
│   │   │   ├── task.actions.tsx     # Task CRUD operations
│   │   │   ├── transaction.action.tsx # Transaction handling
│   │   │   └── user.actions.tsx     # User operations
│   │   │
│   │   ├── database/                # Database layer
│   │   │   ├── mongoose.tsx         # MongoDB connection
│   │   │   └── models/              # Mongoose schemas
│   │   │       ├── tasks.model.tsx  # Task model
│   │   │       ├── transaction.model.tsx # Transaction model
│   │   │       └── user.model.tsx   # User model
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   │   └── useScreenSize.tsx    # Screen size hook
│   │   │
│   │   └── utils/                   # Utility functions
│   │       ├── aws/                 # AWS utilities
│   │       │   ├── deleteFileFromAWS.tsx  # S3 file deletion
│   │       │   └── uploadFileToAWS.tsx    # S3 file upload
│   │       ├── openai/              # OpenAI utilities
│   │       │   ├── filterAssistantMsg.tsx # Filter assistant messages
│   │       │   ├── generateAudio.tsx      # Audio generation
│   │       │   ├── generateImage.tsx      # Image generation
│   │       │   ├── generateResponse.tsx   # Chat response generation
│   │       │   └── generateTitle.tsx      # Title generation
│   │       ├── generateString.tsx   # String generation
│   │       ├── getFormattedDate.tsx # Date formatting
│   │       ├── getFullName.tsx      # Name formatting
│   │       ├── getPlanStatus.tsx    # Plan status check
│   │       └── handleError.tsx      # Error handling
│   │
│   ├── styles/                      # CSS Modules
│   │   ├── chat/                    # Chat component styles
│   │   │   ├── ChatBody.module.css
│   │   │   ├── ChatHeader.module.css
│   │   │   ├── ChatInput.module.css
│   │   │   ├── ChatIntro.module.css
│   │   │   ├── ChatSidebar.module.css
│   │   │   └── ChatWrapper.module.css
│   │   ├── layout/                  # Layout styles
│   │   │   ├── Footer.module.css
│   │   │   ├── Header.module.css
│   │   │   ├── MainWrapper.module.css
│   │   │   ├── PageHead.module.css
│   │   │   └── PageWrapper.module.css
│   │   ├── sections/                # Section styles
│   │   │   ├── Faqs.module.css
│   │   │   ├── LandingPage.module.css
│   │   │   ├── Plans.module.css
│   │   │   ├── ProfileBilling.module.css
│   │   │   └── ProfileHero.module.css
│   │   └── shared/                  # Shared component styles
│   │       ├── ImageHolder.module.css
│   │       ├── LoadingBubbles.module.css
│   │       ├── LoadingPage.module.css
│   │       ├── LoadingSpinner.module.css
│   │       ├── PlanCard.module.css
│   │       ├── PlanCountDown.module.css
│   │       └── PlanPromo.module.css
│   │
│   ├── themes/                      # MUI Theme configuration
│   │   ├── muiBase.tsx              # Base theme settings
│   │   ├── muiComponents.tsx        # Component overrides
│   │   ├── muiPaletteDark.tsx       # Dark theme palette
│   │   ├── muiPaletteLight.tsx      # Light theme palette
│   │   └── muiTheme.tsx             # Theme composition
│   │
│   ├── types/                       # TypeScript definitions
│   │   ├── globals.d.tsx            # Global types
│   │   ├── index.tsx                # Type exports
│   │   ├── PlanData.d.tsx           # Plan types
│   │   ├── TaskData.d.tsx           # Task types
│   │   ├── TransactionData.d.tsx    # Transaction types
│   │   └── UserData.d.tsx           # User types
│   │
│   └── proxy.tsx                    # Proxy configuration
│
├── .eslintrc.json                   # ESLint configuration
├── next.config.ts                   # Next.js configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
├── postcss.config.mjs               # PostCSS configuration
└── package.json                     # Dependencies & scripts
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB instance
- AWS S3 bucket
- Clerk account
- Stripe account
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (see Environment Variables section)
4. Run the development server:
   ```bash
   npm run dev
   ```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cellesseon

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# OpenAI
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# AWS S3
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=cellesseon-bucket
```

> ⚠️ **Note:** Never commit your `.env.local` file to version control. Make sure it's listed in your `.gitignore`.

---

## License

This project is private and proprietary.

---

## Author

Made with ❤️ by [JordacheWD](https://jordachewd.com/)

 