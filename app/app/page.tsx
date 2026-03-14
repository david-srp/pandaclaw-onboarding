"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Sidebar, { type Tab } from "@/components/app/Sidebar";
import BottomNav from "@/components/app/BottomNav";
import FilesDrawer from "@/components/app/FilesDrawer";
import ChatArea from "@/components/app/ChatArea";
import TasksPage from "@/components/app/TasksPage";
import DiaryPage from "@/components/app/DiaryPage";
import ProfilePage from "@/components/app/ProfilePage";
import WelcomePage from "@/components/app/WelcomePage";
import OnboardingModal from "@/components/app/OnboardingModal";
import { useOnboarding } from "@/lib/onboarding-store";

export default function AppPage() {
  const { state, update } = useOnboarding();
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filesOpen, setFilesOpen] = useState(true);

  // Auto-open invite code modal on first visit
  useEffect(() => {
    if (!state.onboardingComplete && state.onboardingStep === "inviteCode" && !state.showOnboardingModal) {
      update({ showOnboardingModal: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStartOnboarding = useCallback(() => {
    update({ showOnboardingModal: true });
  }, [update]);

  // Called by WelcomePage after the loading animation completes
  const handleSetupComplete = useCallback(() => {
    update({ onboardingComplete: true });
  }, [update]);

  // Steps at or past channel — payment is done
  const POST_PAYMENT_STEPS = ["channel", "smsVerify", "smsConfirm", "appDownload"];

  // Close modal. Post-payment: go to Welcome page "finalizing" state.
  const handleOnboardingClose = useCallback(() => {
    if (POST_PAYMENT_STEPS.includes(state.onboardingStep)) {
      // Already paid — default to web channel, close modal, show loading on Welcome page
      update({
        showOnboardingModal: false,
        channels: state.channels.length > 0 ? state.channels : ["web"],
        onboardingStep: "loading",
      });
    } else {
      update({ showOnboardingModal: false });
    }
  }, [update, state.onboardingStep, state.channels]);

  // Called by modal when user completes all steps normally (smsConfirm/appDownload/web continue)
  // Closes modal and triggers Welcome page loading state
  const handleFinalize = useCallback(() => {
    update({
      showOnboardingModal: false,
      onboardingStep: "loading",
    });
  }, [update]);

  // Only advance the persisted step — never regress (so Back in modal doesn't lose progress)
  const STEP_ORDER: typeof state.onboardingStep[] = [
    "inviteCode", "name", "role", "payment", "channel",
    "smsVerify", "smsConfirm", "appDownload", "loading",
  ];

  const handleStepChange = useCallback(
    (step: typeof state.onboardingStep) => {
      const currentIdx = STEP_ORDER.indexOf(state.onboardingStep);
      const nextIdx = STEP_ORDER.indexOf(step);
      if (nextIdx > currentIdx) {
        update({ onboardingStep: step });
      }
    },
    [update, state.onboardingStep]
  );

  const handleUserData = useCallback(
    (data: { userName?: string; role?: string; channels?: string[] }) => {
      update(data);
    },
    [update]
  );

  return (
    <div className="flex h-screen overflow-hidden bg-cream">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        userName={state.userName}
      />

      {/* ── Main Content Area ── */}
      {state.onboardingComplete ? (
        <>
          {activeTab === "chat" && (
            <FilesDrawer
              open={filesOpen}
              onToggle={() => setFilesOpen(!filesOpen)}
            />
          )}
          {activeTab === "chat" && (
            <ChatArea
              onToggleFiles={() => setFilesOpen(!filesOpen)}
              filesOpen={filesOpen}
              chosenTask=""
            />
          )}
          {activeTab === "schedule" && <TasksPage />}
          {activeTab === "identity" && <DiaryPage />}
          {activeTab === "profile" && <ProfilePage />}
        </>
      ) : (
        <WelcomePage
          userName={state.userName}
          onboardingStep={state.onboardingStep}
          onStartOnboarding={handleStartOnboarding}
          onSetupComplete={handleSetupComplete}
        />
      )}

      {/* ── Onboarding Modal ── */}
      <AnimatePresence>
        {state.showOnboardingModal && (
          <OnboardingModal
            initialStep={state.onboardingStep}
            userName={state.userName}
            role={state.role}
            onStepChange={handleStepChange}
            onUserData={handleUserData}
            onFinalize={handleFinalize}
            onClose={handleOnboardingClose}
          />
        )}
      </AnimatePresence>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
