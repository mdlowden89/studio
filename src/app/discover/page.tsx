
import { AppLayout } from "@/components/layout/app-layout";
import { SwipeMatchSection } from "@/components/dashboard/swipe-match-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Handshake, Search as SearchIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BlurredLikesSection } from "@/components/discover/blurred-likes-section";

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
                    Find new connections by swiping or see who's already noticed you.
                    </CardDescription>
                </div>
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="swipe-match" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-1 md:w-1/2 lg:w-1/3 mx-auto mb-6">
            <TabsTrigger
              value="swipe-match"
              className="group border border-primary/30 hover:shadow-[0_0_15px_4px_hsl(var(--primary)/0.5)] data-[state=active]:border-primary data-[state=active]:shadow-[0_0_15px_4px_hsl(var(--primary)/0.7)]"
            >
              <Handshake className="mr-2 h-5 w-5 transition-transform duration-100 group-hover:animate-handshake-shake" />
              Swipe & Match
            </TabsTrigger>
          </TabsList>
          <TabsContent value="swipe-match">
            <SwipeMatchSection />
          </TabsContent>
        </Tabs>

        <Separator className="my-12 bg-border/50" />

        <BlurredLikesSection />

      </div>
    </AppLayout>
  );
}
