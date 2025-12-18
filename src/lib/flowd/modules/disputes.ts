import { QuestionNode, Vertical } from "../types";

const vertical: Vertical = "disputes";

export const disputesQuestions: QuestionNode[] = [
  {
    id: "opening",
    text:
      "I’m sorry you’re dealing with this dispute. I’ll ask focused questions to capture the key facts so the firm can review.",
    field: "opening_ack",
    required: false,
    type: "text",
    vertical,
  },
  {
    id: "dispute_type",
    text: "Is this about a contract, debt, property, consumer issue, or something else?",
    field: "dispute_type",
    required: true,
    type: "enum",
    options: ["contract", "debt", "property", "consumer", "other"],
    vertical,
  },
  {
    id: "parties",
    text: "Who are the parties involved: individuals, businesses, or a public body?",
    field: "parties",
    required: true,
    type: "enum",
    options: ["individual", "business", "public_body", "mixed"],
    vertical,
  },
  {
    id: "incident_or_breach_date",
    text: "When did the incident or breach occur?",
    field: "incident_or_breach_date",
    required: true,
    type: "date",
    vertical,
  },
  {
    id: "evidence_list",
    text: "What evidence do you have (emails, contracts, photos)?",
    field: "evidence_list",
    required: true,
    type: "text",
    vertical,
  },
  {
    id: "loss_value_band",
    text: "Roughly what is the loss or claim value?",
    field: "loss_value_band",
    required: true,
    type: "enum",
    options: ["<5k", "5-25k", ">25k", "unknown"],
    vertical,
  },
  {
    id: "proceedings_status",
    text: "Have any proceedings been issued yet?",
    field: "proceedings_status",
    required: true,
    type: "enum",
    options: ["none", "letter_before_action", "issued", "unknown"],
    vertical,
  },
  {
    id: "urgency_flags",
    text: "Are there any hearings or deadlines coming up?",
    field: "urgency_flags",
    required: true,
    type: "text",
    vertical,
  },
];
