
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Map, Lightbulb, Heart, MapPin, Sparkles, Building, Info } from 'lucide-react';
import { MomentsMap } from '../dashboard/moments-map';
import { MOCK_SPARK_SUGGESTIONS } from '@/lib/mock-data';
import { Button } from '../ui/button';
import Image from 'next/image';

const mockHotspots = MOCK_SPARK_SUGGESTIONS.map(s => ({
    id: s.id,
    type: s.type as any, // Cast for simplicity, handle properly in real app
    title: s.placeName,
    description: s.reason,
    coordinates: s.coordinates
}));

export function SparkSuggestionsClient() {
    const [activeSuggestion, setActiveSuggestion] = useState(MOCK_SPARK_SUGGESTIONS[0]);

    return (
        <div className="container mx-auto py-8">
            <Card className="mb-8 bg-card shadow-xl">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-8 h-8 text-primary" />
                        <div>
                            <CardTitle className="text-3xl font-bold">Spark Suggestions</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Your personalized guide to places where your vibe thrives.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Tabs defaultValue="weekly-picks" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mx-auto mb-6">
                    <TabsTrigger value="weekly-picks"><Lightbulb className="mr-2 h-4 w-4"/>Weekly Picks</TabsTrigger>
                    <TabsTrigger value="spark-map"><Map className="mr-2 h-4 w-4"/>Spark Map</TabsTrigger>
                    <TabsTrigger value="date-ideas" className="hidden md:inline-flex"><Heart className="mr-2 h-4 w-4"/>Date Ideas</TabsTrigger>
                </TabsList>
                
                <TabsContent value="weekly-picks">
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

                <TabsContent value="spark-map">
                    <Card>
                        <CardContent className="p-0">
                            <div className="aspect-[16/9] w-full bg-muted rounded-lg overflow-hidden shadow-inner">
                                <MomentsMap moments={[]} hotspots={mockHotspots} />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                 <TabsContent value="date-ideas">
                    <div className="text-center p-8 bg-card rounded-lg shadow-md">
                        <Heart className="w-12 h-12 text-primary/70 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold">Curated Date Ideas</h3>
                        <p className="text-muted-foreground mt-2">Coming soon: AI-generated date ideas perfect for you and your matches.</p>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
