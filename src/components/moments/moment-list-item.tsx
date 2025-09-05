
"use client";

import { useState, useEffect } from 'react';
import type { Moment as MomentType } from "@/lib/types";
import Image from "next/image";
import { format, formatDistanceToNow } from "date-fns";
import { fetchPlacePhoto } from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, AlertTriangle, ImageOff, Loader2 } from "lucide-react";

interface MomentListItemProps {
    moment: MomentType;
}

const statusConfig = {
    pending: { label: "Waiting", color: "bg-amber-500/20 text-amber-400 border-amber-500/30", icon: <Loader2 className="w-3 h-3 animate-spin" /> },
    confirmed: { label: "Matched", color: "bg-green-500/20 text-green-400 border-green-500/30", icon: <CheckCircle className="w-3 h-3" /> },
    rejected: { label: "Expired", color: "bg-destructive/20 text-destructive border-destructive/30", icon: <XCircle className="w-3 h-3" /> },
};


export function MomentListItem({ moment }: MomentListItemProps) {
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
                if (!isCancelled) {
                    if (result.photoUrl) {
                        setPhotoUrl(result.photoUrl);
                    } else {
                        setError(result.error || 'No photo found');
                    }
                }
            } catch (err) {
                if (!isCancelled) setError('Fetch failed');
            } finally {
                if (!isCancelled) setIsLoading(false);
            }
        };

        loadPhoto();
        return () => { isCancelled = true; };
    }, [moment.placeName, moment.coordinates]);

    const momentDate = new Date(moment.loggedAt as string);
    const status = statusConfig[moment.status] || statusConfig.pending;

    const getTimeRemaining = () => {
        const expiresAt = new Date(momentDate.getTime() + (48 * 60 * 60 * 1000)); // Example: 48 hours to expire
        if (new Date() > expiresAt) {
            return "Expired";
        }
        return formatDistanceToNow(expiresAt, { addSuffix: true, includeSeconds: true });
    };

    return (
        <li className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
             <div className="relative w-16 h-16 rounded-md bg-muted flex-shrink-0 overflow-hidden">
                {isLoading && <Skeleton className="w-full h-full" />}
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
                    <div className="flex flex-col items-center justify-center text-center p-1 h-full text-muted-foreground/50">
                        <ImageOff className="w-6 h-6 mb-1" />
                    </div>
                )}
            </div>
            <div className="flex-1">
                <h4 className="font-semibold text-foreground truncate">{moment.placeName}</h4>
                <p className="text-sm text-muted-foreground">{format(momentDate, "MMM d, yyyy 'at' p")}</p>
            </div>
            <div className="text-right">
                 <Badge className={cn("text-xs", status.color)}>
                    {status.icon}
                    <span className="ml-1.5">{status.label}</span>
                </Badge>
                {moment.status === 'pending' && (
                    <p className="text-xs text-muted-foreground mt-1">{getTimeRemaining()}</p>
                )}
            </div>
        </li>
    );
}

