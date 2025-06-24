import type { LucideIcon } from 'lucide-react';

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

export interface Moment {
  id: string;
  userId: string; // User who experienced this moment
  potentialMatchId?: string; // If a potential match was nearby
  placeName: string;
  timestamp: string; // ISO date string
  coordinates?: { lat: number; lng: number };
}

export interface ChatMessage {
  id:string;
  chatId: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string; // ISO date string
  isRead?: boolean;
}

export interface ChatConversation {
  id: string;
  participantIds: string[];
  participants: Pick<UserProfile, 'id' | 'name' | 'images'>[];
  lastMessage?: Pick<ChatMessage, 'text' | 'timestamp' | 'senderId'>;
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
  icon: React.ElementType; 
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
  icon: React.ElementType; 
  rewardPreview: string; // e.g., "Glow Badge, Priority Visibility"
  progress?: ChallengeProgress;
  status?: 'active' | 'not_started'; 
  timeLimit?: string; // e.g., "Ends in 2 days", "24 hours remaining"
}

export interface Hotspot {
  id: string;
  type: 'Connection Zone' | 'Serendipity Spike' | 'Loop Zone';
  title: string;
  description: string;
  coordinates: { lat: number; lng: number };
}
