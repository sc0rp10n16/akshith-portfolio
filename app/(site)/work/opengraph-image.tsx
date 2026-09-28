import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `Work by ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;
export const runtime = "nodejs";

export default function Image() {
  return renderOgImage({
    eyebrow: "Work",
    title: "Selected systems, in detail",
    description:
      "Edmissions World CRM, Metaflow, SEO client landings, Genau, and published ornithopter navigation.",
  });
}
