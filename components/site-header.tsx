"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [active, setActive] = useState("");
  const home = pathname === "/";

  useEffect(() => {
    if (!home) return;

    const sections = nav
      .map((item) => document.querySelector(item.href))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [home]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[rgb(12_13_11/0.92)] backdrop-blur-[6px]">
      <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-[0.9rem]">
        <a
          href={home ? "#top" : "/"}
          className="flex shrink-0 items-baseline gap-3 text-[16px] text-fg no-underline"
        >
          <span className="font-pixel-mono inline-block border border-signal px-[0.4rem] py-[0.1rem] leading-none text-signal">
            {site.shortName}
          </span>
          <span>{site.name}</span>
        </a>
        <nav
          aria-label="Primary"
          className="font-pixel-mono flex flex-wrap items-center gap-x-6 gap-y-[0.35rem] text-[16px] leading-none tracking-[1px] uppercase"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={home ? item.href : `/${item.href}`}
              data-active={home && active === item.href}
              className="py-[0.7rem] text-muted no-underline transition-colors duration-300 hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
