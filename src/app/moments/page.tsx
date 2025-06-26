"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { MomentList } from "@/components/moments/moment-list";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Route, List, LayoutGrid, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MomentsMap } from "@/components/dashboard/moments-map";
import { MOCK_HOTSPOTS } from "@/lib/mock-data";
import { useAuth } from "@/hooks/use-auth";
import { fetchMomentsForUser } from "@/app/actions";
import type { Moment } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export type ViewMode = "list" | "gallery";

function MomentsLoadingSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="aspect-[2/1] w-full" />
      <Separator />
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Skeleton className="aspect-[4/3] w-full" />
        <Skeleton className="aspect-[4/3] w-full" />
        <Skeleton className="aspect-[4/3] w-full" />
        <Skeleton className="aspect-[4/3] w-full" />
      </div>
    </div>
  );
}

export default function MomentsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [moments, setMoments] = useState<Moment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userProfile, isLoading: isAuthLoading } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    if (userProfile?.id) {
      setIsLoading(true);
      fetchMomentsForUser(userProfile.id)
        .then(data => {
          setMoments(data as Moment[]);
        })
        .catch(err => {
          console.error("Failed to fetch user moments:", err);
          toast({ title: "Error", description: "Could not load your moments.", variant: "destructive" });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (!isAuthLoading) {
      // Handle case where user is not logged in but auth is no longer loading
      setIsLoading(false);
    }
  }, [userProfile?.id, isAuthLoading, toast]);

  const momentsWithCoords = moments.filter(m => m.coordinates);

  const renderContent = () => {
    if (isLoading || isAuthLoading) {
      return <MomentsLoadingSkeleton />;
    }
    
    if (moments.length === 0) {
       return (
          <div className="text-center py-10 text-muted-foreground flex flex-col items-center">
            <AlertTriangle className="w-16 h-16 mb-4 text-primary/70" />
            <p className="text-xl font-semibold">No Moments Logged Yet</p>
            <p className="mt-2 max-w-md">Your logged moments and the map of your trail will appear here once you start logging them. Why not log your first one now?</p>
            <Button asChild className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/log-moment">Log Your First Moment</Link>
            </Button>
          </div>
       );
    }

    return (
      <div className="space-y-6">
        <div className="aspect-[2/1] w-full bg-muted rounded-lg overflow-hidden shadow-inner">
          <MomentsMap moments={momentsWithCoords} hotspots={MOCK_HOTSPOTS} />
        </div>
        <Separator />
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <h3 className="text-xl font-semibold">Your Moment Logs</h3>
            <div className="flex items-center gap-2 border border-border p-1 rounded-md">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                aria-label="List view"
                className={viewMode === 'list' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent'}
              >
                <List className="h-5 w-5" />
              </Button>
              <Separator orientation="vertical" className="h-6 bg-border" />
              <Button
                variant={viewMode === "gallery" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("gallery")}
                aria-label="Gallery view"
                className={viewMode === 'gallery' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent'}
              >
                <LayoutGrid className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <MomentList viewMode={viewMode} moments={moments} />
        </div>
      </div>
    );
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="bg-card shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Route className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="text-3xl font-bold">Your Moments Trail</CardTitle>
                <CardDescription className="text-muted-foreground">
                  A map and log of significant places and times you've visited.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {renderContent()}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
