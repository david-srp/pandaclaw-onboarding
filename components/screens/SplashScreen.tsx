"use client";

import { useEffect } from "react";

export default function SplashScreen({
  onDone,
}: {
  onDone: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="flex items-center justify-center min-h-screen px-6">
      <img
        src="https://gimg.iminsp.com/cdn-cgi/image/width=400,quality=70,format=webp,fit=scale-down/shared_images/20260318/a2e9a59b-85a4-4e1e-8197-2f4ffbd63c62.gif"
        alt="Loading"
        className="w-48 h-48 object-contain animate-fade-up"
      />
    </div>
  );
}
