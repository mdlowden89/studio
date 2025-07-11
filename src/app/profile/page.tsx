
'use client';

import { AppLayout } from "@/components/layout/app-layout";
import { ProfileDetails } from "@/components/profile/profile-details";
import { ImageGallery } from "@/components/profile/image-gallery";
import { PromptEditor } from "@/components/profile/prompt-editor";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, Image as ImageIcon, MessageSquareText, Target as TargetIcon, Loader2, ShieldCheck } from "lucide-react";
import { AVAILABLE_PROMPTS } from "@/lib/mock-data";
import { AchievementsSection } from "@/components/profile/achievements-section";
import { ChallengesSection } from "@/components/challenges/challenges-section";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/hooks/use-auth';
import { VerificationDialog } from "@/components/profile/verification-dialog";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

function ProfilePageLoading() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <div className="flex justify-center items-center h-96">
            <Loader2 className="w-16 h-16 animate-spin text-primary" />
        </div>
      </div>
    </AppLayout>
  );
}

export default function ProfilePage() {
  const { userProfile, isLoading } = useAuth();

  if (isLoading || !userProfile) {
    return <ProfilePageLoading />;
  }
  
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="bg-card shadow-xl mb-8">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <UserCircle className="w-10 h-10 text-primary flex-shrink-0" />
                <div className="flex-grow">
                    <CardTitle className="text-3xl font-bold">Your Profile</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Manage your public information, photos, prompts, challenges, and achievements.
                    </CardDescription>
                </div>
                 {userProfile.isVerified ? (
                  <div className="flex items-center gap-2 p-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 font-semibold text-sm">
                    <ShieldCheck className="w-5 h-5" />
                    <span>Verified</span>
                  </div>
                ) : (
                  <VerificationDialog>
                      <Button variant="outline" className="text-primary border-primary hover:bg-primary/10 hover:text-primary">
                          <ShieldCheck className="mr-2 h-4 w-4" />
                          Verify Your Profile
                      </Button>
                  </VerificationDialog>
                )}
            </CardHeader>
        </Card>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="flex flex-wrap h-auto justify-center gap-2 mb-12 !bg-card/60 border border-primary/50 p-2 rounded-lg">
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
                <ProfileDetails user={userProfile} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="photos">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Your Photos</CardTitle>
                <CardDescription>Add, remove, or reorder your profile pictures. Changes are saved automatically.</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageGallery 
                  initialImages={userProfile.images} 
                  userId={userProfile.id}
                />
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
                  userPrompts={userProfile.prompts || []}
                  availablePrompts={AVAILABLE_PROMPTS} 
                  userId={userProfile.id}
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
                  <ChallengesSection challenges={userProfile.challenges || []} />
                </div>
                <Separator className="my-6 bg-border/50" />
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-primary">Earned Achievements</h3>
                  <AchievementsSection achievements={userProfile.achievements || []} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </AppLayout>
  );
}
