
"use server";

import { suggestMatchesFromVibe, SuggestMatchesInput } from "@/ai/flows/suggest-matches-from-vibe";
import { suggestVibeTagsForUser, SuggestVibeTagsInput } from "@/ai/flows/suggest-vibe-tags-flow";
import { suggestBioForUser, SuggestBioInput } from "@/ai/flows/suggest-bio-flow";
import { 
  suggestDetailedMatches, 
  SuggestDetailedMatchesInput,
  DetailedMatchSuggestion,
  sanitizeUserProfileForPrompt
} from "@/ai/flows/suggest-detailed-matches-flow";
import type { UserProfile } from "@/lib/types";
import { MOCK_USERS, MOCK_USER_ID } from "@/lib/mock-data"; 

export async function getAiSuggestedMatches(
  userVibeTags: string[],
  userLocationPatterns: string[] 
): Promise<UserProfile[]> {
  try {
    const otherUserProfiles = MOCK_USERS
      .filter(user => user.id !== MOCK_USER_ID) 
      .map(user => JSON.stringify(user)); 

    const input: SuggestMatchesInput = {
      userVibeTags,
      userLocationPatterns,
      otherUserProfiles,
    };

    const result = await suggestMatchesFromVibe(input);
    
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
  } catch (error) {
    console.error("Error in getAiSuggestedBio:", error);
    return currentBio || "Could not generate a bio suggestion at this time. Please try again.";
  }
}

export async function getAiDetailedMatchSuggestions(): Promise<DetailedMatchSuggestion[]> {
  try {
    const currentUser = MOCK_USERS.find(user => user.id === MOCK_USER_ID);
    if (!currentUser) {
      console.error("Current user not found for detailed match suggestions.");
      return [];
    }

    const otherUsers = MOCK_USERS.filter(user => user.id !== MOCK_USER_ID);

    // Sanitize profiles to match the Zod schema expected by the flow
    const sanitizedCurrentUserProfile = sanitizeUserProfileForPrompt(currentUser);
    const sanitizedOtherUserProfiles = otherUsers.map(sanitizeUserProfileForPrompt);
    
    const input: SuggestDetailedMatchesInput = {
      currentUserProfile: sanitizedCurrentUserProfile,
      otherUserProfiles: sanitizedOtherUserProfiles,
    };

    const result = await suggestDetailedMatches(input);
    
    // The flow now returns UserProfile objects directly (or should)
    // Need to cast back to UserProfile type for the application if schema subset was used.
    // The sanitizeUserProfileForPrompt is for input, the output DetailedMatchSuggestionSchema uses UserProfileForPromptSchema.
    // We need to map the output user back to the full UserProfile.
    return result.detailedMatches.map(detailedMatch => {
      // Find the full profile from MOCK_USERS to ensure all fields are present
      const fullUserProfile = MOCK_USERS.find(u => u.id === detailedMatch.user.id);
      return {
        ...detailedMatch,
        user: fullUserProfile || (detailedMatch.user as UserProfile), // Cast if full profile not found
      };
    });

  } catch (error) {
    console.error("Error in getAiDetailedMatchSuggestions:", error);
    return [];
  }
}
