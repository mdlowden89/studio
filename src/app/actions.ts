
"use server";

import { suggestMatchesFromVibe, SuggestMatchesInput } from "@/ai/flows/suggest-matches-from-vibe";
import { suggestVibeTagsForUser, SuggestVibeTagsInput } from "@/ai/flows/suggest-vibe-tags-flow";
import type { UserProfile } from "@/lib/types";
import { MOCK_USERS, MOCK_USER_ID } from "@/lib/mock-data"; // For fetching other users

export async function getAiSuggestedMatches(
  userVibeTags: string[],
  userLocationPatterns: string[] // Typically, this would come from the user's actual data
): Promise<UserProfile[]> {
  try {
    // For this scaffold, we'll use mock data for "otherUserProfiles"
    // In a real app, you'd fetch this from your database, excluding the current user
    const otherUserProfiles = MOCK_USERS
      .filter(user => user.id !== MOCK_USER_ID) // Exclude the current user
      .map(user => JSON.stringify(user)); // Stringify each profile as per AI flow input

    const input: SuggestMatchesInput = {
      userVibeTags,
      userLocationPatterns,
      otherUserProfiles,
    };

    const result = await suggestMatchesFromVibe(input);
    
    // The AI returns stringified JSON objects, so we need to parse them
    const suggestedMatches: UserProfile[] = result.suggestedMatches.map(profileString => {
      try {
        return JSON.parse(profileString) as UserProfile;
      } catch (e) {
        console.error("Failed to parse user profile from AI:", profileString, e);
        return null;
      }
    }).filter(profile => profile !== null) as UserProfile[];

    return suggestedMatches;

  } catch (error) {
    console.error("Error in getAiSuggestedMatches:", error);
    // Depending on the error, you might want to throw it or return an empty array/error state
    // For now, let's return an empty array on error to prevent crashing the client
    return [];
  }
}


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
    // Filter out any tags that might already exist (double safety) and ensure they are lowercase
    return result.suggestedTags
      .map(tag => tag.toLowerCase())
      .filter(tag => !existingTags.includes(tag));
  } catch (error) {
    console.error("Error in getAiSuggestedVibeTags:", error);
    return [];
  }
}
