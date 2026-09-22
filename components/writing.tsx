import Link from "next/link";
import { writings, writingPath, formatWritingDate } from "@/lib/writings";

export function Writing() {
  return (
    <section id="writings" className="section bg-bg-alt">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker kicker-signal mb-3">04 / Writings</p>
            <h2 className="m-0 text-[clamp(32px,4vw,48px)] font-bold leading-[1.1]">
              Essays
            </h2>
          </div>
          <p className="m-0 max-w-[34ch] text-[16px] leading-[1.6] text-muted">
            Longer pieces on platforms, autonomy, and the layer underneath
            both.{" "}
            <Link href="/writings" className="text-fg">
              All writings
            </Link>
            .
          </p>
        </div>

        <div className="border-t border-line">
          {writings.map((post) => (
            <Link
              key={post.slug}
              href={writingPath(post.slug)}
              className="note-row"
            >
              <span className="min-w-0 flex-1 basis-96 text-[24px] leading-[1.35]">
                {post.title}
              </span>
              <span className="kicker flex shrink-0 gap-6">
                <span>{post.tag}</span>
                <time dateTime={post.date}>{formatWritingDate(post.date)}</time>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
