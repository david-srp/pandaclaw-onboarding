"use client";

import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from "react";

/* ── Types ── */
export type OnboardingStep = "inviteCode" | "name" | "role" | "payment" | "channel" | "smsVerify" | "smsConfirm" | "appDownload" | "loading";

export interface OnboardingState {
  isLoggedIn: boolean;
  onboardingComplete: boolean;
  onboardingStep: OnboardingStep;
  userName: string;
  role: string;
  channels: string[];
  showOnboardingModal: boolean;
}

type Action =
  | { type: "SET"; payload: Partial<OnboardingState> }
  | { type: "RESET" };

const STORAGE_KEY = "pandaclaw-web-onboarding";

const defaultState: OnboardingState = {
  isLoggedIn: false,
  onboardingComplete: false,
  onboardingStep: "inviteCode",
  userName: "",
  role: "",
  channels: [],
  showOnboardingModal: false,
};

function reducer(state: OnboardingState, action: Action): OnboardingState {
  switch (action.type) {
    case "SET":
      return { ...state, ...action.payload };
    case "RESET":
      return defaultState;
    default:
      return state;
  }
}

/* ── Context ── */
interface OnboardingContextValue {
  state: OnboardingState;
  update: (payload: Partial<OnboardingState>) => void;
  reset: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, defaultState, () => {
    // Always start fresh on page load / refresh
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    return defaultState;
  });

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      const { showOnboardingModal: _, ...persist } = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
    } catch {}
  }, [state]);

  const update = useCallback((payload: Partial<OnboardingState>) => {
    dispatch({ type: "SET", payload });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <OnboardingContext.Provider value={{ state, update, reset }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
