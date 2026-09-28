import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `About ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;
export const runtime = "nodejs";

export default function Image() {
  return renderOgImage({
    eyebrow: "About",
    title: "Where I have been",
    description: `${site.name} is co-founder and CTO of Klinn AI, and a Master's student in Advanced Semiconductor Nanotechnologies at OVGU Magdeburg.`,
    showPortrait: true,
  });
}
