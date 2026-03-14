"use client";

import { useState, useEffect, useCallback } from "react";
import PandaAvatar from "../PandaAvatar";

export default function PaymentScreen({
  onNext,
}: {
  onNext: () => void;
}) {
  const [waiting, setWaiting] = useState(false);
  const [dots, setDots] = useState("");

  // Animate dots while waiting
  useEffect(() => {
    if (!waiting) return;
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 500);
    return () => clearInterval(interval);
  }, [waiting]);

  // Listen for window focus — user came back from Stripe tab
  const handleFocus = useCallback(() => {
    if (waiting) {
      // Simulate: in real app you'd verify payment here
      // For now, auto-advance after user returns
      setTimeout(() => onNext(), 800);
    }
  }, [waiting, onNext]);

  useEffect(() => {
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [handleFocus]);

  const handleAddPayment = () => {
    setWaiting(true);
    window.open("https://checkout.stripe.com", "_blank");
  };

  if (waiting) {
    return (
      <div className="flex flex-col items-center px-8 py-10">
        <PandaAvatar size={72} animate className="mb-6" />

        <h2 className="font-serif text-[26px] font-semibold text-foreground text-center">
          Waiting for payment{dots}
        </h2>
        <p className="text-warm-gray text-[14px] text-center mt-2 max-w-sm leading-relaxed">
          Complete checkout in the Stripe tab, then come back here.
          We&apos;ll pick up right where you left off.
        </p>

        <div className="mt-8 w-full max-w-sm">
          <div className="bg-white border border-cream-dark rounded-2xl p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-cream-dark/30 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-warm-gray animate-spin-slow">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-medium text-foreground">Stripe Checkout</p>
              <p className="text-[12px] text-warm-gray">Processing in another tab</p>
            </div>
          </div>

          <button
            onClick={handleAddPayment}
            className="mt-4 w-full btn-secondary text-[13px]"
          >
            Re-open Stripe checkout
          </button>

          <button
            onClick={() => setWaiting(false)}
            className="mt-3 w-full text-warm-gray hover:text-foreground text-[13px] font-medium cursor-pointer transition-colors text-center"
          >
            &larr; Go back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-8 py-10">
      <PandaAvatar size={64} className="mb-4 animate-fade-up" />

      <h2
        className="font-serif text-[28px] font-semibold text-foreground text-center animate-fade-up"
        style={{ animationDelay: "100ms" }}
      >
        Start your free trial
      </h2>
      <p
        className="text-warm-gray text-[14px] text-center mt-2 animate-fade-up"
        style={{ animationDelay: "200ms" }}
      >
        Unlock everything with a 7-day free trial
      </p>

      <div className="mt-6 w-full max-w-sm">
        {/* Pricing card */}
        <div
          className="bg-white border border-cream-dark rounded-2xl p-6 text-center animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          <p className="text-[40px] font-serif font-semibold text-foreground leading-none">7 days free</p>
          <p className="text-[14px] text-warm-gray mt-2">Then $20/mo · cancel anytime</p>

          <div className="mt-6 grid grid-cols-4 gap-3">
            {[
              { icon: "⚡", text: "Unlimited tasks" },
              { icon: "🧠", text: "Learns your style" },
              { icon: "🔒", text: "Private & secure" },
              { icon: "🔄", text: "Cancel anytime" },
            ].map((item) => (
              <div key={item.icon} className="text-center">
                <span className="text-[20px]">{item.icon}</span>
                <p className="text-[11px] text-warm-gray mt-1 leading-tight">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddPayment}
          className="mt-6 w-full btn-primary animate-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          Start free trial
        </button>

        <div className="mt-3 flex items-center justify-center gap-1.5 animate-fade-up" style={{ animationDelay: "450ms" }}>
          <span className="text-warm-gray/50 text-[11px]">Powered by</span>
          <svg width="28" height="12" viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M120 25.66c0-8.5-4.12-15.24-12-15.24s-12.72 6.74-12.72 15.16c0 10 5.66 15.04 13.78 15.04 3.96 0 6.96-.9 9.22-2.16v-6.64c-2.26 1.14-4.86 1.84-8.16 1.84-3.24 0-6.1-1.14-6.48-5.04h16.32c0-.44.04-2.16.04-2.96zm-16.5-3.16c0-3.76 2.3-5.32 4.4-5.32 2.04 0 4.22 1.56 4.22 5.32h-8.62zM83.28 10.42c-3.26 0-5.34 1.54-6.5 2.6l-.44-2.06h-7.7v38.68l8.74-1.86.02-9.38c1.2.86 2.96 2.08 5.86 2.08 5.92 0 11.32-4.76 11.32-15.24-.02-9.58-5.5-14.82-11.3-14.82zm-1.98 22.8c-1.96 0-3.1-.7-3.9-1.56l-.04-12.28c.86-.96 2.04-1.62 3.94-1.62 3.02 0 5.1 3.38 5.1 7.7 0 4.42-2.04 7.76-5.1 7.76zM61.6 8.56l8.76-1.88V0l-8.76 1.86v6.7zM61.6 11.14h8.76v29.36H61.6V11.14zM52.34 13.5l-.56-2.36h-7.56v29.36h8.74V20.38c2.06-2.7 5.56-2.18 6.64-1.8V11.14c-1.12-.42-5.22-1.18-7.26 2.36zM35.04 3.72l-8.52 1.82-.04 26.86c0 4.96 3.72 8.62 8.68 8.62 2.74 0 4.76-.5 5.86-1.1v-7.1c-1.06.44-6.3 1.98-6.3-2.96V18.44h6.3v-7.3h-6.3l.32-7.42zM11.02 19.6c0-1.3 1.08-1.8 2.86-1.8a18.7 18.7 0 0 1 8.32 2.14V12.4A22.14 22.14 0 0 0 13.88 11C5.86 11 .62 15.06.62 21.22c0 9.56 13.14 8.04 13.14 12.18 0 1.54-1.34 2.04-3.22 2.04-2.78 0-6.36-1.14-9.18-2.68v7.68a23.3 23.3 0 0 0 9.18 1.94c8.24 0 13.9-4.08 13.9-10.3-.02-10.32-13.42-8.5-13.42-12.48z" fill="#635BFF"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
