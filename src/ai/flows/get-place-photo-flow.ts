
'use server';
/**
 * @fileOverview A Genkit flow to fetch a photo for a given place name using Google Places API.
 *
 * - getPlacePhotoFlow - Fetches a photo URL and attribution for a place.
 * - GetPlacePhotoInput - Input type for the flow.
 * - GetPlacePhotoOutput - Output type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GetPlacePhotoInputSchema = z.object({
  placeName: z.string().describe('The name of the place to search for.'),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional().describe('Optional geographic coordinates (latitude, longitude) to help refine the search.'),
});
export type GetPlacePhotoInput = z.infer<typeof GetPlacePhotoInputSchema>;

const GetPlacePhotoOutputSchema = z.object({
  photoUrl: z.string().optional().describe('The URL of the place photo.'),
  attributionHtml: z.string().optional().describe('HTML attributions for the photo, if any.'),
});
export type GetPlacePhotoOutput = z.infer<typeof GetPlacePhotoOutputSchema>;

export async function getPlacePhoto(input: GetPlacePhotoInput): Promise<GetPlacePhotoOutput> {
  return getPlacePhotoFlow(input);
}

// This flow will be executed server-side by Genkit
const getPlacePhotoFlow = ai.defineFlow(
  {
    name: 'getPlacePhotoFlow',
    inputSchema: GetPlacePhotoInputSchema,
    outputSchema: GetPlacePhotoOutputSchema,
  },
  async (input) => {
    const placesApiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    const generalApiKey = process.env.GOOGLE_API_KEY;
    
    let apiKey = placesApiKey;
    let keySource = "NEXT_PUBLIC_GOOGLE_PLACES_API_KEY";

    if (!apiKey && generalApiKey) {
      apiKey = generalApiKey;
      keySource = "GOOGLE_API_KEY";
    }
    
    if (!apiKey) {
      console.error('Google Places API Key is missing from .env file (checked NEXT_PUBLIC_GOOGLE_PLACES_API_KEY and GOOGLE_API_KEY).');
      throw new Error('API key for Google Places is not configured.');
    }
    console.log(`Using API key from ${keySource}: ${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)} for place: ${input.placeName}`);

    // 1. Find Place ID and Photo Reference
    let findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(input.placeName)}&inputtype=textquery&fields=place_id,photos,name&key=${apiKey}`;
    if (input.coordinates) {
        // Add location bias if coordinates are provided
        findPlaceUrl += `&locationbias=circle:2000@${input.coordinates.lat},${input.coordinates.lng}`;
        console.log(`Find place URL (with location bias): ${findPlaceUrl.replace(apiKey, "REDACTED_API_KEY")}`);
    } else {
        console.log(`Find place URL: ${findPlaceUrl.replace(apiKey, "REDACTED_API_KEY")}`);
    }


    try {
      const findPlaceResponse = await fetch(findPlaceUrl);
      const responseText = await findPlaceResponse.text(); // Read text first for better error logging
      
      if (!findPlaceResponse.ok) {
        console.error(`Google Places Find Place API error: ${findPlaceResponse.status} ${findPlaceResponse.statusText}. Response: ${responseText}`);
        throw new Error(`Failed to find place: ${findPlaceResponse.statusText}`);
      }
      
      const findPlaceData = JSON.parse(responseText);
      console.log('Google Places Find Place API Response Status:', findPlaceData.status);
      if (findPlaceData.error_message) {
        console.error('Google Places Find Place API Error Message:', findPlaceData.error_message);
      }


      if (findPlaceData.status !== 'OK' || !findPlaceData.candidates || findPlaceData.candidates.length === 0) {
        console.warn('No place candidates found or API error for:', input.placeName, 'Status:', findPlaceData.status, 'Error:', findPlaceData.error_message);
        return { photoUrl: undefined, attributionHtml: undefined };
      }

      const place = findPlaceData.candidates[0];
      console.log('Found place candidate:', place.name, 'with ID:', place.place_id);

      if (!place.photos || place.photos.length === 0) {
        console.warn('No photos found for place:', place.name || input.placeName);
        return { photoUrl: undefined, attributionHtml: undefined };
      }
      console.log(`Found ${place.photos.length} photo(s) for ${place.name || input.placeName}. Using the first one.`);

      const photoReference = place.photos[0].photo_reference;
      const attributionHtml = place.photos[0].html_attributions && place.photos[0].html_attributions.length > 0
        ? place.photos[0].html_attributions[0]
        : undefined;

      // 2. Construct Photo URL
      // Maxwidth or maxheight is required.
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
      console.log(`Constructed photo URL: ${photoUrl.replace(apiKey, "REDACTED_API_KEY")}`);


      return { photoUrl, attributionHtml };

    } catch (error) {
      console.error('Error in getPlacePhotoFlow during fetch or processing:', error);
      // Optionally re-throw or return a specific error structure
      // For now, returning undefined if any step fails
      return { photoUrl: undefined, attributionHtml: undefined };
    }
  }
);
