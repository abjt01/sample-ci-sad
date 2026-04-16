# lunn

Feature flags, staged rollouts, and environment configs for modern engineering teams.

[![CI](https://github.com/your-org/lunn/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/lunn/actions/workflows/ci.yml)
[![Security](https://github.com/your-org/lunn/actions/workflows/security.yml/badge.svg)](https://github.com/your-org/lunn/actions/workflows/security.yml)

## Stack

- **Framework** — Next.js 15 (App Router)
- **Language** — TypeScript 5
- **Styling** — Tailwind CSS
- **Validation** — Zod
- **Email** — Resend
- **Tests** — Jest + React Testing Library
- **Deployment** — Vercel

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev          # start dev server (Turbopack)
npm run build        # production build
npm run type-check   # TypeScript check without emit
npm run lint         # ESLint
npm test             # Jest unit tests
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx              root layout
│   ├── page.tsx                landing page
│   ├── dashboard/page.tsx      flag management dashboard
│   └── api/
│       ├── waitlist/route.ts   POST /api/waitlist
│       └── subscribe/route.ts  POST /api/subscribe
├── components/
│   └── waitlist-form.tsx       email capture component
├── lib/
│   ├── flags.ts                feature flag data layer
│   ├── format.ts               number/text formatting utils
│   ├── utils.ts                cn() helper
│   └── waitlist.ts             waitlist validation + storage
└── types/
    └── index.ts                shared TypeScript types
```

## CI

Every push to `main` runs:

1. **Type check** — `tsc --noEmit`
2. **Lint** — ESLint via `next lint`
3. **Unit tests** — Jest (format utils, waitlist logic, form component)
4. **Build** — `next build` — only runs if all three above pass

Security workflow runs on every push and weekly:

- **Gitleaks** — scans for accidentally committed secrets
- **npm audit** — flags high-severity dependency vulnerabilities

## Deployment

Deployed to Vercel. Every push to `main` triggers a production deployment automatically.
