import { moduleQuestions, getRequiredFields } from "./modules";
import { EnquiryRecord, QuestionNode, Vertical } from "./types";
import { enforceSingleQuestion } from "./safety";

export function getNextQuestion(record: EnquiryRecord): QuestionNode | null {
  const questions = moduleQuestions[record.vertical];
  const answeredFields = new Set(Object.keys(record.structured_fields));

  const next = questions.find((q) => q.required && !answeredFields.has(q.field));
  if (!next) return null;
  return { ...next, text: enforceSingleQuestion(next.text) };
}

export function shouldAskAutomaticUnfair(record: EnquiryRecord): boolean {
  if (record.vertical !== "employment") return false;
  const service = record.structured_fields.length_of_service_band;
  return service === "<2y" || service === "1-2y" || service === "<1y";
}

export function injectAutomaticUnfair(record: EnquiryRecord): QuestionNode | null {
  if (!shouldAskAutomaticUnfair(record)) return null;
  const questions = moduleQuestions.employment;
  const auto = questions.find((q) => q.id === "automatic_unfair");
  if (!auto) return null;
  if (record.structured_fields[auto.field] !== undefined) return null;
  return { ...auto, text: enforceSingleQuestion(auto.text) };
}

export function getSubcategory(vertical: Vertical, fields: Record<string, unknown>): string {
  if (vertical === "employment") return "unfair_dismissal";
  if (vertical === "family") return (fields.matter_type as string) || "family";
  if (vertical === "disputes") return (fields.dispute_type as string) || "dispute";
  return "general";
}
