
"use client";

import { MOCK_MOMENTS, MOCK_USERS } from "@/lib/mock-data";
import type { Moment as MomentType } from "@/lib/types";
import { MomentCard } from "./moment-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle } from "lucide-react";

export function MomentList() {
  const moments = MOCK_MOMENTS;

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
  const sortedMoments = [...moments].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <ScrollArea className="h-[calc(100vh-20rem)] pr-4"> {/* Adjust height as needed */}
      <div className="space-y-6">
        {sortedMoments.map((moment, index) => (
          <div key={moment.id}>
            <MomentCard moment={moment} potentialMatchUser={moment.potentialMatchId ? MOCK_USERS.find(u => u.id === moment.potentialMatchId) : undefined} />
            {index < sortedMoments.length - 1 && <Separator className="my-6 bg-border/50" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
