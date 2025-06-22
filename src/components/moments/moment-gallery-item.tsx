
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
    // If a specific image is provided in the moment data, use it directly.
    if (moment.placeImage) {
      setPhotoUrl(moment.placeImage);
      setIsLoading(false);
      return;
    }

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
          // Set user-friendly error messages based on the error code
          switch (result.error) {
            case 'API_KEY_MISSING':
              setError("Google Places API Key is missing from server .env. Please contact support or check server configuration.");
              break;
            case 'API_KEY_INVALID':
              setError("Google Places API Key is invalid or not authorized. Please check Google Cloud Console and server configuration.");
              break;
            case 'NO_PLACE_FOUND':
              setError(`Could not find "${moment.placeName}" on Google Places. Check the spelling or try a more specific name.`);
              break;
            case 'NO_PHOTO_FOR_PLACE':
              setError(`No photo available for "${moment.placeName}" via Google Places API.`);
              break;
            case 'FETCH_FAILED':
              setError("Failed to communicate with Google Places API. Check network or Genkit server logs.");
              break;
            default: // Handles PLACES_API_ERROR, ACTION_EXECUTION_ERROR, etc.
              setError(`Could not load photo for "${moment.placeName}". Check Genkit server logs for details (Error: ${result.error}).`);
              break;
          }
        } else if (result.photoUrl) {
          setPhotoUrl(result.photoUrl);
          setAttributionHtml(result.attributionHtml);
        } else {
          // This case should ideally be covered by result.error, but as a fallback:
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
  }, [moment.placeImage, moment.placeName, moment.coordinates, moment.id]);

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
        {!isLoading && !photoUrl && ( // Error state
          <div className="flex flex-col items-center text-center p-3 text-muted-foreground">
            {errorCode === 'API_KEY_MISSING' || errorCode === 'API_KEY_INVALID' || errorCode?.startsWith('PLACES_API_ERROR') ? (
              <AlertTriangle className="h-8 w-8 mb-1 text-destructive" />
            ) : (
              <ImageOff className="h-8 w-8 mb-1" />
            )}
            <span className="text-xs">{error || "Photo not available"}</span>
             {errorCode?.startsWith('PLACES_API_ERROR') && <span className="text-[10px] mt-1">(Check server/Genkit logs for details)</span>}
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
      {attributionHtml && !error && photoUrl && (
        <CardFooter className="p-2 text-center text-[10px] text-muted-foreground/70 bg-black/20">
          <div dangerouslySetInnerHTML={{ __html: attributionHtml }} />
        </CardFooter>
      )}
    </Card>
  );
}
