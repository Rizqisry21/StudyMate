import type { Metadata } from "next";
import "./globals.css";
import "./scroll-story.css";
import "./cinematic.css";

export const metadata: Metadata = {
  title: "StudyMate — Find. Connect. Learn Together.",
  description: "Find students who match your subjects, schedule, study style, and learning goals. Your next study partner is out there.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
