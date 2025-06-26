
"use client";

import type { Challenge } from "@/lib/types";
import { ChallengeCard } from "./challenge-card";
import { Target } from "lucide-react";

interface ChallengesSectionProps {
  challenges: Challenge[];
}

export function ChallengesSection({ challenges }: ChallengesSectionProps) {
  const challengesToDisplay = challenges.filter(
    c => c.status === 'active' || c.status === 'not_started'
  );

  if (!challengesToDisplay || challengesToDisplay.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <Target className="w-12 h-12 mx-auto mb-3 text-primary/70" />
        <p className="text-lg font-semibold">No New Challenges Available</p>
        <p className="text-sm">You're all caught up! Check back later for new ways to engage.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {challengesToDisplay.map((challenge) => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
}
