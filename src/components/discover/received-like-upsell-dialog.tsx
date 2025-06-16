
"use client";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Heart } from "lucide-react";

interface ReceivedLikeUpsellDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onUpgrade: () => void;
}

export function ReceivedLikeUpsellDialog({
  isOpen,
  onOpenChange,
  onUpgrade,
}: ReceivedLikeUpsellDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm bg-card text-card-foreground p-0 overflow-hidden shadow-2xl border-border">
        <div className="relative p-8 pt-10 flex flex-col items-center text-center space-y-4">
          {/* Sparkles for decoration */}
          <Sparkles className="absolute top-4 left-8 h-6 w-6 text-yellow-400 opacity-70 animate-pulse" />
          <Sparkles className="absolute top-6 right-6 h-5 w-5 text-yellow-300 opacity-60 animate-pulse delay-200" style={{ transform: 'rotate(20deg)'}}/>
          <Sparkles className="absolute top-16 left-4 h-4 w-4 text-yellow-400 opacity-50 animate-pulse delay-500" style={{ transform: 'rotate(-15deg)'}}/>
          <Sparkles className="absolute top-20 right-10 h-7 w-7 text-yellow-300 opacity-75 animate-pulse delay-300" />


          <div className="relative w-32 h-32">
            <Avatar className="w-full h-full border-4 border-yellow-400/80 shadow-lg filter blur-sm">
              <AvatarImage src="https://placehold.co/128x128.png?text=?" alt="Blurred Profile" data-ai-hint="blurred profile" />
              <AvatarFallback className="bg-muted"></AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-12 h-12 text-primary fill-primary/70 opacity-80" />
            </div>
             <Sparkles className="absolute -bottom-2 -right-2 h-6 w-6 text-yellow-400" />
          </div>

          <DialogHeader className="space-y-1">
            <DialogTitle className="text-2xl font-bold text-foreground">
              You Received a Like!
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm px-2">
              Don&apos;t keep your match waiting!
              <br />
              Upgrade to <span className="font-semibold text-primary">Crossd+</span> to see them.
            </DialogDescription>
          </DialogHeader>

          <div className="w-full space-y-3 pt-2">
            <Button
              onClick={() => {
                onOpenChange(false); // Close this dialog
                onUpgrade(); // Trigger upgrade flow (open premium dialog)
              }}
              className="w-full bg-yellow-500 hover:bg-yellow-500/90 text-black font-semibold text-lg py-6 rounded-full shadow-md"
            >
              See Who Likes You
            </Button>
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="w-full text-muted-foreground hover:text-foreground py-3"
              >
                Maybe Later
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
