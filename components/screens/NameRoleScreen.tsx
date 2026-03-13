"use client";

import { useState } from "react";
import PandaAvatar from "../PandaAvatar";
import SpeechBubble from "../SpeechBubble";

const roles = [
  { emoji: "💼", label: "Work & Scheduling", desc: "Meetings · Emails · Calendar" },
  { emoji: "📈", label: "Sales & Outreach", desc: "Follow-ups · Leads · Proposals" },
  { emoji: "✍️", label: "Content & Writing", desc: "Posts · Scripts · Newsletters" },
  { emoji: "👨‍💻", label: "Code & Dev Tools", desc: "Debugging · Automation · APIs" },
  { emoji: "💰", label: "Finance & Budgets", desc: "Tracking · Invoices · Taxes" },
  { emoji: "🛒", label: "Shopping & E-commerce", desc: "Deals · Listings · Support" },
  { emoji: "✈️", label: "Travel & Lifestyle", desc: "Trips · Restaurants · Bookings" },
  { emoji: "📊", label: "Research & Analysis", desc: "Data · Reports · Insights" },
];

export default function NameRoleScreen({
  onNext,
}: {
  onNext: (name: string, role: string) => void;
}) {
  const [step, setStep] = useState<"name" | "role">("name");
  const [name, setName] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const canSubmitRole = selectedRoles.length > 0;

  const handleNameSubmit = () => {
    if (name.trim()) setStep("role");
  };

  const toggleRole = (label: string) => {
    setSelectedRoles((prev) =>
      prev.includes(label)
        ? prev.filter((r) => r !== label)
        : [...prev, label]
    );
  };

  const handleRoleSubmit = () => {
    if (selectedRoles.length > 0) onNext(name.trim(), selectedRoles.join(", "));
  };

  // ── Role step ──
  if (step === "role") {
    return (
      <div className="flex flex-col min-h-screen px-6 pt-16 pb-0">
        {/* Header: avatar + bubble side by side */}
        <div className="flex items-start gap-3 w-full max-w-sm mx-auto flex-shrink-0">
          <PandaAvatar size={44} className="flex-shrink-0 animate-fade-up" />
          <div className="flex-1 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <SpeechBubble>Nice to meet you, {name}! Pick everything that fits — I&apos;ll adapt to you.</SpeechBubble>
          </div>
        </div>

        {/* Scrollable role list */}
        <div className="mt-5 w-full max-w-sm mx-auto flex-1 overflow-y-auto pb-28">
          <div className="flex flex-col gap-2.5 stagger-children">
            {roles.map((r) => {
              const isSelected = selectedRoles.includes(r.label);
              return (
                <button
                  key={r.label}
                  onClick={() => toggleRole(r.label)}
                  className={`flex items-center gap-4 rounded-2xl px-5 py-4 border-[1.5px] transition-all text-left cursor-pointer ${
                    isSelected
                      ? "border-accent bg-accent-light/40 shadow-sm"
                      : "border-cream-dark/60 bg-white hover:border-accent/30"
                  }`}
                >
                  <span className="text-[22px] w-8 text-center flex-shrink-0">{r.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[15px] text-foreground leading-snug">{r.label}</p>
                    <p className="text-warm-gray text-[12px] mt-0.5">{r.desc}</p>
                  </div>
                  {isSelected && (
                    <svg className="text-accent flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>

          {/* "Not sure" option */}
          <button
            onClick={() => {
              onNext(name.trim(), "Just exploring");
            }}
            className="w-full text-warm-gray hover:text-accent text-[13px] font-medium cursor-pointer transition-colors text-center py-3 mt-2"
          >
            Not sure yet, just browsing
          </button>
        </div>

        {/* Sticky bottom CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-cream/90 backdrop-blur-md pb-8 pt-4 px-6">
          <div className="w-full max-w-sm mx-auto">
            <button
              onClick={handleRoleSubmit}
              disabled={!canSubmitRole}
              className="w-full btn-primary"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Name step ── (input area upper, CTA fixed bottom)
  return (
    <div className="flex flex-col min-h-screen px-6 pt-16 pb-0">
      {/* Upper area — avatar + input */}
      <div className="pt-8 flex flex-col items-center">
        {/* Avatar + bubble side by side */}
        <div className="flex items-start gap-3 w-full max-w-sm">
          <PandaAvatar size={52} className="flex-shrink-0 animate-fade-up" />
          <div className="flex-1 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <SpeechBubble>First, what should I call you?</SpeechBubble>
          </div>
        </div>

        <div className="mt-10 w-full max-w-sm animate-fade-up" style={{ animationDelay: "400ms" }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
            placeholder="Your name"
            className="input-editorial"
            autoFocus
          />
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-cream/90 backdrop-blur-md pb-8 pt-4 px-6">
        <div className="w-full max-w-sm mx-auto">
          <button
            onClick={handleNameSubmit}
            disabled={!name.trim()}
            className="w-full btn-primary"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
