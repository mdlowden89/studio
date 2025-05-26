
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Feather, MapPin, Clock, CheckCircle, Search, ArrowLeft, MessageSquare, Smile, UserCheck } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { GoogleMap, LoadScriptNext, StandaloneSearchBox, MarkerF } from '@react-google-maps/api';
import { MOCK_USER_ID, getCurrentUser } from "@/lib/mock-data";

const mapContainerStyle = {
  width: '100%',
  height: '300px',
};

const mapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#000000' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#FAFAFA' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#000000' }, { weight: 2 }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#101010' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#FAFAFA' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#222222' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#E70F72' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#A3A3A3' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#FAFAFA' }] },
  { featureType: 'poi', elementType: 'labels.icon', stylers: [{ "visibility": "on" }, { "color": "#E70F72" }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#080808' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#050505' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#FAFAFA' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#444444' }, { weight: 0.5 }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#FAFAFA' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#181818' }] }
];

const libraries: ("places")[] = ['places'];
const emotionTagsOptions = ["Excited", "Curious", "Fleeting", "Didn't get to say hi", "Hopeful", "Nostalgic"];


export default function LogMomentPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 State
  const [locationName, setLocationName] = useState<string>("");
  const [locationAddress, setLocationAddress] = useState<string>("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [formattedTimestamp, setFormattedTimestamp] = useState<string | null>(null);
  const [mapsApiKey, setMapsApiKey] = useState<string | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  
  // Step 2 State
  const [momentDescription, setMomentDescription] = useState("");
  const [selectedEmotionTags, setSelectedEmotionTags] = useState<string[]>([]); // For actual selection logic later
  const [personDescription, setPersonDescription] = useState("");


  const { toast } = useToast();
  const currentUser = getCurrentUser();
  const initialMapCenter = currentUser.locationCoordinates || { lat: 40.7128, lng: -74.0060 };

  useEffect(() => {
    setIsMounted(true);
    setMapsApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
    
    const now = new Date();
    setFormattedTimestamp(format(now, "h:mm bbb, EEEE"));

    if (currentUser.locationName && currentUser.locationCoordinates && currentStep === 1) {
      setLocationName(currentUser.locationName);
      setLocationAddress(currentUser.locationAddress || currentUser.locationName);
      setCoordinates(currentUser.locationCoordinates);
    }
  }, [currentUser, currentStep]);


  const onLoadSearchBox = useCallback((ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref;
  }, []);

  const onPlacesChanged = useCallback(() => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const newAddr = place.formatted_address || "";
        const newName = place.name || "";
        const newCoords = place.geometry?.location
          ? { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
          : null;

        setLocationAddress(newAddr); 
        setLocationName(newName);    
        setCoordinates(newCoords);

        if (newCoords && mapRef.current) {
          mapRef.current.panTo(newCoords);
          mapRef.current.setZoom(15);
        }
      }
    }
  }, []);
  
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    if (coordinates && currentStep === 1) { 
        map.panTo(coordinates);
        map.setZoom(15);
    }
  }, [coordinates, currentStep]);

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newCoords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setCoordinates(newCoords);
      setLocationName("Pinned Location"); 
      setLocationAddress(`Lat: ${newCoords.lat.toFixed(4)}, Lng: ${newCoords.lng.toFixed(4)}`); 
      if (mapRef.current) {
        mapRef.current.panTo(newCoords);
      }
    }
  }, []);

  const handleConfirmLocation = () => {
    if (!locationName || !coordinates) {
        toast({
            title: "Location Missing",
            description: "Please select a location using the map or search.",
            variant: "destructive",
        });
        return;
    }
    setCurrentStep(2);
  };

  const handleSaveMoment = () => {
    // Basic validation for Step 2
    if (momentDescription.trim() === "") {
        toast({
            title: "Description Missing",
            description: "Please describe what the moment was like.",
            variant: "destructive",
        });
        return;
    }
    toast({
      title: "Moment Details Logged!",
      description: `Location: ${locationName}. Description: ${momentDescription.substring(0,30)}... Next: Visual feedback (Coming soon)`,
    });
    // Proceed to Step 3 in the future
    // For now, perhaps reset or navigate:
    // setCurrentStep(1); 
    // setMomentDescription(""); 
    // setPersonDescription("");
    // setSelectedEmotionTags([]);
  };

  const characterLimit = 300;

  if (!isMounted) {
    return (
        <AppLayout>
            <div className="container mx-auto py-8 flex justify-center items-center h-full">
                <p>Loading...</p>
            </div>
        </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="bg-card shadow-xl max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Feather className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="text-3xl font-bold">
                  {currentStep === 1 ? "Log a Crossing or Moment" : "Describe the Moment"}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {currentStep === 1 ? "Step 1: Set Your Location" : "Step 2: Add Details"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          {currentStep === 1 && (
            <>
              <CardContent className="space-y-6 py-6">
                {!mapsApiKey ? (
                    <div className="p-3 bg-destructive text-destructive-foreground rounded-md text-sm text-center">
                        Google Maps API Key is missing or invalid. Location features are unavailable.
                        Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file.
                    </div>
                ) : (
                  <LoadScriptNext
                    googleMapsApiKey={mapsApiKey}
                    libraries={libraries}
                    loadingElement={<div className="text-center p-4">Loading Map...</div>}
                  >
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="location-search" className="mb-1.5 block">Search for a place or address</Label>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10 pointer-events-none" />
                          <StandaloneSearchBox
                            onLoad={onLoadSearchBox}
                            onPlacesChanged={onPlacesChanged}
                          >
                            <Input
                                id="location-search"
                                type="text"
                                placeholder="e.g., The Alchemist's Cafe or 123 Main St"
                                defaultValue={locationAddress} 
                                className="bg-input pl-10"
                            />
                          </StandaloneSearchBox>
                        </div>
                      </div>
                      
                      <div style={mapContainerStyle} className="rounded-md overflow-hidden border border-border">
                        <GoogleMap
                          mapContainerStyle={mapContainerStyle}
                          center={initialMapCenter}
                          zoom={coordinates ? 15 : 10}
                          onLoad={onMapLoad}
                          onClick={onMapClick}
                          options={{ styles: mapStyles, streetViewControl: false, mapTypeControl: false, fullscreenControl: false, gestureHandling: 'greedy' }}
                        >
                          {coordinates && <MarkerF position={coordinates} />}
                        </GoogleMap>
                      </div>
                    </div>
                  </LoadScriptNext>
                )}
                
                {locationName && coordinates && (
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg shadow-sm">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Selected Location:</p>
                      <p className="text-lg font-semibold text-foreground">{locationName}</p>
                      <p className="text-xs text-muted-foreground">{locationAddress}</p>
                    </div>
                  </div>
                )}

                {formattedTimestamp && (
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg shadow-sm">
                    <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Current Time:</p>
                      <p className="text-lg font-semibold text-foreground">{formattedTimestamp}</p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-6">
                <Button 
                  onClick={handleConfirmLocation} 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={!locationName || !coordinates || !formattedTimestamp || !mapsApiKey}
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Confirm Location & Proceed
                </Button>
              </CardFooter>
            </>
          )}

          {currentStep === 2 && (
            <>
              <CardContent className="space-y-6 py-6">
                <div className="text-center mb-4">
                    <h3 className="text-xl font-semibold text-primary">What was the moment like?</h3>
                </div>

                <div>
                  <Label htmlFor="momentDescription" className="flex items-center gap-1.5 mb-1.5">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    Describe the experience
                  </Label>
                  <Textarea
                    id="momentDescription"
                    value={momentDescription}
                    onChange={(e) => {
                        if (e.target.value.length <= characterLimit) {
                           setMomentDescription(e.target.value);
                        }
                    }}
                    placeholder="e.g., I was sitting near the bar... they walked past wearing a red jacket..."
                    rows={4}
                    className="bg-input"
                  />
                  <p className="text-xs text-muted-foreground text-right mt-1">
                    {momentDescription.length}/{characterLimit}
                  </p>
                </div>

                <div>
                  <Label className="flex items-center gap-1.5 mb-2">
                    <Smile className="w-4 h-4 text-muted-foreground" />
                    How did it feel? (Optional)
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {emotionTagsOptions.map(tag => (
                      <Badge 
                        key={tag} 
                        variant={selectedEmotionTags.includes(tag) ? "default" : "outline"}
                        // onClick={() => toggleEmotionTag(tag)} // Add selection logic later
                        className="cursor-pointer"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="personDescription" className="flex items-center gap-1.5 mb-1.5">
                     <UserCheck className="w-4 h-4 text-muted-foreground" />
                    Noticed someone? (Optional)
                  </Label>
                  <Textarea
                    id="personDescription"
                    value={personDescription}
                    onChange={(e) => setPersonDescription(e.target.value)}
                    placeholder="e.g., They had curly hair and a navy hoodie."
                    rows={3}
                    className="bg-input"
                  />
                   <p className="text-xs text-muted-foreground mt-1">Describe anyone who stood out, if applicable.</p>
                </div>

              </CardContent>
              <CardFooter className="border-t pt-6 flex justify-between">
                <Button 
                  onClick={() => setCurrentStep(1)} 
                  variant="outline"
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Location
                </Button>
                <Button 
                  onClick={handleSaveMoment} 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Save Moment
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </AppLayout>
  );
}
