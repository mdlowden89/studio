import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CrossdLogoIcon } from "@/components/icons";
import { HeartPulse, MessageSquareText, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sparks } from "@/components/sparks";

export default function LandingPage() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Moment Logging",
      description: "Capture significant places and times. Crossd intelligently logs when you cross paths with other users."
    },
    {
      icon: <HeartPulse className="w-8 h-8 text-primary" />,
      title: "Vibe Signals Engine",
      description: "Our AI suggests compatible users based on shared vibe and location patterns – connecting you with people that match your energy."
    },
    {
      icon: <MessageSquareText className="w-8 h-8 text-primary" />,
      title: "In-App Chat",
      description: "Once matched, start a conversation securely within the app. No need to share personal contact info prematurely."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground premium-background">
      <Sparks />
      <header className="px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 p-2 rounded-lg transition-colors text-foreground hover:text-foreground/80">
          <CrossdLogoIcon className="w-8 h-8 text-primary" />
          <span className="text-xl font-semibold">Crossd</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="outline-white" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        <section className="flex flex-col items-center justify-center text-center py-16 md:py-28">
            <div className="container mx-auto px-4 md:px-6">
              <div className="space-y-6 max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                  Crossed Paths?
                  <span className="text-primary"> Reconnect Now.</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-prose mx-auto">
                  Crossd helps you find and connect with people you've encountered in real life. Turn missed connections into meaningful conversations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="text-base">
                    <Link href="/signup">Join Crossd Today</Link>
                  </Button>
                  <Button variant="outline-white" size="lg" asChild className="text-base">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
        </section>

        <section className="px-4 md:px-6 py-12 md:py-20">
          <div className="relative aspect-video mx-auto">
            <Image
              src="/Crossd Landing Page.png"
              alt="App screenshot showing user profiles on a map interface"
              fill
              className="object-cover rounded-xl border border-border/10"
              data-ai-hint="city street"
            />
          </div>
        </section>

        <section id="features" className="py-8 md:py-16 bg-black/20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto">
                    <Badge variant="outline" className="border-primary text-primary mb-4 text-sm px-4 py-1">Key Features</Badge>
                    <h2 className="text-3xl sm:text-4xl font-bold">How Crossd Works</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Discover the unique ways Crossd brings people together based on shared moments and vibes.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-card p-8 rounded-xl flex flex-col items-start text-left transition-all duration-300 hover:shadow-[0_0_25px_-5px] hover:shadow-primary/50">
                            <div className="bg-primary/10 p-3 rounded-full mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="mt-2 text-xl font-semibold">{feature.title}</h3>
                            <p className="mt-2 text-muted-foreground flex-grow">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </main>

       <footer className="container mx-auto px-4 md:px-6 py-8 border-t border-border/10">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <p className="text-sm text-muted-foreground">&copy; 2025 Crossd. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
            <Link href="/cookie" className="text-sm text-muted-foreground hover:text-primary">Cookie Policy</Link>
            <Link href="/disclaimer" className="text-sm text-muted-foreground hover:text-primary">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
