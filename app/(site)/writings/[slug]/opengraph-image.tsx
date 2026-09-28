import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { getWriting, writings } from "@/lib/writings";

export function generateStaticParams() {
  return writings.map((post) => ({ slug: post.slug }));
}

export const alt = "Essay";
export const size = ogSize;
export const contentType = ogContentType;
export const runtime = "nodejs";

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
