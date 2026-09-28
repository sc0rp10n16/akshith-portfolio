import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `Contact ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;
export const runtime = "nodejs";

export default function Image() {
  return renderOgImage({
    eyebrow: "Contact",
    title: "If the problem is still awkward, write.",
    description: `Doctoral positions, engineering roles in the EU, and conversations about hard systems. ${site.location}.`,
  });
}
