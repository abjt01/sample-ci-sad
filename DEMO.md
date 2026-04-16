# Demo Guide

## What this repo is

A real Next.js 15 SaaS app — **Lunn**, a feature flag platform. Looks legit, has real pages, real logic, real tests. Built specifically to be broken on demand so REKALL has genuine CI failures to detect and fix.

---

## What's inside

| Path | What it is |
|------|-----------|
| `src/app/page.tsx` | Landing page — hero, features, pricing tiers, waitlist form |
| `src/app/dashboard/page.tsx` | Flag management dashboard — flag list, stats, toggle UI |
| `src/app/api/waitlist/route.ts` | `POST /api/waitlist` — email capture with Zod validation |
| `src/app/api/subscribe/route.ts` | `POST /api/subscribe` — plan subscription endpoint |
| `src/lib/format.ts` | Number/text formatting utilities |
| `src/lib/waitlist.ts` | Waitlist validation + in-memory storage |
| `src/components/waitlist-form.tsx` | Email capture component with loading/success/error states |
| `__tests__/` | 17 Jest tests across format utils, waitlist logic, form component |
| `.github/workflows/ci.yml` | typecheck → lint → test → build (runs on every push) |
| `.github/workflows/security.yml` | Gitleaks secret scan + npm audit (runs on push + weekly) |

---

## The 4 break scenarios

Each scenario is a one-command inject that causes a real, specific CI job to fail with a real error log.

| Script | What breaks | Which CI job fails |
|--------|------------|-------------------|
| `./scripts/break.sh test_failure` | Removes M-suffix branch from `formatNumber()` | Jest — 2 assertions |
| `./scripts/break.sh auth_failure` | Strips `.email()` validator from Zod schema | Jest — 2 assertions |
| `./scripts/break.sh build_failure` | Adds `experimental.appDir` (removed in Next.js 14) | `next build` hard error |
| `./scripts/break.sh secret_leak` | Commits `.env.local` with a Resend API key | Gitleaks secret scan |

The broken files live in `breaks/`. Each one has a comment block showing exactly what the GitHub Actions log output will look like — so REKALL's DiagnosticAgent has real content to reason over.

---

## Setup

### 1. Push as its own GitHub repo

```bash
cd sample-ci-sad
git init
git add .
git commit -m "init: lunn feature flag platform"
git remote add origin https://github.com/your-org/sample-ci-sad.git
git push -u origin main
```

### 2. Connect to Vercel

Go to [vercel.com/new](https://vercel.com/new), import the repo. Vercel auto-detects Next.js — zero config needed. Every push to `main` triggers a deployment.

### 3. Add the REKALL webhook (optional — for live demo)

In your GitHub repo → **Settings → Webhooks → Add webhook**:

```
Payload URL:  https://your-rekall-instance.com/webhook/github
Content type: application/json
Events:       Workflow runs
```

This makes GitHub notify REKALL automatically when a CI run fails.

---

## Demo flow

### On stage — full loop in ~90 seconds

```bash
# 1. Inject a break
./scripts/break.sh test_failure
git push origin main

# 2. GitHub Actions triggers — watch the test job fail (~30s)
# 3. REKALL detects the failure, agents run live on the dashboard
# 4. DiagnosticAgent reads the real GitHub Actions log
# 5. FixAgent: vault miss → T3 LLM synthesis → Groq proposes the fix
# 6. GovernanceAgent scores risk → create_pr decision
# 7. REKALL opens a real PR on this repo with the fix diff
# 8. Approve it on the REKALL dashboard → CI goes green
```

### Showing the memory learning aspect

Run `test_failure` twice:

```bash
# First run — novel failure, T3 LLM, creates PR, you approve
./scripts/break.sh test_failure && git push origin main
# ... approve on REKALL dashboard, vault stores the fix

# Revert to clean state
./scripts/fix.sh test_failure && git push origin main

# Break it again — same failure
./scripts/break.sh test_failure && git push origin main
# Second run — vault HIT (T1 or T2), auto-applied, no human needed
```

That contrast — "first time needs human, second time the system just knows" — is the entire thesis of REKALL in 60 seconds.

---

## Reverting a break

```bash
./scripts/fix.sh <scenario>
git push origin main
```

CI goes green, Vercel deployment succeeds, vault entry confidence gets reinforced.
