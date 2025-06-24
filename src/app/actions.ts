
"use server";

import { suggestVibeTagsForUser, SuggestVibeTagsInput, VibeTagSuggestion } from "@/ai/flows/suggest-vibe-tags-flow";
import { suggestBioForUser, SuggestBioInput } from "@/ai/flows/suggest-bio-flow";
import { getPlacePhoto, GetPlacePhotoInput, GetPlacePhotoOutput } from "@/ai/flows/get-place-photo-flow";
import { getSparkSwipeInsights, SparkSwipeInput, SparkSwipeOutput } from "@/ai/flows/spark-swipe-flow";
import type { UserProfile } from "@/lib/types";
import { MOCK_USERS, MOCK_USER_ID, getCurrentUser } from "@/lib/mock-data";
import { revalidatePath } from "next/cache";


// --- Mocked Database Logic ---

/**
 * Mocks creating or retrieving a user profile. In a real app, this would interact
 * with a database. Here, it just finds a user from the mock data.
 * @param userId The ID of the user.
 * @returns The user profile.
 * @throws An error if the user cannot be found.
 */
export async function getOrCreateUserProfile(userId: string): Promise<UserProfile> {
  console.log(`Simulating getOrCreateUserProfile for user ID: ${userId}`);
  const user = MOCK_USERS.find(u => u.id === userId);
  if (user) {
    return Promise.resolve(user);
  }
  // This part is a fallback and should ideally not be hit if MOCK_USER_ID is valid.
  const currentUser = getCurrentUser();
  if (currentUser) {
      return Promise.resolve(currentUser);
  }
  throw new Error(`Mock user with ID ${userId} not found.`);
}

/**
 * Server action to update the user's profile.
 * This is a mock implementation.
 * @param userId The ID of the user to update.
 * @param profileData The data to update.
 */
export async function updateUserProfileAction(userId: string, profileData: Partial<UserProfile>) {
  try {
    console.log(`Simulating update for user ${userId} with data:`, profileData);
    // In a real app, this would update the database. Here we just log and revalidate.
    revalidatePath('/profile');
    revalidatePath('/dashboard');
    return { success: true, message: "Profile updated successfully (simulated)." };
  } catch (error: any) {
    console.error("Error in updateUserProfileAction (simulated):", error);
    return { success: false, message: error.message || "An unexpected error occurred." };
  }
}

// --- End of Mocked Database Logic ---


// --- Original AI and App Actions ---

export async function getAiSuggestedVibeTags(
  userBio: string,
  existingTags: string[]
): Promise<VibeTagSuggestion[]> {
  try {
    const input: SuggestVibeTagsInput = {
      userBio,
      existingTags,
    };
    const result = await suggestVibeTagsForUser(input);
    return result.suggestedTags.filter(
      suggestion => !existingTags.includes(suggestion.tag.toLowerCase())
    );
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
): Promise<GetPlacePhotoOutput> {
  try {
    const input: GetPlacePhotoInput = { placeName, coordinates };
    const result = await getPlacePhoto(input);
    return result; 
  } catch (error) {
    console.error("Error in fetchPlacePhoto action (outer catch):", error);
    return { photoUrl: undefined, attributionHtml: undefined, error: 'ACTION_EXECUTION_ERROR' };
  }
}

export async function fetchSparkSwipeInsights(
  input: SparkSwipeInput
): Promise<SparkSwipeOutput | null> {
  try {
    const result = await getSparkSwipeInsights(input);
    return result;
  } catch (error) {
    console.error("Error in fetchSparkSwipeInsights action:", error);
    return null;
  }
}

export async function handleUserSignUp(data: { name: string; email: string }) {
  // In a real app, you would query your database here. For now, we still check mocks.
  console.log(`Checking for existing user with email: ${data.email}`);
  
  const existingUser = MOCK_USERS.find(user => user.email?.toLowerCase() === data.email.toLowerCase());

  if (existingUser) {
    console.error(`Sign up failed: User with email ${data.email} already exists.`);
    throw new Error("A user with this email address already exists.");
  }
  
  console.log(`Simulating user sign up for: ${data.name} (${data.email})`);

  try {
    console.log(`Simulating sending confirmation email to ${data.email}...`);
    console.log("Confirmation email sequence initiated.");
    return { success: true, message: "User signed up and email process started." };
  } catch (error) {
    console.error("Failed to initiate confirmation email:", error);
    throw new Error("User signed up, but email failed.");
  }
}
