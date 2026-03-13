"use client";

import { useEffect } from "react";
import PandaAvatar from "../PandaAvatar";

export default function SplashScreen({
  onDone,
}: {
  onDone: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div className="animate-fade-up">
        <PandaAvatar size={80} />
      </div>
      <p
        className="mt-5 font-serif text-[22px] font-medium text-foreground tracking-tight animate-fade-up"
        style={{ animationDelay: "150ms" }}
      >
        Claw
      </p>
      <p
        className="mt-1 text-warm-gray text-[12px] tracking-[0.15em] uppercase animate-fade-up"
        style={{ animationDelay: "300ms" }}
      >
        by PandaClaw
      </p>
    </div>
  );
}
