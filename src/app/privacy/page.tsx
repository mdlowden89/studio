import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CrossdLogoIcon } from '@/components/icons/crossd-logo';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="py-4 px-6 sm:px-10 md:px-16 border-b border-border">
        <div className="w-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold hover:opacity-80 transition-opacity">
            <CrossdLogoIcon className="h-8 w-8 text-primary" />
            <span>Crossd</span>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/dashboard">Back to App</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 py-12 px-6 sm:px-10 md:px-16">
        <div className="max-w-4xl mx-auto">
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
      </main>

      <footer className="py-8 px-6 sm:px-10 md:px-16 border-t border-border text-sm text-muted-foreground">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; 2024 Crossd. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
