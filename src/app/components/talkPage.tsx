import UseMenuContext from "../context/porovider";

export type Message = {
  role: "user" | "ai";
  text: string;
};

const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const ChatPage = () => {
  const { messages, setMessages, input, setInput } = UseMenuContext();

  const handleSend = async () => {
    if (!input) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4.1-mini",
            messages: [
              { role: "system", content: "あなたは親切で優しいAIです。" },
              { role: "user", content: input },
            ],
          }),
        }
      );

      const data = await response.json();

      const aiText = data.choices[0].message.content;

      const aiMessage: Message = {
        role: "ai",
        text: aiText,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "エラーが発生しました。" },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* 会話エリア */}
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
          </div>
        ))}
      </div>

      <div className="flex p-2 border-t">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
