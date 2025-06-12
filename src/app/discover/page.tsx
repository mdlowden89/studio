
import { AppLayout } from "@/components/layout/app-layout";
import { SwipeMatchSection } from "@/components/dashboard/swipe-match-section";
import { CrossedPathsSection } from "@/components/dashboard/crossed-paths-section"; // Import CrossedPathsSection
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Handshake, Search as SearchIcon, Route } from "lucide-react"; // Import Route icon

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
                    Find new connections by swiping or see who you've crossed paths with.
                    </CardDescription>
                </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="swipe-match" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-2 md:w-2/3 lg:w-1/2 mx-auto mb-6">
            <TabsTrigger 
              value="swipe-match"
              className="border border-primary/30 hover:shadow-[0_0_15px_4px_hsl(var(--primary)/0.5)] data-[state=active]:border-primary data-[state=active]:shadow-[0_0_15px_4px_hsl(var(--primary)/0.7)]"
            >
              <Handshake className="mr-2 h-5 w-5" />
              Swipe & Match
            </TabsTrigger>
            <TabsTrigger 
              value="crossed-paths"
              className="border border-primary/30 hover:shadow-[0_0_15px_4px_hsl(var(--primary)/0.5)] data-[state=active]:border-primary data-[state=active]:shadow-[0_0_15px_4px_hsl(var(--primary)/0.7)]"
            >
              <Route className="mr-2 h-5 w-5" />
              Crossed Paths
            </TabsTrigger>
          </TabsList>
          <TabsContent value="swipe-match">
            <SwipeMatchSection />
          </TabsContent>
          <TabsContent value="crossed-paths">
            <CrossedPathsSection />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
