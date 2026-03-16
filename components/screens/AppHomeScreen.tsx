"use client";

import { useState, useEffect } from "react";
import PandaAvatar from "../PandaAvatar";
import IosPaywallScreen from "./IosPaywallScreen";

/* Map role keywords to suggested tasks */
const roleTaskMap: Record<string, { icon: string; title: string; desc: string }[]> = {
  "Work & Scheduling": [
    { icon: "⏰", title: "Set up your morning briefing", desc: "Weather, calendar & headlines at 7am" },
    { icon: "📅", title: "Review today's schedule", desc: "See what's on your calendar" },
    { icon: "📧", title: "Draft an email for me", desc: "Quick professional writing" },
  ],
  "Sales & Outreach": [
    { icon: "🎯", title: "Write a cold outreach email", desc: "Personalized pitch for a prospect" },
    { icon: "📊", title: "Analyze my pipeline", desc: "Spot deals at risk and next steps" },
    { icon: "💬", title: "Prep for a sales call", desc: "Research and talking points" },
  ],
  "Content & Writing": [
    { icon: "✍️", title: "Draft a blog post outline", desc: "Structure + hooks for any topic" },
    { icon: "📱", title: "Write social media posts", desc: "Platform-ready captions and threads" },
    { icon: "🎬", title: "Script a short video", desc: "Hook, body, and CTA in 60 seconds" },
  ],
  "Code & Dev Tools": [
    { icon: "🐛", title: "Debug this error", desc: "Paste a stack trace, get a fix" },
    { icon: "⚡", title: "Build an API endpoint", desc: "Scaffold REST or GraphQL from spec" },
    { icon: "📝", title: "Write tests for my code", desc: "Unit tests with edge cases covered" },
  ],
  "Finance & Budgets": [
    { icon: "💰", title: "Create a monthly budget", desc: "Track income and categorize expenses" },
    { icon: "🧾", title: "Organize my receipts", desc: "Categorize and total up expenses" },
    { icon: "📈", title: "Forecast next quarter", desc: "Revenue projections from your data" },
  ],
  "Shopping & E-commerce": [
    { icon: "🛒", title: "Find the best deal", desc: "Compare prices across stores" },
    { icon: "📦", title: "Write a product listing", desc: "SEO-optimized title and description" },
    { icon: "⭐", title: "Respond to customer reviews", desc: "Professional and on-brand replies" },
  ],
  "Travel & Lifestyle": [
    { icon: "✈️", title: "Plan a weekend trip", desc: "Flights, hotels, and itinerary" },
    { icon: "🍽️", title: "Find restaurants nearby", desc: "Best rated spots for tonight" },
    { icon: "🏋️", title: "Create a workout plan", desc: "Personalized weekly routine" },
  ],
  "Research & Analysis": [
    { icon: "🔍", title: "Research a topic", desc: "Comprehensive summary with sources" },
    { icon: "📊", title: "Analyze this data", desc: "Trends, insights, and visualizations" },
    { icon: "📄", title: "Summarize this document", desc: "Key points from any PDF or article" },
  ],
};

const defaultTasks = [
  { icon: "⏰", title: "Set up your morning briefing", desc: "Weather, calendar & headlines at 7am" },
  { icon: "📅", title: "Review today's schedule", desc: "See what's on your calendar" },
  { icon: "💬", title: "Draft an email for me", desc: "Quick professional writing" },
];

function getTasksForRoles(roleStr: string): { icon: string; title: string; desc: string }[] {
  if (!roleStr) return defaultTasks;

  const roles = roleStr.split(", ");
  const allTasks: { icon: string; title: string; desc: string }[] = [];

  for (const role of roles) {
    const tasks = roleTaskMap[role];
    if (tasks) allTasks.push(...tasks);
  }

  if (allTasks.length === 0) return defaultTasks;

  const picked: { icon: string; title: string; desc: string }[] = [];
  const usedRoles = new Set<string>();

  for (const role of roles) {
    if (picked.length >= 3) break;
    const tasks = roleTaskMap[role];
    if (tasks && !usedRoles.has(role)) {
      picked.push(tasks[0]);
      usedRoles.add(role);
    }
  }

  for (const t of allTasks) {
    if (picked.length >= 3) break;
    if (!picked.includes(t)) picked.push(t);
  }

  return picked.slice(0, 3);
}

export default function AppHomeScreen({
  userName,
  role,
}: {
  userName: string;
  role: string;
}) {
  const [showPaywall, setShowPaywall] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [showCards, setShowCards] = useState([false, false, false]);
  const tasks = getTasksForRoles(role);

  useEffect(() => {
    const t0 = setTimeout(() => setShowBubble(true), 400);
    const t1 = setTimeout(() => setShowCards((p) => [true, p[1], p[2]]), 900);
    const t2 = setTimeout(() => setShowCards((p) => [p[0], true, p[2]]), 1150);
    const t3 = setTimeout(() => setShowCards((p) => [p[0], p[1], true]), 1400);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (showPaywall) {
    return (
      <IosPaywallScreen
        onNext={() => setShowPaywall(false)}
        onDismiss={() => setShowPaywall(false)}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 pt-14 pb-8">
      {/* Chat bubble from Panda */}
      <div className="flex items-start gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#F3F4F6] flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-[14px] font-semibold text-foreground">P</span>
        </div>
        <div
          className={`flex-1 bg-[#F3F4F6] rounded-2xl rounded-tl-md px-5 py-4 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            showBubble ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <p className="text-[15px] text-foreground leading-relaxed">
            Hey {userName || "there"}! 👋 I&apos;m your Claw — ready to help whenever you need me.
            Based on what you told me, here are a few things we can start with:
          </p>
        </div>
      </div>

      {/* Task suggestion cards */}
      <div className="flex flex-col gap-3 ml-[52px]">
        {tasks.map((t, i) => (
          <button
            key={t.title}
            onClick={() => setShowPaywall(true)}
            className={`bg-white rounded-2xl px-5 py-4 border border-[#E8E8E8] text-left cursor-pointer hover:border-gray-300 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] ${
              showCards[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#F3F4F6] flex items-center justify-center flex-shrink-0">
                <span className="text-[18px]">{t.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[15px] text-foreground leading-snug">{t.title}</p>
                <p className="text-warm-gray text-[12px] mt-0.5">{t.desc}</p>
              </div>
              <svg className="text-warm-gray/30 flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom chat input */}
      <div className="pt-4">
        <div className="flex items-center gap-3 bg-white rounded-2xl border border-[#E8E8E8] px-4 py-3">
          <input
            type="text"
            placeholder="Ask Claw anything..."
            className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-warm-gray/40"
            onKeyDown={(e) => {
              if (e.key === "Enter") setShowPaywall(true);
            }}
          />
          <button
            onClick={() => setShowPaywall(true)}
            className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center flex-shrink-0 cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
