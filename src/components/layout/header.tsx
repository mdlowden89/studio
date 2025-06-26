
"use client";
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, Eye, MessageSquareHeart, Inbox, Loader2 } from 'lucide-react';
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
import { useAuth } from '@/hooks/use-auth';
import { useState, useEffect } from 'react';
import { fetchNotificationsForUser } from '@/app/actions';
import type { Notification } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

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

const NotificationIcon = ({ type }: { type: Notification['type'] }) => {
    switch (type) {
        case 'MOMENT_CONFIRMATION':
            return <Eye className="w-4 h-4 text-primary/80" />;
        case 'NEW_MATCH':
            return <MessageSquareHeart className="w-4 h-4 text-primary/80" />;
        default:
            return <Bell className="w-4 h-4 text-primary/80" />;
    }
}

export function Header() {
  const pathname = usePathname();
  const title = getTitleFromPathname(pathname);
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      setIsLoading(true);
      fetchNotificationsForUser(user.uid)
        .then(setNotifications)
        .catch(err => console.error("Failed to load notifications:", err))
        .finally(() => setIsLoading(false));
    } else if (!user) {
        setNotifications([]);
        setIsLoading(false);
    }
  }, [user]);
  
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

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
            {isLoading ? (
                <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            ) : notifications.length > 0 ? (
              notifications.map((notification) => (
                <Link href={notification.href || "#"} key={notification.id} passHref legacyBehavior>
                  <DropdownMenuItem className="p-3 flex flex-col items-start gap-1 cursor-pointer hover:bg-accent focus:bg-accent">
                    <div className="flex justify-between w-full items-center">
                       <div className="flex items-center gap-2">
                        <NotificationIcon type={notification.type} />
                        <span className={`font-medium ${notification.read ? 'text-muted-foreground' : 'text-foreground'}`}>{notification.title}</span>
                      </div>
                      {!notification.read && <div className="h-2 w-2 rounded-full bg-primary ml-2 shrink-0"></div>}
                    </div>
                    <div className="pl-6 w-full">
                      <p className={`text-xs ${notification.read ? 'text-muted-foreground/80' : 'text-muted-foreground'}`}>{notification.message}</p>
                      <p className="text-xs text-muted-foreground/70 mt-0.5">{formatDistanceToNow(new Date(notification.createdAt as string), { addSuffix: true })}</p>
                    </div>
                  </DropdownMenuItem>
                </Link>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
                <Inbox className="h-6 w-6" />
                <span>No new notifications</span>
              </div>
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
