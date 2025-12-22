"use client";
import { useRef, useEffect } from "react";
import UseMenuContext from "../context/porovider";

export type Message = {
  role: "user" | "ai";
  text: string;
};

const ChatPage = () => {
  const { messages, setMessages, input, setInput, aiName } = UseMenuContext();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const aiText =
        data.choices?.[0]?.message?.content ||
        "AIからの返信がありません。";

      let index = 0;
      let currentText = "";

      const typingMessage: Message = { role: "ai", text: "" };
      setMessages((prev) => [...prev, typingMessage]);

      const interval = setInterval(() => {
        if (index < aiText.length) {
          currentText += aiText[index++];
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = {
              role: "ai",
              text: currentText,
            };
            return newMessages;
          });
        } else {
          clearInterval(interval);
        }
      }, 30);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "エラーが発生しました。" },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)] max-w-md mx-auto bg-white">
      {/* メッセージエリア */}
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-gradient-to-b from-gray-50 to-gray-100 space-y-4 pt-10">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="max-w-[80%]">
              <div
                className={`px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-green-600 text-white rounded-br-none"
                    : "bg-white border rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>

              {msg.role === "ai" && (
                <div className="text-xs text-gray-500 mt-1 ml-1">
                  {aiName}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* 入力エリア */}
      <div className="border-t bg-white p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            rows={1}
            className="flex-1 resize-none border rounded-2xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="メッセージを入力..."
          />
          <button
            onClick={handleSend}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-full transition"
          >
            送信
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1 text-center">
          Enterで送信 / Shift+Enterで改行
        </p>
      </div>
    </div>
  );
};

export default ChatPage;
