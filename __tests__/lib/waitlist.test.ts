import { addToWaitlist, WaitlistSchema } from "@/lib/waitlist";

describe("WaitlistSchema", () => {
  it("accepts a valid email", () => {
    const result = WaitlistSchema.safeParse({ email: "user@example.com" });
    expect(result.success).toBe(true);
  });

  it("rejects missing email", () => {
    const result = WaitlistSchema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("rejects invalid email format", () => {
    const result = WaitlistSchema.safeParse({ email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("rejects email that is too long", () => {
    const result = WaitlistSchema.safeParse({ email: "a".repeat(255) + "@x.com" });
    expect(result.success).toBe(false);
  });
});

describe("addToWaitlist", () => {
  it("returns success and a position for a new email", async () => {
    const result = await addToWaitlist("new-user@example.com");
    expect(result.success).toBe(true);
    expect(result.position).toBeGreaterThan(0);
    expect(result.error).toBeUndefined();
  });

  it("returns alreadyRegistered for a duplicate submission", async () => {
    await addToWaitlist("duplicate@example.com");
    const second = await addToWaitlist("duplicate@example.com");
    expect(second.success).toBe(true);
    expect(second.alreadyRegistered).toBe(true);
  });

  it("returns error for an invalid email", async () => {
    const result = await addToWaitlist("not-valid");
    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it("is case-insensitive for deduplication", async () => {
    await addToWaitlist("CaseSensitive@Example.com");
    const second = await addToWaitlist("casesensitive@example.com");
    expect(second.alreadyRegistered).toBe(true);
  });
});
