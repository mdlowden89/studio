
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X as XIcon, PlusCircle, Sparkles, Search, Loader2 } from "lucide-react";
import { getAiSuggestedMatches } from "@/app/actions";
import type { UserProfile } from "@/lib/types";
import { AiMatchCard } from "./ai-match-card";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/lib/mock-data";

export function VibeMatcher() {
  const currentUser = getCurrentUser();
  const [userVibeTags, setUserVibeTags] = useState<string[]>(currentUser.vibeTags);
  const [newTag, setNewTag] = useState("");
  // Mock location patterns, in a real app this would be derived from user activity
  const [userLocationPatterns, setUserLocationPatterns] = useState<string[]>(currentUser.locationPatterns || ['coffee shops', 'parks', 'live music venues']);
  const [suggestedMatches, setSuggestedMatches] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddTag = () => {
    if (newTag.trim() !== "" && !userVibeTags.includes(newTag.trim().toLowerCase())) {
      setUserVibeTags([...userVibeTags, newTag.trim().toLowerCase()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setUserVibeTags(userVibeTags.filter(tag => tag !== tagToRemove));
  };

  const handleFindMatches = async () => {
    if (userVibeTags.length === 0) {
      toast({
        title: "Add Vibe Tags",
        description: "Please add some vibe tags to find matches.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setSuggestedMatches([]); // Clear previous matches
    try {
      const matches = await getAiSuggestedMatches(userVibeTags, userLocationPatterns);
      setSuggestedMatches(matches);
      if (matches.length === 0) {
        toast({
          title: "No AI Matches Found",
          description: "Try adjusting your vibe tags or check back later.",
        });
      }
    } catch (error) {
      console.error("Failed to get AI matches:", error);
      toast({
        title: "Error Finding Matches",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = (userId: string) => {
    toast({ title: "Liked!", description: `You've expressed interest in ${suggestedMatches.find(u => u.id === userId)?.name}.` });
    // Further logic: remove from list, send to matches, etc.
    setSuggestedMatches(prev => prev.filter(u => u.id !== userId));
  };

  const handlePass = (userId: string) => {
    toast({ title: "Passed", description: `You've passed on ${suggestedMatches.find(u => u.id === userId)?.name}.` });
    setSuggestedMatches(prev => prev.filter(u => u.id !== userId));
  };


  return (
    <div className="space-y-8">
      <div className="p-6 border border-border rounded-lg bg-card/50 shadow">
        <Label htmlFor="vibe-tags-input" className="text-lg font-semibold text-foreground">Your Vibe Tags</Label>
        <p className="text-sm text-muted-foreground mb-3">Add tags that describe your interests and personality.</p>
        <div className="flex flex-wrap gap-2 mt-2 mb-3">
          {userVibeTags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-sm capitalize group relative pr-7 py-1.5">
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 p-0.5 rounded-full hover:bg-destructive/20"
                aria-label={`Remove tag ${tag}`}
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 items-center mb-4">
          <Input 
            id="vibe-tags-input"
            placeholder="e.g., adventurous, foodie, techy" 
            value={newTag} 
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); }}}
            className="bg-input flex-grow"
          />
          <Button type="button" onClick={handleAddTag} variant="outline" size="icon" aria-label="Add vibe tag">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>
        <Button onClick={handleFindMatches} disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-5 w-5" />
          )}
          Find Vibe Matches
        </Button>
      </div>

      {isLoading && (
        <div className="text-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Finding your vibe matches...</p>
        </div>
      )}

      {!isLoading && suggestedMatches.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center text-foreground">AI Suggested Matches</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedMatches.map(user => (
              <AiMatchCard key={user.id} user={user} onLike={handleLike} onPass={handlePass} />
            ))}
          </div>
        </div>
      )}

      {!isLoading && suggestedMatches.length === 0 && !isLoading && (
         <div className="text-center py-10 border-2 border-dashed border-muted-foreground/50 rounded-lg mt-8">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl font-medium text-muted-foreground">No AI suggestions right now.</p>
            <p className="text-sm text-muted-foreground">Adjust your vibe tags or try again later.</p>
        </div>
      )}
    </div>
  );
}
