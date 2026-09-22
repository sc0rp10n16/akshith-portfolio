import type { ReactNode } from "react";
import Link from "next/link";
import { logoutStudio } from "@/app/studio/actions";

export function StudioChrome({
  title,
  children,
}: {
  title?: string;
  children?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 border-b border-line bg-[rgb(12_13_11/0.94)] px-[clamp(1.25rem,4vw,2rem)] py-3 backdrop-blur-[6px]">
      <div className="flex items-baseline gap-3">
        <Link
          href="/studio/resumes"
          className="font-pixel-mono text-[16px] tracking-[1px] text-signal uppercase no-underline"
        >
          Studio
        </Link>
        {title ? <span className="text-muted">{title}</span> : null}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {children}
        <form action={logoutStudio}>
          <button className="btn btn-ghost" type="submit">
            Lock
          </button>
        </form>
      </div>
    </header>
  );
}
