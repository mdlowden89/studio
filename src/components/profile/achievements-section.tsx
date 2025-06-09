
"use client";

import type { Achievement } from "@/lib/types";
import { AchievementBadge } from "./achievement-badge";
import { Trophy } from "lucide-react";

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  if (!achievements || achievements.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Trophy className="w-12 h-12 mx-auto mb-3 text-primary/70" />
        <p className="text-lg font-semibold">No Achievements Unlocked Yet</p>
        <p className="text-sm">Keep exploring and interacting on Crossd to earn cool badges!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {achievements.map((ach) => (
        <AchievementBadge key={ach.id} achievement={ach} />
      ))}
    </div>
  );
}
