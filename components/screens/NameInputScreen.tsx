"use client";

import { useState } from "react";
import PandaAvatar from "../PandaAvatar";

// Derive a display name from the user's email address
function getDefaultNameFromEmail(email: string): string {
  const local = email.split("@")[0] || "";
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
    <div className="flex flex-col items-center px-8 py-10">
      <PandaAvatar size={80} className="mb-5 animate-fade-up" />

      <h2
        className="font-serif text-[28px] font-semibold text-foreground text-center animate-fade-up"
        style={{ animationDelay: "100ms" }}
      >
        What should I call you?
      </h2>
      <p
        className="text-warm-gray text-[14px] text-center mt-2 animate-fade-up"
        style={{ animationDelay: "200ms" }}
      >
        Hello! I&apos;m Panda, your setup guide.
      </p>

      <div className="mt-8 w-full max-w-sm animate-fade-up" style={{ animationDelay: "300ms" }}>
        <label className="block text-[13px] font-medium text-foreground mb-2">Your name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full bg-white border border-cream-dark rounded-xl px-4 py-3 text-[16px] focus:border-accent transition-colors outline-none"
          onKeyDown={(e) => e.key === "Enter" && name.trim() && onNext(name.trim())}
          autoFocus
        />

        <button
          onClick={() => name.trim() && onNext(name.trim())}
          disabled={!name.trim()}
          className="mt-8 w-full btn-primary"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
