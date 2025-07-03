
"use server";

import { suggestVibeTagsForUser, SuggestVibeTagsInput, VibeTagSuggestion } from "@/ai/flows/suggest-vibe-tags-flow";
import { suggestBioForUser, SuggestBioInput } from "@/ai/flows/suggest-bio-flow";
import { getPlacePhoto, GetPlacePhotoInput, GetPlacePhotoOutput } from "@/ai/flows/get-place-photo-flow";
import { getSparkSwipeInsights, SparkSwipeInput, SparkSwipeOutput } from "@/ai/flows/spark-swipe-flow";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp, query, where, limit, getDocs, orderBy, Timestamp, getCountFromServer, writeBatch, Query, collectionGroup, startAfter, QueryConstraint, deleteField } from "firebase/firestore";
import type { UserProfile, Achievement, Challenge, Moment, MomentLog, Chat, Notification, ChatMessage, SubscriptionInfo } from "@/lib/types";
import { addHours } from "date-fns";

// This type should align with the filter component's state
export interface UserFilters {
  ageRange: [number, number];
  heightRange: [number, number]; // in inches
  datingIntentions: string;
  ethnicity: string;
  religion: string;
  relationshipType: string;
}

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
      loggedAt: momentData.loggedAt ? Timestamp.fromDate(new Date(momentData.loggedAt)) : serverTimestamp(),
    };
    
    const momentDocRef = await addDoc(collection(db, "moments"), momentToSave);
    console.log("Moment logged successfully with ID:", momentDocRef.id);

    // --- NEW MATCHING LOGIC ---
    // Find a potential match by looking for another user's moment at the same place around the same time.
    const twoHours = 2 * 60 * 60 * 1000;
    const loggedAtDate = momentData.loggedAt ? new Date(momentData.loggedAt) : new Date(); // Use provided time for matching window
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
        { id: user1Profile.id, name: user1Profile.name, images: user1Profile.images },
        { id: user2Profile.id, name: user2Profile.name, images: user2Profile.images }
      ],
      createdAt: serverTimestamp(),
      lastMessage: null,
    };

    const docRef = await await addDoc(chatsRef, newChat);
    return docRef.id;
  }
}

export async function confirmMomentMatch(momentId: string, confirmeeId: string): Promise<{ success: boolean; loggerId?: string; chatId?: string; error?: string }> {
    const momentRef = doc(db, 'moments', momentId);
    try {
        const momentSnap = await getDoc(momentRef);
        if (!momentSnap.exists()) {
            return { success: false, error: 'Moment not found.' };
        }
        
        const momentData = momentSnap.data() as Moment;
        const loggerId = momentData.loggerId;

        if (momentData.status === 'confirmed') {
            return { success: true, loggerId, chatId: momentData.chatId };
        }

        const chatId = await getOrCreateChat(loggerId, confirmeeId);
        
        await updateDoc(momentRef, {
            status: 'confirmed',
            confirmedUserId: confirmeeId,
            chatId: chatId
        });

        // Also update the "other" moment if it exists (the one logged by the other user)
        // This is a simple fire-and-forget for now to avoid complexity, but could be made more robust.
        const twoHours = 2 * 60 * 60 * 1000;
        const loggedAtDate = (momentData.loggedAt as Timestamp).toDate();
        const twoHoursBefore = new Date(loggedAtDate.getTime() - twoHours);
        const twoHoursAfter = new Date(loggedAtDate.getTime() + twoHours);
        const momentsRef = collection(db, "moments");
        const otherMomentQuery = query(
            momentsRef,
            where("placeName", "==", momentData.placeName),
            where("loggerId", "==", confirmeeId), // The other user
            where("loggedAt", ">=", twoHoursBefore),
            where("loggedAt", "<=", twoHoursAfter),
            limit(1)
        );
        const otherMomentSnapshot = await getDocs(otherMomentQuery);
        if (!otherMomentSnapshot.empty) {
            const otherMomentDoc = otherMomentSnapshot.docs[0];
            await updateDoc(otherMomentDoc.ref, {
                status: 'confirmed',
                confirmedUserId: loggerId,
                chatId: chatId,
            });
        }

        // Create a 'NEW_MATCH' notification for both users
        const loggerProfile = await getUserProfile(loggerId);
        const confirmeeProfile = await getUserProfile(confirmeeId);

        if (loggerProfile && confirmeeProfile) {
            // Notification for logger
            await addDoc(collection(db, "notifications"), {
                userId: loggerId,
                senderId: confirmeeId,
                senderName: confirmeeProfile.name,
                senderImage: confirmeeProfile.images[0] || null,
                type: 'NEW_MATCH',
                title: `You have a new match with ${confirmeeProfile.name}!`,
                message: `You both confirmed your moment at ${momentData.placeName}.`,
                href: `/chat/${chatId}`,
                read: false,
                createdAt: serverTimestamp(),
            });
            // Notification for confirmee
            await addDoc(collection(db, "notifications"), {
                userId: confirmeeId,
                senderId: loggerId,
                senderName: loggerProfile.name,
                senderImage: loggerProfile.images[0] || null,
                type: 'NEW_MATCH',
                title: `You have a new match with ${loggerProfile.name}!`,
                message: `You both confirmed your moment at ${momentData.placeName}.`,
                href: `/chat/${chatId}`,
                read: false,
                createdAt: serverTimestamp(),
            });
        }


        return { success: true, loggerId: momentData.loggerId, chatId };

    } catch (error: any) {
        console.error("Error confirming moment match:", error);
        return { success: false, error: error.message };
    }
}

