
"use client";

import { GoogleMap, LoadScriptNext, MarkerF } from '@react-google-maps/api';
import type { Moment } from '@/lib/types';
import { useMemo, useState, useEffect } from 'react';

interface MomentsMapProps {
  moments: Moment[];
}

const containerStyle = {
  width: '100%',
  height: '100%', // Will be controlled by parent div aspect ratio
};

// Custom map styles emphasizing #000000 (black) and #E70F72 (primary pink)
const mapStyles = [
  { // Base geometry (land, etc.)
    elementType: 'geometry',
    stylers: [{ color: '#000000' }] // Pure black for land
  },
  { // All labels text fill
    elementType: 'labels.text.fill',
    stylers: [{ color: '#FAFAFA' }] // Light foreground for readability
  },
  { // All labels text stroke
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#000000' }, { weight: 2 }] // Black stroke for sharp text on light/pink areas
  },
  { // Water bodies
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#E70F72' }] // Primary pink for water
  },
  { // Water labels
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#FAFAFA' }] // Light text on pink water for contrast
  },
  { // Roads
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#E70F72' }] // Primary pink for roads
  },
  { // Road labels - make them blend or very dark
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#000000' }] // Black text for roads, subtle on pink
  },
  { // Highways - make them stand out a bit more from regular roads
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#FF4DA6' }] // A slightly lighter/brighter pink than primary
  },
  { // Points of Interest (POIs) text
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#E70F72' }] // Primary pink for POI text
  },
  { // POI icons - make them pink
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
  { // Park labels
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#E70F72' }] // Primary pink for park labels
  },
  { // Administrative boundaries (e.g., country borders)
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#E70F72' }, { weight: 0.5 }] // Primary pink for borders
  },
  { // Locality labels (cities, towns)
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#E70F72' }] // Primary pink for city/town names
  },
  { // Transit lines
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#870842' }] // A darker shade of pink for transit lines
  }
];


export function MomentsMap({ moments }: MomentsMapProps) {
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);

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
        title={moment.placeName}
        // Custom marker icon (optional, example for a pink marker)
        // icon={{
        //   path: window.google.maps.SymbolPath.CIRCLE,
        //   fillColor: '#E70F72',
        //   fillOpacity: 1,
        //   strokeColor: '#FFFFFF',
        //   strokeWeight: 1,
        //   scale: 8
        // }}
      /> : null
    ))
  , [validMoments]);

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
    <LoadScriptNext googleMapsApiKey={apiKey} loadingElement={<div className="flex items-center justify-center h-full bg-muted rounded-lg"><p>Loading map resources...</p></div>}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={validMoments.length > 0 ? 10 : 5} 
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: mapStyles, // Apply the new black and pink themed styles
        }}
      >
        {isMounted && markers}
      </GoogleMap>
    </LoadScriptNext>
  );
}

