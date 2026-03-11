"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PandaAvatar from "../PandaAvatar";
import TaskCard from "../TaskCard";

const tasks = [
  { icon: "01", label: "Set up your morning briefing" },
  { icon: "02", label: "Summarize something for me" },
  { icon: "03", label: "Plan a goal together" },
  { icon: "04", label: "Just have a conversation" },
];

export default function QuickstartScreen({ userName }: { userName: string }) {
  const router = useRouter();
  const [chosen, setChosen] = useState<string | null>(null);

  if (chosen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <PandaAvatar size={100} animate className="mb-8 animate-fade-up" />

        <h2 className="font-serif text-[36px] md:text-[42px] font-medium leading-tight mb-4 animate-fade-up" style={{ animationDelay: "200ms" }}>
          You&apos;re all set,
          <br />
          <span className="italic text-accent">{userName}</span>
        </h2>

        <p
          className="text-warm-gray text-[16px] mb-12 max-w-[300px] animate-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          Your Claw is ready. Let&apos;s begin.
        </p>

        <button
          onClick={() => router.push("/app")}
          className="btn-primary text-[16px] px-12 py-4 animate-fade-up"
          style={{ animationDelay: "600ms" }}
        >
          Enter PandaClaw &rarr;
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <PandaAvatar size={72} className="mb-6 animate-fade-up" />

      <h2 className="font-serif text-[28px] font-medium mb-2 text-center animate-fade-up" style={{ animationDelay: "100ms" }}>
        Where shall we start?
      </h2>
      <p className="text-warm-gray text-[14px] mb-10 text-center animate-fade-up" style={{ animationDelay: "200ms" }}>
        Pick something to try together
      </p>

      <div className="flex flex-col gap-3 w-full max-w-sm stagger-children">
        {tasks.map((task) => (
          <TaskCard
            key={task.label}
            icon={task.icon}
            label={task.label}
            onClick={() => setChosen(task.label)}
          />
        ))}
      </div>
    </div>
  );
}
