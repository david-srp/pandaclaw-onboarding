"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import PandaAvatar from "@/components/PandaAvatar";

/* ── Auth icon SVGs (from RegisterScreen) ── */
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);
const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default function MarketingPage() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    // Simulate login → navigate to app
    try {
      const saved = localStorage.getItem("pandaclaw-web-onboarding");
      const data = saved ? JSON.parse(saved) : {};
      localStorage.setItem(
        "pandaclaw-web-onboarding",
        JSON.stringify({ ...data, isLoggedIn: true })
      );
    } catch {}
    router.push("/app");
  };

  return (
    <div className="min-h-screen relative">
      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2.5">
          <PandaAvatar size={32} />
          <span className="font-serif text-[20px] font-semibold tracking-tight">
            PandaClaw
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowLogin(true)}
            className="text-warm-gray hover:text-foreground text-[14px] font-medium transition-colors cursor-pointer"
          >
            Log in
          </button>
          <button
            onClick={() => setShowLogin(true)}
            className="btn-primary text-[14px] px-6 py-2.5"
          >
            Try Now
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="flex flex-col items-center text-center px-6 pt-16 pb-24 max-w-4xl mx-auto">
        <div className="animate-fade-up">
          <PandaAvatar size={120} animate />
        </div>

        <h1
          className="text-[48px] md:text-[64px] leading-[1.05] font-semibold tracking-tight mt-8 mb-6 animate-fade-up"
          style={{ animationDelay: "150ms" }}
        >
          Your AI companion,
          <br />
          <span className="text-warm-gray">ready from day one</span>
        </h1>

        <p
          className="text-warm-gray text-[17px] leading-relaxed mb-10 max-w-md animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          A personal Claw that listens, learns, and acts on your behalf —
          across chat, voice, and automation.
        </p>

        <button
          onClick={() => setShowLogin(true)}
          className="btn-primary text-[16px] px-12 py-4 animate-fade-up"
          style={{ animationDelay: "450ms" }}
        >
          Try Now
        </button>

        {/* Feature pills */}
        <div
          className="flex items-center gap-6 mt-14 text-warm-gray-light animate-fade-up"
          style={{ animationDelay: "600ms" }}
        >
          {["Voice first", "Proactive", "Personalized", "Multi-channel"].map(
            (label, i) => (
              <span key={label} className="flex items-center gap-6">
                {i > 0 && (
                  <span className="w-1 h-1 rounded-full bg-warm-gray-light" />
                )}
                <span className="text-[13px] tracking-wide">{label}</span>
              </span>
            )
          )}
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
          {[
            {
              icon: "💬",
              title: "Voice Chat",
              desc: "Talk naturally with your AI companion through voice-first conversations across any device.",
            },
            {
              icon: "⚡",
              title: "Smart Tasks",
              desc: "Delegate complex work to autonomous background agents that handle research, analysis, and more.",
            },
            {
              icon: "🧩",
              title: "Skills Store",
              desc: "Extend your Claw's abilities with plugins — from email drafting to code review and beyond.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="card-elevated p-8 flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#F3F4F6] flex items-center justify-center text-[24px] mb-5">
                {card.icon}
              </div>
              <h3 className="text-[20px] font-semibold mb-2">
                {card.title}
              </h3>
              <p className="text-warm-gray text-[14px] leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="text-center py-8 text-warm-gray-light text-[12px]">
        &copy; 2026 PandaClaw. All rights reserved.
      </footer>

      {/* ── Login Modal ── */}
      <AnimatePresence>
        {showLogin && (
          <>
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogin(false)}
            />
            <div className="modal-container">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-white rounded-3xl p-8 w-full max-w-sm shadow-[0_20px_60px_rgba(0,0,0,0.1)]"
              >
                {/* Close */}
                <button
                  onClick={() => setShowLogin(false)}
                  className="absolute top-4 right-4 text-warm-gray hover:text-foreground transition-colors cursor-pointer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <div className="flex flex-col items-center">
                  <PandaAvatar size={64} className="mb-4" />
                  <h2 className="text-[24px] font-semibold mb-1">
                    Welcome to PandaClaw
                  </h2>
                  <p className="text-warm-gray text-[14px] mb-8">
                    Sign in to get started
                  </p>

                  <div className="flex flex-col gap-3 w-full">
                    <button
                      onClick={handleLogin}
                      className="card-elevated flex items-center gap-4 px-6 py-3.5 w-full cursor-pointer text-left"
                    >
                      <span className="text-foreground/70"><GoogleIcon /></span>
                      <span className="font-medium text-[15px]">Continue with Google</span>
                    </button>
                    <button
                      onClick={handleLogin}
                      className="card-elevated flex items-center gap-4 px-6 py-3.5 w-full cursor-pointer text-left"
                    >
                      <span className="text-foreground/70"><AppleIcon /></span>
                      <span className="font-medium text-[15px]">Continue with Apple</span>
                    </button>
                    <button
                      onClick={handleLogin}
                      className="card-elevated flex items-center gap-4 px-6 py-3.5 w-full cursor-pointer text-left"
                    >
                      <span className="text-foreground/70"><MailIcon /></span>
                      <span className="font-medium text-[15px]">Continue with Email</span>
                    </button>
                  </div>

                  <p className="text-warm-gray-light text-[11px] mt-6 text-center leading-relaxed">
                    By continuing, you agree to PandaClaw&apos;s Terms of Service and Privacy Policy.
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
