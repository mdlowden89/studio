
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Feather } from "lucide-react"; // Or any other relevant icon

export default function LogMomentPage() {
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <Card className="bg-card shadow-xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Feather className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="text-3xl font-bold">Log a Crossing or Moment</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Record a significant place, time, or a potential connection you made.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-10">
              This is where the form to log a new crossing or moment will go.
              <br />
              (Feature under construction)
            </p>
            {/* Add form fields here in the future:
                - Location search/select
                - Date/Time picker
                - Notes
                - Option to tag a potential match (if seen)
            */}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
