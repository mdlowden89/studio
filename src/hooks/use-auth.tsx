
'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import type { UserProfile, Challenge } from '@/lib/types';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { MOCK_AVAILABLE_CHALLENGES } from '@/lib/mock-data';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let profileUnsubscribe: (() => void) | undefined;

    const authUnsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (profileUnsubscribe) {
        profileUnsubscribe();
      }

      if (firebaseUser) {
        setUser(firebaseUser);
        const userDocRef = doc(db, "users", firebaseUser.uid);

        profileUnsubscribe = onSnapshot(
          userDocRef,
          async (docSnapshot) => {
            if (docSnapshot.exists()) {
              setUserProfile(docSnapshot.data() as UserProfile);
            } else {
              console.log(`User ${firebaseUser.uid} not found in Firestore. Creating new profile...`);
              
              const getInitialName = () => {
                if (firebaseUser.displayName) {
                  return firebaseUser.displayName;
                }
                if (firebaseUser.email) {
                  const emailName = firebaseUser.email.split('@')[0];
                  // Capitalize the first letter
                  return emailName.charAt(0).toUpperCase() + emailName.slice(1);
                }
                return "New User";
              };

              const initialChallenges: Challenge[] = MOCK_AVAILABLE_CHALLENGES.map(challenge => {
                // Set Streak and Connection challenges to active by default
                const isActiveByDefault = challenge.type === 'Streak' || challenge.type === 'Connection' || challenge.type === 'Timed Challenge';
                return {
                  ...challenge,
                  status: isActiveByDefault ? 'active' : 'not_started',
                  progress: challenge.progress
                    ? { ...challenge.progress, current: 0 }
                    : undefined,
                };
              });

              const newUserProfile: UserProfile = {
                id: firebaseUser.uid,
                name: getInitialName(),
                email: firebaseUser.email || "",
                age: 18,
                bio: "Welcome to Crossd! Tell us about yourself.",
                images: ['https://placehold.co/400x550.png'],
                vibeTags: [],
                prompts: [],
                locationPatterns: [],
                achievements: [],
                challenges: initialChallenges,
                onboardingComplete: false,
              };
              
              await setDoc(userDocRef, newUserProfile);
              // The onSnapshot listener will be triggered by setDoc, so no need to setUserProfile here.
            }
            setIsLoading(false);
          },
          (error) => {
            console.error("Error listening to user profile:", error);
            setUserProfile(null);
            setIsLoading(false);
          }
        );
      } else {
        setUser(null);
        setUserProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      authUnsubscribe();
      if (profileUnsubscribe) {
        profileUnsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, userProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
