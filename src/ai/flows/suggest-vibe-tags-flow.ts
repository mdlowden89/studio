
'use server';
/**
 * @fileOverview AI flow to suggest vibe tags based on user's bio and existing tags.
 *
 * - suggestVibeTagsForUser - A function that suggests new vibe tags with emojis.
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

// New schema for a single suggestion with an emoji
const VibeTagSuggestionSchema = z.object({
  tag: z
    .string()
    .describe(
      'The vibe tag text, in lowercase. Should be concise (1-3 words).'
    ),
  emoji: z.string().describe('A single emoji that represents the tag.'),
});

const SuggestVibeTagsOutputSchema = z.object({
  suggestedTags: z
    .array(VibeTagSuggestionSchema)
    .describe(
      'An array of up to 7 new, distinct, and diverse vibe tag suggestions, each with a corresponding emoji.'
    ),
});

export type VibeTagSuggestion = z.infer<typeof VibeTagSuggestionSchema>;
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
  prompt: `You are an expert in creating vibrant and expressive user profiles for a dating app called Crossd.
Your task is to suggest 'vibe tags' for a user based on their biography and existing tags.

**CRUCIAL RULE: Every single tag you suggest MUST have a corresponding emoji.**

The suggested tags must be:
- Relevant to the user's bio.
- Distinct from their existing tags.
- Concise (ideally 1-3 words) and in lowercase.
- Diverse, covering personality, hobbies, interests, places, and lifestyle.

Here are examples of good tags with emojis:
- Personality: funny 😂, ambitious ✨, night owl 🦉, thoughtful 🤔, spontaneous ⚡️, optimist 😊
- Hobbies: gaming 🎮, reading 📚, cooking 🍳, hiking 🏔️, movies 🎬, live music 🎤, dancing 💃, art 🎨
- Places: coffee shops ☕️, beaches 🏖️, mountains ⛰️, museums 🏛️, countryside 🌳, theatre 🎭, cinema 🍿, restaurants 🍽️
- Lifestyle: foodie 🍕, travel ✈️, dogs 🐶, cats 🐱, fitness 💪, sustainable living ♻️
- Zodiac Signs: aries ♈️, taurus ♉️, gemini ♊️, cancer ♋️, leo ♌️, virgo ♍️, libra ♎️, scorpio ♏️, sagittarius ♐️, capricorn ♑️, aquarius ♒️, pisces ♓️

User Bio:
"{{userBio}}"

Existing Vibe Tags (do NOT suggest these):
{{#if existingTags}}
{{#each existingTags}}
- {{this}}
{{/each}}
{{else}}
None
{{/if}}

Analyze the bio and existing tags, then generate up to 7 new, creative suggestions.
Provide your suggestions in the 'suggestedTags' output field, with each item containing a 'tag' and its 'emoji'.
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
    if (!output) {
      return { suggestedTags: [] };
    }
    return output;
  }
);
