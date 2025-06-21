
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Signal } from "lucide-react";

interface EmotionalHotspotsUpsellProps {
  onUnlock: () => void;
}

const Hotspot = ({ top, left, delay, label }: { top: string; left: string; delay: string; label: string }) => (
  <div className="absolute" style={{ top, left }}>
    <div className="absolute w-24 h-24 -translate-x-1/2 -translate-y-1/2">
      <div 
        className="absolute inset-0 rounded-full bg-primary/50 animate-pulse-hotspot"
        style={{ animationDelay: '0s' }}
      />
      <div 
        className="absolute inset-0 rounded-full bg-primary/40 animate-pulse-hotspot"
        style={{ animationDelay: delay }}
      />
    </div>
    <div className="relative -translate-x-1/2 mt-10 bg-black/50 px-2 py-1 rounded-md text-xs text-center whitespace-nowrap text-white">
      {label}
    </div>
  </div>
);

export function EmotionalHotspotsUpsell({ onUnlock }: EmotionalHotspotsUpsellProps) {
  return (
    <Card className="relative w-full aspect-video sm:aspect-[2/1] overflow-hidden bg-card border-none flex items-center justify-center text-center">
      {/* Background Map Image */}
      <Image
        src="https://placehold.co/1200x600.png"
        alt="Stylized map background"
        layout="fill"
        objectFit="cover"
        className="opacity-20 blur-sm"
        data-ai-hint="dark abstract map"
      />

      {/* Pulsing Hotspots */}
      <Hotspot top="30%" left="25%" delay="1s" label="💕 Connection Zone" />
      <Hotspot top="55%" left="60%" delay="0.5s" label="✨ Serendipity Spike" />
      <Hotspot top="20%" left="80%" delay="1.5s" label="🔁 Loop Zone" />

      {/* Overlay and Call to Action */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
      <div className="relative z-10 p-6 flex flex-col items-center">
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
    </Card>
  );
}
