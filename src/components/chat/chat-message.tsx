
"use client";

import type { ChatMessage as MessageType } from "@/lib/types";
import { MOCK_USER_ID } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MOCK_USERS } from "@/lib/mock-data"; // To get sender avatar

interface ChatMessageProps {
  message: MessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isCurrentUserSender = message.senderId === MOCK_USER_ID;
  const sender = MOCK_USERS.find(u => u.id === message.senderId);

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
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
