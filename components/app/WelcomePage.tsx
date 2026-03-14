"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Sparkles, Puzzle, ArrowRight, Check, User, CreditCard, Loader2, Rocket } from "lucide-react";
import PandaAvatar from "../PandaAvatar";
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
    icon: User,
    label: "Personalize",
    desc: "About you",
    inProgressDuring: ["name", "role"] as OnboardingStep[],
    completedAfter: ["payment", "channel", "smsVerify", "smsConfirm", "appDownload", "loading"] as OnboardingStep[],
  },
  {
    icon: CreditCard,
    label: "Activate",
    desc: "Free credits",
    inProgressDuring: ["payment"] as OnboardingStep[],
    completedAfter: ["channel", "smsVerify", "smsConfirm", "appDownload", "loading"] as OnboardingStep[],
  },
  {
    icon: Rocket,
    label: "Launch",
    desc: "You're in",
    // in_progress as soon as payment is done (background init running)
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

    // Simulated init completes after 5 seconds
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

  // Compute statuses — override Launch to "completed" when ready
  const statuses = SETUP_STEPS.map((s, i) => {
    const base = getStepStatus(s, onboardingStep);
    if (i === 2 && isReady) return "completed" as StepStatus;
    return base;
  });

  const completedCount = statuses.filter((s) => s === "completed").length;
  const hasProgress = statuses.some((s) => s === "completed" || s === "in_progress");

  // Show loading UI on the Launch row when init is running but not yet ready
  const showLaunchLoading = isInitializing && !isReady;

  // Modal is closed when step is "loading" — that's when user can see Welcome page
  const modalClosed = onboardingStep === "loading";

  return (
    <div className="flex-1 flex flex-col h-full min-w-0">
      <ChannelTabBar />

      <div className="flex-1 overflow-y-auto flex items-start justify-center">
        <div className="max-w-2xl w-full px-6 md:px-8 py-10 md:py-16">
          {/* ── Header ── */}
          <div className="flex items-start gap-6 mb-10">
            <div className="flex-1">
              <h1 className="font-serif text-[32px] md:text-[42px] font-semibold leading-[1.08] tracking-tight animate-fade-up">
                Welcome to<br />Panda Claw
              </h1>
              <p
                className="text-warm-gray text-[15px] mt-3 max-w-md leading-relaxed animate-fade-up"
                style={{ animationDelay: "100ms" }}
              >
                Your voice-first AI companion — chat, delegate tasks,
                and get things done across every channel.
              </p>
            </div>
            <div
              className="animate-fade-up shrink-0 hidden sm:block"
              style={{ animationDelay: "200ms" }}
            >
              <PandaAvatar size={110} animate />
            </div>
          </div>

          {/* ── What you can do ── */}
          <div
            className="mb-10 animate-fade-up"
            style={{ animationDelay: "250ms" }}
          >
            <p className="text-[13px] font-medium text-warm-gray uppercase tracking-wider mb-4">
              What you can do
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { Icon: Mic, title: "Voice Chat", desc: "Talk naturally, hands-free" },
                { Icon: Sparkles, title: "Smart Tasks", desc: "Delegate work to background agents" },
                { Icon: Puzzle, title: "Skills Store", desc: "Extend with plugins & integrations" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white border border-cream-dark"
                >
                  <div className="w-9 h-9 rounded-xl bg-cream-dark/30 flex items-center justify-center shrink-0">
                    <item.Icon size={17} className="text-warm-gray" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-foreground">{item.title}</p>
                    <p className="text-[11px] text-warm-gray leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Setup Card ── */}
          <div
            className="bg-white border border-cream-dark rounded-2xl p-6 animate-fade-up"
            style={{ animationDelay: "350ms" }}
          >
            {/* Header row */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-[16px]">
                  {isReady && modalClosed
                    ? "You're all set!"
                    : showLaunchLoading && modalClosed
                    ? "Almost there!"
                    : hasProgress
                    ? "Continue setup"
                    : "Get started"}
                </h3>
                <p className="text-warm-gray text-[13px] mt-0.5">
                  {isReady && modalClosed
                    ? "Everything is ready — let's go!"
                    : showLaunchLoading && modalClosed
                    ? "Preparing your workspace..."
                    : completedCount > 0
                    ? `${completedCount} of ${SETUP_STEPS.length} done — almost there!`
                    : hasProgress
                    ? "You've started — pick up where you left off."
                    : "Three quick steps, then you're in."}
                </p>
              </div>
              {isReady && modalClosed ? (
                <button
                  onClick={onSetupComplete}
                  className="btn-primary text-[13px] px-5 py-2.5 flex items-center gap-2"
                >
                  Start Exploring
                  <ArrowRight size={15} />
                </button>
              ) : !(showLaunchLoading && modalClosed) ? (
                <button
                  onClick={onStartOnboarding}
                  className="btn-primary text-[13px] px-5 py-2.5 flex items-center gap-2"
                >
                  {hasProgress ? "Continue" : "Start Setup"}
                  <ArrowRight size={15} />
                </button>
              ) : null}
            </div>

            {/* Step rows */}
            <div className="flex flex-col gap-2.5">
              {SETUP_STEPS.map((step, i) => {
                const status = statuses[i];
                const isLaunchRow = step.label === "Launch";
                const isLaunchLoading = isLaunchRow && showLaunchLoading;
                const isLaunchReady = isLaunchRow && isReady;
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all ${
                      status === "completed"
                        ? "bg-accent-light/50"
                        : status === "in_progress"
                        ? "bg-amber-50 border border-amber-200"
                        : "bg-cream/60"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[13px] font-semibold ${
                        status === "completed"
                          ? "bg-accent text-white"
                          : status === "in_progress"
                          ? "bg-amber-400 text-white"
                          : "bg-cream-dark/40 text-warm-gray"
                      }`}
                    >
                      {status === "completed" ? (
                        <Check size={15} />
                      ) : status === "in_progress" ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : (
                        <span>{i + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[14px] font-medium ${
                        status === "completed"
                          ? "text-accent"
                          : status === "in_progress"
                          ? "text-amber-700"
                          : "text-foreground"
                      }`}>
                        {isLaunchLoading ? LOADING_MESSAGES[loadingMsg] : step.label}
                      </p>
                      {isLaunchLoading ? (
                        <div className="mt-1.5 w-full h-[3px] bg-amber-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full transition-all duration-100 ease-out"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      ) : (
                        <p className="text-[12px] text-warm-gray leading-snug">
                          {isLaunchReady ? "Ready to go" : step.desc}
                        </p>
                      )}
                    </div>
                    {status === "completed" && (
                      <span className="text-[11px] text-accent font-medium shrink-0">Done</span>
                    )}
                    {status === "in_progress" && !isLaunchLoading && (
                      <span className="text-[11px] text-amber-600 font-medium shrink-0">In progress</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
