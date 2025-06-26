
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { HeartHandshake, MessageCircle, Sparkles, Home, Loader2 } from "lucide-react";
import Link from "next/link";
import ReactConfetti from "react-confetti";
import { useAuth } from "@/hooks/use-auth";
import type { UserProfile } from "@/lib/types";
import { getUserProfile } from "@/app/actions";

const MOCK_LOGGED_MOMENT_DETAILS = {
  placeName: "The Alchemist's Cafe",
};

export default function MatchConfirmedPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const userAId = params.userAId as string;
  const chatId = searchParams.get('chatId');

  const { userProfile: currentUserB, isLoading: isAuthLoading } = useAuth();
  const [userA, setUserA] = useState<UserProfile | null>(null);
  const [isLoadingUserA, setIsLoadingUserA] = useState(true);

  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (userAId) {
      setIsLoadingUserA(true);
      getUserProfile(userAId).then(profile => {
        setUserA(profile);
        setIsLoadingUserA(false);
      });
    }
  }, [userAId]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
      setShowConfetti(true);

      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 7000);

      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(timer);
      };
    }
    return () => {};
  }, []);

  if (isAuthLoading || isLoadingUserA) {
    return (
      <AppLayout>
          <div className="container mx-auto py-8 flex justify-center items-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
      </AppLayout>
    );
  }

  if (!userA || !currentUserB) {
    return (
      <AppLayout>
        <div className="container mx-auto py-8 text-center">
          <p>Error: Could not load user details for the match.</p>
          <Button onClick={() => router.push('/dashboard')} className="mt-4">Go to Dashboard</Button>
        </div>
      </AppLayout>
    );
  }

  const chatLink = chatId ? `/chat/${chatId}` : '/chat';

  return (
    <AppLayout>
      {showConfetti && windowSize.width > 0 && windowSize.height > 0 && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, pointerEvents: 'none' }}>
            <ReactConfetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={500}
                gravity={0.15}
            />
        </div>
      )}
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[calc(100vh-var(--header-height,4rem)-2rem-6rem)]">
        <Card className="bg-card shadow-xl w-full max-w-lg text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary mb-4 animate-pulse">
              <HeartHandshake className="h-10 w-10 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold text-primary">Connection Sparked!</CardTitle>
            <CardDescription className="text-muted-foreground text-lg mt-1">
              You and <span className="font-semibold text-foreground">{userA.name.split(' ')[0]}</span> have both confirmed your paths crossed at <span className="font-semibold text-foreground">{MOCK_LOGGED_MOMENT_DETAILS.placeName}</span>!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-around items-center">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24 border-4 border-primary/70">
                  <AvatarImage src={currentUserB.images[0]} alt={currentUserB.name} data-ai-hint="profile avatar current user"/>
                  <AvatarFallback>{currentUserB.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-foreground">{currentUserB.name.split(' ')[0]}</p>
              </div>
              <Sparkles className="w-10 h-10 text-primary" />
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24 border-4 border-primary/70">
                  <AvatarImage src={userA.images[0]} alt={userA.name} data-ai-hint="profile avatar matched user"/>
                  <AvatarFallback>{userA.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-foreground">{userA.name.split(' ')[0]}</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              What's next? You can start a conversation or continue exploring other potential connections.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pt-6 border-t">
            <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link href="/discover">
                    <Home className="mr-2 h-5 w-5" />
                    Keep Exploring
                </Link>
            </Button>
            <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href={chatLink}>
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Message {userA.name.split(' ')[0]}
                </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
