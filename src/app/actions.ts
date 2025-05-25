
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
  } catch (error)
     {
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

    // Specifically select the three new users for the "Weekly Vibe Signals" demo
    const newDemoUserIds = ['user-4', 'user-5', 'user-6'];
    const otherUsersForDemo = MOCK_USERS.filter(user => newDemoUserIds.includes(user.id));

    if (otherUsersForDemo.length === 0) {
        console.warn("None of the specified demo users (user-4, user-5, user-6) were found in MOCK_USERS. 'Weekly Vibe Signals' will be empty.");
    } else if (otherUsersForDemo.length < 3) {
        console.warn(`Found only ${otherUsersForDemo.length} of the 3 specified demo users (user-4, user-5, user-6). Proceeding with available ones.`);
    }


    // Sanitize profiles to match the Zod schema expected by the flow
    // Only proceed if there are users to sanitize and suggest
    if (otherUsersForDemo.length === 0) {
      return [];
    }

    const sanitizedCurrentUserProfile = await sanitizeUserProfileForPrompt(currentUser);
    const sanitizedOtherUserProfiles = await Promise.all(otherUsersForDemo.map(user => sanitizeUserProfileForPrompt(user)));
    
    const input: SuggestDetailedMatchesInput = {
      currentUserProfile: sanitizedCurrentUserProfile,
      otherUserProfiles: sanitizedOtherUserProfiles,
    };

    const result = await suggestDetailedMatches(input);
    
    return result.detailedMatches.map(detailedMatch => {
      // Find the full user profile from the original MOCK_USERS list to ensure all data is present
      const fullUserProfile = MOCK_USERS.find(u => u.id === detailedMatch.user.id);
      return {
        ...detailedMatch,
        // Ensure the user object in the result is the full UserProfile, not just the Zod schema subset
        user: fullUserProfile || (detailedMatch.user as UserProfile), 
      };
    });

  } catch (error) {
    console.error("Error in getAiDetailedMatchSuggestions:", error);
    return [];
  }
}


    
