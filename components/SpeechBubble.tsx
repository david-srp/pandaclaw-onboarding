"use client";

interface SpeechBubbleProps {
  children: React.ReactNode;
  /** "center" = old vertical style (below avatar), "left" = chat-style (bubble on right of avatar) */
  variant?: "center" | "left";
}

export default function SpeechBubble({ children, variant = "left" }: SpeechBubbleProps) {
  if (variant === "center") {
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

  // Chat-style: bubble with left-pointing arrow
  return (
    <div className="relative animate-fade-up" style={{ animationDelay: "200ms" }}>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-4 border border-cream-dark/60">
        <p className="font-serif text-[18px] text-foreground leading-relaxed font-light italic">
          {children}
        </p>
      </div>
      {/* Left-pointing arrow */}
      <div className="absolute top-5 -left-2 w-4 h-4 bg-white/80 border-l border-b border-cream-dark/60 rotate-45" />
    </div>
  );
}
