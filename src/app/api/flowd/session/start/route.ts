import { NextResponse } from "next/server";
import { moduleQuestions } from "../../../../../lib/flowd/modules";
import { startSession } from "../../../../../lib/flowd/sessionStore";
import { enforceSingleQuestion } from "../../../../../lib/flowd/safety";
import { Vertical } from "../../../../../lib/flowd/types";

export async function POST(req: Request) {
  const body = await req.json();
  const vertical = (body.vertical || "employment") as Vertical;
  const firm_id = body.firm_id || "demo_firm";

  const session = startSession(vertical, firm_id);
  moduleQuestions[vertical]
    .filter((q) => q.required)
    .forEach((q) =>
      session.decision_log.push({ message: `required:${q.field}`, timestamp: new Date().toISOString() })
    );

  const firstQuestion = moduleQuestions[vertical].find((q) => q.required);
  return NextResponse.json({
    session_id: session.enquiry_id,
    question: firstQuestion
      ? { ...firstQuestion, text: enforceSingleQuestion(firstQuestion.text) }
      : null,
  });
}
