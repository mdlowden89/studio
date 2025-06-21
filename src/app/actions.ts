
"use server";

import { suggestVibeTagsForUser, SuggestVibeTagsInput } from "@/ai/flows/suggest-vibe-tags-flow";
import { suggestBioForUser, SuggestBioInput } from "@/ai/flows/suggest-bio-flow";
import { getPlacePhoto, GetPlacePhotoInput, GetPlacePhotoOutput } from "@/ai/flows/get-place-photo-flow"; // Import GetPlacePhotoOutput
import { getSparkSwipeInsights, SparkSwipeInput, SparkSwipeOutput } from "@/ai/flows/spark-swipe-flow";
import type { UserProfile } from "@/lib/types";

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

export async function fetchPlacePhoto(
  placeName: string,
  coordinates?: { lat: number; lng: number }
): Promise<GetPlacePhotoOutput> { // Return type updated to GetPlacePhotoOutput
  try {
    const input: GetPlacePhotoInput = { placeName, coordinates };
    const result = await getPlacePhoto(input);
    // result already includes photoUrl, attributionHtml, and potentially error
    return result; 
  } catch (error) {
    console.error("Error in fetchPlacePhoto action (outer catch):", error);
    // This catch block handles errors if the getPlacePhoto flow itself fails to execute
    // or if there's an unhandled exception within it not caught by its internal try/catch.
    return { photoUrl: undefined, attributionHtml: undefined, error: 'ACTION_EXECUTION_ERROR' };
  }
}

export async function fetchSparkSwipeInsights(
  currentUserProfile: UserProfile,
  candidateUserProfile: UserProfile
): Promise<SparkSwipeOutput | null> {
  try {
    const input: SparkSwipeInput = { currentUserProfile, candidateUserProfile };
    const result = await getSparkSwipeInsights(input);
    return result;
  } catch (error) {
    console.error("Error in fetchSparkSwipeInsights action:", error);
    // In a real app, you might want more granular error handling.
    // For now, returning null allows the UI to handle the failure gracefully.
    return null;
  }
}
