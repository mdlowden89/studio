import { EnquiryRecord, Priority, Vertical } from "./types";
import { computeScore, determinePriority } from "./scoring";

export interface Scenario {
  name: string;
  vertical: Vertical;
  fields: Record<string, unknown>;
  expectedPriority: Priority;
  expectOverride?: boolean;
}

function buildEmploymentScenario(index: number, type: "good" | "bad" | "borderline"): Scenario {
  const base = {
    employment_status: type === "bad" ? "contractor" : "employee",
    length_of_service_band: type === "good" ? ">=2y" : type === "borderline" ? "1-2y" : "<1y",
    dismissed_or_resigned: "dismissed",
    dismissal_date: `2024-12-${(index % 28) + 1}`,
    reason_given: index % 2 === 0 ? "performance" : "redundancy",
    process_followed: type === "bad" ? ["warnings"] : ["none"],
    documents_available: index % 3 === 0 ? "yes" : "unsure",
    automatic_unfair: type === "good" && index % 5 === 0 ? ["whistleblowing"] : ["none"],
  };
  const expectedPriority: Priority =
    type === "good"
      ? "A"
      : type === "borderline"
      ? "B"
      : index % 2 === 0
      ? "Filtered"
      : "C";
  return {
    name: `employment-${type}-${index}`,
    vertical: "employment",
    fields: base,
    expectedPriority,
    expectOverride: base.automatic_unfair?.[0] !== "none" || base.process_followed === "none",
  };
}

function buildFamilyScenario(index: number, type: "good" | "bad" | "borderline"): Scenario {
  const base = {
    matter_type: index % 2 === 0 ? "children" : "domestic_abuse",
    children_involved: index % 2 === 0,
    safeguarding_concerns: type === "good" ? "yes" : type === "borderline" ? "unsure" : "no",
    immediate_safety: type === "good" ? "yes" : "no",
    urgency_flags: type === "bad" ? "none" : "hearing soon",
  };
  const expectedPriority: Priority = type === "good" ? "A" : type === "borderline" ? "B" : "C";
  return {
    name: `family-${type}-${index}`,
    vertical: "family",
    fields: base,
    expectedPriority,
    expectOverride: base.safeguarding_concerns === "yes" || base.immediate_safety === "yes",
  };
}

function buildDisputeScenario(index: number, type: "good" | "bad" | "borderline"): Scenario {
  const base = {
    dispute_type: "contract",
    parties: index % 2 === 0 ? "business" : "individual",
    incident_or_breach_date: `2024-11-${(index % 27) + 1}`,
    evidence_list: type === "bad" ? "" : "emails and contract",
    loss_value_band: type === "good" ? ">25k" : type === "borderline" ? "5-25k" : "<5k",
    proceedings_status: type === "good" && index % 2 === 0 ? "issued" : "none",
    urgency_flags: "deadline soon",
  };
  const expectedPriority: Priority =
    type === "good" ? "A" : type === "borderline" ? "B" : index % 2 === 0 ? "Filtered" : "C";
  return {
    name: `dispute-${type}-${index}`,
    vertical: "disputes",
    fields: base,
    expectedPriority,
    expectOverride: base.proceedings_status === "issued",
  };
}

function range(count: number): number[] {
  return Array.from({ length: count }, (_, i) => i + 1);
}

export const scenarios: Scenario[] = [
  ...range(20).flatMap((i) => [
    buildEmploymentScenario(i, "good"),
    buildEmploymentScenario(i, "bad"),
    buildEmploymentScenario(i, "borderline"),
  ]),
  ...range(20).flatMap((i) => [
    buildFamilyScenario(i, "good"),
    buildFamilyScenario(i, "bad"),
    buildFamilyScenario(i, "borderline"),
  ]),
  ...range(20).flatMap((i) => [
    buildDisputeScenario(i, "good"),
    buildDisputeScenario(i, "bad"),
    buildDisputeScenario(i, "borderline"),
  ]),
];

export function evaluateScenario(scenario: Scenario) {
  const record: EnquiryRecord = {
    enquiry_id: scenario.name,
    firm_id: "test",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    vertical: scenario.vertical,
    subcategory: "test",
    status: "in_progress",
    structured_fields: scenario.fields,
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

  const breakdown = computeScore(record);
  record.score_breakdown = breakdown;
  record.score_total = Object.values(breakdown).reduce((sum, val) => sum + val, 0);
  const priorityResult = determinePriority(record);
  record.priority = priorityResult.priority;
  record.overrides = priorityResult.overrides;
  return {
    record,
    expectedPriority: scenario.expectedPriority,
    matches: priorityResult.priority === scenario.expectedPriority,
    overrideTriggered: scenario.expectOverride ? priorityResult.overrides.length > 0 : true,
  };
}
