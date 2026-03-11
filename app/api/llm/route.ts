import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const response = await fetch("https://litellm.vllm.yesy.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer sk-NQ4xhpib6BTFjlwuNhFPWQ",
    },
    body: JSON.stringify({
      model: "deepseek-v3.2",
      messages: body.messages,
      temperature: body.temperature ?? 0.8,
      max_tokens: body.max_tokens ?? 256,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json({ error: text }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
