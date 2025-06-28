
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose, SheetTrigger } from "@/components/ui/sheet";
import { Filter, X } from "lucide-react";
import { religionOptions, datingIntentionsOptions, relationshipTypeOptions, ethnicityOptions } from '@/lib/options';

// Helper to convert inches to "feet'inches" format
const formatHeight = (inches: number) => {
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  return `${feet}'${remainingInches}"`;
};

// Define the filter state shape
export interface AppliedFilters {
  ageRange: [number, number];
  heightRange: [number, number];
  datingIntentions: string;
  ethnicity: string;
  religion: string;
  relationshipType: string;
}

interface DiscoverFiltersProps {
  onApplyFilters: (filters: AppliedFilters) => void;
  onResetFilters: () => void;
  initialFilters: AppliedFilters;
}

export function DiscoverFilters({ onApplyFilters, onResetFilters, initialFilters }: DiscoverFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [ageRange, setAgeRange] = useState<[number, number]>(initialFilters.ageRange);
  const [heightRange, setHeightRange] = useState<[number, number]>(initialFilters.heightRange);
  const [datingIntentions, setDatingIntentions] = useState(initialFilters.datingIntentions);
  const [ethnicity, setEthnicity] = useState(initialFilters.ethnicity);
  const [religion, setReligion] = useState(initialFilters.religion);
  const [relationshipType, setRelationshipType] = useState(initialFilters.relationshipType);

  const handleApply = () => {
    onApplyFilters({
      ageRange,
      heightRange,
      datingIntentions,
      ethnicity,
      religion,
      relationshipType,
    });
    setIsOpen(false);
  };
  
  const handleReset = () => {
    onResetFilters();
    setAgeRange(initialFilters.ageRange);
    setHeightRange(initialFilters.heightRange);
    setDatingIntentions(initialFilters.datingIntentions);
    setEthnicity(initialFilters.ethnicity);
    setReligion(initialFilters.religion);
    setRelationshipType(initialFilters.relationshipType);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-sm">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <SheetTitle>Filter Profiles</SheetTitle>
          <SheetDescription>
            Find people who match your preferences. Click apply to see results.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Age Range */}
          <div>
            <Label className="font-semibold">Age Range</Label>
            <Slider
              value={ageRange}
              onValueChange={(value) => setAgeRange(value as [number, number])}
              min={18}
              max={70}
              step={1}
              className="mt-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{ageRange[0]}</span>
              <span>{ageRange[1]}</span>
            </div>
          </div>
          
          {/* Height Range */}
          <div>
            <Label className="font-semibold">Height Range</Label>
            <Slider
              value={heightRange}
              onValueChange={(value) => setHeightRange(value as [number, number])}
              min={54} // 4'6"
              max={84} // 7'0"
              step={1}
              className="mt-3"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{formatHeight(heightRange[0])}</span>
              <span>{formatHeight(heightRange[1])}</span>
            </div>
          </div>
          
          {/* Dating Intentions */}
          <div>
            <Label htmlFor="datingIntentions" className="font-semibold">Dating Intentions</Label>
            <Select value={datingIntentions} onValueChange={setDatingIntentions}>
                <SelectTrigger id="datingIntentions" className="mt-1 bg-input">
                    <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    {datingIntentionsOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                    <SelectItem value="Prefer Not to Say">Prefer Not to Say</SelectItem>
                </SelectContent>
            </Select>
          </div>
          
          {/* Ethnicity */}
          <div>
            <Label htmlFor="ethnicity" className="font-semibold">Ethnicity</Label>
            <Select value={ethnicity} onValueChange={setEthnicity}>
                <SelectTrigger id="ethnicity" className="mt-1 bg-input">
                    <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    {ethnicityOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                    <SelectItem value="Prefer Not to Say">Prefer Not to Say</SelectItem>
                </SelectContent>
            </Select>
          </div>
          
          {/* Religion */}
           <div>
            <Label htmlFor="religion" className="font-semibold">Religion</Label>
            <Select value={religion} onValueChange={setReligion}>
                <SelectTrigger id="religion" className="mt-1 bg-input">
                    <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    {religionOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                    <SelectItem value="Prefer Not to Say">Prefer Not to Say</SelectItem>
                </SelectContent>
            </Select>
          </div>
          
          {/* Relationship Type */}
           <div>
            <Label htmlFor="relationshipType" className="font-semibold">Relationship Type</Label>
            <Select value={relationshipType} onValueChange={setRelationshipType}>
                <SelectTrigger id="relationshipType" className="mt-1 bg-input">
                    <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    {relationshipTypeOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                    <SelectItem value="Prefer Not to Say">Prefer Not to Say</SelectItem>
                </SelectContent>
            </Select>
          </div>

        </div>
        <SheetFooter className="p-6 pt-4 border-t bg-card flex-row sm:justify-between">
          <Button variant="ghost" onClick={handleReset}>Reset</Button>
          <Button onClick={handleApply}>Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
