"use client";

import { useState } from "react";
import PandaAvatar from "../PandaAvatar";
import SpeechBubble from "../SpeechBubble";

const presets = [
  { emoji: "🧠", label: "Work Assistant", value: "All-round work assistant" },
  { emoji: "📈", label: "Marketing & Growth", value: "Marketing & growth" },
  { emoji: "💰", label: "Finance Advisor", value: "Investment & finance advisor" },
  { emoji: "📚", label: "Learning Companion", value: "Learning companion" },
  { emoji: "🎯", label: "Project Manager", value: "Project management expert" },
  { emoji: "✍️", label: "Content Creator", value: "Content creation partner" },
];

export default function RoleScreen({
  userName,
  onNext,
}: {
  userName: string;
  onNext: (role: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [custom, setCustom] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const canContinue = selected !== null || custom.trim().length > 0;

  const handleContinue = () => {
    if (showCustom && custom.trim()) {
      onNext(custom.trim());
    } else if (selected) {
      onNext(selected);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <PandaAvatar size={72} className="mb-5 animate-fade-up" />
      <SpeechBubble>{userName ? `What role would you like me to play, ${userName}?` : "What role would you like me to play?"}</SpeechBubble>

      <div className="mt-10 w-full max-w-sm">
        <div className="grid grid-cols-2 gap-2.5 stagger-children">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setSelected(p.value);
                setShowCustom(false);
                setCustom("");
              }}
              className={`flex items-center gap-2.5 rounded-2xl px-4 py-3.5 border-2 transition-all text-left cursor-pointer ${
                selected === p.value && !showCustom
                  ? "border-accent bg-accent-light"
                  : "border-cream-dark bg-white hover:border-accent/30"
              }`}
            >
              <span className="text-lg">{p.emoji}</span>
              <span className="font-medium text-[13px] leading-tight">{p.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 animate-fade-up" style={{ animationDelay: "400ms" }}>
          {showCustom ? (
            <textarea
              autoFocus
              value={custom}
              onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
              placeholder="Describe the role you have in mind..."
              rows={3}
              className="textarea-editorial"
            />
          ) : (
            <button
              onClick={() => { setShowCustom(true); setSelected(null); }}
              className="w-full text-warm-gray hover:text-accent text-[13px] font-medium cursor-pointer transition-colors text-center py-2"
            >
              + Define my own role
            </button>
          )}
        </div>

        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="mt-6 w-full btn-primary animate-fade-up"
          style={{ animationDelay: "500ms" }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
