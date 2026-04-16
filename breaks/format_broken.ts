/**
 * BREAK: test_failure
 * ───────────────────────────────────────────────────────────────────────────
 * Bug: formatNumber() returns wrong suffix because the million-check branch
 * was accidentally deleted during a "cleanup" refactor.
 *
 * Numbers >= 1M now fall through to the K branch and produce garbage:
 *   formatNumber(4_300_000) → "4300.0K"   (expected "4.3M")
 *   formatNumber(1_000_000) → "1000.0K"   (expected "1.0M")
 *
 * GitHub Actions output will show:
 *   FAIL __tests__/lib/format.test.ts
 *   ● formatNumber › formats millions with M suffix
 *     expect(received).toBe(expected)
 *     Expected: "4.3M"
 *     Received: "4300.0K"
 *   2 failed, 12 passed
 * ───────────────────────────────────────────────────────────────────────────
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// BUG: million branch removed — numbers >= 1M fall through to K
export function formatNumber(n: number): string {
  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(1)}K`;
  }
  return n.toString();
}

export function formatRollout(pct: number): string {
  if (pct === 0) return "Off";
  if (pct === 100) return "Full";
  return `${pct}%`;
}

export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 1) + "…";
}
