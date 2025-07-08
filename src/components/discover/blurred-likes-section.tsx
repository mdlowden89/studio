"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Sparkles } from "lucide-react";
import { MOCK_USERS, MOCK_USER_ID } from "@/lib/mock-data";
import { CrossdPlusUpsellDialog } from "@/components/pricing/crossd-plus-upsell-dialog";
import { useState } from "react";
import { MatchCard } from "@/components/dashboard/match-card";
import { useToast } from "@/hooks/use-toast";

const mockLikers = MOCK_USERS.filter(u => u.id !== MOCK_USER_ID && u.id !== 'user-123')
                           .slice(0, 8);

interface BlurredLikesSectionProps {
  isPremium: boolean;
}

const RevealedLikesGrid = () => {
  const { toast } = useToast();

  const handleCardClick = (userName: string) => {
    toast({
      title: "Profile Viewed",
      description: `You can now find ${userName} in your swipe deck to take action.`,
    });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {mockLikers.map(user => (
        <div key={user.id} onClick={() => handleCardClick(user.name)}>
          <MatchCard user={user} />
        </div>
      ))}
    </div>
  );
};

export function BlurredLikesSection({ isPremium }: BlurredLikesSectionProps) {
  const [showUpsellDialog, setShowUpsellDialog] = useState(false);

  if (mockLikers.length === 0) {
    return (
      <Card className="mt-12 bg-card shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold text-primary">Who Noticed You</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">No new likes yet. Keep exploring!</p>
        </CardContent>
      </Card>
    );
  }

  const cardFanMiddleIndex = (mockLikers.length - 1) / 2;

  if (isPremium) {
    return (
      <Card className="mt-12 bg-card shadow-xl">
        <CardHeader className="text-center pb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/80 mb-3 shadow-lg">
            <Eye className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Who Likes You</CardTitle>
          <CardDescription className="text-muted-foreground max-w-md mx-auto">
            Here are the people who have already liked you. Click a card to view their profile.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RevealedLikesGrid />
        </CardContent>
      </Card>
    );
  }


  return (
    <Card className="mt-12 bg-card shadow-xl">
      <CardHeader className="text-center pb-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/80 mb-3 shadow-lg">
            <Eye className="h-8 w-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold text-primary">Who Noticed You?</CardTitle>
        <CardDescription className="text-muted-foreground max-w-md mx-auto">
          You've Been Noticed! Unlock Crossd+ to see who's interested and instantly match.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="relative h-80 w-full max-w-sm mx-auto mb-8 flex items-center justify-center">
          {mockLikers.slice(0, 3).map((user, index) => {
            const rotation = (index - cardFanMiddleIndex) * 6; // Reduced rotation
            const translateX = (index - cardFanMiddleIndex) * 24; // Tighter horizontal spread
            const translateY = Math.abs(index - cardFanMiddleIndex) * -4; // Shallower arc

            return (
              <Card
                key={user.id}
                className="absolute w-56 h-80 bg-card/80 shadow-2xl overflow-hidden border-2 border-primary/30"
                style={{
                  transform: `rotate(${rotation}deg) translateX(${translateX}px) translateY(${translateY}px)`,
                  zIndex: mockLikers.length - index,
                  filter: 'blur(5px)',
                }}
              >
                <Image
                  src={user.images[0] || "https://placehold.co/300x400.png"} // Fallback image
                  alt={`Blurred profile`}
                  layout="fill"
                  objectFit="cover"
                  className="opacity-60"
                  data-ai-hint="profile portrait blurred"
                  unoptimized={user.images[0]?.startsWith('data:') || user.images[0]?.includes('placehold.co')}
                />
                <div className="absolute bottom-3 left-3 right-3 p-2 bg-black/40 rounded ">
                  <div className="h-4 bg-white/30 rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-white/20 rounded w-1/2"></div>
                </div>
              </Card>
            );
          })}
        </div>

        <Button
          onClick={() => setShowUpsellDialog(true)}
          size="lg"
          className="bg-gradient-to-r from-primary via-pink-500 to-orange-400 hover:from-primary/90 hover:via-pink-500/90 hover:to-orange-400/90 text-primary-foreground shadow-lg px-8 py-3 text-base transform hover:scale-105 transition-transform"
        >
          <Sparkles className="mr-2 h-5 w-5" /> See Who Likes You
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          Upgrade to Crossd+ to reveal all your admirers instantly!
        </p>
      </CardContent>

      <CrossdPlusUpsellDialog
        isOpen={showUpsellDialog}
        onOpenChange={setShowUpsellDialog}
      />
    </Card>
  );
}
