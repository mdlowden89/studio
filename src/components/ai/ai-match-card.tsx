
"use client";

import Image from "next/image";
import type { UserProfile } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X, Info, CheckCircle, Percent } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AVAILABLE_PROMPTS } from "@/lib/mock-data";

interface AiMatchCardProps {
  user: UserProfile;
  onLike: (userId: string) => void;
  onPass: (userId: string) => void;
}

export function AiMatchCard({ user, onLike, onPass }: AiMatchCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Mock compatibility score
  const compatibilityScore = Math.floor(Math.random() * (95 - 70 + 1)) + 70;


  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % user.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + user.images.length) % user.images.length);
  };

  return (
    <Dialog>
      <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-xl transform transition-all duration-300 hover:shadow-primary/30 hover:scale-[1.02] bg-card flex flex-col h-[600px]">
        <CardHeader className="p-0 relative h-[55%]">
          <Image
            src={user.images[currentImageIndex]}
            alt={user.name}
            width={600}
            height={800}
            className="object-cover w-full h-full cursor-pointer"
            data-ai-hint="profile person"
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
          <div className="absolute top-2 right-2 bg-primary/80 text-primary-foreground px-3 py-1.5 rounded-full text-sm font-semibold flex items-center shadow-lg">
             <Percent className="w-4 h-4 mr-1.5" /> {compatibilityScore}% Vibe Match
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <CardTitle className="text-2xl font-bold text-white">{user.name}, {user.age}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow overflow-y-auto">
          <CardDescription className="text-muted-foreground line-clamp-2 mb-2">{user.bio}</CardDescription>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {user.vibeTags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs capitalize border-primary/50 text-primary/90">{tag}</Badge>
            ))}
          </div>
           {user.prompts.slice(0,1).map(p => {
            const promptDetails = AVAILABLE_PROMPTS.find(ap => ap.id === p.promptId);
            return promptDetails ? (
              <div key={p.promptId} className="mt-1 p-2.5 bg-muted/50 rounded-md">
                <p className="text-xs font-medium text-foreground/70">{promptDetails.question}</p>
                <p className="text-sm text-foreground line-clamp-2">{p.answer}</p>
              </div>
            ) : null;
          })}
        </CardContent>
        <CardFooter className="flex justify-around p-3 border-t border-border">
          <Button variant="outline" size="lg" className="rounded-full p-3.5 border-destructive text-destructive hover:bg-destructive/10" onClick={() => onPass(user.id)} aria-label="Pass">
            <X className="h-6 w-6" />
          </Button>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full p-1.5 border-primary text-primary hover:bg-primary/10" aria-label="More Info">
                <Info className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <Button variant="outline" size="lg" className="rounded-full p-3.5 border-green-500 text-green-500 hover:bg-green-500/10" onClick={() => onLike(user.id)} aria-label="Like">
            <Heart className="h-6 w-6" />
          </Button>
        </CardFooter>
      </Card>
      
      <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="text-2xl">{user.name}, {user.age}</DialogTitle>
            <div className="flex items-center text-sm text-primary mt-1">
                <CheckCircle className="w-4 h-4 mr-1" />
                <span>{compatibilityScore}% Vibe Match (AI Suggestion)</span>
            </div>
        </DialogHeader>
        <ScrollArea className="h-[60vh] p-1">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              {user.images.map((img, idx) => (
                <Image key={idx} src={img} alt={`${user.name} profile image ${idx+1}`} width={200} height={300} className="rounded-md object-cover aspect-[3/4]" data-ai-hint="profile photo"/>
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

