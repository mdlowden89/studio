
"use client";

import { useState } from "react";
import { MOCK_USERS, MOCK_USER_ID } from "@/lib/mock-data";
import { MatchCard } from "./match-card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function SwipeMatchSection() {
  // Filter out the current user and shuffle for variety
  const initialUsers = MOCK_USERS.filter(user => user.id !== MOCK_USER_ID)
                                  .sort(() => 0.5 - Math.random());
  const [users, setUsers] = useState(initialUsers);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();
  const [showMatchAnimation, setShowMatchAnimation] = useState(false);
  const [matchedUserName, setMatchedUserName] = useState("");

  const handleAction = (userId: string, action: "like" | "pass") => {
    if (action === "like") {
      const isMutualMatch = Math.random() < 0.4; // Slightly higher chance for swipe
      if (isMutualMatch) {
        const matchedUser = users.find(u => u.id === userId);
         if (matchedUser) {
            setMatchedUserName(matchedUser.name);
            setShowMatchAnimation(true);
        }
      } else {
        toast({
            title: "Liked!",
            description: `Let's see if ${users.find(u => u.id === userId)?.name} likes you back!`,
        });
      }
    } else {
        toast({
            title: "Passed",
            description: `You've passed on this profile.`,
            variant: "default"
        });
    }

    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast({
        title: "That's everyone for now!",
        description: "Check back later for new profiles.",
      });
      // setUsers([]); // Optionally clear users or show a refresh button
      // setCurrentIndex(0);
    }
  };

  const handleLike = (userId: string) => handleAction(userId, "like");
  const handlePass = (userId: string) => handleAction(userId, "pass");

  const refreshUsers = () => {
    setUsers(MOCK_USERS.filter(user => user.id !== MOCK_USER_ID).sort(() => 0.5 - Math.random()));
    setCurrentIndex(0);
    toast({ title: "Profiles Refreshed!", description: "Here are some new faces."});
  };

  if (users.length === 0 || currentIndex >= users.length) {
    return (
      <div className="text-center py-10 flex flex-col items-center">
        <Users className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No More Profiles</h3>
        <p className="text-muted-foreground mb-4">You've seen everyone for now. Try refreshing or check back later.</p>
        <Button onClick={refreshUsers}>
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh Profiles
        </Button>
      </div>
    );
  }

  const currentUser = users[currentIndex];

  return (
    <div className="flex flex-col items-center space-y-6">
      <MatchCard
        key={currentUser.id}
        user={currentUser}
        onLike={handleLike}
        onPass={handlePass}
      />
      <Button onClick={refreshUsers} variant="outline" className="mt-4">
        <RefreshCw className="mr-2 h-4 w-4" /> Refresh
      </Button>

      <AlertDialog open={showMatchAnimation} onOpenChange={setShowMatchAnimation}>
        <AlertDialogContent className="bg-card text-card-foreground border-primary shadow-lg rounded-xl">
          <AlertDialogHeader>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary mb-4 animate-pulse">
              <HeartHandshakeIcon className="h-10 w-10 text-primary-foreground" />
            </div>
            <AlertDialogTitle className="text-center text-2xl font-bold text-primary">It's a Match!</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-muted-foreground text-lg">
              You and {matchedUserName} both liked each other!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction 
              onClick={() => {
                setShowMatchAnimation(false);
                 toast({
                  title: `Chat with ${matchedUserName}!`,
                  description: "You can now start a conversation.",
                });
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
            >
              Say Hello
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function HeartHandshakeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
      <path d="m18 15-2-2" />
      <path d="m15 18-2-2" />
    </svg>
  )
}
