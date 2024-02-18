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
        <div className="w-screen h-dvh">
          <div className="flex flex-col h-full p-4">
            <header className="text-white">
              <nav className="p-4 flex gap-8">
                <Link className="font-semibold text-[15px]" href="/">
                  Home
                </Link>
                <Link className="font-semibold text-[15px]" href="/inspiration">
                  Inspiration
                </Link>
                <Link className="font-semibold text-[15px]" href="/bookmarks">
                  Bookmarks
                </Link>
              </nav>
            </header>
            <div className="grow">{children}</div>
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
