"use client";

import { useState } from "react";
import PandaAvatar from "../PandaAvatar";
import SpeechBubble from "../SpeechBubble";

export default function NameInputScreen({
  userName,
  onNext,
}: {
  userName: string;
  onNext: (name: string) => void;
}) {
  const [name, setName] = useState(userName);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <PandaAvatar size={88} className="mb-5 animate-fade-up" />
      <SpeechBubble>Hello! I&apos;m Panda, your setup guide. What should I call you?</SpeechBubble>

      <div className="mt-12 w-full max-w-sm animate-fade-up" style={{ animationDelay: "400ms" }}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="input-editorial"
          onKeyDown={(e) => e.key === "Enter" && name.trim() && onNext(name.trim())}
        />

        <button
          onClick={() => name.trim() && onNext(name.trim())}
          disabled={!name.trim()}
          className="mt-10 w-full btn-primary"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
