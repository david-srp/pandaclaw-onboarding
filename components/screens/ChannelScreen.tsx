"use client";

import PandaAvatar from "../PandaAvatar";

const channels = [
  {
    key: "sms",
    label: "Text me",
    desc: "Get updates via text message",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
      </svg>
    ),
  },
  {
    key: "app",
    label: "Get the app",
    desc: "Push notifications to your phone",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    key: "web",
    label: "Continue with web",
    desc: "Check in when you're ready",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export default function ChannelScreen({
  onNext,
}: {
  onNext: (channel: string) => void;
}) {
  return (
    <div className="flex flex-col items-center px-8 py-10">
      <PandaAvatar size={64} className="mb-4 animate-fade-up" />

      <h2
        className="font-serif text-[26px] font-semibold text-foreground text-center animate-fade-up"
        style={{ animationDelay: "100ms" }}
      >
        How should I reach you?
      </h2>
      <p
        className="text-warm-gray text-[14px] text-center mt-2 max-w-sm animate-fade-up"
        style={{ animationDelay: "200ms" }}
      >
        When I finish a task or have an update, where should I notify you?
      </p>

      <div className="mt-6 flex flex-col gap-3 w-full max-w-md stagger-children">
        {channels.map((ch) => (
          <button
            key={ch.key}
            onClick={() => onNext(ch.key)}
            className="flex items-center gap-4 rounded-2xl px-5 py-4 border-2 border-cream-dark bg-white hover:border-accent/30 hover:bg-accent-light/30 transition-all text-left cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-cream flex items-center justify-center shrink-0 text-warm-gray group-hover:text-accent group-hover:bg-accent-light transition-colors">
              {ch.icon}
            </div>
            <div className="flex-1">
              <span className="font-medium text-[15px] block">{ch.label}</span>
              <span className="text-warm-gray text-[13px]">{ch.desc}</span>
            </div>
            <svg className="text-warm-gray-light group-hover:text-accent transition-colors shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
