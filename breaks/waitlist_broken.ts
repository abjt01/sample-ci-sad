/**
 * BREAK: auth_failure
 * ───────────────────────────────────────────────────────────────────────────
 * Bug: WaitlistSchema email validation was changed to use .min(1) only,
 * stripping the .email() validator. Any non-empty string now passes.
 *
 * Additionally, addToWaitlist() no longer normalises email to lowercase
 * before deduplication — case-insensitive dedup test fails.
 *
 * GitHub Actions output will show:
 *   FAIL __tests__/lib/waitlist.test.ts
 *   ● WaitlistSchema › rejects invalid email format
 *     expect(received).toBe(expected)
 *     Expected: false
 *     Received: true
 *   ● addToWaitlist › is case-insensitive for deduplication
 *     expect(received).toBe(expected)
 *     Expected: true
 *     Received: undefined
 *   2 failed, 6 passed
 * ───────────────────────────────────────────────────────────────────────────
 */

import { z } from "zod";

// BUG: .email() validator removed — any non-empty string accepted
export const WaitlistSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(254, "Email address is too long"),
  // was: .email("Please enter a valid email address")
});

export type WaitlistInput = z.infer<typeof WaitlistSchema>;

export interface WaitlistResult {
  success: boolean;
  position?: number;
  error?: string;
  alreadyRegistered?: boolean;
}

const registered = new Set<string>();

export async function addToWaitlist(email: string): Promise<WaitlistResult> {
  const parsed = WaitlistSchema.safeParse({ email });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  // BUG: normalisation removed — "User@Example.com" ≠ "user@example.com"
  const raw = email.trim();

  if (registered.has(raw)) {
    return {
      success: true,
      alreadyRegistered: true,
      position: Math.floor(Math.random() * 500) + 1900,
    };
  }

  registered.add(raw);
  return { success: true, position: registered.size + 2400 };
}
