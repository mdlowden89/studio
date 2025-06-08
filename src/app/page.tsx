
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CrossdLogoIcon } from '@/components/icons/crossd-logo';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, HeartPulse, MessagesSquare } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <Users className="h-10 w-10 text-primary mb-4" />,
      title: 'Moment Logging',
      description: 'Capture significant places and times. Crossd intelligently logs when you cross paths with other users.',
    },
    {
      icon: <HeartPulse className="h-10 w-10 text-primary mb-4" />,
      title: 'Vibe Signal Engine',
      description: 'Our AI suggests compatible users based on shared vibe tags and location patterns, helping you find your tribe.',
    },
    {
      icon: <MessagesSquare className="h-10 w-10 text-primary mb-4" />,
      title: 'In-App Chat',
      description: 'Once matched, start a conversation securely within the app. No need to share personal contact info prematurely.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="py-4 px-6 sm:px-10 md:px-16">
        <div className="w-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-xl font-semibold hover:opacity-80 transition-opacity">
            <CrossdLogoIcon className="h-8 w-8 text-primary" />
            <span>Crossd</span>
          </Link>
          <nav className="flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/login-form">Login</Link>
            </Button>
            <Button variant="default" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex py-12 px-6 sm:px-10 md:px-16 items-center">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center w-full">
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Crossed Paths?
              <br />
              <span className="block">
                <span className="text-primary">Reconnect</span> <span className="text-primary">Now.</span>
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
              Crossd helps you find and connect with people you&apos;ve encountered in real life. Turn missed connections into meaningful conversations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base">
                <Link href="/signup">Join Crossd Today</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="px-8 py-3 text-base">
                <Link href="#key-features">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative w-full aspect-square max-w-md mx-auto md:max-w-none">
            <Image
              src="/login-bg.png"
              alt="Login page background illustration"
              layout="fill"
              objectFit="contain"
              data-ai-hint="map location pin neon grid"
              className="rounded-lg"
            />
          </div>
        </div>
      </main>

      {/* How Crossd Works Section */}
      <section id="key-features" className="py-16 px-6 sm:px-10 md:px-16 bg-background">
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="border-primary text-primary mb-4 text-sm px-3 py-1">
            Key Features
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            How Crossd Works
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover the unique ways Crossd brings people together based on shared moments and vibes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card text-left p-6 shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                <CardHeader className="p-0 mb-2">
                  {feature.icon}
                  <CardTitle className="text-xl font-semibold text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 sm:px-10 md:px-16 border-t border-border text-sm text-muted-foreground">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Crossd. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
