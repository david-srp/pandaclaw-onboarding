"use client";

import { useState, useEffect, useCallback } from "react";
import PandaAvatar from "../PandaAvatar";
import { callLLM } from "@/lib/llm";

export default function NameRevealScreen({
  userName,
  happyThing,
  onNext,
}: {
  userName: string;
  happyThing: string;
  onNext: (generatedName: string) => void;
}) {
  const [clawName, setClawName] = useState("");
  const [loading, setLoading] = useState(true);

  const generateName = useCallback(async () => {
    setLoading(true);
    try {
      const result = await callLLM(
        `Generate a single warm, poetic name (1-2 words) for an AI companion, inspired by: "${happyThing}". Return ONLY the name, nothing else.`
      );
      setClawName(result.replace(/['"]/g, "").trim());
    } catch {
      setClawName("Luna");
    }
    setLoading(false);
  }, [happyThing]);

  useEffect(() => {
    generateName();
  }, [generateName]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <PandaAvatar size={72} animate className="mb-6" />
        <p className="text-warm-gray font-serif text-lg italic animate-breathe">Finding the perfect name...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <PandaAvatar size={100} className="mb-8 animate-fade-up" />

      <h2
        className="font-serif text-[32px] md:text-[38px] font-medium leading-tight mb-4 max-w-md animate-fade-up"
        style={{ animationDelay: "200ms" }}
      >
        {userName}, I have been thinking...
        <br />
        <span className="italic">my name is </span>
        <span className="text-accent italic">{clawName}</span>
      </h2>

      <p
        className="text-warm-gray text-[15px] mb-10 animate-fade-up"
        style={{ animationDelay: "400ms" }}
      >
        Inspired by your love of {happyThing}
      </p>

      <div
        className="flex gap-3 w-full max-w-sm animate-fade-up"
        style={{ animationDelay: "500ms" }}
      >
        <button
          onClick={() => onNext(clawName)}
          className="flex-1 btn-primary"
        >
          I love it
        </button>
        <button
          onClick={generateName}
          className="flex-1 btn-secondary"
        >
          Try another
        </button>
      </div>
    </div>
  );
}
