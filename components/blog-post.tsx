import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { RichText } from "@/components/rich-text";
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  formatWritingDate,
  readingMinutes,
  relatedWritings,
  writingPath,
  writingWordCount,
  writings,
  writingsIndex,
  type WritingPost,
} from "@/lib/writings";

export function BlogPost({ post }: { post: WritingPost }) {
  const url = absoluteUrl(writingPath(post.slug));
  const related = relatedWritings(post.slug);
  const minutes = readingMinutes(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: "en-GB",
        url,
        mainEntityOfPage: url,
        articleSection: post.tag,
        wordCount: writingWordCount(post),
        author: {
          "@type": "Person",
          name: site.name,
          url: site.url,
        },
        publisher: {
          "@type": "Person",
          name: site.name,
          url: site.url,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: writingsIndex.title,
            item: absoluteUrl("/writings"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <article className="mx-auto max-w-[66rem] px-[clamp(1.25rem,4vw,3rem)] pt-[clamp(3rem,7vw,6rem)]">
      <JsonLd data={jsonLd} />

      <nav aria-label="Breadcrumb" className="kicker mb-8 flex flex-wrap gap-x-3 gap-y-2">
        <Link href="/" className="text-muted no-underline hover:text-fg">
          Home
        </Link>
        <span className="text-faint" aria-hidden="true">
          /
        </span>
        <Link href="/writings" className="text-muted no-underline hover:text-fg">
          Writings
        </Link>
        <span className="text-faint" aria-hidden="true">
          /
        </span>
        <span className="text-fg">{post.tag}</span>
      </nav>

      <p className="kicker mb-5 flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="text-signal">{post.tag}</span>
        <time dateTime={post.date}>{formatWritingDate(post.date)}</time>
        <span>{minutes} min read</span>
      </p>

      <h1 className="max-w-[22ch] font-sans text-[clamp(32px,6vw,64px)] font-bold leading-[1.05]">
        {post.title}
      </h1>

      <p className="mt-7 max-w-[56ch] font-sans text-[clamp(22px,2.4vw,32px)] leading-[1.4] text-fg">
        {post.lede}
      </p>

      <div className="mt-[clamp(3rem,6vw,5rem)] flex min-w-0 max-w-[62ch] flex-col gap-[clamp(2.5rem,5vw,4rem)]">
        {post.sections.map((section, index) => (
          <section key={section.heading}>
            <h2 className="kicker kicker-signal mb-5">
              {String(index + 1).padStart(2, "0")} / {section.heading}
            </h2>
            <div className="prose-links flex flex-col gap-5 text-[16px] leading-[1.8]">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="m-0">
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {related.length > 0 ? (
        <aside className="mt-[clamp(4rem,8vw,6rem)] border-t border-line pt-10">
          <p className="kicker kicker-signal mb-6">More writings</p>
          <ul className="m-0 flex list-none flex-col gap-4 p-0">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={writingPath(item.slug)} className="group no-underline">
                  <span className="kicker mb-1 block">{item.tag}</span>
                  <span className="text-[24px] font-bold leading-[1.3] text-fg group-hover:text-signal">
                    {item.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}

      <nav className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line py-8 pb-16">
        <Link
          href="/writings"
          className="kicker inline-flex min-h-11 items-center gap-2.5 text-muted no-underline transition-colors duration-300 hover:text-fg"
        >
          <span>←</span> All writings
        </Link>
        <Link href="/work" className="kicker text-muted no-underline hover:text-fg">
          Work <span>→</span>
        </Link>
      </nav>
    </article>
  );
}

export function WritingsIndexJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${site.name} — Writings`,
    url: absoluteUrl("/writings"),
    description: writingsIndex.description,
    author: {
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
    blogPost: writings.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(writingPath(post.slug)),
      datePublished: post.date,
      description: post.description,
    })),
  };

  return <JsonLd data={data} />;
}
