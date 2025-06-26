
"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, HelpCircle, Sparkles, ThumbsUp, ThumbsDown, MapPin, Clock, Palette, Users as UsersIcon, User as UserIcon, Eye, Image as ImageIcon, Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"; 
import { format } from "date-fns";
import { useState, useEffect } from "react"; 
import { useAuth } from "@/hooks/use-auth";
import type { Moment, UserProfile } from "@/lib/types";
import { fetchMomentForConfirmation, confirmMomentMatch, denyMomentMatch } from "@/app/actions";

export default function ConfirmMomentPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { userProfile: currentUser, isLoading: isAuthLoading } = useAuth();

  const [isLoadingMoment, setIsLoadingMoment] = useState(true);
  const [moment, setMoment] = useState<Moment | null>(null);
  const [logger, setLogger] = useState<UserProfile | null>(null);

  const [showUserAHint, setShowUserAHint] = useState(false);
  const [formattedMomentTime, setFormattedMomentTime] = useState<string>("");

  const momentId = params.momentId as string;

  useEffect(() => {
    if (!momentId) return;

    const getMomentDetails = async () => {
      setIsLoadingMoment(true);
      const data = await fetchMomentForConfirmation(momentId);
      if (data) {
        setMoment(data.moment);
        setLogger(data.logger);
        if (data.moment.loggedAt) {
          const date = new Date(data.moment.loggedAt as string);
          setFormattedMomentTime(format(date, 'p'));
        }
      } else {
        toast({ title: "Error", description: "Could not load moment details.", variant: "destructive" });
      }
      setIsLoadingMoment(false);
    };

    getMomentDetails();
  }, [momentId, toast]);

  const handleConfirmMatch = async () => {
    if (!logger || !currentUser) return;
    const result = await confirmMomentMatch(momentId, currentUser.id);
    if (result.success && result.loggerId) {
      toast({
        title: "Match Confirmed!",
        description: `Great! You and ${logger.name.split(' ')[0]} both acknowledged this moment.`,
        duration: 3000,
      });
      router.push(`/match-confirmed/${result.loggerId}?chatId=${result.chatId}`);
    } else {
       toast({ title: "Error", description: "Could not confirm the match. Please try again.", variant: "destructive"});
    }
  };

  const handleDenyMatch = async () => {
    const result = await denyMomentMatch(momentId);
     if (result.success) {
        toast({
            title: "Not a Match",
            description: "No problem! Thanks for letting us know.",
            variant: "default",
        });
        router.push("/dashboard");
     } else {
        toast({ title: "Error", description: "Could not deny the match. Please try again.", variant: "destructive"});
     }
  };

  const handleShowHint = () => {
    setShowUserAHint(true);
  };

  if (isAuthLoading || isLoadingMoment) {
    return (
      <AppLayout>
          <div className="container mx-auto py-8 flex justify-center items-center h-full">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
      </AppLayout>
    );
  }

  if (!logger || !moment || !currentUser) {
    return (
        <AppLayout>
            <div className="container mx-auto py-8 text-center">
                <p>Error: Could not load moment details. Data not found.</p>
                 <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
            </div>
        </AppLayout>
    );
  }

  const momentDate = new Date(moment.loggedAt as string);
  const loggerBioSnippet = logger.bio.split('.').slice(0, 1).join('.') + (logger.bio.includes('.') ? '.' : '');

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
                    <AvatarImage src={logger.images[0]} alt={logger.name} data-ai-hint="profile avatar"/>
                    <AvatarFallback>{logger.name.substring(0,1)}</AvatarFallback>
                </Avatar>
                <p className="text-lg text-foreground text-center">
                    <span className="font-semibold text-primary">{logger.name.split(' ')[0]}</span> is wondering if you crossed paths at:
                </p>
            </div>
            
            <div className="p-4 border border-border rounded-lg bg-card/50 space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                <p><span className="font-semibold text-foreground">Place:</span> {moment.placeName}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <p><span className="font-semibold text-foreground">When:</span> Around {formattedMomentTime ? formattedMomentTime : "..."} on {format(momentDate, 'EEEE, MMM d')}</p>
              </div>
            </div>
            
            <Separator />

            <div>
              <h3 className="text-xl font-semibold mb-2 text-primary flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                How {logger.name.split(' ')[0]} described you:
              </h3>
              <ul className="space-y-2 list-disc list-inside text-muted-foreground pl-2">
                {moment.descriptors.ethnicity && moment.descriptors.ethnicity !== 'Prefer not to describe' && (
                  <li className="flex items-start gap-2">
                    <UsersIcon className="w-5 h-5 text-foreground/70 mt-0.5 shrink-0" />
                    <span>They thought your ethnicity might be <span className="font-medium text-foreground/90">{moment.descriptors.ethnicity}</span>.</span>
                  </li>
                )}
                {moment.descriptors.hairColour && moment.descriptors.hairColour !== 'Prefer not to describe' && (
                  <li className="flex items-start gap-2">
                    <Palette className="w-5 h-5 text-foreground/70 mt-0.5 shrink-0" />
                    <span>They noticed your hair colour as <span className="font-medium text-foreground/90">{moment.descriptors.hairColour}</span>.</span>
                  </li>
                )}
                 {moment.descriptors.otherDetails && (
                  <li className="flex items-start gap-2">
                     <HelpCircle className="w-5 h-5 text-foreground/70 mt-0.5 shrink-0" />
                    <span>Other details: <span className="italic text-foreground/90">&quot;{moment.descriptors.otherDetails}&quot;</span></span>
                  </li>
                )}
              </ul>
            </div>

            {moment.momentDescription && (
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary flex items-center gap-2">
                    <Sparkles className="w-5 h-5" /> 
                    {logger.name.split(' ')[0]}'s Reflection:
                </h3>
                <p className="text-muted-foreground italic bg-muted/30 p-3 rounded-md">
                  &quot;{moment.momentDescription}&quot;
                </p>
              </div>
            )}

            {showUserAHint && (
                <div className="p-4 border border-primary/50 rounded-lg bg-primary/5 space-y-4 mt-4">
                    <div className="flex items-center gap-2">
                        <Eye className="w-6 h-6 text-primary" />
                        <h3 className="text-lg font-semibold text-primary">A little about {logger.name.split(' ')[0]}:</h3>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                        {logger.images && logger.images.length > 0 && (
                            <Avatar className="h-24 w-24 border-2 border-primary/50 flex-shrink-0">
                                <AvatarImage src={logger.images[0]} alt={logger.name} data-ai-hint="profile avatar hint"/>
                                <AvatarFallback>{logger.name.substring(0,1)}</AvatarFallback>
                            </Avatar>
                        )}
                        <div className="space-y-2 text-sm text-center sm:text-left">
                            <p className="text-foreground">
                                <span className="font-medium">Age:</span> {logger.age}
                            </p>
                            {logger.vibeTags && logger.vibeTags.length > 0 && (
                                <div>
                                    <span className="font-medium text-foreground">Vibes:</span>
                                    <div className="flex flex-wrap gap-1.5 mt-1 justify-center sm:justify-start">
                                        {logger.vibeTags.slice(0, 3).map(tag => (
                                            <Badge key={tag} variant="secondary" className="capitalize text-xs">{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {logger.bio && (
                                <p className="text-foreground">
                                    <span className="font-medium">Bio Snippet:</span> <span className="italic text-muted-foreground">&quot;{loggerBioSnippet}&quot;</span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}


            <p className="text-sm text-center text-muted-foreground pt-4">
              Does this sound like a moment you experienced? Your profile details will only be fully shared with {logger.name.split(' ')[0]} if you confirm.
            </p>

          </CardContent>
          <CardFooter className="flex flex-col gap-3 pt-6 border-t">
            {!showUserAHint && (
                <Button onClick={handleShowHint} variant="secondary" className="w-full sm:w-auto">
                    <HelpCircle className="mr-2 h-5 w-5" /> Could be me... Show a hint?
                </Button>
            )}
            <div className="flex flex-col sm:flex-row justify-center gap-3 w-full">
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
