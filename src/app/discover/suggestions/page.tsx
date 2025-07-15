
'use client';

import { Suspense } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { useAuth } from '@/hooks/use-auth';
import { SparkSuggestionsClient } from '@/components/discover/spark-suggestions-client';
import { Loader2 } from 'lucide-react';
import { CrossdPlusUpsellDialog } from '@/components/pricing/crossd-plus-upsell-dialog';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Star } from 'lucide-react';

function SuggestionsLoading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="ml-2 text-muted-foreground">Loading Your Suggestions...</p>
    </div>
  );
}

function PremiumUpsell() {
    const [showUpsellDialog, setShowUpsellDialog] = useState(false);
    
    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-card rounded-lg shadow-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 mb-6 border-4 border-primary/30">
                <Sparkles className="h-10 w-10 text-primary animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-3">Unlock Spark Suggestions</h2>
            <p className="text-muted-foreground max-w-md mb-6">
                Go where your vibe thrives. Upgrade to Crossd+ to get personalized recommendations for places to visit, curated just for you by our AI.
            </p>
            <Button onClick={() => setShowUpsellDialog(true)} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
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

export default function SparkSuggestionsPage() {
  const { userProfile, isLoading } = useAuth();
  
  const isPremium = userProfile?.subscription?.status === 'active';

  if (isLoading) {
    return (
        <AppLayout>
            <SuggestionsLoading />
        </AppLayout>
    );
  }

  return (
    <AppLayout>
        <Suspense fallback={<SuggestionsLoading />}>
            {isPremium ? <SparkSuggestionsClient /> : <PremiumUpsell />}
        </Suspense>
    </AppLayout>
  );
}
