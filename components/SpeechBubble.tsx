"use client";

export default function SpeechBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative max-w-sm mx-auto animate-fade-up" style={{ animationDelay: "200ms" }}>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-7 py-5 border border-cream-dark/60">
        <p className="font-serif text-[22px] text-foreground text-center leading-relaxed font-light italic">
          {children}
        </p>
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/80 border-b border-r border-cream-dark/60 rotate-45" />
    </div>
  );
}
