"use client";

import { useEffect, useState } from "react";
import CRTWarp from "@/components/ui/crt-wrap";

export function HeroCrt() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPaused(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <CRTWarp
      color="#7eb4ff"
      backgroundColor="#0c0d0b"
      speed={0.35}
      curvature={0.22}
      scanlineStrength={0.18}
      scanlineFrequency={160}
      waveAmplitude={0.22}
      waveFrequency={2}
      bloom={1.05}
      bloomRadius={1}
      noise={0.07}
      vignette={0.4}
      brightness={1.05}
      pixelation={1}
      rgbShift={0.01}
      mouseReact
      mouseStrength={0.4}
      dpr={1}
      fps={30}
      paused={paused}
      className="h-full w-full"
    />
  );
}
