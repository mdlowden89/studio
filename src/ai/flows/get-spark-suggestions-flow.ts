
'use server';
/**
 * @fileOverview AI flow to suggest places for a user to visit.
 *
 * - getSparkSuggestions - A function that returns a list of suggested places.
 * - SparkSuggestionInput - The input type for the getSparkSuggestions function.
 * - SparkSuggestionOutput - The return type for the getSparkSuggestions function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { UserProfile } from '@/lib/types';

// We define a Zod schema for UserProfile to use in the flow.
// It's a subset of the main type, focusing on what the AI needs.
const UserProfileSubsetSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  vibeTags: z.array(z.string()),
  locationPatterns: z.array(z.string()).optional(),
  mbtiType: z.string().optional(),
  locationAddress: z.string().optional().describe("The user's current city or general location to search within."),
});

const SparkSuggestionInputSchema = z.object({
  userProfile: UserProfileSubsetSchema.describe("The profile of the user seeking suggestions."),
});
export type SparkSuggestionInput = z.infer<typeof SparkSuggestionInputSchema>;

const PlaceSuggestionSchema = z.object({
    id: z.string().describe("A unique ID for the suggestion."),
    placeName: z.string().describe("The name of the suggested place."),
    type: z.string().describe("A category for the suggestion, e.g., 'Hidden Gem', 'High-Spark Spot', 'Date Night'.") ,
    vibe: z.string().describe("The primary vibe of the place, e.g., 'Cozy & Chill', 'Live Music', 'Artistic'."),
    reason: z.string().describe("A compelling, one-sentence reason why this place is a good fit for the user's vibe and personality."),
});

const SparkSuggestionOutputSchema = z.object({
  suggestions: z.array(PlaceSuggestionSchema).describe("An array of up to 5 personalized place suggestions."),
});
export type SparkSuggestionOutput = z.infer<typeof SparkSuggestionOutputSchema>;

export async function getSparkSuggestions(
  input: SparkSuggestionInput
): Promise<SparkSuggestionOutput> {
  // In a real implementation, this would call the Genkit flow.
  // For now, we return mock data.
  console.log("getSparkSuggestions called with input:", input);
  return Promise.resolve({ suggestions: [] });
}

// THIS IS THE DEFINITION FOR THE AI FLOW
// It is not called directly in this prototype, but defines the AI's task.

const prompt = ai.definePrompt({
  name: 'sparkSuggestionPrompt',
  input: { schema: SparkSuggestionInputSchema },
  output: { schema: SparkSuggestionOutputSchema },
  prompt: `You are a hipster, in-the-know city guide for a dating app called Crossd.
Your task is to act as a "serendipity guide" by suggesting 5 real-world places for a user to visit based on their profile.

**User Profile:**
- Name: {{userProfile.name}}
- MBTI Type: {{userProfile.mbtiType}}
- Vibe Tags: {{#each userProfile.vibeTags}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}
- Recent Places: {{#each userProfile.locationPatterns}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}
- Current City: {{userProfile.locationAddress}}

**Your Task:**
Generate a JSON object that adheres to the output schema. Follow these instructions precisely for each of the 5 suggestions:

1.  **placeName**: Find a REAL, interesting place (cafe, bar, park, gallery, etc.) in the user's city. Be specific (e.g., "The Night Owl Cafe", not "a cafe").
2.  **type**: Categorize the suggestion. Use one of: "Hidden Gem", "High-Spark Spot", "Echo Zone", "Creative Corner", "Date Night".
3.  **vibe**: Describe the place's atmosphere in 2-3 words. Examples: "Cozy & Chill", "Live Music", "Intellectual Buzz", "Romantic & Quiet".
4.  **reason**: This is the most important part. Write a compelling, personalized, one-sentence reason. Connect it to their personality.
    - Example for an INFP who likes 'bookstores': "Because you're an INFP who loves a good story, this quiet bookstore cafe is the perfect place to get lost in thought and maybe cross paths with another dreamer."
    - Example for an ESTP who likes 'live music': "Your ESTP energy thrives on excitement. This legendary music venue is where you'll find the city's best live acts and a high-energy crowd."

Your entire response must be a single, valid JSON object matching the requested schema. Do not suggest generic chains (like Starbucks). Be cool. Be specific.
`,
});

const getSparkSuggestionsFlow = ai.defineFlow(
  {
    name: 'getSparkSuggestionsFlow',
    inputSchema: SparkSuggestionInputSchema,
    outputSchema: SparkSuggestionOutputSchema,
  },
  async (input) => {
    // In a real scenario, you might use a Genkit tool to query Google Places API
    // based on the user's vibes and location before generating the final text.
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("Failed to generate Spark Suggestions from AI.");
    }
    return output;
  }
);
