
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CrossdLogoIcon } from '@/components/icons/crossd-logo';

export default function HomePage() {
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
              <Link href="#">Login</Link>
            </Button>
            <Button variant="default" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="#">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex py-12 px-6 sm:px-10 md:px-16 items-center">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center w-full">
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Crossed Paths?
              <br />
              <span className="block">Reconnect <span className="text-primary">Now.</span></span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
              Crossd helps you find and connect with people you&apos;ve encountered in real life. Turn missed connections into meaningful conversations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base">
                Join Crossd Today
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-base">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative w-full aspect-square max-w-md mx-auto md:max-w-none">
            <Image
              src="/Login-Background-Imagepng.png"
              alt="Login page background illustration"
              layout="fill"
              objectFit="contain"
              data-ai-hint="login background"
              className="rounded-lg"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
