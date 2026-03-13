"use client";

import { useState, useEffect } from "react";
import PandaAvatar from "../PandaAvatar";

const demoTasks = [
  { icon: "📋", text: "Summarize meeting notes", status: "Done", delay: 0 },
  { icon: "📅", text: "Schedule team standup", status: "Done", delay: 600 },
  { icon: "📧", text: "Draft follow-up email", status: "Done", delay: 1200 },
  { icon: "🔍", text: "Research competitor pricing", status: "Working...", delay: 1800 },
];

export default function ValuePropsScreen({
  onNext,
  onSignIn,
}: {
  onNext: () => void;
  onSignIn: () => void;
}) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers = demoTasks.map((_, i) =>
      setTimeout(() => setVisibleCount(i + 1), demoTasks[i].delay + 800)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 pt-10 pb-10">
      {/* Top: branding */}
      <div className="flex items-center gap-2 animate-fade-up">
        <PandaAvatar size={28} />
        <span className="font-serif text-[16px] font-medium tracking-tight">Claw</span>
      </div>

      {/* Center: demo visual */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm py-6">
        {/* Mock phone frame */}
        <div className="w-full max-w-[300px] animate-fade-up" style={{ animationDelay: "200ms" }}>
          <div className="bg-white rounded-[28px] border-[3px] border-foreground/10 shadow-xl overflow-hidden">
            {/* Status bar mock */}
            <div className="flex items-center justify-between px-6 pt-3 pb-1">
              <span className="text-[11px] font-semibold text-foreground/60">9:41</span>
              <div className="flex items-center gap-1">
                <div className="w-[14px] h-[10px] flex items-end gap-[1.5px]">
                  <div className="w-[2px] h-[4px] bg-foreground/40 rounded-[0.5px]" />
                  <div className="w-[2px] h-[6px] bg-foreground/40 rounded-[0.5px]" />
                  <div className="w-[2px] h-[8px] bg-foreground/40 rounded-[0.5px]" />
                  <div className="w-[2px] h-[10px] bg-foreground/60 rounded-[0.5px]" />
                </div>
                <svg width="14" height="10" viewBox="0 0 16 12" fill="none" className="text-foreground/60">
                  <path d="M1 8.5c2-3 4.5-5 7-5s5 2 7 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <div className="w-[18px] h-[9px] border border-foreground/40 rounded-[2px] relative">
                  <div className="absolute inset-[1.5px] right-[2.5px] bg-foreground/40 rounded-[1px]" />
                </div>
              </div>
            </div>

            {/* Chat content */}
            <div className="px-4 pb-5 pt-2">
              {/* Bot greeting */}
              <div className="flex items-start gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-full bg-cream flex items-center justify-center flex-shrink-0 mt-0.5">
                  <PandaAvatar size={20} />
                </div>
                <div className="bg-cream rounded-2xl rounded-tl-md px-3.5 py-2.5 max-w-[85%]">
                  <p className="text-[12px] leading-snug text-foreground">
                    Hey! I just finished your morning tasks. Here&apos;s what I got done 👇
                  </p>
                </div>
              </div>

              {/* Task cards */}
              <div className="ml-9 flex flex-col gap-1.5">
                {demoTasks.map((t, i) => (
                  <div
                    key={t.text}
                    className={`flex items-center gap-2 bg-cream/80 rounded-lg px-3 py-2 transition-all duration-500 ${
                      i < visibleCount ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
                  >
                    <span className="text-[12px]">{t.icon}</span>
                    <span className="text-[11px] text-foreground flex-1">{t.text}</span>
                    <span className={`text-[9px] font-semibold ${
                      t.status === "Done" ? "text-green-600" : "text-accent"
                    }`}>{t.status}</span>
                  </div>
                ))}
              </div>

              {/* Typing indicator */}
              {visibleCount >= demoTasks.length && (
                <div className="flex items-start gap-2.5 mt-3">
                  <div className="w-7 h-7 rounded-full bg-cream flex items-center justify-center flex-shrink-0 mt-0.5">
                    <PandaAvatar size={20} />
                  </div>
                  <div className="bg-cream rounded-2xl rounded-tl-md px-4 py-3">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-warm-gray animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-warm-gray animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-warm-gray animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: CTA area */}
      <div className="w-full max-w-sm flex flex-col items-center">
        <h1
          className="font-serif text-[34px] leading-[1.1] font-semibold text-center tracking-tight mb-8 animate-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          Your 24/7 AI buddy that<br />
          <span className="italic text-accent">actually gets things done</span>
        </h1>

        <button
          onClick={onNext}
          className="w-full btn-primary text-[16px] py-[16px] animate-fade-up"
          style={{ animationDelay: "500ms" }}
        >
          Get Started
        </button>
        <button
          onClick={onSignIn}
          className="w-full mt-3 btn-secondary text-[15px] py-[14px] animate-fade-up"
          style={{ animationDelay: "580ms" }}
        >
          Already have an account? Log in
        </button>
      </div>
    </div>
  );
}
