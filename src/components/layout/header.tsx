
"use client";
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import Link from 'next/link';

// A simple function to get a title from the pathname
const getTitleFromPathname = (pathname: string): string => {
  if (pathname === '/') return 'Dashboard';
  if (pathname.startsWith('/chat/')) return 'Chat';
  const segment = pathname.split('/').filter(Boolean).pop();
  return segment ? segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ') : 'Crossd';
};


export function Header() {
  const pathname = usePathname();
  const title = getTitleFromPathname(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
         <Link href="/profile">
          {/* Placeholder for User Avatar/Menu if needed */}
        </Link>
      </div>
    </header>
  );
}
