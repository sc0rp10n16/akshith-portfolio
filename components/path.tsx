import { essay, path } from "@/lib/site";

export function Path() {
  return (
    <section id="path" className="section">
      <div className="mx-auto max-w-[88rem]">
        <p className="kicker kicker-signal mb-3">03 / Path</p>
        <h2 className="mb-14 text-[clamp(32px,4vw,48px)] font-bold leading-[1.1]">
          Where I have been
        </h2>

        <div className="flex flex-wrap gap-[clamp(2.5rem,6vw,5rem)]">
          <ol className="m-0 min-w-0 flex-[1.1] basis-[26rem] list-none p-0">
            {path.map((stop) => (
              <li key={`${stop.org}-${stop.period}`} className="flex gap-6 pb-8">
                <span
                  aria-hidden="true"
                  className="relative mt-[0.6rem] w-px shrink-0 bg-[rgb(236_230_216/0.16)]"
                >
                  <span className="absolute top-0 left-[-3px] size-[7px] bg-signal" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="kicker mb-[0.35rem]">{stop.period}</p>
                  <h3 className="m-0 text-[24px] font-bold leading-[1.3]">
                    {stop.role}{" "}
                    <span className="font-normal text-muted">— {stop.org}</span>
                  </h3>
                  <p className="mt-2 mb-0 max-w-[48ch] text-[16px] leading-[1.7] text-muted">
                    {stop.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="flex min-w-0 flex-[0.9] basis-80 flex-col gap-6">
            <div className="hatch flex aspect-[4/5] items-end border border-line p-5">
              <p className="font-pixel-mono m-0 text-[16px] leading-[1.4] text-faint">
                Portrait
                <br />
                Magdeburg · Hyderabad
              </p>
            </div>
            <p className="m-0 text-[16px] leading-[1.8] text-muted">{essay}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
