
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Sparkles, PlusCircle, ClipboardList, Users, MessageSquare, Route, MapPin, CalendarDays, TrendingUp, LayoutGrid, List as ListIcon, Star, ShoppingBag, Zap, ArrowRight, Loader2, BrainCircuit, Activity, Users2, Map as MapIcon } from "lucide-react";
import { MOCK_MOMENTS, MOCK_HOTSPOTS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { subDays, isAfter, format, getDay } from "date-fns";
import { MomentsMap } from "@/components/dashboard/moments-map";
import { MomentGalleryItem } from "@/components/moments/moment-gallery-item";
import Link from "next/link";
import type { UserProfile, Moment } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { CrossdPlusUpsellDialog } from "@/components/pricing/crossd-plus-upsell-dialog";
import { FreeBoostUpsellDialog } from "@/components/pricing/free-boost-upsell-dialog";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { fetchUserChatCount } from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { PlacesTrailItem } from "@/components/dashboard/places-trail-item";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DashboardClientProps {
    currentUser: UserProfile;
}

const MomentsLoadingSkeleton = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-6 w-1/2" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-24 w-full" />
    </div>
  </div>
);

const StatsLoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-muted/50 p-6 rounded-lg flex flex-col items-center text-center shadow-md">
                <Skeleton className="w-10 h-10 mb-3 rounded-full" />
                <Skeleton className="w-20 h-8 mb-1" />
                <Skeleton className="w-24 h-4" />
            </div>
        ))}
    </div>
);


