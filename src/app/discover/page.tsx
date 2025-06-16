
"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { SwipeMatchSection } from "@/components/dashboard/swipe-match-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Handshake, Search as SearchIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BlurredLikesSection } from "@/components/discover/blurred-likes-section";
import { ReceivedLikeUpsellDialog } from "@/components/discover/received-like-upsell-dialog";
import { CrossdPlusUpsellDialog } from "@/components/pricing/crossd-plus-upsell-dialog";

export default function DiscoverPage() {
  const [showNewLikeUpsell, setShowNewLikeUpsell] = useState(false);
  const [showPremiumUpsell, setShowPremiumUpsell] = useState(false);

  useEffect(() => {
    // Simulate checking for new likes and non-premium status
    // In a real app, replace this with actual logic
    const hasNewLikes = true; 
    const isPremium = false; 

    if (hasNewLikes && !isPremium) {
      // Delay slightly to allow page to render first, then show dialog
      const timer = setTimeout(() => {
        setShowNewLikeUpsell(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleUpgradeFromNewLikeDialog = () => {
    setShowNewLikeUpsell(false);
    setShowPremiumUpsell(true);
  };

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

      <ReceivedLikeUpsellDialog
        isOpen={showNewLikeUpsell}
        onOpenChange={setShowNewLikeUpsell}
        onUpgrade={handleUpgradeFromNewLikeDialog}
      />
      <CrossdPlusUpsellDialog
        isOpen={showPremiumUpsell}
        onOpenChange={setShowPremiumUpsell}
      />
    </AppLayout>
  );
}
