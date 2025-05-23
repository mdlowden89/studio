
"use client";

import { useState } from "react";
import type { UserProfile } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X as XIcon, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MOCK_USERS, MOCK_USER_ID } from "@/lib/mock-data"; // Import mock data and current user ID
import { useRouter } from "next/navigation"; // Import useRouter

interface ProfileDetailsProps {
  user: UserProfile;
}

export function ProfileDetails({ user }: ProfileDetailsProps) {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age);
  const [bio, setBio] = useState(user.bio);
  const [vibeTags, setVibeTags] = useState<string[]>(user.vibeTags);
  const [newTag, setNewTag] = useState("");
  const { toast } = useToast();
  const router = useRouter(); // Get router instance

  const handleAddTag = () => {
    if (newTag.trim() !== "" && !vibeTags.includes(newTag.trim().toLowerCase())) {
      setVibeTags([...vibeTags, newTag.trim().toLowerCase()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setVibeTags(vibeTags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send data to a backend
    console.log("Updated profile:", { name, age, bio, vibeTags });

    // Update the mock data
    const userInMockData = MOCK_USERS.find(u => u.id === MOCK_USER_ID);
    if (userInMockData) {
      userInMockData.name = name;
      // If email were editable, you'd update it here too:
      // userInMockData.email = emailState; 
    }

    toast({
      title: "Profile Updated",
      description: "Your profile details have been saved.",
    });

    router.refresh(); // Refresh the current route to reflect changes in sidebar
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 bg-input" />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            type="number"
            value={age} // age state is always a number now
            onChange={(e) => {
              const rawValue = e.target.value;
              const parsedAge = parseInt(rawValue, 10);
              if (rawValue === "" || isNaN(parsedAge)) {
                // If input is empty or not a number, set age to 0 to prevent NaN state.
                setAge(0);
              } else {
                setAge(parsedAge);
              }
            }}
            className="mt-1 bg-input"
          />
        </div>
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
