import { NextRequest, NextResponse } from "next/server";
import { addToWaitlist, WaitlistSchema } from "@/lib/waitlist";

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const parsed = WaitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 422 }
    );
  }

  const result = await addToWaitlist(parsed.data.email);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 422 });
  }

  return NextResponse.json(
    {
      position: result.position,
      alreadyRegistered: result.alreadyRegistered ?? false,
    },
    { status: 200 }
  );
}
