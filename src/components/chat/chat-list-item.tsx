
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Chat } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Timestamp } from "firebase/firestore";

interface ChatListItemProps {
  conversation: Chat;
}

export function ChatListItem({ conversation }: ChatListItemProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const isActive = pathname === `/chat/${conversation.id}`;
  const [displayedTimestamp, setDisplayedTimestamp] = useState<string>("");

  if (!user) return null;

  const otherParticipant = conversation.participants.find(p => p.id !== user.uid);

  useEffect(() => {
    if (conversation.lastMessage) {
      const date = (conversation.lastMessage.timestamp as Timestamp).toDate();
      setDisplayedTimestamp(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } else {
      setDisplayedTimestamp("");
    }
  }, [conversation.lastMessage]);

  if (!otherParticipant) return null;

  const lastMessageText = conversation.lastMessage?.text || "No messages yet.";

  return (
    <Link href={`/chat/${conversation.id}`} className="block">
      <div
        className={cn(
          "flex items-center gap-3 p-3 mx-2 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer",
          isActive ? "bg-accent text-accent-foreground" : "text-foreground"
        )}
      >
        <Avatar className="h-12 w-12 border-2 border-primary/50">
          <AvatarImage src={otherParticipant.images[0]} alt={otherParticipant.name} data-ai-hint="profile avatar"/>
          <AvatarFallback>{otherParticipant.name.substring(0, 1).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold truncate">{otherParticipant.name.split(' ')[0]}</h3>
            {displayedTimestamp && <span className="text-xs text-muted-foreground">{displayedTimestamp}</span>}
          </div>
          <p className={cn("text-sm truncate", isActive ? "text-accent-foreground/80" : "text-muted-foreground")}>
            {conversation.lastMessage?.senderId === user.uid && "You: "}
            {lastMessageText}
          </p>
        </div>
      </div>
    </Link>
  );
}
