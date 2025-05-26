
import { config } from 'dotenv';
config();

// Removed suggest-matches-from-vibe.ts and suggest-detailed-matches-flow.ts
import '@/ai/flows/suggest-vibe-tags-flow.ts';
import '@/ai/flows/suggest-bio-flow.ts'; 
import '@/ai/flows/get-place-photo-flow.ts'; // Added new flow
    
