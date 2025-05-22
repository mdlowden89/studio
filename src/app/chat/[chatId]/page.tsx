
import { ChatView } from "@/components/chat/chat-view";
import { MOCK_CHAT_CONVERSATIONS, MOCK_CHAT_MESSAGES } from "@/lib/mock-data";
import { notFound } from 'next/navigation';

export default function IndividualChatPage({ params }: { params: { chatId: string } }) {
  const conversation = MOCK_CHAT_CONVERSATIONS.find(c => c.id === params.chatId);
  const messages = MOCK_CHAT_MESSAGES[params.chatId] || [];

  if (!conversation) {
    notFound();
  }

  return <ChatView conversation={conversation} initialMessages={messages} />;
}

export async function generateStaticParams() {
  return MOCK_CHAT_CONVERSATIONS.map(convo => ({
    chatId: convo.id,
  }));
}
