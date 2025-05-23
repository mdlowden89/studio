
import { AppLayout } from "@/components/layout/app-layout";
import { CrossedPathsSection } from "@/components/dashboard/crossed-paths-section";
import { SwipeMatchSection } from "@/components/dashboard/swipe-match-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Swords, Handshake, Sparkles, PlusCircle } from "lucide-react";
import { getCurrentUser } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const currentUser = getCurrentUser();

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
