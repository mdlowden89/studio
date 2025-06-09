
import { AppLayout } from "@/components/layout/app-layout";
import { ProfileDetails } from "@/components/profile/profile-details";
import { ImageGallery } from "@/components/profile/image-gallery";
import { PromptEditor } from "@/components/profile/prompt-editor";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, Image as ImageIcon, MessageSquareText, Trophy } from "lucide-react"; // Added Trophy
import { getCurrentUser, AVAILABLE_PROMPTS } from "@/lib/mock-data";
import { AchievementsSection } from "@/components/profile/achievements-section"; // Added

export default function ProfilePage() {
  const currentUser = getCurrentUser();
  
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="bg-card shadow-xl mb-8">
            <CardHeader className="flex flex-row items-center gap-4">
                <UserCircle className="w-10 h-10 text-primary" />
                <div>
                    <CardTitle className="text-3xl font-bold">Your Profile</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Manage your public information, photos, prompts, and earned achievements.
                    </CardDescription>
                </div>
            </CardHeader>
        </Card>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mb-6"> {/* Adjusted grid-cols */}
            <TabsTrigger value="details"><UserCircle className="mr-2 h-4 w-4" />Details</TabsTrigger>
            <TabsTrigger value="photos"><ImageIcon className="mr-2 h-4 w-4" />Photos</TabsTrigger>
            <TabsTrigger value="prompts"><MessageSquareText className="mr-2 h-4 w-4" />Prompts</TabsTrigger>
            <TabsTrigger value="achievements"><Trophy className="mr-2 h-4 w-4" />Achievements</TabsTrigger> {/* Added Achievements Tab */}
          </TabsList>

          <TabsContent value="details">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your bio, age, and vibe tags.</CardDescription>
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

          <TabsContent value="achievements"> {/* Added Achievements Content */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>Badges you've earned for your activity on Crossd.</CardDescription>
              </CardHeader>
              <CardContent>
                <AchievementsSection achievements={currentUser.achievements || []} />
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </AppLayout>
  );
}
