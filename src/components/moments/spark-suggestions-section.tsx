
'use client';

import { useState } from 'react';
import type { UserProfile } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BrainCircuit, Building, Heart, Info, Lightbulb, List, Map, MapPin, Sparkles, Tag } from 'lucide-react';
import { MOCK_SPARK_SUGGESTIONS } from '@/lib/mock-data';
import { MomentsMap } from '@/components/dashboard/moments-map';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface SparkSuggestionsSectionProps {
  userProfile: UserProfile;
}

const mockHotspots = MOCK_SPARK_SUGGESTIONS.map(s => ({
    id: s.id,
    type: s.type as any,
    title: s.placeName,
    description: s.reason,
    coordinates: s.coordinates
}));

export function SparkSuggestionsSection({ userProfile }: SparkSuggestionsSectionProps) {

  return (
    <div className="space-y-6">
      <Card className="bg-muted/30 border-border">
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
                <BrainCircuit className="w-6 h-6 text-primary" />
                <Badge variant="secondary" className="text-md">{userProfile.mbtiType || 'Not Set'}</Badge>
            </div>
             <div className="flex items-center gap-2">
                <Tag className="w-6 h-6 text-primary" />
                <div className="flex flex-wrap gap-1">
                    {userProfile.vibeTags.slice(0, 4).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs capitalize">{tag}</Badge>
                    ))}
                    {userProfile.vibeTags.length > 4 && <Badge variant="outline">...</Badge>}
                </div>
            </div>
            <p className="text-xs text-muted-foreground sm:ml-auto text-left sm:text-right">Suggestions are based on your personality & vibes.</p>
          </CardContent>
      </Card>

      <Tabs defaultValue="picks" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="picks"><List className="mr-2 h-4 w-4" />Weekly Picks</TabsTrigger>
            <TabsTrigger value="map"><Map className="mr-2 h-4 w-4" />Spark Map</TabsTrigger>
        </TabsList>
        <TabsContent value="picks" className="mt-4">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_SPARK_SUGGESTIONS.map(suggestion => (
                    <Card key={suggestion.id} className="bg-card/70 hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
                        <CardHeader>
                            <div className="relative w-full aspect-video rounded-md overflow-hidden mb-3">
                                <Image src={suggestion.imageUrl} alt={suggestion.placeName} layout="fill" objectFit="cover" data-ai-hint="place suggestion" />
                                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                                    <Sparkles className="w-3 h-3 text-primary" /> {suggestion.vibe}
                                </div>
                            </div>
                            <CardTitle className="text-xl">{suggestion.placeName}</CardTitle>
                            <CardDescription className="text-sm text-primary font-medium">{suggestion.type}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground text-sm italic">&quot;{suggestion.reason}&quot;</p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">{suggestion.distance}</span>
                            <Button variant="outline" size="sm">
                                <MapPin className="mr-2 h-4 w-4"/> View on Map
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </TabsContent>
         <TabsContent value="map" className="mt-4">
            <div className="aspect-[16/9] w-full bg-muted rounded-lg overflow-hidden shadow-inner">
                <MomentsMap moments={[]} hotspots={mockHotspots} />
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
