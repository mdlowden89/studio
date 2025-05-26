
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Feather, MapPin, Clock, CheckCircle, Search } from "lucide-react";
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

export default function LogMomentPage() {
  const [locationName, setLocationName] = useState<string>("");
  const [locationAddress, setLocationAddress] = useState<string>("");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  
  const [formattedTimestamp, setFormattedTimestamp] = useState<string | null>(null);
  const { toast } = useToast();

  const [mapsApiKey, setMapsApiKey] = useState<string | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);

  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  
  const currentUser = getCurrentUser();
  const initialMapCenter = currentUser.locationCoordinates || { lat: 40.7128, lng: -74.0060 }; // Default to NYC if no user location

  useEffect(() => {
    setIsMounted(true);
    setMapsApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
    
    const now = new Date();
    setFormattedTimestamp(format(now, "h:mm bbb, EEEE"));

    // Attempt to set initial location based on current user's profile if available
    if (currentUser.locationName && currentUser.locationCoordinates) {
      setLocationName(currentUser.locationName);
      setLocationAddress(currentUser.locationAddress || currentUser.locationName);
      setCoordinates(currentUser.locationCoordinates);
    }

  }, [currentUser]);


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

        setLocationAddress(newAddr); // For the input field visual
        setLocationName(newName);    // For display and saving
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
    if (coordinates) { // If coordinates were set from user profile initially
        map.panTo(coordinates);
        map.setZoom(15);
    }
  }, [coordinates]);

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newCoords = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setCoordinates(newCoords);
      setLocationName("Pinned Location"); // Generic name for map click
      setLocationAddress(`Lat: ${newCoords.lat.toFixed(4)}, Lng: ${newCoords.lng.toFixed(4)}`); 
      // In a real app, you'd call reverse geocoding here to get address/name
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
    toast({
      title: "Location Confirmed!",
      description: `Selected: ${locationName}. Next step: Describe the moment. (Coming soon)`,
    });
    // Proceed to Step 2 in the future, passing locationName, locationAddress, coordinates
  };

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
                <CardTitle className="text-3xl font-bold">Log a Crossing or Moment</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Step 1: Set Your Location
                </CardDescription>
              </div>
            </div>
          </CardHeader>
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
                            defaultValue={locationAddress} // Use defaultValue for StandaloneSearchBox input
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
        </Card>
      </div>
    </AppLayout>
  );
}
