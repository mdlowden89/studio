
"use client";

import { useState, useEffect, useCallback } from "react";
import type { UserProfile } from "@/lib/types";
import { MatchCard } from "@/components/dashboard/match-card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Users, Undo2, HeartHandshake as HeartHandshakeIcon, Sparkles as SparklesIcon, Loader2 } from "lucide-react";
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { fetchSparkSwipeInsights, getUsersForSwiping } from "@/app/actions";
import type { SparkSwipeOutput, SparkSwipeInput } from "@/ai/flows/spark-swipe-flow";
import { CrossdPlusUpsellDialog } from "@/components/pricing/crossd-plus-upsell-dialog";
import { useAuth } from "@/hooks/use-auth";

const DAILY_SPARK_LIMIT = 1;

export function SparkSwipeSection() {
  const { userProfile: currentUser } = useAuth();
  const [sparkUsers, setSparkUsers] = useState<UserProfile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const { toast } = useToast();
  const [showMatchAnimation, setShowMatchAnimation] = useState(false);
  const [matchedUserName, setMatchedUserName] = useState("");
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const [insights, setInsights] = useState<SparkSwipeOutput | null>(null);
  const [isInsightsLoading, setIsInsightsLoading] = useState(false);

  const [sparksUsedToday, setSparksUsedToday] = useState(0);
  const [showUpsellDialog, setShowUpsellDialog] = useState(false);
  const [sparksAnimationTrigger, setSparksAnimationTrigger] = useState(0);


  const loadSparkUsers = useCallback(async () => {
    if (!currentUser) {
        setIsLoading(false);
        return;
    }
    setIsLoading(true);

    const currentUserPromptIds = new Set(currentUser.prompts.map(p => p.promptId));

    if (currentUserPromptIds.size === 0) {
      setSparkUsers([]);
      setIsLoading(false);
      toast({
        title: "Answer Some Prompts!",
        description: "To find Spark Matches, answer some profile prompts first.",
        variant: "default",
      });
      return;
    }

    try {
      const allUsers = await getUsersForSwiping(currentUser.id);
      
      const potentialMatches = allUsers.filter(user => {
        return user.prompts.some(p => currentUserPromptIds.has(p.promptId));
      });

      setSparkUsers([...potentialMatches].sort(() => 0.5 - Math.random()));
      setCurrentIndex(0);
      setPreviousIndex(null);
      
      if (potentialMatches.length === 0) {
        toast({
          title: "No Spark Matches Found",
          description: "We couldn't find users who answered similar prompts right now. Try refreshing later or broadening your profile!",
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Error loading spark users:", error);
       toast({
        title: "Error",
        description: "Could not load Spark Matches. Please try again later.",
        variant: "destructive",
      });
    } finally {
        setIsLoading(false);
    }
  }, [currentUser, toast]);

  useEffect(() => {
    loadSparkUsers();
  }, [loadSparkUsers]);
  
  useEffect(() => {
    if (currentUser && sparkUsers.length > 0 && currentIndex < sparkUsers.length) {
      const candidateUser = sparkUsers[currentIndex];

      const getInsights = async () => {
        setIsInsightsLoading(true);
        setInsights(null);
        try {
          const input: SparkSwipeInput = {
            currentUserProfile: {
              id: currentUser.id,
              name: currentUser.name,
              age: currentUser.age,
              bio: currentUser.bio,
              vibeTags: currentUser.vibeTags,
              locationPatterns: currentUser.locationPatterns,
              prompts: currentUser.prompts,
            },
            candidateUserProfile: {
              id: candidateUser.id,
              name: candidateUser.name,
              age: candidateUser.age,
              bio: candidateUser.bio,
              vibeTags: candidateUser.vibeTags,
              locationPatterns: candidateUser.locationPatterns,
              prompts: candidateUser.prompts,
            },
          };
          const result = await fetchSparkSwipeInsights(input);
          setInsights(result);
        } catch (error) {
          console.error("Failed to fetch insights", error);
          toast({
            title: "Could not load Spark Insights",
            description: "There was an error getting AI insights for this match.",
            variant: "destructive",
          });
        } finally {
          setIsInsightsLoading(false);
        }
      };
      
      getInsights();
    }
  }, [currentIndex, sparkUsers, toast, currentUser]);

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
    if (sparksUsedToday >= DAILY_SPARK_LIMIT) {
      setShowUpsellDialog(true);
      return;
    }

    const actionUser = sparkUsers.find(u => u.id === userId);
    if (!actionUser) return;

    if (action === "like") {
      const isMutualMatch = Math.random() < 0.5;
      if (isMutualMatch) {
        setMatchedUserName(actionUser.name.split(' ')[0]);
        setShowMatchAnimation(true);
      } else {
        toast({
          title: "Spark Sent!",
          description: `You've shown interest in ${actionUser.name.split(' ')[0]}. Let's see if the spark is mutual!`,
        });
      }
    } else {
      toast({
        title: "Passed",
        description: `You've passed on ${actionUser.name.split(' ')[0]}.`,
        variant: "default",
      });
    }
    
    setSparksUsedToday(prev => prev + 1);
    setSparksAnimationTrigger(prev => prev + 1);
    setPreviousIndex(currentIndex);

    if (currentIndex < sparkUsers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast({
        title: "That's all Spark Matches for now!",
        description: "Check back later or refresh for new recommendations.",
      });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleLike = (userId: string) => handleAction(userId, "like");
  const handlePass = (userId: string) => handleAction(userId, "pass");

  const handleUndo = () => {
    if (previousIndex !== null && previousIndex < sparkUsers.length) {
      const lastUser = sparkUsers[previousIndex];
      setCurrentIndex(previousIndex);
      setPreviousIndex(null);
      if (sparksUsedToday > 0) {
        setSparksUsedToday(prev => prev - 1);
      }
      toast({ title: "Undo Successful", description: `Viewing ${lastUser?.name.split(' ')[0]}'s profile again.` });
    } else {
      toast({ title: "Nothing to Undo", description: "No previous Spark profile to go back to.", variant: "destructive" });
    }
  };

  const refreshUsers = () => {
    toast({ title: "Refreshing Spark Matches...", description: "Finding new prompt-based connections." });
    loadSparkUsers();
  };

  if (isLoading || !currentUser) {
    return (
      <Card className="bg-card shadow-xl">
        <CardHeader className="text-center">
          <SparklesIcon className="w-12 h-12 text-primary mx-auto mb-3 animate-pulse" />
          <CardTitle className="text-2xl font-semibold">Igniting Sparks...</CardTitle>
          <CardDescription className="text-muted-foreground">
            Finding profiles based on your shared prompt interests.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
          <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Loading potential connections...</p>
        </CardContent>
      </Card>
    );
  }

  if (sparkUsers.length === 0 || currentIndex >= sparkUsers.length) {
    return (
      <Card className="bg-card shadow-xl">
        <CardHeader className="text-center">
          <SparklesIcon className="w-12 h-12 text-primary mx-auto mb-3" />
          <CardTitle className="text-2xl font-semibold">No Spark Matches Right Now</CardTitle>
          <CardDescription className="text-muted-foreground">
            We couldn't find anyone with similar prompt answers, or you've seen them all.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-10 flex flex-col items-center">
          <Users className="w-16 h-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4 max-w-md">
            Try answering more profile prompts, or check back later. New connections are always sparking!
          </p>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleUndo} variant="outline" disabled={previousIndex === null}>
              <Undo2 className="mr-2 h-4 w-4" /> Undo
            </Button>
            <Button onClick={refreshUsers} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh Sparks
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentUserToDisplay = sparkUsers[currentIndex];

  return (
    <div className="flex flex-col items-center space-y-6">
      <Card className="w-full max-w-md mx-auto bg-transparent border-none shadow-none mb-2">
        <CardHeader className="text-center px-0 pt-0 pb-3">
          <SparklesIcon className="w-8 h-8 text-primary mx-auto mb-1 animate-pulse" />
          <CardTitle className="text-xl font-semibold">Spark Swipe</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Swipe with meaning. Match through mood, movement, and mutual energy.
          </CardDescription>
        </CardHeader>
      </Card>

      <MatchCard
        key={currentUserToDisplay.id}
        user={currentUserToDisplay}
        onLike={handleLike}
        onPass={handlePass}
        sparkInsights={insights}
        isInsightsLoading={isInsightsLoading}
      />
      <div className="flex gap-2 mt-4">
        <Button onClick={handleUndo} variant="outline" disabled={previousIndex === null || isInsightsLoading}>
          <Undo2 className="mr-2 h-4 w-4" /> Undo
        </Button>
        <Button onClick={refreshUsers} variant="outline" disabled={isInsightsLoading}>
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh Sparks
        </Button>
      </div>

       <p className="text-sm text-muted-foreground mt-2">
        Free Spark Swipes remaining today:{" "}
        <span
          key={sparksAnimationTrigger}
          className="font-semibold text-foreground animate-flash-attention"
        >
          {Math.max(0, DAILY_SPARK_LIMIT - sparksUsedToday)}
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
            <AlertDialogTitle className="text-center text-2xl font-bold text-primary">Mutual Spark!</AlertDialogTitle>
            <AlertDialogDescription className="text-center text-muted-foreground text-lg">
              You and {matchedUserName} both liked each other! This connection sparked from shared interests.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-2">
            <AlertDialogCancel
              className="w-full sm:w-auto"
              onClick={() => setShowMatchAnimation(false)}
            >
              Keep Swiping
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowMatchAnimation(false);
                toast({
                  title: `Chat with ${matchedUserName}!`,
                  description: "Your shared interests made a spark!",
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
