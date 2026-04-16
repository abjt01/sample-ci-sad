#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# lunn / sample-ci-sad — revert a break scenario to clean state
#
# Usage:
#   ./scripts/fix.sh <scenario>
#
# Run this after REKALL has proposed its fix PR — to apply the ground-truth
# fix and confirm CI goes green again.
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

SCENARIO="${1:-}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

BOLD="\033[1m"
GREEN="\033[32m"
RED="\033[31m"
RESET="\033[0m"

[[ -z "$SCENARIO" ]] && { echo "Usage: ./scripts/fix.sh <scenario>"; exit 1; }

cd "$ROOT"

echo -e "${BOLD}[fix]${RESET} Reverting: ${SCENARIO}"

case "$SCENARIO" in

  test_failure)
    git checkout HEAD~1 -- src/lib/format.ts
    git add src/lib/format.ts
    git commit -m "fix(format): restore M-suffix branch in formatNumber"
    ;;

  auth_failure)
    git checkout HEAD~1 -- src/lib/waitlist.ts
    git add src/lib/waitlist.ts
    git commit -m "fix(waitlist): restore .email() validator and lowercase normalisation"
    ;;

  build_failure)
    git checkout HEAD~1 -- next.config.ts
    git add next.config.ts
    git commit -m "fix(config): remove invalid experimental.appDir option"
    ;;

  secret_leak)
    git rm --cached .env.local 2>/dev/null || true
    rm -f .env.local
    echo ".env.local" >> .gitignore
    git add .gitignore
    git commit -m "fix(security): remove committed .env.local and add to .gitignore"
    ;;

  *)
    echo -e "${RED}Unknown scenario: ${SCENARIO}${RESET}"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}Fixed.${RESET} Push to confirm CI goes green:"
echo -e "  git push origin main"
