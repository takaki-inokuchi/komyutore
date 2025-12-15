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
        data.choices?.[0]?.message?.content || "AIからの返信がありません。";

      let index = 0;
      let currentText = "";

      const typingMessage: Message = {
        role: "ai",
        text: "",
      };

      setMessages((prev) => [...prev, typingMessage]);

      const interval = setInterval(() => {
        if (index < aiText.length) {
          currentText += aiText[index];
          index++;

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
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "エラーが発生しました。" },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem-2rem)] max-w-md overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-green-500 text-white"
                  : "bg-white border"
              }`}
            >
              {msg.text}
            </span>
            <div
              className={`text-sm mt-1 text-gray-500 ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              {msg.role === "user" ? "" : aiName}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex p-2 border-t shrink-0">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // 改行防止 
              handleSend();
            }
          }}
          className="flex-1 border rounded px-2"
          placeholder="メッセージを入力..."
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-green-600 text-white px-4 rounded"
        >
          送信
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
