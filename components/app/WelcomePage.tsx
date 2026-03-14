"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Sparkles, Puzzle, ArrowRight, Check, Loader2 } from "lucide-react";
import ChannelTabBar from "./ChannelTabBar";
import type { OnboardingStep } from "@/lib/onboarding-store";

interface WelcomePageProps {
  userName: string;
  onboardingStep: OnboardingStep;
  onStartOnboarding: () => void;
  onSetupComplete: () => void;
}

/* ── Steps that mean payment is done → start background init ── */
const POST_PAYMENT_STEPS: OnboardingStep[] = [
  "channel", "smsVerify", "smsConfirm", "appDownload", "loading",
];

/* ── Setup steps shown to user ── */
const SETUP_STEPS = [
  {
    label: "Preference",
    desc: "About you",
    inProgressDuring: ["name", "role"] as OnboardingStep[],
    completedAfter: ["payment", "channel", "smsVerify", "smsConfirm", "appDownload", "loading"] as OnboardingStep[],
  },
  {
    label: "Subscription",
    desc: "Free credits",
    inProgressDuring: ["payment"] as OnboardingStep[],
    completedAfter: ["channel", "smsVerify", "smsConfirm", "appDownload", "loading"] as OnboardingStep[],
  },
  {
    label: "Configuring",
    desc: "You're in",
    inProgressDuring: ["channel", "smsVerify", "smsConfirm", "appDownload", "loading"] as OnboardingStep[],
    completedAfter: [] as OnboardingStep[],
  },
];

type StepStatus = "pending" | "in_progress" | "completed";

function getStepStatus(step: typeof SETUP_STEPS[number], currentStep: OnboardingStep): StepStatus {
  if (step.completedAfter.includes(currentStep)) return "completed";
  if (step.inProgressDuring.includes(currentStep)) return "in_progress";
  return "pending";
}

/* ── Rotating messages for the initializing state ── */
const LOADING_MESSAGES = [
  "Setting things up...",
  "Connecting your channels...",
  "Preparing your experience...",
  "Almost ready...",
];

