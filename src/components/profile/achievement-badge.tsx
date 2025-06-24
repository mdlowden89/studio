
"use client";

import type { Achievement } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons/icon";

interface AchievementBadgeProps {
  achievement: Achievement;
}

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Card className={cn(
            "group bg-card/70 transition-all duration-300 cursor-default",
            "hover:shadow-lg hover:shadow-primary/50 hover:ring-2 hover:ring-primary/70"
          )}>
            <CardHeader className="flex flex-row items-center gap-3 p-4 pb-2">
              <Icon name={achievement.icon} className={cn("w-8 h-8 text-muted-foreground", "group-hover:text-primary transition-colors duration-300")} />
              <div>
                <CardTitle className="text-lg text-foreground">{achievement.name}</CardTitle>
                <p className="text-xs text-muted-foreground/80">{achievement.type}</p>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <CardDescription className="text-sm text-muted-foreground h-10"> {/* Fixed height for description */}
                {achievement.description}
              </CardDescription>
              {achievement.achievedDate && (
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Achieved: {new Date(achievement.achievedDate).toLocaleDateString()}
                </p>
              )}
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-popover text-popover-foreground border-border shadow-md max-w-xs z-50">
          <p className="font-semibold mb-1">Rewards:</p>
          <ul className="list-disc list-inside text-sm space-y-0.5">
            {achievement.rewards.map((reward, index) => (
              <li key={index}>{reward}</li>
            ))}
            {achievement.rewards.length === 0 && <li>No specific rewards for this one, just glory!</li>}
          </ul>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
