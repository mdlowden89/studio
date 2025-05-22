
import { MessageSquareDashed } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <MessageSquareDashed className="w-24 h-24 text-muted-foreground mb-6" />
      <h2 className="text-2xl font-semibold text-foreground mb-2">Select a chat to start messaging</h2>
      <p className="text-muted-foreground max-w-md">
        Your conversations with matched users will appear here. Click on a chat from the list to view messages.
      </p>
    </div>
  );
}
