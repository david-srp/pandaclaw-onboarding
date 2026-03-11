"use client";

import PandaAvatar from "../PandaAvatar";
import SpeechBubble from "../SpeechBubble";

export default function EndingScreen({
  userName,
  channel,
  onStart,
}: {
  userName: string;
  channel: string;
  onStart: () => void;
}) {
  const isSms = channel === "sms";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <PandaAvatar size={96} animate className="mb-6 animate-fade-up" />

      <h1 className="text-2xl font-semibold text-foreground mb-3 animate-fade-up" style={{ animationDelay: "200ms" }}>
        You&apos;re all set, {userName || "friend"}!
      </h1>

      {isSms ? (
        <>
          <div className="animate-fade-up" style={{ animationDelay: "400ms" }}>
            <SpeechBubble>
              I just sent you a text — go check your messages and say hi! 👋
            </SpeechBubble>
          </div>

          <p className="mt-6 text-warm-gray text-[13px] text-center max-w-xs animate-fade-up" style={{ animationDelay: "500ms" }}>
            You can also explore from the web anytime.
          </p>

          <button
            onClick={onStart}
            className="mt-6 text-accent hover:underline text-[14px] font-medium cursor-pointer animate-fade-up"
            style={{ animationDelay: "600ms" }}
          >
            Continue on web instead &rarr;
          </button>
        </>
      ) : (
        <>
          <div className="animate-fade-up" style={{ animationDelay: "400ms" }}>
            <SpeechBubble>
              Your web dashboard is ready. Let&apos;s start exploring!
            </SpeechBubble>
          </div>

          <button
            onClick={onStart}
            className="mt-12 btn-primary px-10 animate-fade-up"
            style={{ animationDelay: "600ms" }}
          >
            Start exploring
          </button>
        </>
      )}
    </div>
  );
}
