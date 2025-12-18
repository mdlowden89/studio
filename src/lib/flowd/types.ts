export type AnswerType = "text" | "enum" | "date" | "multi" | "boolean" | "number";

export interface QuestionNode {
  id: string;
  text: string;
  field: string;
  required: boolean;
  type: AnswerType;
  options?: string[];
  vertical: Vertical;
  followup?: {
    whenMissing: string;
  };
}

export type Vertical = "employment" | "family" | "disputes";

export type Priority = "A" | "B" | "C" | "Filtered";

export interface ScoreBreakdown {
  structure: number;
  timing: number;
  substance: number;
  evidence: number;
  valueImpact: number;
  jurisdiction: number;
}

export interface DecisionLogEntry {
  message: string;
  timestamp: string;
}

export interface TranscriptEntry {
  q_id: string;
  q_text: string;
  user_text: string;
  timestamp: string;
}

export interface StructuredFields {
  [key: string]: unknown;
}

export interface EnquiryRecord {
  enquiry_id: string;
  firm_id: string;
  created_at: string;
  updated_at: string;
  vertical: Vertical;
  subcategory: string;
  status: "in_progress" | "complete" | "filtered" | "escalated";
  structured_fields: StructuredFields;
  raw_transcript: TranscriptEntry[];
  evidence: string[];
  score_total: number;
  score_breakdown: ScoreBreakdown;
  overrides: string[];
  priority: Priority;
  decision_log: DecisionLogEntry[];
}

export interface ExtractionResult {
  field_name: string;
  value: unknown | null;
  confidence: number;
  evidence_spans: string[];
  followup_needed: boolean;
  followup_question?: string;
}

export interface BriefSummary {
  heading: string;
  matterType: string;
  keyFacts: string[];
  timeline: string[];
  evidence: string[];
  missingInformation: string[];
  priority: Priority;
  priorityReason: string;
  recommendedNextAction: string;
}
