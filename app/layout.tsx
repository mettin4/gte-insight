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
  metadataBase: new URL('https://insight.gte.xyz'),
  title: "GTE Insight - Real-time Analytics Dashboard",
  description: "Live analytics dashboard for GTE.xyz - Track tokens, trading volume, positions, and platform activity in real-time on the fastest decentralized trading venue.",
  keywords: ["GTE", "gte.xyz", "analytics", "dashboard", "DeFi", "trading", "perpetual", "swap", "tokens", "launchpad"],
  authors: [{ name: "GTE Community" }],
  creator: "GTE Community",
  publisher: "GTE.xyz",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://insight.gte.xyz",
    title: "GTE Insight - Real-time Analytics Dashboard",
    description: "Live analytics dashboard for GTE.xyz - Track tokens, trading volume, positions, and platform activity in real-time.",
    siteName: "GTE Insight",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GTE Insight Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GTE Insight - Real-time Analytics Dashboard",
    description: "Live analytics dashboard for GTE.xyz - Track tokens, trading volume, positions, and platform activity.",
    images: ["/og-image.png"],
    creator: "@gtexyz",
  },
};

export const viewport = {
  themeColor: "#FF7817",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
