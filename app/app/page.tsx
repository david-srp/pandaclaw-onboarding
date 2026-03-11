"use client";

import { useState } from "react";
import Sidebar, { type Tab } from "@/components/app/Sidebar";
import BottomNav from "@/components/app/BottomNav";
import FilesDrawer from "@/components/app/FilesDrawer";
import ChatArea from "@/components/app/ChatArea";
import TasksPage from "@/components/app/TasksPage";
import DiaryPage from "@/components/app/DiaryPage";
import ProfilePage from "@/components/app/ProfilePage";

export default function AppPage() {
  const [activeTab, setActiveTab] = useState<Tab>("chat");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filesOpen, setFilesOpen] = useState(true);

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
          chosenTask=""
        />
      )}
      {activeTab === "tasks" && <TasksPage />}
      {activeTab === "diary" && <DiaryPage />}
      {activeTab === "profile" && <ProfilePage />}

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
