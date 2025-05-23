
import { AppLayout } from "@/components/layout/app-layout";
import { CrossedPathsSection } from "@/components/dashboard/crossed-paths-section";
import { SwipeMatchSection } from "@/components/dashboard/swipe-match-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Swords, Handshake, Search as SearchIcon } from "lucide-react";

export default function DiscoverPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="mb-8 bg-card shadow-xl">
          <CardHeader>
             <div className="flex items-center gap-3">
                <SearchIcon className="w-8 h-8 text-primary" />
                <div>
                    <CardTitle className="text-3xl font-bold">Discover Connections</CardTitle>
                    <CardDescription className="text-muted-foreground">
                    Find new connections by exploring users you've crossed paths with or swipe to find a match.
                    </CardDescription>
                </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="crossed-paths" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto mb-6">
            <TabsTrigger value="crossed-paths">
              <Swords className="mr-2 h-5 w-5" />
              Crossed Paths
            </TabsTrigger>
            <TabsTrigger value="swipe-match">
              <Handshake className="mr-2 h-5 w-5" />
              Swipe & Match
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
