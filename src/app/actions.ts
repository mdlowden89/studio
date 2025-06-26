
"use server";

import { suggestVibeTagsForUser, SuggestVibeTagsInput, VibeTagSuggestion } from "@/ai/flows/suggest-vibe-tags-flow";
import { suggestBioForUser, SuggestBioInput } from "@/ai/flows/suggest-bio-flow";
import { getPlacePhoto, GetPlacePhotoInput, GetPlacePhotoOutput } from "@/ai/flows/get-place-photo-flow";
import { getSparkSwipeInsights, SparkSwipeInput, SparkSwipeOutput } from "@/ai/flows/spark-swipe-flow";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp, query, where, limit, getDocs, orderBy, Timestamp, getCountFromServer } from "firebase/firestore";
import type { UserProfile, Achievement, Challenge, Moment, MomentLog, Chat, Notification } from "@/lib/types";


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

    // --- NEW MATCHING LOGIC ---
    // Instead of simulating, we'll find a real potential match.
    const twoHours = 2 * 60 * 60 * 1000;
    const loggedAtDate = new Date(); // Approximate client time of logging
    const twoHoursBefore = new Date(loggedAtDate.getTime() - twoHours);
    const twoHoursAfter = new Date(loggedAtDate.getTime() + twoHours);

    const momentsRef = collection(db, "moments");
    // Query for moments from other users at the same place within a 4-hour window (+/- 2 hours)
    const matchQuery = query(
      momentsRef,
      where("placeName", "==", momentData.placeName),
      where("loggedAt", ">=", twoHoursBefore),
      where("loggedAt", "<=", twoHoursAfter),
      limit(20) // Limit to a reasonable number to check to avoid excessive reads
    );

    const matchSnapshot = await getDocs(matchQuery);

    // Filter out moments from the same user and moments that have already been matched/rejected
    const potentialMatchMoments = matchSnapshot.docs.filter(docSnap => {
      const data = docSnap.data();
      return data.loggerId !== momentData.loggerId && data.status === 'pending';
    });

    if (potentialMatchMoments.length > 0) {
      // Found at least one potential match. Let's take the first one for this implementation.
      const matchedMomentDoc = potentialMatchMoments[0];
      const matchedMomentData = matchedMomentDoc.data() as Moment;
      const matchedUserId = matchedMomentData.loggerId;
      
      const loggerProfileSnap = await getDoc(doc(db, 'users', momentData.loggerId));
      if (loggerProfileSnap.exists()) {
        const loggerData = loggerProfileSnap.data() as UserProfile;
        
        // Notify User 2 (the matched user) about User 1's moment
        await addDoc(collection(db, "notifications"), {
          userId: matchedUserId,
          senderId: loggerData.id,
          senderName: loggerData.name,
          senderImage: loggerData.images[0] || null,
          type: 'MOMENT_CONFIRMATION',
          title: `Did you cross paths with ${loggerData.name}?`,
          message: `Someone who might be you was noticed at ${momentData.placeName}.`,
          href: `/confirm-moment/${momentDocRef.id}`, // Link to User 1's moment
          read: false,
          createdAt: serverTimestamp(),
        });
        console.log(`Notification created for user ${matchedUserId} for moment ${momentDocRef.id}`);

        // Notify User 1 (the logger) about User 2's moment
        const matchedUserSnap = await getDoc(doc(db, 'users', matchedUserId));
        if (matchedUserSnap.exists()){
          const matchedUserData = matchedUserSnap.data() as UserProfile;
          await addDoc(collection(db, "notifications"), {
            userId: loggerData.id,
            senderId: matchedUserData.id,
            senderName: matchedUserData.name,
            senderImage: matchedUserData.images[0] || null,
            type: 'MOMENT_CONFIRMATION',
            title: `Did you cross paths with ${matchedUserData.name}?`,
            message: `Someone who might be you was also at ${matchedMomentData.placeName}.`,
            href: `/confirm-moment/${matchedMomentDoc.id}`, // Link to User 2's moment
            read: false,
            createdAt: serverTimestamp(),
          });
          console.log(`Notification created for user ${loggerData.id} for moment ${matchedMomentDoc.id}`);
        }
      }
    }
    // --- END OF NEW LOGIC ---

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

        const momentData = momentSnap.data();
        // Convert Firestore Timestamp to string for client-side serialization
        const moment: Moment = {
          id: momentSnap.id,
          ...momentData,
          loggedAt: (momentData.loggedAt as Timestamp).toDate().toISOString(),
        } as Moment;


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

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        return { ...data, id: userDocSnap.id } as UserProfile;
    }
    return null;
}

