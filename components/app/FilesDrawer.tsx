"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen,
  FileText,
  FileImage,
  Film,
  Globe,
  ChevronRight,
  PanelLeftClose,
} from "lucide-react";

interface FilesDrawerProps {
  open: boolean;
  onToggle: () => void;
}

const fileTree = [
  {
    name: "Projects",
    type: "folder" as const,
    children: [
      { name: "Morning Briefing", type: "file" as const },
      { name: "Weekly Summary", type: "file" as const },
    ],
  },
  {
    name: "Research",
    type: "folder" as const,
    children: [
      { name: "Market Analysis", type: "file" as const },
      { name: "Competitor Notes", type: "file" as const },
    ],
  },
];

const assets = [
  { name: "Q1 Report.pdf", icon: <FileText size={16} />, type: "Report" },
  { name: "Landing Page", icon: <Globe size={16} />, type: "Webpage" },
  { name: "Product Demo.mp4", icon: <Film size={16} />, type: "Video" },
  { name: "Brand Assets.zip", icon: <FileImage size={16} />, type: "Assets" },
];

export default function FilesDrawer({ open, onToggle }: FilesDrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:flex flex-col h-full bg-white border-r border-cream-dark overflow-hidden shrink-0"
        >
          <div className="flex items-center justify-between px-4 h-12 border-b border-cream-dark">
            <span className="text-[13px] font-semibold text-foreground tracking-wide uppercase">
              Files
            </span>
            <button
              onClick={onToggle}
              className="text-warm-gray hover:text-foreground transition-colors cursor-pointer"
            >
              <PanelLeftClose size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
            {/* File tree */}
            <div>
              <p className="text-[11px] font-semibold text-warm-gray uppercase tracking-wider mb-2 px-1">
                Workspace
              </p>
              {fileTree.map((folder) => (
                <div key={folder.name} className="mb-1">
                  <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[13px] font-medium text-foreground hover:bg-cream-dark/50 cursor-pointer transition-colors">
                    <FolderOpen size={15} className="text-accent shrink-0" />
                    <span>{folder.name}</span>
                    <ChevronRight size={12} className="ml-auto text-warm-gray-light" />
                  </div>
                  {folder.children.map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center gap-2 pl-7 pr-2 py-1.5 rounded-lg text-[13px] text-warm-gray hover:bg-cream-dark/50 hover:text-foreground cursor-pointer transition-colors"
                    >
                      <FileText size={14} className="shrink-0" />
                      <span>{file.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Assets */}
            <div>
              <p className="text-[11px] font-semibold text-warm-gray uppercase tracking-wider mb-2 px-1">
                Assets
              </p>
              <div className="space-y-0.5">
                {assets.map((asset) => (
                  <div
                    key={asset.name}
                    className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-[13px] hover:bg-cream-dark/50 cursor-pointer transition-colors group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-accent-light flex items-center justify-center text-accent shrink-0">
                      {asset.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-foreground font-medium truncate">
                        {asset.name}
                      </p>
                      <p className="text-[11px] text-warm-gray">{asset.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
