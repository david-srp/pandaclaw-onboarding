"use client";

import { useState } from "react";

const categories = [
  { emoji: "💼", label: "Work & Scheduling", tags: "Meetings · Emails · Calendar" },
  { emoji: "📈", label: "Sales & Outreach", tags: "Follow-ups · Leads · Proposals" },
  { emoji: "✍️", label: "Content & Writing", tags: "Posts · Scripts · Newsletters" },
  { emoji: "👨‍💻", label: "Code & Dev Tools", tags: "Debugging · Automation · APIs" },
  { emoji: "💰", label: "Finance & Budgets", tags: "Tracking · Invoices · Taxes" },
  { emoji: "🛒", label: "Shopping & E-commerce", tags: "Deals · Listings · Support" },
  { emoji: "✈️", label: "Travel & Lifestyle", tags: "Trips · Restaurants · Bookings" },
  { emoji: "📊", label: "Research & Analysis", tags: "Data · Reports · Insights" },
];

export default function RoleScreen({
  userName,
  savedRole,
  onNext,
}: {
  userName: string;
  savedRole?: string;
  onNext: (role: string) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(() => {
    if (!savedRole) return new Set();
    // Parse back from "Work & Scheduling, Sales & Outreach" format
    return new Set(savedRole.split(", ").filter((s) => categories.some((c) => c.label === s)));
  });

  const toggle = (label: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  const handleContinue = () => {
    if (selected.size > 0) {
      onNext(Array.from(selected).join(", "));
    }
  };

  const handleSkip = () => {
    onNext("General assistant");
  };

  return (
    <div className="flex flex-col px-8 py-8">
      <div className="text-center mb-6">
        <h2
          className="font-serif text-[26px] font-semibold text-foreground animate-fade-up"
        >
          What do you need help with{userName ? `, ${userName}` : ""}?
        </h2>
        <p
          className="text-warm-gray text-[14px] mt-2 max-w-md mx-auto animate-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          This helps us suggest the right tasks to get you started.
          Pick as many as you like — you can always change later.
        </p>
      </div>

      {/* Category grid — 2 cols on desktop for better scanning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-4 stagger-children">
        {categories.map((cat) => {
          const isSelected = selected.has(cat.label);
          return (
            <button
              key={cat.label}
              onClick={() => toggle(cat.label)}
              className={`flex items-center gap-3.5 rounded-2xl px-5 py-4 border-2 transition-all text-left cursor-pointer ${
                isSelected
                  ? "border-accent bg-accent-light"
                  : "border-cream-dark bg-white hover:border-accent/30"
              }`}
            >
              <span className="text-[24px] shrink-0">{cat.emoji}</span>
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-[14px] text-foreground block">{cat.label}</span>
                <span className="text-[12px] text-warm-gray">{cat.tags}</span>
              </div>
              {isSelected && (
                <svg className="text-accent shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleSkip}
        className="text-warm-gray hover:text-foreground text-[13px] font-medium cursor-pointer transition-colors text-center py-2 mb-2 animate-fade-up"
        style={{ animationDelay: "400ms" }}
      >
        Not sure yet, just browsing
      </button>

      <button
        onClick={handleContinue}
        disabled={selected.size === 0}
        className="w-full btn-primary animate-fade-up"
        style={{ animationDelay: "450ms" }}
      >
        Continue
      </button>
    </div>
  );
}