/* ── Step icon SVGs ── */
function StepIcon({ index, status }: { index: number; status: StepStatus }) {
  const opacity = status === "pending" ? "opacity-30" : "opacity-100";

  if (index === 0) {
    return (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className={`transition-all duration-300 ${opacity}`}>
        <circle cx="18" cy="14" r="6" fill="#EF4444" />
        <circle cx="18" cy="14" r="3" fill="#FCA5A5" />
        <path d="M8 36c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="32" cy="12" r="7.5" fill="#F97316" />
        <path d="M32 8.5v7M28.5 12h7" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className={`transition-all duration-300 ${opacity}`}>
        <path d="M10 30c2-1 5-2.5 12-2.5s10 1.5 12 2.5v-4c-2-1-5-2.5-12-2.5s-10 1.5-12 2.5v4z" fill="#EF4444" />
        <path d="M10 25c2-1 5-2.5 12-2.5s10 1.5 12 2.5v-4c-2-1-5-2.5-12-2.5s-10 1.5-12 2.5v4z" fill="#F97316" />
        <circle cx="30" cy="12" r="8.5" fill="#EF4444" />
        <text x="30" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">$</text>
      </svg>
    );
  }
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className={`transition-all duration-300 ${opacity}`}>
      <rect x="5" y="8" width="34" height="26" rx="4" fill="#EF4444" />
      <rect x="5" y="8" width="34" height="8" rx="4" fill="#F97316" />
      <rect x="5" y="13" width="34" height="3" fill="#F97316" />
      <circle cx="12" cy="12" r="1.2" fill="white" />
      <circle cx="16.5" cy="12" r="1.2" fill="white" />
      <circle cx="21" cy="12" r="1.2" fill="white" />
      <path d="M13 23l4 3.5-4 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 30h10" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Feature cards data ── */
const FEATURES = [
  {
    icon: <Mic size={20} className="text-emerald-500" />,
    bgColor: "bg-emerald-50",
    title: "Voice Chat",
    desc: "Talk naturally with your AI companion through voice-first conversations across any device.",
  },
  {
    icon: <Sparkles size={20} className="text-violet-500" />,
    bgColor: "bg-violet-50",
    title: "Smart Tasks",
    desc: "Delegate complex work to autonomous background agents that handle research, analysis, and more.",
  },
  {
    icon: <Puzzle size={20} className="text-rose-400" />,
    bgColor: "bg-rose-50",
    title: "Skills Store",
    desc: "Extend your panda's abilities with plugins — from email drafting to code review and beyond.",
  },
];

export default function WelcomePage({
  userName,
  onboardingStep,
  onStartOnboarding,
  onSetupComplete,
}: WelcomePageProps) {
  // Background initialization: starts when payment is done
  const isInitializing = POST_PAYMENT_STEPS.includes(onboardingStep);
  const [isReady, setIsReady] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState(0);
  const [progress, setProgress] = useState(0);
  const initStarted = useRef(false);

  useEffect(() => {
    if (!isInitializing || initStarted.current) return;
    initStarted.current = true;

    const msgInterval = setInterval(() => {
      setLoadingMsg((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1000);

    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(p + 0.6, 100));
    }, 30);

    const timeout = setTimeout(() => {
      setIsReady(true);
      setProgress(100);
    }, 5000);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [isInitializing]);

  // Compute statuses
  const statuses = SETUP_STEPS.map((s, i) => {
    const base = getStepStatus(s, onboardingStep);
    if (i === 2 && isReady) return "completed" as StepStatus;
    return base;
  });

  const hasProgress = statuses.some((s) => s === "completed" || s === "in_progress");
  const showLaunchLoading = isInitializing && !isReady;
  const modalClosed = onboardingStep === "loading";

  // Determine button state
  const allDone = isReady && modalClosed;
  const isLoading = showLaunchLoading && modalClosed;

  const handleClick = () => {
    if (allDone) {
      onSetupComplete();
    } else {
      onStartOnboarding();
    }
  };

  const buttonLabel = allDone
    ? "Start Exploring"
    : hasProgress
    ? "Continue"
    : "Get Started";

  return (
    <div className="flex-1 flex flex-col h-full min-w-0">
      <ChannelTabBar />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 md:px-8 py-8 md:py-12">

          {/* ── Stepper Section ── */}
          <div
            className="relative rounded-2xl px-8 md:px-12 pt-8 pb-6 mb-6 overflow-hidden animate-fade-up"
            style={{
              background: "radial-gradient(ellipse 80% 70% at 50% 100%, #FECDD3 0%, #FFE4E6 35%, #FFF1F2 60%, #FFFBFB 100%)",
            }}
          >
            {/* Step icons row — tightly spaced */}
            <div className="flex items-end justify-center mb-5">
              <div className="flex items-end" style={{ gap: "80px" }}>
                {SETUP_STEPS.map((_, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <StepIcon index={i} status={statuses[i]} />
                  </div>
                ))}
              </div>
            </div>

            {/* Progress circles + connecting lines */}
            <div className="flex items-center justify-center mb-1.5">
              {SETUP_STEPS.map((_, i) => (
                <div key={i} className="flex items-center">
                  {/* Step circle */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-semibold transition-all duration-300 shrink-0 ${
                    statuses[i] === "completed"
                      ? "bg-emerald-500 text-white shadow-[0_0_0_3px_rgba(16,185,129,0.2)]"
                      : statuses[i] === "in_progress"
                      ? "bg-white border-[2px] border-emerald-400 text-emerald-600 shadow-[0_0_0_3px_rgba(16,185,129,0.1)]"
                      : "bg-white border-[2px] border-gray-200 text-gray-300"
                  }`}>
                    {statuses[i] === "completed" ? (
                      <Check size={16} strokeWidth={3} />
                    ) : statuses[i] === "in_progress" ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <span>{i + 1}</span>
                    )}
                  </div>

                  {/* Connecting line */}
                  {i < SETUP_STEPS.length - 1 && (
                    <div className="w-[60px] md:w-[80px] h-0 mx-0.5">
                      {statuses[i] === "completed" ? (
                        <div className="w-full border-t-[2px] border-solid border-emerald-500" />
                      ) : (
                        <div className="w-full border-t-[2px] border-dashed border-gray-300/60" />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Step labels */}
            <div className="flex items-start justify-center">
              {SETUP_STEPS.map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-9 text-center">
                    <p className={`text-[11px] font-medium whitespace-nowrap mt-1 ${
                      statuses[i] === "completed" ? "text-emerald-600" :
                      statuses[i] === "in_progress" ? "text-foreground" :
                      "text-gray-300"
                    }`}>
                      {step.label}
                    </p>
                  </div>
                  {i < SETUP_STEPS.length - 1 && (
                    <div className="w-[60px] md:w-[80px] mx-0.5" />
                  )}
                </div>
              ))}
            </div>

            {/* Loading progress bar */}
            {isLoading && (
              <div className="mt-5 max-w-xs mx-auto">
                <div className="w-full h-[3px] bg-white/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[11px] text-rose-700/50 text-center mt-1.5">
                  {LOADING_MESSAGES[loadingMsg]}
                </p>
              </div>
            )}
          </div>

          {/* ── Button ── */}
          <div className="flex justify-center mb-10 animate-fade-up" style={{ animationDelay: "150ms" }}>
            {!isLoading && (
              <button
                onClick={handleClick}
                className="btn-primary text-[15px] px-12 py-3.5 flex items-center gap-2"
              >
                {buttonLabel}
                <ArrowRight size={16} />
              </button>
            )}
          </div>

          {/* ── Feature Cards ── */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-up"
            style={{ animationDelay: "300ms" }}
          >
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-gray-200 transition-all"
              >
                <div className={`w-10 h-10 rounded-xl ${feature.bgColor} flex items-center justify-center mb-3`}>
                  {feature.icon}
                </div>
                <h3 className="text-[15px] font-semibold mb-1">{feature.title}</h3>
                <p className="text-warm-gray text-[13px] leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
