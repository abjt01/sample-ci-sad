#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# lunn / sample-ci-sad — inject a CI failure scenario
#
# Usage:
#   ./scripts/break.sh <scenario>
#
# Scenarios:
#   test_failure    remove M-suffix branch from formatNumber()    → 2 jest tests fail
#   auth_failure    strip .email() validator from WaitlistSchema  → 2 jest tests fail
#   build_failure   add invalid experimental.appDir to next.config → next build fails
#   secret_leak     commit .env.local with Resend API key         → gitleaks fires
#
# After running this, push to main:
#   git push origin main
# GitHub Actions will trigger and the CI run will fail.
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

SCENARIO="${1:-}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

BOLD="\033[1m"
YELLOW="\033[33m"
RED="\033[31m"
RESET="\033[0m"

usage() {
  echo -e "${BOLD}Usage:${RESET} ./scripts/break.sh <scenario>"
  echo ""
  echo "  test_failure   auth_failure   build_failure   secret_leak"
  exit 1
}

[[ -z "$SCENARIO" ]] && usage

cd "$ROOT"

if ! git diff --quiet 2>/dev/null; then
  echo -e "${RED}Uncommitted changes detected. Commit or stash first.${RESET}"
  exit 1
fi

echo -e "${BOLD}[break]${RESET} Injecting: ${YELLOW}${SCENARIO}${RESET}"

case "$SCENARIO" in

  test_failure)
    cp breaks/format_broken.ts src/lib/format.ts
    git add src/lib/format.ts
    git commit -m "refactor(format): simplify formatNumber for readability"
    echo ""
    echo -e "  Broke: src/lib/format.ts — M-suffix branch removed"
    echo -e "  Fails: __tests__/lib/format.test.ts (2 assertions)"
    ;;

  auth_failure)
    cp breaks/waitlist_broken.ts src/lib/waitlist.ts
    git add src/lib/waitlist.ts
    git commit -m "chore(waitlist): relax email validation for international addresses"
    echo ""
    echo -e "  Broke: src/lib/waitlist.ts — .email() validator stripped"
    echo -e "  Fails: __tests__/lib/waitlist.test.ts (2 assertions)"
    ;;

  build_failure)
    cp breaks/next_config_broken.ts next.config.ts
    git add next.config.ts
    git commit -m "feat(config): enable experimental app router features"
    echo ""
    echo -e "  Broke: next.config.ts — invalid experimental.appDir added"
    echo -e "  Fails: next build (hard config error)"
    ;;

  secret_leak)
    cp breaks/secret_leak.env .env.local
    git add -f .env.local
    git commit -m "chore: add local environment config"
    echo ""
    echo -e "  Broke: .env.local committed with Resend API key"
    echo -e "  Fails: gitleaks secret scan"
    ;;

  *)
    echo -e "${RED}Unknown scenario: ${SCENARIO}${RESET}"
    usage
    ;;
esac

echo ""
echo -e "${BOLD}Done.${RESET} Push to trigger GitHub Actions:"
echo -e "  git push origin main"
