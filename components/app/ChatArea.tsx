"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  Send,
  Paperclip,
  ChevronDown,
  FolderOpen,
  Sunrise,
  CalendarDays,
  MessageCircle,
} from "lucide-react";

interface ChatAreaProps {
  onToggleFiles: () => void;
  filesOpen: boolean;
  chosenTask: string;
}

interface Message {
  id: string;
  type: "user" | "ai" | "tasks";
  content?: string;
}

const historyItems = [
  { id: "1", title: "Morning briefing setup", date: "Today" },
  { id: "2", title: "Weekly summary review", date: "Yesterday" },
  { id: "3", title: "Research on AI trends", date: "Mar 8" },
  { id: "4", title: "Goal planning session", date: "Mar 7" },
];

const STORAGE_KEY = "pandaclaw-onboarding";

function getTasksForRole(role: string) {
  const lower = role.toLowerCase();
  if (lower.includes("work") || lower.includes("assistant") || lower.includes("办公")) {
    return [
      { icon: Sunrise, label: "Set up your morning briefing", desc: "Weather, calendar & headlines at 7am" },
      { icon: CalendarDays, label: "Review today's schedule", desc: "See what's on your calendar" },
      { icon: MessageCircle, label: "Draft an email for me", desc: "Quick professional writing" },
    ];
  }
  if (lower.includes("market") || lower.includes("growth") || lower.includes("运营")) {
    return [
      { icon: CalendarDays, label: "Analyze campaign performance", desc: "Review key metrics & insights" },
      { icon: Sunrise, label: "Draft social media content", desc: "Create posts for your channels" },
      { icon: MessageCircle, label: "Brainstorm growth ideas", desc: "Explore new strategies together" },
    ];
  }
  if (lower.includes("invest") || lower.includes("finance") || lower.includes("理财")) {
    return [
      { icon: Sunrise, label: "Morning market briefing", desc: "Key moves & headlines overnight" },
      { icon: CalendarDays, label: "Review my portfolio", desc: "Check allocations & performance" },
      { icon: MessageCircle, label: "Explain a financial concept", desc: "Learn something new" },
    ];
  }
  if (lower.includes("learn") || lower.includes("companion") || lower.includes("学习")) {
    return [
      { icon: Sunrise, label: "Start a learning session", desc: "Pick a topic and dive in" },
      { icon: CalendarDays, label: "Set a learning goal", desc: "Track your progress weekly" },
      { icon: MessageCircle, label: "Quiz me on something", desc: "Test what you've learned" },
    ];
  }
  if (lower.includes("project") || lower.includes("管理")) {
    return [
      { icon: CalendarDays, label: "Plan a new project", desc: "Break it into milestones" },
      { icon: Sunrise, label: "Daily standup summary", desc: "What's done, what's next" },
      { icon: MessageCircle, label: "Prioritize my tasks", desc: "Focus on what matters most" },
    ];
  }
  if (lower.includes("content") || lower.includes("创作")) {
    return [
      { icon: Sunrise, label: "Brainstorm content ideas", desc: "Get inspired for your next piece" },
      { icon: CalendarDays, label: "Plan a content calendar", desc: "Stay consistent & organized" },
      { icon: MessageCircle, label: "Help me write something", desc: "Co-create with me" },
    ];
  }
  // default
  return [
    { icon: MessageCircle, label: "Just have a conversation", desc: "Chat about anything" },
    { icon: Sunrise, label: "Set up a morning briefing", desc: "Start your day informed" },
    { icon: CalendarDays, label: "Help me plan something", desc: "Organize an idea or project" },
  ];
}

