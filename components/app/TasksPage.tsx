"use client";

import { Circle, CheckCircle2, Clock } from "lucide-react";

const tasks = [
  {
    title: "Set up morning briefing",
    status: "active" as const,
    description: "Configure weather, calendar, and news sources",
    due: "Today",
  },
  {
    title: "Research AI productivity tools",
    status: "active" as const,
    description: "Find top 5 tools for workflow automation",
    due: "Tomorrow",
  },
  {
    title: "Create weekly summary template",
    status: "completed" as const,
    description: "Design a reusable report format",
    due: "Mar 8",
  },
  {
    title: "Onboarding flow completed",
    status: "completed" as const,
    description: "Set up PandaClaw companion preferences",
    due: "Mar 9",
  },
  {
    title: "Plan Q2 goals",
    status: "pending" as const,
    description: "Draft personal and professional goals",
    due: "Mar 15",
  },
];

const statusConfig = {
  active: {
    icon: <Clock size={18} className="text-accent" />,
    label: "In Progress",
    bg: "bg-accent-light",
    text: "text-accent",
  },
  completed: {
    icon: <CheckCircle2 size={18} className="text-green-600" />,
    label: "Completed",
    bg: "bg-green-50",
    text: "text-green-700",
  },
  pending: {
    icon: <Circle size={18} className="text-warm-gray" />,
    label: "Pending",
    bg: "bg-cream-dark/50",
    text: "text-warm-gray",
  },
};

export default function TasksPage() {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-8 mb-16 md:mb-0">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-[32px] font-medium mb-1">Tasks</h1>
        <p className="text-warm-gray text-[14px] mb-8">
          Your active and completed tasks
        </p>

        <div className="space-y-3">
          {tasks.map((task) => {
            const config = statusConfig[task.status];
            return (
              <div
                key={task.title}
                className="bg-white border border-cream-dark rounded-2xl p-4 hover:border-accent/30 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">{config.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={`text-[15px] font-semibold ${
                          task.status === "completed"
                            ? "line-through text-warm-gray"
                            : "text-foreground"
                        }`}
                      >
                        {task.title}
                      </h3>
                      <span
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.text} whitespace-nowrap`}
                      >
                        {config.label}
                      </span>
                    </div>
                    <p className="text-[13px] text-warm-gray mt-0.5">
                      {task.description}
                    </p>
                    <p className="text-[11px] text-warm-gray-light mt-1">
                      Due: {task.due}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
