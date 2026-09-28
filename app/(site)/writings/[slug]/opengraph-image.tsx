import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { getWriting } from "@/lib/writings";

export const runtime = "nodejs";

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getWriting(slug);

  return [
    {
      id: slug,
      alt: post?.title ?? "Essay",
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getWriting(slug);

  return renderOgImage({
    eyebrow: post?.tag ?? "Writings",
    title: post?.title ?? "Essay",
    description: post?.description,
  });
}
