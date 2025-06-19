
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, AlertTriangle } from "lucide-react";

export function SparkSwipeSection() {
  return (
    <Card className="bg-card shadow-xl">
      <CardHeader className="text-center">
        <Sparkles className="w-12 h-12 text-primary mx-auto mb-3 animate-pulse" />
        <CardTitle className="text-2xl font-semibold">Spark Swipe</CardTitle>
        <CardDescription className="text-muted-foreground">
          Connect based on shared moments and prompt answers.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center py-10 flex flex-col items-center text-muted-foreground">
          <AlertTriangle className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-foreground">Coming Soon!</h3>
          <p className="max-w-md">
            This section will feature profiles you've crossed paths with at shared locations or who have answered similar prompts to yours.
            Get ready for more meaningful connections!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
