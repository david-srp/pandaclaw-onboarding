"use client";

import PandaAvatar from "../PandaAvatar";

export default function SmsConfirmScreen({
  userName,
  onContinueWeb,
}: {
  userName: string;
  onContinueWeb: () => void;
}) {
  return (
    <div className="flex flex-col items-center px-8 py-10">
      <PandaAvatar size={80} animate className="mb-5 animate-fade-up" />

      <h2
        className="font-serif text-[28px] font-semibold text-foreground text-center leading-tight animate-fade-up"
        style={{ animationDelay: "100ms" }}
      >
        You&apos;re all set, {userName || "friend"}!
      </h2>

      <p
        className="text-warm-gray text-[15px] text-center max-w-sm mt-3 leading-relaxed animate-fade-up"
        style={{ animationDelay: "200ms" }}
      >
        I just sent you a text message — go check your phone and say hi!
        You can also continue right here on the web.
      </p>

      {/* SMS preview card */}
      <div
        className="mt-6 w-full max-w-sm animate-fade-up"
        style={{ animationDelay: "300ms" }}
      >
        <div className="bg-white border border-cream-dark rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-accent-light flex items-center justify-center">
              <span className="text-accent text-[12px] font-bold">PC</span>
            </div>
            <div>
              <p className="text-[13px] font-medium text-foreground">Panda Claw</p>
              <p className="text-[11px] text-warm-gray">Text Message · just now</p>
            </div>
          </div>
          <div className="bg-cream rounded-xl px-4 py-3">
            <p className="text-[13px] text-foreground leading-relaxed">
              Hey{userName ? ` ${userName}` : ""}! I&apos;m your Panda Claw assistant.
              Reply here anytime and I&apos;ll be ready to help.
              Let&apos;s start with a quick hello?
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div
        className="mt-6 w-full max-w-sm flex flex-col gap-3 animate-fade-up"
        style={{ animationDelay: "400ms" }}
      >
        <button
          onClick={onContinueWeb}
          className="btn-primary w-full"
        >
          Continue on Web
        </button>
        <p className="text-warm-gray text-[12px] text-center">
          You can switch between SMS and web anytime
        </p>
      </div>
    </div>
  );
}
