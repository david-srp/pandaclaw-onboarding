"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ProgressDots from "@/components/ProgressDots";
import SplashScreen from "@/components/screens/SplashScreen";
import ValuePropsScreen from "@/components/screens/ValuePropsScreen";
import GreetScreen from "@/components/screens/GreetScreen";
import NameRoleScreen from "@/components/screens/NameRoleScreen";
import RegisterScreen from "@/components/screens/RegisterScreen";
import InviteCodeScreen from "@/components/screens/InviteCodeScreen";
import NotificationPermScreen from "@/components/screens/NotificationPermScreen";
import IosPaywallScreen from "@/components/screens/IosPaywallScreen";
import SetupLoadingScreen from "@/components/screens/SetupLoadingScreen";
import AppHomeScreen from "@/components/screens/AppHomeScreen";

/*
  iOS Flow:
  1. Splash         — brand impression (auto)
  2. Hero           — visual demo + Get Started / Sign In
  3. Name + Role    — personalization (invest first)
  4. Register       — Apple / Google / Email
  5. Invite Code    — access gate
  6. Notifications  — push permission
  7. Paywall        — maximum commitment before asking for $$$
  8. Setup Loading  — "preparing your experience..."
  → Chat
*/

type Screen =
  | "splash"
  | "hero"
  | "greet"
  | "nameRole"
  | "register"
  | "inviteCode"
  | "notifications"
  | "paywall"
  | "setupLoading"
  | "appHome";

const SCREEN_ORDER: Screen[] = [
  "splash",
  "hero",
  "greet",
  "nameRole",
  "register",
  "inviteCode",
  "notifications",
  "paywall",
];

// Progress dots start from nameRole (index 0) through paywall (index 4)
function getStepIndex(screen: Screen): number {
  if (screen === "setupLoading") return 4;
  const idx = SCREEN_ORDER.indexOf(screen);
  return Math.max(0, idx - 3); // greet/hero/splash are before dots
}

const TOTAL_STEPS = 5;

const STORAGE_KEY = "pandaclaw-onboarding-ios";

interface OnboardingState {
  screen: Screen;
  userName: string;
  role: string;
}

const defaultState: OnboardingState = {
  screen: "splash",
  userName: "",
  role: "",
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
    if (state.screen === "setupLoading") {
      update({ screen: "paywall" });
      return;
    }
    if (state.screen === "nameRole") {
      // nameRole goes back to hero (skip greet)
      update({ screen: "hero" });
      return;
    }
    const idx = SCREEN_ORDER.indexOf(state.screen);
    if (idx > 3) {
      update({ screen: SCREEN_ORDER[idx - 1] });
    }
  }, [state.screen, update]);

  if (!loaded) return null;

  // Nav bar: only show for nameRole through notifications (NOT paywall)
  const showNav = !["splash", "hero", "greet", "paywall", "setupLoading", "appHome"].includes(state.screen);

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
          initial={{ opacity: 0, y: state.screen === "splash" ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: state.screen === "splash" ? 0 : -12 }}
          transition={{ duration: state.screen === "splash" ? 0.5 : 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 1. Splash */}
          {state.screen === "splash" && (
            <SplashScreen onDone={() => update({ screen: "hero" })} />
          )}

          {/* 2. Hero — visual demo + CTA */}
          {state.screen === "hero" && (
            <ValuePropsScreen
              onNext={() => update({ screen: "greet" })}
              onSignIn={() => update({ screen: "register" })}
            />
          )}

          {/* 3. Greet — panda says hi */}
          {state.screen === "greet" && (
            <GreetScreen onDone={() => update({ screen: "nameRole" })} />
          )}

          {/* 4. Name + Role — personalization first */}
          {state.screen === "nameRole" && (
            <NameRoleScreen
              onNext={(name, role) => update({ userName: name, role, screen: "register" })}
            />
          )}

          {/* 4. Register — Apple / Google / Email */}
          {state.screen === "register" && (
            <RegisterScreen onNext={() => update({ screen: "inviteCode" })} />
          )}

          {/* 5. Invite Code */}
          {state.screen === "inviteCode" && (
            <InviteCodeScreen onNext={() => update({ screen: "notifications" })} />
          )}

          {/* 6. Notifications */}
          {state.screen === "notifications" && (
            <NotificationPermScreen userName={state.userName} onNext={() => update({ screen: "paywall" })} />
          )}

          {/* 7. Paywall — last step before entering */}
          {state.screen === "paywall" && (
            <IosPaywallScreen
              onNext={() => update({ screen: "setupLoading" })}
              onDismiss={() => update({ screen: "setupLoading" })}
            />
          )}

          {/* 8. Setup Loading → App Home */}
          {state.screen === "setupLoading" && (
            <SetupLoadingScreen onDone={() => update({ screen: "appHome" })} />
          )}

          {/* 9. App Home — use cases + paywall re-trigger */}
          {state.screen === "appHome" && (
            <AppHomeScreen userName={state.userName} role={state.role} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
