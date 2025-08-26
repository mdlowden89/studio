
'use server';
/**
 * @fileOverview An AI flow to generate the TSX code for the SparkEnergyMeter component.
 *
 * This flow takes user engagement statistics and generates the corresponding React component
 * code to be rendered on the dashboard.
 *
 * - generateSparkMeter - A function that handles the component generation.
 * - GenerateSparkMeterInput - The input type for the generateSparkMeter function.
 * - GenerateSparkMeterOutput - The return type for the generateSparkMeter function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateSparkMeterInputSchema = z.object({
  loginStreak: z.number().describe('The user\'s current daily login streak.'),
  weeklyConnections: z.number().describe('The number of confirmed matches the user has had in the last 7 days.'),
  expiringSoonCount: z.number().describe('The number of pending moments that are about to expire.'),
});
export type GenerateSparkMeterInput = z.infer<typeof GenerateSparkMeterInputSchema>;

const GenerateSparkMeterOutputSchema = z.object({
  tsxCode: z
    .string()
    .describe('The complete, self-contained TSX code for the SparkEnergyMeter React component.'),
});
export type GenerateSparkMeterOutput = z.infer<typeof GenerateSparkMeterOutputSchema>;

export async function generateSparkMeter(
  input: GenerateSparkMeterInput
): Promise<GenerateSparkMeterOutput> {
  return generateSparkMeterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSparkMeterPrompt',
  input: { schema: GenerateSparkMeterInputSchema },
  output: { schema: GenerateSparkMeterOutputSchema },
  prompt: `You are an expert AI assistant that specializes in generating React component code using TypeScript, Next.js, and ShadCN UI components. Your task is to generate the complete TSX code for a React component called 'SparkEnergyMeter'.

The component takes a set of user stats as props and displays a progress bar representing their "Spark Energy". It also shows the stats that contribute to this energy level.

**CRITICAL INSTRUCTIONS:**
1.  The entire output must be a single block of valid TSX code. Do not wrap it in markdown.
2.  The generated component must be self-contained and not rely on any props other than what's defined in the example.
3.  The calculation for 'sparkEnergy' must be implemented exactly as shown in the example.
4.  Use the exact same components, icons (from lucide-react), and styling (Tailwind CSS classes) as the example.

**INPUT DATA:**
-   Login Streak: {{loginStreak}}
-   Weekly Connections: {{weeklyConnections}}
-   Expiring Soon Count: {{expiringSoonCount}}

**EXAMPLE COMPONENT (Follow this structure and logic exactly):**
\'\'\'tsx
import { useMemo } from 'react';
import type { Moment } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Flame, Sparkles, Clock, TrendingUp } from 'lucide-react';

interface SparkEnergyMeterProps {
  loginStreak: number;
  weeklyConnections: number;
  expiringSoonCount: number;
}

const MAX_ENERGY = 100;
const STREAK_ENERGY_BONUS = 20;
const CONNECTION_ENERGY_BONUS = 15;

export function SparkEnergyMeter({ 
  loginStreak, 
  weeklyConnections, 
  expiringSoonCount 
}: SparkEnergyMeterProps) {
  const sparkEnergy = useMemo(() => {
    const streakBonus = Math.min(loginStreak * STREAK_ENERGY_BONUS, MAX_ENERGY / 2);
    const connectionBonus = Math.min(weeklyConnections * CONNECTION_ENERGY_BONUS, MAX_ENERGY / 2);
    return Math.min(streakBonus + connectionBonus, MAX_ENERGY);
  }, [loginStreak, weeklyConnections]);


  return (
    <Card className="mb-8 bg-gradient-to-tr from-card to-primary/10 border border-primary/30 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2 text-primary">
          <TrendingUp className="w-7 h-7" />
          Spark Energy Meter
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Your weekly engagement fuels your spark. Keep it high for better visibility!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Progress value={sparkEnergy} className="h-4 [&>div]:bg-gradient-to-r [&>div]:from-primary/70 [&>div]:to-primary" />
            <p className="text-right text-sm font-bold text-primary mt-1">{sparkEnergy}%</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <p className="text-lg font-semibold text-foreground">{loginStreak}</p>
              </div>
              <p className="text-xs text-muted-foreground">Day Streak</p>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-green-400" />
                <p className="text-lg font-semibold text-foreground">{weeklyConnections}</p>
              </div>
              <p className="text-xs text-muted-foreground">Sparks this week</p>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-5 h-5 text-red-400" />
                 <p className="text-lg font-semibold text-foreground">{expiringSoonCount}</p>
              </div>
              <p className="text-xs text-muted-foreground">Expiring Moments</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
\'\'\'

Now, based on the provided input data and the example, generate the complete TSX code for the component.
`,
});

const generateSparkMeterFlow = ai.defineFlow(
  {
    name: 'generateSparkMeterFlow',
    inputSchema: GenerateSparkMeterInputSchema,
    outputSchema: GenerateSparkMeterOutputSchema,
  },
  async (input) => {
    // The prompt contains a one-shot example of the component.
    // The model will use the provided input data to fill in the dynamic parts.
    const llmResponse = await prompt(input);
    const output = ll.output();
    if (!output) {
        throw new Error("The AI model failed to generate the component code.");
    }
    
    // The model should return the code inside the tsxCode field of the output schema.
    // We remove the markdown fences if the model accidentally adds them.
    const cleanedCode = output.tsxCode.replace(/```tsx\n/g, "").replace(/```/g, "");

    return {
        tsxCode: cleanedCode
    };
  }
);
