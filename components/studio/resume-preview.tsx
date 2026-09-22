import type { ReactNode } from "react";
import {
  contactLine,
  filledLines,
  templateTokens,
} from "@/lib/studio/templates";
import type { ResumeData, TemplateId } from "@/lib/studio/resume";

export function ResumePreview({
  data,
  templateId,
}: {
  data: ResumeData;
  templateId: TemplateId;
}) {
  const tokens = templateTokens[templateId];
  const contacts = contactLine(data);
  const experience = data.experience.filter(
    (row) => row.role.trim() || row.company.trim() || filledLines(row.bullets).length > 0,
  );
  const education = data.education.filter(
    (row) => row.school.trim() || row.degree.trim() || row.notes.trim(),
  );
  const projects = data.projects.filter(
    (row) => row.name.trim() || filledLines(row.bullets).length > 0,
  );
  const skills = data.skills.filter((row) => row.group.trim() || row.items.trim());
  const extras = data.extras.filter(
    (row) => row.title.trim() || row.body.trim(),
  );

  return (
    <article
      className={`studio-sheet ${templateId === "ats-compact" ? "studio-sheet-compact" : "studio-sheet-classic"}`}
      style={{
        padding: tokens.pagePad,
        fontSize: tokens.bodySize,
        lineHeight: tokens.lineHeight,
      }}
    >
      <header className="text-center">
        <h1
          className="m-0 font-bold tracking-tight text-[#111]"
          style={{ fontSize: tokens.nameSize, lineHeight: 1.15 }}
        >
          {data.name.trim() || "Name"}
        </h1>
        {data.headline.trim() ? (
          <p
            className="m-0 mt-1 text-[#333]"
            style={{ fontSize: tokens.headlineSize }}
          >
            {data.headline.trim()}
          </p>
        ) : null}
        {contacts ? (
          <p className="m-0 mt-2 text-[#333]" style={{ fontSize: tokens.bodySize }}>
            {contacts}
          </p>
        ) : null}
      </header>

      {data.summary.trim() ? (
        <PreviewSection title="Summary" size={tokens.sectionSize} gap={tokens.gap}>
          <p className="m-0">{data.summary.trim()}</p>
        </PreviewSection>
      ) : null}

      {experience.length > 0 ? (
        <PreviewSection title="Experience" size={tokens.sectionSize} gap={tokens.gap}>
          <div className="flex flex-col" style={{ gap: tokens.gap }}>
            {experience.map((row) => (
              <div key={row.id}>
                <div className="flex flex-wrap justify-between gap-x-4">
                  <p className="m-0 font-bold">
                    {row.role.trim() || "Role"}
                    {row.company.trim() ? `, ${row.company.trim()}` : ""}
                  </p>
                  <p className="m-0 text-[#333]">
                    {[row.start.trim(), row.end.trim()].filter(Boolean).join(" – ")}
                  </p>
                </div>
                {row.location.trim() ? (
                  <p className="m-0 italic text-[#333]">{row.location.trim()}</p>
                ) : null}
                <BulletList items={filledLines(row.bullets)} />
              </div>
            ))}
          </div>
        </PreviewSection>
      ) : null}

      {education.length > 0 ? (
        <PreviewSection title="Education" size={tokens.sectionSize} gap={tokens.gap}>
          <div className="flex flex-col" style={{ gap: tokens.gap }}>
            {education.map((row) => (
              <div key={row.id}>
                <div className="flex flex-wrap justify-between gap-x-4">
                  <p className="m-0 font-bold">
                    {row.degree.trim() || "Degree"}
                    {row.school.trim() ? `, ${row.school.trim()}` : ""}
                  </p>
                  <p className="m-0 text-[#333]">
                    {[row.start.trim(), row.end.trim()].filter(Boolean).join(" – ")}
                  </p>
                </div>
                {row.location.trim() ? (
                  <p className="m-0 italic text-[#333]">{row.location.trim()}</p>
                ) : null}
                {row.notes.trim() ? <p className="m-0">{row.notes.trim()}</p> : null}
              </div>
            ))}
          </div>
        </PreviewSection>
      ) : null}

      {projects.length > 0 ? (
        <PreviewSection title="Projects" size={tokens.sectionSize} gap={tokens.gap}>
          <div className="flex flex-col" style={{ gap: tokens.gap }}>
            {projects.map((row) => (
              <div key={row.id}>
                <p className="m-0 font-bold">
                  {row.name.trim() || "Project"}
                  {row.href.trim() ? (
                    <span className="font-normal text-[#333]">
                      {" "}
                      — {row.href.trim()}
                    </span>
                  ) : null}
                </p>
                <BulletList items={filledLines(row.bullets)} />
              </div>
            ))}
          </div>
        </PreviewSection>
      ) : null}

      {skills.length > 0 ? (
        <PreviewSection title="Skills" size={tokens.sectionSize} gap={tokens.gap}>
          <div className="flex flex-col gap-1">
            {skills.map((row) => (
              <p key={row.id} className="m-0">
                {row.group.trim() ? <strong>{row.group.trim()}: </strong> : null}
                {row.items.trim()}
              </p>
            ))}
          </div>
        </PreviewSection>
      ) : null}

      {extras.length > 0 ? (
        <PreviewSection title="Additional" size={tokens.sectionSize} gap={tokens.gap}>
          <div className="flex flex-col" style={{ gap: tokens.gap }}>
            {extras.map((row) => (
              <div key={row.id}>
                <p className="m-0 font-bold">
                  {row.title.trim() || "Item"}
                  {row.href.trim() ? (
                    <span className="font-normal text-[#333]">
                      {" "}
                      — {row.href.trim()}
                    </span>
                  ) : null}
                </p>
                {row.body.trim() ? <p className="m-0">{row.body.trim()}</p> : null}
              </div>
            ))}
          </div>
        </PreviewSection>
      ) : null}
    </article>
  );
}

function PreviewSection({
  title,
  size,
  gap,
  children,
}: {
  title: string;
  size: number;
  gap: number;
  children: ReactNode;
}) {
  return (
    <section style={{ marginTop: gap + 6 }}>
      <h2
        className="m-0 border-b border-[#111] pb-[2px] font-bold tracking-[0.08em] uppercase"
        style={{ fontSize: size }}
      >
        {title}
      </h2>
      <div style={{ marginTop: gap }}>{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <ul className="mb-0 mt-1 list-disc pl-5">
      {items.map((item) => (
        <li key={item} className="pl-1">
          {item}
        </li>
      ))}
    </ul>
  );
}
