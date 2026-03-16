"use client";

interface SpeechBubbleProps {
  children: React.ReactNode;
  variant?: "center" | "left";
}

export default function SpeechBubble({ children, variant = "left" }: SpeechBubbleProps) {
  if (variant === "center") {
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

  return (
    <div className="relative animate-fade-up" style={{ animationDelay: "200ms" }}>
      <div className="bg-[#F3F4F6] rounded-2xl px-5 py-4">
        <p className="text-[16px] text-foreground leading-relaxed font-normal">
          {children}
        </p>
      </div>
      <div className="absolute top-5 -left-2 w-4 h-4 bg-[#F3F4F6] rotate-45" />
    </div>
  );
}
