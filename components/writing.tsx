import { notes } from "@/lib/site";

export function Writing() {
  return (
    <section id="writing" className="section bg-bg-alt">
      <div className="mx-auto max-w-[88rem]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker kicker-signal mb-3">04 / Writing</p>
            <h2 className="m-0 text-[clamp(32px,4vw,48px)] font-bold leading-[1.1]">
              Notes
            </h2>
          </div>
          <p className="m-0 max-w-[34ch] text-[16px] leading-[1.6] text-muted">
            Short pieces on things I had to work out — platforms, autonomy, and
            the layer underneath both.
          </p>
        </div>

        <div className="border-t border-line">
          {notes.map((note) => (
            <a key={note.title} href="/about/writings" className="note-row">
              <span className="min-w-0 flex-1 basis-96 text-[24px] leading-[1.35]">
                {note.title}
              </span>
              <span className="kicker flex shrink-0 gap-6">
                <span>{note.tag}</span>
                <span>{note.date}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
