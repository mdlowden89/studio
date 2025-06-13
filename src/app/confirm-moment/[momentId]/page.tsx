
"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { getCurrentUser, MOCK_USERS, MOCK_USER_ID } from "@/lib/mock-data"; 
import { CheckCircle, HelpCircle, Sparkles, ThumbsUp, ThumbsDown, MapPin, Clock, Palette, Users as UsersIcon, User as UserIcon, Eye } from "lucide-react"; // Added Eye
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"; // Added Badge
import { format } from "date-fns";
import { useState } from "react"; // Added useState

// Mock data for the moment User A logged about User B (the current user)
// In a real app, this would be fetched based on params.momentId
const MOCK_LOGGED_MOMENT_DETAILS = {
  placeName: "The Alchemist's Cafe",
  timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // Approx 2 hours ago
  userADescriptionOfUserB: { // What User A observed about User B
    ethnicity: "White/Caucasian", 
    hairColour: "Brown",        
    otherDetails: "They were reading 'The Midnight Library' and had a friendly smile.",
  },
  userA_momentDescription: "It was a cozy evening, and I noticed someone interesting by the window.", // User A's general comment about the moment
  userA_id: "user-1" // ID of user A who logged the moment
};

export default function ConfirmMomentPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const currentUserB = getCurrentUser(); // This is User B for this demo
  const [showUserAHint, setShowUserAHint] = useState(false);

  const momentId = params.momentId as string;
  const loggedMoment = MOCK_LOGGED_MOMENT_DETAILS; 
  const userA = MOCK_USERS.find(u => u.id === loggedMoment.userA_id);

  const handleConfirmMatch = () => {
    if (!userA) return;
    toast({
      title: "Match Confirmed!",
      description: `Great! You and ${userA.name} both acknowledged this moment.`,
      duration: 3000,
    });
    router.push(`/match-confirmed/${userA.id}`);
  };

  const handleDenyMatch = () => {
    toast({
      title: "Not a Match",
      description: "No problem! Thanks for letting us know.",
      variant: "default",
    });
    router.push("/dashboard");
  };

  const handleShowHint = () => {
    setShowUserAHint(true);
  };

  if (!userA) {
    return (
        <AppLayout>
            <div className="container mx-auto py-8 text-center">
                <p>Error: Could not load moment details. User A not found.</p>
            </div>
        </AppLayout>
    );
  }

  const momentDate = new Date(loggedMoment.timestamp);
  const userABioSnippet = userA.bio.split('.').slice(0, 1).join('.') + (userA.bio.includes('.') ? '.' : '');


  return (
    <AppLayout>
      <div className="container mx-auto py-8 max-w-2xl">
        <Card className="bg-card shadow-xl">
          <CardHeader className="text-center border-b pb-4">
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-2 animate-pulse" />
            <CardTitle className="text-3xl font-bold">Did Your Paths Cross?</CardTitle>
            <CardDescription className="text-muted-foreground text-lg mt-1">
              Someone noticed you! Review the details below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="flex flex-col items-center space-y-3 p-4 bg-muted/30 rounded-lg shadow-sm">
                <Avatar className="h-20 w-20 border-2 border-primary">
                    <AvatarImage src={userA.images[0]} alt={userA.name} data-ai-hint="profile avatar"/>
                    <AvatarFallback>{userA.name.substring(0,1)}</AvatarFallback>
                </Avatar>
                <p className="text-lg text-foreground text-center">
                    <span className="font-semibold text-primary">{userA.name}</span> is wondering if you crossed paths at:
                </p>
            </div>
            
            <div className="p-4 border border-border rounded-lg bg-card/50 space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <p><span className="font-semibold text-foreground">Place:</span> {loggedMoment.placeName}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <p><span className="font-semibold text-foreground">When:</span> Around {format(momentDate, 'p')} on {format(momentDate, 'EEEE, MMM d')}</p>
              </div>
            </div>
            
            <Separator />

            <div>
              <h3 className="text-xl font-semibold mb-2 text-primary flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                How {userA.name} described you:
              </h3>
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
                <h3 className="text-xl font-semibold mb-2 text-primary flex items-center gap-2">
                    <Sparkles className="w-5 h-5" /> 
                    {userA.name}'s Reflection:
                </h3>
                <p className="text-muted-foreground italic bg-muted/30 p-3 rounded-md">
                  &quot;{loggedMoment.userA_momentDescription}&quot;
                </p>
              </div>
            )}

            {showUserAHint && (
                <div className="p-4 border border-primary/50 rounded-lg bg-primary/5 space-y-3 mt-4">
                    <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
                        <Eye className="w-5 h-5" />A little about {userA.name}:
                    </h3>
                    <p className="text-sm text-foreground">
                        <span className="font-medium">Age:</span> {userA.age}
                    </p>
                    {userA.vibeTags && userA.vibeTags.length > 0 && (
                        <div className="text-sm">
                            <span className="font-medium text-foreground">Vibes:</span>
                            <div className="flex flex-wrap gap-1.5 mt-1">
                                {userA.vibeTags.slice(0, 3).map(tag => (
                                    <Badge key={tag} variant="secondary" className="capitalize text-xs">{tag}</Badge>
                                ))}
                            </div>
                        </div>
                    )}
                    {userA.bio && (
                         <p className="text-sm text-foreground">
                            <span className="font-medium">Bio Snippet:</span> <span className="italic text-muted-foreground">&quot;{userABioSnippet}&quot;</span>
                         </p>
                    )}
                </div>
            )}


            <p className="text-sm text-center text-muted-foreground pt-4">
              Does this sound like a moment you experienced? Your profile details will only be fully shared with {userA.name} if you confirm.
            </p>

          </CardContent>
          <CardFooter className="flex flex-col gap-3 pt-6 border-t">
            {!showUserAHint && (
                <Button onClick={handleShowHint} variant="secondary" className="w-full sm:w-auto">
                    <HelpCircle className="mr-2 h-5 w-5" /> Could be me... Show a hint?
                </Button>
            )}
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full">
                <Button onClick={handleDenyMatch} variant="outline" className="w-full sm:w-auto">
                <ThumbsDown className="mr-2 h-5 w-5" /> No, this wasn&apos;t me
                </Button>
                <Button onClick={handleConfirmMatch} className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                <ThumbsUp className="mr-2 h-5 w-5" /> Yes, that sounds like me!
                </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
    
