
"use client";

import { useState, useEffect } from "react"; 
import { MOCK_USERS } from "@/lib/mock-data";
import type { UserProfile } from "@/lib/types";
import { MatchCard } from "./match-card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Users, Undo2, HeartHandshake as HeartHandshakeIcon } from "lucide-react";
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
import ReactConfetti from 'react-confetti';
import { CrossdPlusUpsellDialog } from "@/components/pricing/crossd-plus-upsell-dialog"; 
import { useAuth } from "@/hooks/use-auth";

const DAILY_LIKE_LIMIT = 8;

export function SwipeMatchSection() {
  const { user } = useAuth();
  const [initialUsers, setInitialUsers] = useState<UserProfile[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null); 
  const { toast } = useToast();
  const [showMatchAnimation, setShowMatchAnimation] = useState(false);
  const [matchedUserName, setMatchedUserName] = useState("");
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const [likesUsedToday, setLikesUsedToday] = useState(0);
  const [showUpsellDialog, setShowUpsellDialog] = useState(false);
  const [likesAnimationTrigger, setLikesAnimationTrigger] = useState(0);

  useEffect(() => {
    if (user) {
      const filtered = MOCK_USERS.filter(u => u.id !== user.uid);
      setInitialUsers(filtered);
      setUsers([...filtered].sort(() => 0.5 - Math.random()));
      setCurrentIndex(0);
      setPreviousIndex(null);
      setLikesUsedToday(0); 
    }
  }, [user]); 

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    return () => {};
  }, []);

  const handleAction = (userId: string, action: "like" | "pass") => {
    const actionUser = users.find(u => u.id === userId);
    if (!actionUser) return;

    if (action === "like") {
      if (likesUsedToday >= DAILY_LIKE_LIMIT) {
        setShowUpsellDialog(true);
        return;
      }
      setLikesUsedToday(prev => prev + 1);
      setLikesAnimationTrigger(prev => prev + 1); // Trigger animation
      const isMutualMatch = Math.random() < 0.4; 
      if (isMutualMatch) {
        setMatchedUserName(actionUser.name);
        setShowMatchAnimation(true);
      } else {
         toast({
            title: "Liked!",
            description: `Let's see if ${actionUser.name} likes you back! (${DAILY_LIKE_LIMIT - (likesUsedToday + 1)} likes remaining today)`,
        });
      }
    } else {
        toast({
            title: "Passed",
            description: `You've passed on ${actionUser.name}.`,
            variant: "default"
        });
    }
    
    setPreviousIndex(currentIndex); 
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast({
        title: "That's everyone for now!",
        description: "Check back later for new profiles.",
      });
    }
  };

  const handleLike = (userId: string) => handleAction(userId, "like");
  const handlePass = (userId: string) => handleAction(userId, "pass");

  const handleUndo = () => {
    if (previousIndex !== null && previousIndex < users.length) {
      const lastUser = users[previousIndex];
      setCurrentIndex(previousIndex);
      setPreviousIndex(null); 
      toast({ title: "Undo Successful", description: `You are now viewing ${lastUser?.name}'s profile again.` });
    } else {
      toast({ title: "Nothing to Undo", description: "You haven't swiped anyone yet or already undid.", variant: "destructive" });
    }
  };

  const refreshUsers = () => {
    if (user) {
      const newFilteredUsers = MOCK_USERS.filter(u => u.id !== user.uid);
      setInitialUsers(newFilteredUsers); 
      setUsers([...newFilteredUsers].sort(() => 0.5 - Math.random()));
      setCurrentIndex(0);
      setPreviousIndex(null); 
      toast({ title: "Profiles Refreshed!", description: "Here are some new faces."});
    }
  };

  if (users.length === 0 && initialUsers.length === 0) { 
    return (
      <div className="text-center py-10 flex flex-col items-center">
        <Users className="w-16 h-16 text-muted-foreground mb-4 animate-pulse" />
        <h3 className="text-xl font-semibold mb-2">Loading Profiles...</h3>
      </div>
    );
  }
  
  if (users.length === 0 || currentIndex >= users.length) {
    return (
      <div className="text-center py-10 flex flex-col items-center">
        <Users className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No More Profiles</h3>
        <p className="text-muted-foreground mb-4">You've seen everyone for now. Try refreshing or check back later.</p>
        <div className="flex gap-2 mt-4">
            <Button onClick={handleUndo} variant="outline" disabled={previousIndex === null}>
                <Undo2 className="mr-2 h-4 w-4" /> Undo
            </Button>
            <Button onClick={refreshUsers} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh Profiles
            </Button>
        </div>
      </div>
    );
  }

  const currentUserToDisplay = users[currentIndex];

  return (
    <div className="flex flex-col items-center space-y-6">
      <MatchCard
        key={currentUserToDisplay.id} 
        user={currentUserToDisplay}
        onLike={handleLike}
        onPass={handlePass}
      />
      <div className="flex gap-2 mt-4">
        <Button onClick={handleUndo} variant="outline" disabled={previousIndex === null}>
          <Undo2 className="mr-2 h-4 w-4" /> Undo
        </Button>
        <Button onClick={refreshUsers} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Likes remaining today:{" "}
        <span
          key={likesAnimationTrigger}
          className="font-semibold text-foreground animate-flash-attention"
        >
          {Math.max(0, DAILY_LIKE_LIMIT - likesUsedToday)}
        </span>
      </p>

      <AlertDialog open={showMatchAnimation} onOpenChange={setShowMatchAnimation}>
        <AlertDialogContent className="bg-card text-card-foreground border-primary shadow-lg rounded-xl">
          {showMatchAnimation && windowSize.width > 0 && windowSize.height > 0 && (
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
          <AlertDialogHeader>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary mb-4 animate-pulse">
              <HeartHandshakeIcon className="h-10 w-10 text-primary-foreground" />
            </div>
            <AlertDialogTitle className="text-center text-2xl font-bold text-primary">Connection Sparked!</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-muted-foreground text-lg">
              You and {matchedUserName} both liked each other!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-2">
             <AlertDialogCancel 
              className="w-full sm:w-auto"
              onClick={() => setShowMatchAnimation(false)}
            >
              Keep Exploring
            </AlertDialogCancel>
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
              Send a Message
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CrossdPlusUpsellDialog
        isOpen={showUpsellDialog}
        onOpenChange={setShowUpsellDialog}
      />
    </div>
  );
}
