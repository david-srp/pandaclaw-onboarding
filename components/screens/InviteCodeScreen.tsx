"use client";

import { useState, useRef } from "react";
import PandaAvatar from "../PandaAvatar";

export default function InviteCodeScreen({
  onNext,
  onClose,
}: {
  onNext: () => void;
  onClose?: () => void;
}) {
  const [code, setCode] = useState("");
  const [mode, setMode] = useState<"code" | "apply">("code");
  const [email, setEmail] = useState("");
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState("");

  const handleCodeChange = (value: string) => {
    const cleaned = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase().slice(0, 6);
    setCode(cleaned);
    setError("");

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

  const handleApply = () => {
    if (!email.trim() || !email.includes("@")) return;
    setApplied(true);
  };

  if (mode === "apply") {
    return (
      <div className="flex flex-col items-center px-8 py-10">
        <PandaAvatar size={72} className="mb-5 animate-fade-up" />

        {applied ? (
          <>
            <h2 className="font-serif text-[26px] font-semibold text-foreground text-center animate-fade-up" style={{ animationDelay: "100ms" }}>
              Application received!
            </h2>
            <p className="mt-3 text-warm-gray text-[14px] text-center max-w-sm leading-relaxed animate-fade-up" style={{ animationDelay: "200ms" }}>
              We&apos;ll send an invite code to <span className="font-medium text-foreground">{email}</span> once your spot is ready.
            </p>
            <button
              onClick={() => { setMode("code"); setApplied(false); }}
              className="mt-8 text-accent hover:underline text-[14px] font-medium cursor-pointer animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              I already have a code &rarr;
            </button>
          </>
        ) : (
          <>
            <h2 className="font-serif text-[26px] font-semibold text-foreground text-center animate-fade-up" style={{ animationDelay: "100ms" }}>
              Apply for access
            </h2>
            <p className="text-warm-gray text-[14px] text-center max-w-sm mt-2 animate-fade-up" style={{ animationDelay: "200ms" }}>
              Leave your email and we&apos;ll get you in as soon as possible
            </p>

            <div className="mt-8 w-full max-w-sm animate-fade-up" style={{ animationDelay: "300ms" }}>
              <label className="block text-[13px] font-medium text-foreground mb-2">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-white border border-cream-dark rounded-xl px-4 py-3 text-[15px] focus:border-accent transition-colors outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleApply()}
              />

              <button
                onClick={handleApply}
                disabled={!email.trim() || !email.includes("@")}
                className="mt-5 w-full btn-primary"
              >
                Apply
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
    <div className="flex flex-col items-center px-8 py-10">
      <PandaAvatar size={72} className="mb-5 animate-fade-up" />

      <h2
        className="font-serif text-[28px] font-semibold text-foreground text-center animate-fade-up"
        style={{ animationDelay: "100ms" }}
      >
        Enter your invite code
      </h2>
      <p
        className="text-warm-gray text-[14px] text-center mt-2 animate-fade-up"
        style={{ animationDelay: "200ms" }}
      >
        Enter the 6-character code to get started
      </p>

      <div className="mt-8 w-full max-w-xs animate-fade-up" style={{ animationDelay: "300ms" }}>
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
          onClick={() => setMode("apply")}
          className="mt-4 w-full text-warm-gray hover:text-foreground text-[13px] font-medium cursor-pointer transition-colors text-center"
        >
          Don&apos;t have a code? <span className="underline">Apply for one</span>
        </button>
      </div>
    </div>
  );
}
