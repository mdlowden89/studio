'use server';

/**
 * @fileOverview AI flow to suggest potential matches based on vibe tags and location patterns.
 *
 * - suggestMatchesFromVibe - A function that suggests matches based on vibe and location.
 * - SuggestMatchesInput - The input type for the suggestMatchesFromVibe function.
 * - SuggestMatchesOutput - The return type for the suggestMatchesFromVibe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMatchesInputSchema = z.object({
  userVibeTags: z
    .array(z.string())
    .describe('An array of vibe tags describing the user.'),
  userLocationPatterns: z
    .array(z.string())
    .describe('An array of location patterns of the user.'),
  otherUserProfiles: z
    .array(z.string())
    .describe(
      'An array of other user profiles, each profile is a stringified JSON object.'
    ),
});
export type SuggestMatchesInput = z.infer<typeof SuggestMatchesInputSchema>;

const SuggestMatchesOutputSchema = z.object({
  suggestedMatches: z
    .array(z.string())
    .describe(
      'An array of suggested user profiles (stringified JSON objects) that are compatible with the user, sorted by compatibility.'
    ),
});
export type SuggestMatchesOutput = z.infer<typeof SuggestMatchesOutputSchema>;

export async function suggestMatchesFromVibe(
  input: SuggestMatchesInput
): Promise<SuggestMatchesOutput> {
  return suggestMatchesFromVibeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMatchesPrompt',
  input: {schema: SuggestMatchesInputSchema},
  output: {schema: SuggestMatchesOutputSchema},
  prompt: `You are an AI matchmaker, recommending potential matches based on shared interests and location patterns.

  User Vibe Tags: {{userVibeTags}}
  User Location Patterns: {{userLocationPatterns}}

  Other User Profiles: {{otherUserProfiles}}

  Based on the vibe tags and location patterns of the user, identify the best potential matches from the other user profiles provided.
  Return the suggested matches, sorted by compatibility, in the suggestedMatches output field.  Each user profile should be returned as a stringified JSON object.
  Do not include any additional explanation or conversation in your response; just return the list of stringified user profiles.
  `,
});

const suggestMatchesFromVibeFlow = ai.defineFlow(
  {
    name: 'suggestMatchesFromVibeFlow',
    inputSchema: SuggestMatchesInputSchema,
    outputSchema: SuggestMatchesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
