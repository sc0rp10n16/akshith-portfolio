import type { Metadata } from "next";
import Link from "next/link";
import { WritingsIndexJsonLd } from "@/components/blog-post";
import { pageMetadata } from "@/lib/seo";
import {
  formatWritingDate,
  readingMinutes,
  writingPath,
  writings,
  writingsIndex,
} from "@/lib/writings";

const listings = pageMetadata({
  title: writingsIndex.title,
  description: writingsIndex.description,
  path: "/writings",
});

export const metadata: Metadata = {
  ...listings,
  alternates: {
    ...listings.alternates,
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
};

export default function WritingsPage() {
  return (
    <div className="mx-auto max-w-[88rem] px-[clamp(1.25rem,4vw,3rem)] pt-[clamp(3rem,7vw,6rem)] pb-[clamp(4rem,8vw,7rem)]">
      <WritingsIndexJsonLd />

      <p className="kicker kicker-signal mb-3">Writings</p>
      <h1 className="m-0 max-w-[18ch] text-[clamp(32px,6vw,64px)] font-bold leading-[1.05]">
        Essays
      </h1>
      <p className="mt-6 mb-14 max-w-[54ch] text-[16px] leading-[1.8] text-muted">
        {writingsIndex.description} Platforms I shipped, flight I published,
        and the semiconductor layer I went back for.
      </p>

      <div className="border-t border-line">
        {writings.map((post) => (
          <article key={post.slug} className="border-b border-line py-10">
            <p className="kicker mb-4 flex flex-wrap gap-x-6 gap-y-2">
              <span className="text-signal">{post.tag}</span>
              <time dateTime={post.date}>{formatWritingDate(post.date)}</time>
              <span>{readingMinutes(post)} min read</span>
            </p>
            <h2 className="m-0 max-w-[28ch] text-[clamp(24px,3vw,36px)] font-bold leading-[1.15]">
              <Link href={writingPath(post.slug)} className="block text-inherit no-underline">
                {post.title}
              </Link>
            </h2>
            <p className="mt-4 mb-0 max-w-[58ch] text-[16px] leading-[1.7] text-muted">
              {post.description}
            </p>
            <Link
              href={writingPath(post.slug)}
              className="kicker kicker-signal mt-6 inline-flex items-center gap-2 no-underline"
            >
              Read essay <span>→</span>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
