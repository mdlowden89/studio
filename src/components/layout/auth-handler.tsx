
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { AppLayout } from './app-layout';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

const PROTECTED_ROUTES = ['/dashboard', '/profile', '/chat', '/moments', '/log-moment', '/discover', '/confirm-moment', '/match-confirmed', '/payment', '/mbti-quiz'];
const AUTH_ROUTES = ['/login-form', '/signup'];

function GlobalLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-muted-foreground">Loading...</p>
    </div>
  );
}

// A more specific loader for protected routes to avoid layout shifts
function ProtectedRouteLoader({children} : {children: React.ReactNode}) {
    return (
        <AppLayout>
            <div className="container mx-auto py-8 flex justify-center items-center min-h-[calc(100vh-12rem)]">
                <div className="text-center">
                    <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
                    <p className="text-xl mt-4 text-muted-foreground">{children}</p>
                </div>
            </div>
        </AppLayout>
    )
}


export function AuthHandler({ children }: { children: React.ReactNode }) {
  const { user, userProfile, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    if (isLoading) {
      return; // Wait for the auth state to be resolved
    }

    const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
    const isAuthRoute = AUTH_ROUTES.includes(pathname);

    // This state indicates a user authenticated with Firebase Auth
    // but lacks a corresponding profile document in Firestore.
    // This can happen if the signup process is interrupted. We sign them out
    // and ask them to sign up again to create the missing profile.
    if (user && !userProfile && !isAuthRoute) {
        auth.signOut();
        router.push('/signup');
        toast({
            title: "Account Incomplete",
            description: "Your account exists, but your profile is missing. Please sign up again to complete the process.",
            variant: "destructive",
            duration: 8000,
        });
        return;
    }


    if (!user && isProtectedRoute) {
      // If the user is not logged in and tries to access a protected route,
      // redirect them to the login page.
      router.push('/login-form');
    }

    if (user && userProfile && isAuthRoute) {
      // If the user is logged in and has a profile, and tries to access the login or sign-up page,
      // redirect them to the dashboard.
      router.push('/dashboard');
    }
  }, [user, userProfile, isLoading, pathname, router, toast]);

  // While the auth state is loading for the first time, show a loader.
  // This prevents brief flashes of content.
  if (isLoading) {
    const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route));
    const isAuthRoute = AUTH_ROUTES.includes(pathname);

    if (isProtectedRoute) {
        return <ProtectedRouteLoader>Authenticating...</ProtectedRouteLoader>
    }
    if (isAuthRoute || pathname === '/') {
        return <GlobalLoader />
    }
  }

  return <>{children}</>;
}
