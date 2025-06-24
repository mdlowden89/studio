
"use client";

import { useState, useRef, useEffect } from "react";
import type { ChatConversation, ChatMessage as MessageType, UserProfile } from "@/lib/types";
import { MOCK_USERS, AVAILABLE_PROMPTS } from "@/lib/mock-data";
import { ChatMessage } from "./chat-message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, ArrowLeft, Video, Mic, User as UserIcon, MessageCircle, Loader2, MapPin } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";


interface ChatViewProps {
  conversation: ChatConversation;
  initialMessages: MessageType[];
}

export function ChatView({ conversation, initialMessages }: ChatViewProps) {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user } = useAuth();

  const [showProfile, setShowProfile] = useState(false);
  const [fullOtherParticipantProfile, setFullOtherParticipantProfile] = useState<UserProfile | null>(null);

  const otherParticipant = user ? conversation.participants.find(p => p.id !== user.uid) : null;

  useEffect(() => {
    if (!showProfile && scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages, showProfile]);

  useEffect(() => {
    if (showProfile && otherParticipant && !fullOtherParticipantProfile) {
      const fullProfile = MOCK_USERS.find(u => u.id === otherParticipant.id);
      setFullOtherParticipantProfile(fullProfile || null);
    }
  }, [showProfile, otherParticipant, fullOtherParticipantProfile]);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !otherParticipant || !user) return;

    const messageToSend: MessageType = {
      id: `msg-${Date.now()}`,
      chatId: conversation.id,
      senderId: user.uid,
      receiverId: otherParticipant.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, messageToSend]);
    setNewMessage("");
    if (showProfile) { 
      setShowProfile(false);
    }
  };
  
  if (!otherParticipant) {
    return <div className="p-4">Error: Could not load chat participant.</div>;
  }

  const handleBackAction = () => {
    if (showProfile) {
      setShowProfile(false);
    } else {
      router.push('/chat');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center p-3 border-b border-border bg-card/50">
        <Button variant="ghost" size="icon" onClick={handleBackAction} className="md:hidden mr-2">
            <ArrowLeft className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10">
           <AvatarImage src={otherParticipant.images[0]} alt={otherParticipant.name} data-ai-hint="profile avatar"/>
           <AvatarFallback>{otherParticipant.name.substring(0,1)}</AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold ml-3 text-foreground">{otherParticipant.name}</h2>
        <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="Video Call">
                <Video className="h-5 w-5 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Send Voice Note">
                <Mic className="h-5 w-5 text-primary" />
            </Button>
            <Button variant="ghost" size="icon" aria-label={showProfile ? "View Messages" : "View Profile"} onClick={() => setShowProfile(!showProfile)}>
              {showProfile ? <MessageCircle className="h-5 w-5 text-primary" /> : <UserIcon className="h-5 w-5 text-primary" />}
            </Button>
        </div>
      </div>

      {/* Messages Area / Profile View Area */}
      <div className="flex-1 overflow-hidden">
        {showProfile ? (
          fullOtherParticipantProfile ? (
            <ScrollArea className="h-full p-4">
              <div className="space-y-6 max-w-md mx-auto">
                <Avatar className="h-32 w-32 mx-auto border-4 border-primary shadow-lg">
                  <AvatarImage src={fullOtherParticipantProfile.images[0]} alt={fullOtherParticipantProfile.name} data-ai-hint="profile avatar large"/>
                  <AvatarFallback>{fullOtherParticipantProfile.name.substring(0,1)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-foreground">{fullOtherParticipantProfile.name}, {fullOtherParticipantProfile.age}</h2>
                    {fullOtherParticipantProfile.locationName && (
                        <div className="flex items-center justify-center text-sm text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4 mr-1.5 text-primary/80" />
                        <span>{fullOtherParticipantProfile.locationName}</span>
                        </div>
                    )}
                </div>
                
                <Separator />

                <div>
                  <h3 className="text-lg font-semibold text-primary mb-1.5">About {fullOtherParticipantProfile.name.split(' ')[0]}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line bg-muted/30 p-3 rounded-md">{fullOtherParticipantProfile.bio || "No bio provided."}</p>
                </div>

                {fullOtherParticipantProfile.vibeTags && fullOtherParticipantProfile.vibeTags.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Vibes</h3>
                    <div className="flex flex-wrap gap-2">
                      {fullOtherParticipantProfile.vibeTags.slice(0,7).map(tag => (
                        <Badge key={tag} variant="secondary" className="capitalize text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {fullOtherParticipantProfile.prompts && fullOtherParticipantProfile.prompts.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">Prompts</h3>
                    {fullOtherParticipantProfile.prompts.slice(0,2).map(promptAns => {
                      const promptDetail = AVAILABLE_PROMPTS.find(p => p.id === promptAns.promptId);
                      return promptDetail ? (
                        <div key={promptAns.promptId} className="bg-muted/30 p-3 rounded-md mb-3 shadow-sm">
                          <p className="text-xs font-semibold text-foreground/80 mb-1">{promptDetail.question}</p>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">{promptAns.answer}</p>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2 text-muted-foreground">Loading profile...</p>
            </div>
          )
        ) : (
          <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
      
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
