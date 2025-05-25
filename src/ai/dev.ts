
import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-matches-from-vibe.ts';
import '@/ai/flows/suggest-vibe-tags-flow.ts';
import '@/ai/flows/suggest-bio-flow.ts'; // Added new bio suggestion flow
import '@/ai/flows/suggest-detailed-matches-flow.ts'; // Added new detailed matches flow
    
