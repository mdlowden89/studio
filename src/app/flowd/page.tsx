"use client";

import { useEffect, useState } from "react";

type Question = {
  id: string;
  text: string;
  field: string;
  type: string;
  options?: string[];
};

type Message = { sender: "assistant" | "user"; text: string };

type Completion = {
  confirmation: string;
  disclaimer: string;
  brief: unknown;
};

export default function FlowdPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [completion, setCompletion] = useState<Completion | null>(null);

  useEffect(() => {
    async function start() {
      const res = await fetch("/api/flowd/session/start", {
        method: "POST",
        body: JSON.stringify({ vertical: "employment" }),
      });
      const data = await res.json();
      setSessionId(data.session_id);
      setQuestion(data.question);
      if (data.question) {
        setMessages([
          { sender: "assistant", text: data.question.text },
        ]);
      }
    }
    start();
  }, []);

  const sendAnswer = async (text: string) => {
    if (!sessionId || !question) return;
    setMessages((prev) => [...prev, { sender: "user", text }]);
    const res = await fetch("/api/flowd/session/answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId, question_id: question.id, user_text: text }),
    });
    const data = await res.json();
    if (data.next_question) {
      setQuestion(data.next_question);
      setMessages((prev) => [...prev, { sender: "assistant", text: data.next_question.text }]);
      setInput("");
    } else if (data.completion) {
      setQuestion(null);
      setCompletion(data.completion);
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", text: data.completion.confirmation },
      ]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Flowd Core Demo</h1>
      <p className="text-sm text-gray-600">
        This intake demo collects information only and does not give legal advice.
      </p>
      <div className="border rounded-lg p-4 space-y-3 bg-white">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === "assistant" ? "text-blue-700" : "text-gray-900"}>
            <strong>{msg.sender === "assistant" ? "Flowd" : "You"}:</strong> {msg.text}
          </div>
        ))}
        {question && (
          <div className="space-y-2">
            {question.options && (
              <div className="flex flex-wrap gap-2">
                {question.options.map((opt) => (
                  <button
                    key={opt}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded"
                    onClick={() => sendAnswer(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <input
                className="border rounded px-3 py-2 flex-1"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your answer"
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => sendAnswer(input)}
                disabled={!input}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
      {completion && (
        <div className="bg-green-50 border border-green-200 rounded p-4 space-y-2">
          <div className="font-semibold">Confirmation</div>
          <p>{completion.confirmation}</p>
          <p className="text-xs text-gray-600">{completion.disclaimer}</p>
        </div>
      )}
    </div>
  );
}
