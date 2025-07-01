"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X as XIcon, Zap, Sparkles, Star, Loader2, InfinityIcon, Eye, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CrossdLogoIcon } from "@/components/icons/crossd-logo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FreeBoostUpsellDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const STRIPE_PLATINUM_WEEKLY_BOOST_PRICE_ID = process.env.NEXT_PUBLIC_STRIPE_PLATINUM_WEEKLY_BOOST_PRICE_ID || "";

const formatTime = (totalSeconds: number): string => {
  if (totalSeconds < 0) return "00:00:00";
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export function FreeBoostUpsellDialog({ isOpen, onOpenChange }: FreeBoostUpsellDialogProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const initialDuration = 23 * 3600 + 59 * 60 + 56; // 23:59:56
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isOpen && isClient) {
      // Reset timer if it had run out and dialog is reopened
      if (timeLeft <= 0) {
        setTimeLeft(initialDuration);
      }
      
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerId);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [isOpen, isClient]);

  const handleSubscribe = async () => {
    if (!STRIPE_PLATINUM_WEEKLY_BOOST_PRICE_ID) {
      toast({
        title: "Configuration Error",
        description: "The Stripe Price ID for the boost offer is not configured. Please add it to your .env file.",
        variant: "destructive",
      });
      console.error("Stripe Price ID is missing for tier: Platinum Weekly Boost");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: STRIPE_PLATINUM_WEEKLY_BOOST_PRICE_ID }),
      });

      const sessionData = await response.json();

      if (!response.ok || !sessionData.sessionId) {
        toast({
          title: "Session Error",
          description: sessionData.error || 'Failed to create Stripe checkout session.',
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      onOpenChange(false);
      router.push(`/payment/initiate-stripe-redirect?sessionId=${sessionData.sessionId}`);

    } catch (error: any) {
      console.error("Subscription process error:", error);
      toast({
        title: "Subscription Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  
  const displayedTime = isClient ? formatTime(timeLeft) : formatTime(initialDuration);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!isLoading) onOpenChange(open); }}>
      <DialogContent className="sm:max-w-md bg-card text-card-foreground p-0 overflow-hidden shadow-2xl border-primary/30">
        <DialogHeader className="flex flex-row items-center justify-between p-4 border-b border-border sticky top-0 bg-card z-10">
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <XIcon className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
          <DialogTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Get a Free Boost
          </DialogTitle>
          <div className="w-8" />
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)]">
          <div className="p-6 pt-4 space-y-6 text-center">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto my-4">
              <Sparkles className="absolute -top-2 -left-2 h-5 w-5 sm:h-6 sm:w-6 text-primary animate-pulse opacity-70" style={{ transform: 'rotate(-25deg)' }} />
              <Sparkles className="absolute -top-1 -right-3 h-6 w-6 sm:h-7 sm:w-7 text-primary animate-pulse opacity-80 delay-100" style={{ transform: 'rotate(20deg)' }} />
              
              <div className="w-full h-full mx-auto border-4 border-primary/80 shadow-xl rounded-full bg-card flex items-center justify-center">
                <CrossdLogoIcon className="w-20 h-20 sm:w-24 sm:h-24 text-primary" />
              </div>

              <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-1.5 shadow-md border-2 border-card">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              <Sparkles className="absolute -bottom-3 -left-3 h-4 w-4 sm:h-5 sm:w-5 text-primary animate-pulse opacity-60 delay-200" style={{ transform: 'rotate(15deg)' }} />
              <Sparkles className="absolute bottom-1/4 right-0 h-3 w-3 text-primary/70 animate-ping" />
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
              Upgrade to Platinum, get a free one-time Boost!
            </h2>

            <div className="bg-primary text-primary-foreground p-3 rounded-lg flex items-center justify-between shadow-md text-sm sm:text-base">
              <span className="font-semibold">1 Free Boost on us!</span>
              <Zap className="h-5 w-5" />
            </div>

            <div className="py-2">
              <div className="inline-block px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full mb-4">
                What&apos;s included
              </div>
              <div className="space-y-2.5 text-left">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md text-sm cursor-help">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                          <span className="font-medium text-foreground">Crossd+ Platinum</span>
                        </div>
                        <span className="font-semibold text-foreground">£19.99/wk</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-popover text-popover-foreground border-border shadow-md">
                      <p className="font-semibold mb-2 text-primary">Platinum Features:</p>
                      <ul className="space-y-1.5 text-xs">
                        <li className="flex items-center gap-2"><InfinityIcon className="h-4 w-4 text-muted-foreground" /> Unlimited Likes</li>
                        <li className="flex items-center gap-2"><Eye className="h-4 w-4 text-muted-foreground" /> See Who Likes You</li>
                        <li className="flex items-center gap-2"><Rocket className="h-4 w-4 text-muted-foreground" /> VIP Profile</li>
                        <li className="flex items-center gap-2"><Zap className="h-4 w-4 text-muted-foreground" /> Priority Likes</li>
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-md text-sm">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">1 Boost</span>
                  </div>
                  <span className="font-semibold text-green-400">Free</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground px-1 sm:px-2 leading-relaxed">
              By tapping &quot;Continue&quot;, you will be charged, your subscription will auto-renew for the same price and package length until you cancel via App Store settings, and you agree to our <Link href="/terms" className="underline hover:text-primary">Terms</Link>.
            </p>
            <div className={cn(
                "text-base sm:text-lg font-medium text-foreground",
                timeLeft <= 0 && "text-destructive"
              )}
            >
              Offer ends in <span className={cn("text-primary tabular-nums", timeLeft <= 0 && "text-destructive")}>{displayedTime}</span>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="p-4 border-t border-border sticky bottom-0 bg-card z-10">
          <Button
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg py-3 h-auto"
            onClick={handleSubscribe}
            disabled={isLoading || timeLeft <= 0}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              "Continue – £19.99 total"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
