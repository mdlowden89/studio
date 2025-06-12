
"use client";

import { useState, useRef, useEffect } from "react";
import type { ChatConversation, ChatMessage as MessageType, UserProfile } from "@/lib/types";
import { MOCK_USER_ID, MOCK_USERS } from "@/lib/mock-data";
import { ChatMessage } from "./chat-message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft, Video, Mic } from "lucide-react"; // Changed Phone to Mic
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Separator } from "../ui/separator";

interface ChatViewProps {
  conversation: ChatConversation;
  initialMessages: MessageType[];
}

export function ChatView({ conversation, initialMessages }: ChatViewProps) {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const otherParticipant = conversation.participants.find(p => p.id !== MOCK_USER_ID);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !otherParticipant) return;

    const messageToSend: MessageType = {
      id: `msg-${Date.now()}`,
      chatId: conversation.id,
      senderId: MOCK_USER_ID,
      receiverId: otherParticipant.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, messageToSend]);
    setNewMessage("");
  };
  
  if (!otherParticipant) {
    return <div className="p-4">Error: Could not load chat participant.</div>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center p-3 border-b border-border bg-card/50">
        <Link href="/chat" className="md:hidden mr-2">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <Avatar className="h-10 w-10">
           <AvatarImage src={otherParticipant.images[0]} alt={otherParticipant.name} data-ai-hint="profile avatar"/>
           <AvatarFallback>{otherParticipant.name.substring(0,1)}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold ml-3 text-foreground">{otherParticipant.name}</h2>
        <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Video Call">
                <Video className="h-5 w-5 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Send Voice Note"> {/* Changed aria-label */}
                <Mic className="h-5 w-5 text-primary" /> {/* Changed icon to Mic */}
            </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
      </ScrollArea>
      
      <Separator />

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-3 border-t border-border bg-card/50">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 bg-input text-foreground placeholder:text-muted-foreground"
            aria-label="Chat message input"
          />
          <Button type="submit" size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full" aria-label="Send message">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
