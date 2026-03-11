"use client";

import { MessageSquare, ListChecks, BookOpen, User } from "lucide-react";
import type { Tab } from "./Sidebar";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "chat", label: "Chat", icon: <MessageSquare size={22} /> },
  { id: "tasks", label: "Tasks", icon: <ListChecks size={22} /> },
  { id: "diary", label: "Diary", icon: <BookOpen size={22} /> },
  { id: "profile", label: "Profile", icon: <User size={22} /> },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-cream-dark">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-colors cursor-pointer ${
                active ? "text-accent" : "text-warm-gray"
              }`}
            >
              {tab.icon}
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
