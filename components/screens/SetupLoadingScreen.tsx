"use client";

import { useState, useEffect, useCallback } from "react";
import PandaAvatar from "../PandaAvatar";

const messages = [
  "Setting things up...",
  "Connecting your channel...",
  "Preparing your experience...",
  "Almost ready...",
];

export default function SetupLoadingScreen({ onDone }: { onDone: () => void }) {
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const onDoneStable = useCallback(onDone, [onDone]);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 0.6, 100));
    }, 30);

    const timeout = setTimeout(onDoneStable, 5000);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [onDoneStable]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <PandaAvatar size={88} animate className="mb-8" />

      <p className="text-foreground font-serif text-xl italic mb-8 animate-breathe">
        {messages[msgIndex]}
      </p>

      <div className="w-48 h-[2px] bg-cream-dark rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
