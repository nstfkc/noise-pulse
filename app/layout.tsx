import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stellar Backgrounds",
  description:
    "Create stellar backgrounds with gradient colors and noise for your next project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <header className="fixed">
          <nav className="p-4 flex gap-4">
            <Link href="/inspiration">Inspiration</Link>
            <Link href="/bookmarks">Bookmarks</Link>
          </nav>
        </header>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
