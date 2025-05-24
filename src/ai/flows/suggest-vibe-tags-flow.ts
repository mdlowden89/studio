
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
      'An array of 5-7 new, distinct vibe tag suggestions relevant to the user bio and existing tags, in lowercase.'
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
  prompt: `You are an expert at understanding user personalities and interests.
Given a user's biography and their existing vibe tags, suggest 5 to 7 new and distinct vibe tags that would complement their profile.
The suggested tags should be relevant, concise (1-2 words), and in lowercase.
Do not suggest any tags that are already in their existing list.

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

Based on this, provide your suggestions in the 'suggestedTags' field.
`,
});

const suggestVibeTagsFlow = ai.defineFlow(
  {
    name: 'suggestVibeTagsFlow',
    inputSchema: SuggestVibeTagsInputSchema,
    outputSchema: SuggestVibeTagsOutputSchema,
  },
  async input => {
    // In a real scenario, you might add more complex logic here,
    // like fetching more user data or calling other services.
    const {output} = await prompt(input);
    return output!;
  }
);