export async function getOrCreateChat(userId1: string, userId2: string): Promise<string> {
  const participants = [userId1, userId2].sort();
  const chatsRef = collection(db, 'chats');

  // Check if a chat between these two users already exists
  const q = query(chatsRef, where('participantIds', '==', participants));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // Chat already exists, return its ID
    return querySnapshot.docs[0].id;
  } else {
    // Chat doesn't exist, create a new one
    const user1Profile = await getUserProfile(userId1);
    const user2Profile = await getUserProfile(userId2);

    if (!user1Profile || !user2Profile) {
      throw new Error("Could not find profiles for one or both users to create a chat.");
    }

    const newChat: Omit<Chat, 'id'> = {
      participantIds: participants,
      participants: [
        { id: user1Profile.id, name: user1Profile.name, images: user1_profile.images },
        { id: user2Profile.id, name: user2Profile.name, images: user2Profile.images }
      ],
      createdAt: serverTimestamp(),
      lastMessage: null,
    };
    const chatDocRef = await addDoc(chatsRef, newChat);
    return chatDocRef.id;
  }
}


export async function confirmMomentMatch(momentId: string, confirmedByUserId: string): Promise<{success: boolean, loggerId?: string, chatId?: string}> {
    try {
        const momentRef = doc(db, 'moments', momentId);
        const momentSnap = await getDoc(momentRef);
        if (!momentSnap.exists()) {
            throw new Error("Moment not found");
        }
        
        const momentData = momentSnap.data();
        const loggerId = momentData.loggerId;

        // Create or get existing chat between the two users
        const chatId = await getOrCreateChat(loggerId, confirmedByUserId);
        
        // Update the moment to confirmed status
        await updateDoc(momentRef, {
            status: 'confirmed',
            confirmedUserId: confirmedByUserId,
            chatId: chatId, // Store chat ID for reference
        });
        
        // You could also create a notification for loggerId here to inform them of the match.
        
        return { success: true, loggerId: momentData.loggerId, chatId };

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

export async function fetchMomentsForUser(userId: string): Promise<any[]> {
  try {
    const momentsRef = collection(db, 'moments');
    const q = query(momentsRef, where("loggerId", "==", userId), orderBy("loggedAt", "desc"));
    const querySnapshot = await getDocs(q);

    const moments = querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Firestore Timestamps are not serializable, so convert to ISO string
      // for the client component.
      const loggedAtTimestamp = data.loggedAt as Timestamp;
      return {
        id: doc.id,
        ...data,
        loggedAt: loggedAtTimestamp ? loggedAtTimestamp.toDate().toISOString() : new Date().toISOString(),
      };
    });
    return moments;
  } catch (error) {
    console.error("Error fetching moments for user:", error);
    return [];
  }
}

export async function sendMessage(chatId: string, senderId: string, receiverId: string, text: string): Promise<{ success: boolean; error?: string }> {
  if (!chatId || !senderId || !text.trim()) {
    return { success: false, error: "Missing required message data." };
  }
  try {
    const chatRef = doc(db, 'chats', chatId);
    const messagesRef = collection(chatRef, 'messages');
    
    const messageData = {
      senderId,
      receiverId,
      text,
      timestamp: serverTimestamp(),
      isRead: false
    };

    // Add the new message to the 'messages' subcollection
    await addDoc(messagesRef, messageData);
    
    // Update the 'lastMessage' field on the parent chat document
    await updateDoc(chatRef, {
      lastMessage: {
        text,
        timestamp: serverTimestamp(),
        senderId,
      }
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error sending message:", error);
    return { success: false, error: error.message || "Failed to send message." };
  }
}

export async function fetchUserChatCount(userId: string): Promise<number> {
  if (!userId) return 0;
  try {
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('participantIds', 'array-contains', userId));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    console.error("Error fetching user chat count:", error);
    return 0;
  }
}

export async function fetchNotificationsForUser(userId: string): Promise<Notification[]> {
  if (!userId) return [];
  try {
    const notificationsRef = collection(db, 'notifications');
    const q = query(
      notificationsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);

    const notifications = querySnapshot.docs.map(doc => {
      const data = doc.data();
      const createdAtTimestamp = data.createdAt as Timestamp;
      return {
        id: doc.id,
        ...data,
        createdAt: createdAtTimestamp ? createdAtTimestamp.toDate().toISOString() : new Date().toISOString(),
      } as Notification;
    });

    return notifications;
  } catch (error) {
    console.error(`Error fetching notifications for user ${userId}:`, error);
    return [];
  }
}
