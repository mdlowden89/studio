
"use client";

import { useState, useEffect } from 'react';
import type { Moment as MomentType, UserProfile } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MapPin, Sparkles } from "lucide-react";
import { format } from "date-fns";

interface MomentCardProps {
  moment: MomentType;
  potentialMatchUser?: UserProfile;
  userProfile: UserProfile | null;
}

export function MomentCard({ moment, potentialMatchUser, userProfile }: MomentCardProps) {
  const [formattedTime, setFormattedTime] = useState<string>("...");
  const [momentDate, setMomentDate] = useState<Date | null>(null);
  
  useEffect(() => {
    if (moment.loggedAt) {
      const date = new Date(moment.loggedAt as string);
      setMomentDate(date);
      setFormattedTime(format(date, "p"));
    }
  }, [moment.loggedAt]);

  const statusInfo = {
    pending: { label: 'Waiting for a response...', color: 'text-amber-400' },
    confirmed: { label: `You matched with someone!`, color: 'text-green-400' },
    rejected: { label: 'This moment wasn\'t a match.', color: 'text-destructive' }
  };
  
  const currentStatus = statusInfo[moment.status] || statusInfo.pending;

  return (
    <div className="pl-8 relative before:absolute before:inset-0 before:left-3 before:w-px before:bg-border/70">
        <div className="flex items-center gap-4 mb-1">
            <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center ring-4 ring-background shadow-md z-10">
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            </div>
            {momentDate && (
                <div className="text-sm text-muted-foreground">
                    {format(momentDate, "MMM d, yyyy")} - <span className="font-medium text-foreground">{formattedTime}</span>
                </div>
            )}
        </div>
        <Card className="bg-gradient-to-br from-card via-card to-primary/5 hover:shadow-primary/20 transition-shadow duration-300 ml-3">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {moment.placeName}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            <p className="text-sm text-foreground italic mb-3">&quot;{moment.momentDescription}&quot;</p>
            <p className={`text-xs font-semibold ${currentStatus.color}`}>{currentStatus.label}</p>
          </CardContent>
        </Card>
    </div>
  );
}
