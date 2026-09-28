import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import { indexableRobots } from "@/lib/seo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const pixelOperator = localFont({
  src: [
    {
      path: "./fonts/PixelOperator.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PixelOperator-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-pixel",
});

const pixelOperatorMono = localFont({
  src: [
    {
      path: "./fonts/PixelOperatorMono.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PixelOperatorMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-pixel-mono",
});

export const viewport: Viewport = {
  themeColor: "#0c0d0b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  category: "portfolio",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    "Akshith Mysa",
    "Klinn AI",
    "systems engineer",
    "semiconductor nanotechnologies",
    "OVGU Magdeburg",
    "autonomous ornithopter",
    "Edmissions World CRM",
  ],
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
  },
  robots: indexableRobots,
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={cn(
        "h-full",
        pixelOperator.variable,
        pixelOperatorMono.variable,
        jetbrainsMono.variable,
      )}
    >
      <body className="relative min-h-full bg-bg font-sans text-fg">{children}</body>
    </html>
  );
}
