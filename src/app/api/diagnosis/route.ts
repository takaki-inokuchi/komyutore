import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "ai";
  text: string;
};

export async function POST(req: Request) {
  const { messages }: { messages: ChatMessage[] } = await req.json();



  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: `
あなたは会話内容を分析して診断結果を出すAIです。
以下の観点で、わかりやすく日本語で診断してください。

・会話の特徴
・強み
・改善点
・総合評価（★5段階）

結果は見出し付きで簡潔にまとめてください。
            `,
          },
          ...messages.map((m) => ({
            role: m.role === "ai" ? "assistant" : "user",
            content: m.text,
          })),
        ],
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "OpenAIとの通信に失敗しました。" },
      { status: 500 }
    );
  }
}
