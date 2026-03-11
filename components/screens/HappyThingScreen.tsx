"use client";

import { useState } from "react";
import PandaAvatar from "../PandaAvatar";
import SpeechBubble from "../SpeechBubble";

export default function HappyThingScreen({
  happyThing,
  onNext,
}: {
  happyThing: string;
  onNext: (thing: string) => void;
}) {
  const [thing, setThing] = useState(happyThing);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <PandaAvatar size={88} className="mb-5 animate-fade-up" />
      <SpeechBubble>
        Tell me something — a person, a place, a thing — that makes you feel wonderful.
      </SpeechBubble>

      <div className="mt-12 w-full max-w-sm animate-fade-up" style={{ animationDelay: "400ms" }}>
        <textarea
          value={thing}
          onChange={(e) => setThing(e.target.value)}
          placeholder="Something that makes you happy..."
          rows={4}
          className="textarea-editorial"
        />

        <button
          onClick={() => thing.trim() && onNext(thing.trim())}
          disabled={!thing.trim()}
          className="mt-8 w-full btn-primary"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
