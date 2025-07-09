
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import type { Moment as MomentType, UserProfile } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MapPin, CalendarDays, ImageOff, Loader2, AlertTriangle, Repeat, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { fetchPlacePhoto, replayMoment } from '@/app/actions'; 
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface MomentGalleryItemProps {
  moment: MomentType;
  userProfile: UserProfile | null;
}

const statusIndicator = {
  pending: { icon: AlertCircle, color: 'text-amber-400', label: 'Pending' },
  confirmed: { icon: CheckCircle, color: 'text-green-400', label: 'Confirmed' },
  rejected: { icon: XCircle, color: 'text-destructive', label: 'Rejected' },
};

export function MomentGalleryItem({ moment, userProfile }: MomentGalleryItemProps) {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [attributionHtml, setAttributionHtml] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [isReplaying, setIsReplaying] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    async function loadPhoto() {
      if (!moment.placeName) {
        setError("Place name is missing for this moment.");
        setErrorCode('NO_PLACE_NAME');
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        setErrorCode(null); // Reset error code
        const result = await fetchPlacePhoto(moment.placeName, moment.coordinates);
        
        if (result.error) {
          console.warn(`MomentGalleryItem: Error fetching photo for "${moment.placeName}" (Moment ID: ${moment.id}). Code: ${result.error}`);
          setErrorCode(result.error);
          switch (result.error) {
            case 'API_KEY_MISSING':
              setError("Google API Key is missing from server .env.");
              break;
            case 'API_KEY_INVALID':
              setError("Google API Key is invalid or not authorized for Places API.");
              break;
            case 'NO_PLACE_FOUND':
              setError(`Could not find "${moment.placeName}" on Google Places.`);
              break;
            case 'NO_PHOTO_FOR_PLACE':
              setError(`No photo available for "${moment.placeName}".`);
              break;
            case 'FETCH_FAILED':
              setError("Failed to communicate with Google Places API. Check Genkit server logs.");
              break;
            default:
              setError(`Could not load photo. Error: ${result.error}`);
              break;
          }
        } else if (result.photoUrl) {
          setPhotoUrl(result.photoUrl);
          setAttributionHtml(result.attributionHtml);
        } else {
          setError(`No photo found for "${moment.placeName}".`);
          setErrorCode('NO_PHOTO_FALLBACK');
        }
      } catch (err: any) {
        console.error(`MomentGalleryItem: Client-side error calling fetchPlacePhoto for "${moment.placeName}":`, err.message ? err.message : err);
        setError("Failed to fetch photo due to a client-server communication issue.");
        setErrorCode('CLIENT_FETCH_ERROR');
      } finally {
        setIsLoading(false);
      }
    }
    loadPhoto();
  }, [moment.placeName, moment.coordinates, moment.id]);

  const momentDate = new Date(moment.loggedAt as string);
  const replaysAvailable = userProfile?.echoReplaysAvailable || 0;
  const isReplayable = moment.status === 'rejected' && !moment.replayed;
  const StatusIcon = statusIndicator[moment.status].icon;

  const handleReplay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userProfile) return;
    setIsReplaying(true);
    const result = await replayMoment(userProfile.id, moment.id);
    if (result.success) {
      toast({
        title: "Moment Replayed!",
        description: "A notification has been sent, giving you a second chance.",
      });
      router.refresh();
    } else {
      toast({
        title: "Replay Failed",
        description: result.error || "Could not replay the moment.",
        variant: "destructive",
      });
    }
    setIsReplaying(false);
  };

  return (
    <Card className="bg-card/60 hover:shadow-primary/20 transition-shadow duration-300 flex flex-col overflow-hidden">
      <div className="relative w-full aspect-[4/3] bg-muted flex items-center justify-center">
        {isLoading && <Loader2 className="h-8 w-8 text-primary animate-spin" />}
        {!isLoading && photoUrl && (
          <Image
            src={photoUrl}
            alt={`Photo of ${moment.placeName}`}
            layout="fill"
            objectFit="cover"
            data-ai-hint="place photo"
          />
        )}
        {!isLoading && !photoUrl && (
          <div className="flex flex-col items-center justify-center text-center p-3 text-muted-foreground h-full">
            {(errorCode === 'API_KEY_MISSING' || errorCode === 'API_KEY_INVALID') ? (
               <>
                <AlertTriangle className="h-8 w-8 mb-2 text-destructive" />
                <p className="text-sm font-semibold text-destructive">Configuration Error</p>
                <p className="text-xs mt-1">
                  The Google API key is missing or invalid. Check your <code>.env</code> file.
                </p>
               </>
            ) : (
               <>
                <ImageOff className="h-8 w-8 mb-1" />
                <span className="text-xs">{error || "Photo not available"}</span>
               </>
            )}
          </div>
        )}
         <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            <StatusIcon className={cn("w-3.5 h-3.5", statusIndicator[moment.status].color)} />
            <span>{statusIndicator[moment.status].label}</span>
         </div>
      </div>
      <CardContent className="p-3 flex-grow">
        <h3 className="font-semibold text-base text-foreground truncate flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-primary shrink-0" />
          {moment.placeName}
        </h3>
        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          <CalendarDays className="w-3 h-3 shrink-0" />
          {format(momentDate, "MMM d, yyyy")} - {format(momentDate, "p")}
        </p>
      </CardContent>
      <CardFooter className="p-2 pt-0 flex flex-col items-stretch gap-2">
        {isReplayable && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  disabled={replaysAvailable < 1 || isReplaying}
                  onClick={handleReplay}
                >
                  {isReplaying ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Repeat className="mr-2 h-4 w-4" />
                  )}
                  Replay ({replaysAvailable})
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{replaysAvailable > 0 ? 'Use one of your Echo Replays' : 'You have no Echo Replays left'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {attributionHtml && !error && photoUrl && (
          <div className="text-center text-[10px] text-muted-foreground/70 bg-black/20 p-1 rounded-sm" dangerouslySetInnerHTML={{ __html: attributionHtml }} />
        )}
      </CardFooter>
    </Card>
  );
}
