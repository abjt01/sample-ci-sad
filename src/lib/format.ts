/**
 * Format large numbers with K/M suffixes for dashboard display.
 *   formatNumber(1200)      → "1.2K"
 *   formatNumber(4300000)   → "4.3M"
 *   formatNumber(850)       → "850"
 */
export function formatNumber(n: number): string {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1)}M`;
  }
  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(1)}K`;
  }
  return n.toString();
}

/**
 * Format a percentage rollout value for display.
 *   formatRollout(0)   → "Off"
 *   formatRollout(100) → "Full"
 *   formatRollout(25)  → "25%"
 */
export function formatRollout(pct: number): string {
  if (pct === 0) return "Off";
  if (pct === 100) return "Full";
  return `${pct}%`;
}

/**
 * Truncate a string to maxLen characters with an ellipsis.
 */
export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 1) + "…";
}
