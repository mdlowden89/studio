'use client';

import { AppLayout } from "@/components/layout/app-layout";
import { ChatList } from "@/components/chat/chat-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  // Check if we are on a specific chat page (e.g., /chat/some-id)
  const isIndividualChatPage = pathname.startsWith('/chat/') && pathname.length > '/chat/'.length;

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-var(--header-height,4rem)-2rem)] border border-border rounded-lg overflow-hidden shadow-lg">
        {/* Chat List Sidebar */}
        <aside className={cn(
          "w-full md:w-1/3 lg:w-1/4 border-r border-border bg-card/30 flex flex-col",
          // On mobile, hide this list if we are viewing a specific chat.
          isIndividualChatPage ? "hidden md:flex" : "flex"
        )}>
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-foreground">Chats</h2>
          </div>
          <Separator />
          <ScrollArea className="h-[calc(100%-5rem)]">
            <ChatList />
          </ScrollArea>
        </aside>
        
        {/* Main Chat View */}
        <main className={cn(
          "flex-1 flex flex-col bg-background",
           // On mobile, show this main view only if we are viewing a specific chat.
          isIndividualChatPage ? "flex" : "hidden md:flex"
        )}>
          {children}
        </main>
      </div>
    </AppLayout>
  );
}
