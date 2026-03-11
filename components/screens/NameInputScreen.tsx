"use client";

import { useState } from "react";
import PandaAvatar from "../PandaAvatar";
import SpeechBubble from "../SpeechBubble";

// Derive a display name from the user's email address
function getDefaultNameFromEmail(email: string): string {
  const local = email.split("@")[0] || "";
  // Replace dots, underscores, hyphens with spaces and capitalize each word
  return local
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Simulated logged-in user email
const MOCK_USER_EMAIL = "david.lu@example.com";

export default function NameInputScreen({
  userName,
  onNext,
}: {
  userName: string;
  onNext: (name: string) => void;
}) {
  const defaultName = userName || getDefaultNameFromEmail(MOCK_USER_EMAIL);
  const [name, setName] = useState(defaultName);

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
