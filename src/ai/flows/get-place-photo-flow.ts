
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
    try { // Outermost try-catch for the entire flow logic
      const { placeName, coordinates } = input;
      console.log(`getPlacePhotoFlow: Starting flow for place: "${placeName}"`, coordinates ? `with coordinates ${JSON.stringify(coordinates)}` : '');

      const placesApiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
      const generalApiKey = process.env.GOOGLE_API_KEY;

      // DEBUG LOG: Check what keys the flow sees
      console.log(`getPlacePhotoFlow: Env check - NEXT_PUBLIC_GOOGLE_PLACES_API_KEY: "${placesApiKey ? 'Exists' : 'Not Found'}"`);
      console.log(`getPlacePhotoFlow: Env check - GOOGLE_API_KEY: "${generalApiKey ? 'Exists' : 'Not Found'}"`);
      
      let apiKey = placesApiKey;
      let keySource = "NEXT_PUBLIC_GOOGLE_PLACES_API_KEY";

      if (!apiKey && generalApiKey) {
        apiKey = generalApiKey;
        keySource = "GOOGLE_API_KEY";
        console.log(`getPlacePhotoFlow: NEXT_PUBLIC_GOOGLE_PLACES_API_KEY not found, attempting to use GOOGLE_API_KEY from ${keySource}.`);
      } else if (apiKey) {
        console.log(`getPlacePhotoFlow: Using API key from ${keySource}.`);
      }
      
      if (!apiKey) {
        const errorMsg = 'Google Places API Key is missing. The Genkit server could not find NEXT_PUBLIC_GOOGLE_PLACES_API_KEY or GOOGLE_API_KEY in the environment.';
        console.error(`getPlacePhotoFlow: ${errorMsg}`);
        return { photoUrl: undefined, attributionHtml: undefined, error: 'API_KEY_MISSING' };
      }
      console.log(`getPlacePhotoFlow: Using API key from ${keySource} for place: ${placeName}`);

      // 1. Find Place ID and Photo Reference
      let findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&fields=place_id,photos,name&key=${apiKey}`;
      if (coordinates) {
          findPlaceUrl += `&locationbias=circle:2000@${coordinates.lat},${coordinates.lng}`;
          console.log(`getPlacePhotoFlow: Find place URL (with location bias): ${findPlaceUrl.replace(apiKey, "REDACTED_API_KEY")}`);
      } else {
          console.log(`getPlacePhotoFlow: Find place URL: ${findPlaceUrl.replace(apiKey, "REDACTED_API_KEY")}`);
      }

      try { // Inner try-catch for fetch and processing logic
        const findPlaceResponse = await fetch(findPlaceUrl);
        const responseText = await findPlaceResponse.text();
        
        if (!findPlaceResponse.ok) {
          const errorDetail = `getPlacePhotoFlow: Google Places Find Place API HTTP error: ${findPlaceResponse.status} ${findPlaceResponse.statusText}. Response: ${responseText}`;
          console.error(errorDetail);
          try {
              const errorJson = JSON.parse(responseText);
              if (errorJson.error_message && (errorJson.error_message.toLowerCase().includes("api key not valid") || errorJson.error_message.toLowerCase().includes("key invalid"))){
                   console.error(`getPlacePhotoFlow: Detected API Key Invalid from response: ${errorJson.error_message}`);
                   console.log(`getPlacePhotoFlow: Returning API_KEY_INVALID for "${placeName}" due to HTTP error and specific message.`);
                   return { photoUrl: undefined, attributionHtml: undefined, error: 'API_KEY_INVALID' };
              }
          } catch (parseError) {
            // This catch is for if JSON.parse(responseText) fails for the error response.
            console.warn(`getPlacePhotoFlow: Could not parse error response as JSON for "${placeName}": ${parseError}`);
          }
          // Generic HTTP error if not caught by specific API_KEY_INVALID logic
          console.log(`getPlacePhotoFlow: Returning PLACES_API_ERROR for "${placeName}" due to HTTP error ${findPlaceResponse.status}.`);
          return { photoUrl: undefined, attributionHtml: undefined, error: `PLACES_API_ERROR: ${findPlaceResponse.status}` };
        }
        
        const findPlaceData = JSON.parse(responseText);
        console.log(`getPlacePhotoFlow: Google Places Find Place API Response for "${placeName}": Status: ${findPlaceData.status}, Candidates length: ${findPlaceData.candidates ? findPlaceData.candidates.length : 'N/A'}`);
        
        if (findPlaceData.error_message) {
          console.error(`getPlacePhotoFlow: Google Places Find Place API explicit error message for "${placeName}":`, findPlaceData.error_message, 'Status:', findPlaceData.status);
          if (findPlaceData.error_message.toLowerCase().includes("api key not valid") || findPlaceData.error_message.toLowerCase().includes("key invalid") || findPlaceData.status === 'REQUEST_DENIED') {
              console.log(`getPlacePhotoFlow: Returning API_KEY_INVALID for "${placeName}" due to error_message or REQUEST_DENIED.`);
              return { photoUrl: undefined, attributionHtml: undefined, error: 'API_KEY_INVALID' };
          }
           console.log(`getPlacePhotoFlow: Returning PLACES_API_ERROR for "${placeName}" due to error_message status ${findPlaceData.status}.`);
           return { photoUrl: undefined, attributionHtml: undefined, error: `PLACES_API_ERROR: ${findPlaceData.status || 'UNKNOWN_FROM_ERROR_MESSAGE'}` };
        }

        if (findPlaceData.status === 'ZERO_RESULTS') {
          console.warn(`getPlacePhotoFlow: No place candidates found for: "${placeName}". Status: ZERO_RESULTS`);
          console.log(`getPlacePhotoFlow: Returning NO_PLACE_FOUND for "${placeName}".`);
          return { photoUrl: undefined, attributionHtml: undefined, error: 'NO_PLACE_FOUND' };
        }

        if (findPlaceData.status !== 'OK' || !findPlaceData.candidates || findPlaceData.candidates.length === 0) {
          console.warn(`getPlacePhotoFlow: API error or no candidates for "${placeName}". Status: ${findPlaceData.status}. Candidates:`, findPlaceData.candidates);
          console.log(`getPlacePhotoFlow: Returning PLACES_API_ERROR for "${placeName}" due to status not OK or no candidates.`);
          return { photoUrl: undefined, attributionHtml: undefined, error: `PLACES_API_ERROR: ${findPlaceData.status || 'UNKNOWN_CANDIDATE_ISSUE'}` };
        }

        const place = findPlaceData.candidates[0];
        console.log(`getPlacePhotoFlow: Found place candidate for "${placeName}": "${place.name}", ID: ${place.place_id}`);

        if (!place.photos || place.photos.length === 0) {
          console.warn(`getPlacePhotoFlow: No photos found for place: "${place.name || placeName}" (ID: ${place.place_id})`);
          console.log(`getPlacePhotoFlow: Returning NO_PHOTO_FOR_PLACE for "${placeName}".`);
          return { photoUrl: undefined, attributionHtml: undefined, error: 'NO_PHOTO_FOR_PLACE' };
        }
        console.log(`getPlacePhotoFlow: Found ${place.photos.length} photo(s) for "${place.name || placeName}". Using the first one.`);

        const photoReference = place.photos[0].photo_reference;
        const attributionHtml = place.photos[0].html_attributions && place.photos[0].html_attributions.length > 0
          ? place.photos[0].html_attributions[0]
          : undefined;

        // Note: The photo URL constructed here will be directly used by <Image src=...>
        // Google Places Photo API redirects to the actual image. Maxwidth 400 is a reasonable default.
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
        console.log(`getPlacePhotoFlow: Constructed photo URL for "${placeName}": ${photoUrl.replace(apiKey, "REDACTED_API_KEY")}`);
        console.log(`getPlacePhotoFlow: Successfully returning photo for "${placeName}".`);
        return { photoUrl, attributionHtml };

      } catch (fetchError: any) {
        // This catch handles errors during the fetch operation itself (e.g., network issues)
        // or errors during the processing of a successful fetch (e.g., JSON.parse fails on a valid but unexpected response structure).
        console.error(`getPlacePhotoFlow: Error during fetch or processing for "${placeName}":`, fetchError.message ? fetchError.message : fetchError);
        if (fetchError.stack) console.error(fetchError.stack); // Log stack trace for better debugging
        console.log(`getPlacePhotoFlow: Returning FETCH_FAILED for "${placeName}" due to caught exception.`);
        return { photoUrl: undefined, attributionHtml: undefined, error: 'FETCH_FAILED' };
      }
    } catch (flowError: any) {
      // This is the outermost catch for truly unexpected errors in the flow's setup or logic
      // that weren't caught by the inner try-catch for fetch operations.
      console.error(`getPlacePhotoFlow: CRITICAL UNHANDLED EXCEPTION IN FLOW for place "${input.placeName}":`, flowError.message ? flowError.message : flowError, flowError.stack);
      // Returning a distinct error code if this outermost catch is hit
      return { photoUrl: undefined, attributionHtml: undefined, error: 'CRITICAL_FLOW_FAILURE' };
    }
  }
);
