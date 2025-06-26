
"use server";

import { suggestVibeTagsForUser, SuggestVibeTagsInput, VibeTagSuggestion } from "@/ai/flows/suggest-vibe-tags-flow";
import { suggestBioForUser, SuggestBioInput } from "@/ai/flows/suggest-bio-flow";
import { getPlacePhoto, GetPlacePhotoInput, GetPlacePhotoOutput } from "@/ai/flows/get-place-photo-flow";
import { getSparkSwipeInsights, SparkSwipeInput, SparkSwipeOutput } from "@/ai/flows/spark-swipe-flow";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import type { UserProfile, Achievement, Challenge } from "@/lib/types";


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
  input: SuggestBioInput
): Promise<string> {
  try {
    const result = await suggestBioForUser(input);
    return result.suggestedBio;
  } catch (error)
     {
    console.error("Error in getAiSuggestedBio:", error);
    return input.currentBio || "Could not generate a bio suggestion at this time. Please try again.";
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

export type ChallengeAction = 'LOGGED_MOMENT' | 'REPLIED_TO_MATCH' | 'LOGGED_MOMENT_NEW_DISTRICT' | 'QUICK_MATCH_AND_CHAT';

export async function updateChallengeProgress(userId: string, action: ChallengeAction, details?: any) {
  const userDocRef = doc(db, 'users', userId);
  try {
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      console.error(`User ${userId} not found for challenge update.`);
      return;
    }

    const userProfile = userDocSnap.data() as UserProfile;
    const challenges = userProfile.challenges || [];
    let achievements = userProfile.achievements || [];
    let challengesUpdated = false;
    const awardedAchievements: Achievement[] = [];

    // Find all active challenges triggered by this action
    const relevantChallenges = challenges.filter(c => c.triggerAction === action && c.status === 'active');

    if (relevantChallenges.length === 0) {
      // It's normal for an action to not trigger a challenge, so this log can be for debugging.
      // console.log(`No active challenges for action: ${action} for user ${userId}`);
      return;
    }

    relevantChallenges.forEach(challenge => {
      // This is where more complex logic for different challenge types would go.
      // For now, we assume simple progress increment for any matched action.
      if (action === 'LOGGED_MOMENT') {
         if (challenge.progress) {
          challenge.progress.current += 1;
          challengesUpdated = true;
          console.log(`Progress for challenge "${challenge.name}" for user ${userId} is now ${challenge.progress.current}/${challenge.progress.target}`);
         }
      }
      // Example for future:
      // if (action === 'LOGGED_MOMENT_NEW_DISTRICT' && details?.isNewDistrict) {
      //   // increment progress
      // }

      // Check for completion
      if (challenge.progress && challenge.progress.current >= challenge.progress.target) {
        challenge.status = 'completed';
        
        const achievementIdBase = `achieve-challenge-${challenge.id}`;
        // Ensure this specific challenge achievement hasn't already been awarded
        if (!achievements.some(ach => ach.id.startsWith(achievementIdBase))) {
           const newAchievement: Achievement = {
            id: `${achievementIdBase}-${Date.now()}`,
            name: `${challenge.name} Complete`,
            type: 'Challenge Completion',
            description: `You successfully completed the "${challenge.name}" challenge!`,
            icon: 'Award', // Generic achievement icon
            achievedDate: new Date().toISOString(),
            rewards: [challenge.rewardPreview],
            glowEffect: true,
          };
          awardedAchievements.push(newAchievement);
        }
      }
    });

    if (challengesUpdated || awardedAchievements.length > 0) {
      const updatePayload: { challenges: Challenge[]; achievements?: Achievement[] } = { challenges };
      if (awardedAchievements.length > 0) {
        updatePayload.achievements = [...achievements, ...awardedAchievements];
      }
      await updateDoc(userDocRef, updatePayload as any); // Use `as any` to avoid deep type issues with Firestore SDK
      console.log(`Updated challenge data for user ${userId}. Awarded achievements: ${awardedAchievements.length}`);
    }

  } catch (error) {
    console.error("Error updating challenge progress:", error);
  }
}
