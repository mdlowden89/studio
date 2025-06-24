
"use server";

import { suggestVibeTagsForUser, SuggestVibeTagsInput, VibeTagSuggestion } from "@/ai/flows/suggest-vibe-tags-flow";
import { suggestBioForUser, SuggestBioInput } from "@/ai/flows/suggest-bio-flow";
import { getPlacePhoto, GetPlacePhotoInput, GetPlacePhotoOutput } from "@/ai/flows/get-place-photo-flow";
import { getSparkSwipeInsights, SparkSwipeInput, SparkSwipeOutput } from "@/ai/flows/spark-swipe-flow";
import type { UserProfile } from "@/lib/types";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import type { User } from "firebase/auth";


// --- Firestore Database Logic ---

/**
 * Retrieves a user profile from Firestore, or creates one if it doesn't exist.
 * This is the single source of truth for user profile creation.
 * @param firebaseUser The authenticated user object from Firebase Auth.
 * @returns The user profile.
 * @throws An error if the profile cannot be fetched or created.
 */
export async function getOrCreateUserProfile(firebaseUser: User): Promise<UserProfile> {
  const userDocRef = doc(db, "users", firebaseUser.uid);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    console.log(`Found user ${firebaseUser.uid} in Firestore.`);
    return userDoc.data() as UserProfile;
  } else {
    console.log(`User ${firebaseUser.uid} not found in Firestore. Creating new profile...`);
    const newUserProfile: UserProfile = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || "New User",
      email: firebaseUser.email || "",
      age: 18,
      bio: "Welcome to Crossd! Tell us about yourself.",
      images: ['https://placehold.co/400x550.png'],
      vibeTags: [],
      prompts: [],
      locationPatterns: [],
      achievements: [],
      onboardingComplete: false,
    };
    
    await setDoc(userDocRef, newUserProfile);
    console.log(`Successfully created profile for user ${firebaseUser.uid}.`);
    return newUserProfile;
  }
}

/**
 * Server action to update the user's profile in Firestore.
 * @param userId The ID of the user to update.
 * @param profileData The data to update.
 */
export async function updateUserProfileAction(userId: string, profileData: Partial<UserProfile>) {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, profileData);
    console.log(`Successfully updated profile for user ${userId} in Firestore.`);
    
    // Revalidate the profile page to show the new data
    revalidatePath('/profile');
    
    return { success: true, message: "Profile updated successfully." };
  } catch (error: any) {
    console.error("Error in updateUserProfileAction:", error);
    return { success: false, message: error.message || "An unexpected error occurred." };
  }
}

// --- End of Firestore Database Logic ---


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
