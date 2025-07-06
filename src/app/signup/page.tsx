"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CrossdLogoIcon } from '@/components/icons/crossd-logo';
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile, setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from 'firebase/firestore';
import type { UserProfile, Challenge } from '@/lib/types';
import { MOCK_AVAILABLE_CHALLENGES } from '@/lib/mock-data';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { genderOptions, interestedInOptions } from '@/lib/options';

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get('firstName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const gender = formData.get('gender') as UserProfile['gender'];
    const interestedIn = formData.get('interestedIn') as UserProfile['interestedIn'];

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please check your passwords and try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    if (!firstName || !gender || gender === 'select' || !interestedIn || interestedIn === 'select') {
       toast({
        title: "Incomplete Form",
        description: "Please provide your first name, gender, and who you're interested in.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      await setPersistence(auth, browserSessionPersistence);
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Update the new user's display name in Auth
      await updateProfile(user, { displayName: firstName });
      
      // 3. Create the user's profile document in Firestore
      const initialChallenges: Challenge[] = MOCK_AVAILABLE_CHALLENGES.map(challenge => {
        const isActiveByDefault = challenge.type === 'Streak' || challenge.type === 'Connection' || challenge.type === 'Timed Challenge';
        return {
          ...challenge,
          status: isActiveByDefault ? 'active' : 'not_started',
          progress: challenge.progress
            ? { ...challenge.progress, current: 0 }
            : undefined,
        };
      });

      const newUserProfile: UserProfile = {
        id: user.uid,
        name: firstName,
        email: user.email || "",
        age: 18,
        gender: gender,
        interestedIn: interestedIn,
        bio: "Welcome to Crossd! Tell us about yourself.",
        images: ['https://placehold.co/400x550.png'],
        vibeTags: [],
        prompts: [],
        locationPatterns: [],
        achievements: [],
        challenges: initialChallenges,
        locationServicesEnabled: false,
        onboardingComplete: false,
      };

      await setDoc(doc(db, "users", user.uid), newUserProfile);

      toast({
        title: "Sign Up Successful!",
        description: "Welcome to Crossd! Redirecting to your dashboard...",
      });
      // Redirection is handled by the AuthHandler.

    } catch (error: any) {
      console.error("Sign up error:", error);
      let errorMessage = "Something went wrong. Please try again.";

      if (error.code === 'auth/email-already-in-use') {
        toast({
          title: "Account Already Exists",
          description: "An account with this email is already registered.",
          variant: "destructive",
          action: (
            <ToastAction altText="Log In" asChild>
              <Link href="/login-form">Log In</Link>
            </ToastAction>
          ),
        });
      } else {
        if (error.code === 'auth/weak-password') {
          errorMessage = "The password is too weak. Please use at least 6 characters.";
        } else if (error.code === 'auth/invalid-api-key') {
          errorMessage = "The Firebase API Key is not valid. Please check your .env configuration.";
        }
        toast({
          title: "Sign Up Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="py-4 px-6 sm:px-10 md:px-16">
        <div className="w-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold hover:opacity-80 transition-opacity">
            <CrossdLogoIcon className="h-8 w-8 text-primary" />
            <span>Crossd</span>
          </Link>
          <nav className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/login-form">Login</Link>
            </Button>
            <Button variant="default" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-xl bg-card">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Create Your Account</CardTitle>
            <CardDescription>Join Crossd and start making connections.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4" onSubmit={onSignUp}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" type="text" placeholder="Alex" required className="mt-1 bg-input" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gender">I am a...</Label>
                    <Select name="gender" required>
                        <SelectTrigger id="gender" className="mt-1 bg-input">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          {genderOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                  </div>
                  <div>
                    <Label htmlFor="interestedIn">Looking for...</Label>
                    <Select name="interestedIn" required>
                        <SelectTrigger id="interestedIn" className="mt-1 bg-input">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent className="bg-popover">
                          {interestedInOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required className="mt-1 bg-input" />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="•••••••• (min. 6 characters)"
                    required
                    className="mt-1 bg-input pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 top-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    className="mt-1 bg-input pr-10"
                  />
                   <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 top-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing Up...
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login-form" className="font-medium text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 sm:px-10 md:px-16 border-t border-border text-sm text-muted-foreground">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; 2024 Crossd. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
