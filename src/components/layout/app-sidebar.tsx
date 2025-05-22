
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HeartHandshake,
  MapPin,
  MessageSquare,
  UserCircle,
  Sparkles,
  Home,
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

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home }, // Updated href
  { href: "/ai-matches", label: "Vibe Matches", icon: Sparkles },
  { href: "/moments", label: "Moments", icon: MapPin },
  { href: "/chat", label: "Chats", icon: MessageSquare },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const currentUser = getCurrentUser();

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon" defaultOpen={false}>
      <SidebarHeader className="items-center">
        <div className="flex items-center justify-between w-full">
          <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:text-primary/90 transition-colors"> {/* Updated href */}
            <CrossdLogoIcon className="h-7 w-7" />
            {state === 'expanded' && <span className="text-xl font-semibold">Crossd</span>}
          </Link>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <Separator className="my-2 bg-sidebar-border" />
      <SidebarMenu className="flex-1 p-2">
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href} passHref legacyBehavior>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== "/dashboard" && item.href !== "/" && pathname.startsWith(item.href))} // Adjusted active check
                tooltip={{children: item.label, className: "bg-popover text-popover-foreground border-border shadow-md"}}
                className="justify-start"
              >
                <a>
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <Separator className="my-2 bg-sidebar-border" />
      <SidebarFooter className="p-2">
        <Link href="/profile" passHref legacyBehavior>
          <Button variant="ghost" className="w-full justify-start p-2 h-auto">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser.images[0]} alt={currentUser.name} data-ai-hint="profile photo" />
              <AvatarFallback>{currentUser.name.substring(0, 1)}</AvatarFallback>
            </Avatar>
            {state === 'expanded' && <span className="ml-2 font-medium">{currentUser.name}</span>}
          </Button>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
