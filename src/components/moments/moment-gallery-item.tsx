
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import type { Moment as MomentType } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { MapPin, CalendarDays, ImageOff, Loader2 } from 'lucide-react';
import { fetchPlacePhoto } from '@/app/actions'; // We'll create this action

interface MomentGalleryItemProps {
  moment: MomentType;
}

export function MomentGalleryItem({ moment }: MomentGalleryItemProps) {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [attributionHtml, setAttributionHtml] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPhoto() {
      if (!moment.placeName) {
        setError("Place name is missing.");
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchPlacePhoto(moment.placeName, moment.coordinates);
        if (result.photoUrl) {
          setPhotoUrl(result.photoUrl);
          setAttributionHtml(result.attributionHtml);
        } else {
          setError("No photo found for this place.");
        }
      } catch (err) {
        console.error("Error fetching place photo:", err);
        setError("Could not load photo.");
      } finally {
        setIsLoading(false);
      }
    }
    loadPhoto();
  }, [moment.placeName, moment.coordinates]);

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
          <div className="flex flex-col items-center text-muted-foreground">
            <ImageOff className="h-10 w-10 mb-2" />
            <span className="text-xs">{error || "No photo available"}</span>
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
      {attributionHtml && (
        <CardFooter className="p-2 text-center text-[10px] text-muted-foreground/70 bg-black/20">
          <div dangerouslySetInnerHTML={{ __html: attributionHtml }} />
        </CardFooter>
      )}
    </Card>
  );
}
