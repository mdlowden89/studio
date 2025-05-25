
"use client";

import Image from "next/image";
import type { DetailedMatchSuggestion } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Lightbulb, MapPin, Heart, CheckCircle, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VibeSignalCardProps {
  suggestion: DetailedMatchSuggestion;
}

export function VibeSignalCard({ suggestion }: VibeSignalCardProps) {
  const { user, matchScore, sharedInterestReason, sharedLocationReason, sharedVibeTags } = suggestion;
  const { toast } = useToast();

  const handleConnect = () => {
    // In a real app, this would initiate a match request or similar action
    toast({
      title: "Connection Sent!",
      description: `You've expressed interest in ${user.name}.`,
    });
  };

  return (
    <Card className="bg-card/70 shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/50">
              <AvatarImage src={user.images[0]} alt={user.name} data-ai-hint="profile avatar" />
              <AvatarFallback>{user.name.substring(0, 1)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-semibold">{user.name}, {user.age}</CardTitle>
              <div className="flex items-center text-sm text-primary mt-0.5">
                <Sparkles className="w-4 h-4 mr-1.5" />
                <span>{matchScore}% Vibe Match</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm flex-grow">
        <div className="p-3 bg-muted/50 rounded-md">
            <div className="flex items-start gap-2 text-foreground/90">
                <Lightbulb className="w-5 h-5 text-primary/80 mt-0.5 shrink-0" />
                <p>{sharedInterestReason}</p>
            </div>
        </div>
        <div className="p-3 bg-muted/50 rounded-md">
            <div className="flex items-start gap-2 text-foreground/90">
                <MapPin className="w-5 h-5 text-primary/80 mt-0.5 shrink-0" />
                <p>{sharedLocationReason}</p>
            </div>
        </div>
        {sharedVibeTags.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              Shared Vibes:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {sharedVibeTags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs capitalize border-primary/50 text-primary/90 bg-primary/10">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleConnect} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Heart className="mr-2 h-4 w-4" /> Connect with {user.name}
        </Button>
      </CardFooter>
    </Card>
  );
}
