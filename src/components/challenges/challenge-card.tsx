
"use client";

import type { Challenge } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";
import { Icon } from "@/components/icons/icon";

interface ChallengeCardProps {
  challenge: Challenge;
}

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const progressValue = challenge.progress ? (challenge.progress.current / challenge.progress.target) * 100 : 0;

  return (
    <Card className="bg-card/70 hover:shadow-primary/30 transition-shadow duration-300 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Icon name={challenge.icon} className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <CardTitle className="text-lg text-foreground">{challenge.name}</CardTitle>
              <Badge variant="outline" className="mt-1 text-xs border-primary/50 text-primary/80">{challenge.type}</Badge>
            </div>
          </div>
          {challenge.status === 'active' && (
            <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-400 border-blue-500/50">Active</Badge>
          )}
           {challenge.status === 'not_started' && (
            <Badge variant="outline" className="text-xs">Not Started</Badge>
          )}
          {challenge.status === 'completed' && (
            <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400 border-green-500/50">Completed</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <CardDescription className="text-sm text-muted-foreground min-h-[40px]">
          {challenge.description}
        </CardDescription>
        
        {challenge.progress && (
          <div>
            <div className="flex justify-between items-center mb-1">
                <p className="text-xs font-medium text-foreground/90">Progress:</p>
                <p className="text-xs text-muted-foreground">
                    {challenge.progress.current} / {challenge.progress.target} {challenge.progress.unit}
                </p>
            </div>
            <Progress value={progressValue} className="h-2 [&>div]:bg-primary" />
          </div>
        )}
        
        {challenge.timeLimit && (
            <div className="flex items-center text-xs text-amber-400/90 gap-1.5">
                <Clock className="w-3.5 h-3.5"/>
                <span>{challenge.timeLimit}</span>
            </div>
        )}

        <div>
            <p className="text-xs font-medium text-foreground/90 mb-1">Reward Preview:</p>
            <p className="text-xs text-muted-foreground italic">{challenge.rewardPreview}</p>
        </div>

      </CardContent>
      <CardFooter className="pt-4">
        {challenge.status === 'not_started' && (
            <Button variant="outline" size="sm" className="w-full hover:bg-primary/10 hover:text-primary border-primary/70 text-primary/90">
                Start Challenge
            </Button>
        )}
        {challenge.status === 'active' && (
             <Button variant="default" size="sm" className="w-full bg-primary/80 hover:bg-primary text-primary-foreground" disabled>
                <CheckCircle className="mr-2 h-4 w-4"/>
                In Progress
            </Button>
        )}
         {challenge.status === 'completed' && (
            <Button variant="default" size="sm" className="w-full bg-green-600 hover:bg-green-600/90 text-primary-foreground" disabled>
                <CheckCircle className="mr-2 h-4 w-4"/>
                Completed
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
