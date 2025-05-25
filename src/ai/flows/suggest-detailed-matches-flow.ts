
'use server';
/**
 * @fileOverview AI flow to suggest detailed matches with reasons.
 *
 * - suggestDetailedMatches - A function that suggests detailed matches.
 * - SuggestDetailedMatchesInput - The input type for this function.
 * - SuggestDetailedMatchesOutput - The return type for this function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { UserProfile } from '@/lib/types';

// Define a Zod schema for the UserProfile subset needed for the prompt
const UserProfileForPromptSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  bio: z.string(),
  images: z.array(z.string()),
  vibeTags: z.array(z.string()),
  locationPatterns: z.array(z.string()).optional(),
  prompts: z.array(z.object({ promptId: z.string(), answer: z.string() })),
  work: z.string().optional(),
  jobTitle: z.string().optional(),
  education: z.string().optional(),
  ethnicity: z.string().optional(),
  childrenStatus: z.string().optional(),
  familyPlans: z.string().optional(),
  height: z.string().optional(),
  locationAddress: z.string().optional(),
  locationName: z.string().optional(),
  locationCoordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
  drinking: z.string().optional(),
  smoking: z.string().optional(),
  zodiacSign: z.string().optional(),
});


const SuggestDetailedMatchesInputSchema = z.object({
  currentUserProfile: UserProfileForPromptSchema.describe("The profile of the user for whom matches are being suggested."),
  otherUserProfiles: z.array(UserProfileForPromptSchema).describe(
    'An array of other user profiles to consider for matching.'
  ),
});
export type SuggestDetailedMatchesInput = z.infer<typeof SuggestDetailedMatchesInputSchema>;

const DetailedMatchSuggestionSchema = z.object({
  user: UserProfileForPromptSchema.describe("The suggested user profile."),
  matchScore: z.number().min(60).max(99).describe('A compatibility score between 60 and 99.'),
  sharedInterestReason: z.string().describe('A concise reason based on shared interests or vibe tags (e.g., "You both enjoy creative pursuits and art."). Finish with a period.'),
  sharedLocationReason: z.string().describe('A concise reason based on shared location patterns or types (e.g., "You both frequent similar spots like coffee shops and parks."). Finish with a period.'),
  sharedVibeTags: z.array(z.string()).describe('A list of 2-3 key vibe tags common between the users.'),
});
export type DetailedMatchSuggestion = z.infer<typeof DetailedMatchSuggestionSchema>;


const SuggestDetailedMatchesOutputSchema = z.object({
  detailedMatches: z.array(DetailedMatchSuggestionSchema).max(3).describe(
    'An array of up to 3 detailed match suggestions, sorted by compatibility.'
  ),
});
export type SuggestDetailedMatchesOutput = z.infer<typeof SuggestDetailedMatchesOutputSchema>;


export async function suggestDetailedMatches(
  input: SuggestDetailedMatchesInput
): Promise<SuggestDetailedMatchesOutput> {
  return suggestDetailedMatchesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestDetailedMatchesPrompt',
  input: {schema: SuggestDetailedMatchesInputSchema},
  output: {schema: SuggestDetailedMatchesOutputSchema},
  prompt: `You are an AI matchmaker for a dating app called Crossd. Your goal is to provide highly relevant and insightful match suggestions.
You will be given the current user's profile and a list of other user profiles.
Analyze these profiles to find the 3 most compatible matches for the current user.

For each of the top 3 matches, you MUST provide:
1.  The matched user's profile object.
2.  A 'matchScore': A numerical compatibility score between 60 and 99. Higher is better.
3.  A 'sharedInterestReason': A concise, compelling sentence (ending with a period) explaining a key shared interest or vibe. Example: "You both share a passion for adventure and exploring new trails." or "You both appreciate cozy nights in and captivating books."
4.  A 'sharedLocationReason': A concise, compelling sentence (ending with a period) explaining a similarity in frequented locations or types of places. Example: "You both tend to visit artistic spots like galleries and indie cinemas." or "It seems you both enjoy the energy of live music venues."
5.  'sharedVibeTags': An array of 2-3 specific vibe tags that both users share. These tags should be directly from their profiles.

Current User Profile:
Name: {{currentUserProfile.name}}
Vibe Tags: {{#if currentUserProfile.vibeTags}} {{join currentUserProfile.vibeTags ", "}} {{else}} None {{/if}}
Location Patterns: {{#if currentUserProfile.locationPatterns}} {{join currentUserProfile.locationPatterns ", "}} {{else}} None {{/if}}
Bio: {{currentUserProfile.bio}}

Consider these other user profiles:
{{#each otherUserProfiles}}
User ID: {{id}}
Name: {{name}}
Age: {{age}}
Vibe Tags: {{#if vibeTags}} {{join vibeTags ", "}} {{else}} None {{/if}}
Location Patterns: {{#if locationPatterns}} {{join locationPatterns ", "}} {{else}} None {{/if}}
Bio: {{bio}}
---
{{/each}}

Based on the current user's profile and the list of other users, generate the top 3 detailed match suggestions.
Focus on genuine compatibility signals from vibe tags, bio content, and location patterns.
Ensure the reasons are engaging and highlight specific commonalities.
Return the suggestions in the 'detailedMatches' output field, sorted by matchScore descending.
Do not make up vibe tags for the 'sharedVibeTags' field; only use tags present in both users' profiles.
If no strong shared tags exist for a good match, the sharedVibeTags array can be empty, but try to find at least one if possible.
The sharedInterestReason and sharedLocationReason should sound natural and inviting.
`,
});

const suggestDetailedMatchesFlow = ai.defineFlow(
  {
    name: 'suggestDetailedMatchesFlow',
    inputSchema: SuggestDetailedMatchesInputSchema,
    outputSchema: SuggestDetailedMatchesOutputSchema,
  },
  async (input: SuggestDetailedMatchesInput) => {
    // In a real app, you might filter otherUserProfiles further or apply pre-processing.
    // For example, ensure not to suggest users already matched or blocked.
    const {output} = await prompt(input);
    
    // Ensure the output contains the full user profile for each suggestion.
    // The prompt asks the model to return the user object, but let's verify.
    const validatedMatches = output?.detailedMatches.map(match => {
      const fullUserProfile = input.otherUserProfiles.find(p => p.id === match.user.id);
      return {
        ...match,
        user: fullUserProfile || match.user, // Fallback to what model returned if not found, though it should be
      };
    }) || [];
    
    return { detailedMatches: validatedMatches.slice(0, 3) }; // Ensure max 3
  }
);

// Helper function to make UserProfile compatible with UserProfileForPromptSchema
// This is necessary because Zod schemas can be strict about extra fields.
export function sanitizeUserProfileForPrompt(user: UserProfile): z.infer<typeof UserProfileForPromptSchema> {
    return UserProfileForPromptSchema.parse(user);
}
