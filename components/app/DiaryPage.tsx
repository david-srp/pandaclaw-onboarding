"use client";

import { BookOpen } from "lucide-react";

const entries = [
  {
    date: "March 10, 2026",
    title: "Getting started with PandaClaw",
    body: "Set up my morning briefing and explored the dashboard features. Feeling optimistic about integrating this into my daily routine.",
    mood: "Excited",
  },
  {
    date: "March 9, 2026",
    title: "Completed onboarding",
    body: "Went through the personalization flow — chose my Claw's traits and voice. The whole experience felt really considered and warm.",
    mood: "Happy",
  },
  {
    date: "March 8, 2026",
    title: "Research day",
    body: "Asked PandaClaw to help me research productivity tools. Got a great summary report with actionable recommendations.",
    mood: "Productive",
  },
  {
    date: "March 7, 2026",
    title: "Goal planning session",
    body: "Had a long conversation about Q2 goals. PandaClaw helped me break them down into smaller, manageable milestones.",
    mood: "Focused",
  },
];

export default function DiaryPage() {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 mb-16 md:mb-0">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-[32px] font-medium mb-1">Diary</h1>
        <p className="text-warm-gray text-[14px] mb-8">
          Your journey with PandaClaw
        </p>

        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.date}
              className="bg-white border border-cream-dark rounded-2xl p-5 hover:border-accent/30 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={14} className="text-accent" />
                <span className="text-[12px] text-warm-gray font-medium">
                  {entry.date}
                </span>
                <span className="ml-auto text-[11px] px-2 py-0.5 rounded-full bg-accent-light text-accent font-medium">
                  {entry.mood}
                </span>
              </div>
              <h3 className="font-serif text-[20px] font-medium mb-2">
                {entry.title}
              </h3>
              <p className="text-[14px] text-warm-gray leading-relaxed">
                {entry.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
