"use client";

export default function ValuePropsScreen({
  onNext,
  onSignIn,
}: {
  onNext: () => void;
  onSignIn: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 pt-10 pb-10">
      {/* Center: GIF visual */}
      <div className="flex-1 flex items-center justify-center w-full">
        <img
          src="https://gimg.iminsp.com/cdn-cgi/image/width=400,quality=70,format=webp,fit=scale-down/shared_images/20260318/2f06172c-4c92-441f-9a74-e43ef04572c9.gif"
          alt="PandaClaw"
          className="w-64 h-64 object-contain animate-fade-up"
        />
      </div>

      {/* Bottom: CTA area */}
      <div className="w-full max-w-sm flex flex-col items-center">
        <h1
          className="text-[28px] leading-[1.15] font-semibold text-center tracking-tight mb-8 animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          Welcome to PandaClaw
        </h1>

        <button
          onClick={onNext}
          className="w-full btn-primary text-[16px] py-[16px] animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          Get Started
        </button>
        <button
          onClick={onSignIn}
          className="w-full mt-3 btn-secondary text-[15px] py-[14px] animate-fade-up"
          style={{ animationDelay: "380ms" }}
        >
          Already have an account? Log in
        </button>
      </div>
    </div>
  );
}
