
"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Sparkles, PlusCircle, ClipboardList, Users, MessageSquare, Route, MapPin, CalendarDays, Users2, TrendingUp, Activity, Map, LayoutGrid, List as ListIcon } from "lucide-react";
import { getCurrentUser, MOCK_MOMENTS, MOCK_CROSSED_PATHS_USERS, MOCK_CHAT_CONVERSATIONS, MOCK_USER_ID, MOCK_USERS, baseDate } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { subDays, isAfter, format, getDay } from "date-fns";
import { MomentsMap } from "@/components/dashboard/moments-map";
import { MomentGalleryItem } from "@/components/moments/moment-gallery-item";
import Link from "next/link";

export default function DashboardPage() {
  const currentUser = getCurrentUser();
  const [recentPlacesViewMode, setRecentPlacesViewMode] = useState<'list' | 'imageGrid'>('list');

  const momentsLoggedCount = MOCK_MOMENTS.filter(moment => moment.userId === MOCK_USER_ID).length;
  const potentialMatchesCount = MOCK_CROSSED_PATHS_USERS.length;
  const activeChatsCount = MOCK_CHAT_CONVERSATIONS.length;

  const stats = [
    { title: "Moments Logged", value: momentsLoggedCount, icon: ClipboardList, color: "text-blue-500" },
    { title: "Potential Matches", value: potentialMatchesCount, icon: Users, color: "text-green-500" },
    { title: "Active Chats", value: activeChatsCount, icon: MessageSquare, color: "text-purple-500" },
  ];

  const oneWeekAgo = subDays(baseDate, 7);
  const momentsThisWeek = MOCK_MOMENTS
    .filter(moment => moment.userId === MOCK_USER_ID && isAfter(new Date(moment.timestamp), oneWeekAgo))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const distinctPlacesVisitedCount = new Set(momentsThisWeek.map(m => m.placeName)).size;

  const dayCounts = momentsThisWeek.reduce((acc, moment) => {
    const day = getDay(new Date(moment.timestamp));
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  let mostActiveDayIndex = -1;
  let maxMomentsOnDay = 0;
  for (const day in dayCounts) {
    if (dayCounts[day] > maxMomentsOnDay) {
      maxMomentsOnDay = dayCounts[day];
      mostActiveDayIndex = parseInt(day);
    }
  }
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const mostActiveDay = mostActiveDayIndex !== -1 ? dayNames[mostActiveDayIndex] : "N/A";


  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="mb-8 bg-card shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              <div>
                <CardTitle className="text-2xl font-bold">
                  Welcome back, {currentUser.name}!
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-1">
                  Here's what's new on Crossd. Did you see anyone interesting today?
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="flex justify-end p-6">
            <Link href="/log-moment" passHref>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <PlusCircle className="mr-2 h-5 w-5" />
                Log a Crossing/Moment
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="mb-8 bg-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Your Activity At a Glance</CardTitle>
            <CardDescription className="text-muted-foreground">
              A quick look at your Crossd engagement.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-muted/50 p-6 rounded-lg flex flex-col items-center text-center shadow-md">
                  <stat.icon className={`w-10 h-10 mb-3 ${stat.color}`} />
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 bg-card shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Route className="w-7 h-7 text-primary" />
              <div>
                <CardTitle className="text-xl font-semibold">Moments Trail</CardTitle>
                <CardDescription className="text-muted-foreground">
                  A map of places you've visited in the last 7 days, with a toggle for list or image view.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-[2/1] w-full bg-muted rounded-lg overflow-hidden mb-4 shadow-inner">
              <MomentsMap moments={momentsThisWeek.filter(m => m.coordinates)} />
            </div>
            {momentsThisWeek.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-md font-semibold text-foreground">Recent Places This Week:</h4>
                  <div className="flex items-center gap-2 border border-border p-1 rounded-md">
                    <Button
                      variant={recentPlacesViewMode === 'list' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setRecentPlacesViewMode('list')}
                      aria-label="List view"
                      className={recentPlacesViewMode === 'list' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent'}
                    >
                      <ListIcon className="h-5 w-5" />
                    </Button>
                    <Separator orientation="vertical" className="h-6 bg-border" />
                    <Button
                      variant={recentPlacesViewMode === 'imageGrid' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setRecentPlacesViewMode('imageGrid')}
                      aria-label="Image Grid view"
                      className={recentPlacesViewMode === 'imageGrid' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent'}
                    >
                      <LayoutGrid className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                {recentPlacesViewMode === 'list' ? (
                  <ul className="space-y-2">
                    {momentsThisWeek.map(moment => (
                      <li key={moment.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded-md text-sm">
                        <MapPin className="w-4 h-4 text-primary/80" />
                        <span className="flex-grow font-medium text-foreground/90">{moment.placeName}</span>
                        <span className="text-xs text-muted-foreground">{format(new Date(moment.timestamp), "MMM d, p")}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {momentsThisWeek.map(moment => (
                      <MomentGalleryItem key={moment.id} moment={moment} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No moments logged in the past week with location data. Go out and explore!
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8 bg-card shadow-xl">
          <CardHeader>
             <div className="flex items-center gap-3">
                <Activity className="w-7 h-7 text-primary" />
                <div>
                    <CardTitle className="text-xl font-semibold">Your Weekly Recap</CardTitle>
                    <CardDescription className="text-muted-foreground">
                    Highlights from your activity this past week on Crossd.
                    </CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {momentsThisWeek.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-muted/50 p-4 rounded-lg shadow-md flex items-center gap-3">
                    <Map className="w-8 h-8 text-primary/80" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{distinctPlacesVisitedCount}</p>
                      <p className="text-sm text-muted-foreground">Distinct Places Visited</p>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg shadow-md flex items-center gap-3">
                    <CalendarDays className="w-8 h-8 text-primary/80" />
                    <div>
                      <p className="text-2xl font-bold text-foreground">{mostActiveDay}</p>
                      <p className="text-sm text-muted-foreground">Your Busiest Day</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 text-foreground">Places You've Been This Week:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {momentsThisWeek.map(moment => {
                      const matchedUser = moment.potentialMatchId ? MOCK_USERS.find(u => u.id === moment.potentialMatchId) : null;
                      return (
                        <div key={moment.id} className="bg-muted/30 p-4 rounded-lg shadow hover:shadow-primary/20 transition-shadow">
                          <div className="flex items-center gap-2 mb-1.5">
                            <MapPin className="w-5 h-5 text-primary" />
                            <h5 className="font-semibold text-foreground truncate">{moment.placeName}</h5>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{format(new Date(moment.timestamp), "EEE, MMM d 'at' p")}</p>
                          {matchedUser ? (
                            <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 p-2 rounded-md">
                              <Users2 className="w-4 h-4" />
                              <span>Crossed paths with {matchedUser.name}!</span>
                            </div>
                          ) : (
                             <p className="text-xs text-muted-foreground italic">You visited this place.</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground text-center py-6">
                Not enough activity this week for a recap. Log some moments!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
