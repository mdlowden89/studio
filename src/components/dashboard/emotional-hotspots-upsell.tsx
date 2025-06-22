"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles, Signal } from "lucide-react";

interface EmotionalHotspotsUpsellProps {
  onUnlock: () => void;
}

export function EmotionalHotspotsUpsell({ onUnlock }: EmotionalHotspotsUpsellProps) {
  return (
    <div className="relative w-full aspect-video sm:aspect-[2/1] overflow-hidden rounded-lg bg-card">
      <Image
        src="https://placehold.co/800x400.png"
        alt="Emotional Hotspots map preview"
        layout="fill"
        objectFit="cover"
        className="blur-sm brightness-75"
        data-ai-hint="neon map grid"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="relative z-10 p-6 flex flex-col items-center justify-center h-full text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/80 mb-4 shadow-lg">
          <Signal className="h-8 w-8 text-primary-foreground" />
        </div>
        <h3 className="text-2xl font-bold text-primary">Real-World Signal Matching™</h3>
        <p className="text-muted-foreground max-w-lg mt-2 mb-6">
          “Know where sparks are born.” Unlock the Emotional Hotspots map to see where connections are happening right now.
        </p>
        <Button 
          onClick={onUnlock} 
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
        >
          <Sparkles className="mr-2 h-5 w-5" /> Unlock with Crossd+
        </Button>
      </div>
    </div>
  );
}
