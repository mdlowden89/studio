
"use client";

import { useState, useEffect } from 'react';
import type { Moment as MomentType, UserProfile } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Users, CalendarDays, Repeat, Loader2 } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { replayMoment } from '@/app/actions';

interface MomentCardProps {
  moment: MomentType;
  potentialMatchUser?: UserProfile;
  userProfile: UserProfile | null;
}

export function MomentCard({ moment, potentialMatchUser, userProfile }: MomentCardProps) {
  const [formattedTime, setFormattedTime] = useState<string>("...");
  const [momentDate, setMomentDate] = useState<Date | null>(null);
  const [isReplaying, setIsReplaying] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (moment.loggedAt) {
      const date = new Date(moment.loggedAt as string);
      setMomentDate(date);
      setFormattedTime(format(date, "p"));
    }
  }, [moment.loggedAt]);

  const replaysAvailable = userProfile?.echoReplaysAvailable || 0;
  const isReplayable = moment.status === 'rejected' && !moment.replayed;

  const handleReplay = async () => {
    if (!userProfile) return;
    setIsReplaying(true);
    const result = await replayMoment(userProfile.id, moment.id);
    if (result.success) {
      toast({
        title: "Moment Replayed!",
        description: "You've been given a second chance to match. We've sent them a notification.",
      });
      router.refresh(); // Refresh the page to see the updated state
    } else {
      toast({
        title: "Replay Failed",
        description: result.error || "Could not replay the moment.",
        variant: "destructive",
      });
    }
    setIsReplaying(false);
  };

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
         <div className="text-xs text-muted-foreground pt-1">
          Status: <span className={`font-medium ${moment.status === 'confirmed' ? 'text-green-400' : moment.status === 'rejected' ? 'text-destructive' : 'text-amber-400'}`}>{moment.status}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-foreground italic">Your reflection: &quot;{moment.momentDescription}&quot;</p>
      </CardContent>

      {isReplayable && (
        <CardFooter>
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 p-3 bg-muted/50 rounded-lg">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-foreground">Missed Connection?</p>
              <p className="text-xs text-muted-foreground">Use an Echo Replay to get a second chance.</p>
            </div>
            <Button disabled={replaysAvailable < 1 || isReplaying} onClick={handleReplay} className="w-full sm:w-auto">
              {isReplaying ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Repeat className="mr-2 h-4 w-4" />
              )}
              Replay Moment ({replaysAvailable} left)
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
