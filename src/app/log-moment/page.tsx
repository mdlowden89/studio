
"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Feather, MapPin, Clock, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function LogMomentPage() {
  const [locationName, setLocationName] = useState<string | null>(null);
  const [formattedTimestamp, setFormattedTimestamp] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate autodetecting location
    setLocationName("The Alchemist's Corner Cafe");

    // Get and format current timestamp
    const now = new Date();
    setFormattedTimestamp(format(now, "h:mm bbb, EEEE")); // e.g., 8:42 PM, Friday
  }, []);

  const handleConfirmLocation = () => {
    toast({
      title: "Location Confirmed!",
      description: "Next step: Describe the moment. (Coming soon)",
    });
    // Proceed to Step 2 in the future
  };

  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="bg-card shadow-xl max-w-lg mx-auto">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Feather className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="text-3xl font-bold">Log a Crossing or Moment</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Step 1: Confirm Your Current Location & Time
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 py-6">
            {locationName ? (
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg shadow-sm">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">You're at:</p>
                  <p className="text-lg font-semibold text-foreground">{locationName}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg shadow-sm">
                <MapPin className="w-6 h-6 text-muted-foreground animate-pulse flex-shrink-0" />
                <p className="text-lg font-semibold text-muted-foreground">Autodetecting location...</p>
              </div>
            )}

            {formattedTimestamp ? (
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg shadow-sm">
                <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Current Time:</p>
                  <p className="text-lg font-semibold text-foreground">{formattedTimestamp}</p>
                </div>
              </div>
            ) : (
               <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg shadow-sm">
                <Clock className="w-6 h-6 text-muted-foreground animate-pulse flex-shrink-0" />
                <p className="text-lg font-semibold text-muted-foreground">Getting current time...</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button 
              onClick={handleConfirmLocation} 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={!locationName || !formattedTimestamp}
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
