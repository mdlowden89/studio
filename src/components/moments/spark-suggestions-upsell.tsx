
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CrossdPlusUpsellDialog } from "@/components/pricing/crossd-plus-upsell-dialog";
import { Sparkles, Star } from "lucide-react";

export function SparkSuggestionsUpsell() {
    const [showUpsellDialog, setShowUpsellDialog] = useState(false);

    return (
        <div className="text-center p-8 bg-gradient-to-br from-yellow-500/10 via-card to-card rounded-lg shadow-xl border border-yellow-500/30">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/20 mb-6 border-4 border-yellow-500/30">
                <Sparkles className="h-10 w-10 text-yellow-400 animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-yellow-400 mb-3">Unlock Spark Suggestions</h2>
            <p className="text-muted-foreground max-w-md mb-6 mx-auto">
                Go where your vibe thrives. Upgrade to Crossd+ to get personalized recommendations for places to visit, curated just for you by our AI.
            </p>
            <Button onClick={() => setShowUpsellDialog(true)} size="lg" className="bg-yellow-500 hover:bg-yellow-500/90 text-black">
                <Star className="mr-2 h-5 w-5" />
                Upgrade to Crossd+
            </Button>

            <CrossdPlusUpsellDialog 
                isOpen={showUpsellDialog}
                onOpenChange={setShowUpsellDialog}
            />
        </div>
    );
}
