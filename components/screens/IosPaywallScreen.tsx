"use client";

import { useState } from "react";
import PandaAvatar from "../PandaAvatar";

interface Plan {
  id: string;
  name: string;
  monthly: number;
  yearly: number; // per month when billed yearly
  desc: string;
  freeTrial: boolean;
}

const plans: Plan[] = [
  { id: "starter", name: "Starter", monthly: 24, yearly: 20, desc: "For personal use", freeTrial: true },
  { id: "pro", name: "Pro", monthly: 100, yearly: 83, desc: "Power users & freelancers", freeTrial: false },
  { id: "team", name: "Team", monthly: 200, yearly: 167, desc: "For teams up to 10", freeTrial: false },
];

export default function IosPaywallScreen({
  onNext,
  onDismiss,
}: {
  onNext: () => void;
  onDismiss?: () => void;
}) {
  const [showPlans, setShowPlans] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const currentPlan = plans.find((p) => p.id === selectedPlan) || plans[0];
  const currentPrice = billing === "monthly" ? currentPlan.monthly : currentPlan.yearly;

  return (
    <>
      <div className="flex flex-col items-center justify-between min-h-screen px-6 pt-14 pb-8">
        {/* Top bar: Close + Restore */}
        <div className="w-full max-w-sm flex items-center justify-between animate-fade-up">
          {onDismiss ? (
            <button
              onClick={onDismiss}
              className="text-warm-gray/60 hover:text-warm-gray cursor-pointer transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          ) : (
            <div className="w-6" />
          )}
          <button className="text-warm-gray/50 hover:text-warm-gray text-[13px] cursor-pointer transition-colors">
            Restore
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col items-center">
          <h2
            className="font-serif text-[30px] font-semibold text-center leading-tight animate-fade-up"
            style={{ animationDelay: "100ms" }}
          >
            Unlock Claw to reach
            <br />
            <span className="italic text-accent">your full potential</span>
          </h2>

          {/* Mock phone showing the app */}
          <div className="mt-6 w-full max-w-[280px] animate-fade-up" style={{ animationDelay: "200ms" }}>
            <div className="bg-white rounded-[24px] border-[3px] border-foreground/10 shadow-lg overflow-hidden">
              {/* Mini status bar */}
              <div className="flex items-center justify-between px-5 pt-2.5 pb-1">
                <span className="text-[10px] font-semibold text-foreground/50">9:41</span>
                <div className="flex items-center gap-1 text-foreground/40">
                  <div className="w-[12px] h-[8px] flex items-end gap-[1px]">
                    <div className="w-[1.5px] h-[3px] bg-foreground/30 rounded-[0.5px]" />
                    <div className="w-[1.5px] h-[5px] bg-foreground/30 rounded-[0.5px]" />
                    <div className="w-[1.5px] h-[7px] bg-foreground/30 rounded-[0.5px]" />
                    <div className="w-[1.5px] h-[8px] bg-foreground/50 rounded-[0.5px]" />
                  </div>
                </div>
              </div>

              {/* App content preview */}
              <div className="px-4 pb-4 pt-1">
                <div className="flex items-center gap-2 mb-3">
                  <PandaAvatar size={22} />
                  <span className="font-serif text-[13px] font-semibold">Claw</span>
                </div>

                {/* Feature cards */}
                <div className="flex flex-col gap-2">
                  <div className="bg-cream rounded-xl px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px]">☁️</span>
                      <div>
                        <p className="text-[11px] font-semibold text-foreground">Cloud Computer</p>
                        <p className="text-[9px] text-warm-gray">Run tasks 24/7, even when you sleep</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-cream rounded-xl px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px]">⚡</span>
                      <div>
                        <p className="text-[11px] font-semibold text-foreground">Unlimited Tasks</p>
                        <p className="text-[9px] text-warm-gray">No daily limits on what Claw can do</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-cream rounded-xl px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px]">🧠</span>
                      <div>
                        <p className="text-[11px] font-semibold text-foreground">Learns Your Style</p>
                        <p className="text-[9px] text-warm-gray">Gets smarter the more you use it</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA area */}
        <div className="w-full max-w-sm flex flex-col items-center">
          {/* Free trial badge — only for starter */}
          {currentPlan.freeTrial && (
            <div className="flex items-center gap-2 mb-4 animate-fade-up" style={{ animationDelay: "350ms" }}>
              <svg className="text-accent" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-[15px] font-semibold text-foreground">7 Days Free — No Payment Due Now</span>
            </div>
          )}

          <button
            onClick={onNext}
            className="w-full btn-primary text-[16px] py-[16px] animate-fade-up"
            style={{ animationDelay: "400ms" }}
          >
            Continue
          </button>

          <p
            className="mt-3 text-warm-gray/50 text-[12px] text-center animate-fade-up"
            style={{ animationDelay: "450ms" }}
          >
            {currentPlan.freeTrial ? "Then " : ""}${currentPrice}/{billing === "monthly" ? "mo" : "mo, billed yearly"} · Cancel anytime
          </p>

          {/* View all plans + Apple links */}
          <div className="mt-4 flex flex-col items-center gap-2 animate-fade-up" style={{ animationDelay: "480ms" }}>
            <button
              onClick={() => setShowPlans(true)}
              className="text-accent hover:text-accent/80 text-[13px] font-medium cursor-pointer transition-colors"
            >
              View all plans
            </button>
            <div className="flex items-center gap-3 text-warm-gray/40 text-[11px]">
              <button className="hover:text-warm-gray cursor-pointer transition-colors underline">Terms</button>
              <span>·</span>
              <button className="hover:text-warm-gray cursor-pointer transition-colors underline">Privacy</button>
            </div>
          </div>
        </div>
      </div>

      {/* Plans bottom sheet */}
      {showPlans && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-50 transition-opacity"
            onClick={() => setShowPlans(false)}
          />

          {/* Sheet */}
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-cream rounded-t-3xl shadow-2xl animate-slide-up">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-cream-dark/40" />
            </div>

            <div className="px-6 pb-8">
              <h3 className="font-serif text-[22px] font-semibold text-center mb-4">
                Choose your plan
              </h3>

              {/* Monthly / Yearly toggle */}
              <div className="flex items-center justify-center mb-5">
                <div className="flex bg-cream-dark/40 rounded-full p-0.5">
                  <button
                    onClick={() => setBilling("monthly")}
                    className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer ${
                      billing === "monthly"
                        ? "bg-white text-foreground shadow-sm"
                        : "text-warm-gray hover:text-foreground"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBilling("yearly")}
                    className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      billing === "yearly"
                        ? "bg-white text-foreground shadow-sm"
                        : "text-warm-gray hover:text-foreground"
                    }`}
                  >
                    Yearly
                    <span className="text-[10px] font-semibold text-accent bg-accent-light/60 px-1.5 py-0.5 rounded-full">
                      -16%
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {plans.map((plan) => {
                  const price = billing === "monthly" ? plan.monthly : plan.yearly;
                  return (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative flex items-center gap-4 rounded-2xl px-5 py-4 border-[1.5px] transition-all cursor-pointer ${
                        selectedPlan === plan.id
                          ? "border-accent bg-accent-light/40 shadow-sm"
                          : "border-cream-dark/60 bg-white"
                      }`}
                    >
                      {/* Free trial badge */}
                      {plan.freeTrial && (
                        <span className="absolute -top-2.5 left-5 text-[10px] font-semibold text-white bg-accent px-2 py-0.5 rounded-full">
                          7 days free
                        </span>
                      )}

                      {/* Radio */}
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedPlan === plan.id ? "border-accent" : "border-cream-dark"
                      }`}>
                        {selectedPlan === plan.id && (
                          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                        )}
                      </div>

                      <div className="flex-1 text-left">
                        <p className="font-semibold text-[15px] text-foreground">{plan.name}</p>
                        <p className="text-warm-gray text-[12px]">{plan.desc}</p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <span className="font-semibold text-[18px] text-foreground">${price}</span>
                        <span className="text-warm-gray text-[12px]">/mo</span>
                        {billing === "yearly" && (
                          <p className="text-warm-gray/50 text-[10px] line-through">${plan.monthly}/mo</p>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setShowPlans(false)}
                className="w-full btn-primary mt-5 text-[15px] py-[14px]"
              >
                Select {currentPlan.name}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
