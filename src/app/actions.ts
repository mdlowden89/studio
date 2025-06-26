
"use server";

import { suggestVibeTagsForUser, SuggestVibeTagsInput, VibeTagSuggestion } from "@/ai/flows/suggest-vibe-tags-flow";
import { suggestBioForUser, SuggestBioInput } from "@/ai/flows/suggest-bio-flow";
import { getPlacePhoto, GetPlacePhotoInput, GetPlacePhotoOutput } from "@/ai/flows/get-place-photo-flow";
import { getSparkSwipeInsights, SparkSwipeInput, SparkSwipeOutput } from "@/ai/flows/spark-swipe-flow";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp, query, where, limit, getDocs } from "firebase/firestore";
import type { UserProfile, Achievement, Challenge, Moment, MomentLog } from "@/lib/types";


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

    const relevantChallenges = challenges.filter(c => c.triggerAction === action && c.status === 'active');

    if (relevantChallenges.length === 0) {
      return;
    }

    relevantChallenges.forEach(challenge => {
      if (action === 'LOGGED_MOMENT' && challenge.progress) {
        challenge.progress.current += 1;
        challengesUpdated = true;
        console.log(`Progress for challenge "${challenge.name}" for user ${userId} is now ${challenge.progress.current}/${challenge.progress.target}`);
      }

      if (challenge.progress && challenge.progress.current >= challenge.progress.target) {
        challenge.status = 'completed';
        
        const achievementIdBase = `achieve-challenge-${challenge.id}`;
        if (!achievements.some(ach => ach.id.startsWith(achievementIdBase))) {
           const newAchievement: Achievement = {
            id: `${achievementIdBase}-${Date.now()}`,
            name: `${challenge.name} Complete`,
            type: 'Challenge Completion',
            description: `You successfully completed the "${challenge.name}" challenge!`,
            icon: 'Award',
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
      await updateDoc(userDocRef, updatePayload as any);
      console.log(`Updated challenge data for user ${userId}. Awarded achievements: ${awardedAchievements.length}`);
    }

  } catch (error) {
    console.error("Error updating challenge progress:", error);
  }
}

export async function logMoment(momentData: MomentLog): Promise<{ success: boolean; id?: string; error?: string }> {
  if (!momentData.loggerId) {
    return { success: false, error: "User is not authenticated." };
  }
  
  try {
    const momentToSave: Omit<Moment, 'id'> = {
      ...momentData,
      status: 'pending',
      loggedAt: serverTimestamp(),
    };
    
    const momentDocRef = await addDoc(collection(db, "moments"), momentToSave);
    console.log("Moment logged successfully with ID:", momentDocRef.id);

    const usersRef = collection(db, "users");
    const q = query(
        usersRef, 
        where("id", "!=", momentData.loggerId), 
        where("ethnicity", "==", momentData.descriptors.ethnicity),
        limit(1)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const matchedUser = querySnapshot.docs[0].data() as UserProfile;
      const loggerProfileSnap = await getDoc(doc(db, 'users', momentData.loggerId));

      if (loggerProfileSnap.exists()) {
        const loggerData = loggerProfileSnap.data() as UserProfile;
        await addDoc(collection(db, "notifications"), {
          userId: matchedUser.id,
          senderId: loggerData.id,
          senderName: loggerData.name,
          senderImage: loggerData.images[0] || null,
          type: 'MOMENT_CONFIRMATION',
          title: `Did you cross paths with ${loggerData.name}?`,
          message: `Someone who might be you was noticed at ${momentData.placeName}.`,
          href: `/confirm-moment/${momentDocRef.id}`,
          read: false,
          createdAt: serverTimestamp(),
        });
        console.log(`Notification created for user ${matchedUser.id} for moment ${momentDocRef.id}`);
      }
    }

    await updateChallengeProgress(momentData.loggerId, 'LOGGED_MOMENT');
    
    return { success: true, id: momentDocRef.id };
    
  } catch (error: any) {
    console.error("Error logging moment to Firestore:", error);
    return { success: false, error: error.message || "Failed to log moment." };
  }
}

export async function fetchMomentForConfirmation(momentId: string): Promise<{moment: Moment, logger: UserProfile} | null> {
    try {
        const momentRef = doc(db, 'moments', momentId);
        const momentSnap = await getDoc(momentRef);

        if (!momentSnap.exists()) {
            console.error(`Moment ${momentId} not found.`);
            return null;
        }

        const moment = { id: momentSnap.id, ...momentSnap.data() } as Moment;

        const loggerRef = doc(db, 'users', moment.loggerId);
        const loggerSnap = await getDoc(loggerRef);

        if (!loggerSnap.exists()) {
            console.error(`Logger user ${moment.loggerId} not found.`);
            return null;
        }
        const logger = loggerSnap.data() as UserProfile;
        return { moment, logger };

    } catch (error) {
        console.error("Error fetching moment for confirmation:", error);
        return null;
    }
}

export async function confirmMomentMatch(momentId: string, confirmedByUserId: string): Promise<{success: boolean, loggerId?: string}> {
    try {
        const momentRef = doc(db, 'moments', momentId);
        const momentSnap = await getDoc(momentRef);
        if (!momentSnap.exists()) {
            throw new Error("Moment not found");
        }
        
        await updateDoc(momentRef, {
            status: 'confirmed',
            confirmedUserId: confirmedByUserId
        });

        // Here you would also create the chat, notify the original logger, etc.
        // For now, just confirming is enough to complete the flow.
        
        return { success: true, loggerId: momentSnap.data().loggerId };

    } catch (error: any) {
        console.error("Error confirming moment match:", error);
        return { success: false };
    }
}

export async function denyMomentMatch(momentId: string): Promise<{success: boolean}> {
    try {
        const momentRef = doc(db, 'moments', momentId);
         await updateDoc(momentRef, {
            status: 'rejected'
        });
        return { success: true };
    } catch(error: any) {
        console.error("Error denying moment match:", error);
        return { success: false };
    }
}
