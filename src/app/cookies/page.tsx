
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-bold text-primary mt-6 mb-3">{children}</h2>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground leading-relaxed">{children}</p>
);

export default function CookiePolicyPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-8">
        <Card className="bg-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Cookie Policy</CardTitle>
            <CardDescription>
              Last updated: June 23, 2025
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Paragraph>
              Welcome to Crossd's Cookie Policy. This policy provides information about how and when we use cookies on our Services.
            </Paragraph>
            
            <Separator className="my-6" />

            <SectionTitle>What are cookies?</SectionTitle>
            <Paragraph>
              Cookies are small text files sent by us to your computer or mobile device. They are unique to your account or your browser. Session-based cookies last only while your browser is open and are automatically deleted when you close your browser. Persistent cookies last until you or your browser delete them or until they expire.
            </Paragraph>

            <SectionTitle>Does Crossd use cookies?</SectionTitle>
            <Paragraph>
                Yes. We use cookies to ensure that our Services function properly, to understand how visitors use our site, and to help provide a secure experience. For example, we use cookies to keep you logged in and to remember your preferences.
            </Paragraph>

            <SectionTitle>How to control cookies</SectionTitle>
             <Paragraph>
              Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. It may also stop you from saving custom settings like login information.
            </Paragraph>

          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
