
"use client";

import Link from 'next/link';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ShoppingCart } from 'lucide-react';

export default function PaymentCancelPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[calc(100vh-var(--header-height,4rem)-2rem-6rem)]">
        <Card className="bg-card shadow-xl w-full max-w-lg text-center">
          <CardHeader className="pb-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive mb-4">
              <XCircle className="h-10 w-10 text-destructive-foreground" />
            </div>
            <CardTitle className="text-3xl font-bold text-destructive">Payment Cancelled</CardTitle>
            <CardDescription className="text-muted-foreground text-lg mt-1">
              Your Crossd+ subscription process was cancelled.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">
              It looks like you decided not to complete the subscription at this time. Your payment was not processed.
            </p>
            <p className="text-sm text-muted-foreground">
              If you change your mind, you can always try subscribing again from your dashboard or profile.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pt-6 border-t">
            <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/discover">
                <ShoppingCart className="mr-2 h-5 w-5" /> Explore Features
              </Link>
            </Button>
             <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/dashboard">
                Back to Dashboard
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
