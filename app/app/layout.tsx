import { OnboardingProvider } from "@/lib/onboarding-store";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}
