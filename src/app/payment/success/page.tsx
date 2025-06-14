
"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReactConfetti from 'react-confetti';
import { useState } from 'react';


export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      // In a real app, you might want to verify this session ID with your backend
      // and update the user's subscription status.
      console.log("Payment successful, Stripe session ID:", sessionId);
      toast({
        title: "Payment Successful!",
        description: "Welcome to Crossd+! Your premium features are now active.",
        duration: 5000,
      });
      setShowConfetti(true);
      
      const timer = setTimeout(() => setShowConfetti(false), 7000); // Confetti for 7 seconds
      return () => clearTimeout(timer);

    } else {
      // If no session_id, redirect or show an error.
      // For now, just a log and a generic message.
      console.warn("No session_id found on success page.");
       toast({
        title: "Welcome to Crossd+!",
        description: "Your premium features are now active.",
        variant: "default",
        duration: 5000,
      });
    }
  }, [searchParams, toast, router]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    if (typeof window !== 'undefined') {
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
    return () => {};
  }, []);


  return (
    <AppLayout>
      {showConfetti && windowSize.width > 0 && windowSize.height > 0 && (
         <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 9999, pointerEvents: 'none' }}>
            <ReactConfetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={600}
                gravity={0.15}
            />
        </div>
      )}
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[calc(100vh-var(--header-height,4rem)-2rem-6rem)]">
        <Card className="bg-card shadow-xl w-full max-w-lg text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500 mb-4 animate-pulse">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-green-500">Payment Successful!</CardTitle>
            <CardDescription className="text-muted-foreground text-lg mt-1">
              Welcome to <Sparkles className="inline-block h-5 w-5 text-primary mb-1" /> Crossd+!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">
              Your subscription is now active. You can enjoy all the premium features, including unlimited likes, seeing who likes you, and more!
            </p>
            <p className="text-sm text-muted-foreground">
              You will also receive a confirmation email shortly.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pt-6 border-t">
            <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/dashboard">
                Go to Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/profile">
                View My Profile
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
