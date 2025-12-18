import { NextResponse } from "next/server";
import { generateBrief } from "../../../../../lib/flowd/llm";
import { getSession } from "../../../../../lib/flowd/sessionStore";

export async function POST(req: Request) {
  const body = await req.json();
  const { session_id, to } = body as { session_id: string; to: string };
  const session = getSession(session_id);
  if (!session) return NextResponse.json({ error: "not found" }, { status: 404 });

  const brief = generateBrief(session);
  return NextResponse.json({ status: "queued", to, brief });
}
