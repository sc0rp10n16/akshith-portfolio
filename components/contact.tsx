import { BerlinClock } from "@/components/berlin-clock";
import { elsewhere, site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="px-[clamp(1.25rem,4vw,3rem)] pt-[clamp(4rem,8vw,7rem)]">
      <div className="mx-auto max-w-[88rem]">
        <p className="kicker kicker-signal mb-3">05 / Contact</p>
        <h2 className="m-0 max-w-[22ch] text-[clamp(32px,5vw,64px)] font-bold leading-[1.05]">
          If the problem is still awkward, write.
        </h2>
        <p className="mt-7 mb-0 max-w-[56ch] text-[16px] leading-[1.8] text-muted">
          Open to doctoral positions, engineering roles in the EU, and
          conversations about hard systems. Magdeburg afternoons, Hyderabad
          evenings — I answer both.
        </p>

        <div className="mt-12 flex flex-wrap gap-3">
          <a href={`mailto:${site.email}`} className="btn btn-fill px-6 py-[0.9rem]">
            {site.email}
          </a>
          <a href={site.links.resume} className="btn btn-line px-6 py-[0.9rem]">
            CV.pdf
          </a>
        </div>

        <ul className="mt-12 mb-0 flex list-none flex-wrap gap-x-10 gap-y-2 p-0">
          {elsewhere.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="link-plain text-[24px] leading-[1.4]"
              >
                {item.label} <span className="text-[16px]">↗</span>
              </a>
            </li>
          ))}
        </ul>

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 pb-12">
          <p className="kicker m-0">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="kicker m-0">
            Magdeburg <span className="text-signal-dim">·</span> <BerlinClock />
          </p>
        </footer>
      </div>
    </section>
  );
}