export default function ChatArea({
  onToggleFiles,
  filesOpen,
}: ChatAreaProps) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [userName, setUserName] = useState("");
  const [role, setRole] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        const name = data.userName || "friend";
        const userRole = data.role || "";
        setUserName(name);
        setRole(userRole);

        setMessages([
          {
            id: "greeting",
            type: "ai",
            content: `Hey ${name}! 👋 I'm your Claw — ready to help whenever you need me. Based on what you told me, here are a few things we can start with:`,
          },
          {
            id: "tasks",
            type: "tasks",
          },
        ]);
      }
    } catch {}
  }, []);

  const tasks = getTasksForRole(role);

  const handleTaskClick = (label: string) => {
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, type: "user", content: label },
      {
        id: `ai-${Date.now()}`,
        type: "ai",
        content: `Great choice! Let me help you with "${label}". Let's get started — what would you like to do first?`,
      },
    ]);
  };

  return (
    <div className="flex-1 flex flex-col h-full min-w-0">
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 h-12 border-b border-cream-dark shrink-0">
        {!filesOpen && (
          <button
            onClick={onToggleFiles}
            className="hidden md:flex items-center gap-1.5 text-warm-gray hover:text-foreground text-[13px] font-medium transition-colors cursor-pointer"
          >
            <FolderOpen size={16} />
            Files
          </button>
        )}
        <div className="flex-1" />
        <button
          onClick={() => setHistoryOpen(!historyOpen)}
          className={`flex items-center gap-1.5 text-[13px] font-medium transition-colors cursor-pointer ${
            historyOpen ? "text-accent" : "text-warm-gray hover:text-foreground"
          }`}
        >
          <History size={16} />
          History
          <ChevronDown
            size={14}
            className={`transition-transform ${historyOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* History panel */}
      <AnimatePresence>
        {historyOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-cream-dark overflow-hidden bg-cream/50"
          >
            <div className="px-4 py-3 space-y-1">
              {historyItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-cream-dark/50 cursor-pointer transition-colors"
                >
                  <span className="text-[13px] text-foreground font-medium">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-warm-gray">{item.date}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-5">
        {messages.map((msg) => {
          if (msg.type === "user") {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="bg-accent text-white rounded-2xl rounded-br-md px-4 py-3 max-w-[75%]">
                  <p className="text-[14px] leading-relaxed">{msg.content}</p>
                </div>
              </div>
            );
          }
          if (msg.type === "ai") {
            return (
              <div key={msg.id} className="flex gap-2.5 max-w-[85%]">
                <div className="w-7 h-7 rounded-full bg-accent-light flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-accent text-[11px] font-bold">P</span>
                </div>
                <div className="bg-white border border-cream-dark rounded-2xl rounded-bl-md px-4 py-3">
                  <p className="text-[14px] leading-relaxed text-foreground">
                    {msg.content}
                  </p>
                </div>
              </div>
            );
          }
          if (msg.type === "tasks") {
            return (
              <div key={msg.id} className="flex gap-2.5 max-w-[85%]">
                <div className="w-7 h-7 shrink-0" />
                <div className="flex flex-col gap-2 w-full">
                  {tasks.map((task, i) => {
                    const Icon = task.icon;
                    return (
                      <button
                        key={i}
                        onClick={() => handleTaskClick(task.label)}
                        className="flex items-center gap-3 bg-white border border-cream-dark rounded-2xl px-4 py-3.5 hover:border-accent/30 hover:bg-accent-light/30 transition-all cursor-pointer text-left group"
                      >
                        <div className="w-9 h-9 rounded-xl bg-accent-light flex items-center justify-center shrink-0 group-hover:bg-accent/15 transition-colors">
                          <Icon size={18} className="text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[14px] font-medium text-foreground block">
                            {task.label}
                          </span>
                          <span className="text-[12px] text-warm-gray">
                            {task.desc}
                          </span>
                        </div>
                        <svg className="text-warm-gray-light group-hover:text-accent transition-colors shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Input bar */}
      <div className="shrink-0 border-t border-cream-dark bg-white px-4 py-3 mb-16 md:mb-0">
        <div className="flex items-center gap-2 max-w-3xl mx-auto">
          <button className="text-warm-gray hover:text-foreground transition-colors cursor-pointer p-1.5">
            <Paperclip size={18} />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Message PandaClaw..."
            className="flex-1 bg-cream/60 border border-cream-dark rounded-xl px-4 py-2.5 text-[14px] placeholder:text-warm-gray-light placeholder:not-italic focus:border-accent transition-colors"
          />
          <button className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-white hover:bg-accent-hover transition-colors cursor-pointer">
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
