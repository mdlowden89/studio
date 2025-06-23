import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CrossdLogoIcon } from '@/components/icons/crossd-logo';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

export default function TermsOfServicePage() {
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
