"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  Send,
  Paperclip,
  Download,
  ExternalLink,
  Play,
  FileText,
  Globe,
  Film,
  ChevronDown,
  FolderOpen,
} from "lucide-react";

interface ChatAreaProps {
  onToggleFiles: () => void;
  filesOpen: boolean;
  chosenTask: string;
}

interface Message {
  id: string;
  type: "user" | "ai" | "report" | "webpage" | "video";
  content?: string;
  meta?: {
    title?: string;
    summary?: string;
    url?: string;
    duration?: string;
  };
}

const historyItems = [
  { id: "1", title: "Morning briefing setup", date: "Today" },
  { id: "2", title: "Weekly summary review", date: "Yesterday" },
  { id: "3", title: "Research on AI trends", date: "Mar 8" },
  { id: "4", title: "Goal planning session", date: "Mar 7" },
];

const mockMessages: Message[] = [
  {
    id: "ctx",
    type: "ai",
    content: "CONTEXT_CARD",
  },
  {
    id: "1",
    type: "ai",
    content:
      "I'd love to help you with that! Let me start by understanding your morning routine. What time do you usually wake up, and what information matters most to you first thing?",
  },
  {
    id: "2",
    type: "user",
    content:
      "I wake up around 7am. I need weather, my calendar, and top 3 news headlines — nothing too heavy.",
  },
  {
    id: "3",
    type: "ai",
    content:
      "Perfect — light and focused. I've put together a briefing format for you. Here's a sample report based on today's data:",
  },
  {
    id: "4",
    type: "report",
    meta: {
      title: "Morning Briefing — Mar 10",
      summary:
        "Weather: 62°F partly cloudy. 3 meetings today. Headlines: AI regulation update, market rally continues, new space mission launch.",
    },
  },
  {
    id: "5",
    type: "user",
    content: "This is great! Can you also make a simple dashboard page I can bookmark?",
  },
  {
    id: "6",
    type: "ai",
    content:
      "Absolutely! I've created a clean dashboard page for you. It auto-refreshes each morning at 6:45am so it's ready when you are.",
  },
  {
    id: "7",
    type: "webpage",
    meta: {
      title: "My Morning Dashboard",
      url: "app.pandaclaw.com/dashboard/morning",
    },
  },
  {
    id: "8",
    type: "user",
    content: "One more thing — could you record a quick video walkthrough of how to customize it?",
  },
  {
    id: "9",
    type: "ai",
    content: "Done! Here's a short walkthrough showing how to rearrange widgets and add new data sources.",
  },
  {
    id: "10",
    type: "video",
    meta: {
      title: "Dashboard Customization Guide",
      duration: "2:34",
    },
  },
];

function ContextCard({ task }: { task: string }) {
  return (
    <div className="bg-accent-light border border-accent/20 rounded-2xl p-4 mb-1">
      <p className="text-[11px] font-semibold text-accent uppercase tracking-wider mb-1">
        Current Task
      </p>
      <p className="text-[14px] text-foreground font-medium">{task}</p>
    </div>
  );
}

function ReportCard({ meta }: { meta: Message["meta"] }) {
  return (
    <div className="bg-white border border-cream-dark rounded-2xl overflow-hidden max-w-[360px]">
      <div className="bg-gradient-to-br from-accent/5 to-accent/10 px-4 py-3 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-accent/15 flex items-center justify-center">
          <FileText size={18} className="text-accent" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[14px] font-semibold text-foreground truncate">
            {meta?.title}
          </p>
          <p className="text-[11px] text-warm-gray">Report</p>
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="text-[13px] text-warm-gray leading-relaxed">
          {meta?.summary}
        </p>
      </div>
      <div className="px-4 pb-3">
        <button className="flex items-center gap-1.5 text-accent text-[13px] font-medium hover:underline cursor-pointer">
          <Download size={14} />
          Download report
        </button>
      </div>
    </div>
  );
}

function WebpageCard({ meta }: { meta: Message["meta"] }) {
  return (
    <div className="bg-white border border-cream-dark rounded-2xl overflow-hidden max-w-[360px]">
      <div className="h-32 bg-gradient-to-br from-cream-dark to-cream flex items-center justify-center">
        <Globe size={32} className="text-warm-gray-light" />
      </div>
      <div className="px-4 py-3">
        <p className="text-[14px] font-semibold text-foreground">
          {meta?.title}
        </p>
        <p className="text-[12px] text-warm-gray mt-0.5">{meta?.url}</p>
      </div>
      <div className="px-4 pb-3">
        <button className="flex items-center gap-1.5 text-accent text-[13px] font-medium hover:underline cursor-pointer">
          <ExternalLink size={14} />
          Open page
        </button>
      </div>
    </div>
  );
}

function VideoCard({ meta }: { meta: Message["meta"] }) {
  return (
    <div className="bg-white border border-cream-dark rounded-2xl overflow-hidden max-w-[360px]">
      <div className="h-40 bg-gradient-to-br from-[#1a1a17] to-[#2a2a24] flex items-center justify-center relative">
        <button className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-lg hover:scale-105 transition-transform cursor-pointer">
          <Play size={22} className="text-white ml-0.5" fill="white" />
        </button>
        <span className="absolute bottom-2 right-3 text-[11px] text-white/70 font-medium bg-black/40 px-1.5 py-0.5 rounded">
          {meta?.duration}
        </span>
      </div>
      <div className="px-4 py-3 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-accent-light flex items-center justify-center">
          <Film size={16} className="text-accent" />
        </div>
        <div>
          <p className="text-[14px] font-semibold text-foreground">
            {meta?.title}
          </p>
          <p className="text-[12px] text-warm-gray">{meta?.duration}</p>
        </div>
      </div>
    </div>
  );
}

export default function ChatArea({
  onToggleFiles,
  filesOpen,
  chosenTask,
}: ChatAreaProps) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

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
        {mockMessages.map((msg) => {
          if (msg.content === "CONTEXT_CARD") {
            return <ContextCard key={msg.id} task={chosenTask} />;
          }
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
          if (msg.type === "report") {
            return (
              <div key={msg.id} className="flex gap-2.5 max-w-[85%]">
                <div className="w-7 h-7 shrink-0" />
                <ReportCard meta={msg.meta} />
              </div>
            );
          }
          if (msg.type === "webpage") {
            return (
              <div key={msg.id} className="flex gap-2.5 max-w-[85%]">
                <div className="w-7 h-7 shrink-0" />
                <WebpageCard meta={msg.meta} />
              </div>
            );
          }
          if (msg.type === "video") {
            return (
              <div key={msg.id} className="flex gap-2.5 max-w-[85%]">
                <div className="w-7 h-7 shrink-0" />
                <VideoCard meta={msg.meta} />
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
