import { adviceLeakGuard } from "./safety";
import { BriefSummary, EnquiryRecord, ExtractionResult, QuestionNode } from "./types";

const yesWords = ["yes", "y", "sure", "yeah", "affirmative"];
const noWords = ["no", "nah", "nope", "not"]; 

function normalize(text: string): string {
  return text.trim().toLowerCase();
}

export function extractStructuredField(
  node: QuestionNode,
  user_text: string
): ExtractionResult {
  const normalized = normalize(user_text);
  let value: unknown | null = null;
  let confidence = 0.4;
  let followup_needed = false;
  const evidence_spans: string[] = normalized ? [user_text] : [];

  switch (node.type) {
    case "boolean": {
      if (yesWords.some((w) => normalized.includes(w))) {
        value = true;
        confidence = 0.9;
      } else if (noWords.some((w) => normalized.includes(w))) {
        value = false;
        confidence = 0.9;
      } else {
        followup_needed = true;
      }
      break;
    }
    case "enum": {
      if (node.options) {
        const match = node.options.find((option) => normalized.includes(option.replace(/_/g, " ")));
        if (match) {
          value = match;
          confidence = 0.75;
        }
      }
      if (value === null) followup_needed = true;
      break;
    }
    case "multi": {
      if (node.options) {
        const selected = node.options.filter((option) => normalized.includes(option.replace(/_/g, " ")));
        if (selected.length > 0) {
          value = selected;
          confidence = 0.7;
        }
      }
      if (value === null) followup_needed = true;
      break;
    }
    case "date": {
      if (normalized.length > 3) {
        value = normalized;
        confidence = 0.6;
      } else {
        followup_needed = true;
      }
      break;
    }
    case "number": {
      const numberMatch = normalized.match(/\d+(\.\d+)?/);
      if (numberMatch) {
        value = Number(numberMatch[0]);
        confidence = 0.7;
      } else {
        followup_needed = true;
      }
      break;
    }
    default: {
      value = user_text;
      confidence = user_text ? 0.6 : 0.2;
      if (!user_text) followup_needed = true;
    }
  }

  return {
    field_name: node.field,
    value,
    confidence,
    evidence_spans,
    followup_needed,
    followup_question: followup_needed ? node.followup?.whenMissing : undefined,
  };
}

export function generateBrief(record: EnquiryRecord): BriefSummary {
  const facts: string[] = [];
  Object.entries(record.structured_fields).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    facts.push(`${key}: ${JSON.stringify(value)}`);
  });

  const missing: string[] = [];
  const requiredFields = record.decision_log
    .filter((entry) => entry.message.startsWith("required:"))
    .map((entry) => entry.message.replace("required:", ""));
  requiredFields.forEach((field) => {
    if (!(field in record.structured_fields)) {
      missing.push(field);
    }
  });

  const briefText: BriefSummary = {
    heading: "FLOWD CASE BRIEF",
    matterType: `${record.vertical.toUpperCase()} — ${record.subcategory}`,
    keyFacts: facts,
    timeline: record.raw_transcript.map((t) => `${t.q_id}: ${t.user_text}`),
    evidence: record.evidence,
    missingInformation: missing,
    priority: record.priority,
    priorityReason: record.decision_log
      .filter((d) => d.message.startsWith("priority:"))
      .map((d) => d.message.replace("priority:", ""))[0] || "",
    recommendedNextAction: record.priority === "A"
      ? "Same-day solicitor review"
      : record.priority === "B"
      ? "Review within 24 hours"
      : "Manual review and follow-up",
  };

  const safe = adviceLeakGuard(
    [
      briefText.heading,
      briefText.matterType,
      ...briefText.keyFacts,
      ...briefText.timeline,
      ...briefText.missingInformation,
    ].join("\n")
  );
  if (safe.flagged) {
    briefText.keyFacts = [safe.safeText];
  }
  return briefText;
}
