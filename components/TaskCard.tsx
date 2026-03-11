"use client";

export default function TaskCard({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="card-elevated flex items-center gap-4 w-full px-6 py-5 text-left cursor-pointer group"
    >
      <span className="text-2xl transition-transform duration-300 group-hover:scale-110">{icon}</span>
      <span className="text-foreground font-medium text-[15px]">{label}</span>
      <span className="ml-auto text-warm-gray-light group-hover:text-accent transition-colors text-sm">
        &rarr;
      </span>
    </button>
  );
}
