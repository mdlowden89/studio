
import { AppLayout } from "@/components/layout/app-layout";
import { MomentList } from "@/components/moments/moment-list";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function MomentsPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="bg-card shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <MapPin className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="text-3xl font-bold">Your Moments</CardTitle>
                <CardDescription className="text-muted-foreground">
                  A trail of significant places and times you've visited.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <MomentList />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
