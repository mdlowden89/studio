"use client";

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Initialize Stripe.js. Replace with your actual publishable key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function InitiateStripeRedirectClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [message, setMessage] = useState("Processing your request...");

  useEffect(() => {
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      setMessage("Error: Checkout session ID is missing. Redirecting...");
      toast({
        title: "Checkout Error",
        description: "Session ID not found. Please try upgrading again.",
        variant: "destructive",
      });
      setTimeout(() => router.push('/discover'), 3000); // Redirect to discover or dashboard
      return;
    }

    let isMounted = true; // Track mounted state to prevent updates on unmounted component

    async function redirectToStripeCheckout() {
      setMessage("Connecting to Stripe secure checkout...");
      const stripe = await stripePromise;
      if (!stripe) {
        if (isMounted) {
          setMessage("Error: Could not connect to Stripe. Please try again.");
          toast({
            title: "Stripe Connection Error",
            description: "Failed to initialize Stripe. Please check your internet connection and try again.",
            variant: "destructive",
          });
        }
        return;
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe redirect error:", error);
        if (isMounted) {
          setMessage(`Error: ${error.message || "Could not redirect to Stripe."} Please try again.`);
          toast({
            title: "Payment Redirect Error",
            description: error.message || "Could not redirect to Stripe. Please try upgrading again.",
            variant: "destructive",
          });
        }
      }
    }

    redirectToStripeCheckout();

    return () => {
      isMounted = false; // Cleanup function to set mounted state to false
    };

  }, [searchParams, router, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-6" />
      <h1 className="text-2xl font-semibold mb-2">Redirecting to Secure Payment</h1>
      <p className="text-muted-foreground text-center max-w-md">
        {message}
      </p>
      <p className="text-xs text-muted-foreground mt-8">
        You will be automatically redirected to Stripe's secure checkout page. 
        If you are not redirected, please check your connection or try again.
      </p>
    </div>
  );
}