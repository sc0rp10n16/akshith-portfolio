"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";

function navIsActive(pathname: string, href: string) {
  if (href === "/about") {
    return pathname === "/about";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[rgb(12_13_11/0.92)] backdrop-blur-[6px]">
      <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-[0.9rem]">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3 text-[16px] text-fg no-underline"
        >
          <Image
            src="/sprite.png"
            alt=""
            width={32}
            height={75}
            unoptimized
            className="pixel-sprite h-8 w-auto"
          />
          <span>{site.name}</span>
        </Link>
        <nav
          aria-label="Primary"
          className="font-pixel-mono flex flex-wrap items-center gap-x-6 gap-y-[0.35rem] text-[16px] leading-none tracking-[1px] uppercase"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={navIsActive(pathname, item.href)}
              className="py-[0.7rem] text-muted no-underline transition-colors duration-300 hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
