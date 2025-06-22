
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Sparkles, PlusCircle, ClipboardList, Users, MessageSquare, Route, MapPin, CalendarDays, Users2, TrendingUp, Activity, Map, LayoutGrid, List as ListIcon, Lightbulb, Edit3, Repeat, Star, ShoppingBag, Zap, Undo2, Eye, BrainCircuit, Signal } from "lucide-react";
import { getCurrentUser, MOCK_MOMENTS, MOCK_CROSSED_PATHS_USERS, MOCK_CHAT_CONVERSATIONS, MOCK_USER_ID, MOCK_USERS, baseDate, AVAILABLE_PROMPTS, MOCK_AVAILABLE_CHALLENGES, MOCK_HOTSPOTS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { subDays, isAfter, format, getDay } from "date-fns";
import { MomentsMap } from "@/components/dashboard/moments-map";
import { MomentGalleryItem } from "@/components/moments/moment-gallery-item";
import Link from "next/link";
import type { ProfilePrompt, Challenge } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { CrossdPlusUpsellDialog } from "@/components/pricing/crossd-plus-upsell-dialog";
import { FreeBoostUpsellDialog } from "@/components/pricing/free-boost-upsell-dialog";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { EmotionalHotspotsUpsell } from "@/components/dashboard/emotional-hotspots-upsell";


export function DashboardClient() {
  const currentUser = getCurrentUser();
  const [recentPlacesViewMode, setRecentPlacesViewMode] = useState<'list' | 'imageGrid'>('list');
  const [clientFormattedTimes, setClientFormattedTimes] = useState<Record<string, string>>({});
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [promptOfTheDay, setPromptOfTheDay] = useState<ProfilePrompt | null>(null);
  const [showUpsellDialog, setShowUpsellDialog] = useState(false);
  const [showFreeBoostDialog, setShowFreeBoostDialog] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const momentsLoggedCount = MOCK_MOMENTS.filter(moment => moment.userId === MOCK_USER_ID).length;
  const potentialMatchesCount = MOCK_CROSSED_PATHS_USERS.length;
  const activeChatsCount = MOCK_CHAT_CONVERSATIONS.length;

  const stats = [
    { title: "Moments Logged", value: momentsLoggedCount, icon: ClipboardList, color: "text-blue-500" },
    { title: "Potential Matches", value: potentialMatchesCount, icon: Users, color: "text-green-500" },
    { title: "Active Chats", value: activeChatsCount, icon: MessageSquare, color: "text-purple-500" },
  ];

  const oneWeekAgo = useMemo(() => subDays(baseDate, 7), []);

  const momentsThisWeek = useMemo(() => {
    return MOCK_MOMENTS
      .filter(moment => moment.userId === MOCK_USER_ID && isAfter(new Date(moment.timestamp), oneWeekAgo))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [oneWeekAgo]);

  const momentsTimestampsKey = useMemo(() => {
    return momentsThisWeek.map(m => `${m.id}-${m.timestamp}`).join(',');
  }, [momentsThisWeek]);

  useEffect(() => {
    const newFormattedTimes: Record<string, string> = {};
    momentsThisWeek.forEach(moment => {
      newFormattedTimes[moment.id] = format(new Date(moment.timestamp), "p");
    });
    setClientFormattedTimes(newFormattedTimes);
  }, [momentsTimestampsKey, momentsThisWeek]); 

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    return () => {};
  }, []);

  const selectNewPrompt = useCallback(() => {
    if (AVAILABLE_PROMPTS.length > 0) {
      const randomIndex = Math.floor(Math.random() * AVAILABLE_PROMPTS.length);
      setPromptOfTheDay(AVAILABLE_PROMPTS[randomIndex]);
    }
  }, []); 

  useEffect(() => {
    selectNewPrompt();
  }, [selectNewPrompt]);

  useEffect(() => {
    if (searchParams.get('showBoostUpsell') === 'true') {
      // TODO: In a real app, check if user is already premium before showing.
      setShowFreeBoostDialog(true);
      // Clean the URL
      router.replace('/dashboard', { scroll: false });
    }
  }, [searchParams, router]);


  const distinctPlacesVisitedCount = useMemo(() => new Set(momentsThisWeek.map(m => m.placeName)).size, [momentsThisWeek]);

  const { mostActiveDay } = useMemo(() => {
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
    return { mostActiveDay: mostActiveDayIndex !== -1 ? dayNames[mostActiveDayIndex] : "N/A" };
  }, [momentsThisWeek]);
  
  const activeStreakChallenge = useMemo(() => {
    return MOCK_AVAILABLE_CHALLENGES.find(
      (challenge) => challenge.type === "Streak" && challenge.status === "active"
    );
  }, []);

  const boosters = [
    {
      icon: Zap,
      title: "Glow Mode Boost",
      price: "£3.49",
      description: "24-hour visibility surge, neon spark aura, and priority placement in feeds.",
      tagline: "Your spark. Center stage.",
    },
    {
      icon: Repeat,
      title: "Echo Replay",
      price: "£2.49",
      description: "Rewatch one expired or missed Moment and see when/where you crossed paths.",
      tagline: "Time passed. But your moment didn’t have to.",
    },
    {
      icon: Undo2,
      title: "Undo Pass (Backtrack)",
      price: "£1.99",
      description: "Instantly rewind your last accidental swipe/pass to get a second chance.",
      tagline: "One swipe shouldn’t seal your fate.",
    },
    {
      icon: Eye,
      title: "Free Like Reveal",
      price: "£1.49",
      description: "View one of your blurred Likes without needing to match first.",
      tagline: "One reveal. One heartbeat closer.",
    },
    {
      icon: BrainCircuit,
      title: "FateSync Toolkit",
      price: "£7.99",
      description: "Get a full AI-powered compatibility analysis, AI message starters, and enhanced moment visuals.",
      tagline: "When your spark deserves more than a swipe.",
      colSpan: 'sm:col-span-2 lg:col-span-1',
    },
  ];

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="bg-card shadow-xl h-full">
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
          </div>

          <div className="lg:col-span-1 space-y-8">
             {promptOfTheDay && (
              <Card className="bg-card shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-6 h-6 text-primary" />
                    <CardTitle className="text-lg font-semibold">Prompt of the Day</CardTitle>
                  </div>
                   <CardDescription className="text-xs text-muted-foreground mt-1">Spark a new conversation or update your profile!</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground italic mb-3">&quot;{promptOfTheDay.question}&quot;</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Button variant="ghost" size="sm" onClick={selectNewPrompt} className="text-muted-foreground hover:text-primary">
                    <Repeat className="mr-1.5 h-3.5 w-3.5" /> Another
                  </Button>
                  <Link href="/profile" passHref>
                    <Button size="sm" className="bg-primary/90 hover:bg-primary text-primary-foreground text-xs">
                      <Edit3 className="mr-1.5 h-3.5 w-3.5" /> Answer
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )}

            {activeStreakChallenge && activeStreakChallenge.progress && (
              <Card className="bg-card shadow-xl">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <CardTitle className="text-lg font-semibold">Active Streak</CardTitle>
                  </div>
                  <CardDescription className="text-xs text-muted-foreground mt-1">{activeStreakChallenge.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground mb-2">{activeStreakChallenge.description}</p>
                  <Progress value={(activeStreakChallenge.progress.current / activeStreakChallenge.progress.target) * 100} className="h-2 [&>div]:bg-primary" />
                  <p className="text-xs text-muted-foreground mt-1 text-right">
                    {activeStreakChallenge.progress.current} / {activeStreakChallenge.progress.target} {activeStreakChallenge.progress.unit}
                  </p>
                </CardContent>
                 <CardFooter>
                  <Link href="/profile" passHref className="w-full">
                    <Button variant="outline" size="sm" className="w-full text-primary border-primary/70 hover:bg-primary/10 hover:text-primary-foreground">
                        View All Challenges
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>


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
              <MomentsMap moments={momentsThisWeek.filter(m => m.coordinates)} hotspots={MOCK_HOTSPOTS} />
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
                    {momentsThisWeek.map(moment => {
                      const datePart = format(new Date(moment.timestamp), "MMM d");
                      const timePart = clientFormattedTimes[moment.id]; 
                      return (
                        <li key={moment.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded-md text-sm">
                          <MapPin className="w-4 h-4 text-primary/80" />
                          <span className="flex-grow font-medium text-foreground/90">{moment.placeName}</span>
                          <span className="text-xs text-muted-foreground">
                            {datePart}{timePart ? `, ${timePart}` : ""}
                          </span>
                        </li>
                      );
                    })}
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
                <Signal className="w-7 h-7 text-primary" />
                <div>
                    <CardTitle className="text-xl font-semibold">Emotional Hotspots</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      A premium Crossd+ feature to know where sparks are born.
                    </CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <EmotionalHotspotsUpsell onUnlock={() => setShowUpsellDialog(true)} />
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
                      const datePart = format(new Date(moment.timestamp), "EEE, MMM d");
                      const timePart = clientFormattedTimes[moment.id] ? `at ${clientFormattedTimes[moment.id]}` : "";
                      return (
                        <div key={moment.id} className="bg-muted/30 p-4 rounded-lg shadow hover:shadow-primary/20 transition-shadow">
                          <div className="flex items-center gap-2 mb-1.5">
                            <MapPin className="w-5 h-5 text-primary" />
                            <h5 className="font-semibold text-foreground truncate">{moment.placeName}</h5>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">{datePart} {timePart}</p>
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

        <Card className="mb-8 bg-gradient-to-br from-primary/10 via-card to-card shadow-xl border-primary/30">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/80 mb-3 shadow-lg animate-pulse">
              <Star className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold text-primary">Unlock Crossd+</CardTitle>
            <CardDescription className="text-muted-foreground max-w-md mx-auto">
              Supercharge your experience with unlimited likes, see who likes you, and more exclusive perks!
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center p-6">
            <Button 
              onClick={() => setShowUpsellDialog(true)} 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="mr-2 h-5 w-5" /> Explore Premium Features
            </Button>
          </CardFooter>
        </Card>

        <Card className="mb-8 bg-card shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="text-2xl font-bold">A La Carte Boosters</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Enhance your experience with powerful one-time purchases.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {boosters.slice(0, 4).map((booster) => {
                const BoosterIcon = booster.icon;
                return (
                  <Card key={booster.title} className="bg-muted/30 flex flex-col">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <BoosterIcon className="w-7 h-7 text-primary" />
                        <CardTitle className="text-lg">{booster.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-2">
                      <p className="text-sm text-muted-foreground">{booster.description}</p>
                      <p className="text-xs italic text-foreground/80">&quot;{booster.tagline}&quot;</p>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between pt-4">
                      <p className="text-lg font-bold text-primary">{booster.price}</p>
                      <Button variant="outline" size="sm" onClick={() => toast({ title: "Coming Soon!", description: `${booster.title} checkout is not yet implemented.` })}>
                        Purchase
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
              {/* Special layout for the last, larger booster */}
              {boosters.length > 4 && (() => {
                  const lastBooster = boosters[4];
                  const BoosterIcon = lastBooster.icon;
                  return (
                    <Card key={lastBooster.title} className="sm:col-span-2 lg:col-span-3 bg-muted/40 border-primary/30 flex flex-col sm:flex-row items-start gap-4 p-4">
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <BoosterIcon className="w-10 h-10 text-primary flex-shrink-0" />
                            <div className="sm:hidden">
                                <CardTitle className="text-lg">{lastBooster.title}</CardTitle>
                                <p className="text-lg font-bold text-primary">{lastBooster.price}</p>
                            </div>
                        </div>
                        <div className="flex-grow">
                             <div className="hidden sm:block">
                                <CardTitle className="text-lg">{lastBooster.title}</CardTitle>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">{lastBooster.description}</p>
                            <p className="text-xs italic text-foreground/80 mt-2">&quot;{lastBooster.tagline}&quot;</p>
                        </div>
                        <div className="flex flex-col items-center justify-center w-full sm:w-auto mt-4 sm:mt-0">
                           <p className="hidden sm:block text-xl font-bold text-primary mb-2">{lastBooster.price}</p>
                           <Button className="w-full sm:w-auto" onClick={() => toast({ title: "Coming Soon!", description: `${lastBooster.title} checkout is not yet implemented.` })}>
                            Purchase Toolkit
                           </Button>
                        </div>
                    </Card>
                  );
              })()}
            </div>
          </CardContent>
        </Card>


        <CrossdPlusUpsellDialog
          isOpen={showUpsellDialog}
          onOpenChange={setShowUpsellDialog}
        />

        <FreeBoostUpsellDialog
          isOpen={showFreeBoostDialog}
          onOpenChange={setShowFreeBoostDialog}
        />

      </div>
    </AppLayout>
  );
}
