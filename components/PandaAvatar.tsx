"use client";

export default function PandaAvatar({
  size = 120,
  className = "",
  animate = false,
}: {
  size?: number;
  className?: string;
  animate?: boolean;
}) {
  return (
    <div
      className={`relative ${animate ? "animate-float" : ""} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Warm glow behind */}
        <circle cx="100" cy="105" r="70" fill="#D4714E" opacity="0.06" />

        {/* Body */}
        <ellipse cx="100" cy="120" rx="52" ry="48" fill="#1a1a17" opacity="0.9" />

        {/* Face */}
        <circle cx="100" cy="95" r="48" fill="#FAF7F2" stroke="#1a1a17" strokeWidth="2.5" />

        {/* Ears */}
        <circle cx="62" cy="58" r="18" fill="#1a1a17" />
        <circle cx="62" cy="58" r="10" fill="#D4714E" opacity="0.35" />
        <circle cx="138" cy="58" r="18" fill="#1a1a17" />
        <circle cx="138" cy="58" r="10" fill="#D4714E" opacity="0.35" />

        {/* Eye patches */}
        <ellipse cx="78" cy="88" rx="16" ry="14" fill="#1a1a17" transform="rotate(-8 78 88)" />
        <ellipse cx="122" cy="88" rx="16" ry="14" fill="#1a1a17" transform="rotate(8 122 88)" />

        {/* Eyes */}
        <circle cx="80" cy="87" r="5" fill="#FAF7F2" />
        <circle cx="81" cy="86" r="2" fill="#FAF7F2" opacity="0.6" />
        <circle cx="120" cy="87" r="5" fill="#FAF7F2" />
        <circle cx="121" cy="86" r="2" fill="#FAF7F2" opacity="0.6" />

        {/* Nose */}
        <ellipse cx="100" cy="100" rx="5" ry="3.5" fill="#1a1a17" />

        {/* Gentle smile */}
        <path
          d="M90 106 Q100 114 110 106"
          stroke="#1a1a17"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Blush marks */}
        <circle cx="70" cy="100" r="6" fill="#D4714E" opacity="0.18" />
        <circle cx="130" cy="100" r="6" fill="#D4714E" opacity="0.18" />

        {/* Paws */}
        <ellipse cx="68" cy="148" rx="14" ry="10" fill="#1a1a17" />
        <ellipse cx="132" cy="148" rx="14" ry="10" fill="#1a1a17" />
      </svg>
    </div>
  );
}
