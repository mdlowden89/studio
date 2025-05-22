
import { AppLayout } from "@/components/layout/app-layout";
import { CrossedPathsSection } from "@/components/dashboard/crossed-paths-section";
import { SwipeMatchSection } from "@/components/dashboard/swipe-match-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Swords, Handshake } from "lucide-react";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
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
