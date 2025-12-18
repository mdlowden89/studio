import { QuestionNode, Vertical } from "../types";

const vertical: Vertical = "family";

export const familyQuestions: QuestionNode[] = [
  {
    id: "opening",
    text:
      "I’m sorry you’re going through this. I’ll ask a few questions to understand the family situation and any safeguarding concerns.",
    field: "opening_ack",
    required: false,
    type: "text",
    vertical,
  },
  {
    id: "matter_type",
    text: "Is your matter about divorce, children, finances, domestic abuse, or cohabitation?",
    field: "matter_type",
    required: true,
    type: "enum",
    options: ["divorce", "children", "finances", "domestic_abuse", "cohabitation", "unknown"],
    vertical,
  },
  {
    id: "children_involved",
    text: "Are children involved?",
    field: "children_involved",
    required: true,
    type: "boolean",
    vertical,
  },
  {
    id: "safeguarding_concerns",
    text: "Are there any safeguarding concerns?",
    field: "safeguarding_concerns",
    required: true,
    type: "enum",
    options: ["yes", "no", "unsure"],
    vertical,
  },
  {
    id: "immediate_safety",
    text: "Is anyone in immediate danger or unsafe right now?",
    field: "immediate_safety",
    required: true,
    type: "enum",
    options: ["yes", "no", "unsure"],
    vertical,
  },
  {
    id: "urgency_flags",
    text: "Are there any urgent deadlines, hearings, or protection concerns?",
    field: "urgency_flags",
    required: true,
    type: "text",
    vertical,
  },
];
