
"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import type { UserProfile } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X as XIcon, MapPin, Lightbulb, Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GoogleMap, LoadScriptNext, StandaloneSearchBox, MarkerF } from '@react-google-maps/api';
import { getAiSuggestedVibeTags, getAiSuggestedBio } from "@/app/actions";
import type { SuggestBioInput } from "@/ai/flows/suggest-bio-flow";
import type { VibeTagSuggestion } from "@/ai/flows/suggest-vibe-tags-flow";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { AVAILABLE_PROMPTS } from "@/lib/mock-data";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  ethnicityOptions as defaultEthnicityOptions,
  genderOptions,
  childrenStatusOptions,
  familyPlansOptions,
  drinkingOptions,
  smokingOptions,
  zodiacSignOptions,
  generateHeightOptions,
  datingIntentionsOptions,
  religionOptions,
  relationshipTypeOptions,
  interestedInOptions,
} from '@/lib/options';


interface ProfileDetailsProps {
  user: UserProfile;
}

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

const staticTagCategories: { title: string; tags: { tag: string; emoji: string }[] }[] = [
  {
    title: "Personality",
    tags: [
      { tag: 'funny', emoji: '😂' }, { tag: 'ambitious', emoji: '✨' }, { tag: 'morning person', emoji: '☀️' },
      { tag: 'night owl', emoji: '🦉' }, { tag: 'intelligent', emoji: '🧠' }, { tag: 'thoughtful', emoji: '🤔' },
      { tag: 'spontaneous', emoji: '⚡️' }, { tag: 'optimist', emoji: '😊' }, { tag: 'realist', emoji: '😐' },
      { tag: 'introvert', emoji: '🤫' }, { tag: 'extrovert', emoji: '🗣️' }, { tag: 'creative', emoji: '🎨' },
      { tag: 'calm', emoji: '🧘' }, { tag: 'energetic', emoji: '🤸‍♀️' }, { tag: 'romantic', emoji: '❤️' },
      { tag: 'witty', emoji: '😏' },
    ],
  },
  {
    title: "Places & Activities",
    tags: [
      { tag: 'coffee shops', emoji: '☕️' }, { tag: 'theatres', emoji: '🎭' }, { tag: 'cinemas', emoji: '🎬' },
      { tag: 'bowling', emoji: '🎳' }, { tag: 'beaches', emoji: '🏖️' }, { tag: 'countryside', emoji: '🌳' },
      { tag: 'mountains', emoji: '⛰️' }, { tag: 'restaurants', emoji: '🍽️' }, { tag: 'museums', emoji: '🏛️' },
      { tag: 'live music', emoji: '🎤' }, { tag: 'art galleries', emoji: '🎨' }, { tag: 'parks', emoji: '🏞️' },
      { tag: 'pubs', emoji: '🍻' }, { tag: 'clubs', emoji: '💃' }, { tag: 'hiking', emoji: '🥾' },
    ],
  },
  {
    title: "Zodiac",
    tags: [
      { tag: 'aries', emoji: '♈️' }, { tag: 'taurus', emoji: '♉️' }, { tag: 'gemini', emoji: '♊️' },
      { tag: 'cancer', emoji: '♋️' }, { tag: 'leo', emoji: '♌️' }, { tag: 'virgo', emoji: '♍️' },
      { tag: 'libra', emoji: '♎️' }, { tag: 'scorpio', emoji: '♏️' }, { tag: 'sagittarius', emoji: '♐️' },
      { tag: 'capricorn', emoji: '♑️' }, { tag: 'aquarius', emoji: '♒️' }, { tag: 'pisces', emoji: '♓️' },
    ],
  },
];

const ethnicityOptions = ["Prefer Not to Say", ...defaultEthnicityOptions];
const allReligionOptions = ["Prefer Not to Say", ...religionOptions];
const allDatingIntentionsOptions = ["Prefer Not to Say", ...datingIntentionsOptions];
const allRelationshipTypeOptions = ["Prefer Not to Say", ...relationshipTypeOptions];


const CustomLoadingElement = () => (
  <div className="mt-1 text-muted-foreground flex items-center">
    <Loader2 className="h-4 w-4 animate-spin text-primary mr-2" />
    Loading map services...
  </div>
);

