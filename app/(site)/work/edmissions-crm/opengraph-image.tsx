import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { crmStudy } from "@/lib/site";

export const alt = crmStudy.title;
export const size = ogSize;
export const contentType = ogContentType;
export const runtime = "nodejs";

export default function Image() {
  return renderOgImage({
    eyebrow: crmStudy.kind,
    title: crmStudy.title,
    description: crmStudy.lede,
  });
}
