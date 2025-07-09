
'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import type { UserProfile } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, UploadCloud, ArrowRight, MapPin } from 'lucide-react';
import Image from 'next/image';
import { completeOnboarding } from '@/app/actions';
import { generateHeightOptions, ethnicityOptions, datingIntentionsOptions, childrenStatusOptions } from '@/lib/options';
import { db, storage } from "@/lib/firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { GoogleMap, LoadScriptNext, StandaloneSearchBox, MarkerF } from '@react-google-maps/api';

interface OnboardingFormProps {
  user: UserProfile;
}

const mapStyles = [
  { elementType: 'geometry', stylers: [{ color: '#000000' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#FAFAFA' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#000000' }, { weight: 2 }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#101010' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#222222' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#E70F72' }] },
  { featureType: 'poi', elementType: 'labels.icon', stylers: [{ "visibility": "on" }, { "color": "#E70F72" }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#080808' }] },
];

export function OnboardingForm({ user }: OnboardingFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age || 25);
  const [heightInches, setHeightInches] = useState<number | undefined>(user.heightInches);
  const [ethnicity, setEthnicity] = useState(user.ethnicity || 'Prefer Not to Say');
  const [work, setWork] = useState(user.work || '');
  const [datingIntentions, setDatingIntentions] = useState(user.datingIntentions || 'Figuring it out');
  const [childrenStatus, setChildrenStatus] = useState(user.childrenStatus || "Don't have children");
  
  const [mainImage, setMainImage] = useState<string | null>(user.images[0] || null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  
  const [locationAddress, setLocationAddress] = useState(user.locationAddress || "");
  const [currentLocationName, setCurrentLocationName] = useState<string>(user.locationName || "");
  const [currentCoordinates, setCurrentCoordinates] = useState<google.maps.LatLngLiteral | null>(user.locationCoordinates || null);
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(user.locationCoordinates || null);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(user.locationCoordinates || { lat: 40.7128, lng: -74.0060 });

  const [isSaving, setIsSaving] = useState(false);
  const [mapsApiKey, setMapsApiKey] = useState<string | undefined>(undefined);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);

  useEffect(() => {
    setMapsApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  }, []);

  const heightOptions = useMemo(() => generateHeightOptions(), []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImageLoading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const dataUrl = reader.result as string;
        setMainImage(dataUrl); // Optimistic UI update
        setIsImageLoading(false);
        toast({ title: 'Image selected!', description: 'It will be saved with your profile.' });
      };
      reader.onerror = () => { throw new Error('Could not read file.'); };
    } catch (error) {
      console.error('Error handling image:', error);
      toast({ title: 'Error', description: 'Could not process image. Please try another.', variant: 'destructive' });
      setIsImageLoading(false);
    }
  };

  const uploadImageAndGetData = async (): Promise<string | null> => {
    if (!mainImage || !mainImage.startsWith('data:')) return mainImage;

    setIsSaving(true);
    toast({ title: 'Uploading photo...', description: 'Please wait.' });

    try {
      const filePath = `users/${user.id}/images/${Date.now()}`;
      const storageRef = ref(storage, filePath);
      const snapshot = await uploadString(storageRef, mainImage, 'data_url');
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image to storage:", error);
      toast({ title: "Upload Failed", description: "There was a problem saving your image.", variant: "destructive" });
      return null;
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mainImage) {
      toast({ title: "Profile Picture Required", description: "Please upload your main profile photo.", variant: "destructive" });
      return;
    }
    
    setIsSaving(true);

    const finalImageURL = await uploadImageAndGetData();
    if (!finalImageURL) {
      setIsSaving(false);
      return; 
    }

    const selectedHeightOption = heightOptions.find(h => h.value === heightInches);

    const onboardingData: Partial<UserProfile> = {
      name,
      age,
      images: [finalImageURL],
      height: selectedHeightOption ? selectedHeightOption.label : 'Prefer Not to Say',
      heightInches,
      ethnicity,
      work,
      datingIntentions,
      childrenStatus,
      locationAddress,
      locationName: currentLocationName || (locationAddress ? locationAddress.split(',')[0] : null),
      locationCoordinates: currentCoordinates || null,
    };
    
    // Create a new sanitized object. JSON.stringify automatically omits any keys with 'undefined' values.
    // This is a robust way to ensure no invalid data is sent to Firestore.
    const sanitizedData = JSON.parse(JSON.stringify(onboardingData));
    
    try {
      const result = await completeOnboarding(user.id, sanitizedData);
      if (result.success) {
        toast({
          title: "Welcome to Crossd!",
          description: "Your profile is set up. Let the connections begin! Redirecting...",
        });
        window.location.href = '/dashboard';
      } else {
        throw new Error(result.error || 'The server failed to save your onboarding data.');
      }
    } catch (error: any) {
      console.error("Failed to complete onboarding:", error);
      toast({ title: "Error", description: error.message || "Could not save your profile. Please try again.", variant: "destructive" });
      setIsSaving(false);
    }
  };
  
  const onLoadSearchBox = useCallback((ref: google.maps.places.SearchBox) => setSearchBox(ref), []);
  const onMapLoad = useCallback((mapInstance: google.maps.Map) => setMap(mapInstance), []);
  const onPlacesChanged = useCallback(() => {
    if (searchBox) {
      const places = searchBox.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const newAddr = place.formatted_address || "";
        const newName = place.name || "";
        const newCoords = place.geometry?.location
          ? { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() }
          : null;
        setLocationAddress(newAddr);
        setCurrentLocationName(newName);
        setCurrentCoordinates(newCoords);
        if (newCoords) {
          setMapCenter(newCoords);
          setMarkerPosition(newCoords);
          map?.panTo(newCoords);
          map?.setZoom(15);
        }
      }
    }
  }, [searchBox, map]);


  return (
    <Card className="w-full max-w-2xl shadow-xl">
      <form onSubmit={handleSubmit}>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Welcome to Crossd, {user.name}!</CardTitle>
          <CardDescription>Let's set up your profile with the basics. You can add more details later.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 p-6">
          
          {/* Photo Upload */}
          <div className="space-y-2 text-center">
            <Label className="text-lg font-semibold">Your Main Profile Picture</Label>
            <p className="text-sm text-muted-foreground pb-2">First impressions count! Pick a great photo of yourself.</p>
            <div className="flex justify-center">
              <Card 
                className="group relative aspect-[3/4] w-48 overflow-hidden bg-muted border-2 border-dashed flex items-center justify-center cursor-pointer hover:border-primary"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                {isImageLoading ? (
                  <Loader2 className="h-8 w-8 text-primary animate-spin" />
                ) : mainImage ? (
                  <Image src={mainImage} alt="Profile preview" layout="fill" objectFit="cover" data-ai-hint="profile photo" />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <UploadCloud className="h-10 w-10 mx-auto" />
                    <p className="text-sm font-medium mt-1">Upload Photo</p>
                  </div>
                )}
              </Card>
            </div>
            <Input id="image-upload" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div>
              <Label htmlFor="age">Age</Label>
              <Select value={String(age)} onValueChange={(v) => setAge(parseInt(v))}>
                <SelectTrigger id="age" className="mt-1 bg-input"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-popover">
                  {Array.from({ length: 43 }, (_, i) => 18 + i).map(a => <SelectItem key={a} value={String(a)}>{a}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="height">Height</Label>
              <Select value={heightInches ? String(heightInches) : ''} onValueChange={(v) => setHeightInches(Number(v))}>
                <SelectTrigger id="height" className="mt-1 bg-input"><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent className="bg-popover">
                  {heightOptions.map(opt => <SelectItem key={opt.value} value={String(opt.value)}>{opt.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="work">Work / Occupation</Label>
              <Input id="work" value={work} onChange={(e) => setWork(e.target.value)} className="mt-1 bg-input" placeholder="e.g., Software Engineer" />
            </div>
            <div>
              <Label htmlFor="ethnicity">Ethnicity</Label>
              <Select value={ethnicity} onValueChange={setEthnicity}>
                <SelectTrigger id="ethnicity" className="mt-1 bg-input"><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent className="bg-popover">
                  <SelectItem value="Prefer Not to Say">Prefer Not to Say</SelectItem>
                  {ethnicityOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="datingIntentions">Dating Intentions</Label>
              <Select value={datingIntentions} onValueChange={setDatingIntentions}>
                <SelectTrigger id="datingIntentions" className="mt-1 bg-input"><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent className="bg-popover">
                  {datingIntentionsOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="childrenStatus">Children</Label>
              <Select value={childrenStatus} onValueChange={setChildrenStatus}>
                <SelectTrigger id="childrenStatus" className="mt-1 bg-input"><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent className="bg-popover">
                  {childrenStatusOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="locationAddress">Your Location</Label>
             <p className="text-sm text-muted-foreground pb-2">Where do you typically hang out? This helps us find people you might have crossed paths with.</p>
             {mapsApiKey ? (
                 <LoadScriptNext
                    id="onboarding-google-maps-script"
                    googleMapsApiKey={mapsApiKey}
                    libraries={['places']}
                    loadingElement={<div className="text-center p-2"><Loader2 className="h-5 w-5 animate-spin inline-block"/></div>}
                >
                    <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                        <StandaloneSearchBox onLoad={onLoadSearchBox} onPlacesChanged={onPlacesChanged}>
                            <Input id="locationAddress" value={locationAddress} onChange={(e) => setLocationAddress(e.target.value)} className="bg-input pl-10" placeholder="Search for your city or neighborhood"/>
                        </StandaloneSearchBox>
                    </div>
                    <div className="mt-2 h-48 w-full bg-muted rounded-md overflow-hidden border border-border">
                        <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={mapCenter} zoom={markerPosition ? 14 : 9} onLoad={onMapLoad} options={{ styles: mapStyles, streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}>
                            {markerPosition && <MarkerF position={markerPosition} />}
                        </GoogleMap>
                    </div>
                </LoadScriptNext>
             ) : (
                <Input id="locationAddress" value={locationAddress} onChange={(e) => setLocationAddress(e.target.value)} className="bg-input mt-1" placeholder="e.g., Brooklyn, New York"/>
             )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ArrowRight className="mr-2 h-4 w-4" />}
            {isSaving ? 'Saving...' : 'Finish & Start Matching'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
