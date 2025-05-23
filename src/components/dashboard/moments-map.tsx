
"use client";

import { GoogleMap, LoadScriptNext, MarkerF, InfoWindowF } from '@react-google-maps/api';
import type { Moment } from '@/lib/types';
import { useMemo, useState, useEffect } from 'react';
import { format } from 'date-fns';

interface MomentsMapProps {
  moments: Moment[];
}

const containerStyle = {
  width: '100%',
  height: '100%', // Will be controlled by parent div aspect ratio
};

// Custom map styles emphasizing #000000 (black) and #E70F72 (primary pink accents)
const mapStyles = [
  { // Base geometry (land, etc.)
    elementType: 'geometry',
    stylers: [{ color: '#000000' }] // Pure black for land
  },
  { // All labels text fill - CHANGED TO WHITE
    elementType: 'labels.text.fill',
    stylers: [{ color: '#FAFAFA' }]
  },
  { // All labels text stroke
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#000000' }, { weight: 2 }] // Black stroke for sharp text
  },
  { // Water bodies
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#101010' }] // Very dark grey (like card background)
  },
  { // Water labels - CHANGED TO WHITE
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#FAFAFA' }]
  },
  { // Roads - General
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#222222' }] // Dark grey for roads
  },
  { // Road labels - CHANGED TO WHITE
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#FAFAFA' }]
  },
  { // Highways - make them stand out a bit more with primary color
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#E70F72' }] // Primary pink for highways
  },
  { // Points of Interest (POIs) text - CHANGED TO WHITE
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#FAFAFA' }]
  },
  { // POI icons - RETAIN PINK ACCENT
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [{ "visibility": "on" }, { "color": "#E70F72" }]
  },
  { // POI geometry (the shapes of parks, buildings etc.)
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#080808' }] // Use app's background dark grey for POI areas
  },
  { // Parks (specific POI type)
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#050505' }] // Very dark grey for parks, almost black
  },
  { // Park labels - CHANGED TO WHITE
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#FAFAFA' }]
  },
  { // Administrative boundaries (e.g., country borders)
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#444444' }, { weight: 0.5 }] // Medium dark grey for borders
  },
  { // Locality labels (cities, towns) - CHANGED TO WHITE
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#FAFAFA' }]
  },
  { // Transit lines
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#181818' }] // Very dark grey for transit lines
  }
];


export function MomentsMap({ moments }: MomentsMapProps) {
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Ensure environment variable is accessed only on client-side
    setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  }, []);

  const validMoments = useMemo(() => moments.filter(moment => moment.coordinates), [moments]);

  const center = useMemo(() => {
    if (validMoments.length > 0 && validMoments[0].coordinates) {
      return { lat: validMoments[0].coordinates.lat, lng: validMoments[0].coordinates.lng };
    }
    return { lat: 40.7128, lng: -74.0060 }; // Default to New York City if no moments
  }, [validMoments]);

  const markers = useMemo(() =>
    validMoments.map((moment) => (
      moment.coordinates ?
      <MarkerF
        key={moment.id}
        position={{ lat: moment.coordinates.lat, lng: moment.coordinates.lng }}
        title={moment.placeName} // Sets the HTML title attribute for hover tooltip
        onClick={() => setSelectedMoment(moment)}
      /> : null
    ))
  , [validMoments, setSelectedMoment]);

  if (!isMounted) {
    // Return a simple loading state or null until mounted to avoid SSR issues with window access
    return <div className="flex items-center justify-center h-full bg-muted rounded-lg"><p>Loading map...</p></div>;
  }

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center h-full bg-muted rounded-lg p-4 text-center">
        <p className="text-destructive-foreground p-3 bg-destructive rounded-md text-sm">
          Google Maps API Key is missing. Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file and restart the server.
        </p>
      </div>
    );
  }

  return (
    <LoadScriptNext 
        googleMapsApiKey={apiKey} 
        loadingElement={<div className="flex items-center justify-center h-full bg-muted rounded-lg"><p>Loading map resources...</p></div>}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={validMoments.length > 0 ? 12 : 5} // Zoom in a bit more for local views
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: mapStyles,
        }}
        onClick={() => setSelectedMoment(null)} // Close info window when map is clicked
      >
        {isMounted && markers}
        {selectedMoment && selectedMoment.coordinates && isMounted && typeof window !== 'undefined' && window.google && (
          <InfoWindowF
            position={{ lat: selectedMoment.coordinates.lat, lng: selectedMoment.coordinates.lng }}
            onCloseClick={() => setSelectedMoment(null)}
            options={{ pixelOffset: new window.google.maps.Size(0, -35) }} // Adjust offset to sit above marker
          >
            <div className="p-3 bg-card text-card-foreground rounded-lg shadow-xl max-w-xs">
              <h4 className="font-bold text-md mb-1 text-primary">{selectedMoment.placeName}</h4>
              {selectedMoment.placeImage && (
                <img
                  src={selectedMoment.placeImage}
                  alt={selectedMoment.placeName}
                  className="my-2 rounded-md object-cover w-full max-h-32"
                  data-ai-hint="location landmark"
                />
              )}
              <p className="text-xs text-muted-foreground mb-0.5">
                {format(new Date(selectedMoment.timestamp), "MMM d, yyyy")}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(selectedMoment.timestamp), "p")} {/* p for localized time */}
              </p>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </LoadScriptNext>
  );
}
