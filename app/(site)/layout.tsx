import type { ReactNode } from "react";
import { JsonLd } from "@/components/json-ld";
import { SiteHeader } from "@/components/site-header";
import { personJsonLd, websiteJsonLd } from "@/lib/seo";

export default function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd data={personJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <div className="grain" aria-hidden="true" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-bg focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
    </>
  );
}
