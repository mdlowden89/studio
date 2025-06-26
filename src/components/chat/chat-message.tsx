
"use client";

import type { ChatMessage, ChatParticipant } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Timestamp } from "firebase/firestore";

interface ChatMessageProps {
  message: ChatMessage;
  participants: ChatParticipant[];
}

export function ChatMessage({ message, participants }: ChatMessageProps) {
  const { user } = useAuth();
  if (!user) return null;

  const isCurrentUserSender = message.senderId === user.uid;
  const sender = participants.find(p => p.id === message.senderId);
  const [formattedTimestamp, setFormattedTimestamp] = useState<string>("");

  useEffect(() => {
    const date = (message.timestamp as Timestamp)?.toDate() || new Date();
    setFormattedTimestamp(
      date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, [message.timestamp]);

  return (
    <div className={cn("flex items-end gap-2", isCurrentUserSender ? "justify-end" : "justify-start")}>
      {!isCurrentUserSender && sender && (
        <Avatar className="h-8 w-8 self-start">
          <AvatarImage src={sender.images[0]} alt={sender.name} data-ai-hint="profile avatar small" />
          <AvatarFallback>{sender.name.substring(0,1)}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] rounded-xl px-4 py-2.5 shadow",
          isCurrentUserSender
            ? "bg-primary text-primary-foreground rounded-br-none"
            : "bg-muted text-foreground rounded-bl-none"
        )}
      >
        <p className="text-sm break-words">{message.text}</p>
        <p className={cn("text-xs mt-1", isCurrentUserSender ? "text-primary-foreground/70 text-right" : "text-muted-foreground/70 text-left")}>
          {formattedTimestamp}
        </p>
      </div>
       {isCurrentUserSender && sender && (
        <Avatar className="h-8 w-8 self-start">
          <AvatarImage src={sender.images[0]} alt={sender.name} data-ai-hint="profile avatar small" />
          <AvatarFallback>{sender.name.substring(0,1)}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
