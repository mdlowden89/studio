
'use server';
/**
 * @fileOverview AI flow to suggest or rewrite a user's bio.
 *
 * - suggestBioForUser - A function that suggests a new bio.
 * - SuggestBioInput - The input type for the suggestBioForUser function.
 * - SuggestBioOutput - The return type for the suggestBioForUser function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PromptAnswerSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const SuggestBioInputSchema = z.object({
  name: z.string().describe("The user's name."),
  age: z.number().describe("The user's age."),
  currentBio: z.string().optional().describe('The current biography of the user, if any.'),
  vibeTags: z
    .array(z.string())
    .optional()
    .describe('An array of vibe tags describing the user.'),
  work: z.string().optional().describe("The user's place of work."),
  jobTitle: z.string().optional().describe("The user's job title."),
  education: z.string().optional().describe("The user's education."),
  promptAnswers: z
    .array(PromptAnswerSchema)
    .optional()
    .describe("A list of questions the user has answered and their answers."),
});
export type SuggestBioInput = z.infer<typeof SuggestBioInputSchema>;

const SuggestBioOutputSchema = z.object({
  suggestedBio: z
    .string()
    .describe('A new, engaging bio suggestion based on the input.'),
});
export type SuggestBioOutput = z.infer<typeof SuggestBioOutputSchema>;

export async function suggestBioForUser(
  input: SuggestBioInput
): Promise<SuggestBioOutput> {
  return suggestBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBioPrompt',
  input: {schema: SuggestBioInputSchema},
  output: {schema: SuggestBioOutputSchema},
  prompt: `You are an AI assistant and expert profile writer for a dating app called Crossd. Your specialty is crafting bios that tell a compelling story about a person, making them sound human, authentic, and intriguing.

Your task is to synthesize all the provided user information into a new, engaging, and concise bio.

**Guiding Principles for the Bio:**
- **Tell a Story:** Don't just list facts. Weave their interests, work, and personality into a small narrative.
- **Show, Don't Tell:** Instead of "I like coffee and books," try something like "My ideal Sunday involves getting lost in a good bookstore with a warm latte in hand."
- **Be Authentic and Positive:** The tone should be warm, approachable, and reflect a genuine personality.
- **Length:** Keep it concise, around 2-4 sentences.

**User Information:**
- Name: {{name}}
- Age: {{age}}

{{#if currentBio}}
- Current Bio (to refine or replace): "{{currentBio}}"
{{/if}}

{{#if vibeTags}}
- Vibe Tags that describe them:
  {{#each vibeTags}}
  - {{this}}
  {{/each}}
{{/if}}

{{#if work}}
- Work: {{work}}{{#if jobTitle}} ({{jobTitle}}){{/if}}
{{/if}}
{{#if education}}
- Education: {{education}}
{{/if}}

{{#if promptAnswers}}
- Their Answers to Profile Prompts (use these to understand their personality and humor):
  {{#each promptAnswers}}
  - Q: {{this.question}}
    A: "{{this.answer}}"
  {{/each}}
{{/if}}

Based on all this information, write a compelling new bio that tells a story about {{name}}. Return the new bio in the 'suggestedBio' output field.
`,
});

const suggestBioFlow = ai.defineFlow(
  {
    name: 'suggestBioFlow',
    inputSchema: SuggestBioInputSchema,
    outputSchema: SuggestBioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
