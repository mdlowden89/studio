
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";

interface SparkNudgeDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  nudgeText: string;
  userName: string;
}

export function SparkNudgeDialog({ isOpen, onOpenChange, nudgeText, userName }: SparkNudgeDialogProps) {
  
  const getActionLink = () => {
    if (nudgeText.includes("moment")) {
      return "/log-moment";
    }
    if (nudgeText.includes("Prompt")) {
      return "/profile?tab=prompts";
    }
    return "/discover";
  };

  const getButtonText = () => {
    if (nudgeText.includes("moment")) {
      return "Log a Moment";
    }
    if (nudgeText.includes("Prompt")) {
      return "Answer Prompt";
    }
    return "Start Discovering";
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 mb-4 animate-pulse">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">Hey, {userName}!</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground pt-2 text-base">
            {nudgeText}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Link href={getActionLink()} passHref className="w-full">
            <Button onClick={() => onOpenChange(false)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              {getButtonText()}
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
