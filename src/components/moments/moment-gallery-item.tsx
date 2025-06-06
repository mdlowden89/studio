
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import type { Moment as MomentType } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MapPin, CalendarDays, ImageOff, Loader2, AlertTriangle } from 'lucide-react';
import { fetchPlacePhoto } from '@/app/actions'; 

interface MomentGalleryItemProps {
  moment: MomentType;
}

export function MomentGalleryItem({ moment }: MomentGalleryItemProps) {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [attributionHtml, setAttributionHtml] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

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
        setErrorCode(null);
        const result = await fetchPlacePhoto(moment.placeName, moment.coordinates);
        
        if (result.error) {
          console.warn(`Error fetching photo for ${moment.placeName}: ${result.error}`);
          setErrorCode(result.error);
          if (result.error === 'API_KEY_MISSING' || result.error === 'API_KEY_INVALID') {
            setError("Google Places API Key is missing or invalid. Please check server configuration.");
          } else if (result.error === 'NO_PLACE_FOUND') {
            setError(`Could not find "${moment.placeName}" on Google Places.`);
          } else if (result.error === 'NO_PHOTO_FOR_PLACE') {
            setError(`No photo available for "${moment.placeName}".`);
          } else {
            setError("Could not load photo for this place.");
          }
        } else if (result.photoUrl) {
          setPhotoUrl(result.photoUrl);
          setAttributionHtml(result.attributionHtml);
        } else {
          // Should be caught by result.error, but as a fallback:
          setError(`No photo found for "${moment.placeName}".`);
          setErrorCode('NO_PHOTO_FALLBACK');
        }
      } catch (err) {
        console.error("Client-side error calling fetchPlacePhoto:", err);
        setError("Failed to fetch photo due to a client-server communication issue.");
        setErrorCode('CLIENT_FETCH_ERROR');
      } finally {
        setIsLoading(false);
      }
    }
    loadPhoto();
  }, [moment.placeName, moment.coordinates, moment.id]); // Added moment.id to deps for safety if moment object itself changes

  const momentDate = new Date(moment.timestamp);

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
          <div className="flex flex-col items-center text-center p-2 text-muted-foreground">
            {errorCode === 'API_KEY_MISSING' || errorCode === 'API_KEY_INVALID' ? (
              <AlertTriangle className="h-8 w-8 mb-1 text-destructive" />
            ) : (
              <ImageOff className="h-8 w-8 mb-1" />
            )}
            <span className="text-xs">{error || "Photo not available"}</span>
          </div>
        )}
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
      {attributionHtml && !error && ( // Only show attribution if there's no error and html exists
        <CardFooter className="p-2 text-center text-[10px] text-muted-foreground/70 bg-black/20">
          <div dangerouslySetInnerHTML={{ __html: attributionHtml }} />
        </CardFooter>
      )}
    </Card>
  );
}
