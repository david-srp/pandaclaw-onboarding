"use client";

import PandaAvatar from "../PandaAvatar";
import SpeechBubble from "../SpeechBubble";

export default function PersonaChoiceScreen({
  onCustomize,
  onSkip,
}: {
  onCustomize: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <PandaAvatar size={88} className="mb-5 animate-fade-up" />
      <SpeechBubble>
        Would you like to fine-tune your Claw&apos;s personality and appearance?
      </SpeechBubble>

      <div className="mt-12 flex flex-col gap-4 w-full max-w-sm stagger-children">
        <button
          onClick={onCustomize}
          className="card-elevated text-center px-6 py-6 cursor-pointer border-2 border-transparent hover:border-accent"
        >
          <span className="font-serif text-[22px] font-medium block mb-1">Yes, make it mine</span>
          <span className="text-warm-gray text-[14px]">Customize personality, avatar & voice</span>
        </button>

        <button
          onClick={onSkip}
          className="card-elevated text-center px-6 py-6 cursor-pointer"
        >
          <span className="font-serif text-[22px] font-medium block mb-1">Skip for now</span>
          <span className="text-warm-gray text-[14px]">Use the thoughtful defaults</span>
        </button>
      </div>
    </div>
  );
}
