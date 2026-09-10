import type { Metadata } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

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

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", pixelOperator.variable, pixelOperatorMono.variable, jetbrainsMono.variable)}
    >
      <body className="relative min-h-full bg-bg font-sans text-fg">
        <div className="grain" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
