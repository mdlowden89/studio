
"use client";

import { useState, useEffect, useCallback } from "react";
import type { UserProfile } from "@/lib/types";
import { MatchCard } from "./match-card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Users, Undo2, HeartHandshake as HeartHandshakeIcon, Loader2, Filter } from "lucide-react";
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
import { getUsersForSwiping, recordLike } from "@/app/actions";
import { DiscoverFilters, type AppliedFilters } from "@/components/discover/discover-filters";
import { AnimatePresence, motion } from "framer-motion";

const DAILY_LIKE_LIMIT = 8;

const defaultFilters: AppliedFilters = {
  ageRange: [18, 40],
  heightRange: [54, 84], // 4'6" to 7'0"
  datingIntentions: 'any',
  ethnicity: 'any',
  religion: 'any',
  relationshipType: 'any',
};

export function SwipeMatchSection() {
  const { user, userProfile } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const { toast } = useToast();
  const [showMatchAnimation, setShowMatchAnimation] = useState(false);
  const [matchedUserName, setMatchedUserName] = useState("");
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const [likesUsedToday, setLikesUsedToday] = useState(0);
  const [showUpsellDialog, setShowUpsellDialog] = useState(false);
  const [likesAnimationTrigger, setLikesAnimationTrigger] = useState(0);
  
  const [filters, setFilters] = useState<AppliedFilters>(defaultFilters);

  const isPremium = userProfile?.subscription?.status === 'active' || userProfile?.email === 'mlowdencrossd@gmail.com';

  const loadUsers = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const fetchedUsers = await getUsersForSwiping(user.uid, filters);
      setUsers(fetchedUsers);
      if (fetchedUsers.length === 0) {
        toast({
          title: "No one new matches your filters",
          description: "Try broadening your search or check back later!",
        });
      }
    } catch (error) {
      console.error("Failed to fetch users for swiping:", error);
    } finally {
      setCurrentIndex(0);
      setPreviousIndex(null);
      setIsLoading(false);
    }
  }, [user, toast, filters]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

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

  const handleApplyFilters = (newFilters: AppliedFilters) => {
    setFilters(newFilters);
    // The `loadUsers` effect will automatically run because `filters` is a dependency.
     toast({
        title: "Filters Applied",
        description: "Searching for profiles with your new preferences.",
      });
  };
  
  const handleResetFilters = () => {
      setFilters(defaultFilters);
      toast({
          title: "Filters Reset",
          description: "Showing all profiles again.",
        });
  }

  const handleAction = async (userId: string, action: "like" | "pass") => {
    const actionUser = users.find(u => u.id === userId);
    if (!actionUser || !user) return;

    if (action === "like") {
      if (likesUsedToday >= DAILY_LIKE_LIMIT && !isPremium) {
        setShowUpsellDialog(true);
        return;
      }
      
      if (!isPremium) {
        setLikesUsedToday(prev => prev + 1);
        setLikesAnimationTrigger(prev => prev + 1); // Trigger animation
      }
      
      try {
        const result = await recordLike(user.uid, actionUser.id);
        
        if (result.match) {
          setMatchedUserName(actionUser.name);
          setShowMatchAnimation(true);
        } else {
          toast({
            title: "Liked!",
            description: `Let's see if ${actionUser.name} likes you back! ${!isPremium ? `(${DAILY_LIKE_LIMIT - (likesUsedToday + 1)} likes remaining today)` : ''}`,
          });
        }
      } catch (error) {
        console.error("Error recording like:", error);
        toast({ title: "Error", description: "Could not record your like. Please try again.", variant: "destructive" });
        if (!isPremium) {
            setLikesUsedToday(prev => prev - 1); // Revert optimistic update
        }
        return; // Don't advance to the next user on error
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
      // Move to a state where no users are left
      setCurrentIndex(users.length);
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
    toast({ title: "Refreshing...", description: "Looking for new profiles."});
    loadUsers();
  };

  if (isLoading) {
    return (
      <div className="text-center py-10 flex flex-col items-center">
        <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
        <h3 className="text-xl font-semibold mb-2">Finding People Nearby...</h3>
      </div>
    );
  }
  
  if (users.length === 0 || currentIndex >= users.length) {
    return (
      <div className="text-center py-10 flex flex-col items-center">
        <Users className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No More Profiles</h3>
        <p className="text-muted-foreground mb-4 max-w-sm">You've seen everyone who matches your current filters. Try expanding your search or check back later.</p>
        <div className="flex gap-2 mt-4">
            <DiscoverFilters onApplyFilters={handleApplyFilters} onResetFilters={handleResetFilters} initialFilters={defaultFilters} />
            <Button onClick={refreshUsers} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh Profiles
            </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative w-full max-w-sm h-[720px] animate-fade-in-up">
        <AnimatePresence>
            {users.slice(currentIndex, currentIndex + 2).reverse().map((user, index) => (
                <motion.div
                    key={user.id}
                    className="absolute w-full h-full"
                    initial={{ scale: 0.95, y: 20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ x: 300, opacity: 0, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{
                        zIndex: users.length - currentIndex - index,
                        transform: `scale(${1 - index * 0.05}) translateY(${index * -15}px)`,
                    }}
                >
                    <MatchCard
                        user={user}
                        onLike={index === 1 ? handleLike : undefined}
                        onPass={index === 1 ? handlePass : undefined}
                        isBack={index < 1}
                    />
                </motion.div>
            ))}
        </AnimatePresence>
      </div>

      <div className="flex gap-2 mt-2">
        <Button onClick={handleUndo} variant="outline" disabled={previousIndex === null}>
          <Undo2 className="mr-2 h-4 w-4" /> Undo
        </Button>
        <DiscoverFilters onApplyFilters={handleApplyFilters} onResetFilters={handleResetFilters} initialFilters={filters} />
      </div>
      {!isPremium && (
        <p className="text-sm text-muted-foreground">
          Likes remaining today:{" "}
          <span
            key={likesAnimationTrigger}
            className="font-semibold text-foreground animate-flash-attention"
          >
            {Math.max(0, DAILY_LIKE_LIMIT - likesUsedToday)}
          </span>
        </p>
      )}

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
