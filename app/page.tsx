"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProgressDots from "@/components/ProgressDots";
import LandingScreen from "@/components/screens/LandingScreen";
import RegisterScreen from "@/components/screens/RegisterScreen";
import NameInputScreen from "@/components/screens/NameInputScreen";
import HappyThingScreen from "@/components/screens/HappyThingScreen";
import PersonaChoiceScreen from "@/components/screens/PersonaChoiceScreen";
import PersonaDetailScreen from "@/components/screens/PersonaDetailScreen";
import LoadingScreen from "@/components/screens/LoadingScreen";
import NameRevealScreen from "@/components/screens/NameRevealScreen";
import ChannelScreen from "@/components/screens/ChannelScreen";
import GoalScreen from "@/components/screens/GoalScreen";
import QuickstartScreen from "@/components/screens/QuickstartScreen";

type Screen =
  | "landing"
  | "register"
  | "nameInput"
  | "happyThing"
  | "personaChoice"
  | "personaDetail"
  | "loading"
  | "nameReveal"
  | "channel"
  | "goal"
  | "quickstart";

const SCREEN_ORDER: Screen[] = [
  "landing",
  "register",
  "nameInput",
  "happyThing",
  "personaChoice",
  "personaDetail",
  "loading",
  "nameReveal",
  "channel",
  "goal",
  "quickstart",
];

function getStepIndex(screen: Screen): number {
  const idx = SCREEN_ORDER.indexOf(screen);
  return idx <= 0 ? 0 : idx - 1;
}

const STORAGE_KEY = "pandaclaw-onboarding";

interface OnboardingState {
  screen: Screen;
  userName: string;
  happyThing: string;
  clawName: string;
  channels: string[];
  goal: string;
  traits: string[];
  avatarDesc: string;
  voice: string;
}

const defaultState: OnboardingState = {
  screen: "landing",
  userName: "",
  happyThing: "",
  clawName: "",
  channels: [],
  goal: "",
  traits: [],
  avatarDesc: "",
  voice: "",
};

export default function Home() {
  const [state, setState] = useState<OnboardingState>(defaultState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setState({ ...defaultState, ...JSON.parse(saved) });
      }
    } catch {}
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
    const idx = SCREEN_ORDER.indexOf(state.screen);
    if (idx > 0) {
      let prevIdx = idx - 1;
      if (SCREEN_ORDER[prevIdx] === "personaDetail" && state.traits.length === 0) {
        prevIdx--;
      }
      update({ screen: SCREEN_ORDER[prevIdx] });
    }
  }, [state.screen, state.traits.length, update]);

  if (!loaded) return null;

  const showNav = state.screen !== "landing";

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
              <ProgressDots current={getStepIndex(state.screen)} />
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
            <RegisterScreen onNext={() => update({ screen: "nameInput" })} />
          )}
          {state.screen === "nameInput" && (
            <NameInputScreen
              userName={state.userName}
              onNext={(name) => update({ userName: name, screen: "happyThing" })}
            />
          )}
          {state.screen === "happyThing" && (
            <HappyThingScreen
              happyThing={state.happyThing}
              onNext={(thing) => update({ happyThing: thing, screen: "personaChoice" })}
            />
          )}
          {state.screen === "personaChoice" && (
            <PersonaChoiceScreen
              onCustomize={() => update({ screen: "personaDetail" })}
              onSkip={() => update({ screen: "loading" })}
            />
          )}
          {state.screen === "personaDetail" && (
            <PersonaDetailScreen
              happyThing={state.happyThing}
              onNext={(data) =>
                update({
                  traits: data.traits,
                  avatarDesc: data.avatarDesc,
                  voice: data.voice,
                  screen: "loading",
                })
              }
            />
          )}
          {state.screen === "loading" && (
            <LoadingScreen onDone={() => update({ screen: "nameReveal" })} />
          )}
          {state.screen === "nameReveal" && (
            <NameRevealScreen
              userName={state.userName}
              happyThing={state.happyThing}
              onNext={(name) => update({ clawName: name, screen: "channel" })}
            />
          )}
          {state.screen === "channel" && (
            <ChannelScreen
              onNext={(channels) => update({ channels, screen: "goal" })}
            />
          )}
          {state.screen === "goal" && (
            <GoalScreen
              userName={state.userName}
              onNext={(goal) => update({ goal, screen: "quickstart" })}
            />
          )}
          {state.screen === "quickstart" && (
            <QuickstartScreen userName={state.userName} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
