import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zahlier — Curated Fashion Marketplace",
  description: "Discover unique pieces from independent fashion designers. Handcrafted, ethically made, story-driven.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" style={{ background: 'var(--color-off-white)' }}>
        {children}
      </body>
    </html>
  );
}
