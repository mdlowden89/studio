
"use client";

import { useState, useEffect } from 'react';
import type { Moment } from '@/lib/types';
import { fetchPlacePhoto } from '@/app/actions';
import { Card } from '@/components/ui/card';
import { Loader2, ImageOff, MapPin } from 'lucide-react';
import Image from 'next/image';
import { format } from 'date-fns';

interface PlacesTrailItemProps {
  moment: Moment;
}

export function PlacesTrailItem({ moment }: PlacesTrailItemProps) {
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;
    const loadPhoto = async () => {
      if (!moment.placeName) {
        setError("No place name");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const result = await fetchPlacePhoto(moment.placeName, moment.coordinates);
        if (isCancelled) return;

        if (result.photoUrl) {
          setPhotoUrl(result.photoUrl);
        } else {
          setError(result.error || 'No photo found');
        }
      } catch (err) {
        if (isCancelled) return;
        setError('Fetch failed');
        console.error(err);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadPhoto();

    return () => {
      isCancelled = true;
    };
  }, [moment.placeName, moment.coordinates]);

  const momentDate = new Date(moment.loggedAt as string);
  const statusEmoji = moment.status === 'confirmed' ? '🤝' : moment.status === 'rejected' ? '❌' : '⏳';


  return (
    <Card className="w-64 h-full flex-shrink-0 snap-center overflow-hidden bg-card/60 hover:shadow-primary/20 transition-shadow duration-300">
      <div className="relative w-full aspect-video bg-muted flex items-center justify-center">
        {isLoading && <Loader2 className="w-6 h-6 animate-spin text-primary" />}
        {!isLoading && photoUrl && (
          <Image
            src={photoUrl}
            alt={`Photo of ${moment.placeName}`}
            layout="fill"
            objectFit="cover"
            data-ai-hint="place photo trail"
          />
        )}
        {!isLoading && !photoUrl && (
          <div className="flex flex-col items-center text-muted-foreground p-2 text-center">
            <ImageOff className="w-8 h-8 mb-1" />
            <p className="text-xs">No photo available</p>
          </div>
        )}
        <div className="absolute top-2 right-2 text-xl bg-black/40 rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm" title={`Status: ${moment.status}`}>
          {statusEmoji}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="font-bold text-white text-md truncate">{moment.placeName}</h3>
        </div>
      </div>
       <div className="p-3">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{moment.locationAddress?.split(',').slice(0, 2).join(',') || moment.placeName}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
                Logged on {format(momentDate, "MMM d, yyyy")}
            </p>
       </div>
    </Card>
  );
}
