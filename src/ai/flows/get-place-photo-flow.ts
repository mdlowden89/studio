
'use server';
/**
 * @fileOverview A Genkit flow to retrieve a photo URL for a given place using Google Places API.
 *
 * - getPlacePhoto - Fetches a photo URL for a place.
 * - GetPlacePhotoInput - Input for the getPlacePhoto flow.
 * - GetPlacePhotoOutput - Output for the getPlacePhoto flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetPlacePhotoInputSchema = z.object({
  placeName: z.string().describe('The name of the place to find a photo for.'),
  latitude: z.number().optional().describe('Latitude of the place to help disambiguate.'),
  longitude: z.number().optional().describe('Longitude of the place to help disambiguate.'),
});
export type GetPlacePhotoInput = z.infer<typeof GetPlacePhotoInputSchema>;

const GetPlacePhotoOutputSchema = z.object({
  photoUrl: z.string().optional().describe('The URL of the place photo, if found.'),
  attribution: z.string().optional().describe('HTML attributions for the photo, if any.'),
});
export type GetPlacePhotoOutput = z.infer<typeof GetPlacePhotoOutputSchema>;

export async function getPlacePhoto(input: GetPlacePhotoInput): Promise<GetPlacePhotoOutput> {
  return getPlacePhotoFlow(input);
}

const getPlacePhotoFlow = ai.defineFlow(
  {
    name: 'getPlacePhotoFlow',
    inputSchema: GetPlacePhotoInputSchema,
    outputSchema: GetPlacePhotoOutputSchema,
  },
  async (input) => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      console.error('Google Places API key is not configured.');
      return { photoUrl: undefined, attribution: undefined };
    }

    try {
      // Step 1: Find Place to get place_id and photo reference
      // We request fields: place_id (to potentially use later), photos (for references), name (for confirmation)
      let findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(input.placeName)}&inputtype=textquery&fields=photos,name,place_id&key=${apiKey}`;
      
      if (input.latitude && input.longitude) {
        // Bias search towards the given coordinates with a 2km radius circle
        findPlaceUrl += `&locationbias=circle:2000@${input.latitude},${input.longitude}`;
      }

      const findPlaceResponse = await fetch(findPlaceUrl);
      if (!findPlaceResponse.ok) {
        const errorBody = await findPlaceResponse.text();
        console.error(`Error finding place "${input.placeName}": ${findPlaceResponse.status}`, errorBody);
        return { photoUrl: undefined, attribution: undefined };
      }

      const findPlaceData = await findPlaceResponse.json();

      if (findPlaceData.status !== 'OK' || !findPlaceData.candidates || findPlaceData.candidates.length === 0) {
        console.log(`No place candidates found for "${input.placeName}" or API error:`, findPlaceData.status, findPlaceData.error_message);
        return { photoUrl: undefined, attribution: undefined };
      }

      const place = findPlaceData.candidates[0];
      if (!place.photos || place.photos.length === 0) {
        console.log('No photos found for place:', place.name);
        return { photoUrl: undefined, attribution: undefined };
      }

      const photoReference = place.photos[0].photo_reference;
      const htmlAttributions = place.photos[0].html_attributions; // Array of strings

      // Step 2: Construct Photo URL
      // This URL itself is the image (or redirects to it). Maxwidth can be adjusted.
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
      
      return { photoUrl, attribution: htmlAttributions?.[0] };

    } catch (error) {
      console.error('Error in getPlacePhotoFlow for place:', input.placeName, error);
      return { photoUrl: undefined, attribution: undefined };
    }
  }
);
    