"use client";

import { useState, useEffect } from "react";
import PandaAvatar from "../PandaAvatar";

const messages = [
  "Crafting your personality...",
  "Tuning your voice...",
  "Building your world...",
  "Almost there...",
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 750);

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 1.2, 100));
    }, 30);

    const timeout = setTimeout(onDone, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [onDone]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <PandaAvatar size={88} animate className="mb-8" />

      <p className="text-foreground text-lg mb-8 animate-breathe">
        {messages[msgIndex]}
      </p>

      {/* Minimal progress bar */}
      <div className="w-48 h-[2px] bg-cream-dark rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
