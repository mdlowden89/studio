
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

const SuggestBioInputSchema = z.object({
  currentBio: z.string().optional().describe('The current biography of the user, if any.'),
  vibeTags: z
    .array(z.string())
    .optional()
    .describe('An array of vibe tags describing the user.'),
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
  prompt: `You are an AI assistant specializing in crafting compelling user profiles for a dating app called Crossd.
Your task is to generate a new, engaging, and concise bio for a user.

Consider the user's vibe tags (if provided) to capture their personality and interests.
{{#if vibeTags}}
User's Vibe Tags:
{{#each vibeTags}}
- {{this}}
{{/each}}
{{/if}}

{{#if currentBio}}
User's Current Bio (you can choose to refine this or write a new one):
"{{currentBio}}"

Based on the above, suggest a new bio that is approximately 2-4 sentences long. It should be authentic, slightly intriguing, and positive in tone.
Focus on making the user sound approachable and interesting.
{{else}}
Based on the vibe tags (if any), write a new bio that is approximately 2-4 sentences long. It should be authentic, slightly intriguing, and positive in tone.
Focus on making the user sound approachable and interesting. If no vibe tags are provided, create a general, friendly bio.
{{/if}}

Return the bio in the 'suggestedBio' output field.
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
