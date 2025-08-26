
'use server';
/**
 * @fileOverview AI flow to generate compatibility insights for Spark Swipe.
 *
 * - getSparkSwipeInsights - A function that returns a detailed compatibility analysis.
 * - SparkSwipeInput - The input type for the getSparkSwipeInsights function.
 * - SparkSwipeOutput - The return type for the getSparkSwipeInsights function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { UserProfile } from '@/lib/types';

// We define a Zod schema for UserProfile to use in the flow.
// It's a subset of the main type, focusing on what the AI needs.
const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number(),
  bio: z.string(),
  vibeTags: z.array(z.string()),
  locationPatterns: z.array(z.string()).optional(),
  prompts: z
    .array(
      z.object({
        promptId: z.string(),
        question: z.string().describe("The question for the prompt."),
        answer: z.string(),
      })
    )
    .optional(),
});

const SparkSwipeInputSchema = z.object({
  currentUserProfile: UserProfileSchema.describe("The profile of the user who is swiping."),
  candidateUserProfile: UserProfileSchema.describe("The profile of the user being considered for a match."),
});
export type SparkSwipeInput = z.infer<typeof SparkSwipeInputSchema>;

const SparkSwipeOutputSchema = z.object({
  headlineReasoning: z.string().describe("A short, compelling, one-sentence summary for why these users might match. Example: 'Based on your vibe and past spark patterns, this person matches your rhythm.'"),
  vibeTagAnalysis: z.object({
    commonTags: z.array(z.string()).describe("A list of vibe tags the two users share."),
    compatibilityReasoning: z.string().describe("A sentence explaining why their vibes match, even if they don't share exact tags. Example: 'Creative Wanderers and Late-Night Thinkers often spark well together.'"),
  }),
  locationAnalysis: z.object({
    compatibilityReasoning: z.string().describe("A sentence explaining their lifestyle overlap based on location types. Example: 'You both love independent cafés and weekend bookshops.' or 'You both spend Sundays in cozy spots.'"),
  }),
  collaborativeFilteringAnalysis: z.object({
    recommendationReasoning: z.string().describe("A Netflix-style recommendation. Example: 'Users like you who matched with thoughtful introverts also matched with this person.'"),
  }),
  sparkFlowScore: z.number().min(0).max(100).describe("A compatibility score from 0 to 100, representing a high momentum prediction."),
  sparkPrompt: z.string().optional().describe("An actionable conversation starter or first date idea based on shared interests or location patterns. Example: 'You both love late-night coffee shops — could this be your first date spot?'"),
  compatibilityTagline: z.string().optional().describe("A dynamic, gamified tagline summarizing the match. Example: '95% match on Night Owl energy 🌙' or '88% match on Adventurous Spirit 🏔️'. Must include the score, a key reason, and an emoji."),
});
export type SparkSwipeOutput = z.infer<typeof SparkSwipeOutputSchema>;

export async function getSparkSwipeInsights(
  input: SparkSwipeInput
): Promise<SparkSwipeOutput> {
  return sparkSwipeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sparkSwipePrompt',
  input: { schema: SparkSwipeInputSchema },
  output: { schema: SparkSwipeOutputSchema },
  prompt: `You are a sophisticated compatibility expert for a dating app called Crossd. Your task is to analyze two user profiles and generate a "Spark Insights" panel.
You must act as if you have access to a large dataset of past user interactions to make your analysis feel intelligent and personalized.

Analyze the two profiles provided below:
- Current User: {{currentUserProfile.name}}, age {{currentUserProfile.age}}
- Candidate User: {{candidateUserProfile.name}}, age {{candidateUserProfile.age}}

**Current User Profile Details:**
- Bio: "{{currentUserProfile.bio}}"
- Vibe Tags: {{#each currentUserProfile.vibeTags}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}
- Frequented Location Types: {{#each currentUserProfile.locationPatterns}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}
{{#if currentUserProfile.prompts}}
- Their Answers to Profile Prompts (use these to understand their personality and humor):
  {{#each currentUserProfile.prompts}}
  - Q: {{this.question}}
    A: "{{this.answer}}"
  {{/each}}
{{/if}}

**Candidate User Profile Details:**
- Bio: "{{candidateUserProfile.bio}}"
- Vibe Tags: {{#each candidateUserProfile.vibeTags}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}
- Frequented Location Types: {{#each candidateUserProfile.locationPatterns}}'{{this}}'{{#unless @last}}, {{/unless}}{{/each}}
{{#if candidateUserProfile.prompts}}
- Their Answers to Profile Prompts (use these to understand their personality and humor):
  {{#each candidateUserProfile.prompts}}
  - Q: {{this.question}}
    A: "{{this.answer}}"
  {{/each}}
{{/if}}

**Your Task:**
Generate a JSON object that adheres to the output schema. Follow these instructions precisely:

1.  **headlineReasoning**: Write a short, engaging, one-sentence summary of why they are a good match.
2.  **vibeTagAnalysis**:
    -   'commonTags': Identify and list the exact vibe tags they have in common.
    -   'compatibilityReasoning': Even if they don't share many tags, find a creative connection between their vibes. For example, if one is a "Chill Walker" and the other is a "Bookstore Romantic," you might say, "Your shared love for quiet, thoughtful activities suggests a strong potential connection."
3.  **locationAnalysis**:
    -   'compatibilityReasoning': Analyze their 'locationPatterns'. Don't just list them. Create a compelling sentence about their lifestyle overlap. Example: "You both frequent similar types of places on weekends, like cozy cafés and bookstores."
4.  **collaborativeFilteringAnalysis**:
    -   'recommendationReasoning': Invent a plausible-sounding collaborative filtering insight. Use the format "Users like you who matched with [some user type] also matched with this person." Do not use the candidate's actual name in the output. For example: "Users like you who vibe with thoughtful introverts also tend to spark with artsy adventurers."
5.  **sparkFlowScore**: Provide a compatibility score between 60 and 95. Be realistic.
6.  **sparkPrompt**: Based on their shared interests (from vibe tags, location patterns, or prompts), generate a creative and actionable conversation starter or a first date idea. Make it specific. Example: "You're both into live music. Maybe you could check out the new band playing at The Roxy this Friday?" or "Since you both love hiking, have you ever explored the trails at Redwood Park?"
7.  **compatibilityTagline**: This is crucial. Create a short, gamified tagline that includes the sparkFlowScore, a key matching reason, and a relevant emoji. Examples: "92% match on Creative Energy ✨", "88% match on Adventurous Spirit 🏔️", "95% match on Night Owl energy 🌙". This should be different from the other reasoning fields and feel like a punchy summary.

Your entire response must be a single, valid JSON object matching the requested schema.
`,
});

const sparkSwipeFlow = ai.defineFlow(
  {
    name: 'sparkSwipeFlow',
    inputSchema: SparkSwipeInputSchema,
    outputSchema: SparkSwipeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error("Failed to generate Spark Swipe insights from AI.");
    }
    return output;
  }
);
