
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

// Custom map styles featuring #E70F72 (primary pink)
const mapStyles = [
  { // Base geometry (land, etc.)
    elementType: 'geometry',
    stylers: [{ color: '#101010' }] // Dark base like card background
  },
  { // All labels text fill
    elementType: 'labels.text.fill',
    stylers: [{ color: '#FAFAFA' }] // Foreground color for readability
  },
  { // All labels text stroke
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#101010' }, { weight: 2 }] // Dark stroke for readability
  },
  { // Water bodies
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#5E062E' }] // Darker shade of primary pink
  },
  { // Water labels
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#E70F72' }]
  },
  { // Roads
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#E70F72' }]
  },
  { // Roads - attempt to hide road labels by making them blend or very dark
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#181818' }] 
  },
  { // Highways - make them stand out a bit more
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#FF4DA6' }] // A slightly lighter/brighter pink than primary
  },
  { // Points of Interest (POIs) text
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#E70F72' }]
  },
  { // POI icons - attempt to make them pink (might not affect all icons)
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [{ "saturation": 100 }, { "lightness": -10 }, { "gamma": 0.9 }, { "hue": "#E70F72" }]
  },
  { // POI geometry (the shapes of parks, buildings etc.)
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{ color: '#2E0414' }] // Dark, muted pink for POI areas
  },
  { // Parks
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#400F20' }] // Muted darker pink for parks
  },
  { // Park labels
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#E70F72' }]
  },
  { // Administrative boundaries (e.g., country borders)
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#E70F72' }, { weight: 0.5 }]
  },
  { // Locality labels (cities, towns)
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#E70F72' }]
  },
  { // Transit lines
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#870842' }] // Another shade of pink for transit
  }
];


export function MomentsMap({ moments }: MomentsMapProps) {
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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
        // You can customize marker icons here if needed, e.g., make them pink
        // icon={{ url: '/path/to/pink-marker.svg', scaledSize: new window.google.maps.Size(30,30) }}
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
          styles: mapStyles, // Apply the new pink-themed styles
        }}
      >
        {markers}
      </GoogleMap>
    </LoadScriptNext>
  );
}

