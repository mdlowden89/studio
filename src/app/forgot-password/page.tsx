
"use client";

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CrossdLogoIcon } from '@/components/icons/crossd-logo';
import { useToast } from "@/hooks/use-toast";
import { Loader2, MailCheck, ArrowLeft } from 'lucide-react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email) {
      toast({ title: "Email Required", description: "Please enter your email address.", variant: "destructive" });
      setIsLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      // For security, we show the same message whether the user exists or not.
      // This prevents account enumeration.
      toast({
        title: "Check Your Email",
        description: "If an account exists for that email, a reset link has been sent.",
      });
      setSubmitted(true);
    } catch (error: any) {
      console.error("Password reset error:", error);
      // Still show a success-like message to the user.
      toast({
        title: "Check Your Email",
        description: "If an account exists for that email, a reset link has been sent.",
      });
      setSubmitted(true);
    } finally {
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
          {submitted ? (
            <>
              <CardHeader className="text-center">
                <MailCheck className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <CardTitle className="text-3xl font-bold">Check Your Email</CardTitle>
                <CardDescription>
                  If an account with <span className="font-semibold text-foreground">{email}</span> exists, a password reset link has been sent.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground text-sm">
                  Follow the instructions in the email to reset your password. The link will expire after a short time.
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                 <Button asChild>
                    <Link href="/login-form">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                    </Link>
                 </Button>
              </CardFooter>
            </>
          ) : (
            <>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Forgot Password?</CardTitle>
                <CardDescription>No problem. Enter your email and we'll send you a link to reset it.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleResetRequest}>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="you@example.com" 
                      required 
                      className="mt-1 bg-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Link href="/login-form" className="text-sm text-muted-foreground hover:text-primary hover:underline">
                  Remembered your password? Log in
                </Link>
              </CardFooter>
            </>
          )}
        </Card>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 sm:px-10 md:px-16 border-t border-border text-sm text-muted-foreground">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; 2025 Crossd. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
