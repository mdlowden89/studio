
'use client';

import { useAuth } from '@/hooks/use-auth';
import { OnboardingForm } from '@/components/onboarding/onboarding-form';
import { Loader2 } from 'lucide-react';
import { CrossdLogoIcon } from '@/components/icons/crossd-logo';

function OnboardingLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-muted-foreground">Loading Your Profile...</p>
    </div>
  );
}

export default function OnboardingPage() {
  const { userProfile, isLoading } = useAuth();

  if (isLoading || !userProfile) {
    return <OnboardingLoading />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
       <header className="py-4 px-6 sm:px-10 md:px-16">
        <div className="w-full flex justify-start items-center">
          <div className="flex items-center gap-2 text-xl font-semibold">
            <CrossdLogoIcon className="h-8 w-8 text-primary" />
            <span>Crossd</span>
          </div>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <OnboardingForm user={userProfile} />
      </main>
    </div>
  );
}
