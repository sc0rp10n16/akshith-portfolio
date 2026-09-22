import Link from "next/link";
import { interests, publication } from "@/lib/site";

export function Research() {
  return (
    <section id="research" className="section bg-bg-alt">
      <div className="mx-auto max-w-[88rem]">
        <p className="kicker kicker-signal mb-3">02 / Research</p>
        <h2 className="mb-5 max-w-[24ch] text-[clamp(32px,4vw,48px)] font-bold leading-[1.1]">
          What I want to do next
        </h2>
        <p className="prose-links mb-14 max-w-[62ch] text-[16px] leading-[1.8] text-muted">
          I am looking for doctoral work at the boundary between device physics
          and the systems built on top of it — neuromorphic and in-memory
          compute, or nanoscale device characterisation with a strong
          measurement component. I have shipped software at production scale
          and published on control for unconventional flight; the master&apos;s
          at OVGU is me going down a layer on purpose. I wrote that out in{" "}
          <Link href="/writings/what-a-software-engineer-misinterprets-about-device-physics">
            What a software engineer misinterprets about device physics
          </Link>{" "}
          and how we{" "}
          <Link href="/writings/tuning-slam-against-a-flapping-period">
            tuned SLAM against a flapping period
          </Link>
          .
        </p>

        <div className="flex flex-wrap gap-px border border-line bg-line">
          {interests.map((topic) => (
            <div key={topic.index} className="min-w-[18rem] flex-1 bg-bg-alt p-7">
              <p className="kicker kicker-signal mb-3">{topic.index}</p>
              <h3 className="mb-2.5 text-[24px] font-bold leading-[1.25]">
                {topic.title}
              </h3>
              <p className="m-0 text-[16px] leading-[1.7] text-muted">{topic.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-8 border border-line p-[clamp(1.5rem,3vw,2.5rem)]">
          <div className="min-w-0 flex-1 basis-[30rem]">
            <p className="kicker mb-4">
              Peer-reviewed <span className="text-signal-dim">·</span> Wiley{" "}
              {publication.year}
            </p>
            <h3 className="m-0 max-w-[32ch] text-[clamp(24px,2.6vw,32px)] font-bold leading-[1.2]">
              {publication.title}
            </h3>
            <p className="prose-links mt-4 mb-0 max-w-[60ch] text-[16px] leading-[1.7] text-muted">
              Chapter 20 of <em>{publication.book}</em>. Control and navigation
              for flapping-wing UAVs using UWB, SLAM and ROS, indoors and out.{" "}
              <Link href="/writings/tuning-slam-against-a-flapping-period">
                Essay: tuning SLAM against a flapping period
              </Link>
              .
            </p>
            <p className="font-pixel-mono mt-3.5 mb-0 max-w-[60ch] text-[16px] leading-[1.6] text-faint">
              {publication.authors.map((author, i) => (
                <span key={author}>
                  {author === "A. Mysa" ? (
                    <span className="text-fg">{author}</span>
                  ) : (
                    author
                  )}
                  {i < publication.authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
          </div>
          <a
            href={publication.href}
            target="_blank"
            rel="noreferrer"
            className="btn btn-signal shrink-0"
          >
            Read on DOI <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
