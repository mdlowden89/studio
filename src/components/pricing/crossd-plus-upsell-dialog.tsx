
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, InfinityIcon, Eye, Rocket, Zap, Star, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { loadStripe } from '@stripe/stripe-js';

interface CrossdPlusUpsellDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const features = [
  { icon: InfinityIcon, text: "Unlimited Likes", description: "Swipe right as much as you want." },
  { icon: Eye, text: "See Who Likes You", description: "Instantly match with people who've already shown interest." },
  { icon: Rocket, text: "VIP Profile", description: "Get your profile seen by more people, faster." },
  { icon: Zap, text: "Priority Likes", description: "Your likes get shown to potential matches sooner." },
];

const pricingTiers = [
  { id: "weekly", name: "Weekly", price: "£6.99", popular: false, bestValue: false, stripePriceId: "price_placeholder_weekly" },
  { id: "monthly", name: "1 Month", price: "£9.99", originalPrice: "£12.99", popular: false, bestValue: false, save: "Save £3.00", stripePriceId: "price_1RZv4hHKQz8P5Ogk1OQmW0E9" },
  { id: "quarterly", name: "3 Months", price: "£29.99", originalPrice: "£38.97", popular: true, bestValue: false, save: "Save £8.98", stripePriceId: "price_placeholder_quarterly" },
  { id: "annual", name: "12 Months", price: "£89.99", originalPrice: "£155.88", popular: false, bestValue: true, save: "Save £65.89", stripePriceId: "price_placeholder_annual" },
];

// Initialize Stripe.js outside the component
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function CrossdPlusUpsellDialog({ isOpen, onOpenChange }: CrossdPlusUpsellDialogProps) {
  const { toast } = useToast();
  const router = useRouter(); // Initialize useRouter
  const [selectedTierId, setSelectedTierId] = useState<string | null>(pricingTiers.find(t => t.popular)?.id || pricingTiers[2].id);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!selectedTierId) {
      toast({ title: "Selection Error", description: "Please select a subscription tier.", variant: "destructive" });
      return;
    }

    const selectedTier = pricingTiers.find(t => t.id === selectedTierId);
    if (!selectedTier || !selectedTier.stripePriceId || selectedTier.stripePriceId.includes('placeholder')) {
      toast({
        title: "Configuration Error",
        description: "Stripe Price ID is not configured for this tier. Please replace placeholders.",
        variant: "destructive",
      });
      console.error("Stripe Price ID is a placeholder or missing for tier:", selectedTier?.name);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId: selectedTier.stripePriceId }),
      });

      const sessionData = await response.json();

      if (!response.ok || !sessionData.sessionId) {
        toast({
          title: "Session Error",
          description: sessionData.error || 'Failed to create checkout session.',
          variant: "destructive",
        });
        setIsLoading(false); // Reset loading on API error
        return;
      }

      // Close the dialog
      onOpenChange(false);

      // Redirect to an intermediate page that will handle the Stripe redirect
      router.push(`/payment/initiate-stripe-redirect?sessionId=${sessionData.sessionId}`);
      // setIsLoading(false) will be handled by page navigation or if error occurs above

    } catch (error: any) {
      console.error("Subscription process error:", error);
      toast({
        title: "Subscription Error",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false); // Reset loading on general error
    }
    // Note: setIsLoading(false) might not be hit here if router.push successfully navigates away.
    // If the push fails or if there's an error above, it should be reset.
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!isLoading) onOpenChange(open); }}>
      <DialogContent id="dialog-content-id" className="sm:max-w-lg bg-card text-card-foreground border-primary shadow-2xl p-0">
        <DialogHeader className="p-6 pb-4 text-center">
          <Star className="h-12 w-12 text-primary mx-auto mb-3 animate-pulse" />
          <DialogTitle className="text-3xl font-bold text-primary">Unlock Crossd+</DialogTitle>
          <DialogDescription className="text-muted-foreground text-md mt-1">
            Choose a plan to get unlimited access and premium features!
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">With Crossd+, you get:</h3>
            <ul className="space-y-2.5">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <feature.icon className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground/90">{feature.text}</span>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2">
            <h3 className="text-lg font-semibold text-foreground mb-3 text-center">Choose Your Plan:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pricingTiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTierId(tier.id)}
                  disabled={isLoading}
                  className={cn(
                    "p-4 border rounded-lg text-left transition-all duration-200 relative overflow-hidden",
                    selectedTierId === tier.id ? "border-primary ring-2 ring-primary bg-primary/10 shadow-lg" : "border-border hover:border-primary/70 hover:bg-muted/50",
                    tier.popular || tier.bestValue ? "border-primary" : "",
                    isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                  )}
                >
                  {(tier.popular || tier.bestValue) && (
                    <Badge
                      variant={tier.popular ? "default" : "secondary"}
                      className={cn(
                        "absolute top-2 right-2 text-xs px-2 py-0.5",
                        tier.popular ? "bg-primary text-primary-foreground" : "bg-yellow-500 text-black"
                      )}
                    >
                      {tier.popular ? "Most Popular" : "Best Value"}
                    </Badge>
                  )}
                  <h4 className="text-md font-semibold text-foreground">{tier.name}</h4>
                  <p className="text-2xl font-bold text-primary mt-1">{tier.price}
                    {tier.originalPrice && <span className="text-xs text-muted-foreground line-through ml-1.5"> {tier.originalPrice}</span>}
                  </p>
                  {tier.id !== "weekly" && <p className="text-xs text-muted-foreground mt-0.5">{tier.id === "monthly" ? "per month" : `billed ${tier.id === "quarterly" ? "every 3 months" : "annually"}`}</p>}
                  {tier.save && <p className="text-xs text-green-500 font-medium mt-1">{tier.save}</p>}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Remember to replace placeholder Stripe Price IDs in the code with your actual IDs from Stripe.
            </p>
          </div>
        </div>

        <DialogFooter className="p-6 pt-4 border-t border-border flex flex-col sm:flex-row gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto" disabled={isLoading}>Maybe Later</Button>
          </DialogClose>
          <Button
            onClick={handleSubscribe}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!selectedTierId || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Upgrade to Crossd+"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
