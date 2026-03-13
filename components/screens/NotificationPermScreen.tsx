"use client";

import PandaAvatar from "../PandaAvatar";
import SpeechBubble from "../SpeechBubble";

export default function NotificationPermScreen({
  userName,
  onNext,
}: {
  userName?: string;
  onNext: () => void;
}) {
  const clawName = userName ? `${userName}'s Panda` : "Claw";

  return (
    <div className="flex flex-col justify-between min-h-screen px-6 pt-16 pb-8">
      <div />

      <div className="flex flex-col items-center">
        {/* Avatar + bubble side by side */}
        <div className="flex items-start gap-3 w-full max-w-sm">
          <PandaAvatar size={48} className="flex-shrink-0 animate-fade-up" />
          <div className="flex-1 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <SpeechBubble>Turn on notifications so I can let you know when tasks are done!</SpeechBubble>
          </div>
        </div>

        {/* Mock iOS notification banner - styled as floating cards, not interactive */}
        <div className="mt-8 w-full max-w-sm">
          <div
            className="animate-fade-up rounded-2xl bg-white/90 backdrop-blur-md px-4 py-3 shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
            style={{ animationDelay: "300ms" }}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-cream flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <PandaAvatar size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[12px] text-foreground">{clawName}</span>
                  <span className="text-warm-gray/60 text-[10px]">now</span>
                </div>
                <p className="text-[12px] text-foreground/80 mt-0.5 leading-snug">
                  Done! I&apos;ve drafted your weekly report and scheduled the team sync for Thursday 2pm. ✅
                </p>
              </div>
            </div>
          </div>

          <div
            className="animate-fade-up rounded-2xl bg-white/90 backdrop-blur-md px-4 py-3 shadow-[0_2px_20px_rgba(0,0,0,0.08)] mt-2.5"
            style={{ animationDelay: "450ms" }}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-cream flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <PandaAvatar size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[12px] text-foreground">{clawName}</span>
                  <span className="text-warm-gray/60 text-[10px]">2m ago</span>
                </div>
                <p className="text-[12px] text-foreground/80 mt-0.5 leading-snug">
                  Quick question — should I prioritize the budget review or the client proposal first? 🤔
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA - pinned */}
      <div className="w-full max-w-sm mx-auto pt-6">
        <button
          onClick={onNext}
          className="w-full btn-primary animate-fade-up"
          style={{ animationDelay: "600ms" }}
        >
          Turn on notifications
        </button>

        <button
          onClick={onNext}
          className="mt-3 w-full text-warm-gray hover:text-foreground text-[13px] font-medium cursor-pointer transition-colors text-center animate-fade-up"
          style={{ animationDelay: "650ms" }}
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
