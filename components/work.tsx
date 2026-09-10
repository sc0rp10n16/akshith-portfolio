import Link from "next/link";
import { alsoShipped, cases, site } from "@/lib/site";

export function Work() {
  return (
    <section id="work" className="section">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker kicker-signal mb-3">01 / Work</p>
            <h2 className="m-0 text-[clamp(32px,4vw,48px)] font-bold leading-[1.1]">
              Three systems, in detail
            </h2>
          </div>
          <p className="m-0 max-w-[30ch] text-[16px] leading-[1.6] text-muted">
            Each one has a problem it was built for and a version of it running
            today. Full write-ups behind each card.
          </p>
        </div>

        <div className="flex flex-col gap-px border border-line bg-line">
          {cases.map((cs) => {
            const inner = (
              <>
                <div className="min-w-0 flex-1 basis-80">
                  <p className="kicker mb-4 flex flex-wrap items-center gap-3">
                    <span className="text-signal">{cs.index}</span>
                    <span>{cs.kind}</span>
                    <span>{cs.year}</span>
                  </p>
                  <h3 className="m-0 text-[clamp(24px,2.6vw,32px)] font-bold leading-[1.15]">
                    {cs.name}
                  </h3>
                  <p className="mt-4 mb-0 max-w-[40ch] text-[16px] leading-[1.7] text-muted">
                    {cs.role}
                  </p>
                  <span className="kicker kicker-signal mt-7 inline-flex items-center gap-2">
                    {cs.cta} <span>→</span>
                  </span>
                </div>
                <dl className="m-0 flex min-w-0 flex-[1.4] basis-96 flex-col gap-5">
                  {(
                    [
                      ["Problem", cs.problem],
                      ["Built", cs.built],
                      ["Outcome", cs.outcome],
                    ] as const
                  ).map(([label, value]) => (
                    <div
                      key={label}
                      className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-[0.9rem]"
                    >
                      <dt className="kicker w-24 shrink-0 leading-[1.4]">{label}</dt>
                      <dd className="m-0 min-w-[16rem] flex-1 text-[16px] leading-[1.7] text-fg">
                        {value}
                      </dd>
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-[0.4rem]">
                    {cs.stack.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>
                </dl>
              </>
            );

            const className =
              "case-card flex flex-wrap gap-y-8 gap-x-[clamp(1.5rem,3vw,3rem)] bg-bg p-[clamp(1.75rem,3vw,2.75rem)] text-inherit no-underline";

            return cs.external ? (
              <a
                key={cs.id}
                href={cs.href}
                target="_blank"
                rel="noreferrer"
                className={className}
              >
                {inner}
              </a>
            ) : (
              <Link key={cs.id} href={cs.href} className={className}>
                {inner}
              </Link>
            );
          })}
        </div>

        <p className="mt-8 mb-0 text-[16px] leading-[1.7] text-faint">
          Also shipped:{" "}
          {alsoShipped.map((item, i) => (
            <span key={item.href}>
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>{" "}
              ({item.note})
              {i < alsoShipped.length - 1 ? " and " : ". "}
            </span>
          ))}
          Source on{" "}
          <a href={site.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          .
        </p>
      </div>
    </section>
  );
}
