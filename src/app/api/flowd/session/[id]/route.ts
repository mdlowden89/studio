import { NextResponse } from "next/server";
import { getSession } from "../../../../../lib/flowd/sessionStore";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = getSession(params.id);
  if (!session) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(session);
}
