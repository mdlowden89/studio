
'use client';

import { ChatView } from "@/components/chat/chat-view";
import { AppLayout } from "@/components/layout/app-layout";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import type { Chat } from "@/lib/types";

function ChatLoading() {
  return (
    <AppLayout>
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Loading Conversation...</p>
      </div>
    </AppLayout>
  );
}

export default function IndividualChatPage({ params }: { params: { chatId: string } }) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [chatData, setChatData] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthLoading || !user) return;
    
    const fetchChatData = async () => {
      setIsLoading(true);
      try {
        const chatRef = doc(db, 'chats', params.chatId);
        const chatSnap = await getDoc(chatRef);
        
        if (chatSnap.exists()) {
          const data = chatSnap.data() as Omit<Chat, 'id'>;
          if (!data.participantIds.includes(user.uid)) {
            setError("You are not authorized to view this chat.");
          } else {
            setChatData({ id: chatSnap.id, ...data });
          }
        } else {
          setError("Chat not found.");
        }
      } catch (err) {
        console.error("Error fetching chat data:", err);
        setError("Failed to load chat.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatData();
  }, [params.chatId, user, isAuthLoading]);

  if (isLoading || isAuthLoading) {
    return <ChatView.Loading />;
  }

  if (error) {
     return (
        <div className="flex h-full w-full flex-col items-center justify-center text-center">
          <p className="text-lg font-semibold text-destructive">{error}</p>
          <p className="text-muted-foreground">Please select another conversation.</p>
        </div>
    );
  }

  if (!chatData) {
    // This can happen briefly or if there's an unhandled case
    return <ChatView.Loading />;
  }

  return <ChatView chat={chatData} />;
}
