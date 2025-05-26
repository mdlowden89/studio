
"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { MomentList } from "@/components/moments/moment-list";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, List, LayoutGrid } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export type ViewMode = "list" | "gallery";

export default function MomentsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="bg-card shadow-xl">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle className="text-3xl font-bold">Your Moments</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    A trail of significant places and times you've visited. Toggle between list and gallery view.
                  </CardDescription>
                </div>
              </div>
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
          </CardHeader>
          <CardContent>
            <MomentList viewMode={viewMode} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
