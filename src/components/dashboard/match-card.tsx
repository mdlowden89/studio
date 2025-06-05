
"use client";

import Image from "next/image";
import type { UserProfile, CrossedPathUser } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X, MapPin, Info, Ruler, Users, Baby, ListChecks, Wine, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AVAILABLE_PROMPTS } from "@/lib/mock-data";
import React from "react";

interface MatchCardProps {
  user: UserProfile | CrossedPathUser;
  onLike: (userId: string) => void;
  onPass: (userId: string) => void;
  showCrossedPathInfo?: boolean;
}

export function MatchCard({ user, onLike, onPass, showCrossedPathInfo = false }: MatchCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % user.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + user.images.length) % user.images.length);
  };

  const crossedPathUser = user as CrossedPathUser;
  const cardFaceImage = user.images.length > 0 ? user.images[currentImageIndex] : "https://placehold.co/600x800.png";

  const userDetails = [
    { icon: MapPin, label: "Location", value: user.locationName || user.locationAddress?.split(',')[0] || "N/A" },
    { icon: Ruler, label: "Height", value: user.height && user.height !== "Prefer Not to Say" ? user.height : "N/A" },
    { icon: Users, label: "Ethnicity", value: user.ethnicity && user.ethnicity !== "Prefer Not to Say" ? user.ethnicity : "N/A" },
    { icon: Baby, label: "Children", value: user.childrenStatus && user.childrenStatus !== "Prefer Not to Say" ? user.childrenStatus : "N/A" },
    { icon: ListChecks, label: "Family Plans", value: user.familyPlans && user.familyPlans !== "Prefer Not to Say" ? user.familyPlans : "N/A" },
    { icon: Wine, label: "Drinking", value: user.drinking && user.drinking !== "Prefer Not to Say" ? user.drinking : "N/A" },
  ];

  // Define images for dialog layout
  const dialogTopImage = user.images.length > 0 ? user.images[0] : "https://placehold.co/600x800.png";
  const imagesForSpecificPlacement = user.images.slice(1); // Start from the second image

  const imgAfterBio1 = imagesForSpecificPlacement[0];
  const imgAfterBio2 = imagesForSpecificPlacement[1];
  const imgForPrompt1 = imagesForSpecificPlacement[2];
  const imgForPrompt2 = imagesForSpecificPlacement[3];
  const remainingDialogImages = imagesForSpecificPlacement.slice(4);

  const renderPlacedImage = (src: string | undefined, altHint: string, keySuffix: string) => {
    if (!src) return null;
    return (
      <div className="relative aspect-[16/9] rounded-md overflow-hidden shadow w-full my-4" key={`placed-${altHint}-${keySuffix}`}>
        <Image
          src={src}
          alt={`${user.name}'s photo - ${altHint}`}
          layout="fill"
          objectFit="cover"
          data-ai-hint={`profile ${altHint}`}
          unoptimized={src.startsWith('data:') || src.includes('placehold.co')}
        />
      </div>
    );
  };

  return (
    <Dialog>
      <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105 bg-card flex flex-col h-[720px]">
        <CardHeader className="p-0 relative h-[55%]">
          <Image
            src={cardFaceImage}
            alt={user.name}
            width={600}
            height={800}
            className="object-cover w-full h-full cursor-pointer"
            data-ai-hint="profile lifestyle"
            onClick={nextImage}
            unoptimized={cardFaceImage.startsWith('data:') || cardFaceImage.includes('placehold.co')}
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

      <DialogContent className="sm:max-w-2xl bg-card text-card-foreground p-0">
        <ScrollArea className="h-[80vh] max-h-[700px]">
          <DialogHeader className="p-6 pb-2 sticky top-0 bg-card z-10">
            <DialogTitle className="text-3xl font-bold text-primary">{user.name}, {user.age}</DialogTitle>
            {showCrossedPathInfo && crossedPathUser.location && (
                <div className="flex items-center text-sm text-muted-foreground pt-1">
                  <MapPin className="w-4 h-4 mr-1.5 text-primary/70" />
                  <span>Crossed paths at {crossedPathUser.location} around {new Date(crossedPathUser.crossedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              )}
            <Separator className="my-3 bg-border" />
          </DialogHeader>
          
          <div className="px-6 pt-4">
            <div className="relative w-full max-w-xs aspect-[4/5] rounded-lg overflow-hidden shadow-lg mx-auto">
              <Image
                src={dialogTopImage}
                alt={`${user.name}'s main photo`}
                layout="fill"
                objectFit="cover"
                data-ai-hint="profile photo"
                unoptimized={dialogTopImage.startsWith('data:') || dialogTopImage.includes('placehold.co')}
              />
            </div>
          </div>

          <div className="px-6 pt-3 pb-3"> 
            <div className="w-full flex flex-nowrap justify-around overflow-x-auto p-3 bg-muted/30 rounded-lg">
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
          </div>
          
          <div className="px-6 pb-6 flex flex-col space-y-4"> 
            <div className="space-y-2 w-full">
              <h3 className="text-lg font-semibold text-primary">About {user.name}</h3>
              <p className="text-muted-foreground whitespace-pre-line">{user.bio}</p>
            </div>

            {renderPlacedImage(imgAfterBio1, "after bio 1", "ab1")}
            {renderPlacedImage(imgAfterBio2, "after bio 2", "ab2")}
                       
            {user.prompts.map((p, index) => {
              const promptDetails = AVAILABLE_PROMPTS.find(ap => ap.id === p.promptId);
              const question = promptDetails?.question;
              return (
                <React.Fragment key={`${p.promptId}-${index}`}>
                  <div className="bg-muted/30 p-4 rounded-lg mt-2">
                    <h4 className="font-semibold text-foreground/80 mb-1">{question}</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{p.answer}</p>
                  </div>
                  {question === "I recently discovered that" && (
                    <>
                      {renderPlacedImage(imgForPrompt1, "after prompt 1", "ap1")}
                      {renderPlacedImage(imgForPrompt2, "after prompt 2", "ap2")}
                    </>
                  )}
                </React.Fragment>
              );
            })}

            {remainingDialogImages.length > 0 && (
              <div className="space-y-3 w-full pt-4">
                <h3 className="text-lg font-semibold text-primary">More Photos</h3>
                <div className="grid grid-cols-2 gap-3">
                  {remainingDialogImages.map((img, idx) => (
                    <div key={`remaining-${idx}`} className="relative aspect-[4/5] rounded-md overflow-hidden shadow">
                      <Image
                        src={img}
                        alt={`${user.name} profile image ${idx + 5}`}
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

