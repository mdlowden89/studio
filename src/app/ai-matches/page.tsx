
"use client"; // This page now fetches data client-side

import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Bot, Loader2, AlertTriangle } from "lucide-react";
import { VibeMatcher } from "@/components/ai/vibe-matcher";
import { VibeSignalCard } from "@/components/ai/vibe-signal-card"; // New component
import { getAiDetailedMatchSuggestions } from "@/app/actions"; // New action
import type { DetailedMatchSuggestion } from "@/lib/types";
import { Separator } from "@/components/ui/separator";

export default function AiMatchesPage() {
  const [detailedSuggestions, setDetailedSuggestions] = useState<DetailedMatchSuggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true);
  const [errorSuggestions, setErrorSuggestions] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDetailedSuggestions() {
      setIsLoadingSuggestions(true);
      setErrorSuggestions(null);
      try {
        const suggestions = await getAiDetailedMatchSuggestions();
        setDetailedSuggestions(suggestions);
      } catch (error) {
        console.error("Failed to fetch detailed AI suggestions:", error);
        setErrorSuggestions("Could not load vibe signals. Please try again later.");
      } finally {
        setIsLoadingSuggestions(false);
      }
    }
    fetchDetailedSuggestions();
  }, []);

  return (
    <AppLayout>
      <div className="container mx-auto py-8 space-y-10">
        <Card className="bg-card shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
              <div>
                <CardTitle className="text-3xl font-bold">Vibe Signal Engine</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Fine-tune your vibe and discover AI-suggested matches tailored to you.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <VibeMatcher />
          </CardContent>
        </Card>

        <Separator />

        <Card className="bg-card shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Bot className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="text-3xl font-bold">Your Weekly Vibe Signals</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Curated AI suggestions based on your overall profile and Crossd perks. (3 per week for free users)
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoadingSuggestions && (
              <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                <Loader2 className="w-10 h-10 animate-spin text-primary mb-3" />
                <p>Generating your Vibe Signals...</p>
              </div>
            )}
            {errorSuggestions && !isLoadingSuggestions && (
               <div className="flex flex-col items-center justify-center py-10 text-destructive">
                <AlertTriangle className="w-10 h-10 mb-3" />
                <p>{errorSuggestions}</p>
              </div>
            )}
            {!isLoadingSuggestions && !errorSuggestions && detailedSuggestions.length === 0 && (
              <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                <Sparkles className="w-10 h-10 mb-3" />
                <p>No Vibe Signals available right now. Check back soon!</p>
              </div>
            )}
            {!isLoadingSuggestions && !errorSuggestions && detailedSuggestions.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {detailedSuggestions.map((suggestion) => (
                  <VibeSignalCard key={suggestion.user.id} suggestion={suggestion} />
                ))}
              </div>
            )}
          </CardContent>
           { !isLoadingSuggestions && !errorSuggestions && detailedSuggestions.length < 3 && detailedSuggestions.length > 0 && (
             <CardFooter>
                <p className="text-xs text-muted-foreground mx-auto">More Vibe Signals coming soon!</p>
             </CardFooter>
           )}
        </Card>
      </div>
    </AppLayout>
  );
}
