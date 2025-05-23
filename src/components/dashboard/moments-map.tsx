
"use client";

import { GoogleMap, LoadScriptNext, MarkerF, InfoWindowF } from '@react-google-maps/api';
import type { Moment } from '@/lib/types';
import { useMemo, useState, useEffect } from 'react';
import { format } from 'date-fns';
// Image component is no longer needed here for the InfoWindow
// import Image from 'next/image'; 

interface MomentsMapProps {
  moments: Moment[];
}

const containerStyle = {
  width: '100%',
  height: '100%', 
};

const mapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#000000' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#FAFAFA' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#000000' }, { weight: 2 }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#101010' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#FAFAFA' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#222222' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#A3A3A3' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#E70F72' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#FAFAFA' }] },
  { featureType: 'poi', elementType: 'labels.icon', stylers: [{ "visibility": "on" }, { "color": "#E70F72" }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#080808' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#050505' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#FAFAFA' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#444444' }, { weight: 0.5 }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#FAFAFA' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#181818' }] }
];


export function MomentsMap({ moments }: MomentsMapProps) {
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);

  useEffect(() => {
    setIsMounted(true);
    setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  }, []);

  const handleMarkerClick = (moment: Moment) => {
    setSelectedMoment(moment);
  };

  const validMoments = useMemo(() => moments.filter(moment => moment.coordinates), [moments]);

  const center = useMemo(() => {
    if (validMoments.length > 0 && validMoments[0].coordinates) {
      return { lat: validMoments[0].coordinates.lat, lng: validMoments[0].coordinates.lng };
    }
    return { lat: 40.7128, lng: -74.0060 }; 
  }, [validMoments]);

  const markers = useMemo(() =>
    validMoments.map((moment) => (
      moment.coordinates ?
      <MarkerF
        key={moment.id}
        position={{ lat: moment.coordinates.lat, lng: moment.coordinates.lng }}
        title={moment.placeName}
        onClick={() => handleMarkerClick(moment)}
      /> : null
    ))
  , [validMoments]);

  if (!isMounted) {
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
        zoom={validMoments.length > 0 ? 12 : 5}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          styles: mapStyles,
        }}
        onClick={() => {
          setSelectedMoment(null);
        }}
      >
        {isMounted && markers}
        {selectedMoment && selectedMoment.coordinates && isMounted && typeof window !== 'undefined' && window.google && (
          <InfoWindowF
            position={{ lat: selectedMoment.coordinates.lat, lng: selectedMoment.coordinates.lng }}
            onCloseClick={() => {
              setSelectedMoment(null);
            }}
            options={{ pixelOffset: new window.google.maps.Size(0, -35) }}
          >
            <div className="p-3 bg-card text-card-foreground rounded-lg shadow-xl max-w-xs w-64">
              <h4 className="font-bold text-md mb-1 text-primary">{selectedMoment.placeName}</h4>
              
              {/* Removed image display section */}

              <p className="text-xs text-muted-foreground mb-0.5">
                {format(new Date(selectedMoment.timestamp), "MMM d, yyyy")}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(selectedMoment.timestamp), "p")}
              </p>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </LoadScriptNext>
  );
}
    