
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MapPin,
  MessageSquare,
  UserCircle,
  Home,
  LogOut,
  Search,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CrossdLogoIcon } from "@/components/icons/crossd-logo";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons/icon";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/firebase";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home, tooltipClassName: "bg-popover text-popover-foreground border-border shadow-md" },
  { href: "/discover", label: "Discover", icon: Search, tooltipClassName: "bg-popover text-popover-foreground border-border shadow-md" },
  { href: "/moments", label: "Moments", icon: MapPin, tooltipClassName: "bg-popover text-popover-foreground border-border shadow-md" },
  { href: "/chat", label: "Chats", icon: MessageSquare, tooltipClassName: "bg-popover text-popover-foreground border-border shadow-md" },
  { href: "/profile", label: "Profile", icon: UserCircle, tooltipClassName: "bg-popover text-popover-foreground border-border shadow-md" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state, isMobile } = useSidebar();
  const { userProfile, isLoading } = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/');
  };

  if (isLoading || !userProfile) {
    return (
      <Sidebar side="left" variant="sidebar" collapsible="none">
        <SidebarHeader>
          <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors self-start">
            <CrossdLogoIcon className="h-7 w-7" />
            {state === 'expanded' && <span className="text-xl font-semibold">Crossd</span>}
          </Link>
        </SidebarHeader>
        <Separator className="my-2 bg-sidebar-border" />
        <SidebarMenu className="flex-1 p-2 space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </SidebarMenu>
        <Separator className="my-2 bg-sidebar-border" />
        <SidebarFooter>
          <div className="flex items-center p-2 gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            {state === 'expanded' && <div className="space-y-1"><Skeleton className="h-4 w-24" /><Skeleton className="h-3 w-32" /></div>}
          </div>
        </SidebarFooter>
      </Sidebar>
    );
  }

  const sortedAchievements = userProfile.achievements
    ? [...userProfile.achievements].sort((a, b) => {
        const dateA = a.achievedDate ? new Date(a.achievedDate).getTime() : 0;
        const dateB = b.achievedDate ? new Date(b.achievedDate).getTime() : 0;
        return dateB - dateA;
      })
    : [];
  const displayedAchievements = sortedAchievements.slice(0, 3);

  const isGlowModeActive = userProfile.achievements?.some(
    (ach) => ach.glowEffect
  );

  return (
    <Sidebar side="left" variant="sidebar" collapsible="none">
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors self-start">
          <CrossdLogoIcon className="h-7 w-7" />
          {state === 'expanded' && <span className="text-xl font-semibold">Crossd</span>}
        </Link>
        
        <div className="w-full flex justify-end md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <Separator className="my-2 bg-sidebar-border" />
      <SidebarMenu className="flex-1 p-2">
        {navItems.map((item) => {
          const buttonContent = (
            <SidebarMenuButton
              as="a"
              isActive={pathname === item.href || (item.href !== "/dashboard" && item.href !== "/" && pathname.startsWith(item.href))}
              className="justify-start"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </SidebarMenuButton>
          );

          const linkButton = (
            <Link href={item.href} passHref legacyBehavior> 
              {buttonContent}
            </Link>
          );

          return (
            <SidebarMenuItem key={item.href}>
              {(state === "collapsed" && !isMobile) ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    {linkButton}
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    align="center"
                    className={item.tooltipClassName}
                  >
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              ) : (
                linkButton
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
      <Separator className="my-2 bg-sidebar-border" />
      <SidebarFooter className="p-2 space-y-2">
        <Link href="/profile" passHref legacyBehavior>
          <Button 
            variant="ghost" 
            className="w-full justify-start p-2 h-auto items-center hover:bg-sidebar-accent hover:shadow-md hover:shadow-primary/40 transition-all duration-200"
            as="a"
          >
            <div className={cn(
                "relative rounded-full", 
                isGlowModeActive && "ring-2 ring-primary/50 p-0.5 shadow-md shadow-primary/30"
            )}>
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage 
                  src={userProfile.images[0]} 
                  alt={userProfile.name} 
                  data-ai-hint="profile photo"
                />
                <AvatarFallback>{userProfile.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
              {isGlowModeActive && state === 'expanded' && (
                  <Sparkles className="absolute -bottom-1 -right-1 h-4 w-4 text-primary bg-background/70 rounded-full p-0.5" />
              )}
            </div>
            {state === 'expanded' && (
              <div className="ml-3 flex flex-col items-start text-left">
                <span className="font-medium text-sm text-sidebar-primary">{userProfile.name.split(' ')[0]}</span>
                {userProfile.email && (
                  <span className="text-xs text-sidebar-foreground/70 truncate max-w-[120px]">{userProfile.email}</span>
                )}
              </div>
            )}
          </Button>
        </Link>

        {state === 'expanded' && displayedAchievements.length > 0 && (
          <div className="flex items-center gap-2 px-2 pt-1">
            {displayedAchievements.map(ach => (
                <Tooltip key={ach.id} delayDuration={100}>
                  <TooltipTrigger asChild>
                    <span className="p-1 rounded-full hover:bg-sidebar-accent/50 cursor-default">
                      <Icon name={ach.icon} className="h-5 w-5 text-primary/80" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-popover text-popover-foreground border-border shadow-md">
                    <p>{ach.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
          </div>
        )}

        <SidebarMenuButton
            onClick={handleLogout}
            className="justify-start w-full"
        >
            <LogOut className="h-5 w-5" />
            <span>Log Out</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
