
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
  Star,
  ShieldCheck,
  Target as TargetIcon,
  Settings,
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
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CrossdLogoIcon } from "@/components/icons/crossd-logo";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons/icon";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/firebase";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/discover", label: "Explore", icon: Sparkles },
  { href: "/moments", label: "Moments", icon: MapPin },
  { href: "/chat", label: "Chats", icon: MessageSquare },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

const footerNavItems = [
    { href: "#", label: "Settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const { userProfile, isLoading } = useAuth();

  const handleMobileNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    handleMobileNavClick(); // Also close sidebar on logout
    router.push('/');
  };

  if (isLoading || !userProfile) {
    return (
      <Sidebar side="left" variant="sidebar">
        <SidebarHeader>
          <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors self-start">
            <CrossdLogoIcon className="h-7 w-7" />
            {state === 'expanded' && <span className="text-xl font-semibold text-sidebar-foreground">Crossd</span>}
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
  
  const isGlowBoostActive = userProfile.glowEffect?.active && userProfile.glowEffect.expiresAt && new Date(userProfile.glowEffect.expiresAt) > new Date();
  
  const isGlowModeActive = isGlowBoostActive;

  const isPremium = userProfile.subscription?.status === 'active' || userProfile.email === 'mlowdencrossd@gmail.com';

  return (
    <Sidebar side="left" variant="sidebar">
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors self-start" onClick={handleMobileNavClick}>
          <CrossdLogoIcon className="h-7 w-7 text-primary" />
          {state === 'expanded' && <span className="text-xl font-semibold text-sidebar-primary-foreground">Crossd</span>}
        </Link>
        
        <div className="w-full flex justify-end md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      
      <SidebarMenu className="flex-1 p-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && item.href !== "/" && pathname.startsWith(item.href));
          
          const linkContent = (
            <>
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </>
          );

          return (
            <SidebarMenuItem key={item.href}>
              {(state === "collapsed" && !isMobile) ? (
                 <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={item.href} className={cn(buttonVariants({variant: 'default'}), 'justify-start', isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'bg-transparent text-sidebar-primary')}>
                          {linkContent}
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right" align="center" className="bg-popover text-popover-foreground border-border shadow-md">
                        {item.label}
                      </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
              ) : (
                <Link
                  href={item.href}
                  onClick={handleMobileNavClick}
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'default' }),
                    'w-full justify-start',
                    isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold' : 'bg-transparent text-sidebar-primary hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                >
                  {linkContent}
                </Link>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
      
      <SidebarFooter className="p-2 space-y-1">
        {footerNavItems.map((item) => (
             <SidebarMenuItem key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleMobileNavClick}
                  className={cn(
                    buttonVariants({ variant: 'default', size: 'default' }),
                    'w-full justify-start bg-transparent text-sidebar-primary hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                >
                    <item.icon className="h-5 w-5" />
                    {state === 'expanded' && <span>{item.label}</span>}
                </Link>
            </SidebarMenuItem>
        ))}
        <Button
            onClick={handleLogout}
            className="w-full justify-start bg-transparent text-sidebar-primary hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
            <LogOut className="h-5 w-5" />
            {state === 'expanded' && <span>Log Out</span>}
        </Button>
         <Link 
            href="/profile" 
            onClick={handleMobileNavClick}
            className={cn(
                buttonVariants({ variant: 'ghost' }),
                "w-full justify-start p-2 h-auto items-center hover:bg-sidebar-accent transition-all duration-200"
            )}
        >
            <div className={cn("relative rounded-full")}>
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage 
                  src={userProfile.images[0]} 
                  alt={userProfile.name} 
                  data-ai-hint="profile photo"
                />
                <AvatarFallback>{userProfile.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
            </div>
            {state === 'expanded' && (
              <div className="ml-3 flex flex-col items-start text-left min-w-0">
                  <span className="font-medium text-sm text-sidebar-primary-foreground truncate">{userProfile.name.split(' ')[0]}</span>
              </div>
            )}
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
