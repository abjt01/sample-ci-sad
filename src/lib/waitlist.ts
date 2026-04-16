/**
 * Waitlist entry handling.
 * Validates email, deduplicates, and in production would persist to DB
 * and trigger a welcome email via Resend.
 */

import { z } from "zod";

export const WaitlistSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(254, "Email address is too long"),
});

export type WaitlistInput = z.infer<typeof WaitlistSchema>;

export interface WaitlistResult {
  success: boolean;
  position?: number;
  error?: string;
  alreadyRegistered?: boolean;
}

// In-memory store for demo — would be a DB table in production
const registered = new Set<string>();

export async function addToWaitlist(email: string): Promise<WaitlistResult> {
  const parsed = WaitlistSchema.safeParse({ email });
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0].message,
    };
  }

  const normalised = email.toLowerCase().trim();

  if (registered.has(normalised)) {
    return {
      success: true,
      alreadyRegistered: true,
      position: Math.floor(Math.random() * 500) + 1900,
    };
  }

  registered.add(normalised);

  return {
    success: true,
    position: registered.size + 2400,
  };
}
