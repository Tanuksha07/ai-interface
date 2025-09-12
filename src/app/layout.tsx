import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Interface Prototype",
  description: "Frontend prototype of an AI chat interface with models, theme toggle, and templates.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Get persisted theme from localStorage
  const theme = typeof window !== "undefined" ? localStorage.getItem("theme") : "light";

  return (
    <html lang="en" className={theme === "dark" ? "dark" : ""}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
