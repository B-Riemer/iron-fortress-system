import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { BootSequence } from "@/components/global/boot-sequence";
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
  title: "IRON_FORTRESS | Elite Military Fitness",
  description: "High-performance military fitness platform. Forge your legacy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-zinc-950 text-zinc-200 antialiased selection:bg-emerald-500/30`}
      >
        <BootSequence />
        {children}
      </body>
    </html>
  );
}
