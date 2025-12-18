import { disputesQuestions } from "./disputes";
import { employmentQuestions } from "./employment";
import { familyQuestions } from "./family";
import { QuestionNode, Vertical } from "../types";

export const moduleQuestions: Record<Vertical, QuestionNode[]> = {
  employment: employmentQuestions,
  family: familyQuestions,
  disputes: disputesQuestions,
};

export function getRequiredFields(vertical: Vertical): string[] {
  return moduleQuestions[vertical]
    .filter((q) => q.required)
    .map((q) => q.field);
}
