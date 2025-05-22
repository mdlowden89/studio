
"use client";

import { MOCK_CHAT_CONVERSATIONS } from "@/lib/mock-data";
import { ChatListItem } from "./chat-list-item";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ChatList() {
  const conversations = MOCK_CHAT_CONVERSATIONS;

  if (conversations.length === 0) {
    return <p className="p-4 text-muted-foreground">No active chats.</p>;
  }

  return (
    <div className="py-2">
      {conversations.map((convo) => (
        <ChatListItem key={convo.id} conversation={convo} />
      ))}
    </div>
  );
}
