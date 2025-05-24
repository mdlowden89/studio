
"use client";

import Image from "next/image";
import type { UserProfile, CrossedPathUser } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X, MapPin, Info } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AVAILABLE_PROMPTS } from "@/lib/mock-data";

interface MatchCardProps {
  user: UserProfile | CrossedPathUser;
  onLike: (userId: string) => void;
  onPass: (userId: string) => void;
  showCrossedPathInfo?: boolean;
}

export function MatchCard({ user, onLike, onPass, showCrossedPathInfo = false }: MatchCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when changing image
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % user.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + user.images.length) % user.images.length);
  };

  const crossedPathUser = user as CrossedPathUser;

  return (
    <Dialog>
      <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105 bg-card flex flex-col h-[650px]">
        <CardHeader className="p-0 relative h-[60%]">
          <Image
            src={user.images[currentImageIndex]}
            alt={user.name}
            width={600}
            height={800}
            className="object-cover w-full h-full cursor-pointer"
            data-ai-hint="profile lifestyle"
            onClick={nextImage}
          />
          {user.images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50"
                onClick={prevImage}
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50"
                onClick={nextImage}
              >
                <ChevronRightIcon className="w-6 h-6" />
              </Button>
            </>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <CardTitle className="text-3xl font-bold text-white">{user.name}, {user.age}</CardTitle>
            {showCrossedPathInfo && crossedPathUser.location && (
              <div className="flex items-center text-sm text-gray-200 mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Crossed paths at {crossedPathUser.location}</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow overflow-y-auto">
            <CardDescription className="text-muted-foreground line-clamp-3 mb-2">{user.bio}</CardDescription>
            <div className="flex flex-wrap gap-2 mb-3">
            {user.vibeTags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs capitalize">{tag}</Badge>
            ))}
          </div>
          {user.prompts.slice(0,1).map(p => {
            const promptDetails = AVAILABLE_PROMPTS.find(ap => ap.id === p.promptId);
            return promptDetails ? (
              <div key={p.promptId} className="mt-2 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs font-semibold text-foreground/80">{promptDetails.question}</p>
                <p className="text-sm text-foreground line-clamp-2">{p.answer}</p>
              </div>
            ) : null;
          })}
        </CardContent>
         <CardFooter className="flex justify-around p-4 border-t border-border">
          <Button variant="outline" size="lg" className="rounded-full p-4 border-destructive text-destructive hover:bg-destructive/10" onClick={() => onPass(user.id)} aria-label="Pass">
            <X className="h-7 w-7" />
          </Button>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full p-2 border-primary text-primary hover:bg-primary/10" aria-label="More Info">
                <Info className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <Button variant="outline" size="lg" className="rounded-full p-4 border-green-500 text-green-500 hover:bg-green-500/10" onClick={() => onLike(user.id)} aria-label="Like">
            <Heart className="h-7 w-7" />
          </Button>
        </CardFooter>
      </Card>

      <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl">{user.name}, {user.age}</DialogTitle>
           {showCrossedPathInfo && crossedPathUser.location && (
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Crossed paths at {crossedPathUser.location} around {new Date(crossedPathUser.crossedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
            )}
        </DialogHeader>
        <ScrollArea className="h-[60vh] p-1">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              {user.images.map((img, idx) => (
                <Image key={idx} src={img} alt={`${user.name} profile image ${idx+1}`} width={200} height={300} className="rounded-md object-cover aspect-[3/4]" data-ai-hint="profile lifestyle"/>
              ))}
            </div>
            <div>
              <h3 className="font-semibold mb-1">Bio</h3>
              <p className="text-sm text-muted-foreground">{user.bio}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Vibe Tags</h3>
              <div className="flex flex-wrap gap-2">
                {user.vibeTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs capitalize">{tag}</Badge>
                ))}
              </div>
            </div>
            {user.prompts.map(p => {
              const promptDetails = AVAILABLE_PROMPTS.find(ap => ap.id === p.promptId);
              return promptDetails ? (
                <div key={p.promptId} className="mt-2">
                  <h4 className="font-semibold text-sm text-foreground/80">{promptDetails.question}</h4>
                  <p className="text-sm text-muted-foreground">{p.answer}</p>
                </div>
              ) : null;
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}


function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

