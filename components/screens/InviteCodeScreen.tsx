"use client";

import { useState, useRef } from "react";
import PandaAvatar from "../PandaAvatar";
import SpeechBubble from "../SpeechBubble";

export default function InviteCodeScreen({
  onNext,
}: {
  onNext: () => void;
}) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [mode, setMode] = useState<"code" | "waitlist">("code");
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const char = value.slice(-1).toUpperCase();
    if (char && !/^[A-Z0-9]$/.test(char)) return;

    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    setError("");

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 filled
    if (newDigits.every((d) => d !== "")) {
      setTimeout(() => onNext(), 300);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 6);
    if (!pasted) return;
    const newDigits = [...digits];
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);
    if (pasted.length === 6) {
      setTimeout(() => onNext(), 300);
    } else {
      inputRefs.current[pasted.length]?.focus();
    }
  };

  const handleSubmit = () => {
    const code = digits.join("");
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

      <div className="mt-10 animate-fade-up" style={{ animationDelay: "400ms" }}>
        <div className="flex gap-3" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="text"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 text-center text-xl font-semibold rounded-xl border-2 border-cream-dark bg-white focus:border-accent focus:outline-none transition-colors uppercase"
            />
          ))}
        </div>

        {error && (
          <p className="mt-3 text-red-500 text-[13px] text-center">{error}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={digits.some((d) => !d)}
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
