"use client";

const TOTAL_STEPS = 10;

export default function ProgressDots({ current }: { current: number }) {
  return (
    <div className="flex gap-[6px] justify-center py-4">
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          className="h-[3px] rounded-full transition-all duration-500 ease-out"
          style={{
            width: i === current ? 24 : 8,
            backgroundColor:
              i === current
                ? "var(--accent)"
                : i < current
                ? "var(--accent)"
                : "var(--cream-dark)",
            opacity: i < current ? 0.4 : 1,
          }}
        />
      ))}
    </div>
  );
}
