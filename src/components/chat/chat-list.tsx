
"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Chat } from "@/lib/types";
import { ChatListItem } from "./chat-list-item";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquareDashed } from "lucide-react";

function ChatListSkeleton() {
  return (
    <div className="py-2 space-y-2">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 mx-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChatList() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const chatsRef = collection(db, "chats");
    const q = query(
      chatsRef, 
      where("participantIds", "array-contains", user.uid),
      orderBy("lastMessage.timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const convos: Chat[] = [];
      querySnapshot.forEach((doc) => {
        convos.push({ id: doc.id, ...doc.data() } as Chat);
      });
      setConversations(convos);
      setIsLoading(false);
    }, (error) => {
      console.error("Error fetching conversations: ", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (isLoading) {
    return <ChatListSkeleton />;
  }

  if (conversations.length === 0) {
    return (
        <div className="p-4 text-center text-muted-foreground flex flex-col items-center h-full justify-center">
            <MessageSquareDashed className="w-12 h-12 mb-3" />
            <p className="font-semibold">No active chats.</p>
            <p className="text-xs">Once you match with someone, your conversation will appear here.</p>
        </div>
    );
  }

  return (
    <div className="py-2">
      {conversations.map((convo) => (
        <ChatListItem key={convo.id} conversation={convo} />
      ))}
    </div>
  );
}
