
"use server";

import { suggestVibeTagsForUser, SuggestVibeTagsInput, VibeTagSuggestion } from "@/ai/flows/suggest-vibe-tags-flow";
import { suggestBioForUser, SuggestBioInput } from "@/ai/flows/suggest-bio-flow";
import { getPlacePhoto, GetPlacePhotoInput, GetPlacePhotoOutput } from "@/ai/flows/get-place-photo-flow";
import { getSparkSwipeInsights, SparkSwipeInput, SparkSwipeOutput } from "@/ai/flows/spark-swipe-flow";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import type { UserProfile, Achievement } from "@/lib/types";


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


export async function updateChallengeProgress(userId: string, challengeType: 'MomentLogging') {
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
    let achievementAwarded = false;

    // Find the "Moment Marathon" challenge, which is a Streak type.
    const challengeIndex = challenges.findIndex(c => c.type === 'Streak' && c.status === 'active');

    if (challengeIndex !== -1) {
      const challenge = challenges[challengeIndex];
      if (challenge.progress) {
        challenge.progress.current += 1;
        challengesUpdated = true;

        if (challenge.progress.current >= challenge.progress.target) {
          challenge.status = 'completed';
          
          const achievementId = `achieve-challenge-${challenge.id}`;
          // Check if this achievement has already been awarded
          if (!achievements.some(ach => ach.id.startsWith(achievementId))) {
             const newAchievement: Achievement = {
              id: `${achievementId}-${Date.now()}`,
              name: `${challenge.name} Complete`,
              type: 'Challenge Completion',
              description: `You successfully completed the "${challenge.name}" challenge!`,
              icon: 'Award', // Generic achievement icon
              achievedDate: new Date().toISOString(),
              rewards: [challenge.rewardPreview],
              glowEffect: true,
            };
            achievements.push(newAchievement);
            achievementAwarded = true;
          }
        }
      }
    }

    if (challengesUpdated) {
      const updateData: { challenges: any[]; achievements?: any[] } = { challenges };
      if (achievementAwarded) {
        updateData.achievements = achievements;
      }
      await updateDoc(userDocRef, updateData);
      console.log(`Updated challenges for user ${userId}. Achievement awarded: ${achievementAwarded}`);
    }

  } catch (error) {
    console.error("Error updating challenge progress:", error);
  }
}
