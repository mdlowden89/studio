
"use client";

import { useState, useEffect } from "react";
import { MOCK_CROSSED_PATHS_USERS } from "@/lib/mock-data";
import { MatchCard } from "./match-card";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertTriangle, HeartHandshake as HeartHandshakeIcon } from "lucide-react"; // Updated import
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

export function CrossedPathsSection() {
  const [users, setUsers] = useState(MOCK_CROSSED_PATHS_USERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { toast } = useToast();
  const [showMatchAnimation, setShowMatchAnimation] = useState(false);
  const [matchedUserName, setMatchedUserName] = useState("");
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

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
      const isMutualMatch = Math.random() < 0.33;
      if (isMutualMatch) {
        setMatchedUserName(actionUser.name);
        setShowMatchAnimation(true);
      } else {
         toast({
            title: "Interest Sent!",
            description: `You've expressed interest in ${actionUser.name}. If they feel the same, it's a match!`,
        });
      }
    } else {
        toast({
            title: "Passed",
            description: `You've passed on ${actionUser.name}.`,
            variant: "default",
        });
    }
    
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast({
        title: "All caught up!",
        description: "You've seen all recent crossed paths.",
      });
    }
  };

  const handleLike = (userId: string) => handleAction(userId, "like");
  const handlePass = (userId: string) => handleAction(userId, "pass");

  const refreshUsers = () => {
    setUsers([...MOCK_CROSSED_PATHS_USERS].sort(() => Math.random() - 0.5)); // Shuffle for demo
    setCurrentIndex(0);
    toast({ title: "Refreshed!", description: "Showing new potential connections."});
  };

  if (users.length === 0 || currentIndex >= users.length) {
    return (
      <div className="text-center py-10 flex flex-col items-center">
        <AlertTriangle className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No Recent Crossings</h3>
        <p className="text-muted-foreground mb-4">Keep exploring, and we'll notify you of new crossed paths.</p>
        <Button onClick={refreshUsers}>
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
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
        showCrossedPathInfo={true}
      />
      <Button onClick={refreshUsers} variant="outline" className="mt-4">
        <RefreshCw className="mr-2 h-4 w-4" /> Load More
      </Button>

       <AlertDialog open={showMatchAnimation} onOpenChange={setShowMatchAnimation}>
        <AlertDialogContent className="bg-card text-card-foreground border-primary shadow-lg rounded-xl">
          {showMatchAnimation && windowSize.width > 0 && windowSize.height > 0 && (
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999 }}>
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
              You and {matchedUserName} have both shown interest in each other!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-2">
            <AlertDialogCancel 
              onClick={() => setShowMatchAnimation(false)}
              className="w-full sm:w-auto"
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
    </div>
  );
}
