import { moduleQuestions } from "./modules";
import { EnquiryRecord, Priority, ScoreBreakdown, Vertical } from "./types";
import { differenceInCalendarDays, parseISO } from "date-fns";

function asDate(value: unknown): Date | null {
  if (typeof value !== "string") return null;
  const parsed = parseISO(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function timingScore(record: EnquiryRecord): number {
  const dateValue = record.structured_fields.dismissal_date || record.structured_fields.incident_or_breach_date;
  const parsed = asDate(dateValue);
  if (!parsed) return 1;
  const days = Math.abs(differenceInCalendarDays(new Date(), parsed));
  if (days <= 30) return 2;
  if (days <= 90) return 1.5;
  return 0.5;
}

function structureScore(record: EnquiryRecord): number {
  const required = moduleQuestions[record.vertical].filter((q) => q.required).map((q) => q.field);
  const filled = required.filter((field) => record.structured_fields[field] !== undefined).length;
  const ratio = filled / required.length;
  if (ratio === 1) return 2;
  if (ratio >= 0.6) return 1.5;
  if (ratio > 0.3) return 1;
  return 0.5;
}

function substanceScore(record: EnquiryRecord): number {
  if (record.vertical === "employment") {
    const process = record.structured_fields.process_followed as string[] | undefined;
    if (process?.includes("none")) return 2;
    if (process && process.length >= 2) return 1.5;
    return 1;
  }
  if (record.vertical === "family") {
    const safeguarding = record.structured_fields.safeguarding_concerns;
    if (safeguarding === "yes") return 2;
    if (safeguarding === "unsure") return 1.5;
    return 1;
  }
  const value = record.structured_fields.loss_value_band;
  if (value === ">25k") return 2;
  if (value === "5-25k") return 1.5;
  return 1;
}

function evidenceScore(record: EnquiryRecord): number {
  if (record.vertical === "employment") {
    const docs = record.structured_fields.documents_available;
    if (docs === "yes") return 2;
    if (docs === "unsure") return 1.2;
    return 0.8;
  }
  const evidenceList = (record.structured_fields.evidence_list as string | undefined) || "";
  if (evidenceList.length > 30) return 2;
  if (evidenceList.length > 0) return 1.2;
  return 0.5;
}

function valueImpactScore(record: EnquiryRecord): number {
  if (record.vertical === "disputes") {
    const value = record.structured_fields.loss_value_band;
    if (value === ">25k") return 2;
    if (value === "5-25k") return 1.5;
    if (value === "<5k") return 1;
    return 0.5;
  }
  if (record.vertical === "employment") {
    const length = record.structured_fields.length_of_service_band;
    if (length === ">=2y") return 2;
    if (length === "1-2y") return 1.2;
    return 1;
  }
  return 1;
}

function jurisdictionScore(record: EnquiryRecord): number {
  if (record.vertical === "employment") {
    const status = record.structured_fields.employment_status;
    if (status === "employee") return 2;
    if (status === "worker") return 1.5;
    return 1;
  }
  return 1.5;
}

export function computeScore(record: EnquiryRecord): ScoreBreakdown {
  return {
    structure: structureScore(record),
    timing: timingScore(record),
    substance: substanceScore(record),
    evidence: evidenceScore(record),
    valueImpact: valueImpactScore(record),
    jurisdiction: jurisdictionScore(record),
  };
}

export function determinePriority(record: EnquiryRecord): { priority: Priority; overrides: string[]; explanation: string } {
  const overrides: string[] = [];
  const explanation: string[] = [];

  // Safeguarding or violence
  if (
    record.structured_fields.safeguarding_concerns === "yes" ||
    record.structured_fields.immediate_safety === "yes"
  ) {
    overrides.push("safeguarding");
  }

  // Employment automatic unfair triggers
  if (record.vertical === "employment") {
    const automatic = record.structured_fields.automatic_unfair as string[] | undefined;
    if (automatic && automatic.some((item) => item !== "none")) {
      overrides.push("automatic_unfair");
    }
    const process = record.structured_fields.process_followed as string[] | undefined;
    if (process?.includes("none")) {
      overrides.push("no_process");
    }
    const dismissalDate = asDate(record.structured_fields.dismissal_date);
    if (dismissalDate) {
      const days = Math.abs(differenceInCalendarDays(new Date(), dismissalDate));
      if (days <= 14) overrides.push("limitation_risk");
    }
  }

  if (record.vertical === "disputes") {
    if (record.structured_fields.proceedings_status === "issued") {
      overrides.push("proceedings_issued");
    }
  }

  const breakdown = computeScore(record);
  const total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);

  let priority: Priority = "C";
  if (overrides.length > 0 || total >= 9) {
    priority = "A";
    explanation.push("High risk or override triggered");
  } else if (total >= 6) {
    priority = "B";
    explanation.push("Solid indicators present");
  } else if (total <= 2) {
    priority = "Filtered";
    explanation.push("Insufficient indicators");
  }

  return {
    priority,
    overrides,
    explanation: `${priority}: ${explanation.join("; ")} (score ${total.toFixed(1)})`,
  };
}
