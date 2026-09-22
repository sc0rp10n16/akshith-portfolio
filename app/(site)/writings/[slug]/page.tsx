import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPost } from "@/components/blog-post";
import { pageMetadata } from "@/lib/seo";
import { getWriting, writings, writingPath } from "@/lib/writings";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return writings.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getWriting(slug);
  if (!post) {
    return { title: "Not found" };
  }

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: writingPath(post.slug),
    type: "article",
    publishedTime: post.date,
    tags: [post.tag],
  });
}

export default async function WritingPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getWriting(slug);
  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}
