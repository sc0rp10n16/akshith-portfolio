"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

function formatMagdeburg(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(date);
}

export function BerlinClock({ className }: { className?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(formatMagdeburg(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {time || "——:——"}
    </span>
  );
}
