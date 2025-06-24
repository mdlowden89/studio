
'use client';

import { useState, useEffect } from 'react';
import type { UserProfile } from '@/lib/types';
import { AppLayout } from "@/components/layout/app-layout";
import { ProfileDetails } from "@/components/profile/profile-details";
import { ImageGallery } from "@/components/profile/image-gallery";
import { PromptEditor } from "@/components/profile/prompt-editor";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, Image as ImageIcon, MessageSquareText, Trophy, Target as TargetIcon, Loader2, Frown } from "lucide-react";
import { AVAILABLE_PROMPTS, MOCK_USER_ID } from "@/lib/mock-data";
import { AchievementsSection } from "@/components/profile/achievements-section";
import { ChallengesSection } from "@/components/challenges/challenges-section";
import { Separator } from "@/components/ui/separator";
import { getOrCreateUserProfile } from "@/app/actions";
import { Skeleton } from '@/components/ui/skeleton';


function ProfilePageLoading() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="bg-card shadow-xl mb-8">
            <CardHeader className="flex flex-row items-center gap-4">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div>
                    <Skeleton className="h-8 w-48 mb-1" />
                    <Skeleton className="h-4 w-96" />
                </div>
            </CardHeader>
        </Card>
        <div className="flex justify-center items-center h-96">
            <Loader2 className="w-16 h-16 animate-spin text-primary" />
        </div>
      </div>
    </AppLayout>
  );
}


// This is now a client component
export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getOrCreateUserProfile(MOCK_USER_ID);
        if (user) {
            setCurrentUser(user);
        } else {
            throw new Error("User profile not found.");
        }
      } catch (err: any) {
        console.error("Failed to fetch user profile:", err);
        setError(err.message || "An unexpected error occurred while loading your profile.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <ProfilePageLoading />;
  }

  if (error || !currentUser) {
    return (
        <AppLayout>
            <div className="container mx-auto py-8 flex flex-col items-center justify-center h-full text-center">
                <Frown className="w-24 h-24 text-destructive mb-4" />
                <h2 className="text-2xl font-bold text-destructive">Failed to Load Profile</h2>
                <p className="text-muted-foreground mt-2 max-w-md">{error || "We couldn't retrieve your profile information. Please try refreshing the page."}</p>
            </div>
        </AppLayout>
    );
  }
  
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="bg-card shadow-xl mb-8">
            <CardHeader className="flex flex-row items-center gap-4">
                <UserCircle className="w-10 h-10 text-primary" />
                <div>
                    <CardTitle className="text-3xl font-bold">Your Profile</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Manage your public information, photos, prompts, challenges, and achievements.
                    </CardDescription>
                </div>
            </CardHeader>
        </Card>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:grid-cols-4 mb-6 !bg-card/60 border border-primary/50 p-1 rounded-lg">
            <TabsTrigger 
              value="details" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/50 hover:text-primary focus-visible:ring-primary"
            >
              <UserCircle className="mr-2 h-4 w-4" />Details
            </TabsTrigger>
            <TabsTrigger 
              value="photos"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/50 hover:text-primary focus-visible:ring-primary"
            >
              <ImageIcon className="mr-2 h-4 w-4" />Photos
            </TabsTrigger>
            <TabsTrigger 
              value="prompts"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/50 hover:text-primary focus-visible:ring-primary"
            >
              <MessageSquareText className="mr-2 h-4 w-4" />Prompts
            </TabsTrigger>
            <TabsTrigger 
              value="progress"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md data-[state=active]:shadow-primary/50 hover:text-primary focus-visible:ring-primary"
            >
              <TargetIcon className="mr-2 h-4 w-4" />Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your bio, age, and vibe tags. Changes are saved to a real database.</CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileDetails user={currentUser} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Your Photos</CardTitle>
                <CardDescription>Add, remove, or reorder your profile pictures.</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageGallery initialImages={currentUser.images} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prompts">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Profile Prompts</CardTitle>
                <CardDescription>Answer prompts to show more of your personality.</CardDescription>
              </CardHeader>
              <CardContent>
                <PromptEditor 
                  userPrompts={currentUser.prompts} 
                  availablePrompts={AVAILABLE_PROMPTS} 
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Your Progress & Achievements</CardTitle>
                <CardDescription>Track your active challenges and view your earned badges.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">Active Challenges</h3>
                  <ChallengesSection />
                </div>
                <Separator className="my-6 bg-border/50" />
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">Earned Achievements</h3>
                  <AchievementsSection achievements={currentUser.achievements || []} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </AppLayout>
  );
}
