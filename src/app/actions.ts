
"use server";

import { suggestVibeTagsForUser, SuggestVibeTagsInput } from "@/ai/flows/suggest-vibe-tags-flow";
import { suggestBioForUser, SuggestBioInput } from "@/ai/flows/suggest-bio-flow";
import type { UserProfile } from "@/lib/types";
// MOCK_USERS and MOCK_USER_ID are no longer needed here for the removed actions.
// DetailedMatchSuggestion and sanitizeUserProfileForPrompt are also no longer needed.

export async function getAiSuggestedVibeTags(
  userBio: string,
  existingTags: string[]
): Promise<string[]> {
  try {
    const input: SuggestVibeTagsInput = {
      userBio,
      existingTags,
    };
    const result = await suggestVibeTagsForUser(input);
    return result.suggestedTags
      .map(tag => tag.toLowerCase())
      .filter(tag => !existingTags.includes(tag));
  } catch (error) {
    console.error("Error in getAiSuggestedVibeTags:", error);
    return [];
  }
}

export async function getAiSuggestedBio(
  currentBio: string,
  vibeTags: string[]
): Promise<string> {
  try {
    const input: SuggestBioInput = {
      currentBio: currentBio || undefined, 
      vibeTags: vibeTags.length > 0 ? vibeTags : undefined,
    };
    const result = await suggestBioForUser(input);
    return result.suggestedBio;
  } catch (error)
     {
    console.error("Error in getAiSuggestedBio:", error);
    return currentBio || "Could not generate a bio suggestion at this time. Please try again.";
  }
}
