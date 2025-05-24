
"use client";

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import type { UserProfile } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X as XIcon, PlusCircle, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MOCK_USERS, MOCK_USER_ID } from "@/lib/mock-data";
import { useRouter } from "next/navigation";
import { GoogleMap, LoadScriptNext, StandaloneSearchBox, MarkerF } from '@react-google-maps/api';

interface ProfileDetailsProps {
  user: UserProfile;
}

const ethnicityOptions = [
  "White/Caucasian",
  "Black/African Descent",
  "East Asian",
  "Hispanic/Latino",
  "Middle Eastern",
  "Native American",
  "Pacific Islander",
  "South Asian",
  "Southeast Asian",
  "Other",
  "Prefer Not to Say",
];

const childrenStatusOptions = [
  "Don't have children",
  "Have Children",
  "Prefer Not to Say",
];

const familyPlansOptions = [
  "Don't want children",
  "Want children",
  "Not Sure",
  "Prefer Not to Say",
];

const drinkingOptions = [
  "Yes",
  "Sometimes",
  "No",
  "Prefer Not to Say",
];

const smokingOptions = [ // Added
  "Yes",
  "Sometimes",
  "No",
  "Prefer Not to Say",
];

const generateHeightOptions = () => {
  const options = ["Prefer Not to Say"];
  for (let feet = 3; feet <= 7; feet++) {
    for (let inches = 0; inches <= 11; inches++) {
      if (feet === 7 && inches > 0) break;
      options.push(`${feet}'${inches}"`);
    }
  }
  return options;
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


export function ProfileDetails({ user }: ProfileDetailsProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || "");
  const [age, setAge] = useState(user.age);
  const [bio, setBio] = useState(user.bio);
  const [vibeTags, setVibeTags] = useState<string[]>(user.vibeTags);
  const [newTag, setNewTag] = useState("");
  const [work, setWork] = useState(user.work || "");
  const [jobTitle, setJobTitle] = useState(user.jobTitle || "");
  const [education, setEducation] = useState(user.education || "");
  const [ethnicity, setEthnicity] = useState(user.ethnicity || "Prefer Not to Say");
  const [childrenStatus, setChildrenStatus] = useState(user.childrenStatus || "Prefer Not to Say");
  const [familyPlans, setFamilyPlans] = useState(user.familyPlans || "Prefer Not to Say");
  const [height, setHeight] = useState(user.height || "Prefer Not to Say");
  const [drinking, setDrinking] = useState(user.drinking || "Prefer Not to Say");
  const [smoking, setSmoking] = useState(user.smoking || "Prefer Not to Say"); // Added

  const [locationAddress, setLocationAddress] = useState(user.locationAddress || "");
  const [currentLocationName, setCurrentLocationName] = useState<string>(user.locationName || "");
  const [currentCoordinates, setCurrentCoordinates] = useState<google.maps.LatLngLiteral | null>(user.locationCoordinates || null);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(user.locationCoordinates || null);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(user.locationCoordinates || { lat: 40.7128, lng: -74.0060 });

  const [isMounted, setIsMounted] = useState(false);
  const [mapsApiKey, setMapsApiKey] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIsMounted(true);
    setMapsApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  }, []);

  const { toast } = useToast();
  const router = useRouter();

  const heightOptions = useMemo(() => generateHeightOptions(), []);

  const handleAddTag = () => {
    if (newTag.trim() !== "" && !vibeTags.includes(newTag.trim().toLowerCase())) {
      setVibeTags([...vibeTags, newTag.trim().toLowerCase()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setVibeTags(vibeTags.filter(tag => tag !== tagToRemove));
  };

  const onLoadSearchBox = useCallback((ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  }, []);

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

  const onMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentUserIndex = MOCK_USERS.findIndex(u => u.id === MOCK_USER_ID);
    if (currentUserIndex !== -1) {
      const updatedUser = {
        ...MOCK_USERS[currentUserIndex],
        name,
        email,
        age,
        bio,
        vibeTags,
        work,
        jobTitle,
        education,
        ethnicity,
        childrenStatus,
        familyPlans,
        height,
        drinking,
        smoking, // Added
        locationAddress,
        locationName: currentLocationName || (locationAddress ? locationAddress.split(',')[0] : MOCK_USERS[currentUserIndex].locationName),
        locationCoordinates: currentCoordinates || MOCK_USERS[currentUserIndex].locationCoordinates,
      };
      MOCK_USERS.splice(currentUserIndex, 1, updatedUser);
    }

    toast({
      title: "Profile Updated",
      description: "Your profile details have been saved.",
    });

    router.refresh();
  };

  if (!isMounted) {
    return <div>Loading location services...</div>; // Or a skeleton loader
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 bg-input" />
        </div>
         <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 bg-input" />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={age === 0 && !name ? '' : age} // Show empty if age is 0 and name is also empty (initial state), otherwise show age
            onChange={(e) => {
              const rawValue = e.target.value;
              const parsedAge = parseInt(rawValue, 10);
              if (rawValue === "" || isNaN(parsedAge)) {
                setAge(0);
              } else {
                setAge(parsedAge < 0 ? 0 : parsedAge); // Prevent negative age
              }
            }}
            className="mt-1 bg-input"
            min="0"
          />
        </div>
        <div>
          <Label htmlFor="work">Work</Label>
          <Input id="work" value={work} onChange={(e) => setWork(e.target.value)} className="mt-1 bg-input" placeholder="e.g., Company Name" />
        </div>
        <div>
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="mt-1 bg-input" placeholder="e.g., Software Engineer" />
        </div>
        <div>
          <Label htmlFor="education">College/University</Label>
          <Input id="education" value={education} onChange={(e) => setEducation(e.target.value)} className="mt-1 bg-input" placeholder="e.g., State University" />
        </div>
        <div>
          <Label htmlFor="ethnicity">Ethnicity</Label>
          <Select value={ethnicity} onValueChange={setEthnicity}>
            <SelectTrigger className="mt-1 bg-input">
              <SelectValue placeholder="Select your ethnicity" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {ethnicityOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="childrenStatus">Children</Label>
          <Select value={childrenStatus} onValueChange={setChildrenStatus}>
            <SelectTrigger className="mt-1 bg-input">
              <SelectValue placeholder="Your children status" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {childrenStatusOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="familyPlans">Family Plans</Label>
          <Select value={familyPlans} onValueChange={setFamilyPlans}>
            <SelectTrigger className="mt-1 bg-input">
              <SelectValue placeholder="Your family plans" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {familyPlansOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="height">Height</Label>
          <Select value={height} onValueChange={setHeight}>
            <SelectTrigger className="mt-1 bg-input">
              <SelectValue placeholder="Select your height" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {heightOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="drinking">Drinking</Label>
          <Select value={drinking} onValueChange={setDrinking}>
            <SelectTrigger className="mt-1 bg-input">
              <SelectValue placeholder="Your drinking habits" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {drinkingOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="smoking">Smoking</Label>
          <Select value={smoking} onValueChange={setSmoking}>
            <SelectTrigger className="mt-1 bg-input">
              <SelectValue placeholder="Your smoking habits" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {smokingOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="locationAddress">Location (Address, Area, or Postcode)</Label>
        {!mapsApiKey ? (
            <div className="mt-1 p-3 bg-destructive text-destructive-foreground rounded-md text-sm">
                Google Maps API Key is missing or invalid. Location search and map will not work.
            </div>
        ) : (
        <LoadScriptNext
            googleMapsApiKey={mapsApiKey}
            libraries={['places']}
            loadingElement={<div className="mt-1 text-muted-foreground">Loading map services...</div>}
        >
            <div className="relative mt-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                <StandaloneSearchBox
                    onLoad={onLoadSearchBox}
                    onPlacesChanged={onPlacesChanged}
                >
                    <Input
                        id="locationAddress"
                        value={locationAddress}
                        onChange={(e) => {
                            setLocationAddress(e.target.value);
                            if (e.target.value !== currentLocationName) {
                                setCurrentCoordinates(null);
                                setMarkerPosition(null);
                                setCurrentLocationName("");
                            }
                        }}
                        className="bg-input pl-10"
                        placeholder="e.g., 123 Main St, Anytown or Anytown"
                    />
                </StandaloneSearchBox>
            </div>
            <div className="mt-2 h-72 w-full bg-muted rounded-md overflow-hidden border border-border">
                 <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={mapCenter}
                    zoom={markerPosition ? 15 : 8}
                    onLoad={onMapLoad}
                    options={{ styles: mapStyles, streetViewControl: false, mapTypeControl: false, fullscreenControl: false }}
                >
                    {markerPosition && <MarkerF position={markerPosition} />}
                </GoogleMap>
            </div>
        </LoadScriptNext>
        )}
      </div>


      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="mt-1 bg-input" />
      </div>
      <div>
        <Label>Vibe Tags</Label>
        <div className="flex flex-wrap gap-2 mt-2 mb-2">
          {vibeTags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-sm capitalize group relative pr-6">
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="absolute right-1 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100"
                aria-label={`Remove tag ${tag}`}
              >
                <XIcon className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Add a vibe tag (e.g., foodie)"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); }}}
            className="bg-input flex-grow"
          />
          <Button type="button" onClick={handleAddTag} variant="outline" size="icon">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Press Enter or click '+' to add a tag.</p>
      </div>
      <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
    </form>
  );
}
