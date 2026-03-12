"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ProgressDots from "@/components/ProgressDots";
import LandingScreen from "@/components/screens/LandingScreen";
import RegisterScreen from "@/components/screens/RegisterScreen";
import NameInputScreen from "@/components/screens/NameInputScreen";
import RoleScreen from "@/components/screens/RoleScreen";
import ChannelScreen from "@/components/screens/ChannelScreen";
import AppDownloadScreen from "@/components/screens/AppDownloadScreen";
import SmsVerifyScreen from "@/components/screens/SmsVerifyScreen";
import SetupLoadingScreen from "@/components/screens/SetupLoadingScreen";
import InviteCodeScreen from "@/components/screens/InviteCodeScreen";
import PaymentScreen from "@/components/screens/PaymentScreen";
import EndingScreen from "@/components/screens/EndingScreen";

type Screen =
  | "landing"
  | "register"
  | "inviteCode"
  | "nameInput"
  | "role"
  | "payment"
  | "channel"
  | "appDownload"
  | "smsVerify"
  | "setupLoading"
  | "ending";

const SCREEN_ORDER: Screen[] = [
  "landing",
  "register",
  "inviteCode",
  "nameInput",
  "role",
  "payment",
  "channel",
];

function getStepIndex(screen: Screen): number {
  if (["appDownload", "smsVerify", "setupLoading", "ending"].includes(screen)) {
    return SCREEN_ORDER.length - 2;
  }
  const idx = SCREEN_ORDER.indexOf(screen);
  return idx <= 0 ? 0 : idx - 1;
}

const TOTAL_STEPS = SCREEN_ORDER.length - 1;

const STORAGE_KEY = "pandaclaw-onboarding";

interface OnboardingState {
  screen: Screen;
  userName: string;
  role: string;
  channels: string[];
}

const defaultState: OnboardingState = {
  screen: "landing",
  userName: "",
  role: "",
  channels: [],
};

export default function Home() {
  const router = useRouter();
  const [state, setState] = useState<OnboardingState>(defaultState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    localStorage.removeItem(STORAGE_KEY);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, loaded]);

  const update = useCallback((partial: Partial<OnboardingState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  const goBack = useCallback(() => {
    if (["appDownload", "smsVerify", "setupLoading", "ending"].includes(state.screen)) {
      update({ screen: "channel" });
      return;
    }
    const idx = SCREEN_ORDER.indexOf(state.screen);
    if (idx > 0) {
      update({ screen: SCREEN_ORDER[idx - 1] });
    }
  }, [state.screen, update]);

  const handleChannelSelect = useCallback(
    (channel: string) => {
      if (channel === "app") {
        update({ channels: [channel], screen: "appDownload" });
      } else if (channel === "sms") {
        update({ channels: [channel], screen: "smsVerify" });
      } else {
        update({ channels: [channel], screen: "setupLoading" });
      }
    },
    [update]
  );

  if (!loaded) return null;

  const showNav = state.screen !== "landing" && state.screen !== "setupLoading" && state.screen !== "ending";

  return (
    <div className="relative min-h-screen">
      {showNav && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md">
          <div className="max-w-md mx-auto flex items-center px-5 pt-3">
            <button
              onClick={goBack}
              className="text-warm-gray hover:text-foreground text-[13px] font-medium tracking-wide cursor-pointer mr-auto transition-colors"
            >
              &larr; Back
            </button>
            <div className="flex-1">
              <ProgressDots current={getStepIndex(state.screen)} total={TOTAL_STEPS} />
            </div>
            <div className="w-12" />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={state.screen}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {state.screen === "landing" && (
            <LandingScreen onNext={() => update({ screen: "register" })} />
          )}
          {state.screen === "register" && (
            <RegisterScreen onNext={() => update({ screen: "inviteCode" })} />
          )}
          {state.screen === "inviteCode" && (
            <InviteCodeScreen onNext={() => update({ screen: "nameInput" })} />
          )}
          {state.screen === "nameInput" && (
            <NameInputScreen
              userName={state.userName}
              onNext={(name) => update({ userName: name, screen: "role" })}
            />
          )}
          {state.screen === "role" && (
            <RoleScreen
              userName={state.userName}
              onNext={(role) => update({ role, screen: "payment" })}
            />
          )}
          {state.screen === "payment" && (
            <PaymentScreen onNext={() => update({ screen: "channel" })} />
          )}
          {state.screen === "channel" && (
            <ChannelScreen onNext={handleChannelSelect} />
          )}
          {state.screen === "appDownload" && (
            <AppDownloadScreen onBack={() => update({ screen: "channel" })} />
          )}
          {state.screen === "smsVerify" && (
            <SmsVerifyScreen
              onDone={() => update({ screen: "ending" })}
              onBack={() => update({ screen: "channel" })}
            />
          )}
          {state.screen === "setupLoading" && (
            <SetupLoadingScreen onDone={() => update({ screen: "ending" })} />
          )}
          {state.screen === "ending" && (
            <EndingScreen
              userName={state.userName}
              channel={state.channels[0] || "web"}
              onStart={() => router.push("/app")}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
