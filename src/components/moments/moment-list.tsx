
"use client";

import { MOCK_USERS } from "@/lib/mock-data";
import type { Moment as MomentType, UserProfile } from "@/lib/types";
import { MomentCard } from "./moment-card";
import { MomentGalleryItem } from "./moment-gallery-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle } from "lucide-react";
import type { ViewMode } from "@/app/moments/page";

interface MomentListProps {
  viewMode: ViewMode;
  moments: MomentType[];
  userProfile: UserProfile | null;
}

export function MomentList({ viewMode, moments, userProfile }: MomentListProps) {
  if (moments.length === 0) {
    return (
      <div className="text-center py-10 flex flex-col items-center text-muted-foreground">
        <AlertTriangle className="w-12 h-12 mb-4" />
        <p className="text-lg">No moments recorded yet.</p>
        <p className="text-sm">Your significant places will appear here.</p>
      </div>
    );
  }

  // Sort moments by timestamp, most recent first
  const sortedMoments = [...moments].sort((a, b) => {
    const dateA = new Date(a.loggedAt as string).getTime();
    const dateB = new Date(b.loggedAt as string).getTime();
    return dateB - dateA;
  });

  if (viewMode === 'list') {
    return (
      <ScrollArea className="h-[calc(100vh-22rem)] pr-4">
        <div className="space-y-8">
          {sortedMoments.map((moment, index) => (
            <MomentCard 
              key={moment.id}
              moment={moment} 
              potentialMatchUser={moment.potentialMatchId ? MOCK_USERS.find(u => u.id === moment.potentialMatchId) : undefined}
              userProfile={userProfile}
            />
          ))}
        </div>
      </ScrollArea>
    );
  }

  if (viewMode === 'gallery') {
    return (
      <ScrollArea className="h-[calc(100vh-22rem)] pr-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedMoments.map((moment) => (
            <MomentGalleryItem key={moment.id} moment={moment} userProfile={userProfile} />
          ))}
        </div>
      </ScrollArea>
    );
  }

  return null;
}