export async function denyMomentMatch(momentId: string): Promise<{ success: boolean; error?: string }> {
    const momentRef = doc(db, 'moments', momentId);
    try {
        const momentSnap = await getDoc(momentRef);
        if (!momentSnap.exists()) {
            return { success: false, error: 'Moment not found.' };
        }
        await updateDoc(momentRef, { status: 'rejected' });
        return { success: true };
    } catch (error: any) {
        console.error("Error denying moment match:", error);
        return { success: false, error: error.message };
    }
}

export async function fetchMomentsForUser(userId: string): Promise<Moment[]> {
    try {
        const momentsRef = collection(db, "moments");
        const q = query(momentsRef, where("loggerId", "==", userId), orderBy("loggedAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        const moments = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                loggedAt: (data.loggedAt as Timestamp).toDate().toISOString(),
            } as Moment;
        });

        return moments;
    } catch (error) {
        console.error(`Error fetching moments for user ${userId}:`, error);
        return [];
    }
}

export async function fetchUserChatCount(userId: string): Promise<number> {
    try {
        const chatsRef = collection(db, "chats");
        const q = query(chatsRef, where("participantIds", "array-contains", userId));
        const snapshot = await getCountFromServer(q);
        return snapshot.data().count;
    } catch (error) {
        console.error(`Error fetching chat count for user ${userId}:`, error);
        return 0;
    }
}


export async function fetchNotificationsForUser(userId: string): Promise<Notification[]> {
  if (!userId) return [];
  try {
    const notificationsRef = collection(db, "notifications");
    const q = query(
      notificationsRef,
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    const querySnapshot = await getDocs(q);

    const notifications = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: (data.createdAt as Timestamp)?.toDate().toISOString() || new Date().toISOString(),
      } as Notification;
    });

    return notifications;
  } catch (error) {
    console.error(`Error fetching notifications for user ${userId}:`, error);
    return [];
  }
}

