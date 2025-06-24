
'use server';

import { dataConnect } from '@/lib/firebase';
// Use a direct path alias that Next.js can resolve.
import { UserProfile as UserProfileSDK, UserProfileQuery } from '@/lib/dataconnect/default-connector';
import type { UserProfile } from './types';
import { MOCK_USERS, MOCK_USER_ID } from './mock-data';

/**
 * Fetches a user profile from the database.
 * @param userId The ID of the user to fetch.
 * @returns The user profile, or null if not found.
 */
export async function fetchUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data } = await UserProfileQuery.get({ id: userId }, { client: dataConnect });
    if (!data) {
      return null;
    }
    // The data from the SDK is a plain object; we cast it to our TS type.
    // Ensure the types are compatible in schema.gql and types.ts.
    return data as UserProfile;
  } catch (error) {
    console.error(`Error fetching user profile for ${userId}:`, error);
    return null;
  }
}

/**
 * Creates or retrieves a user profile. If the user doesn't exist in the database,
 * it seeds their profile from the mock data as a one-time operation.
 * @param userId The ID of the user.
 * @returns The user profile.
 * @throws An error if the user cannot be found or created.
 */
export async function getOrCreateUserProfile(userId: string): Promise<UserProfile> {
  let user = await fetchUserProfile(userId);

  if (!user) {
    console.log(`User ${userId} not found in DB. Seeding from mock data...`);
    const mockUser = MOCK_USERS.find(u => u.id === userId);
    if (mockUser) {
      const newUser = new UserProfileSDK(mockUser);
      await newUser.insert({ client: dataConnect });
      console.log(`Successfully seeded user ${userId}.`);
      return mockUser;
    } else {
      throw new Error(`Could not find mock user with ID ${userId} to seed the database.`);
    }
  }

  return user;
}


/**
 * Updates a user's profile in the database.
 * @param userId The ID of the user to update.
 * @param profileData A partial object of the user's profile data to update.
 * @throws An error if the user is not found.
 */
export async function updateUserProfile(userId: string, profileData: Partial<UserProfile>): Promise<void> {
  const existingProfile = await fetchUserProfile(userId);

  if (!existingProfile) {
    throw new Error(`Cannot update: User with ID ${userId} not found.`);
  }

  // Merge existing data with new data
  const updatedData = { ...existingProfile, ...profileData };

  // Data Connect SDK's update method requires a full UserProfileSDK instance
  const profileToUpdate = new UserProfileSDK(updatedData);
  
  await profileToUpdate.update({ client: dataConnect });
  console.log(`Successfully updated user profile for ${userId}.`);
}
