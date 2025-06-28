
import type { LucideIcon } from 'lucide-react';
import type { FieldValue, Timestamp } from 'firebase/firestore';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  images: string[]; // URLs to images
  vibeTags: string[];
  locationPatterns?: string[]; // For AI, optional
  prompts: ProfilePromptAnswer[];
  email?: string;
  work?: string;
  jobTitle?: string;
  education?: string;
  ethnicity?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  childrenStatus?: string;
  familyPlans?: string;
  height?: string;
  locationAddress?: string;
  locationName?: string;
  locationCoordinates?: { lat: number; lng: number };
  drinking?: string;
  smoking?: string;
  zodiacSign?: string; 
  achievements?: Achievement[];
  challenges?: Challenge[];
  locationServicesEnabled?: boolean;
  onboardingComplete: boolean;
}

export interface ProfilePrompt {
  id: string;
  question: string;
}

export interface ProfilePromptAnswer {
  promptId: string;
  answer: string;
}

// Data structure for what the user submits from the form
export interface MomentLog {
  loggerId: string;
  placeName: string;
  locationAddress: string | null;
  coordinates: { lat: number, lng: number } | null;
  momentDescription: string;
  descriptors: {
    ethnicity: string;
    hairColour: string;
    otherDetails: string;
  };
  loggedAt?: string;
}

// Data structure for how a moment is stored in Firestore
export interface Moment {
  id: string;
  loggerId: string;
  placeName: string;
  locationAddress: string | null;
  coordinates: { lat: number, lng: number } | null;
  momentDescription: string;
  descriptors: {
    ethnicity: string;
    hairColour: string;
    otherDetails: string;
  };
  loggedAt: FieldValue | Timestamp | string; // serverTimestamp, Firestore Timestamp on read, or ISO string on client
  status: 'pending' | 'confirmed' | 'rejected';
  confirmedUserId?: string;
  chatId?: string;
  // This field is from mock data, we keep it for components that haven't been migrated
  timestamp?: string;
  potentialMatchId?: string; 
}

export interface Notification {
  id: string;
  userId: string; // The user who receives the notification
  senderId?: string; // The user who triggered the notification
  senderName?: string;
  senderImage?: string;
  type: 'MOMENT_CONFIRMATION' | 'NEW_MATCH' | 'NEW_MESSAGE' | 'GENERIC';
  title: string;
  message: string;
  href: string; // Link to the relevant page
  read: boolean;
  createdAt: FieldValue | Timestamp | string;
}


export interface ChatMessage {
  id:string;
  chatId?: string; // Optional since it's the parent doc id
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: FieldValue | Timestamp | string;
  isRead?: boolean;
}

export type ChatParticipant = Pick<UserProfile, 'id' | 'name' | 'images'>;

export interface Chat {
  id: string;
  participantIds: string[];
  participants: ChatParticipant[];
  createdAt: FieldValue | Timestamp;
  lastMessage: {
    text: string;
    timestamp: FieldValue | Timestamp;
    senderId: string;
  } | null;
}

export interface CrossedPathUser extends UserProfile {
  crossedAt: string; // ISO timestamp
  location?: string; // Name of location
}

export type MatchType = 'crossedPaths' | 'swipe' | 'ai';

export interface Match {
  id: string;
  userIds: [string, string];
  matchedAt: string; // ISO date string
  type: MatchType;
}

export interface DetailedMatchSuggestion {
  user: UserProfile;
  matchScore: number;
  sharedInterestReason: string;
  sharedLocationReason: string;
  sharedVibeTags: string[];
}

export interface Achievement {
  id: string;
  name: string;
  type: string; 
  description: string;
  icon: string; 
  achievedDate?: string; 
  rewards: string[]; 
  glowEffect?: boolean; 
}

export interface ChallengeProgress {
  current: number;
  target: number;
  unit: string; // e.g., "days", "matches", "locations"
}

export interface Challenge {
  id: string;
  name: string; 
  type: string; // e.g., "Streak", "Timed", "Exploration"
  description: string; 
  icon: string; 
  rewardPreview: string; // e.g., "Glow Badge, Priority Visibility"
  progress?: ChallengeProgress;
  status?: 'active' | 'not_started' | 'completed'; 
  timeLimit?: string; // e.g., "Ends in 2 days", "24 hours remaining"
  triggerAction?: string; // The action that triggers progress for this challenge
}

export interface Hotspot {
  id: string;
  type: 'Connection Zone' | 'Serendipity Spike' | 'Loop Zone';
  title: string;
  description: string;
  coordinates: { lat: number; lng: number };
}

  
