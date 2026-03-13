"use client";

import { useEffect } from "react";
import PandaAvatar from "../PandaAvatar";

export default function GreetScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <PandaAvatar size={120} className="mb-6 animate-fade-up" />
      <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-7 py-5 border border-cream-dark/60 max-w-xs">
          <p className="font-serif text-[24px] text-foreground text-center leading-relaxed font-light italic">
            Hi there! I&apos;m Claw 👋
          </p>
        </div>
      </div>
    </div>
  );
}
