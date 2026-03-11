"use client";

import { useState } from "react";
import PandaAvatar from "../PandaAvatar";
import SpeechBubble from "../SpeechBubble";

const presets = [
  "Morning briefing",
  "Daily planning",
  "Learning companion",
  "Just chat",
];

export default function GoalScreen({
  userName,
  onNext,
}: {
  userName: string;
  onNext: (goal: string) => void;
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [extra, setExtra] = useState("");

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const buildGoal = () => {
    const parts = [...selectedTags];
    if (extra.trim()) parts.push(extra.trim());
    return parts.join(", ");
  };

  const canContinue = selectedTags.length > 0 || extra.trim().length > 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <PandaAvatar size={72} className="mb-5 animate-fade-up" />
      <SpeechBubble>How can I best help you, {userName}?</SpeechBubble>

      <div className="mt-10 w-full max-w-sm">
        <div className="flex flex-wrap gap-2 mb-6 stagger-children">
          {presets.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium border-2 transition-all cursor-pointer ${
                selectedTags.includes(tag)
                  ? "border-accent bg-accent-light text-accent"
                  : "border-cream-dark bg-white text-warm-gray hover:border-accent/30"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="animate-fade-up" style={{ animationDelay: "400ms" }}>
          <textarea
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
            placeholder="Anything else you'd like help with..."
            rows={3}
            className="textarea-editorial"
          />

          <button
            onClick={() => canContinue && onNext(buildGoal())}
            disabled={!canContinue}
            className="mt-8 w-full btn-primary"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
