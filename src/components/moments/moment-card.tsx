"use client";

import { useState, useEffect } from 'react';
import type { Moment as MomentType, UserProfile } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Users, CalendarDays } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";

interface MomentCardProps {
  moment: MomentType;
  potentialMatchUser?: UserProfile;
}

export function MomentCard({ moment, potentialMatchUser }: MomentCardProps) {
  const [formattedTime, setFormattedTime] = useState<string>("..."); // Initial placeholder for time
  const [momentDate, setMomentDate] = useState<Date | null>(null);

  useEffect(() => {
    // This effect runs only on the client after hydration
    if (moment.loggedAt) {
      const date = new Date(moment.loggedAt as string);
      setMomentDate(date);
      setFormattedTime(format(date, "p")); // "p" is for localized time, e.g., 2:30 PM
    }
  }, [moment.loggedAt]); // Re-run if the moment loggedAt changes

  return (
    <Card className="bg-card/50 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            {moment.placeName}
          </CardTitle>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <CalendarDays className="w-3 h-3"/>
            {momentDate ? `${format(momentDate, "MMM d, yyyy")} - ${formattedTime}` : '...'}
          </div>
        </div>
      </CardHeader>
      {potentialMatchUser && (
        <CardContent>
          <CardDescription className="mb-2 text-sm flex items-center gap-1">
            <Users className="w-4 h-4 text-primary" />
            You crossed paths with {potentialMatchUser.name} here!
          </CardDescription>
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Avatar className="h-12 w-12 flex-shrink-0">
              <AvatarImage src={potentialMatchUser.images[0]} alt={potentialMatchUser.name} data-ai-hint="profile person" />
              <AvatarFallback>{potentialMatchUser.name.substring(0,1)}</AvatarFallback>
            </Avatar>
            <div className="flex-grow min-w-0">
              <p className="font-semibold text-foreground truncate">{potentialMatchUser.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{potentialMatchUser.bio}</p>
            </div>
            <Image 
              src="https://placehold.co/60x80.png" 
              alt="Place vibe" 
              width={60} 
              height={80} 
              className="rounded-md object-cover flex-shrink-0"
              data-ai-hint="cafe ambient"
            />
          </div>
        </CardContent>
      )}
      {!potentialMatchUser && (
         <CardContent>
            <p className="text-sm text-muted-foreground">A quiet moment, just for you.</p>
        </CardContent>
      )}
    </Card>
  );
}
