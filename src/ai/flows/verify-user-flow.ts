
'use server';
/**
 * @fileOverview An AI flow to handle user profile verification.
 * 
 * This flow takes a user's profile image and a live selfie, along with a
 * gesture challenge, and uses a multimodal AI model to verify if the faces
 * match and the gesture is being performed correctly.
 * 
 * - verifyUser - A function that handles the verification process.
 * - VerifyUserInput - The input type for the verifyUser function.
 * - VerifyUserOutput - The return type for the verifyUser function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VerifyUserInputSchema = z.object({
  profileImageDataUri: z
    .string()
    .describe(
      "The user's existing profile picture, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  liveSelfieDataUri: z
    .string()
    .describe(
      "The live selfie just captured by the user, as a data URI. Same format as profileImageDataUri."
    ),
  gestureToPerform: z
    .string()
    .describe(
      "The specific gesture the user was asked to perform (e.g., 'Peace Sign', 'Thumbs Up')."
    ),
});
export type VerifyUserInput = z.infer<typeof VerifyUserInputSchema>;

const VerifyUserOutputSchema = z.object({
  isVerified: z.boolean().describe("The final verification status. True if both face and gesture match, otherwise false."),
  faceMatch: z.boolean().describe("Whether the face in the selfie matches the profile picture."),
  gestureMatch: z.boolean().describe("Whether the user is correctly performing the requested gesture."),
  reasoning: z.string().describe("A brief explanation for the decision, especially if verification fails."),
});
export type VerifyUserOutput = z.infer<typeof VerifyUserOutputSchema>;


export async function verifyUser(
  input: VerifyUserInput
): Promise<VerifyUserOutput> {
  return verifyUserFlow(input);
}


const prompt = ai.definePrompt({
    name: 'verifyUserPrompt',
    input: { schema: VerifyUserInputSchema },
    output: { schema: VerifyUserOutputSchema },
    prompt: `You are a strict and highly accurate AI verification agent. Your task is to verify a user's identity by comparing a live selfie against their profile picture and checking for a specific gesture.

**Instructions:**

1.  **Face Match Analysis:**
    -   Carefully compare the face in the **Profile Picture** with the face in the **Live Selfie**.
    -   Account for minor differences in lighting, angle, and expression. The core facial features must belong to the same person.
    -   Set the 'faceMatch' output field to 'true' if they are the same person, and 'false' otherwise.

2.  **Gesture Check Analysis:**
    -   The user was instructed to perform the following gesture: **"{{gestureToPerform}}"**.
    -   Examine the **Live Selfie** to see if the user is clearly and correctly performing this gesture.
    -   Set the 'gestureMatch' output field to 'true' if the gesture is correct, and 'false' otherwise.

3.  **Final Verification Decision:**
    -   Set the 'isVerified' field to 'true' **ONLY IF BOTH** 'faceMatch' and 'gestureMatch' are true. If either is false, 'isVerified' must be false.
    -   Provide a concise 'reasoning' for your final decision. If successful, say "Verification successful." If it fails, briefly explain why (e.g., "Faces do not appear to match," or "Incorrect gesture performed.").

**Images for Analysis:**

-   **Profile Picture:** {{media url=profileImageDataUri}}
-   **Live Selfie:** {{media url=liveSelfieDataUri}}
`
});


const verifyUserFlow = ai.defineFlow(
    {
        name: 'verifyUserFlow',
        inputSchema: VerifyUserInputSchema,
        outputSchema: VerifyUserOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);

        if (!output) {
            console.error("AI verification flow failed to produce an output.");
            return {
                isVerified: false,
                faceMatch: false,
                gestureMatch: false,
                reasoning: "The AI model could not process the verification request. Please try again."
            };
        }
        
        return output;
    }
);
