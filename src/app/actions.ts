
"use server";

import { suggestMatchesFromVibe, SuggestMatchesInput } from "@/ai/flows/suggest-matches-from-vibe";
import { getPlacePhoto, type GetPlacePhotoInput, type GetPlacePhotoOutput } from "@/ai/flows/get-place-photo-flow";
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


export async function fetchPlacePhotoAction(input: GetPlacePhotoInput): Promise<GetPlacePhotoOutput> {
  try {
    return await getPlacePhoto(input);
  } catch (error) {
    console.error("Error in fetchPlacePhotoAction:", error);
    return { photoUrl: undefined, attribution: undefined };
  }
}
    