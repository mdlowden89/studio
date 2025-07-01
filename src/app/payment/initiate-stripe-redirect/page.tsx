
"use client";

import { Suspense } from 'react';
import { InitiateStripeRedirectClient } from '@/components/payment/initiate-stripe-redirect-client';
import { Loader2 } from 'lucide-react';

function RedirectLoading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-6" />
            <h1 className="text-2xl font-semibold mb-2">Connecting to Secure Payment</h1>
            <p className="text-muted-foreground text-center max-w-md">
                Please wait while we establish a secure connection with our payment partner.
            </p>
        </div>
    );
}

export default function InitiateStripeRedirectPage() {
  return (
    <Suspense fallback={<RedirectLoading />}>
      <InitiateStripeRedirectClient />
    </Suspense>
  );
}
