"use client";

import { useState } from "react";
import PandaAvatar from "../PandaAvatar";
import SpeechBubble from "../SpeechBubble";

const channels = [
  {
    key: "web",
    label: "Web Dashboard",
    desc: "Your Claw on the web",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    key: "app",
    label: "Mobile App",
    desc: "Always in your pocket",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    key: "sms",
    label: "SMS",
    desc: "Simple text messages",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
      </svg>
    ),
  },
];

export default function ChannelScreen({
  onNext,
}: {
  onNext: (channels: string[]) => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <PandaAvatar size={72} className="mb-5 animate-fade-up" />
      <SpeechBubble>Where should I reach out to you?</SpeechBubble>

      <div className="mt-10 flex flex-col gap-3 w-full max-w-sm stagger-children">
        {channels.map((ch) => (
          <button
            key={ch.key}
            onClick={() => toggle(ch.key)}
            className={`flex items-center gap-4 rounded-2xl px-6 py-5 border-2 transition-all text-left cursor-pointer ${
              selected.includes(ch.key)
                ? "border-accent bg-accent-light"
                : "border-cream-dark bg-white hover:border-accent/30"
            }`}
          >
            <span className={selected.includes(ch.key) ? "text-accent" : "text-warm-gray"}>
              {ch.icon}
            </span>
            <div>
              <span className="font-medium text-[15px] block">{ch.label}</span>
              <span className="text-warm-gray text-[13px]">{ch.desc}</span>
            </div>
            {selected.includes(ch.key) && (
              <svg className="ml-auto text-accent" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => selected.length > 0 && onNext(selected)}
        disabled={selected.length === 0}
        className="mt-10 w-full max-w-sm btn-primary"
      >
        Continue
      </button>
    </div>
  );
}
