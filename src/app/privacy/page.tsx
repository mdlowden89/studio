import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-8">
        <Card className="bg-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <CardDescription>
              Last updated: June 23, 2024
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground prose prose-invert max-w-none">
            <h2 className="text-xl font-semibold text-foreground">1. Information We Collect (Example)</h2>
            <p>
              This is a placeholder Privacy Policy. A real policy would detail the types of personal information you collect from users, such as name, email address, location data, profile information, and usage data.
            </p>
            <h2 className="text-xl font-semibold text-foreground">2. How We Use Information (Example)</h2>
            <p>
              Here, you would explain the purposes for collecting data, such as to provide and improve the service, personalize user experience, communicate with users, and for security purposes.
            </p>
            <h2 className="text-xl font-semibold text-foreground">3. Placeholder Notice</h2>
            <p>
              The content provided herein is for demonstration and development purposes only. It is not a legally binding document. You must replace this text with your own official Privacy Policy, ensuring it complies with relevant regulations like GDPR, CCPA, etc.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
