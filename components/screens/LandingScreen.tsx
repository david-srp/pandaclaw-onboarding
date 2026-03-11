"use client";

import PandaAvatar from "../PandaAvatar";

export default function LandingScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      {/* Decorative top mark */}
      <div
        className="animate-fade-up mb-2 text-warm-gray text-[13px] tracking-[0.2em] uppercase font-medium"
        style={{ animationDelay: "0ms" }}
      >
        Introducing
      </div>

      <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
        <PandaAvatar size={140} animate />
      </div>

      <div className="animate-fade-up mt-8 mb-6" style={{ animationDelay: "250ms" }}>
        <h1 className="font-serif text-[44px] md:text-[56px] leading-[1.05] font-medium tracking-tight max-w-lg">
          Your AI companion,
          <br />
          <span className="italic text-accent">ready from day one</span>
        </h1>
      </div>

      <p
        className="animate-fade-up text-warm-gray text-[16px] leading-relaxed mb-12 max-w-[340px]"
        style={{ animationDelay: "400ms" }}
      >
        A personal Claw that listens, learns, and acts on your behalf —
        open&#8209;box&nbsp;ready.
      </p>

      <button
        onClick={onNext}
        className="animate-fade-up btn-primary text-[16px] px-10 py-4"
        style={{ animationDelay: "550ms" }}
      >
        Begin setup
      </button>

      <div
        className="animate-fade-up flex items-center gap-6 mt-16 text-warm-gray-light"
        style={{ animationDelay: "700ms" }}
      >
        {["Voice first", "Proactive", "Personalized"].map((label, i) => (
          <span key={label} className="flex items-center gap-6">
            {i > 0 && <span className="w-1 h-1 rounded-full bg-warm-gray-light" />}
            <span className="text-[13px] tracking-wide">{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
