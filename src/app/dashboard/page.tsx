
import { AppLayout } from "@/components/layout/app-layout";
import { CrossedPathsSection } from "@/components/dashboard/crossed-paths-section";
import { SwipeMatchSection } from "@/components/dashboard/swipe-match-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Swords, Handshake, Sparkles, PlusCircle, ClipboardList, Users, MessageSquare } from "lucide-react";
import { getCurrentUser, MOCK_MOMENTS, MOCK_CROSSED_PATHS_USERS, MOCK_CHAT_CONVERSATIONS, MOCK_USER_ID } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const currentUser = getCurrentUser();

  const momentsLoggedCount = MOCK_MOMENTS.filter(moment => moment.userId === MOCK_USER_ID).length;
  const potentialMatchesCount = MOCK_CROSSED_PATHS_USERS.length; // Based on users you've crossed paths with
  const activeChatsCount = MOCK_CHAT_CONVERSATIONS.length;

  const stats = [
    { title: "Moments Logged", value: momentsLoggedCount, icon: ClipboardList, color: "text-blue-500" },
    { title: "Potential Matches", value: potentialMatchesCount, icon: Users, color: "text-green-500" },
    { title: "Active Chats", value: activeChatsCount, icon: MessageSquare, color: "text-purple-500" },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="mb-8 bg-card shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              <div>
                <CardTitle className="text-2xl font-bold">
                  Welcome back, {currentUser.name}!
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-1">
                  Here's what's new on Crossd. Did you see anyone interesting today?
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="flex justify-end p-6">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <PlusCircle className="mr-2 h-5 w-5" />
              Log a Crossing/Moment
            </Button>
          </CardFooter>
        </Card>

        <Card className="mb-8 bg-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Your Activity At a Glance</CardTitle>
            <CardDescription className="text-muted-foreground">
              A quick look at your Crossd engagement.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-muted/50 p-6 rounded-lg flex flex-col items-center text-center shadow-md">
                  <stat.icon className={`w-10 h-10 mb-3 ${stat.color}`} />
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="crossed-paths" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto mb-6">
            <TabsTrigger value="crossed-paths">
              <Swords className="mr-2 h-5 w-5" />
              Crossed Paths
            </TabsTrigger>
            <TabsTrigger value="swipe-match">
              <Handshake className="mr-2 h-5 w-5" />
              Discover
            </TabsTrigger>
          </TabsList>
          <TabsContent value="crossed-paths">
            <CrossedPathsSection />
          </TabsContent>
          <TabsContent value="swipe-match">
            <SwipeMatchSection />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
