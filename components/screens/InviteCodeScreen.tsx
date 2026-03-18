"use client";

import { useState } from "react";

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
      <div className="flex flex-col min-h-screen px-6 pt-16 pb-8">
        <div className="pt-8 w-full max-w-sm mx-auto">
          <h1 className="text-[28px] font-semibold text-foreground leading-tight tracking-tight animate-fade-up">
            {joined ? "You're on the list!" : "Join the waitlist"}
          </h1>

          {joined ? (
            <>
              <p className="mt-6 text-warm-gray text-[14px] max-w-xs animate-fade-up" style={{ animationDelay: "200ms" }}>
                We&apos;ll send an invite code to <span className="font-medium text-foreground">{email}</span> as soon as a spot opens up.
              </p>
              <button
                onClick={() => { setMode("code"); setJoined(false); }}
                className="mt-8 text-accent hover:underline text-[14px] font-medium cursor-pointer animate-fade-up"
                style={{ animationDelay: "300ms" }}
              >
                I already have a code &rarr;
              </button>
            </>
          ) : (
            <div className="mt-8 w-full animate-fade-up" style={{ animationDelay: "200ms" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="input-editorial text-center"
                onKeyDown={(e) => e.key === "Enter" && handleJoinWaitlist()}
                autoFocus
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
                I have an invite code
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen px-6 pt-16 pb-8">
      {/* Upper area */}
      <div className="pt-8 w-full max-w-sm mx-auto">
        <h1 className="text-[28px] font-semibold text-foreground leading-tight tracking-tight animate-fade-up">
          Enter your invite code
        </h1>

        <div className="mt-8 w-full max-w-xs mx-auto animate-fade-up" style={{ animationDelay: "200ms" }}>
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

          <p className="mt-6 text-warm-gray text-[13px] font-medium text-center">
            Don&apos;t have a code?{" "}
            <a
              href="https://starquest.feishu.cn/share/base/form/shrcnGUFH9kq2wMt25vE3eXS07c?from=navigation"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline hover:text-accent transition-colors"
            >
              Apply one
            </a>
          </p>
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white pb-8 pt-4 px-6">
        <div className="w-full max-w-sm mx-auto">
          <button
            onClick={handleSubmit}
            disabled={code.length < 6}
            className="w-full btn-primary"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
