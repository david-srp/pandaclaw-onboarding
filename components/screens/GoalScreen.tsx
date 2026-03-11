"use client";

import { useState } from "react";
import PandaAvatar from "../PandaAvatar";
import SpeechBubble from "../SpeechBubble";

export default function GoalScreen({
  userName,
  onNext,
}: {
  userName: string;
  onNext: (goal: string) => void;
}) {
  const [goal, setGoal] = useState("");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <PandaAvatar size={72} className="mb-5 animate-fade-up" />
      <SpeechBubble>How can I best help you, {userName}?</SpeechBubble>

      <div className="mt-12 w-full max-w-sm animate-fade-up" style={{ animationDelay: "400ms" }}>
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Help me stay on top of work, remind me of important dates, be my daily briefing..."
          rows={5}
          className="textarea-editorial"
        />

        <button
          onClick={() => goal.trim() && onNext(goal.trim())}
          disabled={!goal.trim()}
          className="mt-8 w-full btn-primary"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
