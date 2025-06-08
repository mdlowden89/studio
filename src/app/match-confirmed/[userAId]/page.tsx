
"use client";

import { useParams, useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MOCK_USERS, getCurrentUser } from "@/lib/mock-data";
import { HeartHandshake, MessageCircle, Sparkles, Home } from "lucide-react";
import Link from "next/link";

// Using the same mock moment details for consistency in the prototype
const MOCK_LOGGED_MOMENT_DETAILS = {
  placeName: "The Alchemist's Cafe",
  userA_id: "user-1" // Default if params.userAId is somehow not found, though it should be
};

export default function MatchConfirmedPage() {
  const params = useParams();
  const router = useRouter();
  const userAId = params.userAId as string;

  const userA = MOCK_USERS.find(u => u.id === userAId);
  const currentUserB = getCurrentUser(); // This is "User B"

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

  // For simplicity, we'll assume the match is for "chat-1" which involves user-1 (Alex)
  // In a real app, you'd create a new chat or find an existing one.
  const chatLink = userA.id === 'user-1' ? '/chat/chat-1' : '/chat';


  return (
    <AppLayout>
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[calc(100vh-var(--header-height,4rem)-2rem-6rem)]">
        <Card className="bg-card shadow-xl w-full max-w-lg text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary mb-4 animate-pulse">
              <HeartHandshake className="h-10 w-10 text-primary-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold text-primary">Connection Sparked!</CardTitle>
            <CardDescription className="text-muted-foreground text-lg mt-1">
              You and <span className="font-semibold text-foreground">{userA.name}</span> have both confirmed your paths crossed at <span className="font-semibold text-foreground">{MOCK_LOGGED_MOMENT_DETAILS.placeName}</span>!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-around items-center">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24 border-4 border-primary/70">
                  <AvatarImage src={currentUserB.images[0]} alt={currentUserB.name} data-ai-hint="profile avatar current user"/>
                  <AvatarFallback>{currentUserB.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-foreground">{currentUserB.name}</p>
              </div>
              <Sparkles className="w-10 h-10 text-primary" />
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24 border-4 border-primary/70">
                  <AvatarImage src={userA.images[0]} alt={userA.name} data-ai-hint="profile avatar matched user"/>
                  <AvatarFallback>{userA.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
                <p className="font-semibold text-foreground">{userA.name}</p>
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
                    Message {userA.name}
                </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
    
