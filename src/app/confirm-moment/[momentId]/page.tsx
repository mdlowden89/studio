
"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser, MOCK_USERS } from "@/lib/mock-data"; // Assuming MOCK_USER_ID is User B for this demo
import { CheckCircle, HelpCircle, Sparkles, ThumbsUp, ThumbsDown, MapPin, Clock, Palette, Users as UsersIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

// Mock data for the moment User A logged about User B (the current user)
// In a real app, this would be fetched based on params.momentId
const MOCK_LOGGED_MOMENT_DETAILS = {
  placeName: "The Alchemist's Cafe",
  timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // Approx 2 hours ago
  userADescriptionOfUserB: {
    ethnicity: "White/Caucasian", // Example: User A saw someone they thought was White/Caucasian
    hairColour: "Brown",        // Example: User A saw someone with brown hair
    otherDetails: "They were reading 'The Midnight Library' and had a friendly smile.",
  },
  userA_momentDescription: "It was a cozy evening, and I noticed someone interesting by the window.",
  userA_id: "user-1" // ID of user A who logged the moment
};

export default function ConfirmMomentPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const currentUserB = getCurrentUser(); // This is User B for this demo

  // Simulate fetching moment details based on params.momentId
  const momentId = params.momentId as string;
  const loggedMoment = MOCK_LOGGED_MOMENT_DETAILS; // Use mock data

  const handleConfirmMatch = () => {
    toast({
      title: "Match Confirmed!",
      description: `Great! You can now connect with ${MOCK_USERS.find(u => u.id === loggedMoment.userA_id)?.name || 'them'}.`,
      duration: 5000,
    });
    // In a real app, this would trigger backend logic and potentially navigate to a chat
    // For now, let's navigate to the dashboard.
    router.push("/dashboard");
  };

  const handleDenyMatch = () => {
    toast({
      title: "Not a Match",
      description: "No problem! Thanks for letting us know.",
      variant: "default",
    });
    router.push("/dashboard");
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-8 max-w-2xl">
        <Card className="bg-card shadow-xl">
          <CardHeader className="text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-3 animate-pulse" />
            <CardTitle className="text-3xl font-bold">Did Your Paths Cross?</CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              Someone noticed you! Review the details below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 border border-border rounded-lg bg-muted/30 space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <p><span className="font-semibold text-foreground">Place:</span> {loggedMoment.placeName}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <p><span className="font-semibold text-foreground">When:</span> Around {new Date(loggedMoment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} on {new Date(loggedMoment.timestamp).toLocaleDateString([], { weekday: 'long' })}</p>
              </div>
            </div>
            
            <Separator />

            <div>
              <h3 className="text-xl font-semibold mb-2 text-primary">How they described you:</h3>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground pl-2">
                {loggedMoment.userADescriptionOfUserB.ethnicity && (
                  <li className="flex items-start gap-2">
                    <UsersIcon className="w-5 h-5 text-foreground/70 mt-0.5 shrink-0" />
                    <span>They thought your ethnicity might be <span className="font-medium text-foreground/90">{loggedMoment.userADescriptionOfUserB.ethnicity}</span>.</span>
                  </li>
                )}
                {loggedMoment.userADescriptionOfUserB.hairColour && (
                  <li className="flex items-start gap-2">
                    <Palette className="w-5 h-5 text-foreground/70 mt-0.5 shrink-0" />
                    <span>They noticed your hair colour as <span className="font-medium text-foreground/90">{loggedMoment.userADescriptionOfUserB.hairColour}</span>.</span>
                  </li>
                )}
                 {loggedMoment.userADescriptionOfUserB.otherDetails && (
                  <li className="flex items-start gap-2">
                     <HelpCircle className="w-5 h-5 text-foreground/70 mt-0.5 shrink-0" />
                    <span>Other details: <span className="italic text-foreground/90">&quot;{loggedMoment.userADescriptionOfUserB.otherDetails}&quot;</span></span>
                  </li>
                )}
              </ul>
            </div>

            {loggedMoment.userA_momentDescription && (
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Their experience:</h3>
                <p className="text-muted-foreground italic bg-muted/30 p-3 rounded-md">
                  &quot;{loggedMoment.userA_momentDescription}&quot;
                </p>
              </div>
            )}

            <p className="text-sm text-center text-muted-foreground pt-2">
              Does this sound like a moment you experienced? Your profile details will only be shared if you confirm.
            </p>

          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center gap-4 pt-6 border-t">
            <Button onClick={handleDenyMatch} variant="outline" className="w-full sm:w-auto">
              <ThumbsDown className="mr-2 h-5 w-5" /> No, this wasn&apos;t me
            </Button>
            <Button onClick={handleConfirmMatch} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              <ThumbsUp className="mr-2 h-5 w-5" /> Yes, that sounds like me!
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
