import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";

export const metadata: Metadata = {
  title: "Must See Georgia — Boutique Travel Experiences",
  description:
    "Experience curated tours across Georgia with Must See Georgia. Discover itineraries, stories, and bespoke journeys crafted for modern travelers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}
