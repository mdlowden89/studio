import { NextResponse } from "next/server";
import { extractStructuredField } from "../../../../../lib/flowd/llm";
import { moduleQuestions } from "../../../../../lib/flowd/modules";
import { buildCompletionPayload, getSession, markComplete, recordAnswer } from "../../../../../lib/flowd/sessionStore";
import { injectAutomaticUnfair, getNextQuestion } from "../../../../../lib/flowd/stateMachine";
import { adviceLeakGuard, enforceSingleQuestion } from "../../../../../lib/flowd/safety";

export async function POST(req: Request) {
  const body = await req.json();
  const { session_id, question_id, user_text } = body as {
    session_id: string;
    question_id: string;
    user_text: string;
  };
  const session = getSession(session_id);
  if (!session) {
    return NextResponse.json({ error: "unknown session" }, { status: 404 });
  }
  const question = moduleQuestions[session.vertical].find((q) => q.id === question_id);
  if (!question) {
    return NextResponse.json({ error: "unknown question" }, { status: 400 });
  }

  const extraction = extractStructuredField(question, user_text || "");
  const record = recordAnswer(session_id, question, extraction, user_text);

  if (record.overrides.includes("safeguarding")) {
    markComplete(session_id, "escalated");
    const payload = buildCompletionPayload(record);
    payload.confirmation =
      "We identified a safety concern. A solicitor will urgently review this information. If anyone is in immediate danger, please contact emergency services.";
    return NextResponse.json({ completion: payload });
  }

  const auto = injectAutomaticUnfair(record);
  if (auto) {
    return NextResponse.json({
      next_question: { ...auto, text: enforceSingleQuestion(auto.text) },
    });
  }

  const next = getNextQuestion(record);
  if (!next) {
    markComplete(session_id, record.priority === "Filtered" ? "filtered" : "complete");
    return NextResponse.json({ completion: buildCompletionPayload(record) });
  }

  const guarded = adviceLeakGuard(next.text);
  return NextResponse.json({
    next_question: { ...next, text: guarded.safeText },
  });
}
