
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { fetchSparkSwipeInsights, getUsersForSwiping, recordLike } from "@/app/actions";
import type { SparkSwipeOutput, SparkSwipeInput } from "@/ai/flows/spark-swipe-flow";
import { CrossdPlusUpsellDialog } from "@/components/pricing/crossd-plus-upsell-dialog";
import { useAuth } from "@/hooks/use-auth";
import { AVAILABLE_PROMPTS } from "@/lib/mock-data";
import { sortUsersByMbti, type MbtiFilterType } from "@/lib/mbti-utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BrainCircuit, Filter } from "lucide-react";

const DAILY_SPARK_LIMIT = 1;

const filterOptions: { value: MbtiFilterType; label: string; description: string }[] = [
    { value: 'all', label: 'All Personalities', description: 'Show everyone.' },
    { value: 'best', label: 'Best Match for Me', description: 'Based on type compatibility.' },
    { value: 'challenge', label: 'Most Likely to Challenge Me', description: 'Personalities that foster growth.' },
    { value: 'values', label: 'Shared Core Values', description: 'Connect with similar temperaments.' },
    { value: 'opposites', label: 'Opposites Who Attract', description: 'Explore contrasting personalities.' },
];

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

  const [activeFilter, setActiveFilter] = useState<MbtiFilterType>('all');


  const loadSparkUsers = useCallback(async () => {
    if (!currentUser) {
        setIsLoading(false);
        return;
    }
    setIsLoading(true);
    setSparkUsers([]);

    try {
      const allUsers = await getUsersForSwiping(currentUser.id);
      
      const sortedUsers = sortUsersByMbti(allUsers, currentUser, activeFilter);

      setSparkUsers(sortedUsers);
      setCurrentIndex(0);
      setPreviousIndex(null);
      
      if (sortedUsers.length === 0) {
        toast({
          title: "No Spark Matches Found",
          description: "We couldn't find anyone matching your filter. Try another one!",
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
  }, [currentUser, toast, activeFilter]);

  useEffect(() => {
    loadSparkUsers();
  }, [loadSparkUsers, activeFilter]);
  
  useEffect(() => {
    if (currentUser && sparkUsers.length > 0 && currentIndex < sparkUsers.length) {
      const candidateUser = sparkUsers[currentIndex];

      const getInsights = async () => {
        setIsInsightsLoading(true);
        setInsights(null);
        try {
          // Helper function to map prompts to include the question text
          const mapPrompts = (prompts: any[] = []) => {
            return prompts.map(p => {
                const promptDetails = AVAILABLE_PROMPTS.find(ap => ap.id === p.promptId);
                return {
                    ...p,
                    question: promptDetails?.question || 'A prompt',
                };
            }).filter(p => p.answer.trim() !== '');
          };

          const input: SparkSwipeInput = {
            currentUserProfile: {
              id: currentUser.id,
              name: currentUser.name,
              age: currentUser.age,
              bio: currentUser.bio,
              vibeTags: currentUser.vibeTags,
              locationPatterns: currentUser.locationPatterns,
              prompts: mapPrompts(currentUser.prompts),
            },
            candidateUserProfile: {
              id: candidateUser.id,
              name: candidateUser.name,
              age: candidateUser.age,
              bio: candidateUser.bio,
              vibeTags: candidateUser.vibeTags,
              locationPatterns: candidateUser.locationPatterns,
              prompts: mapPrompts(candidateUser.prompts),
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

  const handleAction = async (userId: string, action: "like" | "pass") => {
    if (!currentUser) return;
    if (sparksUsedToday >= DAILY_SPARK_LIMIT) {
      setShowUpsellDialog(true);
      return;
    }

    const actionUser = sparkUsers.find(u => u.id === userId);
    if (!actionUser) return;
    
    try {
        if (action === "like") {
            const result = await recordLike(currentUser.id, actionUser.id);
            if (result.match) {
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
    } catch (error) {
        console.error("Error during swipe action:", error);
        toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
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

  if (!currentUser) {
    return (
      <Card className="bg-card shadow-xl">
        <CardHeader className="text-center">
          <Loader2 className="w-12 h-12 text-primary mx-auto mb-3 animate-spin" />
          <CardTitle className="text-2xl font-semibold">Loading User...</CardTitle>
        </CardHeader>
      </Card>
    );
  }
  
  if (!currentUser.mbtiType) {
    return (
        <Card className="bg-card shadow-xl">
          <CardHeader className="text-center">
            <BrainCircuit className="w-12 h-12 text-primary mx-auto mb-3" />
            <CardTitle className="text-2xl font-semibold">Unlock Your Spark Feed</CardTitle>
            <CardDescription className="text-muted-foreground">
              To use personality-based matching, please take our MBTI quiz first.
            </CardDescription>
          </CardHeader>
           <CardFooter>
                <Button asChild className="w-full">
                    <Link href="/mbti-quiz">
                        Take the Personality Quiz
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
  }

  const renderContent = () => {
     if (isLoading) {
      return (
        <Card className="bg-card shadow-xl border-none bg-transparent">
          <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
            <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading potential connections...</p>
          </CardContent>
        </Card>
      );
    }
    
    if (sparkUsers.length === 0 || currentIndex >= sparkUsers.length) {
      return (
        <Card className="bg-card shadow-xl border-none bg-transparent">
          <CardContent className="text-center py-10 flex flex-col items-center min-h-[300px] justify-center">
            <Users className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Profiles Found</h3>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Try adjusting your filter or check back later for new people.
            </p>
            <div className="flex gap-2 mt-4">
              <Button onClick={refreshUsers} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    const currentUserToDisplay = sparkUsers[currentIndex];
    
    return (
      <div className="flex flex-col items-center space-y-6">
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
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <Card className="w-full max-w-md mx-auto bg-transparent border-none shadow-none mb-2">
        <CardHeader className="text-center px-0 pt-0 pb-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <SparklesIcon className="w-8 h-8 text-primary mx-auto animate-pulse" />
            <CardTitle className="text-xl font-semibold">Spark Swipe</CardTitle>
          </div>
          <CardDescription className="text-muted-foreground text-sm">
            Filter your feed by personality compatibility.
          </CardDescription>
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="mt-2 w-full max-w-xs mx-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    <span>Sort by: {filterOptions.find(f => f.value === activeFilter)?.label}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
                <DropdownMenuLabel>Personality Filters</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {filterOptions.map(opt => (
                     <DropdownMenuItem key={opt.value} onSelect={() => setActiveFilter(opt.value)} className="flex flex-col items-start gap-0.5">
                        <span className="font-semibold">{opt.label}</span>
                        <span className="text-xs text-muted-foreground">{opt.description}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
            </DropdownMenu>
        </CardHeader>
      </Card>
      
      {renderContent()}

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
