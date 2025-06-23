
"use server";

import { suggestVibeTagsForUser, SuggestVibeTagsInput } from "@/ai/flows/suggest-vibe-tags-flow";
import { suggestBioForUser, SuggestBioInput } from "@/ai/flows/suggest-bio-flow";
import { getPlacePhoto, GetPlacePhotoInput, GetPlacePhotoOutput } from "@/ai/flows/get-place-photo-flow"; // Import GetPlacePhotoOutput
import { getSparkSwipeInsights, SparkSwipeInput, SparkSwipeOutput } from "@/ai/flows/spark-swipe-flow";
import type { UserProfile } from "@/lib/types";
import { MOCK_USERS } from "@/lib/mock-data";

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
  input: SparkSwipeInput
): Promise<SparkSwipeOutput | null> {
  try {
    const result = await getSparkSwipeInsights(input);
    return result;
  } catch (error) {
    console.error("Error in fetchSparkSwipeInsights action:", error);
    // In a real app, you might want more granular error handling.
    // For now, returning null allows the UI to handle the failure gracefully.
    return null;
  }
}

export async function handleUserSignUp(data: { name: string; email: string }) {
  // In a real app, you would query your database here.
  console.log(`Checking for existing user with email: ${data.email}`);
  
  const existingUser = MOCK_USERS.find(user => user.email?.toLowerCase() === data.email.toLowerCase());

  if (existingUser) {
    console.error(`Sign up failed: User with email ${data.email} already exists.`);
    throw new Error("A user with this email address already exists.");
  }
  
  console.log(`Simulating user sign up for: ${data.name} (${data.email})`);

  // This is where you would integrate with an email service like SendGrid, Nodemailer, etc.
  // For this example, we'll just log to the console.
  try {
    console.log(`Simulating sending confirmation email to ${data.email}...`);
    // Example: await sendEmail({ to: data.email, subject: 'Welcome to Crossd!', ... });
    console.log("Confirmation email sequence initiated.");
    return { success: true, message: "User signed up and email process started." };
  } catch (error) {
    console.error("Failed to initiate confirmation email:", error);
    // Even if email fails, the user might have been created. 
    // Handle this based on your app's transactional requirements.
    // For now we re-throw the error to let the client know something went wrong.
    throw new Error("User signed up, but email failed.");
  }
}
