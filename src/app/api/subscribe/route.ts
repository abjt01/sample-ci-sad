import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const SubscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  plan: z.enum(["starter", "pro", "enterprise"]).default("starter"),
});

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = SubscribeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 422 }
    );
  }

  // In production: create Stripe checkout session, send confirmation email
  return NextResponse.json(
    { subscribed: true, plan: parsed.data.plan },
    { status: 200 }
  );
}