export function DashboardClient({ currentUser }: DashboardClientProps) {
  const [recentPlacesViewMode, setRecentPlacesViewMode] = useState<'list' | 'imageGrid'>('list');
  const [clientFormattedTimes, setClientFormattedTimes] = useState<Record<string, string>>({});
  const [showUpsellDialog, setShowUpsellDialog] = useState(false);
  const [showFreeBoostDialog, setShowFreeBoostDialog] = useState(false);
  
  const [userMoments, setUserMoments] = useState<Moment[]>([]);
  const [activeChatsCount, setActiveChatsCount] = useState(0);

  const [isLoadingMoments, setIsLoadingMoments] = useState(true);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isActivatingBooster, setIsActivatingBooster] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const isPremium = currentUser.subscription?.status === 'active';

  const momentsLoggedCount = useMemo(() => userMoments.length, [userMoments]);
  const pendingMomentsCount = useMemo(() => userMoments.filter(m => m.status === 'pending').length, [userMoments]);

  const stats = [
    { title: "Moments Logged", value: momentsLoggedCount, icon: ClipboardList, color: "text-blue-500" },
    { title: "Pending Moments", value: pendingMomentsCount, icon: Users, color: "text-amber-500" },
    { title: "Active Chats", value: activeChatsCount, icon: MessageSquare, color: "text-purple-500" },
  ];

  const oneWeekAgo = useMemo(() => subDays(new Date(), 7), []);

  useEffect(() => {
    // DEV ONLY: Use mock data to visualize the trail
    setUserMoments(MOCK_MOMENTS as Moment[]);
    setIsLoadingMoments(false);
  }, []);

  useEffect(() => {
    if (currentUser.id) {
        setIsLoadingChats(true);
        fetchUserChatCount(currentUser.id)
            .then(setActiveChatsCount)
            .catch(err => {
                console.error("Failed to fetch chat count:", err);
                toast({ title: "Error", description: "Could not load your chat stats.", variant: "destructive" });
            })
            .finally(() => setIsLoadingChats(false));
    }
  }, [currentUser.id, toast]);

  const momentsThisWeek = useMemo(() => {
    return userMoments
      .filter(moment => isAfter(new Date(moment.loggedAt as string), oneWeekAgo))
      .sort((a, b) => new Date(b.loggedAt as string).getTime() - new Date(a.loggedAt as string).getTime());
  }, [userMoments, oneWeekAgo]);
  
  const distinctPlacesVisitedCount = useMemo(() => new Set(momentsThisWeek.map(m => m.placeName)).size, [momentsThisWeek]);

  const { mostActiveDay, mostFrequentLocation } = useMemo(() => {
    const dayCounts = momentsThisWeek.reduce((acc, moment) => {
      const day = getDay(new Date(moment.loggedAt as string));
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
    
    const locationCounts = momentsThisWeek.reduce((acc, moment) => {
      const locationKey = moment.locationAddress?.split(',')[0]?.trim() || 'Unknown Area';
      if (locationKey !== 'Unknown Area') {
          acc[locationKey] = (acc[locationKey] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);

    let mostActiveDayIndex = -1;
    let maxMomentsOnDay = 0;
    for (const day in dayCounts) {
      if (dayCounts[day] > maxMomentsOnDay) {
        maxMomentsOnDay = dayCounts[day];
        mostActiveDayIndex = parseInt(day);
      }
    }
    
    let frequentLocation = 'N/A';
    let maxLocationCount = 0;
    for (const loc in locationCounts) {
        if (locationCounts[loc] > maxLocationCount) {
            maxLocationCount = locationCounts[loc];
            frequentLocation = loc;
        }
    }

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return { 
        mostActiveDay: mostActiveDayIndex !== -1 ? dayNames[mostActiveDayIndex] : "N/A",
        mostFrequentLocation: frequentLocation,
    };
  }, [momentsThisWeek]);

  const momentsTimestampsKey = useMemo(() => {
    return momentsThisWeek.map(m => `${m.id}-${m.loggedAt}`).join(',');
  }, [momentsThisWeek]);

  useEffect(() => {
    const newFormattedTimes: Record<string, string> = {};
    momentsThisWeek.forEach(moment => {
      newFormattedTimes[moment.id] = format(new Date(moment.loggedAt as string), "p");
    });
    setClientFormattedTimes(newFormattedTimes);
  }, [momentsTimestampsKey, momentsThisWeek]); 

  useEffect(() => {
    if (searchParams.get('showBoostUpsell') === 'true') {
      setShowFreeBoostDialog(true);
      router.replace('/dashboard', { scroll: false });
    }
  }, [searchParams, router]);

  const activeStreakChallenge = useMemo(() => {
    if (!currentUser.challenges) {
      return null;
    }
    return currentUser.challenges.find(
      (challenge) => challenge.type === "Streak" && challenge.status === "active"
    );
  }, [currentUser.challenges]);
  
  const handlePurchaseBooster = async (priceId: string, purchaseItem: string) => {
    if (!currentUser) {
      toast({ title: "Not Logged In", description: "You must be logged in to make a purchase.", variant: "destructive" });
      router.push('/login-form');
      return;
    }

    if (!priceId) {
      toast({
        title: "Temporarily Unavailable",
        description: "This booster is not available for purchase right now. Please check back later.",
        variant: "destructive",
      });
      console.error(`Stripe Price ID for ${purchaseItem} is missing.`);
      return;
    }

    setIsActivatingBooster(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          userId: currentUser.id,
          mode: 'payment',
          metadata: { purchase_item: purchaseItem },
        }),
      });

      const sessionData = await response.json();

      if (!response.ok || !sessionData.sessionId) {
        throw new Error(sessionData.error || 'Failed to create checkout session.');
      }
      
      router.push(`/payment/initiate-stripe-redirect?sessionId=${sessionData.sessionId}`);

    } catch (error: any) {
      console.error("Booster purchase process error:", error);
      toast({
        title: "Purchase Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsActivatingBooster(false);
    }
  };
  
  const isGlowModeActive = useMemo(() => {
    if (!currentUser.glowEffect?.expiresAt) return false;
    return currentUser.glowEffect.active && new Date(currentUser.glowEffect.expiresAt) > new Date();
  }, [currentUser.glowEffect]);

  const boosters = [
    {
      icon: Zap,
      title: "Glow Mode Boost",
      price: "£3.49",
      description: "24-hour visibility surge, neon spark aura, and priority placement in feeds.",
      tagline: "Your spark. Center stage.",
      purchaseHandler: () => handlePurchaseBooster(process.env.NEXT_PUBLIC_STRIPE_GLOW_BOOST_PRICE_ID || '', 'glow_boost'),
      isActivating: isActivatingBooster,
      isDisabled: isGlowModeActive,
      statusText: "Active",
    },
  ];
  
  const weeklyInsights = [
      {icon: Users2, label: 'Distinct Places Visited', value: distinctPlacesVisitedCount},
      {icon: Activity, label: 'Most Active Day', value: mostActiveDay},
      {icon: MapIcon, label: 'Frequent Area', value: mostFrequentLocation},
  ]

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        {!currentUser.onboardingComplete && (
            <Card className="mb-8 bg-gradient-to-r from-primary/20 via-card to-card border-2 border-primary shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary">Let's Get You Set Up!</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Complete your profile to start finding connections. A great profile gets more attention!
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/profile" passHref>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Complete Your Profile <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
        )}

        <Card className="mb-8 bg-card shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              <div>
                <CardTitle className="text-2xl font-bold">
                  Welcome back, {currentUser.name.split(' ')[0]}!
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

        {isPremium && (
          <Card className="mb-8 bg-gradient-to-tr from-yellow-500/15 via-card to-card border border-yellow-500/30 shadow-xl">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="p-3 bg-yellow-500/20 rounded-full">
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-yellow-400">Your Spark Suggestions are Ready</CardTitle>
                <CardDescription className="text-muted-foreground mt-1">
                  Go where your vibe thrives. We've curated a list of places and ideas just for you.
                </CardDescription>
              </div>
            </CardHeader>
            <CardFooter>
              <Link href="/moments" passHref>
                <Button className="bg-yellow-500 hover:bg-yellow-500/90 text-black">
                  Explore My Suggestions <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )}

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
                {isLoadingMoments || isLoadingChats ? (
                  <StatsLoadingSkeleton />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="bg-muted/50 p-6 rounded-lg flex flex-col items-center text-center shadow-md">
                        <stat.icon className={`w-10 h-10 mb-3 ${stat.color}`} />
                        <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-8">
             <Card className="bg-card shadow-xl">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-6 h-6 text-primary" />
                        <CardTitle className="text-lg font-semibold">Weekly Recap</CardTitle>
                    </div>
                    <CardDescription className="text-xs text-muted-foreground mt-1">
                        Your activity insights from the last 7 days.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {weeklyInsights.map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <li key={index} className="flex items-center gap-3 text-sm">
                          <Icon className="w-5 h-5 text-primary/80" />
                          <span className="text-muted-foreground">{item.label}:</span>
                          <span className="font-bold text-foreground ml-auto">{item.value}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
             </Card>

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
                  <Link href="/profile?tab=progress" passHref className="w-full">
                    <Button variant="outline" size="sm" className="w-full text-primary border-primary/70 hover:bg-primary/10 hover:text-primary">
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
              <MapPin className="w-7 h-7 text-primary" />
              <div>
                <CardTitle className="text-xl font-semibold">Places Trail</CardTitle>
                <CardDescription className="text-muted-foreground">
                  A visual journey of your most recently logged moments.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingMoments ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : userMoments.length > 0 ? (
              <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                <div className="flex w-max space-x-4 p-4">
                  {userMoments.map((moment) => (
                    <PlacesTrailItem key={moment.id} moment={moment} />
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            ) : (
               <div className="text-center py-8 text-muted-foreground">
                <p>No places logged yet. Your trail will appear here!</p>
              </div>
            )}
          </CardContent>
        </Card>


        <Card className="mb-8 bg-card shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Route className="w-7 h-7 text-primary" />
              <div>
                <CardTitle className="text-xl font-semibold">Moments Trail Map</CardTitle>
                <CardDescription className="text-muted-foreground">
                  A map of places you've visited in the last 7 days.
                  {isPremium && " Premium users see Emotional Hotspots."}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-[2/1] w-full bg-muted rounded-lg overflow-hidden mb-4 shadow-inner">
              <MomentsMap moments={momentsThisWeek.filter(m => m.coordinates)} hotspots={isPremium ? MOCK_HOTSPOTS : undefined} />
            </div>
            {isLoadingMoments ? (
              <MomentsLoadingSkeleton />
            ) : momentsThisWeek.length > 0 ? (
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
                      const datePart = format(new Date(moment.loggedAt as string), "MMM d");
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
                      <MomentGalleryItem key={moment.id} moment={moment} userProfile={currentUser}/>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground flex flex-col items-center gap-3">
                <Route className="w-16 h-16 text-primary/60" />
                <p className="text-lg font-semibold text-foreground">Your Weekly Trail is Clear</p>
                <p className="max-w-md">This map shows moments from the last 7 days. Log a new one to start seeing your path!</p>
                <Button asChild className="mt-2 bg-primary/90 hover:bg-primary text-primary-foreground">
                  <Link href="/log-moment">
                    <PlusCircle className="mr-2 h-4 w-4" /> Log a New Moment
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {!isPremium && (
                <div className="lg:col-span-2">
                    <Card className="bg-gradient-to-br from-primary/10 via-card to-card shadow-xl border-primary/30">
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
                            className="bg-gradient-to-r from-primary via-pink-500 to-orange-400 hover:from-primary/90 hover:via-pink-500/90 hover:to-orange-400/90 text-primary-foreground shadow-lg transform hover:scale-105 transition-transform"
                            >
                            <Sparkles className="mr-2 h-5 w-5" /> Explore Premium Features
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>


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
              {boosters.map((booster) => {
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={booster.purchaseHandler}
                        disabled={booster.isDisabled || booster.isActivating}
                      >
                        {booster.isActivating ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        {booster.isActivating ? "Processing..." : booster.isDisabled ? booster.statusText : "Purchase"}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
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
