"use client";

import { useState } from "react";
import PandaAvatar from "../PandaAvatar";
import IosPaywallScreen from "./IosPaywallScreen";

/* Map role keywords to suggested tasks */
const roleTaskMap: Record<string, { emoji: string; title: string; desc: string }[]> = {
  "Work & Scheduling": [
    { emoji: "📋", title: "Summarize my meeting notes", desc: "Paste or upload notes and get a clean summary" },
    { emoji: "📅", title: "Plan my week ahead", desc: "Block time for priorities and deadlines" },
    { emoji: "📧", title: "Draft a follow-up email", desc: "Professional email from bullet points" },
  ],
  "Sales & Outreach": [
    { emoji: "🎯", title: "Write a cold outreach email", desc: "Personalized pitch for a prospect" },
    { emoji: "📊", title: "Analyze my pipeline", desc: "Spot deals at risk and next steps" },
    { emoji: "💬", title: "Prep for a sales call", desc: "Research the company and key talking points" },
  ],
  "Content & Writing": [
    { emoji: "✍️", title: "Draft a blog post outline", desc: "Structure + hooks for any topic" },
    { emoji: "📱", title: "Write social media posts", desc: "Platform-ready captions and threads" },
    { emoji: "🎬", title: "Script a short video", desc: "Hook, body, and CTA in 60 seconds" },
  ],
  "Code & Dev Tools": [
    { emoji: "🐛", title: "Debug this error", desc: "Paste a stack trace, get a fix" },
    { emoji: "⚡", title: "Build an API endpoint", desc: "Scaffold REST or GraphQL from spec" },
    { emoji: "📝", title: "Write tests for my code", desc: "Unit tests with edge cases covered" },
  ],
  "Finance & Budgets": [
    { emoji: "💰", title: "Create a monthly budget", desc: "Track income and categorize expenses" },
    { emoji: "🧾", title: "Organize my receipts", desc: "Categorize and total up expenses" },
    { emoji: "📈", title: "Forecast next quarter", desc: "Revenue projections from your data" },
  ],
  "Shopping & E-commerce": [
    { emoji: "🛒", title: "Find the best deal", desc: "Compare prices across stores" },
    { emoji: "📦", title: "Write a product listing", desc: "SEO-optimized title and description" },
    { emoji: "⭐", title: "Respond to customer reviews", desc: "Professional and on-brand replies" },
  ],
  "Travel & Lifestyle": [
    { emoji: "✈️", title: "Plan a weekend trip", desc: "Flights, hotels, and itinerary" },
    { emoji: "🍽️", title: "Find restaurants nearby", desc: "Best rated spots for tonight" },
    { emoji: "🏋️", title: "Create a workout plan", desc: "Personalized weekly routine" },
  ],
  "Research & Analysis": [
    { emoji: "🔍", title: "Research a topic", desc: "Comprehensive summary with sources" },
    { emoji: "📊", title: "Analyze this data", desc: "Trends, insights, and visualizations" },
    { emoji: "📄", title: "Summarize this document", desc: "Key points from any PDF or article" },
  ],
};

const defaultTasks = [
  { emoji: "📋", title: "Summarize meeting notes", desc: "Paste or upload notes and get a clean summary" },
  { emoji: "📧", title: "Draft an email", desc: "Professional email from bullet points" },
  { emoji: "🔍", title: "Research a topic", desc: "Comprehensive summary with sources" },
];

function getTasksForRoles(roleStr: string): { emoji: string; title: string; desc: string }[] {
  if (!roleStr) return defaultTasks;

  const roles = roleStr.split(", ");
  const allTasks: { emoji: string; title: string; desc: string }[] = [];

  for (const role of roles) {
    const tasks = roleTaskMap[role];
    if (tasks) allTasks.push(...tasks);
  }

  if (allTasks.length === 0) return defaultTasks;

  // Pick 3 tasks, one from each role if possible, else fill from first
  const picked: { emoji: string; title: string; desc: string }[] = [];
  const usedRoles = new Set<string>();

  for (const role of roles) {
    if (picked.length >= 3) break;
    const tasks = roleTaskMap[role];
    if (tasks && !usedRoles.has(role)) {
      picked.push(tasks[0]);
      usedRoles.add(role);
    }
  }

  // Fill remaining
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
  const [chatInput, setChatInput] = useState("");
  const tasks = getTasksForRoles(role);

  if (showPaywall) {
    return (
      <IosPaywallScreen
        onNext={() => setShowPaywall(false)}
        onDismiss={() => setShowPaywall(false)}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-warm-gray text-[13px]">Good morning</p>
            <h1 className="font-serif text-[26px] font-semibold text-foreground leading-tight">
              {userName || "there"} 👋
            </h1>
          </div>
          <PandaAvatar size={40} />
        </div>
      </div>

      {/* Suggested tasks */}
      <div className="px-6 mt-2">
        <p className="text-warm-gray text-[13px] font-medium mb-3">Try something</p>
        <div className="flex flex-col gap-2.5">
          {tasks.map((t) => (
            <button
              key={t.title}
              onClick={() => setShowPaywall(true)}
              className="bg-white rounded-2xl px-5 py-4 border border-cream-dark/40 text-left cursor-pointer hover:border-accent/30 transition-all active:scale-[0.98]"
            >
              <div className="flex items-start gap-3.5">
                <span className="text-[20px] mt-0.5">{t.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[15px] text-foreground leading-snug">{t.title}</p>
                  <p className="text-warm-gray text-[12px] mt-0.5">{t.desc}</p>
                </div>
                <svg className="text-warm-gray/30 flex-shrink-0 mt-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom chat input */}
      <div className="px-6 pb-8 pt-4">
        <div className="flex items-center gap-3 bg-white rounded-2xl border border-cream-dark/40 px-4 py-3">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && chatInput.trim()) setShowPaywall(true);
            }}
            placeholder="Ask Claw anything..."
            className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-warm-gray/40"
          />
          <button
            onClick={() => { if (chatInput.trim()) setShowPaywall(true); }}
            className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 cursor-pointer"
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
