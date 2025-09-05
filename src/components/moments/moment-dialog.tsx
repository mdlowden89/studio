
"use client";

import { useState, useEffect } from 'react';
import type { Moment } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchPlacePhoto } from '@/app/actions';
import { format } from 'date-fns';
import { ImageOff, Loader2 } from 'lucide-react';

interface MomentDetailsDialogProps {
    moment: Moment | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const dnaColors: Record<string, string> = {
    Energy: "bg-red-500/20 text-red-400 border-red-500/30",
    Ambience: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    Interaction: "bg-green-500/20 text-green-400 border-green-500/30",
    Sound: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};


export function MomentDetailsDialog({ moment, open, onOpenChange }: MomentDetailsDialogProps) {
    const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (moment && open) {
            setIsLoading(true);
            setPhotoUrl(undefined);

            const loadPhoto = async () => {
                try {
                    const result = await fetchPlacePhoto(moment.placeName, moment.coordinates);
                    if (result.photoUrl) {
                        setPhotoUrl(result.photoUrl);
                    }
                } catch (error) {
                    console.error("Failed to fetch place photo:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            loadPhoto();
        }
    }, [moment, open]);

    if (!moment) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-card">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-primary">{moment.placeName}</DialogTitle>
                    <DialogDescription>
                        Logged on {format(new Date(moment.loggedAt as string), "PPPPp")}
                    </DialogDescription>
                </DialogHeader>

                <div className="relative w-full aspect-video rounded-lg bg-muted overflow-hidden mt-2">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                           <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        </div>
                    ) : photoUrl ? (
                        <Image src={photoUrl} alt={`Photo of ${moment.placeName}`} layout="fill" objectFit="cover" />
                    ) : (
                         <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                            <ImageOff className="w-10 h-10" />
                            <p className="mt-2 text-sm">No photo available</p>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div>
                        <h4 className="font-semibold text-foreground mb-2">Your Notes</h4>
                        <p className="text-muted-foreground text-sm italic bg-muted/50 p-3 rounded-md">
                            &quot;{moment.momentDescription}&quot;
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

