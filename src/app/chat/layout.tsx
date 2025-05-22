
import { AppLayout } from "@/components/layout/app-layout";
import { ChatList } from "@/components/chat/chat-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-var(--header-height,4rem)-2rem)] border border-border rounded-lg overflow-hidden shadow-lg"> {/* Adjust height calculation */}
        <aside className="w-full md:w-1/3 lg:w-1/4 border-r border-border bg-card/30">
          <div className="p-4">
            <h2 className="text-2xl font-semibold text-foreground">Chats</h2>
          </div>
          <Separator />
          <ScrollArea className="h-[calc(100%-5rem)]"> {/* Adjust height calculation */}
            <ChatList />
          </ScrollArea>
        </aside>
        <main className="flex-1 flex flex-col bg-background">
          {children}
        </main>
      </div>
    </AppLayout>
  );
}
