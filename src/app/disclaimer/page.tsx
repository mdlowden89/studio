
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
            <SectionTitle>Website Disclaimer</SectionTitle>
            <Paragraph>
              The information provided by Crossd ('we', 'us', or 'our') on crossd.app (the 'Site') and our mobile application is for general informational purposes only. All information on the Site and our mobile application is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site and our mobile application. UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR OUR MOBILE APPLICATION OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE AND OUR MOBILE APPLICATION. YOUR USE OF THE SITE AND OUR MOBILE APPLICATION AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE AND OUR MOBILE APPLICATION IS SOLELY AT YOUR OWN RISK.
            </Paragraph>

            <Separator className="my-6" />

            <SectionTitle>Testimonials Disclaimer</SectionTitle>
            <Paragraph>
              The Site may contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our products and/or services. We do not claim, and you should not assume, that all users will have the same experiences. YOUR INDIVIDUAL RESULTS MAY VARY.
            </Paragraph>
            <Paragraph>
              The testimonials on the Site are submitted in various forms such as text, audio and/or video, and are reviewed by us before being posted. They appear on the Site verbatim as given by the users, except for the correction of grammar or typing errors. Some testimonials may have been shortened for the sake of brevity where the full testimonial contained extraneous information not relevant to the general public.
            </Paragraph>
            <Paragraph>
              The views and opinions contained in the testimonials belong solely to the individual user and do not reflect our views and opinions. We are not affiliated with users who provide testimonials, and users are not paid or otherwise compensated for their testimonials.
            </Paragraph>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
