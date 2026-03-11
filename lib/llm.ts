export async function callLLM(prompt: string): Promise<string> {
  const res = await fetch("/api/llm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 256,
    }),
  });

  if (!res.ok) {
    throw new Error("LLM request failed");
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? "";
}
