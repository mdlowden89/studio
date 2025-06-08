
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
import { getCurrentUser } from "@/lib/mock-data";
import { CrossdLogoIcon } from "@/components/icons/crossd-logo";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    router.push('/');
  };

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
              as="a" // Render SidebarMenuButton as an anchor tag
              isActive={pathname === item.href || (item.href !== "/dashboard" && item.href !== "/" && pathname.startsWith(item.href))}
              className="justify-start"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </SidebarMenuButton>
          );

          const linkButton = (
            // Link uses legacyBehavior to pass href to the child <a> rendered by SidebarMenuButton
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
            as="a" // Ensure Button renders as an anchor tag when wrapped by Link legacyBehavior
          >
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarImage 
                src={currentUser.images[0]} 
                alt={currentUser.name} 
                data-ai-hint="profile photo"
              />
              <AvatarFallback>{currentUser.name.substring(0, 1)}</AvatarFallback>
            </Avatar>
            {state === 'expanded' && (
              <div className="ml-3 flex flex-col items-start text-left">
                <span className="font-medium text-sm text-sidebar-primary">{currentUser.name}</span>
                {currentUser.email && (
                  <span className="text-xs text-sidebar-foreground/70 truncate max-w-[120px]">{currentUser.email}</span>
                )}
              </div>
            )}
          </Button>
        </Link>
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
