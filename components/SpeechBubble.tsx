"use client";

export default function SpeechBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative max-w-sm mx-auto animate-fade-up" style={{ animationDelay: "200ms" }}>
      <div className="bg-[#F3F4F6] rounded-2xl px-7 py-5">
        <p className="text-[18px] text-foreground text-center leading-relaxed font-normal">
          {children}
        </p>
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#F3F4F6] rotate-45" />
    </div>
  );
}
