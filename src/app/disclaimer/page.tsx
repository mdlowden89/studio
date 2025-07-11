
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-bold text-primary mt-6 mb-3">{children}</h2>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground leading-relaxed">{children}</p>
);

export default function DisclaimerPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-8">
        <Card className="bg-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Disclaimer</CardTitle>
            <CardDescription>
              Last updated: July 11, 2025
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SectionTitle>No Professional Advice</SectionTitle>
            <Paragraph>
              The information provided by Crossd ("we," "us," or "our") on our mobile application is for general informational purposes only. All information on the app is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the app.
            </Paragraph>

            <SectionTitle>For Entertainment Purposes Only</SectionTitle>
            <Paragraph>
              Crossd is a prototype application created for demonstration and entertainment purposes. The features, user profiles, and interactions depicted within the app are simulated and should not be considered representative of a live, functioning product. Any resemblance to real persons, living or dead, or actual events is purely coincidental.
            </Paragraph>
            
            <SectionTitle>External Links Disclaimer</SectionTitle>
             <Paragraph>
              The app may contain (or you may be sent through the app) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
            </Paragraph>

            <SectionTitle>Testimonials Disclaimer</SectionTitle>
            <Paragraph>
                The app may contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our products and/or services. We do not claim, and you should not assume, that all users will have the same experiences.
            </Paragraph>

          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