export async function sendMessage(chatId: string, senderId: string, receiverId: string, text: string): Promise<{ success: boolean, error?: string }> {
  if (!text.trim()) {
    return { success: false, error: "Message text cannot be empty." };
  }

  try {
    const chatRef = doc(db, 'chats', chatId);
    const messagesRef = collection(chatRef, 'messages');

    const newMessage: Omit<ChatMessage, 'id'> = {
      senderId,
      receiverId,
      text,
      timestamp: serverTimestamp(),
      isRead: false
    };

    await addDoc(messagesRef, newMessage);

    // Update the lastMessage field on the chat document for previews
    await updateDoc(chatRef, {
      lastMessage: {
        text,
        timestamp: serverTimestamp(),
        senderId
      }
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error sending message:", error);
    return { success: false, error: error.message };
  }
}

export async function getUsersForSwiping(currentUserId: string, filters?: UserFilters): Promise<UserProfile[]> {
  try {
    const currentUserProfile = await getUserProfile(currentUserId);
    if (!currentUserProfile) {
      console.warn("getUsersForSwiping: Could not find current user profile.");
      return [];
    }

    const usersRef = collection(db, "users");
    const queryConstraints: QueryConstraint[] = [];

    // --- Gender/Interest Filtering ---
    if (currentUserProfile.interestedIn && currentUserProfile.gender) {
        const interestedIn = currentUserProfile.interestedIn;
        const userGender = currentUserProfile.gender;

        if (interestedIn === 'men') {
            queryConstraints.push(where('gender', '==', 'man'));
            queryConstraints.push(where('interestedIn', 'in', [userGender, 'everyone']));
        } else if (interestedIn === 'women') {
            queryConstraints.push(where('gender', '==', 'woman'));
            queryConstraints.push(where('interestedIn', 'in', [userGender, 'everyone']));
        } else if (interestedIn === 'everyone') {
             if (userGender === 'man') {
                queryConstraints.push(where('interestedIn', 'in', ['men', 'everyone']));
            } else if (userGender === 'woman') {
                queryConstraints.push(where('interestedIn', 'in', ['women', 'everyone']));
            }
            // If current user is non-binary and interested in everyone, we don't add a gender/interest filter here,
            // as we assume they want to see everyone who is open to seeing them.
            // This could be made more granular with more preference options.
        }
    }
    
    // --- Attribute Filtering (if filters are provided) ---
    if (filters) {
        const [minAge, maxAge] = filters.ageRange;
        queryConstraints.push(where("age", ">=", minAge));
        queryConstraints.push(where("age", "<=", maxAge));

        if (filters.datingIntentions !== 'any') {
          queryConstraints.push(where("datingIntentions", "==", filters.datingIntentions));
        }
        if (filters.ethnicity !== 'any') {
          queryConstraints.push(where("ethnicity", "==", filters.ethnicity));
        }
        if (filters.religion !== 'any') {
          queryConstraints.push(where("religion", "==", filters.religion));
        }
        if (filters.relationshipType !== 'any') {
          queryConstraints.push(where("relationshipType", "==", filters.relationshipType));
        }
    }
    
    // The query is built. Note that Firestore may require you to create composite indexes
    // for these queries to work. The error message in the Firebase console will provide a link
    // to create the required index if one is missing.
    const q = query(usersRef, ...queryConstraints, limit(100));
    
    const querySnapshot = await getDocs(q);

    // Filter out the current user and perform in-memory filtering
    const usersFromDb = querySnapshot.docs
      .map(doc => doc.data() as UserProfile)
      .filter(user => user.id !== currentUserId);

    let finalFilteredUsers = usersFromDb;

    // In-Memory Filtering (for things Firestore can't do in one query)
    if (filters) {
        const [minHeight, maxHeight] = filters.heightRange;
        finalFilteredUsers = usersFromDb.filter(user => {
            if (!user.heightInches) return true; // Don't filter out users who haven't set height
            return user.heightInches >= minHeight && user.heightInches <= maxHeight;
        });
    }

    // Simple shuffle for variety
    return finalFilteredUsers.sort(() => Math.random() - 0.5);

  } catch (error) {
    console.error("Error fetching users for swiping:", error);
    // This could be a permissions error or an error indicating a missing index.
    // Check the server logs (where this action runs) for details.
    return [];
  }
}


export async function recordLike(likerId: string, likedUserId: string): Promise<{ match: boolean; chatId?: string }> {
  const likesRef = collection(db, 'likes');

  // Check if the other user has already liked the current user (a pending like from B to A)
  const reverseLikeQuery = query(likesRef, 
    where('likerId', '==', likedUserId), 
    where('likedUserId', '==', likerId), 
    where('status', '==', 'pending')
  );
  const reverseLikeSnapshot = await getDocs(reverseLikeQuery);

  if (!reverseLikeSnapshot.empty) {
    // It's a match!
    const batch = writeBatch(db);
    const reverseLikeDoc = reverseLikeSnapshot.docs[0];
    
    // Update the existing like to 'matched' status.
    batch.update(reverseLikeDoc.ref, { status: 'matched' });
    
    const chatId = await getOrCreateChat(likerId, likedUserId);

    // Create notifications for both users
    const likerProfile = await getUserProfile(likerId);
    const likedUserProfile = await getUserProfile(likedUserId);

    if (likerProfile && likedUserProfile) {
      // Notification for liker (user A)
      const notifForLikerRef = doc(collection(db, "notifications"));
      batch.set(notifForLikerRef, {
        userId: likerId,
        senderId: likedUserId,
        senderName: likedUserProfile.name,
        senderImage: likedUserProfile.images[0] || null,
        type: 'NEW_MATCH',
        title: `You have a new match with ${likedUserProfile.name}!`,
        message: 'You both liked each other. Start a conversation!',
        href: `/chat/${chatId}`,
        read: false,
        createdAt: serverTimestamp(),
      });

      // Notification for liked user (user B)
      const notifForLikedUserRef = doc(collection(db, "notifications"));
      batch.set(notifForLikedUserRef, {
        userId: likedUserId,
        senderId: likerId,
        senderName: likerProfile.name,
        senderImage: likerProfile.images[0] || null,
        type: 'NEW_MATCH',
        title: `You have a new match with ${likerProfile.name}!`,
        message: 'You both liked each other. Start a conversation!',
        href: `/chat/${chatId}`,
        read: false,
        createdAt: serverTimestamp(),
      });
    }
    
    await batch.commit();
    return { match: true, chatId };

  } else {
    // It's not a match yet. Record the new "like" from A to B.
    // First, check if A already liked B to avoid duplicates.
    const likeQuery = query(likesRef, 
      where('likerId', '==', likerId), 
      where('likedUserId', '==', likedUserId)
    );
    const likeSnapshot = await getDocs(likeQuery);

    if (likeSnapshot.empty) {
      await addDoc(likesRef, {
        likerId,
        likedUserId,
        timestamp: serverTimestamp(),
        status: 'pending',
      });
    }
    return { match: false };
  }
}

export async function checkForNewLikes(userId: string): Promise<boolean> {
  const likesRef = collection(db, 'likes');
  // Query for likes where the current user is the one being liked, and the like is still pending.
  const q = query(likesRef, where('likedUserId', '==', userId), where('status', '==', 'pending'), limit(1));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

export async function activateGlowMode(userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const userDocRef = doc(db, 'users', userId);
    const expiresAt = addHours(new Date(), 24).toISOString();

    await updateDoc(userDocRef, {
      glowEffect: {
        active: true,
        expiresAt: expiresAt,
      },
    });

    console.log(`Glow Mode activated for user ${userId}, expires at ${expiresAt}`);
    return { success: true };
  } catch (error: any) {
    console.error("Error activating Glow Mode:", error);
    return { success: false, error: error.message || "Failed to activate Glow Mode." };
  }
}
    
export async function updateUserMbtiType(userId: string, mbtiType: string): Promise<{ success: boolean; error?: string }> {
  if (!userId || !mbtiType || mbtiType.length !== 4) {
    return { success: false, error: "Invalid user ID or MBTI type provided." };
  }
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, { 
      mbtiType,
      mbtiQuizProgress: deleteField() 
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error updating MBTI type:", error);
    return { success: false, error: "Failed to save your personality type." };
  }
}

export async function saveMbtiQuizProgress(userId: string, answers: Record<number, string>): Promise<{ success: boolean; error?: string }> {
  if (!userId) {
    return { success: false, error: "Invalid user ID provided." };
  }
  try {
    const userDocRef = doc(db, "users", userId);
    if (Object.keys(answers).length === 0) {
      // If answers are empty, we remove the progress field
      await updateDoc(userDocRef, { 
        mbtiQuizProgress: deleteField()
      });
    } else {
      await updateDoc(userDocRef, { 
        mbtiQuizProgress: { answers }
      });
    }
    return { success: true };
  } catch (error: any) {
    console.error("Error saving MBTI quiz progress:", error);
    return { success: false, error: "Failed to save your quiz progress." };
  }
}
