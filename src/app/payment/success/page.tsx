
import { Suspense } from 'react';
import { PaymentSuccessClient } from '@/components/payment/payment-success-client';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

function SuccessLoading() {
    return (
        <AppLayout>
            <div className="container mx-auto py-12 flex justify-center items-center min-h-[calc(100vh-var(--header-height,4rem)-2rem-6rem)]">
                <Card className="bg-card shadow-xl w-full max-w-lg text-center">
                    <CardHeader className="pb-4">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-500/50 mb-4">
                            <Loader2 className="h-10 w-10 text-white animate-spin" />
                        </div>
                        <CardTitle className="text-3xl font-bold text-green-500">Processing Payment...</CardTitle>
                        <CardDescription className="text-muted-foreground text-lg mt-1">
                            Finalizing your Crossd+ subscription.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-foreground">
                           Please wait a moment while we confirm your payment details.
                        </p>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pt-6 border-t">
                         <Button disabled className="w-full sm:w-auto bg-primary/50 text-primary-foreground">
                            Go to Dashboard
                        </Button>
                        <Button disabled variant="outline" className="w-full sm:w-auto">
                           View My Profile
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<SuccessLoading />} >
      <PaymentSuccessClient />
    </Suspense>
  );
}
