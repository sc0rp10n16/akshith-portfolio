import { BerlinClock } from "@/components/berlin-clock";
import { HeroCrt } from "@/components/hero-crt";
import { facts, site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HeroCrt />
      </div>
      <div className="hero-scrim-x pointer-events-none absolute inset-0 z-1" />
      <div className="hero-scrim-y pointer-events-none absolute inset-0 z-1" />

      <div className="pointer-events-none relative z-10 mx-auto box-border max-w-[88rem] px-[clamp(1.25rem,4vw,3rem)] pt-[clamp(4rem,9vw,8rem)] pb-[clamp(3rem,5vw,4.5rem)]">
        <p className="kicker kicker-signal mb-6">
          Magdeburg, Germany <span className="text-signal-dim">·</span>{" "}
          <BerlinClock /> CEST
        </p>

        <h1 className="m-0 max-w-[20ch] text-[clamp(48px,7vw,80px)] font-bold leading-[1.05] text-fg">
          {site.name}
        </h1>

        <p className="mt-6 mb-0 max-w-[44ch] text-[clamp(24px,2.6vw,32px)] leading-[1.35] text-fg">
          {site.tagline}
        </p>

        <dl className="mt-10 flex max-w-[72rem] flex-wrap gap-px border border-line bg-line">
          {facts.map((fact) => (
            <div key={fact.k} className="min-w-[16rem] flex-1 bg-bg px-6 py-5">
              <dt className="kicker mb-2">{fact.k}</dt>
              <dd className="m-0 leading-normal text-fg">
                {fact.before}
                {fact.href && fact.linkLabel ? (
                  <a
                    href={fact.href}
                    target="_blank"
                    rel="noreferrer"
                    className="pointer-events-auto"
                  >
                    {fact.linkLabel}
                  </a>
                ) : null}
                {fact.after}
              </dd>
            </div>
          ))}
        </dl>

        <div className="pointer-events-auto mt-10 flex flex-wrap gap-3">
          <a href="#work" className="btn btn-fill">
            Read the case studies <span>→</span>
          </a>
          <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="btn btn-line">
            LinkedIn <span>↗</span>
          </a>
          <a href="#contact" className="btn btn-ghost">
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
