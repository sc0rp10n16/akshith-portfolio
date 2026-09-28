import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Not found",
  description: "This address does not match a page on Akshith Mysa's site.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main
        id="main"
        className="mx-auto max-w-[88rem] px-[clamp(1.25rem,4vw,3rem)] pt-[clamp(4rem,9vw,8rem)] pb-24"
      >
        <p className="kicker kicker-signal mb-3">404</p>
        <h1 className="m-0 max-w-[16ch] text-[clamp(40px,6vw,72px)] font-bold leading-[1.05]">
          This page is not here.
        </h1>
        <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.8] text-muted">
          The address does not match a page on this site.
        </p>
        <Link href="/" className="btn btn-fill mt-10">
          Back home <span>→</span>
        </Link>
      </main>
    </>
  );
}
