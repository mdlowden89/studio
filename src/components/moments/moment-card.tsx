
import type { Moment as MomentType, UserProfile } from "@/lib/types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Users, CalendarDays } from "lucide-react";
import Image from "next/image";

interface MomentCardProps {
  moment: MomentType;
  potentialMatchUser?: UserProfile;
}

export function MomentCard({ moment, potentialMatchUser }: MomentCardProps) {
  const momentDate = new Date(moment.timestamp);

  return (
    <Card className="bg-card/50 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            {moment.placeName}
          </CardTitle>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <CalendarDays className="w-3 h-3"/>
            {momentDate.toLocaleDateString()} - {momentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </CardHeader>
      {potentialMatchUser && (
        <CardContent>
          <CardDescription className="mb-2 text-sm flex items-center gap-1">
            <Users className="w-4 h-4 text-primary" />
            You crossed paths with {potentialMatchUser.name} here!
          </CardDescription>
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarImage src={potentialMatchUser.images[0]} alt={potentialMatchUser.name} data-ai-hint="profile person" />
              <AvatarFallback>{potentialMatchUser.name.substring(0,1)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{potentialMatchUser.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{potentialMatchUser.bio}</p>
            </div>
             {/* Placeholder image representing the place or vibe */}
            <Image src="https://placehold.co/600x800.png" alt="Place vibe" width={60} height={80} className="rounded-md object-cover ml-auto" data-ai-hint="cafe ambient"/>
          </div>
        </CardContent>
      )}
      {!potentialMatchUser && (
         <CardContent>
            <p className="text-sm text-muted-foreground">A quiet moment, just for you.</p>
        </CardContent>
      )}
    </Card>
  );
}
