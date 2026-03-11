"use client";

import PandaAvatar from "../PandaAvatar";
import SpeechBubble from "../SpeechBubble";

export default function AppDownloadScreen({
  onBack,
}: {
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <PandaAvatar size={88} className="mb-5 animate-fade-up" />
      <SpeechBubble>Get PandaClaw on your phone!</SpeechBubble>

      <div className="mt-10 w-full max-w-sm animate-fade-up" style={{ animationDelay: "300ms" }}>
        <p className="text-warm-gray text-center text-[15px] leading-relaxed mb-8">
          Download PandaClaw to stay connected wherever you go. Your Claw will always be in your pocket.
        </p>

        <div className="flex flex-col gap-3">
          {/* App Store Button */}
          <a
            href="#"
            className="flex items-center gap-4 rounded-2xl px-6 py-5 border-2 border-cream-dark bg-white hover:border-accent/30 transition-all cursor-pointer"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
              <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.99 2.97 12.5 4.7 9.56C5.55 8.1 7.13 7.2 8.82 7.17C10.1 7.15 11.32 8.04 12.11 8.04C12.89 8.04 14.37 6.96 15.92 7.13C16.57 7.16 18.39 7.39 19.56 9.08C19.47 9.14 17.29 10.4 17.31 13.02C17.34 16.14 20.05 17.16 20.08 17.17C20.05 17.24 19.65 18.6 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
            </svg>
            <div>
              <span className="text-[11px] text-warm-gray block">Download on the</span>
              <span className="font-semibold text-[16px] text-foreground">App Store</span>
            </div>
          </a>

          {/* Google Play Button */}
          <a
            href="#"
            className="flex items-center gap-4 rounded-2xl px-6 py-5 border-2 border-cream-dark bg-white hover:border-accent/30 transition-all cursor-pointer"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-foreground">
              <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.61 3 21.09 3 20.5ZM16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12ZM20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.5 12.92 20.16 13.19L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81ZM6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
            </svg>
            <div>
              <span className="text-[11px] text-warm-gray block">Get it on</span>
              <span className="font-semibold text-[16px] text-foreground">Google Play</span>
            </div>
          </a>
        </div>

        <button
          onClick={onBack}
          className="mt-8 w-full btn-secondary"
        >
          &larr; Back to channels
        </button>
      </div>
    </div>
  );
}
