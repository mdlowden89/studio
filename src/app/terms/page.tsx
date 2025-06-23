import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-8">
        <Card className="bg-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
            <CardDescription>
              Last updated: June 23, 2024
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground prose prose-invert max-w-none">
            <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>
              This is a placeholder Terms of Service page. By accessing or using the Crossd application ("Service"), you agree to be bound by these placeholder terms. In a real-world scenario, this document would contain a comprehensive legal agreement.
            </p>
            <h2 className="text-xl font-semibold text-foreground">2. Placeholder Nature</h2>
            <p>
              The content provided herein is for demonstration and development purposes only. It holds no legal weight and should be replaced with a professionally drafted Terms of Service agreement before launching your application to the public. We are not liable for any issues arising from the use of this placeholder text.
            </p>
            <h2 className="text-xl font-semibold text-foreground">3. User Responsibilities (Example)</h2>
            <p>
              A real terms of service would outline user responsibilities, such as maintaining the confidentiality of their account, adhering to community guidelines, and not misusing the service.
            </p>
             <h2 className="text-xl font-semibold text-foreground">4. Limitation of Liability (Example)</h2>
            <p>
              This section would typically disclaim liability for damages arising from the use of the service, to the fullest extent permitted by law.
            </p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
