import { computeScore, determinePriority } from "./scoring";
import { getSubcategory } from "./stateMachine";
import { EnquiryRecord, ExtractionResult, QuestionNode, TranscriptEntry, Vertical } from "./types";
import { generateBrief } from "./llm";

const sessions = new Map<string, EnquiryRecord>();

function now(): string {
  return new Date().toISOString();
}

function randomId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function startSession(vertical: Vertical, firm_id: string): EnquiryRecord {
  const enquiry_id = randomId();
  const record: EnquiryRecord = {
    enquiry_id,
    firm_id,
    created_at: now(),
    updated_at: now(),
    vertical,
    subcategory: getSubcategory(vertical, {}),
    status: "in_progress",
    structured_fields: {},
    raw_transcript: [],
    evidence: [],
    score_total: 0,
    score_breakdown: {
      structure: 0,
      timing: 0,
      substance: 0,
      evidence: 0,
      valueImpact: 0,
      jurisdiction: 0,
    },
    overrides: [],
    priority: "C",
    decision_log: [],
  };
  sessions.set(enquiry_id, record);
  return record;
}

export function getSession(enquiry_id: string): EnquiryRecord | undefined {
  return sessions.get(enquiry_id);
}

export function recordAnswer(
  enquiry_id: string,
  node: QuestionNode,
  extraction: ExtractionResult,
  user_text: string
): EnquiryRecord {
  const record = sessions.get(enquiry_id);
  if (!record) {
    throw new Error("Unknown session");
  }
  record.structured_fields[extraction.field_name] = extraction.value;
  record.raw_transcript.push({
    q_id: node.id,
    q_text: node.text,
    user_text,
    timestamp: now(),
  } as TranscriptEntry);
  record.subcategory = getSubcategory(record.vertical, record.structured_fields);
  record.updated_at = now();

  const breakdown = computeScore(record);
  record.score_breakdown = breakdown;
  record.score_total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);
  const priorityResult = determinePriority(record);
  record.priority = priorityResult.priority;
  record.overrides = priorityResult.overrides;
  record.decision_log.push({
    message: `priority:${priorityResult.explanation}`,
    timestamp: now(),
  });
  return record;
}

export function markComplete(enquiry_id: string, status: EnquiryRecord["status"]): EnquiryRecord {
  const record = sessions.get(enquiry_id);
  if (!record) throw new Error("Unknown session");
  record.status = status;
  record.updated_at = now();
  return record;
}

export function buildCompletionPayload(record: EnquiryRecord) {
  return {
    record,
    brief: generateBrief(record),
    confirmation:
      "Thank you. We have captured your answers for a solicitor to review. This is not legal advice and the firm will follow up if the matter is in scope.",
    disclaimer:
      "This tool collects information only and does not provide legal advice. A solicitor will confirm next steps after review.",
  };
}
