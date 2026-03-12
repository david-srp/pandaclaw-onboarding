"use client";

import { useState, useRef } from "react";
import PandaAvatar from "../PandaAvatar";
import SpeechBubble from "../SpeechBubble";

export default function InviteCodeScreen({
  onNext,
}: {
  onNext: () => void;
}) {
  const [code, setCode] = useState("");
  const [mode, setMode] = useState<"code" | "waitlist">("code");
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState("");

  const handleCodeChange = (value: string) => {
    const cleaned = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 6);
    setCode(cleaned);
    setError("");

    // Auto-submit when all 6 filled
    if (cleaned.length === 6) {
      setTimeout(() => onNext(), 400);
    }
  };

  const handleSubmit = () => {
    if (code.length === 6) {
      onNext();
    } else {
      setError("Please enter the full 6-character code.");
    }
  };

  const handleJoinWaitlist = () => {
    if (!email.trim() || !email.includes("@")) return;
    setJoined(true);
  };

  if (mode === "waitlist") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <PandaAvatar size={72} className="mb-5 animate-fade-up" />

        {joined ? (
          <>
            <SpeechBubble>You&apos;re on the list! We&apos;ll reach out soon.</SpeechBubble>
            <p className="mt-8 text-warm-gray text-[14px] text-center max-w-xs animate-fade-up" style={{ animationDelay: "300ms" }}>
              We&apos;ll send an invite code to <span className="font-medium text-foreground">{email}</span> as soon as a spot opens up.
            </p>
            <button
              onClick={() => { setMode("code"); setJoined(false); }}
              className="mt-8 text-accent hover:underline text-[14px] font-medium cursor-pointer animate-fade-up"
              style={{ animationDelay: "400ms" }}
            >
              I already have a code &rarr;
            </button>
          </>
        ) : (
          <>
            <SpeechBubble>Join the waitlist and we&apos;ll let you know when it&apos;s your turn!</SpeechBubble>

            <div className="mt-10 w-full max-w-sm animate-fade-up" style={{ animationDelay: "400ms" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-editorial text-center"
                onKeyDown={(e) => e.key === "Enter" && handleJoinWaitlist()}
              />

              <button
                onClick={handleJoinWaitlist}
                disabled={!email.trim() || !email.includes("@")}
                className="mt-6 w-full btn-primary"
              >
                Join waitlist
              </button>

              <button
                onClick={() => setMode("code")}
                className="mt-4 w-full text-warm-gray hover:text-foreground text-[13px] font-medium cursor-pointer transition-colors text-center"
              >
                &larr; I have an invite code
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <PandaAvatar size={72} className="mb-5 animate-fade-up" />
      <SpeechBubble>Enter your invite code to get started</SpeechBubble>

      <div className="mt-10 w-full max-w-xs animate-fade-up" style={{ animationDelay: "400ms" }}>
        <input
          type="text"
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="XXXXXX"
          maxLength={6}
          className="w-full text-center text-[28px] font-semibold tracking-[0.4em] uppercase bg-transparent border-b-2 border-cream-dark focus:border-accent outline-none pb-3 transition-colors placeholder:text-cream-dark/50 placeholder:tracking-[0.4em]"
          autoFocus
        />

        <div className="flex justify-center mt-2">
          <span className="text-warm-gray/50 text-[12px]">{code.length} / 6</span>
        </div>

        {error && (
          <p className="mt-3 text-red-500 text-[13px] text-center">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={code.length < 6}
          className="mt-8 w-full btn-primary"
        >
          Continue
        </button>

        <button
          onClick={() => setMode("waitlist")}
          className="mt-4 w-full text-warm-gray hover:text-foreground text-[13px] font-medium cursor-pointer transition-colors text-center"
        >
          Don&apos;t have a code? Join the waitlist
        </button>
      </div>
    </div>
  );
}