export function ProfileDetails({ user }: ProfileDetailsProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || "");
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender || 'prefer_not_to_say');
  const [interestedIn, setInterestedIn] = useState(user.interestedIn || 'everyone');
  const [bio, setBio] = useState(user.bio);
  const [vibeTags, setVibeTags] = useState<string[]>(user.vibeTags);
  const [work, setWork] = useState(user.work || "");
  const [jobTitle, setJobTitle] = useState(user.jobTitle || "");
  const [education, setEducation] = useState(user.education || "");
  const [ethnicity, setEthnicity] = useState(user.ethnicity || "Prefer Not to Say");
  const [childrenStatus, setChildrenStatus] = useState(user.childrenStatus || "Prefer Not to Say");
  const [familyPlans, setFamilyPlans] = useState(user.familyPlans || "Prefer Not to Say");
  const [heightInches, setHeightInches] = useState<number | undefined>(user.heightInches);
  const [drinking, setDrinking] = useState(user.drinking || "Prefer Not to Say");
  const [smoking, setSmoking] = useState(user.smoking || "Prefer Not to Say");
  const [zodiacSign, setZodiacSign] = useState(user.zodiacSign || "Prefer Not to Say");
  const [datingIntentions, setDatingIntentions] = useState(user.datingIntentions || "Prefer Not to Say");
  const [religion, setReligion] = useState(user.religion || "Prefer Not to Say");
  const [relationshipType, setRelationshipType] = useState(user.relationshipType || "Prefer Not to Say");


  const [locationServicesEnabled, setLocationServicesEnabled] = useState(user.locationServicesEnabled ?? false);
  const [locationAddress, setLocationAddress] = useState(user.locationAddress || "");
  const [currentLocationName, setCurrentLocationName] = useState<string>(user.locationName || "");
  const [currentCoordinates, setCurrentCoordinates] = useState<google.maps.LatLngLiteral | null>(user.locationCoordinates || null);

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox | null>(null);
  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(user.locationCoordinates || null);
  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(user.locationCoordinates || { lat: 40.7128, lng: -74.0060 });

  const [isSaving, setIsSaving] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [mapsApiKey, setMapsApiKey] = useState<string | undefined>(undefined);

  const [aiSuggestedTags, setAiSuggestedTags] = useState<VibeTagSuggestion[]>([]);
  const [isSuggestingTags, setIsSuggestingTags] = useState(false);
  const [isLoadingBioSuggestion, setIsLoadingBioSuggestion] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    setMapsApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  }, []);

  const { toast } = useToast();
  const heightOptions = useMemo(() => generateHeightOptions(), []);

  const handleRemoveTag = (tagToRemove: string) => {
    setVibeTags(vibeTags.filter(tag => tag !== tagToRemove));
  };

  const handleSuggestVibeTags = async () => {
    setIsSuggestingTags(true);
    setAiSuggestedTags([]);
    try {
      const suggestions = await getAiSuggestedVibeTags(bio, vibeTags);
      const newSuggestions = suggestions.filter(
        s => !vibeTags.some(existing => existing.includes(s.tag))
      );
      setAiSuggestedTags(newSuggestions);
      if (newSuggestions.length === 0) {
        toast({
          title: "No New Tag Suggestions",
          description: "The AI couldn't find new tags for you right now. Your current tags might be comprehensive!",
        });
      }
    } catch (error) {
      console.error("Failed to get AI tag suggestions:", error);
      toast({
        title: "Error Suggesting Tags",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSuggestingTags(false);
    }
  };
  
  const handleAddVibeTag = (tagSuggestion: { tag: string; emoji: string }) => {
    const fullTag = `${tagSuggestion.emoji} ${tagSuggestion.tag}`;
    if (vibeTags.some(tag => tag.includes(tagSuggestion.tag))) {
      return;
    }
    setVibeTags([...vibeTags, fullTag]);
    setAiSuggestedTags(prev => prev.filter(s => s.tag !== tagSuggestion.tag));
  };

  const handleSuggestBio = async () => {
    setIsLoadingBioSuggestion(true);
    try {
      // We need the prompt questions, not just IDs, for the AI.
      const promptAnswersWithQuestions = user.prompts.map(userPrompt => {
          const promptDetail = AVAILABLE_PROMPTS.find(p => p.id === userPrompt.promptId);
          return {
              question: promptDetail?.question || "A prompt",
              answer: userPrompt.answer,
          };
      }).filter(p => p.answer.trim() !== "");

      const input: SuggestBioInput = {
          name: name,
          age: age,
          currentBio: bio || undefined,
          vibeTags: vibeTags.length > 0 ? vibeTags : undefined,
          work: work || undefined,
          jobTitle: jobTitle || undefined,
          education: education || undefined,
          promptAnswers: promptAnswersWithQuestions.length > 0 ? promptAnswersWithQuestions : undefined,
      };

      const suggested = await getAiSuggestedBio(input);
      setBio(suggested);
      toast({
        title: "AI Bio Suggestion Applied!",
        description: "The AI's bio suggestion has been added to the editor.",
      });
    } catch (error) {
      console.error("Failed to get AI bio suggestion:", error);
      toast({
        title: "Error Suggesting Bio",
        description: "Something went wrong with the AI bio suggestion. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingBioSuggestion(false);
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    if (!name.trim() || age < 18) {
      toast({
        title: "Incomplete Profile",
        description: "Please provide your name and ensure you are at least 18.",
        variant: "destructive",
      });
      setIsSaving(false);
      return;
    }

    const selectedHeightOption = heightOptions.find(h => h.value === heightInches);

    const profileData: Partial<UserProfile> = {
      name, email, age, bio, vibeTags, work, jobTitle, education,
      gender, interestedIn, ethnicity, childrenStatus, familyPlans, 
      heightInches: heightInches ?? null,
      height: selectedHeightOption ? selectedHeightOption.label : "Prefer Not to Say",
      drinking, smoking, zodiacSign, datingIntentions, religion, relationshipType,
      locationAddress, 
      locationName: currentLocationName || (locationAddress ? locationAddress.split(',')[0] : user.locationName),
      locationCoordinates: currentCoordinates || user.locationCoordinates,
      locationServicesEnabled,
      onboardingComplete: true,
    };

    try {
      const userDocRef = doc(db, "users", user.id);
      await updateDoc(userDocRef, profileData);
      toast({
        title: "Profile Updated",
        description: "Your changes have been saved.",
      });
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error Saving Profile",
        description: error.message || "Could not save your changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const renderLocationSection = () => {
    if (!isMounted) {
      return <CustomLoadingElement />;
    }
    if (!mapsApiKey) {
      return (
        <div className="mt-1 p-3 bg-destructive text-destructive-foreground rounded-md text-sm">
          Google Maps API Key is missing or invalid. Location search and map will not work. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env file.
        </div>
      );
    }
    return (
      <LoadScriptNext
        id="app-google-maps-script"
        googleMapsApiKey={mapsApiKey}
        libraries={['places']}
        loadingElement={<CustomLoadingElement />}
        preventGoogleFontsLoading={true}
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
                if (e.target.value !== currentLocationName && e.target.value !== user.locationAddress) {
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
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">First Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 bg-input" />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 bg-input" />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Select value={String(age)} onValueChange={(value) => setAge(parseInt(value, 10))}>
            <SelectTrigger id="age" className="mt-1 bg-input">
              <SelectValue placeholder="Select your age" />
            </SelectTrigger>
            <SelectContent className="bg-popover max-h-60">
              {Array.from({ length: 43 }, (_, i) => 18 + i).map((ageOption) => (
                <SelectItem key={ageOption} value={String(ageOption)}>
                  {ageOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
           <Select value={gender} onValueChange={(value: UserProfile['gender']) => setGender(value)}>
            <SelectTrigger id="gender" className="mt-1 bg-input">
              <SelectValue placeholder="Select your gender" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {genderOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="interestedIn">I'm interested in...</Label>
           <Select value={interestedIn} onValueChange={(value: UserProfile['interestedIn']) => setInterestedIn(value)}>
            <SelectTrigger id="interestedIn" className="mt-1 bg-input">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {interestedInOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="height">Height</Label>
          <Select value={heightInches ? String(heightInches) : "Prefer Not to Say"} onValueChange={(val) => setHeightInches(val === "Prefer Not to Say" ? undefined : Number(val))}>
            <SelectTrigger className="mt-1 bg-input">
              <SelectValue placeholder="Select your height" />
            </SelectTrigger>
            <SelectContent className="bg-popover max-h-60">
                <SelectItem value={"Prefer Not to Say"}>Prefer Not to Say</SelectItem>
              {heightOptions.map((option) => (
                <SelectItem key={option.value} value={String(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* Work & Education */}
      <h3 className="text-lg font-medium text-foreground -mb-4">Work & Education</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="work">Work</Label>
          <Input id="work" value={work} onChange={(e) => setWork(e.target.value)} className="mt-1 bg-input" placeholder="e.g., Company Name" />
        </div>
        <div>
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="mt-1 bg-input" placeholder="e.g., Software Engineer" />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="education">College/University</Label>
          <Input id="education" value={education} onChange={(e) => setEducation(e.target.value)} className="mt-1 bg-input" placeholder="e.g., State University" />
        </div>
      </div>

      <Separator />

      {/* Lifestyle */}
      <h3 className="text-lg font-medium text-foreground -mb-4">Lifestyle & Background</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <Label htmlFor="religion">Religion</Label>
          <Select value={religion} onValueChange={(val: UserProfile['religion']) => setReligion(val)}>
            <SelectTrigger id="religion" className="mt-1 bg-input">
              <SelectValue placeholder="Select your religion" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {allReligionOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="zodiacSign">Zodiac Sign</Label>
          <Select value={zodiacSign} onValueChange={setZodiacSign}>
            <SelectTrigger className="mt-1 bg-input">
              <SelectValue placeholder="Your zodiac sign" />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {zodiacSignOptions.map((option) => (
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

      <Separator />

      {/* Dating & Relationship */}
      <h3 className="text-lg font-medium text-foreground -mb-4">Dating & Relationships</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="relationshipType">Relationship Type</Label>
          <Select value={relationshipType} onValueChange={(val: UserProfile['relationshipType']) => setRelationshipType(val)}>
            <SelectTrigger id="relationshipType" className="mt-1 bg-input">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {allRelationshipTypeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="datingIntentions">Dating Intentions</Label>
          <Select value={datingIntentions} onValueChange={(val: UserProfile['datingIntentions']) => setDatingIntentions(val)}>
            <SelectTrigger id="datingIntentions" className="mt-1 bg-input">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent className="bg-popover">
              {allDatingIntentionsOptions.map((option) => (
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
      </div>

      <Separator />
      
      <div>
        <h3 className="text-lg font-medium text-foreground">Location</h3>
        <p className="text-sm text-muted-foreground">Set your primary location.</p>
        {renderLocationSection()}
      </div>
      
      <Separator />

      <div>
        <h3 className="text-lg font-medium text-foreground">Privacy Settings</h3>
        <p className="text-sm text-muted-foreground">Control how your data is used within the app.</p>
        <div className="mt-4 rounded-lg border bg-card p-4 flex items-center justify-between shadow-sm">
          <div className="space-y-0.5">
            <Label htmlFor="location-services" className="font-semibold text-base">Location Services</Label>
            <p className="text-sm text-muted-foreground pr-4">
              Allow Crossd to access your device's location to find potential connections where your paths cross.
            </p>
          </div>
          <Switch
            id="location-services"
            checked={locationServicesEnabled}
            onCheckedChange={setLocationServicesEnabled}
            aria-label="Toggle location services"
          />
        </div>
      </div>
      
      <Separator />

      <div>
        <div className="flex items-center justify-between mb-1">
          <Label htmlFor="bio">Bio</Label>
          <Button 
            type="button" 
            onClick={handleSuggestBio} 
            variant="outline" 
            size="sm" 
            disabled={isLoadingBioSuggestion || isSaving}
            className="text-xs"
          >
            {isLoadingBioSuggestion ? (
              <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            )}
            Suggest with AI
          </Button>
        </div>
        <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} className="mt-1 bg-input" />
      </div>

      <div>
        <Label>Vibe Tags</Label>
        <p className="text-xs text-muted-foreground mt-1">Your current vibes. Click a tag to remove it.</p>
        <div className="flex flex-wrap gap-2 mt-2 mb-4 min-h-[2.5rem]">
          {vibeTags.length > 0 ? vibeTags.map(tag => (
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
          )) : <p className="text-sm text-muted-foreground italic px-1">No vibe tags selected yet.</p>}
        </div>

        <div className="space-y-4 my-4">
          {staticTagCategories.map(category => (
            <div key={category.title}>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">{category.title}</h4>
              <div className="flex flex-wrap gap-2">
                {category.tags.map(suggestion => (
                  !vibeTags.some(vt => vt.includes(suggestion.tag)) && (
                    <Badge
                      key={suggestion.tag}
                      variant="outline"
                      className="text-sm capitalize cursor-pointer hover:bg-primary/20 border-primary/50 text-primary/90"
                      onClick={() => handleAddVibeTag(suggestion)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAddVibeTag(suggestion);}}
                    >
                      {suggestion.emoji} {suggestion.tag}
                    </Badge>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <Label>Need More Inspiration?</Label>
          <p className="text-xs text-muted-foreground mt-1 mb-2">
            Click the button to get AI-powered suggestions based on your bio.
          </p>
          <Button type="button" onClick={handleSuggestVibeTags} variant="outline" size="sm" disabled={isSuggestingTags || isSaving}>
            {isSuggestingTags ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Lightbulb className="mr-2 h-4 w-4" />
                Get AI Suggestions
              </>
            )}
          </Button>
        </div>

        {isSuggestingTags && (
          <div className="text-sm text-muted-foreground flex items-center my-2">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            AI is thinking of some more cool tags for you...
          </div>
        )}

        {aiSuggestedTags.length > 0 && !isSuggestingTags && (
          <div className="my-3">
            <p className="text-sm font-medium text-foreground mb-1.5">AI Suggestions (click to add):</p>
            <div className="flex flex-wrap gap-2">
              {aiSuggestedTags.map(suggestion => (
                <Badge
                  key={suggestion.tag}
                  variant="outline"
                  className="text-sm capitalize cursor-pointer hover:bg-primary/20 border-primary/50 text-primary/90"
                  onClick={() => handleAddVibeTag(suggestion)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAddVibeTag(suggestion);}}
                >
                  {suggestion.emoji} {suggestion.tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isSaving}>
        {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isSaving ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
