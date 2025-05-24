
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
      'An array of 5-7 new, distinct, and diverse vibe tag suggestions relevant to the user bio and existing tags, in lowercase.'
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
  prompt: `You are an AI assistant specializing in crafting compelling user profiles. Your task is to suggest new vibe tags.
Analyze the user's biography and their existing vibe tags. Based on this, generate 5 to 7 *new* and *diverse* vibe tags that offer fresh perspectives or highlight unstated but implied interests or personality traits.
The suggested tags must be:
- Relevant to the user's bio and existing tags.
- Concise (ideally 1-2 words).
- In lowercase.
- **Crucially, they must NOT be present in the user's existing vibe tags list.**

User Bio:
"{{userBio}}"

Existing Vibe Tags:
{{#if existingTags}}
{{#each existingTags}}
- {{this}}
{{/each}}
{{else}}
None
{{/if}}

Provide your distinct suggestions in the 'suggestedTags' output field. Focus on creativity and expanding the user's self-representation.
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

