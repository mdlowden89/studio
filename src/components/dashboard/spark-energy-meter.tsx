
"use client";

import { useMemo } from 'react';
import type { Moment } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Flame, Sparkles, Clock, TrendingUp } from 'lucide-react';
import { differenceInCalendarDays, isSameDay, subDays, startOfDay } from 'date-fns';

interface SparkEnergyMeterProps {
  moments: Moment[];
}

const MAX_ENERGY = 100;
const STREAK_ENERGY_BONUS = 20;
const CONNECTION_ENERGY_BONUS = 15;
const EXPIRING_SOON_THRESHOLD_DAYS = 2; // Moments older than 2 days are "expiring"

export function SparkEnergyMeter({ moments }: SparkEnergyMeterProps) {
  const { loginStreak, weeklyConnections, expiringSoonCount } = useMemo(() => {
    if (!moments || moments.length === 0) {
      return { loginStreak: 0, weeklyConnections: 0, expiringSoonCount: 0 };
    }

    const sortedMoments = moments
      .map(m => ({ ...m, loggedAt: new Date(m.loggedAt as string) }))
      .sort((a, b) => (b.loggedAt as Date).getTime() - (a.loggedAt as Date).getTime());

    // Calculate Login Streak
    let streak = 0;
    const today = startOfDay(new Date());
    if (sortedMoments.length > 0 && (isSameDay(sortedMoments[0].loggedAt as Date, today) || isSameDay(sortedMoments[0].loggedAt as Date, subDays(today,1)))) {
       streak = 1;
       let lastDate = startOfDay(sortedMoments[0].loggedAt as Date);
       const uniqueDays = [lastDate];

       for (let i = 1; i < sortedMoments.length; i++) {
           const currentDate = startOfDay(sortedMoments[i].loggedAt as Date);
           if (!uniqueDays.find(d => isSameDay(d, currentDate))) {
               if (differenceInCalendarDays(lastDate, currentDate) === 1) {
                   streak++;
                   lastDate = currentDate;
                   uniqueDays.push(currentDate);
               } else {
                   break; 
               }
           }
       }
    }

    // Calculate Weekly Connections (confirmed moments)
    const oneWeekAgo = subDays(new Date(), 7);
    const connections = moments.filter(
      m => m.status === 'confirmed' && new Date(m.loggedAt as string) > oneWeekAgo
    ).length;
    
    // Calculate Expiring Soon Moments (pending moments older than threshold)
    const expiryDate = subDays(new Date(), EXPIRING_SOON_THRESHOLD_DAYS);
    const expiring = moments.filter(
        m => m.status === 'pending' && new Date(m.loggedAt as string) < expiryDate
    ).length;


    return { loginStreak: streak, weeklyConnections: connections, expiringSoonCount: expiring };
  }, [moments]);

  const sparkEnergy = useMemo(() => {
    const streakBonus = Math.min(loginStreak * STREAK_ENERGY_BONUS, MAX_ENERGY / 2);
    const connectionBonus = Math.min(weeklyConnections * CONNECTION_ENERGY_BONUS, MAX_ENERGY / 2);
    return Math.min(streakBonus + connectionBonus, MAX_ENERGY);
  }, [loginStreak, weeklyConnections]);


  return (
    <Card className="mb-8 bg-gradient-to-tr from-card to-primary/10 border border-primary/30 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2 text-primary">
          <TrendingUp className="w-7 h-7" />
          Spark Energy Meter
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Your weekly engagement fuels your spark. Keep it high for better visibility!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Progress value={sparkEnergy} className="h-4 [&>div]:bg-gradient-to-r [&>div]:from-primary/70 [&>div]:to-primary" />
            <p className="text-right text-sm font-bold text-primary mt-1">{sparkEnergy}%</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <p className="text-lg font-semibold text-foreground">{loginStreak}</p>
              </div>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-green-400" />
                <p className="text-lg font-semibold text-foreground">{weeklyConnections}</p>
              </div>
              <p className="text-xs text-muted-foreground">Sparks this week</p>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-red-400" />
                 <p className="text-lg font-semibold text-foreground">{expiringSoonCount}</p>
              </div>
              <p className="text-xs text-muted-foreground">Expiring Moments</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
