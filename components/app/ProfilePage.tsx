"use client";

import {
  Settings,
  Sparkles,
  Activity,
  CreditCard,
  LogOut,
  ChevronRight,
} from "lucide-react";
import PandaAvatar from "../PandaAvatar";

const menuItems = [
  { icon: <Settings size={18} />, label: "Settings", desc: "App preferences" },
  {
    icon: <Sparkles size={18} />,
    label: "Skills",
    desc: "Manage Claw abilities",
  },
  {
    icon: <Activity size={18} />,
    label: "Diagnostics",
    desc: "Performance & logs",
  },
  {
    icon: <CreditCard size={18} />,
    label: "Subscription",
    desc: "Pro plan — Active",
    accent: true,
  },
];

export default function ProfilePage() {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 mb-16 md:mb-0">
      <div className="max-w-md mx-auto">
        {/* Avatar section */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-full bg-accent-light flex items-center justify-center mb-4">
            <PandaAvatar size={52} />
          </div>
          <h1 className="font-serif text-[28px] font-medium">Your Profile</h1>
          <p className="text-warm-gray text-[14px] mt-1">
            Manage your PandaClaw account
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-[12px] text-warm-gray font-medium">
              Logged in
            </span>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-white border border-cream-dark rounded-2xl overflow-hidden divide-y divide-cream-dark">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-3.5 w-full px-5 py-4 hover:bg-cream/50 transition-colors cursor-pointer text-left"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  item.accent
                    ? "bg-accent-light text-accent"
                    : "bg-cream-dark/50 text-warm-gray"
                }`}
              >
                {item.icon}
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-medium text-foreground">
                  {item.label}
                </p>
                <p className="text-[12px] text-warm-gray">{item.desc}</p>
              </div>
              <ChevronRight size={16} className="text-warm-gray-light" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button className="flex items-center justify-center gap-2 w-full mt-6 py-3 text-warm-gray hover:text-red-500 transition-colors cursor-pointer">
          <LogOut size={16} />
          <span className="text-[14px] font-medium">Log out</span>
        </button>
      </div>
    </div>
  );
}
