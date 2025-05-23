
"use client";
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils'; // Import cn

// A simple function to get a title from the pathname
const getTitleFromPathname = (pathname: string): string => {
  if (pathname === '/') return 'Home';
  if (pathname === '/dashboard') return 'Dashboard';
  if (pathname.startsWith('/chat/')) return 'Chat';
  if (pathname === '/login-form') return 'Login';
  if (pathname === '/signup') return 'Sign Up';
  const segment = pathname.split('/').filter(Boolean).pop();
  return segment ? segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ') : 'Crossd';
};

// Mock notifications for the dropdown
const mockNotifications = [
  { id: '1', title: 'New Match!', message: 'You and Alex liked each other.', time: '5m ago', read: false },
  { id: '2', title: 'Message from Jamie', message: 'Hey, are you free tonight?', time: '1h ago', read: true },
  { id: '3', title: 'Path Crossed', message: 'You crossed paths with Casey near the park.', time: '3h ago', read: false },
  { id: '4', title: 'Profile View', message: 'Someone viewed your profile.', time: '1d ago', read: true },
];

export function Header() {
  const pathname = usePathname();
  const title = getTitleFromPathname(pathname);
  const unreadNotificationsCount = mockNotifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex-1">
        <h1 className={cn(
          "text-xl font-semibold",
          title === "Dashboard" ? "text-primary" : "text-foreground"
        )}>{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              aria-label="Notifications" 
              className="relative hover:bg-primary/10"
            >
              <Bell className="h-5 w-5 text-primary" />
              {unreadNotificationsCount > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">
                  {unreadNotificationsCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-popover text-popover-foreground">
            <DropdownMenuLabel className="px-3 py-2 font-semibold">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {mockNotifications.length > 0 ? (
              mockNotifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="p-3 flex flex-col items-start gap-1 cursor-pointer hover:bg-accent focus:bg-accent">
                  <div className="flex justify-between w-full items-center">
                    <span className={`font-medium ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>{notification.title}</span>
                    {!notification.read && <div className="h-2 w-2 rounded-full bg-primary ml-2"></div>}
                  </div>
                  <p className={`text-xs ${notification.read ? 'text-muted-foreground/80' : 'text-muted-foreground'}`}>{notification.message}</p>
                  <p className="text-xs text-muted-foreground/70 mt-0.5">{notification.time}</p>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem className="p-3 text-muted-foreground text-center">No new notifications</DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-accent focus:bg-accent">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Mark all as read</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
         <Link href="/profile">
          {/* Placeholder for User Avatar/Menu if needed */}
        </Link>
      </div>
    </header>
  );
}

    
