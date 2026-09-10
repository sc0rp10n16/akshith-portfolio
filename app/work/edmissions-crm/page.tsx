import type { Metadata } from "next";
import type { ReactNode } from "react";
import { crmStudy, site } from "@/lib/site";

export const metadata: Metadata = {
  title: crmStudy.title,
  description: crmStudy.lede,
};

export default function EdmissionsCrmPage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-[rgb(12_13_11/0.92)] backdrop-blur-[6px]">
        <div className="mx-auto flex max-w-[66rem] items-center justify-between gap-6 px-[clamp(1.25rem,4vw,3rem)] py-[0.9rem]">
          <a
            href="/#work"
            className="kicker inline-flex min-h-11 items-center gap-2.5 text-muted no-underline transition-colors duration-300 hover:text-fg"
          >
            <span>←</span> {site.name}
          </a>
          <span className="kicker">Case study 01</span>
        </div>
      </header>

      <article className="mx-auto max-w-[66rem] px-[clamp(1.25rem,4vw,3rem)] pt-[clamp(3rem,7vw,6rem)]">
        <p className="kicker mb-5 flex flex-wrap gap-x-6 gap-y-3">
          <span className="text-signal">{crmStudy.kind}</span>
          <span>{crmStudy.org}</span>
          <span>{crmStudy.year}</span>
        </p>

        <h1 className="max-w-[20ch] font-sans text-[clamp(32px,6vw,64px)] font-bold leading-[1.05]">
          {crmStudy.title}
        </h1>

        <p className="mt-7 max-w-[56ch] font-sans text-[clamp(24px,2.4vw,32px)] leading-[1.4] text-fg">
          {crmStudy.lede}
        </p>

        <dl className="mt-12 flex flex-wrap gap-px border border-line bg-line">
          {crmStudy.facts.map((fact) => (
            <div key={fact.k} className="min-w-[12rem] flex-1 bg-bg px-[1.35rem] py-[1.1rem]">
              <dt className="kicker mb-2">{fact.k}</dt>
              <dd className="m-0 leading-normal text-fg">{fact.v}</dd>
            </div>
          ))}
        </dl>

        <div className="hatch mt-12 flex aspect-video items-end border border-line p-5">
          <p className="font-pixel-mono m-0 text-[16px] leading-[1.4] text-faint">
            CRM pipeline view
          </p>
        </div>

        <StudyBlock index="01" title="The problem">
          {crmStudy.problem.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="m-0">
              {paragraph}
            </p>
          ))}
        </StudyBlock>

        <StudyBlock index="02" title="Approach">
          {crmStudy.approach.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="m-0">
              {paragraph}
            </p>
          ))}
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {crmStudy.decisions.map((row) => (
              <li key={row.title} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="mt-[0.85rem] h-px w-3 shrink-0 bg-signal"
                />
                <span className="min-w-0 flex-1">
                  <strong className="font-bold">{row.title}</strong>{" "}
                  <span className="text-muted">{row.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </StudyBlock>

        <StudyBlock index="03" title="What shipped">
          <div className="flex flex-col gap-8">
            {crmStudy.modules.map((mod) => (
              <div key={mod.title} className="border-t border-line pt-4">
                <h3 className="mb-1.5 font-sans text-[24px] font-bold leading-[1.3]">
                  {mod.title}
                </h3>
                <p className="m-0 text-muted">{mod.body}</p>
              </div>
            ))}
          </div>
        </StudyBlock>

        <StudyBlock index="04" title="Outcome">
          <p className="m-0">{crmStudy.outcome}</p>
        </StudyBlock>

        <StudyBlock index="05" title="What I would change">
          <p className="m-0">{crmStudy.change}</p>
        </StudyBlock>

        <nav className="mt-[clamp(4rem,8vw,6rem)] flex flex-wrap items-center justify-between gap-4 border-t border-line py-8 pb-16">
          <a
            href="/#work"
            className="kicker inline-flex min-h-11 items-center gap-2.5 text-muted no-underline transition-colors duration-300 hover:text-fg"
          >
            <span>←</span> All work
          </a>
          <a
            href={crmStudy.source}
            target="_blank"
            rel="noreferrer"
            className="btn btn-signal"
          >
            Source <span>↗</span>
          </a>
        </nav>
      </article>
    </>
  );
}

function StudyBlock({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-[clamp(3rem,6vw,5rem)] flex flex-wrap gap-[clamp(1.5rem,4vw,4rem)]">
      <h2 className="kicker kicker-signal m-0 w-40 shrink-0 leading-[1.4]">
        {index} / {title}
      </h2>
      <div className="flex min-w-0 max-w-[62ch] flex-1 basis-[28rem] flex-col gap-5">
        {children}
      </div>
    </section>
  );
}
