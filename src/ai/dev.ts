
'use server';

import { config as dotenvConfig } from 'dotenv';
import path from 'path';

// Resolve the path to .env from the current working directory
const envPath = path.resolve(process.cwd(), '.env');
const result = dotenvConfig({ path: envPath });

if (result.error) {
  console.error(`Genkit dev.ts: Error loading .env file from ${envPath}:`, result.error);
} else {
  if (result.parsed && Object.keys(result.parsed).length > 0) {
    console.log(`Genkit dev.ts: Successfully loaded .env file from ${envPath}. Keys found: ${Object.keys(result.parsed).join(', ')}`);
    // Optionally, log if specific keys are found (be careful not to log values)
    // console.log(`Genkit dev.ts: GOOGLE_API_KEY found: ${!!result.parsed.GOOGLE_API_KEY}`);
    // console.log(`Genkit dev.ts: NEXT_PUBLIC_GOOGLE_PLACES_API_KEY found: ${!!result.parsed.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY}`);
  } else if (result.parsed) {
    console.warn(`Genkit dev.ts: Loaded .env file from ${envPath}, but it was empty or contained no parsable variables.`);
  } else {
     console.warn(`Genkit dev.ts: dotenv.config() ran for ${envPath} but 'result.parsed' is undefined. This might indicate an issue if variables were expected. The .env file might be missing or completely empty.`);
  }
}

// Flow imports
import '@/ai/flows/suggest-vibe-tags-flow.ts';
import '@/ai/flows/suggest-bio-flow.ts';
import '@/ai/flows/get-place-photo-flow.ts';
import '@/ai/flows/spark-swipe-flow.ts';
