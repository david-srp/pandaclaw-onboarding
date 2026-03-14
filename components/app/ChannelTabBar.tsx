"use client";

import { Search, Activity, Plus } from "lucide-react";

export default function ChannelTabBar() {
  return (
    <div className="flex items-center gap-1 px-4 h-12 border-b border-cream-dark shrink-0">
      {/* Channel tabs */}
      <div className="flex items-center gap-1">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-foreground border-b-2 border-accent cursor-pointer">
          <span className="w-3.5 h-3.5 rounded-sm border border-cream-dark flex items-center justify-center text-[8px]">
            &#9632;
          </span>
          WebApp / iOS
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-warm-gray hover:text-foreground transition-colors cursor-pointer border-b-2 border-transparent">
          <span className="w-3.5 h-3.5 rounded-full border border-cream-dark" />
          SMS
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-warm-gray-light hover:text-warm-gray transition-colors cursor-pointer">
          <Plus size={14} />
          Add channel
        </button>
      </div>

      <div className="flex-1" />

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button className="p-2 text-warm-gray hover:text-foreground transition-colors cursor-pointer rounded-lg hover:bg-cream-dark/40">
          <Search size={16} />
        </button>
        <button className="p-2 text-warm-gray hover:text-foreground transition-colors cursor-pointer rounded-lg hover:bg-cream-dark/40 flex items-center gap-1.5">
          <Activity size={16} />
          <span className="text-[12px] font-medium hidden lg:inline">Activity</span>
        </button>
      </div>
    </div>
  );
}
