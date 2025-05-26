
"use client";
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, Eye } from 'lucide-react'; // Added Eye icon
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
import { cn } from '@/lib/utils'; 

const getTitleFromPathname = (pathname: string): string => {
  if (pathname === '/') return 'Home';
  if (pathname === '/dashboard') return 'Dashboard';
  if (pathname.startsWith('/chat/')) return 'Chat';
  if (pathname === '/login-form') return 'Login';
  if (pathname === '/signup') return 'Sign Up';
  if (pathname.startsWith('/confirm-moment/')) return 'Confirm Moment';
  const segment = pathname.split('/').filter(Boolean).pop();
  return segment ? segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ') : 'Crossd';
};

const mockNotifications = [
  { id: '1', title: 'New Match!', message: 'You and Alex liked each other.', time: '5m ago', read: false, href: "/chat/chat-1" },
  { id: 'nudge-1', title: 'Potential Crossing!', message: "Someone at The Alchemist's Cafe might have seen you.", time: '25m ago', read: false, href: "/confirm-moment/mock-moment-123", icon: Eye },
  { id: '2', title: 'Message from Jamie', message: 'Hey, are you free tonight?', time: '1h ago', read: true, href: "/chat/chat-2" },
  { id: '3', title: 'Path Crossed', message: 'You crossed paths with Casey near the park.', time: '3h ago', read: false, href: "/discover" },
  { id: '4', title: 'Profile View', message: 'Someone viewed your profile.', time: '1d ago', read: true, href: "/profile" },
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
                <Link href={notification.href || "#"} key={notification.id} passHref legacyBehavior>
                  <DropdownMenuItem className="p-3 flex flex-col items-start gap-1 cursor-pointer hover:bg-accent focus:bg-accent">
                    <div className="flex justify-between w-full items-center">
                       <div className="flex items-center gap-2">
                        {notification.icon && <notification.icon className="w-4 h-4 text-primary/80" />}
                        <span className={`font-medium ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>{notification.title}</span>
                      </div>
                      {!notification.read && <div className="h-2 w-2 rounded-full bg-primary ml-2 shrink-0"></div>}
                    </div>
                    <p className={`text-xs ${notification.read ? 'text-muted-foreground/80' : 'text-muted-foreground'}`}>{notification.message}</p>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">{notification.time}</p>
                  </DropdownMenuItem>
                </Link>
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
    
