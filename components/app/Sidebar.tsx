"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  ListChecks,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PandaAvatar from "../PandaAvatar";

export type Tab = "chat" | "tasks" | "diary" | "profile";

interface SidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "chat", label: "Chat", icon: <MessageSquare size={20} /> },
  { id: "tasks", label: "Tasks", icon: <ListChecks size={20} /> },
  { id: "diary", label: "Diary", icon: <BookOpen size={20} /> },
];

export default function Sidebar({
  activeTab,
  onTabChange,
  collapsed,
  onToggle,
}: SidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="hidden md:flex flex-col h-screen bg-white border-r border-cream-dark shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-cream-dark">
        <PandaAvatar size={32} />
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-serif text-[18px] font-medium whitespace-nowrap"
          >
            PandaClaw
          </motion.span>
        )}
      </div>

      {/* Tabs */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-3 w-full rounded-xl px-3 py-2.5 transition-all cursor-pointer ${
                active
                  ? "bg-accent-light text-accent"
                  : "text-warm-gray hover:bg-cream-dark/50 hover:text-foreground"
              }`}
            >
              {tab.icon}
              {!collapsed && (
                <span className="text-[14px] font-medium whitespace-nowrap">
                  {tab.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Profile + collapse */}
      <div className="border-t border-cream-dark p-2 space-y-1">
        <button
          onClick={() => onTabChange("profile")}
          className={`flex items-center gap-3 w-full rounded-xl px-3 py-2.5 transition-all cursor-pointer ${
            activeTab === "profile"
              ? "bg-accent-light text-accent"
              : "text-warm-gray hover:bg-cream-dark/50 hover:text-foreground"
          }`}
        >
          <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
            <span className="text-white text-[10px] font-semibold">U</span>
          </div>
          {!collapsed && (
            <span className="text-[14px] font-medium whitespace-nowrap">
              Profile
            </span>
          )}
        </button>

        <button
          onClick={onToggle}
          className="flex items-center justify-center w-full rounded-xl px-3 py-2 text-warm-gray hover:text-foreground hover:bg-cream-dark/50 transition-all cursor-pointer"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!collapsed && (
            <span className="text-[13px] ml-2 whitespace-nowrap">Collapse</span>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
