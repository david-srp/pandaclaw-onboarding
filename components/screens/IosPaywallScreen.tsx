"use client";

import { useState, useRef } from "react";

interface Plan {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  desc: string;
  priceDisplay: string;
  priceNote: string;
  features: string[];
  cta: string;
  bestValue?: boolean;
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "7-Day Free",
    monthly: 24,
    yearly: 20,
    desc: "Get started with your AI companion",
    priceDisplay: "$0",
    priceNote: "for 7 days, then $24/mo",
    cta: "Start 7 day free trial",
    features: [
      "Unlimited free model (MiniMax M2.5)",
      "4,800 credits/mo",
      "2 vCPU, 4 GB RAM, 20 GB Storage",
      "2 concurrent, 3 scheduled tasks",
      "Basic image generation",
      "Audio",
      "App, SMS & Email channels",
      "Memory retention during subscription",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 100,
    yearly: 83,
    desc: "For everyday productivity",
    priceDisplay: "$100",
    priceNote: "/ month",
    cta: "Choose Pro",
    features: [
      "Everything in Starter, plus",
      "20,000 credits/mo",
      "8 vCPU, 16 GB RAM, 256 GB Storage",
      "5 concurrent, 15 scheduled tasks",
      "Advanced image generation",
      "Video",
      "Slack / Telegram",
    ],
  },
  {
    id: "ultra",
    name: "Ultra",
    monthly: 200,
    yearly: 167,
    desc: "Get the most out of PandaClaw",
    priceDisplay: "$200",
    priceNote: "/ month",
    cta: "Choose Ultra",
    bestValue: true,
    features: [
      "Everything in Pro, plus",
      "40,000 credits/mo",
      "8 vCPU, 32 GB RAM, 1 TB Storage",
      "10 concurrent, Unlimited scheduled tasks",
    ],
  },
];

export default function IosPaywallScreen({
  onNext,
}: {
  onNext: () => void;
}) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentPlan = plans.find((p) => p.id === selectedPlan) || plans[0];

  return (
    <div className="flex flex-col min-h-screen pb-8">
      {/* Top bar */}
      <div className="flex items-center justify-end px-6 pt-14 animate-fade-up">
        <button className="text-warm-gray/50 hover:text-warm-gray text-[13px] cursor-pointer transition-colors">
          Restore
        </button>
      </div>

      {/* Title */}
      <h1 className="text-[28px] font-semibold text-center leading-tight tracking-tight px-6 mt-4 animate-fade-up">
        Choose your plan
      </h1>

      {/* Billing toggle */}
      <div className="flex items-center justify-center mt-5 animate-fade-up" style={{ animationDelay: "100ms" }}>
        <div className="relative flex bg-[#F0F0F0] rounded-full p-[3px]">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer ${
              billing === "monthly"
                ? "bg-foreground text-white shadow-sm"
                : "text-warm-gray hover:text-foreground"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("yearly")}
            className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer ${
              billing === "yearly"
                ? "bg-foreground text-white shadow-sm"
                : "text-warm-gray hover:text-foreground"
            }`}
          >
            Annually
          </button>
          <span className="absolute -top-2.5 right-0 text-[10px] font-semibold text-white bg-[#EF4444] px-2 py-0.5 rounded-full">
            ~2 mo free
          </span>
        </div>
      </div>

      {/* Horizontal scrolling plan cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 mt-6 pb-2 scrollbar-hide animate-fade-up"
        style={{ animationDelay: "200ms", scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const price = plan.id === "starter"
            ? plan.priceDisplay
            : `$${billing === "monthly" ? plan.monthly : plan.yearly}`;
          const note = plan.id === "starter"
            ? `for 7 days, then $${billing === "monthly" ? plan.monthly : plan.yearly}/mo`
            : plan.priceNote;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative flex-shrink-0 w-[85%] snap-center rounded-2xl border-[1.5px] p-5 cursor-pointer transition-all ${
                isSelected
                  ? "border-foreground shadow-lg"
                  : "border-cream-dark/60"
              }`}
            >
              {plan.bestValue && (
                <span className="absolute -top-3 left-5 text-[10px] font-semibold text-white bg-foreground px-3 py-1 rounded-full uppercase tracking-wide">
                  Best Value
                </span>
              )}

              <h3 className="text-[18px] font-bold text-foreground">{plan.name}</h3>
              <p className="text-warm-gray text-[13px] mt-0.5">{plan.desc}</p>

              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-[36px] font-bold text-foreground leading-none">{price}</span>
                <span className="text-warm-gray text-[14px]">{note}</span>
              </div>

              <div className="mt-5 flex flex-col gap-2.5">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg className="text-foreground flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[13px] leading-snug text-foreground">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex-1" />

      {/* Bottom CTA */}
      <div className="px-6 mt-6">
        <button
          onClick={onNext}
          className="w-full btn-primary text-[16px] py-[16px] animate-fade-up"
          style={{ animationDelay: "350ms" }}
        >
          {currentPlan.cta}
        </button>

        <p
          className="mt-3 text-warm-gray/50 text-[12px] text-center animate-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          {currentPlan.id === "starter"
            ? `7-day free trial then $${billing === "monthly" ? currentPlan.monthly : currentPlan.yearly} / month`
            : `$${billing === "monthly" ? currentPlan.monthly : currentPlan.yearly} / month`}
          <br />
          No commitment. Cancel anytime.
        </p>

        <div className="flex items-center justify-center gap-3 text-warm-gray/40 text-[11px] mt-3 animate-fade-up" style={{ animationDelay: "430ms" }}>
          <button className="hover:text-warm-gray cursor-pointer transition-colors underline">Terms</button>
          <span>·</span>
          <button className="hover:text-warm-gray cursor-pointer transition-colors underline">Privacy</button>
        </div>
      </div>
    </div>
  );
}
