"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import PandaAvatar from "../PandaAvatar";

type Step = "phone" | "code" | "loading";

const loadingMessages = [
  "Verifying your number...",
  "Setting up SMS...",
  "Connecting your Claw...",
  "Almost ready...",
];

export default function SmsVerifyScreen({
  onDone,
  onBack,
}: {
  onDone: () => void;
  onBack: () => void;
}) {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Loading step logic
  const onDoneStable = useCallback(onDone, [onDone]);

  useEffect(() => {
    if (step !== "loading") return;

    const msgInterval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % loadingMessages.length);
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 0.6, 100));
    }, 30);

    const timeout = setTimeout(onDoneStable, 5000);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [step, onDoneStable]);

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < 5) {
      codeRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits entered
    if (newCode.every((d) => d !== "") && index === 5) {
      setTimeout(() => setStep("loading"), 300);
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newCode = [...code];
    for (let i = 0; i < pasted.length; i++) {
      newCode[i] = pasted[i];
    }
    setCode(newCode);
    if (pasted.length === 6) {
      setTimeout(() => setStep("loading"), 300);
    } else {
      codeRefs.current[pasted.length]?.focus();
    }
  };

  // Loading screen
  if (step === "loading") {
    return (
      <div className="flex flex-col items-center justify-center px-8 py-16">
        <PandaAvatar size={80} animate className="mb-8" />

        <p className="text-foreground text-lg mb-8 animate-breathe">
          {loadingMessages[msgIndex]}
        </p>

        <div className="w-48 h-[2px] bg-cream-dark rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  // Verification code screen
  if (step === "code") {
    return (
      <div className="flex flex-col items-center px-8 py-10">
        <PandaAvatar size={64} className="mb-4 animate-fade-up" />

        <h2
          className="font-serif text-[26px] font-semibold text-foreground text-center animate-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          Enter verification code
        </h2>
        <p
          className="mt-2 text-warm-gray text-[14px] animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          Sent to {phone}
        </p>

        <div
          className="mt-8 flex gap-3 animate-fade-up"
          style={{ animationDelay: "300ms" }}
          onPaste={handleCodePaste}
        >
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { codeRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(i, e.target.value)}
              onKeyDown={(e) => handleCodeKeyDown(i, e)}
              className="w-12 h-14 text-center text-xl font-semibold rounded-xl border-2 border-cream-dark bg-white focus:border-accent focus:outline-none transition-colors"
              autoFocus={i === 0}
            />
          ))}
        </div>

        <button
          onClick={() => {
            setStep("phone");
            setCode(["", "", "", "", "", ""]);
          }}
          className="mt-8 text-warm-gray hover:text-foreground text-[13px] font-medium cursor-pointer transition-colors"
        >
          &larr; Change number
        </button>
      </div>
    );
  }

  // Phone input screen
  return (
    <div className="flex flex-col items-center px-8 py-10">
      <PandaAvatar size={64} className="mb-4 animate-fade-up" />

      <h2
        className="font-serif text-[28px] font-semibold text-foreground text-center animate-fade-up"
        style={{ animationDelay: "100ms" }}
      >
        What&apos;s your phone number?
      </h2>
      <p
        className="text-warm-gray text-[14px] text-center mt-2 animate-fade-up"
        style={{ animationDelay: "200ms" }}
      >
        We&apos;ll send you a verification code via SMS
      </p>

      <div className="mt-8 w-full max-w-sm animate-fade-up" style={{ animationDelay: "300ms" }}>
        <label className="block text-[13px] font-medium text-foreground mb-2">Phone number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 (555) 000-0000"
          className="w-full bg-white border border-cream-dark rounded-xl px-4 py-3 text-[16px] focus:border-accent transition-colors outline-none"
          autoFocus
        />

        <button
          onClick={() => phone.trim().length >= 6 && setStep("code")}
          disabled={phone.trim().length < 6}
          className="mt-6 w-full btn-primary"
        >
          Send verification code
        </button>

        <button
          onClick={onBack}
          className="mt-4 w-full text-warm-gray hover:text-foreground text-[13px] font-medium cursor-pointer transition-colors text-center"
        >
          &larr; Back to channels
        </button>
      </div>
    </div>
  );
}
