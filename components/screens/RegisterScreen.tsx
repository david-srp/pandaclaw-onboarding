"use client";

import PandaAvatar from "../PandaAvatar";
import SpeechBubble from "../SpeechBubble";

export default function RegisterScreen({ onNext }: { onNext: () => void }) {
  const options = [
    { icon: "phone", label: "Continue with Phone" },
    { icon: "mail", label: "Continue with Email" },
    { icon: "apple", label: "Continue with Apple" },
  ];

  const iconMap: Record<string, React.ReactNode> = {
    phone: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    mail: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    apple: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
    ),
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <PandaAvatar size={88} className="mb-5 animate-fade-up" />
      <SpeechBubble>I cannot wait to meet you.</SpeechBubble>

      <h2 className="font-serif text-[28px] font-medium mt-10 mb-8 animate-fade-up" style={{ animationDelay: "300ms" }}>
        Create your account
      </h2>

      <div className="flex flex-col gap-3 w-full max-w-sm stagger-children">
        {options.map((opt) => (
          <button
            key={opt.label}
            onClick={onNext}
            className="card-elevated flex items-center gap-4 px-6 py-4 w-full cursor-pointer text-left"
          >
            <span className="text-foreground/70">{iconMap[opt.icon]}</span>
            <span className="font-medium text-[15px]">{opt.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
