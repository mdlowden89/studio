
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { VibeMatcher } from "@/components/ai/vibe-matcher";

export default function AiMatchesPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="bg-card shadow-xl">
          <CardHeader>
             <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                <div>
                    <CardTitle className="text-3xl font-bold">Vibe Signal Engine</CardTitle>
                    <CardDescription className="text-muted-foreground">
                    Discover AI-suggested matches based on your vibe and location patterns.
                    </CardDescription>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <VibeMatcher />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
