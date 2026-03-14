"use client";

import { useState, useEffect, useCallback } from "react";
import PandaAvatar from "../PandaAvatar";
import { callLLM } from "@/lib/llm";

type SubStep = "traits" | "avatar" | "voice";

export default function PersonaDetailScreen({
  happyThing,
  onNext,
}: {
  happyThing: string;
  onNext: (data: { traits: string[]; avatarDesc: string; voice: string }) => void;
}) {
  const [subStep, setSubStep] = useState<SubStep>("traits");
  const [traits, setTraits] = useState<string[]>([]);
  const [avatarDesc, setAvatarDesc] = useState("");
  const [voice, setVoice] = useState("");
  const [loading, setLoading] = useState(false);
  const [newTrait, setNewTrait] = useState("");

  const loadTraits = useCallback(async () => {
    setLoading(true);
    try {
      const result = await callLLM(
        `Based on the user loving "${happyThing}", generate 5 personality traits for a warm, helpful AI companion. Return ONLY a JSON array of strings, nothing else. Example: ["trait1","trait2","trait3","trait4","trait5"]`
      );
      const parsed = JSON.parse(result.replace(/```json?\n?/g, "").replace(/```/g, "").trim());
      setTraits(parsed);
    } catch {
      setTraits(["Warm", "Curious", "Playful", "Supportive", "Creative"]);
    }
    setLoading(false);
  }, [happyThing]);

  const loadAvatar = useCallback(async () => {
    setLoading(true);
    try {
      const result = await callLLM(
        `Based on someone who loves "${happyThing}", describe a cute, friendly AI companion's appearance in 2 sentences. Be poetic. Return only the description.`
      );
      setAvatarDesc(result);
    } catch {
      setAvatarDesc("A gentle creature with warm eyes and a soft glow, wrapped in the colors of dawn.");
    }
    setLoading(false);
  }, [happyThing]);

  useEffect(() => {
    if (subStep === "traits" && traits.length === 0) loadTraits();
    if (subStep === "avatar" && !avatarDesc) loadAvatar();
  }, [subStep, traits.length, avatarDesc, loadTraits, loadAvatar]);

  const removeTrait = (t: string) => setTraits((prev) => prev.filter((x) => x !== t));
  const addTrait = () => {
    if (newTrait.trim() && !traits.includes(newTrait.trim())) {
      setTraits((prev) => [...prev, newTrait.trim()]);
      setNewTrait("");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <PandaAvatar size={72} animate className="mb-6" />
        <p className="text-warm-gray text-lg animate-breathe">Thinking...</p>
      </div>
    );
  }

  if (subStep === "traits") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <h2 className="font-serif text-[32px] font-medium mb-2 animate-fade-up">Personality</h2>
        <p className="text-warm-gray text-[14px] mb-8 text-center animate-fade-up" style={{ animationDelay: "100ms" }}>
          Tap to remove, or add your own
        </p>

        <div className="flex flex-wrap gap-2 justify-center max-w-sm mb-8 stagger-children">
          {traits.map((t) => (
            <button
              key={t}
              onClick={() => removeTrait(t)}
              className="bg-accent-light text-accent border border-accent/20 rounded-full px-5 py-2.5 text-[14px] font-medium hover:bg-accent/15 transition-all cursor-pointer"
            >
              {t} &times;
            </button>
          ))}
        </div>

        <div className="flex gap-2 w-full max-w-sm mb-10">
          <input
            value={newTrait}
            onChange={(e) => setNewTrait(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTrait()}
            placeholder="Add a trait..."
            className="flex-1 bg-white border border-cream-dark rounded-full px-5 py-3 text-[14px] focus:border-accent transition-colors"
          />
          <button
            onClick={addTrait}
            className="bg-foreground text-cream rounded-full px-5 py-3 text-[14px] font-medium cursor-pointer hover:bg-foreground/80 transition-colors"
          >
            Add
          </button>
        </div>

        <button
          onClick={() => setSubStep("avatar")}
          className="w-full max-w-sm btn-primary"
        >
          Continue
        </button>
      </div>
    );
  }

  if (subStep === "avatar") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6">
        <PandaAvatar size={100} className="mb-8 animate-fade-up" />

        <h2 className="font-serif text-[32px] font-medium mb-2 animate-fade-up" style={{ animationDelay: "100ms" }}>
          Your Claw&apos;s look
        </h2>
        <p className="text-warm-gray text-[14px] mb-8 text-center animate-fade-up" style={{ animationDelay: "200ms" }}>
          Edit the description to your liking
        </p>

        <textarea
          value={avatarDesc}
          onChange={(e) => setAvatarDesc(e.target.value)}
          rows={4}
          className="textarea-editorial w-full max-w-sm mb-10 animate-fade-up"
          style={{ animationDelay: "300ms" }}
        />

        <button
          onClick={() => setSubStep("voice")}
          className="w-full max-w-sm btn-primary"
        >
          Continue
        </button>
      </div>
    );
  }

  // voice step
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <h2 className="font-serif text-[32px] font-medium mb-2 animate-fade-up">Voice</h2>
      <p className="text-warm-gray text-[14px] mb-10 text-center animate-fade-up" style={{ animationDelay: "100ms" }}>
        Choose a voice for your Claw
      </p>

      <div className="flex gap-4 w-full max-w-sm mb-10 stagger-children">
        {[
          { key: "male", label: "Warm & grounded" },
          { key: "female", label: "Bright & gentle" },
        ].map((v) => (
          <button
            key={v.key}
            onClick={() => setVoice(v.key)}
            className={`flex-1 flex flex-col items-center gap-3 py-7 rounded-2xl border-2 transition-all cursor-pointer ${
              voice === v.key
                ? "border-accent bg-accent-light"
                : "border-cream-dark bg-white hover:border-accent/30"
            }`}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={voice === v.key ? "var(--accent)" : "var(--warm-gray)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
            <span className="font-medium text-[15px]">{v.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => voice && onNext({ traits, avatarDesc, voice })}
        disabled={!voice}
        className="w-full max-w-sm btn-primary"
      >
        Continue
      </button>
    </div>
  );
}
