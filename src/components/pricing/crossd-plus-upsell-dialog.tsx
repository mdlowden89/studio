
"use client";

import { useState } from "react";
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
import { CheckCircle, InfinityIcon, Eye, Rocket, Zap, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
  { id: "weekly", name: "Weekly", price: "£4.99", popular: false, bestValue: false },
  { id: "monthly", name: "1 Month", price: "£9.99", originalPrice: "£12.99", popular: false, bestValue: false, save: "Save £3.00" },
  { id: "quarterly", name: "3 Months", price: "£29.99", originalPrice: "£38.97", popular: true, bestValue: false, save: "Save £8.98" },
  { id: "biannual", name: "6 Months", price: "£49.99", originalPrice: "£77.94", popular: false, bestValue: true, save: "Save £27.95" },
];

export function CrossdPlusUpsellDialog({ isOpen, onOpenChange }: CrossdPlusUpsellDialogProps) {
  const { toast } = useToast();
  const [selectedTierId, setSelectedTierId] = useState<string | null>(pricingTiers.find(t => t.popular)?.id || pricingTiers[2].id);

  const handleSubscribe = (tierName: string) => {
    toast({
      title: "Subscription Started (Mock)",
      description: `You've subscribed to the ${tierName} Crossd+ plan! Enjoy the perks.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card text-card-foreground border-primary shadow-2xl p-0">
        <DialogHeader className="p-6 pb-4 text-center">
          <Star className="h-12 w-12 text-primary mx-auto mb-3 animate-pulse" />
          <DialogTitle className="text-3xl font-bold text-primary">Unlock Crossd+</DialogTitle>
          <DialogDescription className="text-muted-foreground text-md mt-1">
            You're out of free likes for today! Upgrade to keep connecting.
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
                  className={cn(
                    "p-4 border rounded-lg text-left transition-all duration-200 relative overflow-hidden",
                    selectedTierId === tier.id ? "border-primary ring-2 ring-primary bg-primary/10 shadow-lg" : "border-border hover:border-primary/70 hover:bg-muted/50",
                    tier.popular || tier.bestValue ? "border-primary" : ""
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
                  {tier.id !== "weekly" && <p className="text-xs text-muted-foreground mt-0.5">{tier.id === "monthly" ? "per month" : `billed ${tier.id === "quarterly" ? "every 3 months" : "every 6 months"}`}</p> }
                  {tier.save && <p className="text-xs text-green-500 font-medium mt-1">{tier.save}</p>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-4 border-t border-border flex flex-col sm:flex-row gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="w-full sm:w-auto">Maybe Later</Button>
          </DialogClose>
          <Button
            onClick={() => handleSubscribe(pricingTiers.find(t => t.id === selectedTierId)?.name || "Selected")}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={!selectedTierId}
          >
            Upgrade to Crossd+
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
    
