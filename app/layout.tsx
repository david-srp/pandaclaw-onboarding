import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PandaClaw — Your AI Companion",
  description: "Meet your personal Claw — open-box ready, always proactive, uniquely yours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
