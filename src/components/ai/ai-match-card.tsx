
"use client";

import Image from "next/image";
import type { UserProfile } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X, Info, CheckCircle, Percent, MapPin, Ruler, Users, Baby, ListChecks, Wine } from "lucide-react"; 
import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AVAILABLE_PROMPTS } from "@/lib/mock-data";

interface AiMatchCardProps {
  user: UserProfile;
  onLike: (userId: string) => void;
  onPass: (userId: string) => void;
}

export function AiMatchCard({ user, onLike, onPass }: AiMatchCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const compatibilityScore = useMemo(() => {
    return Math.floor(Math.random() * (95 - 70 + 1)) + 70;
  }, [user.id]); 

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % user.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + user.images.length) % user.images.length);
  };

  const mainImage = user.images.length > 0 ? user.images[currentImageIndex] : "https://placehold.co/600x600.png"; 
  const otherImages = user.images.length > 0 ? user.images.filter((_, idx) => idx !== currentImageIndex) : [];
  const firstPrompt = user.prompts.length > 0 ? user.prompts[0] : null;
  const otherPrompts = user.prompts.length > 1 ? user.prompts.slice(1) : [];

  const userDetails = [
    { icon: MapPin, label: "Location", value: user.locationName || user.locationAddress?.split(',')[0] || "N/A" },
    { icon: Ruler, label: "Height", value: user.height && user.height !== "Prefer Not to Say" ? user.height : "N/A" },
    { icon: Users, label: "Ethnicity", value: user.ethnicity && user.ethnicity !== "Prefer Not to Say" ? user.ethnicity : "N/A" },
    { icon: Baby, label: "Children", value: user.childrenStatus && user.childrenStatus !== "Prefer Not to Say" ? user.childrenStatus : "N/A" },
    { icon: ListChecks, label: "Family Plans", value: user.familyPlans && user.familyPlans !== "Prefer Not to Say" ? user.familyPlans : "N/A" },
    { icon: Wine, label: "Drinking", value: user.drinking && user.drinking !== "Prefer Not to Say" ? user.drinking : "N/A" },
  ];

  return (
    <Dialog>
      <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-xl transform transition-all duration-300 hover:shadow-primary/30 hover:scale-[1.02] bg-card flex flex-col h-[600px]">
        <CardHeader className="p-0 relative h-[50%]"> 
          <Image
            src={user.images[currentImageIndex]}
            alt={user.name}
            width={600}
            height={800}
            className="object-cover w-full h-full cursor-pointer"
            data-ai-hint="profile person"
            onClick={nextImage}
            unoptimized={user.images[currentImageIndex]?.startsWith('data:') || user.images[currentImageIndex]?.includes('placehold.co')}
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
           {firstPrompt && (
            <div className="mt-1 p-2.5 bg-muted/50 rounded-md">
              <p className="text-xs font-medium text-foreground/70 line-clamp-1">{AVAILABLE_PROMPTS.find(p => p.id === firstPrompt.promptId)?.question}</p>
              <p className="text-sm text-foreground line-clamp-2">{firstPrompt.answer}</p>
            </div>
          )}
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
      
      <DialogContent className="sm:max-w-xl bg-card text-card-foreground p-0">
        <ScrollArea className="h-[80vh] max-h-[700px]">
          <DialogHeader className="p-6 pb-2 sticky top-0 bg-card z-10">
            <DialogTitle className="text-3xl font-bold text-primary">{user.name}, {user.age}</DialogTitle>
            <div className="flex items-center text-sm text-primary pt-1">
                <CheckCircle className="w-4 h-4 mr-1.5" />
                <span>{compatibilityScore}% Vibe Match (AI Suggestion)</span>
            </div>
            <Separator className="my-3 bg-border" />
          </DialogHeader>
          
          <div className="px-6 pb-6 space-y-6">
            <div className="relative w-full max-w-sm mx-auto aspect-[4/5] rounded-lg overflow-hidden shadow-lg">
              <Image 
                src={mainImage} 
                alt={`${user.name}'s main photo`} 
                layout="fill" 
                objectFit="cover"
                data-ai-hint="profile photo"
                unoptimized={mainImage.startsWith('data:') || mainImage.includes('placehold.co')}
              />
            </div>

             <div className="flex overflow-x-auto space-x-4 p-3 bg-muted/30 rounded-lg no-scrollbar scroll-smooth">
              {userDetails.map((detail, index) => (
                 (detail.value && detail.value !== "N/A") && ( 
                  <div key={index} className="flex flex-col items-center text-center flex-shrink-0 w-24 p-2">
                    <detail.icon className="w-7 h-7 text-primary mb-1.5" />
                    <p className="text-xs font-medium text-foreground/90 w-full truncate">{detail.label}</p>
                    <p className="text-xs text-muted-foreground truncate w-full">{detail.value}</p>
                  </div>
                )
              ))}
            </div>

            {firstPrompt && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-primary">{AVAILABLE_PROMPTS.find(p => p.id === firstPrompt.promptId)?.question || "Prompt"}</h3>
                <p className="text-muted-foreground whitespace-pre-line">{firstPrompt.answer}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-primary">About {user.name}</h3>
              <p className="text-muted-foreground whitespace-pre-line">{user.bio}</p>
            </div>

            {otherPrompts.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">More from {user.name}</h3>
                {otherPrompts.map(p => {
                  const promptDetails = AVAILABLE_PROMPTS.find(ap => ap.id === p.promptId);
                  return promptDetails ? (
                    <div key={p.promptId} className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-foreground/80 mb-1">{promptDetails.question}</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{p.answer}</p>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            {otherImages.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-primary">More Photos</h3>
                <div className="grid grid-cols-2 gap-3">
                  {otherImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-[4/5] rounded-md overflow-hidden shadow">
                       <Image 
                        src={img} 
                        alt={`${user.name} profile image ${idx + 1}`} 
                        layout="fill" 
                        objectFit="cover" 
                        data-ai-hint="lifestyle photo"
                        unoptimized={img.startsWith('data:') || img.includes('placehold.co')}
                       />
                    </div>
                  ))}
                </div>
              </div>
            )}
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

    
