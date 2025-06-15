
"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Sparkles } from "lucide-react";
import { MOCK_USERS, MOCK_USER_ID } from "@/lib/mock-data";
import Link from "next/link";
import { CrossdPlusUpsellDialog } from "@/components/pricing/crossd-plus-upsell-dialog";
import { useState } from "react";

// Select a few users who "liked" the current user (mock)
const mockLikers = MOCK_USERS.filter(u => u.id !== MOCK_USER_ID && u.id !== 'user-123') // Ensure current dev user is not in likers
                           .slice(0, 3); 
                           // Make sure we have at least 3 different users for the stack

export function BlurredLikesSection() {
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

  return (
    <Card className="mt-12 bg-card shadow-xl">
      <CardHeader className="text-center pb-6"> {/* Changed pb-4 to pb-6 */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/80 mb-3 shadow-lg">
            <Eye className="h-8 w-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold text-primary">Who Noticed You?</CardTitle>
        <CardDescription className="text-muted-foreground max-w-md mx-auto">
          You've Been Noticed! Unlock Crossd+ to see who's interested and instantly match.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="relative h-64 w-full max-w-xs mx-auto mb-8 flex items-center justify-center">
          {mockLikers.map((user, index) => (
            <Card
              key={user.id}
              className="absolute w-52 h-72 bg-card/80 shadow-2xl overflow-hidden border-2 border-primary/30"
              style={{
                transform: `rotate(${index * 5 - (mockLikers.length > 1 ? (mockLikers.length -1) * 2.5 : 0)}deg) translateX(${index * 12 - (mockLikers.length > 1 ? (mockLikers.length -1) * 6 : 0)}px) translateY(${index * -6}px)`,
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
              {/* Optional: Blurred name placeholder */}
              <div className="absolute bottom-3 left-3 right-3 p-2 bg-black/40 rounded ">
                <div className="h-4 bg-white/30 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-white/20 rounded w-1/2"></div>
              </div>
            </Card>
          ))}
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
