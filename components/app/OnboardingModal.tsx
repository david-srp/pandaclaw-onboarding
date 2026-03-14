"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ProgressDots from "@/components/ProgressDots";
import InviteCodeScreen from "@/components/screens/InviteCodeScreen";
import NameInputScreen from "@/components/screens/NameInputScreen";
import RoleScreen from "@/components/screens/RoleScreen";
import PaymentScreen from "@/components/screens/PaymentScreen";
import ChannelScreen from "@/components/screens/ChannelScreen";
import SmsVerifyScreen from "@/components/screens/SmsVerifyScreen";
import SmsConfirmScreen from "@/components/screens/SmsConfirmScreen";
import AppDownloadScreen from "@/components/screens/AppDownloadScreen";
import type { OnboardingStep } from "@/lib/onboarding-store";

// Pre-payment main flow steps (back/dots header).
const MAIN_STEPS: OnboardingStep[] = [
  "name",
  "role",
  "payment",
];

// Progress dots only for pre-payment steps
const DOT_STEPS = MAIN_STEPS;
const TOTAL_DOTS = DOT_STEPS.length;

// Chromeless = no back/dots header (includes all post-payment steps)
const CHROMELESS: OnboardingStep[] = [
  "inviteCode", "channel", "smsVerify", "smsConfirm", "appDownload",
];

interface OnboardingModalProps {
  initialStep: OnboardingStep;
  userName: string;
  role: string;
  onStepChange: (step: OnboardingStep) => void;
  onUserData: (data: { userName?: string; role?: string; channels?: string[] }) => void;
  onFinalize: () => void;
  onClose: () => void;
}

export default function OnboardingModal({
  initialStep,
  userName,
  role,
  onStepChange,
  onUserData,
  onFinalize,
  onClose,
}: OnboardingModalProps) {
  const [step, setStep] = useState<OnboardingStep>(initialStep);

  const dotIndex = DOT_STEPS.indexOf(step) >= 0
    ? DOT_STEPS.indexOf(step)
    : TOTAL_DOTS - 1;

  const isChromeless = CHROMELESS.includes(step);
  const isFirstMainStep = step === "name";

  const goTo = useCallback(
    (next: OnboardingStep) => {
      setStep(next);
      onStepChange(next);
    },
    [onStepChange]
  );

  // Back: navigate locally only — never regress persisted progress.
  const goBack = useCallback(() => {
    const mainIdx = MAIN_STEPS.indexOf(step);
    if (mainIdx <= 0) {
      // name(0) → close modal
      onClose();
    } else {
      // Navigate back within modal without updating store progress
      setStep(MAIN_STEPS[mainIdx - 1]);
    }
  }, [step, onClose]);

  // ── Channel handlers ──
  const handleChannelSelect = useCallback(
    (channel: string) => {
      onUserData({ channels: [channel] });
      if (channel === "sms") {
        goTo("smsVerify");
      } else if (channel === "app") {
        goTo("appDownload");
      } else {
        // Web channel — done, go to finalizing on Welcome page
        onFinalize();
      }
    },
    [goTo, onUserData, onFinalize]
  );

  const handleSmsVerifyDone = useCallback(() => goTo("smsConfirm"), [goTo]);
  // smsConfirm & appDownload "Continue" → finalize (close modal, show loading on Welcome)
  const handleSmsConfirmContinue = useCallback(() => onFinalize(), [onFinalize]);
  const handleAppDownloadContinue = useCallback(() => onFinalize(), [onFinalize]);

  // ── Chromeless screens ──
  if (isChromeless) {
    return (
      <>
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <div className="modal-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white rounded-3xl w-[92vw] max-w-xl max-h-[82vh] overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.1)] h-[min(640px,88vh)]"
          >
            <div className="flex justify-end px-5 pt-4 pb-0 shrink-0">
              <button
                onClick={onClose}
                className="text-warm-gray hover:text-foreground transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {step === "inviteCode" && (
                <InviteCodeScreen onNext={() => goTo("name")} onClose={onClose} />
              )}
              {step === "channel" && (
                <ChannelScreen onNext={handleChannelSelect} />
              )}
              {step === "smsVerify" && (
                <SmsVerifyScreen
                  onDone={handleSmsVerifyDone}
                  onBack={() => setStep("channel")}
                />
              )}
              {step === "smsConfirm" && (
                <SmsConfirmScreen userName={userName} onContinueWeb={handleSmsConfirmContinue} />
              )}
              {step === "appDownload" && (
                <AppDownloadScreen onContinueWeb={handleAppDownloadContinue} />
              )}
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  // ── Main steps with header chrome ──
  return (
    <>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <div className="modal-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white rounded-3xl w-[92vw] max-w-xl max-h-[82vh] overflow-hidden flex flex-col shadow-[0_20px_60px_rgba(0,0,0,0.1)] h-[min(640px,88vh)]"
        >
          {/* ── Header ── */}
          <div className="flex items-center px-5 pt-4 pb-2 shrink-0">
            {/* Back button — hidden on first main step (name) */}
            {isFirstMainStep ? (
              <div className="mr-auto w-12" />
            ) : (
              <button
                onClick={goBack}
                className="text-warm-gray hover:text-foreground text-[13px] font-medium cursor-pointer transition-colors mr-auto"
              >
                &larr; Back
              </button>
            )}
            <div className="flex-1">
              <ProgressDots current={dotIndex} total={TOTAL_DOTS} />
            </div>
            <button
              onClick={onClose}
              className="text-warm-gray hover:text-foreground transition-colors cursor-pointer ml-auto"
            >
              <X size={18} />
            </button>
          </div>

          {/* ── Screen Content ── */}
          <div className="flex-1 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === "name" && (
                  <NameInputScreen
                    userName={userName}
                    onNext={(name) => {
                      onUserData({ userName: name });
                      goTo("role");
                    }}
                  />
                )}
                {step === "role" && (
                  <RoleScreen
                    userName={userName}
                    savedRole={role}
                    onNext={(selectedRole) => {
                      onUserData({ role: selectedRole });
                      goTo("payment");
                    }}
                  />
                )}
                {step === "payment" && (
                  <PaymentScreen onNext={() => goTo("channel")} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
}
