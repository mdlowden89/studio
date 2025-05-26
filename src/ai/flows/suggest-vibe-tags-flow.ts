
'use server';
/**
 * @fileOverview AI flow to suggest vibe tags based on user's bio and existing tags.
 *
 * - suggestVibeTagsForUser - A function that suggests new vibe tags.
 * - SuggestVibeTagsInput - The input type for the suggestVibeTagsForUser function.
 * - SuggestVibeTagsOutput - The return type for the suggestVibeTagsForUser function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestVibeTagsInputSchema = z.object({
  userBio: z.string().describe('The biography of the user.'),
  existingTags: z
    .array(z.string())
    .describe('An array of vibe tags the user already has.'),
});
export type SuggestVibeTagsInput = z.infer<
  typeof SuggestVibeTagsInputSchema
>;

const SuggestVibeTagsOutputSchema = z.object({
  suggestedTags: z
    .array(z.string())
    .describe(
      'An array of up to 7 new, distinct, and diverse vibe tag suggestions relevant to the user bio and existing tags, in lowercase. Quality over quantity.'
    ),
});
export type SuggestVibeTagsOutput = z.infer<
  typeof SuggestVibeTagsOutputSchema
>;

export async function suggestVibeTagsForUser(
  input: SuggestVibeTagsInput
): Promise<SuggestVibeTagsOutput> {
  return suggestVibeTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestVibeTagsPrompt',
  input: {schema: SuggestVibeTagsInputSchema},
  output: {schema: SuggestVibeTagsOutputSchema},
  prompt: `You are an AI assistant specializing in crafting compelling user profiles. Your task is to suggest vibe tags.
Analyze the user's biography and their existing vibe tags for context.
Based on this, generate a list of diverse vibe tags (aim for around 5, but fewer high-quality, distinct tags are acceptable) that offer fresh perspectives or highlight unstated but implied interests or personality traits reflected in their bio.

The suggested tags must be:
- Relevant to the user's bio.
- Concise (ideally 1-2 words).
- In lowercase.

User Bio:
"{{userBio}}"

Existing Vibe Tags (for context, try to offer something different):
{{#if existingTags}}
{{#each existingTags}}
- {{this}}
{{/each}}
{{else}}
None
{{/if}}

Provide your suggestions in the 'suggestedTags' output field. Focus on creativity and identifying new aspects from the bio that might not be fully covered by existing tags.
`,
});

const suggestVibeTagsFlow = ai.defineFlow(
  {
    name: 'suggestVibeTagsFlow',
    inputSchema: SuggestVibeTagsInputSchema,
    outputSchema: SuggestVibeTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

