
'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import type { UserProfile } from '@/lib/types';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            console.log(`Found user ${firebaseUser.uid} in Firestore.`);
            setUserProfile(userDoc.data() as UserProfile);
          } else {
            console.log(`User ${firebaseUser.uid} not found in Firestore. Creating new profile...`);
            
            const getInitialName = () => {
              if (firebaseUser.displayName) {
                return firebaseUser.displayName;
              }
              if (firebaseUser.email) {
                const emailName = firebaseUser.email.split('@')[0];
                return emailName.charAt(0).toUpperCase() + emailName.slice(1);
              }
              return "New User";
            };

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
              onboardingComplete: false,
            };
            
            await setDoc(userDocRef, newUserProfile);
            console.log(`Successfully created profile for user ${firebaseUser.uid} with name: ${newUserProfile.name}`);
            setUserProfile(newUserProfile);
          }
        } catch (error) {
            console.error("Failed to get or create user profile in useAuth:", error);
            // If profile fails to load, sign the user out to prevent being in a broken state.
            await auth.signOut();
            setUser(null);
            setUserProfile(null);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
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
