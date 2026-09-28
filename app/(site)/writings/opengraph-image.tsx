import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { writingsIndex } from "@/lib/writings";

export const alt = writingsIndex.title;
export const size = ogSize;
export const contentType = ogContentType;
export const runtime = "nodejs";

export default function Image() {
  return renderOgImage({
    eyebrow: "Writings",
    title: "Essays",
    description: writingsIndex.description,
  });
}
