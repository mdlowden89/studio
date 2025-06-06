
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
  error: z.string().optional().describe('An error message if the operation failed, or an error code like API_KEY_MISSING.'),
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
  async (input): Promise<GetPlacePhotoOutput> => {
    const placesApiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    const generalApiKey = process.env.GOOGLE_API_KEY;
    
    let apiKey = placesApiKey;
    let keySource = "NEXT_PUBLIC_GOOGLE_PLACES_API_KEY";

    if (!apiKey && generalApiKey) {
      apiKey = generalApiKey;
      keySource = "GOOGLE_API_KEY";
    }
    
    if (!apiKey) {
      const errorMsg = 'Google Places API Key is missing from .env file (checked NEXT_PUBLIC_GOOGLE_PLACES_API_KEY and GOOGLE_API_KEY).';
      console.error(`getPlacePhotoFlow: ${errorMsg}`);
      return { photoUrl: undefined, attributionHtml: undefined, error: 'API_KEY_MISSING' };
    }
    console.log(`getPlacePhotoFlow: Using API key from ${keySource} for place: ${input.placeName}`);

    // 1. Find Place ID and Photo Reference
    let findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(input.placeName)}&inputtype=textquery&fields=place_id,photos,name&key=${apiKey}`;
    if (input.coordinates) {
        findPlaceUrl += `&locationbias=circle:2000@${input.coordinates.lat},${input.coordinates.lng}`;
        console.log(`getPlacePhotoFlow: Find place URL (with location bias): ${findPlaceUrl.replace(apiKey, "REDACTED_API_KEY")}`);
    } else {
        console.log(`getPlacePhotoFlow: Find place URL: ${findPlaceUrl.replace(apiKey, "REDACTED_API_KEY")}`);
    }

    try {
      const findPlaceResponse = await fetch(findPlaceUrl);
      const responseText = await findPlaceResponse.text(); // Get text for logging before parsing
      
      if (!findPlaceResponse.ok) {
        // This block handles HTTP errors (e.g., 4xx, 5xx from Google's server itself, not necessarily Place API specific statuses)
        const errorDetail = `getPlacePhotoFlow: Google Places Find Place API HTTP error: ${findPlaceResponse.status} ${findPlaceResponse.statusText}. Response: ${responseText}`;
        console.error(errorDetail);
        // Attempt to parse for more specific error message from Google
        try {
            const errorJson = JSON.parse(responseText);
            if (errorJson.error_message && (errorJson.error_message.toLowerCase().includes("api key not valid") || errorJson.error_message.toLowerCase().includes("key invalid"))){
                 console.error(`getPlacePhotoFlow: Detected API Key Invalid from response: ${errorJson.error_message}`);
                 return { photoUrl: undefined, attributionHtml: undefined, error: 'API_KEY_INVALID' };
            }
        } catch (parseError) {
            // Ignore if responseText isn't valid JSON
        }
        return { photoUrl: undefined, attributionHtml: undefined, error: `PLACES_API_ERROR: ${findPlaceResponse.status}` };
      }
      
      const findPlaceData = JSON.parse(responseText);
      console.log('getPlacePhotoFlow: Google Places Find Place API Response Status:', findPlaceData.status);
      
      if (findPlaceData.error_message) {
        console.error('getPlacePhotoFlow: Google Places Find Place API explicit error message:', findPlaceData.error_message, 'Status:', findPlaceData.status);
        if (findPlaceData.error_message.toLowerCase().includes("api key not valid") || findPlaceData.error_message.toLowerCase().includes("key invalid") || findPlaceData.status === 'REQUEST_DENIED') {
            return { photoUrl: undefined, attributionHtml: undefined, error: 'API_KEY_INVALID' };
        }
         // For other error messages, treat as a generic Places API error.
         return { photoUrl: undefined, attributionHtml: undefined, error: `PLACES_API_ERROR: ${findPlaceData.status || 'UNKNOWN'}` };
      }

      if (findPlaceData.status === 'ZERO_RESULTS') {
        console.warn(`getPlacePhotoFlow: No place candidates found for: "${input.placeName}". Status: ZERO_RESULTS`);
        return { photoUrl: undefined, attributionHtml: undefined, error: 'NO_PLACE_FOUND' };
      }

      if (findPlaceData.status !== 'OK' || !findPlaceData.candidates || findPlaceData.candidates.length === 0) {
        console.warn(`getPlacePhotoFlow: API error or no candidates for "${input.placeName}". Status: ${findPlaceData.status}. Candidates:`, findPlaceData.candidates);
        return { photoUrl: undefined, attributionHtml: undefined, error: `PLACES_API_ERROR: ${findPlaceData.status || 'UNKNOWN_CANDIDATE_ISSUE'}` };
      }

      const place = findPlaceData.candidates[0];
      console.log(`getPlacePhotoFlow: Found place candidate: "${place.name}", ID: ${place.place_id}`);

      if (!place.photos || place.photos.length === 0) {
        console.warn(`getPlacePhotoFlow: No photos found for place: "${place.name || input.placeName}" (ID: ${place.place_id})`);
        return { photoUrl: undefined, attributionHtml: undefined, error: 'NO_PHOTO_FOR_PLACE' };
      }
      console.log(`getPlacePhotoFlow: Found ${place.photos.length} photo(s) for "${place.name || input.placeName}". Using the first one.`);

      const photoReference = place.photos[0].photo_reference;
      const attributionHtml = place.photos[0].html_attributions && place.photos[0].html_attributions.length > 0
        ? place.photos[0].html_attributions[0]
        : undefined;

      // Note: Place Photo API URL includes the key. This is standard.
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
      console.log(`getPlacePhotoFlow: Constructed photo URL: ${photoUrl.replace(apiKey, "REDACTED_API_KEY")}`);

      return { photoUrl, attributionHtml };

    } catch (error: any) {
      console.error('getPlacePhotoFlow: Error during fetch or processing:', error.message ? error.message : error);
      if (error.stack) console.error(error.stack);
      return { photoUrl: undefined, attributionHtml: undefined, error: 'FETCH_FAILED' };
    }
  }
);
