"use client";

import { useState, useEffect } from "react";
import Sidebar, { type Tab } from "@/components/app/Sidebar";
import BottomNav from "@/components/app/BottomNav";
import FilesDrawer from "@/components/app/FilesDrawer";
import ChatArea from "@/components/app/ChatArea";
import TasksPage from "@/components/app/TasksPage";
import DiaryPage from "@/components/app/DiaryPage";
import ProfilePage from "@/components/app/ProfilePage";

const STORAGE_KEY = "pandaclaw-onboarding";

export default function AppPage() {
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filesOpen, setFilesOpen] = useState(true);
  const [chosenTask, setChosenTask] = useState("Set up your morning briefing");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.chosenTask) setChosenTask(data.chosenTask);
      }
    } catch {}
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-cream">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

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
          chosenTask={chosenTask}
        />
      )}
      {activeTab === "tasks" && <TasksPage />}
      {activeTab === "diary" && <DiaryPage />}
      {activeTab === "profile" && <ProfilePage />}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
